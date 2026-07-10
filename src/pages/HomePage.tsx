import { toolCatalog, type ToolId } from "../features/workspace/toolCatalog"

interface HomePageProps {
  onSelectTool: (toolId: ToolId) => void
}

export function HomePage({ onSelectTool }: HomePageProps) {
  return (
    <section className="home-section" id="inicio">
      <div className="home-section__content">
        <div className="hero-copy">
          <span className="eyebrow">Proyecto final bioinformatica</span>
          <h1>BioSeq Analyzer</h1>
          <p>
            Elegí una herramienta, completá los datos necesarios y analizá tus secuencias de forma simple.
          </p>
          <div className="hero-actions">
            <button className="button button--primary button--md" onClick={() => onSelectTool("validate")} type="button">
              Empezar validando una secuencia
            </button>
            <button className="button button--secondary button--md" onClick={() => onSelectTool("dotplot")} type="button">
              Ir directo a dot plot
            </button>
          </div>
        </div>

        <div className="hero-guide">
          <h2>Como se usa</h2>
          <ol>
            <li>Selecciona una herramienta desde esta pantalla o desde el menu lateral.</li>
            <li>Completa solamente la entrada que esa herramienta necesita.</li>
            <li>Ejecuta el boton principal y revisa el resultado de esa operacion.</li>
          </ol>
          <div className="guide-note">
            No hay resultados precargados ni acciones ocultas: si no ejecutas una herramienta, no aparece su resultado.
          </div>
        </div>
      </div>

      <div className="tool-card-grid">
        {toolCatalog.map((tool) => (
          <button className="tool-card" key={tool.id} onClick={() => onSelectTool(tool.id)} type="button">
            <span>{tool.category}</span>
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
