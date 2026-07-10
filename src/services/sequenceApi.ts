import { apiRequest } from "./apiClient"
import type {
  FastaParseRequest,
  FastaParseResponse,
  OrfRequest,
  OrfResponse,
  ReverseComplementResponse,
  SequenceOperationRequest,
  SequenceStatsResponse,
  SequenceValidationResponse,
  TranscribeResponse,
  TranslateRequest,
  TranslateResponse,
} from "../types/api"

export const sequenceApi = {
  validateSequence(request: SequenceOperationRequest) {
    return apiRequest<SequenceValidationResponse>("/api/v1/sequences/validate", {
      method: "POST",
      body: request,
    })
  },

  getStats(request: SequenceOperationRequest) {
    return apiRequest<SequenceStatsResponse>("/api/v1/sequences/stats", {
      method: "POST",
      body: request,
    })
  },

  getReverseComplement(request: SequenceOperationRequest) {
    return apiRequest<ReverseComplementResponse>("/api/v1/sequences/reverse-complement", {
      method: "POST",
      body: request,
    })
  },

  transcribe(request: SequenceOperationRequest) {
    return apiRequest<TranscribeResponse>("/api/v1/sequences/transcribe", {
      method: "POST",
      body: request,
    })
  },

  translate(request: TranslateRequest) {
    return apiRequest<TranslateResponse>("/api/v1/sequences/translate", {
      method: "POST",
      body: request,
    })
  },

  parseFasta(request: FastaParseRequest) {
    return apiRequest<FastaParseResponse>("/api/v1/sequences/fasta/parse", {
      method: "POST",
      body: request,
    })
  },

  findOrfs(request: OrfRequest) {
    return apiRequest<OrfResponse>("/api/v1/sequences/orfs", {
      method: "POST",
      body: request,
    })
  },
}
