import { classNames } from "../../../utils/classNames"
import { toolCatalog, toolCategories, type ToolId } from "../toolCatalog"

interface WorkspaceNavProps {
  activeTool: ToolId
  onSelectTool: (toolId: ToolId) => void
}

export function WorkspaceNav({ activeTool, onSelectTool }: WorkspaceNavProps) {
  return (
    <aside className="workspace-nav" aria-label="Herramientas de BioSeq Analyzer">
      <span className="workspace-nav__title">Herramientas</span>
      {toolCategories.map((category) => (
        <section className="workspace-nav__group" key={category}>
          <span>{category}</span>
          <div>
            {toolCatalog
              .filter((tool) => tool.category === category)
              .map((tool) => (
                <button
                  className={classNames("workspace-nav__item", activeTool === tool.id && "workspace-nav__item--active")}
                  key={tool.id}
                  onClick={() => onSelectTool(tool.id)}
                  type="button"
                >
                  {tool.shortTitle}
                </button>
              ))}
          </div>
        </section>
      ))}
    </aside>
  )
}
