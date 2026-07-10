import type { ReactNode } from "react"
import { classNames } from "../../utils/classNames"

interface AlertProps {
  children: ReactNode
  tone?: "info" | "warning" | "danger" | "success"
  title?: string
}

export function Alert({ children, title, tone = "info" }: AlertProps) {
  return (
    <div className={classNames("alert", `alert--${tone}`)} role={tone === "danger" ? "alert" : "status"}>
      {title ? <strong>{title}</strong> : null}
      <div>{children}</div>
    </div>
  )
}
