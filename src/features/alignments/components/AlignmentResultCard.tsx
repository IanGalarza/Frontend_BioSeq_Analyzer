import type { AlignmentResponse } from "../../../types/api"
import { ErrorMessage } from "../../../components/shared/ErrorMessage"
import { MetricCard } from "../../../components/shared/MetricCard"
import { SequenceBadge } from "../../../components/shared/SequenceBadge"
import { formatNumber, formatPercentage, translateNote } from "../../../utils/formatters"
import { AlignmentViewer } from "./AlignmentViewer"

interface AlignmentResultCardProps {
  data: AlignmentResponse | null
  error?: string
  kind: "global" | "local"
}

export function AlignmentResultCard({ data, error, kind }: AlignmentResultCardProps) {
  const title = kind === "global" ? "Global - Needleman-Wunsch" : "Local - Smith-Waterman"
  const description =
    kind === "global"
      ? "Needleman-Wunsch intenta alinear las secuencias completas."
      : "Smith-Waterman busca la region local con mayor similitud."

  return (
    <section className="alignment-result">
      <div className="alignment-result__header">
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
      <ErrorMessage message={error} />
      {data ? (
        <>
          <div className="metric-grid">
            <MetricCard label="Tipo" value={<SequenceBadge type={data.detected_type} />} />
            <MetricCard label="Score" value={formatNumber(data.score)} />
            <MetricCard label="Identidad" value={formatPercentage(data.identity_percentage)} />
            <MetricCard label="Similitud" value={formatPercentage(data.similarity_percentage)} />
            <MetricCard label="Matches" value={formatNumber(data.matches)} />
            <MetricCard label="Mismatches" value={formatNumber(data.mismatches)} />
            <MetricCard label="Gaps" value={formatNumber(data.gaps)} />
            <MetricCard label="Longitud" value={formatNumber(data.alignment_length)} />
          </div>

          {kind === "local" ? (
            <div className="position-strip">
              <span>Seq1: {data.sequence1_start ?? "-"} a {data.sequence1_end ?? "-"}</span>
              <span>Seq2: {data.sequence2_start ?? "-"} a {data.sequence2_end ?? "-"}</span>
            </div>
          ) : null}

          <span className="small-muted">Scoring: {data.scoring_used}</span>
          <AlignmentViewer sequence1={data.aligned_sequence1} sequence2={data.aligned_sequence2} />

          {data.notes.length ? (
            <ul className="compact-list">
              {data.notes.map((note) => (
                <li key={note}>{translateNote(note)}</li>
              ))}
            </ul>
          ) : null}
        </>
      ) : (
        <p className="empty-state">Ejecuta este alineamiento para ver el resultado.</p>
      )}
    </section>
  )
}
