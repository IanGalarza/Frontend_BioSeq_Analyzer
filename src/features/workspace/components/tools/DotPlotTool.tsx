import { useState } from "react"
import { Button } from "../../../../components/ui/Button"
import { Card, CardHeader } from "../../../../components/ui/Card"
import type { SequenceType } from "../../../../types/api"
import { sanitizeSequenceInput } from "../../../../utils/validation"
import { DotPlotMatrix } from "../../../dotplot/components/DotPlotMatrix"
import { DotPlotSummary } from "../../../dotplot/components/DotPlotSummary"
import { useDotPlot } from "../../../dotplot/hooks/useDotPlot"
import { exampleDnaSequence, exampleDnaSequence2 } from "../../toolDefaults"
import { requirePair, validateDotPlotSettings } from "../../toolValidation"
import { ResultSection } from "../ResultSection"
import { DotPlotFields, PairSequenceFields, SequenceTypeField } from "../ToolForms"

export function DotPlotTool() {
  const [sequence1, setSequence1] = useState(exampleDnaSequence)
  const [sequence2, setSequence2] = useState(exampleDnaSequence2)
  const [sequenceType, setSequenceType] = useState<SequenceType>("dna")
  const [windowSize, setWindowSize] = useState(1)
  const [stringency, setStringency] = useState(1)
  const [localError, setLocalError] = useState<string | null>(null)
  const dotplot = useDotPlot()

  const run = async () => {
    const error =
      requirePair(sequence1, sequence2) ?? validateDotPlotSettings(windowSize, stringency)

    if (error) {
      setLocalError(error)
      return
    }

    setLocalError(null)
    await dotplot.execute({
      sequence1: sanitizeSequenceInput(sequence1),
      sequence2: sanitizeSequenceInput(sequence2),
      sequence_type: sequenceType,
      window_size: windowSize,
      stringency,
    })
  }

  return (
    <>
      <Card>
        <CardHeader
          description="Esta pantalla solo genera dot plot. No valida estadisticas ni calcula alineamientos."
          title="Entrada"
        />
        <div className="form-stack">
          <PairSequenceFields
            onSequence1Change={setSequence1}
            onSequence2Change={setSequence2}
            sequence1={sequence1}
            sequence2={sequence2}
          />
          <div className="form-grid form-grid--two">
            <SequenceTypeField onChange={setSequenceType} value={sequenceType} />
            <DotPlotFields
              onStringencyChange={setStringency}
              onWindowSizeChange={setWindowSize}
              stringency={stringency}
              windowSize={windowSize}
            />
          </div>
          <div className="action-row">
            <Button isLoading={dotplot.isLoading} onClick={run} variant="primary">
              Generar dot plot
            </Button>
          </div>
        </div>
      </Card>

      <ResultSection error={localError || dotplot.error} isEmpty={!dotplot.data}>
        {dotplot.data ? (
          <div className="dotplot-layout">
            <DotPlotSummary data={dotplot.data} />
            <DotPlotMatrix data={dotplot.data} />
          </div>
        ) : null}
      </ResultSection>
    </>
  )
}
