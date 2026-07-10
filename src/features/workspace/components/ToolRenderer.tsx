import type { ToolId } from "../toolCatalog"
import { AlignmentTool } from "./tools/AlignmentTool"
import { CompareTool } from "./tools/CompareTool"
import { DotPlotTool } from "./tools/DotPlotTool"
import { FastaTool } from "./tools/FastaTool"
import { MatricesTool } from "./tools/MatricesTool"
import { OrfsTool } from "./tools/OrfsTool"
import { ReverseComplementTool } from "./tools/ReverseComplementTool"
import { StatsTool } from "./tools/StatsTool"
import { TranscriptionTool } from "./tools/TranscriptionTool"
import { TranslationTool } from "./tools/TranslationTool"
import { ValidateTool } from "./tools/ValidateTool"

interface ToolRendererProps {
  activeTool: ToolId
}

export function ToolRenderer({ activeTool }: ToolRendererProps) {
  switch (activeTool) {
    case "validate":
      return <ValidateTool />
    case "stats":
      return <StatsTool />
    case "dotplot":
      return <DotPlotTool />
    case "compare":
      return <CompareTool />
    case "global-alignment":
      return <AlignmentTool kind="global" />
    case "local-alignment":
      return <AlignmentTool kind="local" />
    case "reverse-complement":
      return <ReverseComplementTool />
    case "transcription":
      return <TranscriptionTool />
    case "translation":
      return <TranslationTool />
    case "orfs":
      return <OrfsTool />
    case "fasta":
      return <FastaTool />
    case "matrices":
      return <MatricesTool />
    default:
      return <ValidateTool />
  }
}
