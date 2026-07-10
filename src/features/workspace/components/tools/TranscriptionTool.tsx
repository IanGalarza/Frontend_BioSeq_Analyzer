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

export function TranscriptionTool() {
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
    await tools.transcription.execute({
      sequence: sanitizeSequenceInput(sequence),
      sequence_type: sequenceType,
    })
  }

  return (
    <>
      <Card>
        <CardHeader
          description="Convierte una secuencia de ADN en ARN. No la traduce a proteína."
          title="Entrada"
        />
        <div className="form-stack">
          <SequenceTextareaField label="Secuencia de ADN" onChange={setSequence} value={sequence} />
          <SequenceTypeField onChange={setSequenceType} value={sequenceType} />
          <div className="action-row">
            <Button isLoading={tools.transcription.isLoading} onClick={run} variant="primary">
              Transcribir ADN a ARN
            </Button>
          </div>
        </div>
      </Card>

      <ResultSection error={localError || tools.transcription.error} isEmpty={!tools.transcription.data}>
        {tools.transcription.data ? <MonospaceBlock>{tools.transcription.data.rna}</MonospaceBlock> : null}
      </ResultSection>
    </>
  )
}
