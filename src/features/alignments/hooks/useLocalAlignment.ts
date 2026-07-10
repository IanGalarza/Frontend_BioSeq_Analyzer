import { alignmentApi } from "../../../services/alignmentApi"
import type { AlignmentRequest, AlignmentResponse } from "../../../types/api"
import { useAsyncAction } from "../../../hooks/useAsyncAction"

export function useLocalAlignment() {
  return useAsyncAction<AlignmentResponse, [AlignmentRequest]>(alignmentApi.runLocalAlignment)
}
