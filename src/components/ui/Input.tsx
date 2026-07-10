import type { InputHTMLAttributes } from "react"
import { classNames } from "../../utils/classNames"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
}

export function Input({ className, helperText, id, label, ...props }: InputProps) {
  const inputId = id ?? props.name

  return (
    <label className="field" htmlFor={inputId}>
      {label ? <span className="field__label">{label}</span> : null}
      <input className={classNames("input", className)} id={inputId} {...props} />
      {helperText ? <span className="field__helper">{helperText}</span> : null}
    </label>
  )
}
