export const config = { maxDuration: 30 }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { nombre, industria, descripcion, situacion, canales, objetivo } = req.body || {}

  if (!nombre || !industria || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, industria, descripcion' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'API key no configurada.' })

  // Try models in order until one works
  const models = [
    'claude-opus-4-6',
    'claude-sonnet-4-6',
    'claude-haiku-4-5-20251001',
    'claude-3-5-sonnet-20241022',
    'claude-3-5-haiku-20241022',
    'claude-3-haiku-20240307',
    'claude-3-sonnet-20240229',
    'claude-3-opus-20240229',
  ]

  const systemPrompt = `Eres MIA — Marketing Intelligence Agent. Socio estratégico de marketing de ${nombre}.
IDENTIDAD: Cercano como colega. Directo como director. Comprometido como socio.
LOS 4 ARQUETIPOS:
1 — La marca que ya existe pero no ejecuta: Presencia activa pero marketing caótico.
2 — El negocio invisible: Producto bueno, nadie lo conoce. Sin historial de marketing.
3 — El líder que no comunica: Empresa grande que no aprovecha su historia.
4 — El vendedor B2B sin sistema: Ventas dependientes de relaciones personales del dueño.
REGLA DE ORO: Diagnóstico antes que receta. Responde SIEMPRE en español mexicano natural.`

  const userPrompt = `Analiza este negocio. Responde SOLO con JSON válido, sin texto extra, sin backticks, sin explicaciones:
{"arquetipo":1,"arquetipo_nombre":"nombre","diagnostico":"2-3 oraciones","variables":[{"nombre":"Variable","valor":"valor","impacto":"impacto"}],"plan":{"apertura":"Esta semana la ganamos si...","prioridades":[{"titulo":"Título","que":"Qué hacer","por_que":"Por qué","como":["Paso 1","Paso 2","Paso 3"]}],"cierre":"Cierre motivador"}}

Negocio: ${nombre}
Industria: ${industria}
Descripción: ${descripcion}
Situación: ${situacion || 'No especificada'}
Canales: ${canales || 'No especificados'}
Objetivo 90 días: ${objetivo || 'No especificado'}

IMPORTANTE: Exactamente 3 prioridades, 3-4 variables. Solo JSON, nada más.`

  for (const model of models) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          max_tokens: 2500,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Model not found — try next
        if (data?.error?.type === 'not_found_error') continue
        return res.status(502).json({ error: `Error API: ${data?.error?.message || response.status}` })
      }

      const text = data.content?.map(i => i.text || '').join('') || ''
      const clean = text.replace(/```json|```/g, '').trim()

      try {
        const parsed = JSON.parse(clean)
        return res.status(200).json({ ...parsed, _model: model })
      } catch {
        // Bad JSON from this model — try next
        continue
      }
    } catch (err) {
      continue
    }
  }

  return res.status(502).json({ error: 'Ningún modelo disponible respondió correctamente. Verifica tu API key y los modelos habilitados en tu workspace.' })
}
