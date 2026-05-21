export const config = { runtime: 'edge' }

const headers = { 'Content-Type': 'application/json' }
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers })

function fallbackPlan(body, reason = 'MIA fallback') {
  const {
    nombre = 'El negocio',
    industria = 'su industria',
    descripcion = 'su oferta',
    situacion = '',
    canales = 'el canal principal',
    objetivo = 'generar oportunidades comerciales',
  } = body

  return {
    arquetipo: canales.toLowerCase().includes('linkedin') ? 4 : 2,
    arquetipo_nombre: canales.toLowerCase().includes('linkedin')
      ? 'Vendedor B2B sin sistema'
      : 'Negocio invisible',
    diagnostico: `${nombre} tiene una propuesta con potencial, pero necesita ordenar el posicionamiento, activar un canal con intención y convertir el interés en conversaciones comerciales. En ${industria}, la prioridad es conectar lo que venden (${descripcion}) con un problema concreto del comprador correcto.`,
    variables: [
      {
        nombre: 'Posicionamiento',
        valor: situacion ? 'En transición' : 'Por definir',
        impacto: 'Si el mercado no entiende la propuesta, la venta se vuelve lenta y dependiente de explicación manual.',
      },
      {
        nombre: 'Canal activo',
        valor: canales,
        impacto: 'Un canal con cadencia y seguimiento vale más que presencia dispersa sin sistema.',
      },
      {
        nombre: 'Objetivo comercial',
        valor: objetivo,
        impacto: 'La ejecución semanal debe medirse contra avance comercial, no solo actividad de marketing.',
      },
    ],
    plan: {
      apertura: `Esta semana la ganamos si ${nombre} deja claro qué problema resuelve, para quién y cuál es el siguiente paso comercial.`,
      prioridades: [
        {
          titulo: 'Cerrar el mensaje central',
          que: 'Convertir la propuesta en una frase simple y comercial.',
          por_que: 'Sin claridad, el mercado no entiende por qué actuar ahora.',
          como: [
            'Definir cliente ideal, dolor principal y resultado prometido.',
            'Actualizar pitch, perfil y primer mensaje comercial.',
            'Validarlo con tres prospectos o clientes reales.',
          ],
        },
        {
          titulo: 'Activar el canal prioritario',
          que: 'Publicar y dar seguimiento en el canal con mayor probabilidad comercial.',
          por_que: 'La audiencia necesita señales consistentes para confiar y avanzar.',
          como: [
            'Elegir un solo canal para los próximos 30 días.',
            'Crear 4 publicaciones ligadas a problemas reales del comprador.',
            'Dar seguimiento manual a comentarios, reacciones y mensajes.',
          ],
        },
        {
          titulo: 'Crear ruta a oportunidad',
          que: 'Definir cómo alguien pasa de interés a llamada, diagnóstico o piloto.',
          por_que: 'Sin ruta de conversión, el contenido genera atención pero no ventas.',
          como: [
            'Definir un CTA único.',
            'Crear una secuencia corta de 3 mensajes.',
            'Medir conversaciones, llamadas y oportunidades calificadas.',
          ],
        },
      ],
      cierre: `${nombre} no necesita más ruido esta semana. Necesita claridad, consistencia y un siguiente paso comercial visible.`,
    },
    _model: reason,
  }
}

async function callClaude(apiKey, body) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)

  try {
    const prompt = `Responde SOLO JSON válido sin backticks con esta estructura:
{"arquetipo":1,"arquetipo_nombre":"nombre","diagnostico":"texto","variables":[{"nombre":"v","valor":"v","impacto":"i"}],"plan":{"apertura":"texto","prioridades":[{"titulo":"t","que":"q","por_que":"p","como":["1","2","3"]}],"cierre":"texto"}}

Negocio: ${body.nombre}
Industria: ${body.industria}
Qué vende: ${body.descripcion}
Situación: ${(body.situacion || '').slice(0, 220)}
Canales: ${body.canales || 'n/a'}
Objetivo: ${(body.objetivo || '').slice(0, 120)}

Exactamente 3 variables y 3 prioridades. Español mexicano.`

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 1000,
        temperature: 0.25,
        system: 'Eres MIA, Marketing Intelligence Agent. Diagnosticas y priorizas marketing con claridad ejecutiva.',
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data?.error?.message || 'Error API')

    const text = data.content?.map((x) => x.text || '').join('') || ''
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('Claude no devolvió JSON')

    return JSON.parse(match[0])
  } finally {
    clearTimeout(timer)
  }
}

export default async function handler(req) {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  let body
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Request inválido.' }, 400)
  }

  if (!body.nombre || !body.industria || !body.descripcion) {
    return json({ error: 'Faltan campos requeridos.' }, 400)
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return json({ error: 'API key no configurada en Vercel.' }, 500)

  try {
    const result = await callClaude(apiKey, body)
    return json({ ...result, _model: 'claude-3-5-haiku-20241022' })
  } catch {
    return json(fallbackPlan(body, 'MIA fallback por timeout'))
  }
}
