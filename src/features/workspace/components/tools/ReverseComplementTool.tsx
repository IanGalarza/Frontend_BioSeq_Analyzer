import { useState } from "react"
import { MonospaceBlock } from "../../../../components/shared/MonospaceBlock"
import { Button } from "../../../../components/ui/Button"
import { Card, CardHeader } from "../../../../components/ui/Card"
import type { SequenceType } from "../../../../types/api"
import { sanitizeSequenceInput } from "../../../../utils/validation"
import { useSequenceTools } from "../../../sequences/hooks/useSequenceTools"
import { exampleDnaSequence } from "../../toolDefaults"
import { requireSequence } from "../../toolValidation"
import { ResultSection } from "../ResultSection"
import { SequenceTextareaField, SequenceTypeField } from "../ToolForms"

export function ReverseComplementTool() {
  const [sequence, setSequence] = useState(exampleDnaSequence)
  const [sequenceType, setSequenceType] = useState<SequenceType>("dna")
  const [localError, setLocalError] = useState<string | null>(null)
  const tools = useSequenceTools()

  const run = async () => {
    const error = requireSequence(sequence)

    if (error) {
      setLocalError(error)
      return
    }

    setLocalError(null)
    await tools.reverseComplement.execute({
      sequence: sanitizeSequenceInput(sequence),
      sequence_type: sequenceType,
    })
  }

  return (
    <>
      <Card>
        <CardHeader
          description="Operación específica para obtener el complemento reverso de una secuencia de ADN."
          title="Entrada"
        />
        <div className="form-stack">
          <SequenceTextareaField label="Secuencia de ADN" onChange={setSequence} value={sequence} />
          <SequenceTypeField onChange={setSequenceType} value={sequenceType} />
          <div className="action-row">
            <Button isLoading={tools.reverseComplement.isLoading} onClick={run} variant="primary">
              Calcular complemento reverso
            </Button>
          </div>
        </div>
      </Card>

      <ResultSection error={localError || tools.reverseComplement.error} isEmpty={!tools.reverseComplement.data}>
        {tools.reverseComplement.data ? (
          <MonospaceBlock>{tools.reverseComplement.data.reverse_complement}</MonospaceBlock>
        ) : null}
      </ResultSection>
    </>
  )
}
