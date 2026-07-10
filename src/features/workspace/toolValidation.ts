import type { ScoringConfig, SequenceType, SubstitutionMatrix } from "../../types/api"

export function requireSequence(sequence: string): string | null {
  return sequence.trim() ? null : "Ingresá una secuencia antes de ejecutar esta herramienta."
}

export function requirePair(sequence1: string, sequence2: string): string | null {
  if (!sequence1.trim() || !sequence2.trim()) {
    return "Ingresá las dos secuencias antes de ejecutar esta herramienta."
  }

  return null
}

export function validateDotPlotSettings(windowSize: number, stringency: number): string | null {
  if (windowSize < 1) {
    return "Window size debe ser mayor o igual a 1."
  }

  if (stringency < 1) {
    return "Stringency debe ser mayor o igual a 1."
  }

  if (stringency > windowSize) {
    return "Stringency no puede ser mayor que window size."
  }

  return null
}

export function validateMatrixForType(
  sequenceType: SequenceType,
  matrix: SubstitutionMatrix,
): string | null {
  if (matrix !== "none" && (sequenceType === "dna" || sequenceType === "rna")) {
    return "BLOSUM62 y PAM250 se usan para proteínas. Para ADN o ARN usá matriz: ninguna."
  }

  return null
}

export function validateScoring(sequenceType: SequenceType, scoring: ScoringConfig): string | null {
  if (scoring.gap >= 0) {
    return "Gap debe ser un valor negativo."
  }

  if (scoring.mode === "matrix" && scoring.substitution_matrix === "none") {
    return "Para scoring por matriz, seleccioná BLOSUM62 o PAM250."
  }

  return validateMatrixForType(sequenceType, scoring.substitution_matrix)
}
