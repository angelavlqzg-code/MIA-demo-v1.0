export const config = { runtime: 'edge' }

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { 'Content-Type': 'application/json' }
    })
  }

  let body
  try { body = await req.json() } catch {
    return new Response(JSON.stringify({ error: 'Request inválido.' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    })
  }

  const { nombre, industria, descripcion, situacion, canales, objetivo } = body
  if (!nombre || !industria || !descripcion) {
    return new Response(JSON.stringify({ error: 'Faltan campos requeridos.' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key no configurada en el servidor.' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    })
  }

  const models = [
    'claude-sonnet-4-6',
    'claude-opus-4-6',
    'claude-haiku-4-5-20251001',
    'claude-3-5-sonnet-20241022',
    'claude-3-5-haiku-20241022',
    'claude-3-haiku-20240307',
  ]

  const systemPrompt = `Eres MIA — Marketing Intelligence Agent. Socio estratégico de marketing de ${nombre}.
IDENTIDAD: Cercano como colega. Directo como director. Comprometido como socio.
ARQUETIPOS: 1=marca que no ejecuta, 2=negocio invisible, 3=líder que no comunica, 4=vendedor B2B sin sistema.
Responde SIEMPRE en español mexicano natural.`

  const userPrompt = `Analiza este negocio. Responde ÚNICAMENTE con JSON válido sin backticks:
{"arquetipo":1,"arquetipo_nombre":"nombre","diagnostico":"2-3 oraciones concretas","variables":[{"nombre":"v","valor":"v","impacto":"i"}],"plan":{"apertura":"Esta semana la ganamos si...","prioridades":[{"titulo":"t","que":"q","por_que":"p","como":["1","2","3"]}],"cierre":"c"}}
Negocio: ${nombre} | Industria: ${industria} | Qué vende: ${descripcion}
Situación: ${(situacion||'').slice(0,300)} | Canales: ${canales||'n/a'} | Objetivo: ${(objetivo||'').slice(0,150)}
Exactamente 3 prioridades, 3-4 variables. SOLO JSON.`

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
          max_tokens: 2000,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data?.error?.type === 'not_found_error') continue
        return new Response(JSON.stringify({ error: `Error API (${model}): ${data?.error?.message || response.status}` }), {
          status: 502, headers: { 'Content-Type': 'application/json' }
        })
      }

      const text = data.content?.map(i => i.text || '').join('') || ''
      const match = text.match(/\{[\s\S]*\}/)
      if (!match) continue

      try {
        const parsed = JSON.parse(match[0])
        return new Response(JSON.stringify({ ...parsed, _model: model }), {
          status: 200, headers: { 'Content-Type': 'application/json' }
        })
      } catch { continue }

    } catch { continue }
  }

  return new Response(JSON.stringify({
    error: 'Ningún modelo respondió. Verifica que tu API key de Anthropic tenga modelos habilitados en console.anthropic.com → Models.'
  }), { status: 502, headers: { 'Content-Type': 'application/json' } })
}
