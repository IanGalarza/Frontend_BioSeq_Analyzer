import { apiRequest } from "./apiClient"
import type { DotPlotRequest, DotPlotResponse } from "../types/api"

export const dotplotApi = {
  createDotPlot(request: DotPlotRequest) {
    return apiRequest<DotPlotResponse>("/api/v1/dotplot", {
      method: "POST",
      body: request,
    })
  },
}
