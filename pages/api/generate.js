export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { nombre, industria, descripcion, situacion, canales, objetivo } = req.body

  if (!nombre || !industria || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, industria, descripcion' })
  }

  const systemPrompt = `Eres MIA — Marketing Intelligence Agent. Socio estratégico de marketing de ${nombre}.

IDENTIDAD: Cercano como colega. Directo como director. Comprometido como socio.

LOS 4 ARQUETIPOS DE CLIENTE:
1 — La marca que ya existe pero no ejecuta: Tiene presencia, producto y clientes. El marketing es caótico o inconsistente. Dolor: falta de orden y ejecución consistente.
2 — El negocio invisible: Producto bueno, nadie lo conoce. Nunca ha invertido en marketing digital. Arranca desde cero. Dolor: alto escepticismo, espera ROI inmediato.
3 — El líder que no comunica: Empresa grande o líder en su industria que no aprovecha su historia para vender más. Dolor: no ve la comunicación como inversión comercial.
4 — El vendedor B2B sin sistema: Vende a empresas o gobierno. Las ventas dependen de relaciones personales del dueño. Dolor: ciclo largo, pipeline inestable, dependencia del CEO.

VARIABLES CRÍTICAS A EVALUAR:
- Plan de vuelo de entregables (actualizado / desactualizado / sin plan)
- Deadline confirmado (true/false)
- Urgencia real (alta / media / baja)
- Estructura de aprobación (1 persona / comité / burocracia)
- Control de scope (ok / cambios / fuera de control)
- Dependencia externa (true/false)
- Estado del pipeline (sano / débil / sin leads)
- Preparación interna (lista / curva de aprendizaje / recursos limitados)
- Construcción de confianza (true/false)

REGLA DE PRIORIZACIÓN:
1. Si sin plan de vuelo → reconstruirlo primero
2. Si equipo no está listo → briefing interno primero
3. Si deadline no confirmado → calidad del entregable primero
4. Si deadline confirmado + urgencia alta → mapeo operativo primero
5. Si construcción de confianza activa → tono aspiracional, nota de audición
6. Si pipeline débil → incluir tiempo de prospección
7. Si dependencia externa → semana de anticipación interna
8. Si scope fuera de control → contención y documentación primero
9. Si comité sin jerarquía → documento de deadlines con consecuencias

TONO SÍ: "Esta semana la ganamos si..." / "Ok, vamos a cerrar esto hoy." / "Que se enamoren de nosotros es la misión." — Natural, mexicano, directo, comprometido.
TONO NO: Anglicismos sin contexto (KPI, engagement, insights), lenguaje corporativo frío, promesas sin sustento.

Responde SIEMPRE en español mexicano natural.`

  const userPrompt = `Analiza este negocio y genera el diagnóstico + plan semanal.

Negocio: ${nombre}
Industria: ${industria}
Descripción: ${descripcion}
Situación actual de ventas: ${situacion || 'No especificada'}
Canales de marketing activos: ${canales || 'No especificados'}
Objetivo a 90 días: ${objetivo || 'No especificado'}

Responde SOLO en JSON válido con exactamente esta estructura (sin texto adicional, sin backticks):
{
  "arquetipo": 1,
  "arquetipo_nombre": "nombre del arquetipo",
  "diagnostico": "2-3 oraciones concretas explicando el diagnóstico — específico para este negocio, no genérico",
  "variables": [
    {"nombre": "Nombre de la variable", "valor": "valor detectado", "impacto": "cómo afecta el plan esta semana"}
  ],
  "plan": {
    "apertura": "Esta semana la ganamos si [objetivo concreto y específico para este negocio]...",
    "prioridades": [
      {
        "titulo": "Título directo y accionable",
        "que": "Qué hacer — acción específica y concreta",
        "por_que": "Por qué es la prioridad — enlazado a una variable o al arquetipo, no genérico",
        "como": ["Paso 1 ejecutable", "Paso 2 ejecutable", "Paso 3 ejecutable"]
      }
    ],
    "nota_audicion": null,
    "cierre": "Frase de cierre motivadora y directa"
  }
}

Incluye exactamente 3 prioridades. Variables: las 3-4 más críticas para este caso específico. Si hay construcción de confianza activa, nota_audicion debe ser una frase sobre que cada entregable es una audición.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1800,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!response.ok) {
      const errData = await response.json()
      console.error('Anthropic API error:', errData)
      return res.status(502).json({ error: 'Error al conectar con el modelo de IA. Verifica tu API key.' })
    }

    const data = await response.json()
    const text = data.content?.map((i) => i.text || '').join('')
    const clean = text.replace(/```json|```/g, '').trim()

    let parsed
    try {
      parsed = JSON.parse(clean)
    } catch {
      return res.status(422).json({ error: 'El modelo devolvió una respuesta inesperada. Intenta de nuevo.' })
    }

    return res.status(200).json(parsed)
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Error interno del servidor.' })
  }
}
