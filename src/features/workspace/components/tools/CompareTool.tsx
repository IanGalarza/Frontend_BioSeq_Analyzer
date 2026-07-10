import { useState } from "react"
import { MetricCard } from "../../../../components/shared/MetricCard"
import { SequenceBadge } from "../../../../components/shared/SequenceBadge"
import { Alert } from "../../../../components/ui/Alert"
import { Button } from "../../../../components/ui/Button"
import { Card, CardHeader } from "../../../../components/ui/Card"
import type { SequenceType, SubstitutionMatrix } from "../../../../types/api"
import { formatNumber, formatPercentage, translateNote } from "../../../../utils/formatters"
import { sanitizeSequenceInput } from "../../../../utils/validation"
import { useCompareSequences } from "../../../comparison/hooks/useCompareSequences"
import { exampleProteinSequence1, exampleProteinSequence2 } from "../../toolDefaults"
import { requirePair, validateMatrixForType } from "../../toolValidation"
import { ResultSection } from "../ResultSection"
import { MatrixField, PairSequenceFields, SequenceTypeField } from "../ToolForms"

export function CompareTool() {
  const [sequence1, setSequence1] = useState(exampleProteinSequence1)
  const [sequence2, setSequence2] = useState(exampleProteinSequence2)
  const [sequenceType, setSequenceType] = useState<SequenceType>("protein")
  const [matrix, setMatrix] = useState<SubstitutionMatrix>("BLOSUM62")
  const [localError, setLocalError] = useState<string | null>(null)
  const comparison = useCompareSequences()

  const run = async () => {
    const error = requirePair(sequence1, sequence2) ?? validateMatrixForType(sequenceType, matrix)

    if (error) {
      setLocalError(error)
      return
    }

    setLocalError(null)
    await comparison.execute({
      sequence1: sanitizeSequenceInput(sequence1),
      sequence2: sanitizeSequenceInput(sequence2),
      sequence_type: sequenceType,
      substitution_matrix: matrix,
    })
  }

  return (
    <>
      <Card>
        <CardHeader
          description="Compara posicion por posicion. No genera alineamiento; para eso usa las pantallas global o local."
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
            <MatrixField onChange={setMatrix} value={matrix} />
          </div>
          <Alert>
            La homologia es una inferencia biologica. La identidad y similitud aportan evidencia, pero no la
            demuestran por si solas.
          </Alert>
          <div className="action-row">
            <Button isLoading={comparison.isLoading} onClick={run} variant="primary">
              Comparar identidad/similitud
            </Button>
            <Button
              onClick={() => {
                setSequence1(exampleProteinSequence1)
                setSequence2(exampleProteinSequence2)
                setSequenceType("protein")
                setMatrix("BLOSUM62")
              }}
              variant="ghost"
            >
              Cargar ejemplo proteico
            </Button>
          </div>
        </div>
      </Card>

      <ResultSection error={localError || comparison.error} isEmpty={!comparison.data}>
        {comparison.data ? (
          <>
            <div className="metric-grid">
              <MetricCard label="Tipo detectado" value={<SequenceBadge type={comparison.data.detected_type} />} />
              <MetricCard label="Posiciones comparadas" value={formatNumber(comparison.data.compared_positions)} />
              <MetricCard label="Matches" value={formatNumber(comparison.data.matches)} />
              <MetricCard label="Mismatches" value={formatNumber(comparison.data.mismatches)} />
              <MetricCard label="Identidad" value={formatPercentage(comparison.data.identity_percentage)} />
              <MetricCard label="Similitud" value={formatPercentage(comparison.data.similarity_percentage)} />
            </div>
            {comparison.data.notes.length ? (
              <ul className="compact-list">
                {comparison.data.notes.map((note) => (
                  <li key={note}>{translateNote(note)}</li>
                ))}
              </ul>
            ) : null}
          </>
        ) : null}
      </ResultSection>
    </>
  )
}
