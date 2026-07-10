import { useState } from "react"
import { MetricCard } from "../../../../components/shared/MetricCard"
import { SequenceBadge } from "../../../../components/shared/SequenceBadge"
import { Button } from "../../../../components/ui/Button"
import { Card, CardHeader } from "../../../../components/ui/Card"
import type { SequenceType } from "../../../../types/api"
import { formatPercentage } from "../../../../utils/formatters"
import { sanitizeSequenceInput } from "../../../../utils/validation"
import { useSequenceStats } from "../../../sequences/hooks/useSequenceStats"
import { exampleDnaSequence } from "../../toolDefaults"
import { requireSequence } from "../../toolValidation"
import { ResultSection } from "../ResultSection"
import { SequenceTextareaField, SequenceTypeField } from "../ToolForms"

export function StatsTool() {
  const [sequence, setSequence] = useState(exampleDnaSequence)
  const [sequenceType, setSequenceType] = useState<SequenceType>("auto")
  const [localError, setLocalError] = useState<string | null>(null)
  const stats = useSequenceStats()
  const data = stats.data

  const run = async () => {
    const error = requireSequence(sequence)

    if (error) {
      setLocalError(error)
      return
    }

    setLocalError(null)
    await stats.execute({
      sequence: sanitizeSequenceInput(sequence),
      sequence_type: sequenceType,
    })
  }

  return (
    <>
      <Card>
        <CardHeader
          description="Calcula metricas de una sola secuencia. No genera dot plot ni alineamientos."
          title="Entrada"
        />
        <div className="form-stack">
          <SequenceTextareaField label="Secuencia" onChange={setSequence} value={sequence} />
          <SequenceTypeField onChange={setSequenceType} value={sequenceType} />
          <div className="action-row">
            <Button isLoading={stats.isLoading} onClick={run} variant="primary">
              Calcular estadisticas
            </Button>
          </div>
        </div>
      </Card>

      <ResultSection error={localError || stats.error} isEmpty={!data}>
        {data ? (
          <>
            <div className="metric-grid">
              <MetricCard label="Tipo detectado" value={<SequenceBadge type={data.detected_type} />} />
              <MetricCard label="Longitud" value={data.length} />
              <MetricCard label="GC content" value={formatPercentage(data.gc_content)} />
            </div>
            <div className="composition-list">
              {Object.entries(data.composition).map(([symbol, count]) => (
                <span key={symbol}>
                  <strong>{symbol}</strong>
                  {count} ({formatPercentage(data.composition_percentages[symbol])})
                </span>
              ))}
            </div>
          </>
        ) : null}
      </ResultSection>
    </>
  )
}
