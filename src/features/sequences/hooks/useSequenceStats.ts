import { sequenceApi } from "../../../services/sequenceApi"
import type { SequenceOperationRequest, SequenceStatsResponse } from "../../../types/api"
import { useAsyncAction } from "../../../hooks/useAsyncAction"

export function useSequenceStats() {
  return useAsyncAction<SequenceStatsResponse, [SequenceOperationRequest]>(sequenceApi.getStats)
}
