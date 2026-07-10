import { useState } from "react"
import { Button } from "../../../../components/ui/Button"
import { Card, CardHeader } from "../../../../components/ui/Card"
import type { ScoringConfig, SequenceType } from "../../../../types/api"
import { sanitizeSequenceInput } from "../../../../utils/validation"
import { AlignmentResultCard } from "../../../alignments/components/AlignmentResultCard"
import { useGlobalAlignment } from "../../../alignments/hooks/useGlobalAlignment"
import { useLocalAlignment } from "../../../alignments/hooks/useLocalAlignment"
import {
  defaultScoring,
  exampleDnaSequence,
  exampleDnaSequence2,
  exampleLocalSequence1,
  exampleLocalSequence2,
  exampleProteinSequence1,
  exampleProteinSequence2,
  proteinMatrixScoring,
} from "../../toolDefaults"
import { requirePair, validateScoring } from "../../toolValidation"
import { ResultSection } from "../ResultSection"
import { PairSequenceFields, ScoringFields, SequenceTypeField } from "../ToolForms"

interface AlignmentToolProps {
  kind: "global" | "local"
}

export function AlignmentTool({ kind }: AlignmentToolProps) {
  const isGlobal = kind === "global"
  const [sequence1, setSequence1] = useState(isGlobal ? exampleDnaSequence : exampleLocalSequence1)
  const [sequence2, setSequence2] = useState(isGlobal ? exampleDnaSequence2 : exampleLocalSequence2)
  const [sequenceType, setSequenceType] = useState<SequenceType>("dna")
  const [scoring, setScoring] = useState<ScoringConfig>(isGlobal ? defaultScoring : { ...defaultScoring, match: 2 })
  const [localError, setLocalError] = useState<string | null>(null)
  const globalAlignment = useGlobalAlignment()
  const localAlignment = useLocalAlignment()
  const action = isGlobal ? globalAlignment : localAlignment

  const run = async () => {
    const error = requirePair(sequence1, sequence2) ?? validateScoring(sequenceType, scoring)

    if (error) {
      setLocalError(error)
      return
    }

    setLocalError(null)
    await action.execute({
      sequence1: sanitizeSequenceInput(sequence1),
      sequence2: sanitizeSequenceInput(sequence2),
      sequence_type: sequenceType,
      scoring,
    })
  }

  const loadProteinExample = () => {
    setSequence1(exampleProteinSequence1)
    setSequence2(exampleProteinSequence2)
    setSequenceType("protein")
    setScoring(proteinMatrixScoring)
  }

  return (
    <>
      <Card>
        <CardHeader
          description={
            isGlobal
              ? "Alinea las secuencias completas. Usalo cuando queres comparar el largo completo."
              : "Busca la region mas parecida. Usalo cuando esperas que solo una parte coincida."
          }
          title="Entrada"
        />
        <div className="form-stack">
          <PairSequenceFields
            onSequence1Change={setSequence1}
            onSequence2Change={setSequence2}
            sequence1={sequence1}
            sequence2={sequence2}
          />
          <SequenceTypeField onChange={setSequenceType} value={sequenceType} />
          <ScoringFields onChange={setScoring} scoring={scoring} />
          <div className="action-row">
            <Button isLoading={action.isLoading} onClick={run} variant="primary">
              {isGlobal ? "Ejecutar alineamiento global" : "Ejecutar alineamiento local"}
            </Button>
            <Button onClick={loadProteinExample} variant="ghost">
              Ejemplo proteico BLOSUM62
            </Button>
          </div>
        </div>
      </Card>

      <ResultSection error={localError || action.error} isEmpty={!action.data}>
        <AlignmentResultCard data={action.data} kind={kind} />
      </ResultSection>
    </>
  )
}
