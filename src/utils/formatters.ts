import type { DetectedSequenceType, SequenceType, SubstitutionMatrix } from "../types/api"

const noteTranslations: Record<string, string> = {
  "Global alignment tries to align the complete sequences.":
    "El alineamiento global intenta alinear las secuencias completas.",
  "Local alignment searches for the highest-similarity region between both sequences.":
    "El alineamiento local busca la region de mayor similitud entre ambas secuencias.",
}

export function formatPercentage(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "No aplica"
  }

  return `${value.toFixed(2)}%`
}

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "No aplica"
  }

  return new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatSequenceType(type: SequenceType | DetectedSequenceType | string | null | undefined): string {
  if (!type) {
    return "No detectado"
  }

  const labels: Record<string, string> = {
    auto: "Automático",
    dna: "ADN",
    rna: "ARN",
    protein: "Proteína",
  }

  return labels[type] ?? type
}

export function formatMatrix(matrix: SubstitutionMatrix): string {
  return matrix === "none" ? "Sin matriz" : matrix
}

export function translateNote(note: string): string {
  return noteTranslations[note] ?? note
}

export function splitSequenceIntoChunks(sequence: string, chunkSize = 80): string[] {
  const chunks: string[] = []

  for (let index = 0; index < sequence.length; index += chunkSize) {
    chunks.push(sequence.slice(index, index + chunkSize))
  }

  return chunks
}

export function buildMatchLine(sequence1: string, sequence2: string): string {
  const maxLength = Math.max(sequence1.length, sequence2.length)
  let line = ""

  for (let index = 0; index < maxLength; index += 1) {
    const first = sequence1[index]
    const second = sequence2[index]
    line += first && second && first === second && first !== "-" ? "|" : " "
  }

  return line
}
