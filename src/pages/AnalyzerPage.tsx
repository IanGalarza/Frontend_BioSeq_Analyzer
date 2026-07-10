import { ToolPageShell } from "../features/workspace/components/ToolPageShell"
import { ToolRenderer } from "../features/workspace/components/ToolRenderer"
import { WorkspaceNav } from "../features/workspace/components/WorkspaceNav"
import { getToolDefinition, type ToolId } from "../features/workspace/toolCatalog"

interface AnalyzerPageProps {
  activeTool: ToolId
  onSelectTool: (toolId: ToolId) => void
}

export function AnalyzerPage({ activeTool, onSelectTool }: AnalyzerPageProps) {
  const tool = getToolDefinition(activeTool)

  return (
    <section className="analyzer-section" id="analizador">
      <div className="section-heading">
        <span className="eyebrow">Workspace por herramienta</span>
        <h2>Elegi una funcionalidad y ejecutala</h2>
        <p>Cada pantalla tiene su propia entrada, boton de ejecucion y resultado. No hay analisis automaticos.</p>
      </div>

      <div className="workspace-layout">
        <WorkspaceNav activeTool={activeTool} onSelectTool={onSelectTool} />
        <ToolPageShell tool={tool}>
          <ToolRenderer activeTool={activeTool} />
        </ToolPageShell>
      </div>
    </section>
  )
}
