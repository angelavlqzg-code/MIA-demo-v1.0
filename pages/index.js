import { useState } from 'react'
import Head from 'next/head'

const DEMO_CASES = [
  {
    id: 'sportmex',
    cliente: 'SPORTMEX — Columbia / Psycho Bunny',
    sub: 'Moda y retail · Semana 1 de iguala',
    badges: [{ label: 'Arquetipo 1', cls: 'badge-purple' }, { label: '✓ Aprobado', cls: 'badge-green' }],
    diagnostico: 'SPORTMEX tiene presencia activa en todos los canales, audiencia establecida y producto sólido. El problema no es visibilidad — es ejecución. Vienen de una agencia con fallas en entregas y el marketing se volvió caótico. El objetivo de la primera semana no es producir más contenido: es recuperar el control del ecosistema antes de tocar nada.',
    variables: [
      { nombre: 'Plan de vuelo', valor: 'Sin plan', cls: 'alert', impacto: 'Reconstruir antes de ejecutar cualquier cosa' },
      { nombre: 'Preparación interna', valor: 'Curva de aprendizaje', cls: 'warn', impacto: 'Briefing interno antes del primer entregable' },
      { nombre: 'Control de scope', valor: 'En riesgo', cls: 'warn', impacto: 'Definir alcances escritos esta semana' },
      { nombre: 'Construcción de confianza', valor: 'Activa', cls: 'ok', impacto: 'Cada entregable es una audición' },
    ],
    plan: {
      apertura: 'Esta semana la ganamos si logramos tener el ecosistema de SPORTMEX completamente mapeado y los alcances definidos antes de producir una sola pieza.',
      prioridades: [
        { titulo: 'Toma de control y auditoría del ecosistema', que: 'Acceder, revisar y documentar el estado real de Instagram, Facebook y Ecommerce antes de tocar o producir nada.', por_que: 'No hay plan de vuelo. No sabemos qué está activo, quién tiene acceso a qué ni qué métricas tiene cada canal. Producir sin esta base es construir sobre arena.', como: ['Solicitar acceso admin a todas las cuentas (Instagram, Facebook, Ecommerce)', 'Auditar cada canal: audiencia, últimas 30 publicaciones, métricas reales', 'Identificar el canal con mayor audiencia activa — ese va primero', 'Crear plan de vuelo de entregables para las próximas 4 semanas'] },
        { titulo: 'Definir alcances antes de la primera producción', que: 'Documento de kickoff con entregables incluidos, frecuencia, proceso de aprobación y tiempos.', por_que: 'El cliente tiene historial de urgir todo sin planeación. Sin scope definido desde el día 1, se absorben costos extra sin compensación.', como: ['Preparar documento de una página: entregables, frecuencia y proceso de revisión', 'Presentarlo en reunión de máx. 45 min — no enviarlo por correo sin explicarlo', 'Documentar los acuerdos por escrito para tener respaldo'] },
        { titulo: 'Briefing interno de las marcas antes de producir', que: 'Sesión interna de 60 min para que todo el equipo entienda el ADN de Columbia y Psycho Bunny.', por_que: 'Producir sin conocer las marcas genera revisiones y tensión innecesaria. Una hora de briefing ahorra tres semanas de retrabajo.', como: ['Descargar brand guidelines actualizados de ambas marcas', 'Sesión interna: perfil del consumidor, tono, referencias visuales, qué se puede y no', 'Crear referencia visual interna con 10-15 ejemplos de sí y no por marca'] },
      ],
      nota: '🎯 SPORTMEX es un cliente nuevo que llegó por recomendación. Que la directora sienta que cambiar de agencia fue la mejor decisión — eso es la misión de esta semana.',
      cierre: 'Esta semana tiene todo para sentar las bases de una relación larga y rentable. Ya saben qué hacer — a ejecutar.',
    },
    veredicto: 'APROBADO — contenido equivalente al plan que el Founder daría',
  },
  {
    id: 'liverpool',
    cliente: 'LIVERPOOL — Retail departamental',
    sub: '40+ tiendas · Brief NFL recién recibido · Caso de validación',
    badges: [{ label: 'Arquetipo 1', cls: 'badge-purple' }, { label: 'Deadline variable', cls: 'badge-blue' }, { label: '✓ Aprobado', cls: 'badge-green' }],
    diagnostico: 'Liverpool tiene presencia completa, producto y clientes consolidados. El dolor es ejecución consistente de promociones por temporalidad. Variable clave: el deadline del brief NFL no está confirmado — eso activa la Regla 3 del sistema: calidad del entregable creativo primero, mapeo operativo después.',
    variables: [
      { nombre: 'Deadline confirmado', valor: 'No confirmado', cls: 'alert', impacto: 'Creativo va primero — Regla 3 activa' },
      { nombre: 'Construcción de confianza', valor: 'Activa', cls: 'ok', impacto: 'Tono aspiracional — cada entregable es audición' },
      { nombre: 'Estructura de aprobación', valor: 'Burocracia 40+ tiendas', cls: 'warn', impacto: 'Mapear aprobaciones cuando se confirme la fecha' },
      { nombre: 'Urgencia real', valor: 'Media', cls: 'ok', impacto: 'Sin deadline confirmado, no hay presión de tiempo real' },
    ],
    plan: {
      apertura: 'Esta semana la ganamos si logramos producir un entregable de NFL que haga que Liverpool diga: "así es exactamente como lo imaginábamos — pero mejor."',
      prioridades: [
        { titulo: 'Producir el mejor entregable creativo posible para NFL', que: 'Poner el foco de la semana en producir el trabajo creativo más sólido posible para el brief de temporada NFL.', por_que: 'El deadline no está confirmado — la calidad es la variable crítica esta semana, no el tiempo. Este brief es la oportunidad de escalar la relación hacia proyectos grandes.', como: ['Revisar el brief NFL completo — objetivo real, tiendas participantes, presupuesto', 'Generar propuesta con elemento diferenciador: activación en tienda que genere contenido orgánico', 'Conectar el dolor de tráfico en tienda con el contexto NFL de forma memorable', 'Presentar con energía de "así ganamos juntos" — no de "aquí está la propuesta"'] },
        { titulo: 'Mapear aprobaciones cuando se confirme el deadline', que: 'En cuanto se confirme la fecha, trazar el calendario de aprobaciones con 40+ tiendas.', por_que: 'Con múltiples aprobadores internos, el tiempo de aprobación puede ser el cuello de botella real.', como: ['Preguntar: ¿quiénes son los tomadores de decisión y cómo aprueban?', 'En cuanto se confirme la fecha, construir calendario hacia atrás', 'Compartir el calendario con Liverpool como parte de la propuesta'] },
        { titulo: 'Propuesta que sorprenda — no que solo cumpla el brief', que: 'Incluir algo que Liverpool no esperaba pero que resuelve el problema real de tráfico.', por_que: 'La propuesta que gana conecta la emoción del NFL con el problema real de tráfico en tienda.', como: ['Identificar qué elemento NFL puede convertirse en mecánica de tráfico a tienda', 'Incluir componente de contenido orgánico: qué haría que el asistente saque el teléfono', 'Aterrizar presupuesto en niveles: versión básica y versión premium'] },
      ],
      nota: '🎯 Liverpool está evaluando si BOXER puede manejar proyectos grandes. Este entregable es la audición que define los proyectos que vienen.',
      cierre: 'Esta semana tiene todo para ser la semana en que Liverpool decida que BOXER es el socio para lo que viene.',
    },
    veredicto: 'APROBADO — nota crítica #1 incorporada correctamente',
  },
  {
    id: 'meta',
    cliente: 'META — Campaña Mundialista',
    sub: 'Pitch avanzado · Dependencia externa · Menos de 50 días',
    badges: [{ label: 'Pitch · Urgencia alta', cls: 'badge-amber' }, { label: '✓ Aprobado', cls: 'badge-green' }],
    diagnostico: 'Proyecto de campaña mundialista en fase de pitch. META delibera internamente con menos de 50 días disponibles una vez que confirmen. La combinación de urgencia alta + dependencia externa + burocracia define el plan: esta semana no es de ejecución — es de anticipación interna total.',
    variables: [
      { nombre: 'Etapa del cliente', valor: 'Pitch avanzado', cls: 'warn', impacto: 'Anticipar, no ejecutar' },
      { nombre: 'Urgencia real', valor: 'Alta — <50 días', cls: 'alert', impacto: 'Cada día perdido reduce el margen de producción' },
      { nombre: 'Dependencia externa', valor: 'Activa', cls: 'alert', impacto: 'META debe decidir antes de poder arrancar' },
      { nombre: 'Burocracia de contratación', valor: 'Semanas de proceso', cls: 'warn', impacto: 'Mapear y anticipar antes del sí' },
    ],
    plan: {
      apertura: 'Esta semana la ganamos si logramos que el día que META diga sí, podamos arrancar esa misma semana sin un solo día de preparación interna.',
      prioridades: [
        { titulo: 'Mapear deadlines y proceso de contratación — hoy', que: 'Entender cuánto tiempo consume el proceso de contratación de META y calcular los días reales de producción.', por_que: 'Con menos de 50 días disponibles, cada día sin decisión recorta el margen. El riesgo no es perder el pitch — es que lo aprueben tarde.', como: ['Contactar al comprador de META: ¿cuánto tarda el proceso de contratación?', 'Calcular: días totales menos contratación = días reales de producción', 'Si quedan menos de 30 días reales, documentarlo como riesgo', 'Preparar documento de fechas críticas listo para el día del sí'] },
        { titulo: 'Documentos de contratación listos para enviar', que: 'Tener todos los documentos que META pedirá para alta de proveedor listos antes de que los soliciten.', por_que: 'La burocracia de META puede tomar semanas. Esperar la solicitud pierde tiempo crítico de producción.', como: ['Listar todos los documentos que META solicita para alta de proveedor', 'Verificar que todos estén actualizados en carpeta lista para enviar', 'Resolver cualquier documento vencido esta semana'] },
        { titulo: 'Briefear al equipo con ambas opciones del pitch', que: 'Sesión interna para que el equipo esté listo para ejecutar cualquiera de las opciones desde el primer día.', por_que: 'Si META dice sí mañana, se debe poder convocar el TT operativo esa semana sin preparación adicional.', como: ['Sesión interna de 90 min con ambas opciones del pitch', 'Definir quién lidera qué en cada opción', 'Preparar la convocatoria del TT operativo — redactada y lista para enviar'] },
      ],
      nota: null,
      cierre: 'Esta semana se trata de estar listos antes del sí. Cuando llegue, arrancamos sin pausa.',
    },
    veredicto: 'APROBADO — coincide con el plan documentado en sesión de know-how',
  },
]

const ARCHETYPES = [
  { num: 1, nombre: 'La marca que ya existe pero no ejecuta', desc: 'Tiene presencia, producto y clientes. El marketing es caótico o inconsistente. El problema no es visibilidad — es ejecución.', canal: 'Canal prioritario: el que ya tiene audiencia activa. Reforzarlo antes de abrir nuevos.' },
  { num: 2, nombre: 'El negocio invisible', desc: 'Producto bueno, nadie lo conoce. Nunca ha invertido en marketing digital. Alto escepticismo inicial.', canal: 'Canal prioritario: Instagram o Facebook según la industria.' },
  { num: 3, nombre: 'El líder que no comunica', desc: 'Empresa grande o líder en su industria que no aprovecha su historia para vender más. Trade marketing tradicional.', canal: 'Canal prioritario: el equipo comercial interno — videos y materiales para cerrar ventas.' },
  { num: 4, nombre: 'El vendedor B2B sin sistema', desc: 'Ventas dependen 100% de relaciones personales del dueño. Ciclo largo, pipeline inestable.', canal: 'Canal prioritario: LinkedIn para nurturing. Eventos presenciales para demos.' },
]

function CaseCard({ c }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card">
      <div className="card-header" onClick={() => setOpen(!open)}>
        <div className="card-meta">
          <div className="badges">{c.badges.map((b, i) => <span key={i} className={`badge ${b.cls}`}>{b.label}</span>)}</div>
          <div className="case-name">{c.cliente}</div>
          <div className="case-sub">{c.sub}</div>
        </div>
        <button className="expand-btn">{open ? 'Cerrar ↑' : 'Ver plan ↓'}</button>
      </div>
      {open && (
        <div className="case-body">
          <div className="diag-box">{c.diagnostico}</div>
          <p className="s-label" style={{ marginBottom: 8 }}>Variables activas detectadas</p>
          <div className="vars-grid">
            {c.variables.map((v, i) => (
              <div className="var-card" key={i}>
                <div className="var-name">{v.nombre}</div>
                <div className={`var-val ${v.cls}`}>{v.valor}</div>
                <div className="var-imp">{v.impacto}</div>
              </div>
            ))}
          </div>
          <p className="plan-apertura">"{c.plan.apertura}"</p>
          {c.plan.prioridades.map((p, i) => (
            <div className="prio" key={i}>
              <div className="prio-header"><div className="prio-num">{i + 1}</div><div className="prio-title">{p.titulo}</div></div>
              <div className="prio-detail">
                <div className="prio-lbl">Por qué</div><p className="prio-text">{p.por_que}</p>
                <div className="prio-lbl">Qué hacer</div><p className="prio-text">{p.que}</p>
                <div className="prio-lbl">Cómo</div>
                <ul className="prio-steps">{p.como.map((s, j) => <li key={j}>{s}</li>)}</ul>
              </div>
            </div>
          ))}
          {c.plan.nota && <div className="nota-audicion">{c.plan.nota}</div>}
          <p className="plan-cierre">"{c.plan.cierre}"</p>
          <div className="veredicto">✓ {c.veredicto}</div>
        </div>
      )}
    </div>
  )
}

function ResultDisplay({ r }) {
  return (
    <div className="result-wrap">
      <hr className="divider" />
      <p className="s-label">Diagnóstico generado {r._model ? <span style={{color:'var(--purple)',fontSize:11}}>· {r._model}</span> : ''}</p>
      <div className="result-arch">
        <div className="arch-num-big">{r.arquetipo}</div>
        <div><div className="result-arch-name">{r.arquetipo_nombre}</div><div className="result-arch-diag">{r.diagnostico}</div></div>
      </div>
      {r.variables?.length > 0 && (
        <><p className="s-label" style={{ marginBottom: 8 }}>Variables activas detectadas</p>
        <div className="vars-grid" style={{ marginBottom: 20 }}>
          {r.variables.map((v, i) => <div className="var-card" key={i}><div className="var-name">{v.nombre}</div><div className="var-val">{v.valor}</div><div className="var-imp">{v.impacto}</div></div>)}
        </div></>
      )}
      {r.plan && <>
        <p className="plan-apertura">"{r.plan.apertura}"</p>
        {(r.plan.prioridades || []).map((p, i) => (
          <div className="prio" key={i}>
            <div className="prio-header"><div className="prio-num">{i + 1}</div><div className="prio-title">{p.titulo}</div></div>
            <div className="prio-detail">
              <div className="prio-lbl">Por qué</div><p className="prio-text">{p.por_que}</p>
              <div className="prio-lbl">Qué hacer</div><p className="prio-text">{p.que}</p>
              <div className="prio-lbl">Cómo</div>
              <ul className="prio-steps">{(p.como || []).map((s, j) => <li key={j}>{s}</li>)}</ul>
            </div>
          </div>
        ))}
        {r.plan.nota_audicion && <div className="nota-audicion">🎯 {r.plan.nota_audicion}</div>}
        {r.plan.cierre && <p className="plan-cierre">"{r.plan.cierre}"</p>}
      </>}
    </div>
  )
}

export default function Home() {
  const [tab, setTab] = useState('demos')
  const [form, setForm] = useState({ nombre: '', industria: '', descripcion: '', situacion: '', canales: '', objetivo: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const generatePlan = async () => {
    if (!form.nombre || !form.industria || !form.descripcion) {
      setError('Por favor llena al menos: nombre del negocio, industria y descripción.')
      return
    }
    setLoading(true); setResult(null); setError(null)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      // Handle non-JSON responses (e.g. Vercel timeout HTML)
      const text = await res.text()
      let data
      try { data = JSON.parse(text) }
      catch { throw new Error('El servidor tardó demasiado. Intenta con menos texto en los campos o recarga la página.') }
      if (!res.ok) throw new Error(data?.error || `Error del servidor (${res.status})`)
      setResult(data)
    } catch (e) {
      setError(e.message || 'Error inesperado. Intenta de nuevo.')
    } finally { setLoading(false) }
  }

  return (
    <>
      <Head>
        <title>MIA — Marketing Intelligence Agent · Demo</title>
        <meta name="description" content="Demo del Agente Líder de MIA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>M</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="page">
        <header className="header">
          <div className="header-left">
            <div className="logo-badge">M</div>
            <div><div className="header-title">MIA — Marketing Intelligence Agent</div><div className="header-sub">Agente Líder · Demo del sistema de planes semanales</div></div>
          </div>
          <div className="header-tag">Fase 1 · Semana 2 · Confidencial</div>
        </header>

        <div className="tabs">
          {[['demos','Casos de referencia'],['live','Demo en vivo'],['arquetipos','Los 4 arquetipos']].map(([id, label]) => (
            <button key={id} className={`tab ${tab===id?'active':''}`} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>

        {tab === 'demos' && (
          <div><p className="s-label">3 casos reales validados · Mayo 2026</p>
          {DEMO_CASES.map(c => <CaseCard key={c.id} c={c} />)}</div>
        )}

        {tab === 'live' && (
          <div>
            <p className="s-label">Ingresa los datos de cualquier negocio — MIA genera el diagnóstico y plan en vivo</p>
            <div className="card">
              <div className="form-grid">
                <div className="field"><label>Nombre del negocio *</label><input value={form.nombre} onChange={set('nombre')} placeholder="Ej. Café Hidalgo" /></div>
                <div className="field"><label>Industria / sector *</label><input value={form.industria} onChange={set('industria')} placeholder="Ej. Restaurantes y cafeterías" /></div>
                <div className="field full"><label>¿Qué venden y a quién le venden? *</label><input value={form.descripcion} onChange={set('descripcion')} placeholder="Ej. Café especialidad a profesionistas en Condesa, CDMX" /></div>
                <div className="field full"><label>¿Cómo están las ventas hoy? (máx. 300 caracteres)</label><textarea value={form.situacion} onChange={set('situacion')} maxLength={300} placeholder="Ej. Ventas estancadas. Clientes regulares pero no entra gente nueva. Instagram activo pero sin constancia." /></div>
                <div className="field"><label>Canales de marketing activos</label><input value={form.canales} onChange={set('canales')} placeholder="Ej. Instagram, WhatsApp" /></div>
                <div className="field"><label>Objetivo a 90 días</label><input value={form.objetivo} onChange={set('objetivo')} placeholder="Ej. 20 clientes nuevos al mes" /></div>
              </div>
              {error && <div className="error-box">{error}</div>}
              <button className="gen-btn" onClick={generatePlan} disabled={loading}>
                {loading ? 'Generando plan…' : '✦ Generar diagnóstico y plan semanal'}
              </button>
              {loading && <div className="loading-box">MIA está analizando el negocio<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></div>}
              {result && <ResultDisplay r={result} />}
            </div>
          </div>
        )}

        {tab === 'arquetipos' && (
          <div>
            <p className="s-label">Los 4 arquetipos · base del diagnóstico del Agente Líder</p>
            <div className="arch-grid">
              {ARCHETYPES.map(a => (
                <div className="arch-card" key={a.num}>
                  <div className="arch-num">Arquetipo {a.num}</div>
                  <div className="arch-name">{a.nombre}</div>
                  <div className="arch-desc">{a.desc}</div>
                  <div className="arch-desc" style={{marginTop:8,opacity:.7,fontSize:12}}>{a.canal}</div>
                </div>
              ))}
            </div>
            <div className="formula" style={{marginTop:24}}>
              <span className="formula-pill">Arquetipo del cliente</span><span className="formula-sep">+</span>
              <span className="formula-pill">12 variables activas</span><span className="formula-sep">+</span>
              <span className="formula-pill">Regla de priorización</span><span className="formula-sep">=</span>
              <span className="formula-pill result">Plan semanal personalizado</span>
            </div>
          </div>
        )}

        <footer className="footer">MIA — Marketing Intelligence Agent · Confidencial · Socios fundadores · Mayo 2026</footer>
      </div>
    </>
  )
}
