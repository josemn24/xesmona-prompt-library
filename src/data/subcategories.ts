import type { Subcategory } from "./types";

export const subcategories: Subcategory[] = [
  // Desarrollo de software: descubrimiento y alcance
  {
    id: "project-analysis",
    iconId: "project-analysis",
    label: "Análisis del proyecto",
    category: "discovery-and-scope",
    description:
      "Comprender el propósito, los usuarios, el estado, el equipo y la construcción de un proyecto software.",
    isNavigable: true,
  },

  // Desarrollo de software: arquitectura y diseño
  { id: "clean-architecture", label: "Arquitectura limpia", category: "software-architecture" },
  { id: "hexagonal-architecture", label: "Arquitectura hexagonal", category: "software-architecture" },
  { id: "distributed-systems", label: "Sistemas distribuidos", category: "software-architecture" },
  { id: "quality-attributes", label: "Atributos de calidad", category: "software-architecture" },
  { id: "c4-model", label: "Modelo C4", category: "software-architecture" },
  { id: "application-structure", label: "Organización interna", category: "software-architecture" },
  { id: "architecture-decisions", label: "Decisiones arquitectónicas", category: "software-architecture" },
  { id: "architectural-review", label: "Revisión arquitectónica", category: "software-architecture" },

  // Desarrollo de software: frontend
  { id: "rendering-strategies", label: "Estrategias de renderizado", category: "frontend-and-experience" },
  { id: "frontend-state", label: "Estado frontend", category: "frontend-and-experience" },
  { id: "frontend-debugging", label: "Depuración frontend", category: "frontend-and-experience" },

  // Desarrollo de software: backend y APIs
  { id: "rest-api-design", label: "Diseño de API REST", category: "backend-and-apis" },
  { id: "api-contracts", label: "Contratos de API", category: "backend-and-apis" },
  { id: "api-error-model", label: "Modelo de errores de API", category: "backend-and-apis" },

  // Desarrollo de software: calidad, seguridad y rendimiento
  { id: "unit-testing", label: "Pruebas unitarias", category: "quality-security-performance" },
  { id: "integration-testing", label: "Pruebas de integración", category: "quality-security-performance" },
  {
    id: "code-review",
    iconId: "test-check",
    label: "Revisión de código",
    category: "quality-security-performance",
    description:
      "Definir y aplicar criterios consistentes para revisar cambios de código.",
    isNavigable: true,
  },
  { id: "software-security", label: "Seguridad del software", category: "quality-security-performance" },

  // Desarrollo de software: entrega y despliegue
  { id: "ci-cd-pipelines", label: "Pipelines de CI/CD", category: "delivery-and-deployment" },
  { id: "automation", label: "Automatización", category: "delivery-and-deployment" },
  { id: "deployments", label: "Despliegues", category: "delivery-and-deployment" },
  { id: "containers", label: "Contenedores", category: "delivery-and-deployment" },
  {
    id: "releases-and-changes",
    iconId: "pipeline",
    label: "Releases y cambios",
    category: "delivery-and-deployment",
    description: "Preparar, comunicar y verificar releases de forma segura.",
    isNavigable: true,
  },

  // Desarrollo de software: observabilidad
  { id: "incident-response", label: "Respuesta a incidentes", category: "observability" },
  { id: "observability-improvement", label: "Mejora de observabilidad", category: "observability" },
  { id: "logs", label: "Logs", category: "observability" },
  { id: "metrics", label: "Métricas", category: "observability" },
  { id: "traces", label: "Trazas", category: "observability" },
  { id: "alerts", label: "Alertas", category: "observability" },
  { id: "monitoring", label: "Monitorización", category: "observability" },

  // Desarrollo de software: datos
  { id: "query-performance", label: "Rendimiento de consultas", category: "data" },
  { id: "database-migrations", label: "Migraciones de base de datos", category: "data" },

  // Desarrollo de software: setup y forma de trabajar
  {
    id: "local-environment",
    iconId: "gear-cycle",
    label: "Entorno local",
    category: "project-setup-and-workflow",
    description:
      "Preparar el repositorio, las herramientas y la configuración para empezar a desarrollar.",
    isNavigable: true,
  },
  {
    id: "database",
    iconId: "database-cylinder",
    label: "Base de datos",
    category: "project-setup-and-workflow",
    description:
      "Diseñar el esquema, las migraciones y los datos necesarios para trabajar con persistencia.",
    isNavigable: true,
  },
  {
    id: "frontend-and-components",
    iconId: "browser-window",
    label: "Frontend y componentes",
    category: "project-setup-and-workflow",
    description:
      "Definir la base visual y el sistema de componentes de la interfaz.",
    isNavigable: true,
  },
  {
    id: "version-control-and-collaboration",
    iconId: "git-branches",
    label: "Control de versiones y colaboración",
    category: "project-setup-and-workflow",
    description:
      "Establecer convenciones de Git, commits y colaboración del equipo.",
  },
  {
    id: "testing",
    iconId: "test-check",
    label: "Testing",
    category: "project-setup-and-workflow",
    description:
      "Preparar las herramientas, convenciones y estrategia inicial de pruebas del proyecto.",
    isNavigable: true,
  },
  {
    id: "onboarding-and-conventions",
    iconId: "document-code",
    label: "Onboarding y convenciones",
    category: "project-setup-and-workflow",
    description:
      "Preparar la incorporación de colaboradores y establecer normas de trabajo.",
    isNavigable: true,
  },
  { id: "legacy-code", label: "Código legado", category: "maintenance-and-evolution" },
  { id: "refactoring", label: "Refactorización", category: "maintenance-and-evolution" },
  { id: "technical-documentation", label: "Documentación técnica", category: "maintenance-and-evolution" },

  // Inteligencia artificial
  { id: "prompt-evaluation", label: "Evaluación de prompts", category: "model-evaluation" },
  { id: "rag-pipeline-design", label: "Diseño de pipeline RAG", category: "knowledge-and-rag" },

  // Marketing
  { id: "seo", label: "SEO", category: "acquisition-and-distribution" },
  { id: "launch-email-sequence", label: "Email de lanzamiento", category: "conversion-and-retention" },

  // Negocios
  { id: "strategic-analysis", label: "Análisis estratégico", category: "opportunities-and-discovery" },
  { id: "sales-discovery", label: "Descubrimiento comercial", category: "sales-and-growth" },
  { id: "business-model-canvas", label: "Business Model Canvas", category: "strategy-and-business-model" },
  { id: "lean-documentation", label: "Documentación Lean", category: "validation-and-experimentation" },
  { id: "lean-cycle", label: "Ciclo Lean Startup", category: "validation-and-experimentation" },
  { id: "project-definition", label: "Definición de proyecto Lean", category: "validation-and-experimentation" },
  { id: "hypotheses", label: "Hipótesis", category: "validation-and-experimentation" },
  { id: "hypothesis-prioritization", label: "Priorización de hipótesis", category: "validation-and-experimentation" },
  { id: "experiment-design", label: "Diseño de experimentos", category: "validation-and-experimentation" },
  { id: "experimental-mvp", label: "MVP experimental", category: "validation-and-experimentation" },
  { id: "validated-learning", label: "Aprendizaje validado", category: "validation-and-experimentation" },
  { id: "pivot-or-persevere", label: "Perseverar, pivotar o parar", category: "validation-and-experimentation" },
  { id: "learning-cadence", label: "Cadencia de aprendizaje", category: "validation-and-experimentation" },

  // Productividad
  { id: "weekly-review", label: "Revisión semanal", category: "planning" },
  { id: "decision-matrix", label: "Matriz de decisión", category: "decision-making" },
];
