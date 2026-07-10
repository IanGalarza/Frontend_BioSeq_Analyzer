import { apiRequest } from "./apiClient"
import type { AlignmentRequest, AlignmentResponse } from "../types/api"

export const alignmentApi = {
  runGlobalAlignment(request: AlignmentRequest) {
    return apiRequest<AlignmentResponse>("/api/v1/alignments/global", {
      method: "POST",
      body: request,
    })
  },

  runLocalAlignment(request: AlignmentRequest) {
    return apiRequest<AlignmentResponse>("/api/v1/alignments/local", {
      method: "POST",
      body: request,
    })
  },
}
