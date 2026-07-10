import { buildMatchLine, splitSequenceIntoChunks } from "../../../utils/formatters"

interface AlignmentViewerProps {
  sequence1: string
  sequence2: string
}

export function AlignmentViewer({ sequence1, sequence2 }: AlignmentViewerProps) {
  const matchLine = buildMatchLine(sequence1, sequence2)
  const chunks1 = splitSequenceIntoChunks(sequence1, 70)
  const chunks2 = splitSequenceIntoChunks(sequence2, 70)
  const matchChunks = splitSequenceIntoChunks(matchLine, 70)

  return (
    <pre className="alignment-viewer">
      {chunks1.map((chunk, index) => (
        <span className="alignment-viewer__chunk" key={`${chunk}-${index}`}>
          <span>Seq1  {chunk}</span>
          <span>      {matchChunks[index]}</span>
          <span>Seq2  {chunks2[index]}</span>
        </span>
      ))}
    </pre>
  )
}
