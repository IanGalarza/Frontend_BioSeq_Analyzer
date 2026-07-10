import type { ReactNode } from "react"
import { Card } from "../../../components/ui/Card"
import type { ToolDefinition } from "../toolCatalog"

interface ToolPageShellProps {
  children: ReactNode
  tool: ToolDefinition
}

export function ToolPageShell({ children, tool }: ToolPageShellProps) {
  return (
    <div className="tool-page">
      <div className="tool-page__header">
        <span className="eyebrow">{tool.category}</span>
        <h2>{tool.title}</h2>
        <p>{tool.description}</p>
      </div>

      <Card className="tool-brief">
        <div>
          <strong>Entrada</strong>
          <span>{tool.inputSummary}</span>
        </div>
        <div>
          <strong>Accion</strong>
          <span>Completá el formulario y ejecutá esta herramienta solamente.</span>
        </div>
        <div>
          <strong>Resultado</strong>
          <span>{tool.outputSummary}</span>
        </div>
      </Card>

      {children}
    </div>
  )
}
