import { sequenceApi } from "../../../services/sequenceApi"
import type {
  OrfRequest,
  OrfResponse,
  ReverseComplementResponse,
  SequenceOperationRequest,
  TranscribeResponse,
  TranslateRequest,
  TranslateResponse,
} from "../../../types/api"
import { useAsyncAction } from "../../../hooks/useAsyncAction"

export function useSequenceTools() {
  const reverseComplement = useAsyncAction<ReverseComplementResponse, [SequenceOperationRequest]>(
    sequenceApi.getReverseComplement,
  )
  const transcription = useAsyncAction<TranscribeResponse, [SequenceOperationRequest]>(
    sequenceApi.transcribe,
  )
  const translation = useAsyncAction<TranslateResponse, [TranslateRequest]>(sequenceApi.translate)
  const orfs = useAsyncAction<OrfResponse, [OrfRequest]>(sequenceApi.findOrfs)

  return {
    reverseComplement,
    transcription,
    translation,
    orfs,
  }
}
