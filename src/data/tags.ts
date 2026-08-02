import type { Tag } from "./types";

/**
 * Tags are cross-cutting concepts: technologies, tools, objectives, formats
 * and workflows that can apply to prompts from any module or category.
 */
export const tags: Tag[] = [
  // Technologies and tools
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "react", label: "React" },
  { id: "sql", label: "SQL" },
  { id: "postgresql", label: "PostgreSQL" },
  { id: "docker", label: "Docker" },
  { id: "api", label: "API" },
  { id: "rest", label: "REST" },
  { id: "git", label: "Git" },
  { id: "llm", label: "LLM" },

  // Formats
  { id: "checklist", label: "Checklist" },
  { id: "template", label: "Plantilla" },

  // Workflows and objectives
  { id: "debugging", label: "Depuración" },
  { id: "incident-response", label: "Respuesta a incidentes" },
  { id: "legacy-code", label: "Código legado" },
  { id: "migration", label: "Migración" },
  { id: "analysis", label: "Análisis" },
  { id: "conversion", label: "Conversión" },
  { id: "lean-startup", label: "Lean Startup" },
  { id: "validated-learning", label: "Aprendizaje validado" },
  { id: "experimentation", label: "Experimentación" },
  { id: "mvp", label: "MVP" },
  { id: "pivot", label: "Pivot" },
  { id: "growth-engine", label: "Motor de crecimiento" },
];
