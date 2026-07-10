import type { ScoringConfig, SequenceType } from "../../types/api"

export const exampleDnaSequence = "AGAGACTC"
export const exampleDnaSequence2 = "AGAGTGTG"
export const exampleLocalSequence1 = "TTTACGTAAA"
export const exampleLocalSequence2 = "GGGACGTCCC"
export const exampleProteinSequence1 = "MEEPQSDPSV"
export const exampleProteinSequence2 = "MEEPQNDPSV"

export const defaultSequenceType: SequenceType = "auto"

export const defaultScoring: ScoringConfig = {
  mode: "simple",
  match: 1,
  mismatch: -1,
  gap: -2,
  substitution_matrix: "none",
}

export const proteinMatrixScoring: ScoringConfig = {
  mode: "matrix",
  match: 1,
  mismatch: -1,
  gap: -2,
  substitution_matrix: "BLOSUM62",
}
