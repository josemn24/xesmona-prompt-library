import type { Tag } from "./types";

export const tags: Tag[] = [
  // Technology
  { id: "typescript", label: "TypeScript", facet: "technology" },
  { id: "python", label: "Python", facet: "technology" },
  { id: "react", label: "React", facet: "technology" },
  { id: "sql", label: "SQL", facet: "technology" },
  { id: "postgresql", label: "PostgreSQL", facet: "technology" },
  { id: "docker", label: "Docker", facet: "technology" },
  { id: "supabase", label: "Supabase", facet: "technology" },
  { id: "shadcn", label: "shadcn/ui", facet: "technology" },
  { id: "storybook", label: "Storybook", facet: "technology" },
  { id: "api", label: "API", facet: "technology" },
  { id: "rest", label: "REST", facet: "technology" },
  { id: "git", label: "Git", facet: "technology" },
  { id: "llm", label: "LLM", facet: "technology" },

  // Format
  { id: "checklist", label: "Checklist", facet: "format" },
  { id: "template", label: "Plantilla", facet: "format" },

  // Objective
  { id: "debugging", label: "Depuración", facet: "objective" },
  { id: "incident-response", label: "Respuesta a incidentes", facet: "objective" },
  { id: "analysis", label: "Análisis", facet: "objective" },
  { id: "conversion", label: "Conversión", facet: "objective" },
  { id: "migration", label: "Migración", facet: "objective" },

  // Context and method
  { id: "legacy-code", label: "Código legado", facet: "context" },
  { id: "lean-startup", label: "Lean Startup", facet: "context" },
  { id: "validated-learning", label: "Aprendizaje validado", facet: "context" },
  { id: "experimentation", label: "Experimentación", facet: "context" },
  { id: "mvp", label: "MVP", facet: "context" },
  { id: "pivot", label: "Pivot", facet: "context" },
  { id: "growth-engine", label: "Motor de crecimiento", facet: "context" },
];
