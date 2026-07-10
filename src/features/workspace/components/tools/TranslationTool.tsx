import { useState } from "react"
import { MonospaceBlock } from "../../../../components/shared/MonospaceBlock"
import { Button } from "../../../../components/ui/Button"
import { Card, CardHeader } from "../../../../components/ui/Card"
import type { SequenceType } from "../../../../types/api"
import { sanitizeSequenceInput } from "../../../../utils/validation"
import { useSequenceTools } from "../../../sequences/hooks/useSequenceTools"
import { requireSequence } from "../../toolValidation"
import { ResultSection } from "../ResultSection"
import { SequenceTextareaField, SequenceTypeField } from "../ToolForms"

const translationExample = "ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG"

export function TranslationTool() {
  const [sequence, setSequence] = useState(translationExample)
  const [sequenceType, setSequenceType] = useState<SequenceType>("dna")
  const [toStop, setToStop] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const tools = useSequenceTools()

  const run = async () => {
    const error = requireSequence(sequence)

    if (error) {
      setLocalError(error)
      return
    }

    setLocalError(null)
    await tools.translation.execute({
      sequence: sanitizeSequenceInput(sequence),
      sequence_type: sequenceType,
      to_stop: toStop,
    })
  }

  return (
    <>
      <Card>
        <CardHeader
          description="Traduce ADN o ARN a proteína. No busca ORFs; para eso usá ORF Finder."
          title="Entrada"
        />
        <div className="form-stack">
          <SequenceTextareaField label="Secuencia de ADN o ARN" onChange={setSequence} value={sequence} />
          <div className="form-grid form-grid--two">
            <SequenceTypeField onChange={setSequenceType} value={sequenceType} />
            <label className="checkbox-field">
              <input checked={toStop} onChange={(event) => setToStop(event.target.checked)} type="checkbox" />
              <span>Detener en primer codon stop</span>
            </label>
          </div>
          <div className="action-row">
            <Button isLoading={tools.translation.isLoading} onClick={run} variant="primary">
              Traducir a proteína
            </Button>
          </div>
        </div>
      </Card>

      <ResultSection error={localError || tools.translation.error} isEmpty={!tools.translation.data}>
        {tools.translation.data ? (
          <>
            <MonospaceBlock>{tools.translation.data.protein}</MonospaceBlock>
            {tools.translation.data.warnings.length ? (
              <ul className="compact-list">
                {tools.translation.data.warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            ) : null}
          </>
        ) : null}
      </ResultSection>
    </>
  )
}
