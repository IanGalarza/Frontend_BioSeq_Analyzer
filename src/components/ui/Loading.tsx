import { classNames } from "../../utils/classNames"

interface LoadingProps {
  label?: string
  size?: "sm" | "md"
}

export function Loading({ label, size = "md" }: LoadingProps) {
  return (
    <span className={classNames("loading", `loading--${size}`)}>
      <span aria-hidden="true" className="loading__spinner" />
      {label ? <span>{label}</span> : null}
    </span>
  )
}
