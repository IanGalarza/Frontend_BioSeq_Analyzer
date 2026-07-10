import { sequenceApi } from "../../../services/sequenceApi"
import type { FastaParseRequest, FastaParseResponse } from "../../../types/api"
import { useAsyncAction } from "../../../hooks/useAsyncAction"

export function useFastaParser() {
  return useAsyncAction<FastaParseResponse, [FastaParseRequest]>(sequenceApi.parseFasta)
}
