import type { DotPlotResponse } from "../../../types/api"
import { Alert } from "../../../components/ui/Alert"

interface DotPlotMatrixProps {
  data: DotPlotResponse
}

const MAX_VISIBLE_ROWS = 160
const MAX_VISIBLE_COLUMNS = 160

export function DotPlotMatrix({ data }: DotPlotMatrixProps) {
  const visibleRows = data.rows.slice(0, MAX_VISIBLE_ROWS)
  const visibleColumns = data.columns.slice(0, MAX_VISIBLE_COLUMNS)
  const isTruncated = data.rows.length > MAX_VISIBLE_ROWS || data.columns.length > MAX_VISIBLE_COLUMNS

  return (
    <div className="dotplot-view">
      {isTruncated ? (
        <Alert tone="warning">
          La matriz es grande. Se muestran las primeras {visibleRows.length} filas y {visibleColumns.length} columnas
          para mantener fluida la interfaz.
        </Alert>
      ) : null}
      <div className="dotplot-scroll" aria-label="Matriz dot plot">
        <div
          className="dotplot-grid"
          style={{
            gridTemplateColumns: `28px repeat(${visibleColumns.length}, 18px)`,
          }}
        >
          <span className="dotplot-axis dotplot-axis--corner" />
          {visibleColumns.map((column, columnIndex) => (
            <span className="dotplot-axis" key={`${column}-${columnIndex}`}>
              {column}
            </span>
          ))}
          {visibleRows.map((row, rowIndex) => (
            <div className="dotplot-row" key={`${row}-${rowIndex}`} style={{ display: "contents" }}>
              <span className="dotplot-axis dotplot-axis--row">{row}</span>
              {visibleColumns.map((_, columnIndex) => {
                const active = data.matrix[rowIndex]?.[columnIndex] === 1

                return (
                  <span
                    aria-label={active ? "Coincidencia" : "Sin coincidencia"}
                    className={active ? "dotplot-cell dotplot-cell--active" : "dotplot-cell"}
                    key={`${rowIndex}-${columnIndex}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
