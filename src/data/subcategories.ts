import type { Subcategory } from "./types";

export const subcategories: Subcategory[] = [
  // Arquitectura de software
  { id: "clean-architecture", label: "Arquitectura limpia", category: "software-architecture" },
  { id: "hexagonal-architecture", label: "Arquitectura hexagonal", category: "software-architecture" },
  { id: "microservices", label: "Microservicios", category: "software-architecture" },
  { id: "distributed-systems", label: "Sistemas distribuidos", category: "software-architecture" },
  { id: "design-patterns", label: "Patrones de diseño", category: "software-architecture" },

  // Control de versiones
  { id: "git", label: "Git", category: "version-control" },
  { id: "pull-requests", label: "Pull requests", category: "version-control" },
  { id: "branching-strategies", label: "Estrategias de ramas", category: "version-control" },
  { id: "commits", label: "Commits", category: "version-control" },
  { id: "conflict-resolution", label: "Resolución de conflictos", category: "version-control" },

  // DevOps
  { id: "containers", label: "Contenedores", category: "devops" },
  { id: "infrastructure-as-code", label: "Infraestructura como código", category: "devops" },
  { id: "automation", label: "Automatización", category: "devops" },
  { id: "deployments", label: "Despliegues", category: "devops" },

  // Observabilidad
  { id: "logs", label: "Logs", category: "observability" },
  { id: "metrics", label: "Métricas", category: "observability" },
  { id: "traces", label: "Trazas", category: "observability" },
  { id: "alerts", label: "Alertas", category: "observability" },
  { id: "monitoring", label: "Monitorización", category: "observability" },

  // Calidad y pruebas
  { id: "unit-testing", label: "Pruebas unitarias", category: "quality-and-testing" },
  { id: "integration-testing", label: "Pruebas de integración", category: "quality-and-testing" },
  { id: "code-review", label: "Revisión de código", category: "quality-and-testing" },
  { id: "static-analysis", label: "Análisis estático", category: "quality-and-testing" },
];
