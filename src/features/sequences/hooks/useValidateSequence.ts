import { sequenceApi } from "../../../services/sequenceApi"
import type { SequenceOperationRequest, SequenceValidationResponse } from "../../../types/api"
import { useAsyncAction } from "../../../hooks/useAsyncAction"

export function useValidateSequence() {
  return useAsyncAction<SequenceValidationResponse, [SequenceOperationRequest]>(
    sequenceApi.validateSequence,
  )
}
