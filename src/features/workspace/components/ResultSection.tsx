import type { ReactNode } from "react"
import { ErrorMessage } from "../../../components/shared/ErrorMessage"
import { Card, CardHeader } from "../../../components/ui/Card"

interface ResultSectionProps {
  children: ReactNode
  error?: string | null
  isEmpty?: boolean
  emptyText?: string
  title?: string
}

export function ResultSection({
  children,
  emptyText = "Ejecutá la herramienta para ver el resultado.",
  error,
  isEmpty = false,
  title = "Resultado",
}: ResultSectionProps) {
  return (
    <Card className="result-section">
      <CardHeader title={title} />
      <ErrorMessage message={error} />
      {isEmpty && !error ? <p className="empty-state">{emptyText}</p> : children}
    </Card>
  )
}
