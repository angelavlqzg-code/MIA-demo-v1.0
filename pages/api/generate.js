export const config = { maxDuration: 30 }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { nombre, industria, descripcion, situacion, canales, objetivo } = req.body || {}
  if (!nombre || !industria || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'API key no configurada.' })

  // Fetch available models first
  let availableModel = null
  try {
    const modelsRes = await fetch('https://api.anthropic.com/v1/models', {
      headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' }
    })
    if (modelsRes.ok) {
      const modelsData = await modelsRes.json()
      const models = modelsData?.data || []
      // Prefer sonnet > haiku > anything else
      const preferred = ['sonnet', 'haiku', 'opus']
      for (const pref of preferred) {
        const found = models.find(m => m.id.toLowerCase().includes(pref))
        if (found) { availableModel = found.id; break }
      }
      if (!availableModel && models.length > 0) availableModel = models[0].id
      if (!availableModel) {
        return res.status(502).json({ 
          error: `Tu workspace no tiene modelos disponibles. Modelos encontrados: ${JSON.stringify(models.map(m=>m.id))}` 
        })
      }
    }
  } catch(e) {
    // Models endpoint failed — try fallback
  }

  // Fallback if models endpoint didn't work
  if (!availableModel) availableModel = 'claude-3-haiku-20240307'

  const systemPrompt = `Eres MIA — Marketing Intelligence Agent. Socio estratégico de marketing de ${nombre}.
IDENTIDAD: Cercano como colega. Directo como director. Comprometido como socio.
LOS 4 ARQUETIPOS:
1 — La marca que ya existe pero no ejecuta. 2 — El negocio invisible. 3 — El líder que no comunica. 4 — El vendedor B2B sin sistema.
Responde SIEMPRE en español mexicano natural.`

  const userPrompt = `Analiza este negocio. Responde ÚNICAMENTE con JSON válido (sin backticks, sin texto extra):
{"arquetipo":1,"arquetipo_nombre":"nombre","diagnostico":"2-3 oraciones","variables":[{"nombre":"v","valor":"v","impacto":"i"}],"plan":{"apertura":"Esta semana la ganamos si...","prioridades":[{"titulo":"t","que":"q","por_que":"p","como":["1","2","3"]}],"cierre":"c"}}
Negocio: ${nombre} | Industria: ${industria} | Qué vende: ${descripcion} | Situación: ${situacion||'n/a'} | Canales: ${canales||'n/a'} | Objetivo: ${objetivo||'n/a'}
3 prioridades exactas, 3-4 variables. Solo JSON.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: availableModel,
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(502).json({ 
        error: `Error del modelo (${availableModel}): ${data?.error?.message || response.status}` 
      })
    }

    const text = data.content?.map(i => i.text || '').join('') || ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return res.status(422).json({ 
        error: `Respuesta no válida del modelo ${availableModel}. Intenta de nuevo.` 
      })
    }

    const parsed = JSON.parse(jsonMatch[0])
    return res.status(200).json({ ...parsed, _model: availableModel })

  } catch (err) {
    return res.status(500).json({ error: `Error: ${err.message}` })
  }
}
