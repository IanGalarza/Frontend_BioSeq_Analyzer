import { formatSequenceType } from "../../utils/formatters"
import { Badge } from "../ui/Badge"

interface SequenceBadgeProps {
  type: string | null | undefined
}

function getSequenceTone(type: string | null | undefined) {
  const normalizedType = type?.trim().toLocaleLowerCase("es")

  switch (normalizedType) {
    case "adn":
    case "dna":
      return "success"
    case "arn":
    case "rna":
      return "info"
    case "proteína":
    case "proteina":
    case "protein":
      return "warning"
    default:
      return "neutral"
  }
}

export function SequenceBadge({ type }: SequenceBadgeProps) {
  const tone = getSequenceTone(type)

  return <Badge tone={tone}>{formatSequenceType(type)}</Badge>
}
