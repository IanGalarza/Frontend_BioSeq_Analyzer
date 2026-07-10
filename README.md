# BioSeq Analyzer Frontend

Frontend moderno en Vite + React + TypeScript para consumir la API FastAPI de BioSeq Analyzer.

## Requisitos

- Node.js 20+ recomendado.
- Backend FastAPI corriendo en `http://localhost:8000`.

## Instalacion

```bash
npm install
```

Para correr el frontend localmente, crear `.env` a partir de `.env.example`:

```powershell
Copy-Item .env.example .env
```

El archivo `.env.example` se mantiene como plantilla y `.env` contiene la configuracion local.

## Desarrollo

```bash
npm run dev
```

Abrir:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

## Funcionalidades

- Validacion de secuencias y deteccion de tipo.
- Estadisticas de composicion y GC content.
- Dot plot visual con scroll para matrices grandes.
- Comparacion de identidad y similitud.
- Alineamiento global Needleman-Wunsch.
- Alineamiento local Smith-Waterman.
- Scoring simple o matrices BLOSUM62/PAM250 para proteinas.
- Reverse complement, transcripcion, traduccion y ORF Finder en pantallas separadas.
- Parseo FASTA como herramienta independiente.
- Modo claro/oscuro persistido en `localStorage`.
- Selector inicial de herramientas: cada funcionalidad tiene su propia entrada, accion y resultado.

## Estructura

```text
src/
  app/                 Shell, providers y rutas simples.
  components/          Layout, UI reutilizable y componentes compartidos.
  features/            Modulos por dominio y workspace por herramientas.
  hooks/               Hooks transversales.
  pages/               HomePage y AnalyzerPage.
  services/            Cliente HTTP y servicios por recurso de API.
  styles/              Estilos globales responsive.
  types/               Tipos TypeScript alineados al OpenAPI del backend.
  utils/               Ejemplos, formateo, validacion UI y helpers.
```

## Backend requerido

La app no implementa algoritmos bioinformaticos en frontend. Las operaciones reales se delegan al backend:

```text
http://localhost:8000
```

Swagger del backend:

```text
http://localhost:8000/docs
```
