import type { Category } from "./types";

export const categories: Category[] = [
  // Desarrollo de software
  { id: "software-architecture", iconId: "architecture-blocks", label: "Arquitectura de software", module: "software-development" },
  { id: "frontend-development", iconId: "browser-window", label: "Desarrollo frontend", module: "software-development" },
  { id: "backend-development", iconId: "server-stack", label: "Desarrollo backend", module: "software-development" },
  { id: "web-development", iconId: "globe-window", label: "Desarrollo web", module: "software-development" },
  { id: "quality-and-testing", iconId: "test-check", label: "Calidad y pruebas", module: "software-development" },
  { id: "version-control", iconId: "git-branches", label: "Control de versiones", module: "software-development" },
  { id: "devops", iconId: "gear-cycle", label: "DevOps", module: "software-development" },
  { id: "ci-cd", iconId: "pipeline", label: "CI/CD", module: "software-development" },
  { id: "observability", iconId: "chart-radar", label: "Observabilidad", module: "software-development" },
  { id: "databases", iconId: "database-cylinder", label: "Bases de datos", module: "software-development" },
  { id: "apis-and-integrations", iconId: "link-nodes", label: "APIs e integraciones", module: "software-development" },
  { id: "software-security", iconId: "shield-code", label: "Seguridad del software", module: "software-development" },
  { id: "technical-documentation", iconId: "document-code", label: "Documentación técnica", module: "software-development" },
  { id: "performance", iconId: "speedometer", label: "Rendimiento", module: "software-development" },
  { id: "refactoring", iconId: "code-refresh", label: "Refactorización", module: "software-development" },

  // Inteligencia artificial
  { id: "prompt-engineering", iconId: "prompt-wand", label: "Prompt engineering", module: "artificial-intelligence" },
  { id: "llm-applications", iconId: "chat-chip", label: "Aplicaciones con modelos de lenguaje", module: "artificial-intelligence" },
  { id: "agents", iconId: "robot-compass", label: "Agentes", module: "artificial-intelligence" },
  { id: "rag", iconId: "document-retrieval", label: "RAG", module: "artificial-intelligence" },
  { id: "model-evaluation", iconId: "model-score", label: "Evaluación de modelos", module: "artificial-intelligence" },
  { id: "ai-automation", iconId: "automation-spark", label: "Automatización con IA", module: "artificial-intelligence" },

  // Marketing
  { id: "content-strategy", iconId: "editorial-calendar", label: "Estrategia de contenidos", module: "marketing" },
  { id: "seo", iconId: "search-chart", label: "SEO", module: "marketing" },
  { id: "email-marketing", iconId: "mail-growth", label: "Email marketing", module: "marketing" },
  { id: "social-media", iconId: "social-bubbles", label: "Redes sociales", module: "marketing" },
  { id: "copywriting", iconId: "pencil-copy", label: "Copywriting", module: "marketing" },
  { id: "market-research", iconId: "market-loupe", label: "Investigación de mercado", module: "marketing" },

  // Negocios
  { id: "business-strategy", iconId: "roadmap-flag", label: "Estrategia empresarial", module: "business" },
  { id: "business-analysis", iconId: "analysis-chart", label: "Análisis de negocio", module: "business" },
  { id: "business-models", iconId: "canvas-blocks", label: "Modelos de negocio", module: "business" },
  { id: "sales", iconId: "sales-funnel", label: "Ventas", module: "business" },
  { id: "operations", iconId: "operations-gears", label: "Operaciones", module: "business" },
  { id: "project-management", iconId: "kanban-check", label: "Gestión de proyectos", module: "business" },
  { id: "lean-startup", iconId: "build-measure-learn", label: "Lean Startup", module: "business" },

  // Productividad
  { id: "organization", iconId: "organized-files", label: "Organización", module: "productivity" },
  { id: "planning", iconId: "planning-calendar", label: "Planificación", module: "productivity" },
  { id: "research", iconId: "research-loupe", label: "Investigación", module: "productivity" },
  { id: "decision-making", iconId: "decision-branch", label: "Toma de decisiones", module: "productivity" },
  { id: "communication", iconId: "communication-bubbles", label: "Comunicación", module: "productivity" },
  { id: "learning", iconId: "learning-book", label: "Aprendizaje", module: "productivity" },
];
