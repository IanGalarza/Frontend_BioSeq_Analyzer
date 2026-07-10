import { Alert } from "../ui/Alert"

interface ErrorMessageProps {
  message?: string | null
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) {
    return null
  }

  return <Alert tone="danger">{message}</Alert>
}
