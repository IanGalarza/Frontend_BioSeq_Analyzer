import { dotplotApi } from "../../../services/dotplotApi"
import type { DotPlotRequest, DotPlotResponse } from "../../../types/api"
import { useAsyncAction } from "../../../hooks/useAsyncAction"

export function useDotPlot() {
  return useAsyncAction<DotPlotResponse, [DotPlotRequest]>(dotplotApi.createDotPlot)
}
