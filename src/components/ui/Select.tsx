import type { SelectHTMLAttributes } from "react"
import { classNames } from "../../utils/classNames"

export interface SelectOption {
  label: string
  value: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
}

export function Select({ className, id, label, options, ...props }: SelectProps) {
  const selectId = id ?? props.name

  return (
    <label className="field" htmlFor={selectId}>
      {label ? <span className="field__label">{label}</span> : null}
      <select className={classNames("select", className)} id={selectId} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
