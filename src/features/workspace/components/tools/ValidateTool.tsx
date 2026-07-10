import { useState } from "react"
import { MetricCard } from "../../../../components/shared/MetricCard"
import { MonospaceBlock } from "../../../../components/shared/MonospaceBlock"
import { SequenceBadge } from "../../../../components/shared/SequenceBadge"
import { Badge } from "../../../../components/ui/Badge"
import { Button } from "../../../../components/ui/Button"
import { Card, CardHeader } from "../../../../components/ui/Card"
import type { SequenceType } from "../../../../types/api"
import { sanitizeSequenceInput } from "../../../../utils/validation"
import { useValidateSequence } from "../../../sequences/hooks/useValidateSequence"
import { exampleDnaSequence } from "../../toolDefaults"
import { requireSequence } from "../../toolValidation"
import { ResultSection } from "../ResultSection"
import { SequenceTextareaField, SequenceTypeField } from "../ToolForms"

export function ValidateTool() {
  const [sequence, setSequence] = useState(exampleDnaSequence)
  const [sequenceType, setSequenceType] = useState<SequenceType>("auto")
  const [localError, setLocalError] = useState<string | null>(null)
  const validation = useValidateSequence()

  const run = async () => {
    const error = requireSequence(sequence)

    if (error) {
      setLocalError(error)
      return
    }

    setLocalError(null)
    await validation.execute({
      sequence: sanitizeSequenceInput(sequence),
      sequence_type: sequenceType,
    })
  }

  return (
    <>
      <Card>
        <CardHeader
          description="Usala para comprobar si una secuencia es válida antes de aplicar otra herramienta."
          title="Entrada"
        />
        <div className="form-stack">
          <SequenceTextareaField label="Secuencia a validar" onChange={setSequence} value={sequence} />
          <SequenceTypeField onChange={setSequenceType} value={sequenceType} />
          <div className="action-row">
            <Button isLoading={validation.isLoading} onClick={run} variant="primary">
              Validar secuencia
            </Button>
            <Button onClick={() => setSequence(exampleDnaSequence)} variant="ghost">
              Cargar ejemplo de ADN
            </Button>
          </div>
        </div>
      </Card>

      <ResultSection error={localError || validation.error} isEmpty={!validation.data}>
        {validation.data ? (
          <>
            <div className="metric-grid">
              <MetricCard
                label="Estado"
                value={<Badge tone={validation.data.is_valid ? "success" : "danger"}>{validation.data.is_valid ? "Valida" : "Invalida"}</Badge>}
              />
              <MetricCard label="Tipo detectado" value={<SequenceBadge type={validation.data.detected_type} />} />
              <MetricCard label="Longitud" value={validation.data.length} />
            </div>
            {validation.data.errors.length ? (
              <ul className="compact-list">
                {validation.data.errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            ) : null}
            <MonospaceBlock>{validation.data.normalized_sequence}</MonospaceBlock>
          </>
        ) : null}
      </ResultSection>
    </>
  )
}
