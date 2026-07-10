import { comparisonApi } from "../../../services/comparisonApi"
import type { ComparisonRequest, ComparisonResponse } from "../../../types/api"
import { useAsyncAction } from "../../../hooks/useAsyncAction"

export function useCompareSequences() {
  return useAsyncAction<ComparisonResponse, [ComparisonRequest]>(comparisonApi.compareSequences)
}
