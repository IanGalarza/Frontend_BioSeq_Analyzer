import { useState } from "react"
import type { ToolId } from "../features/workspace/toolCatalog"
import { AnalyzerPage } from "../pages/AnalyzerPage"
import { HomePage } from "../pages/HomePage"

export function AppRoutes() {
  const [activeTool, setActiveTool] = useState<ToolId>("validate")

  const selectTool = (toolId: ToolId) => {
    setActiveTool(toolId)
    window.requestAnimationFrame(() => {
      document.getElementById("analizador")?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  return (
    <>
      <HomePage onSelectTool={selectTool} />
      <AnalyzerPage activeTool={activeTool} onSelectTool={setActiveTool} />
    </>
  )
}
