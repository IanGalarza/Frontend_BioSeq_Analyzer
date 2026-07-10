export function sanitizeSequenceInput(sequence: string): string {
  return sequence.replace(/\s+/g, "").toUpperCase()
}
