import type { Prompt } from "../types";

export const artificialIntelligencePrompts: Prompt[] = [
  {
    id: "evaluate-prompt-quality",
    slug: "evaluar-calidad-de-prompts",
    title: "Evaluar prompts de forma sistemática",
    description:
      "Diseño de una evaluación rigurosa para un prompt: conjunto de casos de prueba, rúbrica de calidad, detección de regresiones y criterios de aprobación.",
    content: `Actúa como un ingeniero especializado en evaluación de sistemas basados en modelos de lenguaje.

Tengo un prompt en producción (o en desarrollo) y necesito evaluarlo de forma sistemática antes de confiar en él.

Prompt a evaluar:
{{prompt}}

Qué debería hacer bien (tarea, formato esperado, restricciones):
{{requirements}}

Contexto (modelo usado, volumen, criticidad del resultado):
{{context}}

Diseña la evaluación completa:

1. Conjunto de casos de prueba: define entre 15 y 30 casos que cubran: casos típicos, casos límite (entradas vacías, muy largas, ambiguas, en otro idioma), entradas adversariales (inyección de instrucciones, peticiones fuera de alcance) y casos donde la respuesta correcta es negarse o pedir clarificación. Entrégamelos como tabla: id, entrada, comportamiento esperado, categoría.
2. Rúbrica de evaluación: criterios medibles con su peso (por ejemplo: corrección factual 40%, formato 20%, tono 15%, rechazo apropiado 15%, concisión 10%). Para cada criterio, define qué es un 0, un 1 y un 2, con ejemplos.
3. Método de puntuación: cómo evaluar (humano, otro modelo como juez, o comprobaciones programáticas para lo verificable) y cómo mantener la consistencia entre evaluaciones.
4. Criterios de aprobación: umbrales mínimos por categoría (por ejemplo: 100% en rechazo de adversariales, 90% en formato) y qué hacer cuando se falla justo en el límite.
5. Regresiones: cómo convertir esta evaluación en una puerta automática para cualquier cambio futuro del prompt o del modelo.

Termina con una plantilla de informe de resultados que pueda reutilizar en cada iteración.`,
    language: "es",
    module: "artificial-intelligence",
    categories: ["prompt-engineering", "model-evaluation"],
    tags: ["llm", "template"],
    useCases: [
      "Validar un prompt antes de llevarlo a producción",
      "Comparar dos versiones de un prompt con datos",
      "Detectar regresiones al cambiar de modelo",
    ],
    createdAt: "2025-11-10",
    updatedAt: "2026-02-18",
  },
  {
    id: "design-rag-pipeline",
    slug: "design-rag-pipeline",
    title: "Design a RAG pipeline that actually works",
    description:
      "End-to-end design of a retrieval-augmented generation pipeline: chunking, embeddings, retrieval, reranking, grounding and evaluation of answer quality.",
    content: `You are an engineer specialized in retrieval-augmented generation (RAG) systems.

Help me design a RAG pipeline that answers questions over my own documents reliably.

Corpus description (types of documents, volume, update frequency):
{{corpus}}

Use cases and example questions:
{{requirements}}

Constraints (stack, budget, latency, existing infrastructure):
{{context}}

Design the full pipeline:

1. Ingestion: parsing and cleaning strategy per document type, metadata to keep (source, date, section), and how to handle updates and deletions.
2. Chunking: chunk size and overlap, splitting strategy (by structure vs. fixed size), and one concrete example of how a sample document of mine should be chunked. Explain the trade-off for my case instead of quoting defaults.
3. Indexing: embedding model choice (with cost/quality reasoning), metadata filters, and hybrid search (keyword + vector) if it helps my query types.
4. Retrieval: top-k strategy, reranking, and how to detect "we have no good context for this question" instead of hallucinating an answer.
5. Generation: the answer prompt template, with explicit grounding rules (cite sources, say "I don't have that information", no knowledge beyond the retrieved context).
6. Evaluation: a small golden set of question/expected-answer pairs, and the metrics to track (retrieval hit rate, faithfulness, answer relevance). Define what "good enough to ship" means numerically.
7. Failure modes: the five most likely ways this pipeline will produce a bad answer, and the mitigation for each.

Be concrete: name specific approaches and defaults I can start with this week, and mark clearly what to tune later with real usage data.`,
    language: "en",
    module: "artificial-intelligence",
    categories: ["rag", "llm-applications"],
    tags: ["llm", "python"],
    useCases: [
      "Building a question-answering feature over internal documentation",
      "Fixing a RAG prototype that hallucinates too much",
      "Evaluating whether RAG is the right approach before building it",
    ],
    createdAt: "2025-12-15",
    updatedAt: "2026-03-10",
  },
];
