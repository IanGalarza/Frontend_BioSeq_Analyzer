import type { ChangeEvent } from "react"
import { Input } from "../../../components/ui/Input"
import { Select } from "../../../components/ui/Select"
import { Textarea } from "../../../components/ui/Textarea"
import type { ScoringConfig, ScoringMode, SequenceType, SubstitutionMatrix } from "../../../types/api"

interface SequenceTypeFieldProps {
  value: SequenceType
  onChange: (value: SequenceType) => void
}

export function SequenceTypeField({ onChange, value }: SequenceTypeFieldProps) {
  return (
    <Select
      label="Tipo de secuencia"
      name="sequenceType"
      onChange={(event) => onChange(event.target.value as SequenceType)}
      options={[
        { label: "Automático", value: "auto" },
        { label: "ADN", value: "dna" },
        { label: "ARN", value: "rna" },
        { label: "Proteína", value: "protein" },
      ]}
      value={value}
    />
  )
}

interface SequenceTextareaFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  helperText?: string
}

export function SequenceTextareaField({
  helperText = "Pegá la secuencia sin formato FASTA. Los espacios se eliminan antes de procesarla.",
  label,
  onChange,
  value,
}: SequenceTextareaFieldProps) {
  return (
    <Textarea
      helperText={helperText}
      label={label}
      onChange={(event) => onChange(event.target.value)}
      rows={7}
      value={value}
    />
  )
}

interface PairSequenceFieldsProps {
  sequence1: string
  sequence2: string
  onSequence1Change: (value: string) => void
  onSequence2Change: (value: string) => void
}

export function PairSequenceFields({
  onSequence1Change,
  onSequence2Change,
  sequence1,
  sequence2,
}: PairSequenceFieldsProps) {
  return (
    <div className="form-grid form-grid--two">
      <SequenceTextareaField label="Secuencia 1" onChange={onSequence1Change} value={sequence1} />
      <SequenceTextareaField label="Secuencia 2" onChange={onSequence2Change} value={sequence2} />
    </div>
  )
}

interface MatrixFieldProps {
  value: SubstitutionMatrix
  onChange: (value: SubstitutionMatrix) => void
}

export function MatrixField({ onChange, value }: MatrixFieldProps) {
  return (
    <Select
      label="Matriz de sustitucion"
      name="matrix"
      onChange={(event) => onChange(event.target.value as SubstitutionMatrix)}
      options={[
        { label: "Ninguna", value: "none" },
        { label: "BLOSUM62", value: "BLOSUM62" },
        { label: "PAM250", value: "PAM250" },
      ]}
      value={value}
    />
  )
}

interface DotPlotFieldsProps {
  windowSize: number
  stringency: number
  onWindowSizeChange: (value: number) => void
  onStringencyChange: (value: number) => void
}

export function DotPlotFields({
  onStringencyChange,
  onWindowSizeChange,
  stringency,
  windowSize,
}: DotPlotFieldsProps) {
  return (
    <div className="form-grid form-grid--two">
      <Input
        label="Window size"
        min={1}
        onChange={(event) => onWindowSizeChange(Number(event.target.value))}
        type="number"
        value={windowSize}
      />
      <Input
        label="Stringency"
        min={1}
        onChange={(event) => onStringencyChange(Number(event.target.value))}
        type="number"
        value={stringency}
      />
    </div>
  )
}

interface ScoringFieldsProps {
  scoring: ScoringConfig
  onChange: (scoring: ScoringConfig) => void
}

export function ScoringFields({ onChange, scoring }: ScoringFieldsProps) {
  const updateNumber =
    (field: "match" | "mismatch" | "gap") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange({ ...scoring, [field]: Number(event.target.value) })
    }

  return (
    <div className="scoring-panel">
      <div className="form-grid form-grid--two">
        <Select
          label="Modo de scoring"
          name="scoringMode"
          onChange={(event) => {
            const mode = event.target.value as ScoringMode
            onChange({
              ...scoring,
              mode,
              substitution_matrix: mode === "simple" ? "none" : scoring.substitution_matrix,
            })
          }}
          options={[
            { label: "Simple", value: "simple" },
            { label: "Matriz BLOSUM/PAM", value: "matrix" },
          ]}
          value={scoring.mode}
        />
        <Select
          disabled={scoring.mode === "simple"}
          label="Matriz"
          name="substitutionMatrix"
          onChange={(event) =>
            onChange({
              ...scoring,
              substitution_matrix: event.target.value as SubstitutionMatrix,
            })
          }
          options={[
            { label: "Ninguna", value: "none" },
            { label: "BLOSUM62", value: "BLOSUM62" },
            { label: "PAM250", value: "PAM250" },
          ]}
          value={scoring.substitution_matrix}
        />
      </div>
      <div className="form-grid form-grid--three">
        <Input label="Match" onChange={updateNumber("match")} type="number" value={scoring.match} />
        <Input label="Mismatch" onChange={updateNumber("mismatch")} type="number" value={scoring.mismatch} />
        <Input label="Gap" onChange={updateNumber("gap")} type="number" value={scoring.gap} />
      </div>
    </div>
  )
}
