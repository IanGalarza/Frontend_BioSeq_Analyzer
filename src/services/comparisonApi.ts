import { apiRequest } from "./apiClient"
import type { ComparisonRequest, ComparisonResponse } from "../types/api"

export const comparisonApi = {
  compareSequences(request: ComparisonRequest) {
    return apiRequest<ComparisonResponse>("/api/v1/compare", {
      method: "POST",
      body: request,
    })
  },
}
