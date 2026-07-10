const FALLBACK_API_URL = "http://localhost:8000"

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

interface ApiRequestOptions {
  method?: "GET" | "POST"
  body?: unknown
}

function resolveBaseUrl(): string {
  const configuredUrl = import.meta.env.VITE_API_URL as string | undefined
  return (configuredUrl || FALLBACK_API_URL).replace(/\/$/, "")
}

function normalizeFastApiDetail(detail: unknown): string {
  if (typeof detail === "string") {
    return detail
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (typeof item === "string") {
          return item
        }

        if (item && typeof item === "object" && "msg" in item) {
          return String(item.msg)
        }

        return JSON.stringify(item)
      })
      .join(" ")
  }

  if (detail && typeof detail === "object") {
    return JSON.stringify(detail)
  }

  return "El sistema no pudo completar la operación."
}

export async function apiRequest<TResponse>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<TResponse> {
  const response = await fetch(`${resolveBaseUrl()}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  })

  const contentType = response.headers.get("content-type")
  const payload = contentType?.includes("application/json") ? await response.json() : null

  if (!response.ok) {
    const message = normalizeFastApiDetail(payload?.detail ?? payload)
    throw new ApiError(message, response.status)
  }

  return payload as TResponse
}
