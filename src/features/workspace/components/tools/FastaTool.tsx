import { useState } from "react"
import { MonospaceBlock } from "../../../../components/shared/MonospaceBlock"
import { SequenceBadge } from "../../../../components/shared/SequenceBadge"
import { Button } from "../../../../components/ui/Button"
import { Card, CardHeader } from "../../../../components/ui/Card"
import { Textarea } from "../../../../components/ui/Textarea"
import { useFastaParser } from "../../../sequences/hooks/useFastaParser"
import { ResultSection } from "../ResultSection"

const fastaExample = ">seq1 ejemplo ADN\nAGAGACTC\n>seq2 ejemplo ADN\nAGAGTGTG"

export function FastaTool() {
  const [content, setContent] = useState(fastaExample)
  const [localError, setLocalError] = useState<string | null>(null)
  const parser = useFastaParser()

  const run = async () => {
    if (!content.trim()) {
      setLocalError("Pegá contenido FASTA antes de parsear.")
      return
    }

    setLocalError(null)
    await parser.execute({ fasta_content: content })
  }

  return (
    <>
      <Card>
        <CardHeader
          description="Esta pantalla solo interpreta texto FASTA y muestra los registros detectados."
          title="Entrada FASTA"
        />
        <div className="form-stack">
          <Textarea label="Contenido FASTA" onChange={(event) => setContent(event.target.value)} rows={9} value={content} />
          <div className="action-row">
            <Button isLoading={parser.isLoading} onClick={run} variant="primary">
              Parsear FASTA
            </Button>
          </div>
        </div>
      </Card>

      <ResultSection error={localError || parser.error} isEmpty={!parser.data}>
        {parser.data ? (
          <div className="fasta-records">
            {parser.data.records.length ? (
              parser.data.records.map((record) => (
                <section className="fasta-record" key={`${record.id}-${record.length}`}>
                  <div className="fasta-record__header">
                    <div>
                      <h4>{record.id}</h4>
                      <p>{record.description}</p>
                    </div>
                    <SequenceBadge type={record.detected_type} />
                  </div>
                  <span className="small-muted">{record.length} caracteres</span>
                  <MonospaceBlock compact>{record.sequence}</MonospaceBlock>
                </section>
              ))
            ) : (
              <p className="empty-state">No se detectaron registros FASTA.</p>
            )}
          </div>
        ) : null}
      </ResultSection>
    </>
  )
}
