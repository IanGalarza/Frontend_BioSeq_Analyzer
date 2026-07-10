import type { OrfRecord } from "../../../types/api"

interface OrfFinderPanelProps {
  orfs: OrfRecord[]
}

export function OrfFinderPanel({ orfs }: OrfFinderPanelProps) {
  if (!orfs.length) {
    return <p className="empty-state">No hay ORFs para mostrar.</p>
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Marco</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Longitud</th>
            <th>Nucleótidos</th>
            <th>Proteína</th>
          </tr>
        </thead>
        <tbody>
          {orfs.map((orf) => (
            <tr key={`${orf.frame}-${orf.start}-${orf.end}`}>
              <td>{orf.frame}</td>
              <td>{orf.start}</td>
              <td>{orf.end}</td>
              <td>{orf.length}</td>
              <td className="mono-cell">{orf.nucleotide_sequence}</td>
              <td className="mono-cell">{orf.protein_sequence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
