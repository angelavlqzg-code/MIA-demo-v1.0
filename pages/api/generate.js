export const config = { runtime: 'edge' }

const JSON_HEADERS = { 'Content-Type': 'application/json' }

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: JSON_HEADERS,
  })
}

function inferArquetipo({ industria = '', situacion = '', canales = '', objetivo = '' }) {
  const text = `${industria} ${situacion} ${canales} ${objetivo}`.toLowerCase()

  if (text.includes('b2b') || text.includes('piloto') || text.includes('linkedin')) {
    return { arquetipo: 4, nombre: 'Vendedor B2B sin sistema' }
  }
  if (text.includes('fundador') || text.includes('lider') || text.includes('líder') || text.includes('no comunica')) {
    return { arquetipo: 3, nombre: 'Líder que no comunica' }
  }
  if (text.includes('sin contenido') || text.includes('sin plan') || text.includes('inbound') || text.includes('invisible')) {
    return { arquetipo: 2, nombre: 'Negocio invisible' }
  }
  return { arquetipo: 1, nombre: 'Marca que no ejecuta' }
}

function fallbackPlan(body, reason = 'respuesta rápida local') {
  const { nombre, industria, descripcion, situacion, canales, objetivo } = body
  const arquetipo = inferArquetipo(body)
  const canal = canales || 'el canal principal'
  const meta = objetivo || 'convertir la claridad estratégica en conversaciones comerciales'

  return {
    arquetipo: arquetipo.arquetipo,
    arquetipo_nombre: arquetipo.nombre,
    diagnostico: `${nombre} tiene una propuesta con potencial, pero hoy la prioridad no es hacer más ruido: es ordenar el posicionamiento, convertirlo en mensajes claros y activar un sistema comercial medible. En ${industria}, la oportunidad está en conectar lo que venden (${descripcion}) con un caso de negocio específico para el comprador correcto.`,
    variables: [
      {
        nombre: 'Claridad de posicionamiento',
        valor: situacion ? 'En transición' : 'Por definir',
        impacto: 'Si el mercado no entiende el nuevo enfoque, la venta sigue anclada a la narrativa anterior.',
      },
      {
        nombre: 'Canal activo',
        valor: canal,
        impacto: 'Un solo canal con cadencia y seguimiento pesa más que presencia dispersa sin sistema.',
      },
      {
        nombre: 'Conversión comercial',
        valor: 'Necesita ruta visible',
        impacto: 'El interés generado debe aterrizar en pilotos, llamadas o diagnósticos concretos.',
      },
      {
        nombre: 'Objetivo a 90 días',
        valor: meta,
        impacto: 'La ejecución semanal debe medirse contra una meta comercial, no solo contra actividad de marketing.',
      },
    ],
    plan: {
      apertura: `Esta semana la ganamos si ${nombre} deja claro qué problema resuelve, para quién y cuál es el siguiente paso comercial.`,
      prioridades: [
        {
          titulo: 'Cerrar el mensaje de transición',
          que: 'Convertir la nueva propuesta en una frase comercial simple y repetible.',
          por_que: 'Si el equipo sigue explicando desde la narrativa anterior, el mercado no va a comprar la nueva categoría.',
          como: [
            'Escribir una promesa central con cliente, dolor y resultado esperado.',
            'Traducir esa promesa a perfil, pitch comercial y primer post de LinkedIn.',
            'Validarla con 3 prospectos o clientes antes de escalar contenido.',
          ],
        },
        {
          titulo: 'Activar LinkedIn con intención',
          que: 'Publicar una serie corta que muestre casos de uso, problemas y resultados posibles.',
          por_que: 'La audiencia ya existe; lo que falta es convertir presencia en autoridad y conversaciones.',
          como: [
            'Definir 4 temas semanales ligados a objeciones reales del comprador.',
            'Cerrar cada publicación con una invitación a diagnóstico o piloto.',
            'Dar seguimiento manual a comentarios, reacciones y mensajes relevantes.',
          ],
        },
        {
          titulo: 'Diseñar la ruta a piloto',
          que: 'Crear un flujo mínimo desde interés hasta llamada, diagnóstico y propuesta de piloto.',
          por_que: 'Sin una ruta clara, el contenido genera atención pero no avance comercial.',
          como: [
            'Definir criterios de buen piloto: área, dolor, datos disponibles y sponsor.',
            'Crear una secuencia de 3 mensajes para llevar interesados a llamada.',
            'Medir semanalmente conversaciones abiertas, llamadas agendadas y pilotos calificados.',
          ],
        },
      ],
      cierre: `El foco de ${nombre} esta semana es pasar de promesa amplia a sistema comercial visible. Menos explicación general, más casos concretos y siguiente paso claro.`,
    },
    _model: reason,
  }
}

async function callAnthropic({ apiKey, model, systemPrompt, userPrompt, timeoutMs }) {
  const controller = new AbortController()
