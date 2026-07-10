import { useCallback, useState } from "react"

export interface AsyncActionState<TData, TArgs extends unknown[]> {
  data: TData | null
  error: string | null
  isLoading: boolean
  execute: (...args: TArgs) => Promise<TData>
  reset: () => void
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  return "Ocurrio un error inesperado."
}

export function useAsyncAction<TData, TArgs extends unknown[]>(
  action: (...args: TArgs) => Promise<TData>,
): AsyncActionState<TData, TArgs> {
  const [data, setData] = useState<TData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const execute = useCallback(
    async (...args: TArgs) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await action(...args)
        setData(response)
        return response
      } catch (requestError) {
        const message = toErrorMessage(requestError)
        setError(message)
        throw requestError
      } finally {
        setIsLoading(false)
      }
    },
    [action],
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setIsLoading(false)
  }, [])

  return { data, error, isLoading, execute, reset }
}
