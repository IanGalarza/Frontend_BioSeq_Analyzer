import type { TextareaHTMLAttributes } from "react"
import { classNames } from "../../utils/classNames"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
}

export function Textarea({ className, helperText, id, label, ...props }: TextareaProps) {
  const textareaId = id ?? props.name

  return (
    <label className="field" htmlFor={textareaId}>
      {label ? <span className="field__label">{label}</span> : null}
      <textarea className={classNames("textarea", className)} id={textareaId} {...props} />
      {helperText ? <span className="field__helper">{helperText}</span> : null}
    </label>
  )
}
