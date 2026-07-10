import type { HTMLAttributes, ReactNode } from "react"
import { classNames } from "../../utils/classNames"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  tone?: "default" | "muted" | "accent"
}

export function Card({ children, className, tone = "default", ...props }: CardProps) {
  return (
    <div className={classNames("card", `card--${tone}`, className)} {...props}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

export function CardHeader({ action, description, title }: CardHeaderProps) {
  return (
    <div className="card-header">
      <div>
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div className="card-header__action">{action}</div> : null}
    </div>
  )
}
