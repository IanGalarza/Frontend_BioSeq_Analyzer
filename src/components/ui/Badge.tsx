import type { ReactNode } from "react"
import { classNames } from "../../utils/classNames"

interface BadgeProps {
  children: ReactNode
  tone?: "neutral" | "success" | "warning" | "danger" | "info"
}

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return <span className={classNames("badge", `badge--${tone}`)}>{children}</span>
}
