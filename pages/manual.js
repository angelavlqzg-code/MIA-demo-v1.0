import Head from 'next/head'
import Link from 'next/link'

export default function Manual() {
  return (
    <>
      <Head>
        <title>Manual del Agente Líder · MIA</title>
        <meta name="description" content="Manual de referencia del Agente Líder de MIA — arquetipos, variables, prompts y flujo del sistema" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>M</text></svg>" />
      </Head>

      <div className="man-page">
        {/* Header */}
        <header className="man-header">
          <div className="man-header-inner">
            <Link href="/" className="man-back">← Demo</Link>
            <div className="man-logo-row">
              <div className="man-badge">M</div>
              <div>
                <div className="man-title">Manual del Agente Líder</div>
                <div className="man-sub">MIA — Marketing Intelligence Agent · v1.0 · Confidencial socios</div>
              </div>
            </div>
          </div>
        </header>

        <div className="man-body">
          {/* Nav */}
          <nav className="man-nav">
            <div className="man-nav-label">Contenido</div>
            {[
              ['#que-es', '1. Qué es el Agente Líder'],
              ['#arquetipos', '2. Los 4 arquetipos'],
              ['#variables', '3. Las 12 variables'],
              ['#priorizacion', '4. Regla de priorización'],
              ['#sectores', '5. Sectores con autoridad'],
              ['#tono', '6. El tono de MIA'],
              ['#flujo', '7. Flujo del sistema'],
              ['#prompts', '8. Cómo usar los prompts'],
              ['#calidad', '9. Criterios de calidad'],
              ['#glosario', '10. Glosario'],
            ].map(([href, label]) => (
              <a key={href} href={href} className="man-nav-item">{label}</a>
            ))}
          </nav>

          {/* Content */}
          <main className="man-content">

            {/* Intro */}
            <div className="man-intro-box">
              <p>Este manual es la guía de referencia del Agente Líder de MIA. Explica qué es, cómo funciona, en qué se basa cada decisión y cómo usar la librería de prompts.</p>
              <p style={{marginTop: 8}}>Está escrito para dos audiencias: <strong>Isai (FWD)</strong> para construir la lógica técnica, y <strong>Ricardo</strong> para validar que la lógica replicada es fiel a su metodología.</p>
              <div className="man-criterio">
                <span className="man-criterio-label">Criterio de aprobación</span>
                Ricardo puede leerlo y confirmar que, si no estuviera en la empresa, este manual sería suficiente para que alguien más genere los planes que él generaría.
              </div>
            </div>

            {/* 1 */}
            <section id="que-es">
              <h2>1. Qué es el Agente Líder</h2>
              <p>El Agente Líder es el núcleo de MIA. Es la IA que genera el plan semanal personalizado de marketing para cada cliente.</p>
              <p>No es un chatbot de preguntas y respuestas. No es un generador de contenido genérico. Es un sistema de diagnóstico + priorización que replica el razonamiento estratégico de un director de marketing con experiencia real — específicamente el de Ricardo, Founder Estratégico de BOXER TTL.</p>
              <div className="man-highlight">El Agente Líder hace cada lunes lo que Ricardo haría: diagnostica primero, luego prioriza, luego genera el plan.</div>
              <div className="man-formula">
                <div className="man-formula-pill">Arquetipo del cliente</div>
                <span className="man-formula-op">+</span>
                <div className="man-formula-pill">Variables activas</div>
                <span className="man-formula-op">+</span>
                <div className="man-formula-pill">Regla de priorización</div>
                <span className="man-formula-op">=</span>
                <div className="man-formula-pill result">Plan semanal personalizado</div>
              </div>
            </section>

            {/* 2 */}
            <section id="arquetipos">
              <h2>2. Los 4 arquetipos de cliente</h2>
              <p>Todos los clientes quieren vender más. El <strong>POR QUÉ</strong> no están vendiendo es diferente en cada arquetipo. El Agente Líder diagnostica el arquetipo correcto en el onboarding para priorizar correctamente.</p>

              {[
                {
                  num: 1, nombre: 'La marca que ya existe pero no ejecuta',
                  perfil: 'Tiene presencia, producto y clientes. Pero su marketing es caótico o inconsistente.',
                  caso: 'SPORTMEX (Columbia / Psycho Bunny) — todos los canales activos, audiencia existente, pero operación interna caótica.',
                  dolor: 'Falta de orden y ejecución consistente. Tienen todo para crecer pero no el sistema para ejecutar semana a semana.',
                  señales: ['Ha tenido agencia antes o ha intentado hacer marketing propio', 'Tiene cuentas activas en redes pero no publica con consistencia', 'Dice "tenemos todo pero no está organizado" o "empezamos muchas cosas y no terminamos ninguna"'],
                  funciona: ['Auditar lo que ya existe', 'Priorizar el canal con más audiencia activa', 'Establecer ritmo consistente antes de lanzar campañas nuevas'],
                  nofunciona: 'Lanzar campañas nuevas antes de tener orden en lo básico.',
                  canal: 'El canal donde ya tienen audiencia activa — reforzarlo antes de abrir nuevos.',
                },
                {
                  num: 2, nombre: 'El negocio invisible',
                  perfil: 'Tiene un producto bueno pero nadie lo conoce. Nunca ha invertido en marketing. Arranca desde cero.',
                  caso: 'ISIS (Adhesivos automotrices) — nunca había hecho marketing digital. Alto escepticismo inicial. Cliente muy satisfecho tras educarlo correctamente.',
                  dolor: 'No sabe que necesita digitalizarse. Alto escepticismo inicial. Espera ROI inmediato sin entender que primero se construye la base.',
                  señales: ['Dice "nunca hemos hecho redes" o "no entendemos mucho de marketing digital"', 'Pregunta cuánto tiempo tarda en ver resultados antes de entender el proceso', 'Tiene buen producto pero cero presencia digital'],
                  funciona: ['Educación primero', 'Presencia básica antes de pautar', 'El primer mes es de cimientos, no de campañas', 'Un resultado pequeño pero visible genera la confianza que sostiene la relación'],
                  nofunciona: 'Pautar con presupuesto alto antes de tener presencia orgánica mínima.',
                  canal: 'Instagram o Facebook según la industria — donde su cliente ideal pasa más tiempo.',
                },
                {
                  num: 3, nombre: 'El líder que no comunica',
                  perfil: 'Empresa grande o líder en su industria que no aprovecha su propia historia para vender más.',
                  caso: 'PINSA (Atún Dolores) — más de 2,000 empleados, líder en su industria, solo usaban trade marketing tradicional. Más de 20 proyectos concretados.',
                  dolor: 'Desconocimiento del poder del storytelling. No ven la comunicación como inversión comercial.',
                  señales: ['Empresa grande o conocida en su sector', 'No tiene video institucional o su comunicación es muy tradicional', 'El equipo comercial vende de boca en boca o con materiales obsoletos'],
                  funciona: ['Un primer proyecto pequeño que demuestre ROI rápido', 'El caso de éxito interno es el mejor vendedor para el siguiente proyecto'],
                  nofunciona: 'Proponer proyectos grandes y costosos al inicio antes de demostrar valor.',
                  canal: 'El equipo comercial interno — los videos y materiales que usan para cerrar ventas.',
                },
                {
                  num: 4, nombre: 'El vendedor B2B sin sistema',
                  perfil: 'Vende a empresas o gobierno. Las ventas dependen de relaciones personales. Necesita un sistema para generar y nutrir prospectos sin depender del dueño.',
                  caso: 'AXXON (Seguridad tecnológica) y BOXER TTL.',
                  dolor: 'Ciclo de ventas largo, pipeline inestable y dependencia total del CEO para cerrar deals.',
                  señales: ['Sus clientes son empresas o gobierno, no consumidor final', 'El dueño o CEO cierra personalmente todos los deals', 'Dice "cuando yo no estoy, no se cierra nada" o "el pipeline está quieto"'],
                  funciona: ['Activos de autoridad (casos de éxito, contenido de valor, LinkedIn)', 'Sistema simple de seguimiento de prospectos', 'El objetivo no es cerrar rápido sino mantener el pipeline caliente'],
                  nofunciona: 'Campañas de respuesta directa o pauta agresiva en redes de consumo.',
                  canal: 'LinkedIn para prospección y nurturing. Eventos presenciales para demos y cierre.',
                },
              ].map((a) => (
                <div className="man-arch-card" key={a.num}>
                  <div className="man-arch-header">
                    <div className="man-arch-num">{a.num}</div>
                    <div className="man-arch-name">{a.nombre}</div>
                  </div>
                  <div className="man-arch-body">
                    <div className="man-arch-row"><span className="man-lbl">Perfil</span><span>{a.perfil}</span></div>
                    <div className="man-arch-row"><span className="man-lbl">Caso real</span><span>{a.caso}</span></div>
                    <div className="man-arch-row"><span className="man-lbl">Dolor típico</span><span>{a.dolor}</span></div>
                    <div className="man-arch-row">
                      <span className="man-lbl">Señales</span>
                      <ul className="man-list">{a.señales.map((s, i) => <li key={i}>{s}</li>)}</ul>
                    </div>
                    <div className="man-arch-row">
                      <span className="man-lbl">Qué funciona</span>
                      <ol className="man-list">{a.funciona.map((s, i) => <li key={i}>{s}</li>)}</ol>
                    </div>
                    <div className="man-arch-row man-nofunciona"><span className="man-lbl">Qué NO funciona</span><span>{a.nofunciona}</span></div>
                    <div className="man-arch-row man-canal"><span className="man-lbl">Canal prioritario</span><span>{a.canal}</span></div>
                  </div>
                </div>
              ))}
            </section>

            {/* 3 */}
            <section id="variables">
              <h2>3. Las 12 variables de decisión del lunes</h2>
              <p>Ricardo no prioriza tareas — prioriza diagnósticos. Antes de decir qué hacer esta semana, evalúa el estado de estas variables. El Agente Líder replica ese diagnóstico.</p>

              <h3>Las 9 variables base</h3>
              <div className="man-table-wrap">
                <table className="man-table">
                  <thead><tr><th>#</th><th>Variable</th><th>Valores posibles</th><th>Cómo cambia el plan</th></tr></thead>
                  <tbody>
                    {[
                      ['1','Etapa del cliente','Pitch / Confirmado / En ejecución / Cierre','Define si el foco es cerrar, producir o retener. Pitch = anticipar. En ejecución = control operativo.'],
                      ['2','Urgencia real','Alta / Media / Baja','A mayor desproporción entre tiempo y complejidad, más control operativo y menos espacio para creatividad.'],
                      ['3','Estructura de aprobación','1 persona / Comité / Burocracia','Comité = documento de deadlines con consecuencias. 1 persona = llamada directa. Burocracia = anticipar tiempos.'],
                      ['4','Control de scope','OK / Pide cambios / Fuera de control','Scope caótico = semana de contención y documentación antes de cualquier producción.'],
                      ['5','Dependencia externa','Pendiente / En proceso / Sin bloqueos','Si hay dependencia, la semana es de anticipación interna — no de ejecución.'],
                      ['6','Estado del pipeline','Sano / Débil / Sin leads','Pipeline débil = tiempo dedicado a prospección activa esa semana, sin importar lo demás.'],
                      ['7','Calidad del prospecto','Brief claro / Sin brief / Solo explorando','Filtrar antes de invertir tiempo. Un prospecto sin brief claro no recibe propuesta hasta calificarlo.'],
                      ['8','Preparación interna','Lista / Curva de aprendizaje / Recursos limitados','Si el equipo no está listo, la primera acción es briefing interno — antes de cualquier entregable.'],
                      ['9','Plan de vuelo','Actualizado / Desactualizado / Sin plan','Sin plan de vuelo actualizado, la primera acción es reconstruirlo. No se puede priorizar sin saber dónde está cada entregable.'],
                    ].map(([n, v, vals, cambio]) => (
                      <tr key={n}><td className="man-td-num">{n}</td><td><strong>{v}</strong></td><td className="man-td-vals">{vals}</td><td>{cambio}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3>Las 3 variables adicionales (validación Liverpool)</h3>
              <div className="man-table-wrap">
                <table className="man-table">
                  <thead><tr><th>#</th><th>Variable</th><th>Pregunta a hacer</th><th>Cómo cambia el plan</th></tr></thead>
                  <tbody>
                    <tr><td className="man-td-num">10</td><td><strong>Deadline confirmado</strong></td><td>"¿El deadline está confirmado o todavía está por definirse?"</td><td>Confirmado → mapeo operativo #1. Abierto → calidad creativa #1.</td></tr>
                    <tr><td className="man-td-num">11</td><td><strong>Construcción de confianza</strong></td><td>"¿Hay algún cliente en modo de construir confianza para proyectos más grandes?"</td><td>Sí → cada entregable es una audición. Tono cambia de operativo a aspiracional.</td></tr>
                    <tr><td className="man-td-num">12</td><td><strong>Plan de vuelo al día</strong></td><td>"¿El plan de entregables está actualizado o hay que reconstruirlo primero?"</td><td>Desactualizado → primera prioridad del lunes: reconstruirlo.</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="man-nota">El Agente Líder no puede ASUMIR el valor de las variables — debe PREGUNTAR. En particular, el deadline no se asume por contexto — se pregunta explícitamente. Ese valor cambia el ORDEN de las prioridades, no solo el contenido del plan.</div>
            </section>

            {/* 4 */}
            <section id="priorizacion">
              <h2>4. La regla de priorización</h2>
              <p>Esta es la regla más importante del sistema. <strong>Diagnóstico antes que receta.</strong> MIA no llega con soluciones antes de entender el problema real.</p>

              <h3>Por arquetipo</h3>
              <div className="man-table-wrap">
                <table className="man-table">
                  <thead><tr><th>Arquetipo</th><th>Variables críticas</th><th>Foco del plan</th></tr></thead>
                  <tbody>
                    <tr><td>1 — Ya existe pero no ejecuta</td><td>Urgencia real, plan de vuelo, preparación interna</td><td>Orden y ejecución consistente antes de cualquier iniciativa nueva</td></tr>
                    <tr><td>2 — Negocio invisible</td><td>Etapa, calidad del prospecto, pipeline</td><td>Educación primero, base orgánica, expectativas claras de tiempo</td></tr>
                    <tr><td>3 — Líder que no comunica</td><td>Control de scope, dependencia externa, aprobación</td><td>Proyecto pequeño que demuestre ROI rápido antes de proponer algo grande</td></tr>
                    <tr><td>4 — Vendedor B2B sin sistema</td><td>Pipeline, calidad del prospecto, urgencia real</td><td>Activos de autoridad y sistema de seguimiento antes de campañas</td></tr>
                  </tbody>
                </table>
              </div>

              <h3>Orden de las reglas</h3>
              <div className="man-rules">
                {[
                  ['Regla 1','Plan de vuelo sin plan o desactualizado','Reconstruirlo primero. Sin saber dónde está cada entregable, todo lo demás es ruido.'],
                  ['Regla 2','Equipo no está listo','Briefing interno antes de cualquier entregable al cliente.'],
                  ['Regla 3','Deadline no confirmado','Priorizar calidad del entregable. El creativo va antes que el mapeo operativo.'],
                  ['Regla 4','Deadline confirmado + urgencia alta','Mapeo operativo y anticipación como prioridad #1.'],
                  ['Regla 5','Construcción de confianza activa','Nota explícita: cada entregable es audición. Tono aspiracional, no operativo.'],
                  ['Regla 6','Pipeline débil','Tiempo explícito de prospección activa en el plan, sin importar lo demás.'],
                  ['Regla 7','Dependencia externa','La semana es de anticipación interna — no de ejecución.'],
                  ['Regla 8','Scope fuera de control','Semana de contención y documentación antes de producción.'],
                  ['Regla 9','Comité sin jerarquía','Documento formal de deadlines con consecuencias. Una llamada no funciona.'],
                ].map(([r, cond, accion]) => (
                  <div className="man-rule" key={r}>
                    <div className="man-rule-header">
                      <span className="man-rule-num">{r}</span>
                      <span className="man-rule-cond">{cond}</span>
                    </div>
                    <div className="man-rule-accion">{accion}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5 */}
            <section id="sectores">
              <h2>5. Los 5 sectores con autoridad real</h2>
              <div className="man-table-wrap">
                <table className="man-table">
                  <thead><tr><th>Sector</th><th>Movimiento que funciona</th><th>Trampa típica</th></tr></thead>
                  <tbody>
                    {[
                      ['Consumo masivo, retail y autos','Alta producción visual + storytelling + presencia consistente multicanal','Creatividad genérica sin diferenciación — estos clientes ya vieron todo'],
                      ['Experiencias y eventos BTL','Activaciones que generan contenido orgánico — que el asistente quiera fotografiar y compartir','Producción cara sin mecánica de amplificación digital. Sin UGC, el evento muere ese día'],
                      ['Presencia de marca y display','Consistencia visual y frecuencia de impacto. Más vale estar siempre que hacer una campaña grande cada 6 meses','Display sin segmentación. Impresiones baratas que nadie recuerda'],
                      ['Trade marketing y promociones','Mecánicas simples con incentivo claro. El shopper decide en segundos','Promociones complejas con muchos pasos. Matan la conversión antes del punto de compra'],
                      ['Marketing digital y crecimiento','Primero audiencia orgánica, luego pauta. Creativos probados antes de escalar presupuesto','Pautar sin creativos probados. El presupuesto se quema en aprendizaje caro'],
                    ].map(([s, f, t]) => (
                      <tr key={s}><td><strong>{s}</strong></td><td>{f}</td><td className="man-td-trampa">{t}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 6 */}
            <section id="tono">
              <h2>6. El tono de MIA</h2>
              <div className="man-highlight">Cercano como un colega. Directo como un director. Comprometido como un socio.</div>

              <h3>Frases que SÍ usa MIA</h3>
              <div className="man-frases">
                {[
                  ['"Ok, vamos a cerrar esto hoy."','Para decisiones o acciones que se han postergado'],
                  ['"Es el momento de cerrar esto."','Cuando el contexto indica que esta semana es la ventana correcta'],
                  ['"Que se enamoren de nosotros es nuestra misión."','Para planes de primera impresión poderosa'],
                  ['"Esta semana la ganamos si logramos esto."','Para abrir cualquier plan semanal'],
                ].map(([f, c]) => (
                  <div className="man-frase" key={f}>
                    <div className="man-frase-text">{f}</div>
                    <div className="man-frase-ctx">{c}</div>
                  </div>
                ))}
              </div>

              <h3>Apertura estándar del plan</h3>
              <div className="man-apertura">"Esta semana la ganamos si logramos [objetivo concreto]. Tenemos todo para hacerlo — aquí está el plan."</div>

              <h3>Lo que MIA NUNCA usa</h3>
              <div className="man-table-wrap">
                <table className="man-table">
                  <thead><tr><th>Prohibido</th><th>Por qué</th></tr></thead>
                  <tbody>
                    {[
                      ['Groserías','Reducen la percepción de autoridad y pueden incomodar a clientes de perfil formal.'],
                      ['Slang extremo o jerga informal','Crea distancia con clientes de perfil profesional. MIA habla mexicano natural — no extremo.'],
                      ['Anglicismos sin contexto: insights, engagement, KPI, awareness','Alejan al cliente pyme. MIA usa español cuando existe el equivalente.'],
                      ['Lenguaje corporativo frío: "le hacemos llegar", "adjuntamos para su revisión"','Tono de proveedor, no de partner.'],
                      ['Promesas sin sustento: "garantizamos resultados", "esto va a funcionar seguro"','El tono de MIA es de confianza basada en criterio — no de promesa comercial.'],
                    ].map(([p, r]) => <tr key={p}><td><strong>{p}</strong></td><td>{r}</td></tr>)}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 7 */}
            <section id="flujo">
              <h2>7. Flujo completo del sistema</h2>
              <div className="man-flujos">
                <div className="man-flujo">
                  <div className="man-flujo-title">Cliente nuevo</div>
                  {['Cliente se registra','MIA-ONB-001 — Diagnóstico conversacional','Perfil de Negocio generado en JSON','MIA-PLN-001 — Plan semanal #1','Entrega lunes antes de las 9:00 AM','Cliente ejecuta o pregunta','Cierre dominical — feedback de la semana'].map((s, i) => (
                    <div className="man-step" key={i}><div className="man-step-num">{i + 1}</div><div>{s}</div></div>
                  ))}
                </div>
                <div className="man-flujo">
                  <div className="man-flujo-title">Cliente recurrente (desde semana 2)</div>
                  {['Domingo — sistema genera planes en batch','MIA-CHK-001 — Check-in semanal breve','MIA-PLN-001 — Plan semanal actualizado','Entrega lunes en la mañana','Monitoreo de actividad durante la semana','Cierre dominical — feedback'].map((s, i) => (
                    <div className="man-step" key={i}><div className="man-step-num">{i + 1}</div><div>{s}</div></div>
                  ))}
                </div>
              </div>
              <h3>Sistema anti-abandono</h3>
              <div className="man-table-wrap">
                <table className="man-table">
                  <thead><tr><th>Nivel</th><th>Días sin actividad</th><th>Acción</th></tr></thead>
                  <tbody>
                    <tr><td><span className="man-badge-n n1">N1</span></td><td>3-5 días</td><td>Mensaje de recordatorio suave — 1 acción ejecutable en 15 min</td></tr>
                    <tr><td><span className="man-badge-n n2">N2</span></td><td>6-10 días</td><td>Reenganche activo — urgencia positiva + consecuencia de no actuar</td></tr>
                    <tr><td><span className="man-badge-n n3">N3</span></td><td>+10 días</td><td>Alerta interna al equipo fundador — no mensaje automático al cliente</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 8 */}
            <section id="prompts">
              <h2>8. Cómo usar la librería de prompts</h2>
              {[
                ['MIA-SYS-001','Siempre cargar como base','El prompt de identidad se incluye en todos los demás. Sin él, el tono y la lógica no se activan correctamente.'],
                ['MIA-ONB-001','Cliente nuevo','Diagnóstico conversacional para identificar arquetipo, dolor principal y canal prioritario.'],
                ['MIA-CHK-001','Cliente recurrente','Actualiza variables críticas antes de generar el plan. No repite el onboarding desde cero.'],
                ['MIA-PLN-001','Generar el plan','Con Perfil de Negocio + Variables Activas actualizadas, genera el plan semanal con 3 prioridades.'],
                ['MIA-CWA-001','Copies WhatsApp','Según las prioridades del plan — 2 versiones: directa y cálida.'],
                ['MIA-CIG-001','Copies Instagram','Por sector y objetivo de publicación: feed, reel, story, carrusel.'],
                ['MIA-BRF-001','Brief de campaña','Brief ejecutable con objetivo medible, audiencia, métricas y aprobaciones.'],
                ['MIA-REG-001','Reenganche','N1 / N2 / N3 según días de inactividad del cliente.'],
              ].map(([id, uso, desc]) => (
                <div className="man-prompt-row" key={id}>
                  <div className="man-prompt-id">{id}</div>
                  <div><div className="man-prompt-uso">{uso}</div><div className="man-prompt-desc">{desc}</div></div>
                </div>
              ))}
            </section>

            {/* 9 */}
            <section id="calidad">
              <h2>9. Criterios de calidad</h2>
              <p>Antes de marcar cualquier prompt como "en producción", debe pasar estos criterios:</p>
              <div className="man-checklist">
                {[
                  ['El plan refleja el arquetipo del cliente','Comparar las prioridades con la tabla de foco por arquetipo'],
                  ['Cada prioridad tiene un "por qué" explícito','Verificar que no hay prioridades sin justificación'],
                  ['Las instrucciones son ejecutables sin asesor externo','Una persona sin experiencia de marketing puede seguirlas'],
                  ['El tono pasa el filtro de frases SÍ/NO','Verificar contra la lista de prohibidos del MIA-SYS-001'],
                  ['Sin anglicismos sin contexto','Búsqueda de KPI, insights, engagement, awareness'],
                  ['Ricardo califica el plan ≥ 4/5','Ejecutable por pyme MX + tono MX + instrucciones claras'],
                ].map(([c, v]) => (
                  <div className="man-check-row" key={c}>
                    <div className="man-check-box">✓</div>
                    <div><div className="man-check-name">{c}</div><div className="man-check-val">{v}</div></div>
                  </div>
                ))}
              </div>
            </section>

            {/* 10 */}
            <section id="glosario">
              <h2>10. Glosario</h2>
              <div className="man-table-wrap">
                <table className="man-table">
                  <thead><tr><th>Término</th><th>Definición en el contexto de MIA</th></tr></thead>
                  <tbody>
                    {[
                      ['Arquetipo','Perfil de cliente que define el patrón de dolor y la estrategia base. Hay 4 arquetipos.'],
                      ['Variables activas','Las 12 variables que el Agente Líder evalúa cada semana para actualizar el plan.'],
                      ['Plan de vuelo de entregables','Lista actualizada de qué entregables están en qué estado para cada cliente activo.'],
                      ['Construcción de confianza','Estado de una relación donde cada entregable es una audición para proyectos más grandes.'],
                      ['Pipeline','Estado del flujo de prospectos y oportunidades comerciales del cliente.'],
                      ['Control de scope','Grado en que el cliente respeta el presupuesto y los alcances acordados.'],
                      ['Dependencia externa','Bloqueo que impide ejecutar y depende de una decisión de terceros.'],
                      ['Deadline confirmado','Variable binaria: ¿la urgencia de tiempo ya es real o todavía está abierta?'],
                      ['Check-in semanal','Actualización breve de variables antes de generar el plan. No es un onboarding nuevo.'],
                      ['Sistema anti-abandono','Lógica N1/N2/N3 para reactivar clientes inactivos.'],
                      ['Gate de validación','Punto de decisión entre fases donde los socios deciden si avanzar o iterar.'],
                    ].map(([t, d]) => <tr key={t}><td><strong>{t}</strong></td><td>{d}</td></tr>)}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="man-footer">MIA Marketing Intelligence Agent · Manual del Agente Líder v1.0 · Confidencial socios · Mayo 2026</div>
          </main>
        </div>
      </div>

      <style>{`
        .man-page{font-family:'Outfit',sans-serif;background:#080618;color:#ede9ff;min-height:100vh}
        .man-header{background:#0f0c26;border-bottom:1px solid rgba(127,119,221,.2);padding:20px 0}
        .man-header-inner{max-width:1100px;margin:0 auto;padding:0 24px}
        .man-back{color:#7F77DD;font-size:13px;text-decoration:none;display:inline-block;margin-bottom:14px}
        .man-back:hover{color:#a09bec}
        .man-logo-row{display:flex;align-items:center;gap:12px}
        .man-badge{width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,#534AB7,#7F77DD);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:#fff;flex-shrink:0}
        .man-title{font-size:18px;font-weight:600;color:#fff}
        .man-sub{font-size:12px;color:#9B97C8;margin-top:2px}
        .man-body{max-width:1100px;margin:0 auto;padding:32px 24px;display:grid;grid-template-columns:220px 1fr;gap:40px;align-items:start}
        .man-nav{position:sticky;top:24px;background:#0f0c26;border:1px solid rgba(127,119,221,.18);border-radius:12px;padding:16px}
        .man-nav-label{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.1em;color:#6560a0;margin-bottom:10px}
        .man-nav-item{display:block;font-size:12.5px;color:#9B97C8;text-decoration:none;padding:5px 8px;border-radius:6px;margin-bottom:2px;line-height:1.4}
        .man-nav-item:hover{background:rgba(127,119,221,.1);color:#ede9ff}
        .man-content section{margin-bottom:48px}
        .man-content h2{font-size:20px;font-weight:600;color:#fff;margin:0 0 16px;padding-bottom:10px;border-bottom:1px solid rgba(127,119,221,.2)}
        .man-content h3{font-size:15px;font-weight:500;color:#a09bec;margin:20px 0 10px}
        .man-content p{font-size:14px;color:#9B97C8;line-height:1.7;margin-bottom:12px}
        .man-intro-box{background:#0f0c26;border:1px solid rgba(127,119,221,.2);border-radius:12px;padding:20px 22px;margin-bottom:36px;font-size:14px;color:#9B97C8;line-height:1.7}
        .man-intro-box strong{color:#ede9ff}
        .man-criterio{margin-top:14px;background:rgba(127,119,221,.08);border-left:3px solid #7F77DD;padding:10px 14px;font-size:13px;color:#a09bec;border-radius:0 6px 6px 0}
        .man-criterio-label{display:block;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.07em;color:#6560a0;margin-bottom:4px}
        .man-highlight{background:rgba(127,119,221,.1);border-left:3px solid #7F77DD;padding:12px 16px;font-size:14px;color:#a09bec;margin:16px 0;border-radius:0 8px 8px 0;font-style:italic}
        .man-formula{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:14px;background:rgba(127,119,221,.06);border:1px solid rgba(127,119,221,.15);border-radius:10px;margin-top:16px}
        .man-formula-pill{background:rgba(255,255,255,.05);border:1px solid rgba(127,119,221,.2);border-radius:100px;padding:6px 14px;font-size:12px;color:#9B97C8}
        .man-formula-pill.result{background:rgba(127,119,221,.2);border-color:rgba(127,119,221,.4);color:#a09bec;font-weight:500}
        .man-formula-op{color:#6560a0;font-size:16px}
        .man-arch-card{background:#0f0c26;border:1px solid rgba(127,119,221,.18);border-radius:12px;margin-bottom:16px;overflow:hidden}
        .man-arch-header{display:flex;align-items:center;gap:12px;padding:14px 18px;background:rgba(127,119,221,.06);border-bottom:1px solid rgba(127,119,221,.15)}
        .man-arch-num{width:32px;height:32px;border-radius:50%;background:#7F77DD;color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .man-arch-name{font-size:15px;font-weight:500;color:#fff}
        .man-arch-body{padding:14px 18px;display:flex;flex-direction:column;gap:10px}
        .man-arch-row{display:grid;grid-template-columns:130px 1fr;gap:10px;font-size:13px;align-items:start}
        .man-lbl{font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.07em;color:#6560a0;padding-top:2px}
        .man-list{padding-left:16px;color:#9B97C8;line-height:1.6}
        .man-list li{margin-bottom:3px}
        .man-nofunciona{background:rgba(224,85,85,.06);border-radius:6px;padding:8px 10px}
        .man-nofunciona .man-lbl{color:#a05050}
        .man-canal{background:rgba(29,158,117,.06);border-radius:6px;padding:8px 10px}
        .man-canal .man-lbl{color:#1D9E75}
        .man-table-wrap{overflow-x:auto;margin:12px 0}
        .man-table{width:100%;border-collapse:collapse;font-size:13px}
        .man-table th{text-align:left;padding:9px 12px;background:rgba(127,119,221,.1);color:#9B97C8;font-weight:500;font-size:11px;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid rgba(127,119,221,.2)}
        .man-table td{padding:9px 12px;border-bottom:1px solid rgba(127,119,221,.08);color:#9B97C8;vertical-align:top;line-height:1.5}
        .man-table td strong{color:#ede9ff}
        .man-table tr:last-child td{border-bottom:none}
        .man-td-num{font-weight:600;color:#7F77DD;width:32px}
        .man-td-vals{color:#a09bec}
        .man-td-trampa{color:#a07060}
        .man-nota{background:rgba(224,154,42,.08);border:1px solid rgba(224,154,42,.2);border-radius:8px;padding:12px 14px;font-size:13px;color:#c4943a;margin-top:14px;line-height:1.6}
        .man-rules{display:flex;flex-direction:column;gap:8px;margin-top:12px}
        .man-rule{background:#0f0c26;border:1px solid rgba(127,119,221,.15);border-radius:8px;padding:12px 14px}
        .man-rule-header{display:flex;align-items:center;gap:10px;margin-bottom:5px}
        .man-rule-num{font-size:11px;font-weight:500;color:#7F77DD;background:rgba(127,119,221,.15);border-radius:100px;padding:2px 8px;white-space:nowrap}
        .man-rule-cond{font-size:13px;font-weight:500;color:#ede9ff}
        .man-rule-accion{font-size:13px;color:#9B97C8;padding-left:52px;line-height:1.5}
        .man-frases{display:flex;flex-direction:column;gap:8px;margin:12px 0}
        .man-frase{background:#0f0c26;border:1px solid rgba(127,119,221,.15);border-radius:8px;padding:12px 14px}
        .man-frase-text{font-size:14px;font-style:italic;color:#a09bec;margin-bottom:4px}
        .man-frase-ctx{font-size:12px;color:#6560a0}
        .man-apertura{background:rgba(127,119,221,.08);border-left:3px solid #7F77DD;padding:12px 16px;font-size:14px;font-style:italic;color:#a09bec;border-radius:0 8px 8px 0;margin:12px 0}
        .man-flujos{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:16px 0}
        .man-flujo{background:#0f0c26;border:1px solid rgba(127,119,221,.18);border-radius:12px;padding:16px}
        .man-flujo-title{font-size:13px;font-weight:500;color:#7F77DD;margin-bottom:12px}
        .man-step{display:flex;align-items:flex-start;gap:10px;margin-bottom:8px;font-size:13px;color:#9B97C8}
        .man-step-num{width:22px;height:22px;border-radius:50%;background:rgba(127,119,221,.2);color:#a09bec;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
        .man-badge-n{font-size:11px;font-weight:600;padding:2px 8px;border-radius:100px}
        .n1{background:rgba(29,158,117,.15);color:#5dcaa5}
        .n2{background:rgba(224,154,42,.15);color:#f0c070}
        .n3{background:rgba(224,85,85,.15);color:#f07070}
        .man-prompt-row{display:flex;align-items:flex-start;gap:14px;padding:12px 14px;background:#0f0c26;border:1px solid rgba(127,119,221,.15);border-radius:8px;margin-bottom:8px}
        .man-prompt-id{font-size:11px;font-weight:600;color:#7F77DD;background:rgba(127,119,221,.15);border-radius:6px;padding:4px 8px;white-space:nowrap;font-family:monospace}
        .man-prompt-uso{font-size:13px;font-weight:500;color:#ede9ff;margin-bottom:3px}
        .man-prompt-desc{font-size:13px;color:#9B97C8}
        .man-checklist{display:flex;flex-direction:column;gap:8px}
        .man-check-row{display:flex;align-items:flex-start;gap:12px;padding:10px 14px;background:#0f0c26;border:1px solid rgba(127,119,221,.15);border-radius:8px}
        .man-check-box{width:22px;height:22px;border-radius:4px;background:rgba(29,158,117,.2);color:#5dcaa5;font-size:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
        .man-check-name{font-size:13px;font-weight:500;color:#ede9ff;margin-bottom:2px}
        .man-check-val{font-size:12px;color:#9B97C8}
        .man-footer{text-align:center;padding:32px 0 0;border-top:1px solid rgba(127,119,221,.15);margin-top:24px;font-size:12px;color:#6560a0}
        @media(max-width:768px){
          .man-body{grid-template-columns:1fr}
          .man-nav{display:none}
          .man-flujos{grid-template-columns:1fr}
          .man-arch-row{grid-template-columns:1fr}
        }
      `}</style>
    </>
  )
}
