export const config = { maxDuration: 30 }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { nombre, industria, descripcion, situacion, canales, objetivo } = req.body || {}

  if (!nombre || !industria || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, industria, descripcion' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API key no configurada en el servidor.' })
  }

  const systemPrompt = `Eres MIA — Marketing Intelligence Agent. Socio estratégico de marketing de ${nombre}.

IDENTIDAD: Cercano como colega. Directo como director. Comprometido como socio.

LOS 4 ARQUETIPOS:
1 — La marca que ya existe pero no ejecuta: Presencia activa, marketing caótico o inconsistente.
2 — El negocio invisible: Producto bueno, nadie lo conoce. Sin historial de marketing.
3 — El líder que no comunica: Empresa grande que no aprovecha su historia para vender más.
4 — El vendedor B2B sin sistema: Ventas dependientes de relaciones personales del dueño.

REGLA DE ORO: Diagnóstico antes que receta. Responde SIEMPRE en español mexicano natural.
TONO SÍ: "Esta semana la ganamos si..." / Directo, concreto, comprometido.
TONO NO: Anglicismos sin contexto, lenguaje corporativo frío, promesas sin sustento.`

  const userPrompt = `Analiza este negocio y responde SOLO en JSON válido, sin texto adicional ni backticks:
{"arquetipo":1,"arquetipo_nombre":"nombre","diagnostico":"2-3 oraciones concretas","variables":[{"nombre":"Variable","valor":"valor","impacto":"cómo afecta"}],"plan":{"apertura":"Esta semana la ganamos si...","prioridades":[{"titulo":"Título","que":"Qué hacer","por_que":"Por qué es prioritario","como":["Paso 1","Paso 2","Paso 3"]}],"cierre":"Frase de cierre"}}

Negocio: ${nombre}
Industria: ${industria}
Descripción: ${descripcion}
Situación actual: ${situacion || 'No especificada'}
Canales activos: ${canales || 'No especificados'}
Objetivo 90 días: ${objetivo || 'No especificado'}

Incluye exactamente 3 prioridades y 3-4 variables críticas.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Anthropic error:', JSON.stringify(data))
      return res.status(502).json({
        error: `Error del modelo: ${data?.error?.message || response.status}`
      })
    }

    const text = data.content?.map((i) => i.text || '').join('') || ''
    const clean = text.replace(/```json|```/g, '').trim()

    let parsed
    try {
      parsed = JSON.parse(clean)
    } catch (e) {
      console.error('Parse error:', clean)
      return res.status(422).json({ error: 'El modelo devolvió una respuesta inesperada. Intenta de nuevo.' })
    }

    return res.status(200).json(parsed)
  } catch (err) {
    console.error('Server error:', err.message)
    return res.status(500).json({ error: `Error interno: ${err.message}` })
  }
}
