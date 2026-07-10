export type SequenceType = "auto" | "dna" | "rna" | "protein"
export type DetectedSequenceType = Exclude<SequenceType, "auto">
export type ScoringMode = "simple" | "matrix"
export type SubstitutionMatrix = "none" | "BLOSUM62" | "PAM250"

export interface ScoringConfig {
  mode: ScoringMode
  match: number
  mismatch: number
  gap: number
  substitution_matrix: SubstitutionMatrix
}

export interface SequenceOperationRequest {
  sequence: string
  sequence_type: SequenceType
}

export interface SequenceValidationResponse {
  is_valid: boolean
  detected_type: DetectedSequenceType | null
  normalized_sequence: string
  length: number
  errors: string[]
}

export interface SequenceStatsResponse {
  detected_type: DetectedSequenceType
  length: number
  composition: Record<string, number>
  composition_percentages: Record<string, number>
  gc_content: number | null
}

export interface ReverseComplementResponse {
  input: string
  reverse_complement: string
}

export interface TranscribeResponse {
  input: string
  rna: string
}

export interface TranslateRequest extends SequenceOperationRequest {
  to_stop: boolean
}

export interface TranslateResponse {
  input: string
  protein: string
  length: number
  warnings: string[]
}

export interface FastaParseRequest {
  fasta_content: string
}

export interface FastaRecord {
  id: string
  description: string
  sequence: string
  detected_type: DetectedSequenceType
  length: number
}

export interface FastaParseResponse {
  records: FastaRecord[]
}

export interface OrfRequest extends SequenceOperationRequest {
  min_length: number
}

export interface OrfRecord {
  frame: number
  start: number
  end: number
  nucleotide_sequence: string
  protein_sequence: string
  length: number
}

export interface OrfResponse {
  orfs: OrfRecord[]
}

export interface DotPlotRequest {
  sequence1: string
  sequence2: string
  sequence_type: SequenceType
  window_size: number
  stringency: number
}

export interface DotPlotResponse {
  sequence1: string
  sequence2: string
  detected_type: DetectedSequenceType
  window_size: number
  stringency: number
  rows: string[]
  columns: string[]
  matrix: number[][]
  points: number
  total_comparisons: number
}

export interface ComparisonRequest {
  sequence1: string
  sequence2: string
  sequence_type: SequenceType
  substitution_matrix: SubstitutionMatrix
}

export interface ComparisonResponse {
  detected_type: DetectedSequenceType
  length_sequence1: number
  length_sequence2: number
  compared_positions: number
  matches: number
  mismatches: number
  identity_percentage: number
  similarity_percentage: number | null
  notes: string[]
}

export interface AlignmentRequest {
  sequence1: string
  sequence2: string
  sequence_type: SequenceType
  scoring: ScoringConfig
}

export interface AlignmentResponse {
  algorithm: "global" | "local" | string
  algorithm_name: string
  detected_type: DetectedSequenceType
  scoring_used: string
  score: number
  aligned_sequence1: string
  aligned_sequence2: string
  matches: number
  mismatches: number
  gaps: number
  identity_percentage: number
  similarity_percentage: number | null
  alignment_length: number
  sequence1_start: number | null
  sequence1_end: number | null
  sequence2_start: number | null
  sequence2_end: number | null
  notes: string[]
}

export interface MatrixInfo {
  id: string
  name: string
  applies_to: string[]
  implemented: boolean
}

export interface MatrixListResponse {
  available_matrices: MatrixInfo[]
}
