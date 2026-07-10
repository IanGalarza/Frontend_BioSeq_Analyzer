import { apiRequest } from "./apiClient"
import type { MatrixListResponse } from "../types/api"

export const matrixApi = {
  listMatrices() {
    return apiRequest<MatrixListResponse>("/api/v1/matrices")
  },
}
