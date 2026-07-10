import type { ButtonHTMLAttributes, ReactNode } from "react"
import { classNames } from "../../utils/classNames"
import { Loading } from "./Loading"

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger"
type ButtonSize = "sm" | "md"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

export function Button({
  children,
  className,
  disabled,
  isLoading = false,
  size = "md",
  type = "button",
  variant = "secondary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames("button", `button--${variant}`, `button--${size}`, className)}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? <Loading size="sm" /> : null}
      <span>{children}</span>
    </button>
  )
}
