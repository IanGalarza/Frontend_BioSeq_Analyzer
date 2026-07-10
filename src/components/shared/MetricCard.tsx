import type { ReactNode } from "react"

interface MetricCardProps {
  label: string
  value: ReactNode
  detail?: string
}

export function MetricCard({ detail, label, value }: MetricCardProps) {
  return (
    <div className="metric-card">
      <span className="metric-card__label">{label}</span>
      <strong>{value}</strong>
      {detail ? <span className="metric-card__detail">{detail}</span> : null}
    </div>
  )
}
