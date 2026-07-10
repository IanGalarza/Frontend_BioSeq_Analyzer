import { MetricCard } from "../../../../components/shared/MetricCard"
import { Badge } from "../../../../components/ui/Badge"
import { Button } from "../../../../components/ui/Button"
import { Card, CardHeader } from "../../../../components/ui/Card"
import { formatSequenceType } from "../../../../utils/formatters"
import { useMatrices } from "../../../matrices/hooks/useMatrices"
import { ResultSection } from "../ResultSection"

export function MatricesTool() {
  const matrices = useMatrices()

  return (
    <>
      <Card>
        <CardHeader
          description="Consultá las matrices de scoring disponibles en el sistema."
          title="Entrada"
        />
        <p className="empty-state">Esta consulta no requiere que ingreses secuencias.</p>
        <div className="action-row">
          <Button isLoading={matrices.isLoading} onClick={() => matrices.execute()} variant="primary">
            Consultar matrices
          </Button>
        </div>
      </Card>

      <ResultSection error={matrices.error} isEmpty={!matrices.data}>
        {matrices.data ? (
          <div className="matrix-list">
            {matrices.data.available_matrices.map((matrix) => (
              <div className="matrix-list__item" key={matrix.id}>
                <div>
                  <h4>{matrix.name}</h4>
                  <span className="small-muted">{matrix.id}</span>
                </div>
                <div className="metric-grid">
                  <MetricCard label="Aplica a" value={matrix.applies_to.map(formatSequenceType).join(", ")} />
                  <MetricCard
                    label="Estado"
                    value={<Badge tone={matrix.implemented ? "success" : "warning"}>{matrix.implemented ? "Implementada" : "No implementada"}</Badge>}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </ResultSection>
    </>
  )
}
