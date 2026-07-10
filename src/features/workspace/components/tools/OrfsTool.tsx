import { useState } from "react"
import { Button } from "../../../../components/ui/Button"
import { Card, CardHeader } from "../../../../components/ui/Card"
import { Input } from "../../../../components/ui/Input"
import type { SequenceType } from "../../../../types/api"
import { sanitizeSequenceInput } from "../../../../utils/validation"
import { OrfFinderPanel } from "../../../sequences/components/OrfFinderPanel"
import { useSequenceTools } from "../../../sequences/hooks/useSequenceTools"
import { requireSequence } from "../../toolValidation"
import { ResultSection } from "../ResultSection"
import { SequenceTextareaField, SequenceTypeField } from "../ToolForms"

const orfExample = "AAATGAAATTTGGGTAGCCCATGCCCTAA"

export function OrfsTool() {
  const [sequence, setSequence] = useState(orfExample)
  const [sequenceType, setSequenceType] = useState<SequenceType>("dna")
  const [minLength, setMinLength] = useState(0)
  const [localError, setLocalError] = useState<string | null>(null)
  const tools = useSequenceTools()

  const run = async () => {
    const error = requireSequence(sequence)

    if (error) {
      setLocalError(error)
      return
    }

    if (minLength < 0) {
      setLocalError("La longitud minima no puede ser negativa.")
      return
    }

    setLocalError(null)
    await tools.orfs.execute({
      sequence: sanitizeSequenceInput(sequence),
      sequence_type: sequenceType,
      min_length: minLength,
    })
  }

  return (
    <>
      <Card>
        <CardHeader
          description="Busca ORFs simples en una secuencia de ADN. No traduce la secuencia completa."
          title="Entrada"
        />
        <div className="form-stack">
          <SequenceTextareaField label="Secuencia de ADN" onChange={setSequence} value={sequence} />
          <div className="form-grid form-grid--two">
            <SequenceTypeField onChange={setSequenceType} value={sequenceType} />
            <Input
              label="Longitud minima"
              min={0}
              onChange={(event) => setMinLength(Number(event.target.value))}
              type="number"
              value={minLength}
            />
          </div>
          <div className="action-row">
            <Button isLoading={tools.orfs.isLoading} onClick={run} variant="primary">
              Buscar ORFs
            </Button>
          </div>
        </div>
      </Card>

      <ResultSection error={localError || tools.orfs.error} isEmpty={!tools.orfs.data}>
        {tools.orfs.data ? <OrfFinderPanel orfs={tools.orfs.data.orfs} /> : null}
      </ResultSection>
    </>
  )
}
