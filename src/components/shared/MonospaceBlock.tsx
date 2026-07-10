import { classNames } from "../../utils/classNames"

interface MonospaceBlockProps {
  children: string
  compact?: boolean
}

export function MonospaceBlock({ children, compact = false }: MonospaceBlockProps) {
  return <pre className={classNames("mono-block", compact && "mono-block--compact")}>{children}</pre>
}
