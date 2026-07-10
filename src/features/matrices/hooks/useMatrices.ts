import { matrixApi } from "../../../services/matrixApi"
import type { MatrixListResponse } from "../../../types/api"
import { useAsyncAction } from "../../../hooks/useAsyncAction"

export function useMatrices() {
  return useAsyncAction<MatrixListResponse, []>(matrixApi.listMatrices)
}
