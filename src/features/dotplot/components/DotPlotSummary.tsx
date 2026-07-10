import type { DotPlotResponse } from "../../../types/api"
import { MetricCard } from "../../../components/shared/MetricCard"
import { SequenceBadge } from "../../../components/shared/SequenceBadge"
import { formatNumber } from "../../../utils/formatters"

interface DotPlotSummaryProps {
  data: DotPlotResponse
}

export function DotPlotSummary({ data }: DotPlotSummaryProps) {
  return (
    <div className="metric-grid">
      <MetricCard label="Tipo" value={<SequenceBadge type={data.detected_type} />} />
      <MetricCard label="Puntos" value={formatNumber(data.points)} />
      <MetricCard label="Comparaciones" value={formatNumber(data.total_comparisons)} />
      <MetricCard label="Window" value={data.window_size} />
      <MetricCard label="Stringency" value={data.stringency} />
    </div>
  )
}
