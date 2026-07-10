export type ToolId =
  | "validate"
  | "stats"
  | "dotplot"
  | "compare"
  | "global-alignment"
  | "local-alignment"
  | "reverse-complement"
  | "transcription"
  | "translation"
  | "orfs"
  | "fasta"
  | "matrices"

export interface ToolDefinition {
  id: ToolId
  title: string
  shortTitle: string
  description: string
  category: ToolCategory
  inputSummary: string
  outputSummary: string
}

export const toolCategories = ["Secuencias", "Comparacion", "Alineamientos", "Herramientas", "Extras"] as const

export type ToolCategory = (typeof toolCategories)[number]

export const toolCatalog: ToolDefinition[] = [
  {
    id: "validate",
    title: "Validar secuencia",
    shortTitle: "Validar",
    description: "Detecta si una secuencia es valida y que tipo biologico parece ser.",
    category: "Secuencias",
    inputSummary: "Una secuencia y el tipo esperado.",
    outputSummary: "Validez, tipo detectado, longitud y errores si existen.",
  },
  {
    id: "stats",
    title: "Estadisticas de secuencia",
    shortTitle: "Estadisticas",
    description: "Calcula longitud, composicion por simbolo y GC content cuando aplica.",
    category: "Secuencias",
    inputSummary: "Una secuencia.",
    outputSummary: "Metricas de composicion y porcentaje GC.",
  },
  {
    id: "dotplot",
    title: "Dot plot",
    shortTitle: "Dot plot",
    description: "Genera una matriz visual de coincidencias entre dos secuencias.",
    category: "Comparacion",
    inputSummary: "Dos secuencias, window size y stringency.",
    outputSummary: "Matriz de puntos y resumen de comparaciones.",
  },
  {
    id: "compare",
    title: "Identidad y similitud",
    shortTitle: "Identidad",
    description: "Compara dos secuencias posicion por posicion.",
    category: "Comparacion",
    inputSummary: "Dos secuencias y, opcionalmente, matriz para proteínas.",
    outputSummary: "Matches, mismatches, identidad y similitud.",
  },
  {
    id: "global-alignment",
    title: "Alineamiento global",
    shortTitle: "Global",
    description: "Needleman-Wunsch intenta alinear las secuencias completas.",
    category: "Alineamientos",
    inputSummary: "Dos secuencias y configuracion de scoring.",
    outputSummary: "Score, alineamiento completo e identidad.",
  },
  {
    id: "local-alignment",
    title: "Alineamiento local",
    shortTitle: "Local",
    description: "Smith-Waterman busca la region local con mayor similitud.",
    category: "Alineamientos",
    inputSummary: "Dos secuencias y configuracion de scoring.",
    outputSummary: "Region alineada, score, posiciones e identidad.",
  },
  {
    id: "transcription",
    title: "Transcripcion",
    shortTitle: "Transcripcion",
    description: "Convierte una secuencia de ADN en ARN.",
    category: "Herramientas",
    inputSummary: "Una secuencia de ADN.",
    outputSummary: "Secuencia de ARN transcripta.",
  },
  {
    id: "translation",
    title: "Traduccion",
    shortTitle: "Traduccion",
    description: "Traduce ADN o ARN a proteína.",
    category: "Herramientas",
    inputSummary: "Una secuencia de ADN o ARN.",
    outputSummary: "Secuencia proteica y advertencias.",
  },
  {
    id: "orfs",
    title: "ORF Finder",
    shortTitle: "ORFs",
    description: "Busca marcos de lectura abiertos simples en ADN.",
    category: "Herramientas",
    inputSummary: "Una secuencia de ADN y longitud mínima.",
    outputSummary: "Lista de ORFs con marco, posiciones y proteína.",
  },
  {
    id: "fasta",
    title: "Parsear FASTA",
    shortTitle: "FASTA",
    description: "Lee contenido FASTA y muestra los registros detectados.",
    category: "Herramientas",
    inputSummary: "Texto FASTA.",
    outputSummary: "Registros con id, descripcion, tipo y secuencia.",
  },
  {
    id: "reverse-complement",
    title: "Complemento reverso",
    shortTitle: "Complemento reverso",
    description: "Calcula el complemento reverso de una secuencia de ADN.",
    category: "Extras",
    inputSummary: "Una secuencia de ADN.",
    outputSummary: "Secuencia complementaria inversa.",
  },
  {
    id: "matrices",
    title: "Matrices disponibles",
    shortTitle: "Matrices",
    description: "Consulta las matrices de scoring que ofrece el sistema.",
    category: "Extras",
    inputSummary: "No requiere secuencias.",
    outputSummary: "BLOSUM62, PAM250 u otras matrices disponibles.",
  },
]

export function getToolDefinition(toolId: ToolId): ToolDefinition {
  return toolCatalog.find((tool) => tool.id === toolId) ?? toolCatalog[0]
}
