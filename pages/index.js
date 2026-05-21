import { useState } from 'react'
import Head from 'next/head'

function ResultDisplay({ r }) {
  if (!r) return null

  return (
    <div className="result-wrap">
      <hr className="divider" />
      <p className="s-label">
        Diagnóstico generado {r._model ? <span style={{ color: 'var(--purple)', fontSize: 11 }}>· {r._model}</span> : ''}
      </p>

      <div className="result-arch">
        <div className="arch-num-big">{r.arquetipo}</div>
        <div>
          <div className="result-arch-name">{r.arquetipo_nombre}</div>
          <div className="result-arch-diag">{r.diagnostico}</div>
        </div>
      </div>

      {r.variables?.length > 0 && (
        <>
          <p className="s-label" style={{ marginBottom: 8 }}>Variables activas detectadas</p>
          <div className="vars-grid" style={{ marginBottom: 20 }}>
            {r.variables.map((v, i) => (
              <div className="var-card" key={i}>
                <div className="var-name">{v.nombre}</div>
                <div className="var-val">{v.valor}</div>
                <div className="var-imp">{v.impacto}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {r.plan && (
        <>
          <p className="plan-apertura">"{r.plan.apertura}"</p>

          {(r.plan.prioridades || []).map((p, i) => (
            <div className="prio" key={i}>
              <div className="prio-header">
                <div className="prio-num">{i + 1}</div>
                <div className="prio-title">{p.titulo}</div>
              </div>

              <div className="prio-detail">
                <div className="prio-lbl">Por qué</div>
                <p className="prio-text">{p.por_que}</p>

                <div className="prio-lbl">Qué hacer</div>
                <p className="prio-text">{p.que}</p>

                <div className="prio-lbl">Cómo</div>
                <ul className="prio-steps">
                  {(p.como || []).map((s, j) => <li key={j}>{s}</li>)}
                </ul>
              </div>
            </div>
          ))}

          {r.plan.cierre && <p className="plan-cierre">"{r.plan.cierre}"</p>}
        </>
      )}
    </div>
  )
}

export default function Home() {
  const [form, setForm] = useState({
    nombre: '',
    industria: '',
    descripcion: '',
    situacion: '',
    canales: '',
    objetivo: '',
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const setField = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value })
  }

  const generatePlan = async () => {
    if (!form.nombre || !form.industria || !form.descripcion) {
      setError('Por favor llena al menos: nombre del negocio, industria y descripción.')
      return
    }

    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const text = await res.text()
      let data

      try {
        data = JSON.parse(text)
      } catch {
        throw new Error('El servidor respondió algo que no es JSON. Revisa el deploy en Vercel.')
      }

      if (!res.ok) {
        throw new Error(data?.error || `Error del servidor (${res.status})`)
      }

      setResult(data)
    } catch (e) {
      setError(e.message || 'Error inesperado. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>MIA — Marketing Intelligence Agent · Demo</title>
        <meta name="description" content="Demo del Agente Líder de MIA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="page">
        <header className="header">
          <div className="header-left">
            <div className="logo-badge">M</div>
            <div>
              <div className="header-title">MIA — Marketing Intelligence Agent</div>
              <div className="header-sub">Agente Líder · Demo del sistema de planes semanales</div>
            </div>
          </div>
          <div className="header-tag">Demo en vivo</div>
        </header>

        <div className="tabs">
          <button className="tab active">Demo en vivo</button>
        </div>

        <div>
          <p className="s-label">
            Ingresa los datos de cualquier negocio — MIA genera el diagnóstico y plan en vivo
          </p>

          <div className="card">
            <div className="form-grid">
              <div className="field">
                <label>Nombre del negocio *</label>
                <input
                  value={form.nombre}
                  onChange={setField('nombre')}
                  placeholder="Ej. Forward AI"
                />
              </div>

              <div className="field">
                <label>Industria / sector *</label>
                <input
                  value={form.industria}
                  onChange={setField('industria')}
                  placeholder="Ej. Implementación de inteligencia artificial"
                />
              </div>

              <div className="field full">
                <label>¿Qué venden y a quién le venden? *</label>
                <input
                  value={form.descripcion}
                  onChange={setField('descripcion')}
                  placeholder="Ej. Agentes de IA en producción para empresas"
                />
              </div>

              <div className="field full">
                <label>¿Cómo están las ventas hoy? ¿Qué está pasando?</label>
                <textarea
                  value={form.situacion}
                  onChange={setField('situacion')}
                  maxLength={300}
                  placeholder="Ej. Estamos en transición de marca, tenemos casos reales pero falta contenido activo e inbound."
                />
              </div>

              <div className="field">
                <label>Canales de marketing activos</label>
                <input
                  value={form.canales}
                  onChange={setField('canales')}
                  placeholder="Ej. LinkedIn"
                />
              </div>

              <div className="field">
                <label>Objetivo a 90 días</label>
                <input
                  value={form.objetivo}
                  onChange={setField('objetivo')}
                  placeholder="Ej. Activar 2 pilotos"
                />
              </div>
            </div>

            {error && <div className="error-box">{error}</div>}

            <button className="gen-btn" onClick={generatePlan} disabled={loading}>
              {loading ? 'Generando plan…' : 'Generar diagnóstico y plan semanal'}
            </button>

            {loading && (
              <div className="loading-box">
                MIA está analizando el negocio...
              </div>
            )}

            {result && <ResultDisplay r={result} />}
          </div>
        </div>

        <footer className="footer">
          MIA — Marketing Intelligence Agent · Confidencial · Mayo 2026
        </footer>
      </div>
    </>
  )
}
