# MIA — Marketing Intelligence Agent · Demo

Demo interactiva del Agente Líder de MIA. Muestra los 3 casos de referencia validados con Ricardo y permite generar planes en vivo para cualquier negocio usando el API de Claude.

---

## Despliegue en Vercel (5 pasos)

### Paso 1 — Obtén tu API Key de Anthropic
Ve a https://console.anthropic.com → API Keys → Create Key.  
Cópiala, la necesitas en el Paso 4.

### Paso 2 — Sube el proyecto a GitHub
1. Crea un repo nuevo en github.com (puede ser privado)
2. Sube todos estos archivos al repo

O desde terminal:
```bash
git init
git add .
git commit -m "MIA demo v1.0"
git remote add origin https://github.com/TU_USUARIO/mia-demo.git
git push -u origin main
```

### Paso 3 — Conecta con Vercel
1. Ve a https://vercel.com → New Project
2. Importa el repo que creaste
3. Vercel detecta Next.js automáticamente → clic en Deploy

### Paso 4 — Agrega la API Key como variable de entorno
En Vercel → tu proyecto → Settings → Environment Variables:
- Name: `ANTHROPIC_API_KEY`
- Value: tu API key de Anthropic (sk-ant-api03-...)
- Environments: Production, Preview, Development ✓

### Paso 5 — Redespliega
En Vercel → Deployments → clic en los 3 puntos del último deploy → Redeploy.

**Listo.** Tu demo está en `https://mia-demo-XXXXX.vercel.app`

---

## Desarrollo local

```bash
# 1. Instala dependencias
npm install

# 2. Crea el archivo de variables de entorno
cp .env.local.example .env.local
# Edita .env.local y pega tu API key

# 3. Corre el servidor de desarrollo
npm run dev

# Abre http://localhost:3000
```

---

## Estructura del proyecto

```
mia-demo/
├── pages/
│   ├── index.js          # UI principal (3 tabs: demos, en vivo, arquetipos)
│   ├── _app.js           # App wrapper
│   └── api/
│       └── generate.js   # API route — llama a Anthropic server-side
├── styles/
│   └── globals.css       # Estilos del tema oscuro de MIA
├── .env.local.example    # Template de variables de entorno
├── next.config.js
└── package.json
```

---

## Qué hace la demo

- **Casos de referencia** — Los 3 planes validados con Ricardo (SPORTMEX, Liverpool, META) con todos los diagnósticos y variables activas
- **Demo en vivo** — Ingresa cualquier negocio real y el Agente Líder genera el diagnóstico de arquetipo + variables activas + plan semanal con 3 prioridades
- **Los 4 arquetipos** — Explicación del sistema de diagnóstico y las 12 variables de decisión

---

*MIA Marketing Intelligence Agent · Confidencial socios · Mayo 2026*
