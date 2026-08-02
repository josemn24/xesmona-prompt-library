import type { Category } from "./types";

export const categories: Category[] = [
  // Desarrollo de software
  { id: "software-architecture", label: "Arquitectura de software", module: "software-development" },
  { id: "frontend-development", label: "Desarrollo frontend", module: "software-development" },
  { id: "backend-development", label: "Desarrollo backend", module: "software-development" },
  { id: "web-development", label: "Desarrollo web", module: "software-development" },
  { id: "quality-and-testing", label: "Calidad y pruebas", module: "software-development" },
  { id: "version-control", label: "Control de versiones", module: "software-development" },
  { id: "devops", label: "DevOps", module: "software-development" },
  { id: "ci-cd", label: "CI/CD", module: "software-development" },
  { id: "observability", label: "Observabilidad", module: "software-development" },
  { id: "databases", label: "Bases de datos", module: "software-development" },
  { id: "apis-and-integrations", label: "APIs e integraciones", module: "software-development" },
  { id: "software-security", label: "Seguridad del software", module: "software-development" },
  { id: "technical-documentation", label: "Documentación técnica", module: "software-development" },
  { id: "performance", label: "Rendimiento", module: "software-development" },
  { id: "refactoring", label: "Refactorización", module: "software-development" },

  // Inteligencia artificial
  { id: "prompt-engineering", label: "Prompt engineering", module: "artificial-intelligence" },
  { id: "llm-applications", label: "Aplicaciones con modelos de lenguaje", module: "artificial-intelligence" },
  { id: "agents", label: "Agentes", module: "artificial-intelligence" },
  { id: "rag", label: "RAG", module: "artificial-intelligence" },
  { id: "model-evaluation", label: "Evaluación de modelos", module: "artificial-intelligence" },
  { id: "ai-automation", label: "Automatización con IA", module: "artificial-intelligence" },

  // Marketing
  { id: "content-strategy", label: "Estrategia de contenidos", module: "marketing" },
  { id: "seo", label: "SEO", module: "marketing" },
  { id: "email-marketing", label: "Email marketing", module: "marketing" },
  { id: "social-media", label: "Redes sociales", module: "marketing" },
  { id: "copywriting", label: "Copywriting", module: "marketing" },
  { id: "market-research", label: "Investigación de mercado", module: "marketing" },

  // Negocios
  { id: "business-strategy", label: "Estrategia empresarial", module: "business" },
  { id: "business-analysis", label: "Análisis de negocio", module: "business" },
  { id: "business-models", label: "Modelos de negocio", module: "business" },
  { id: "sales", label: "Ventas", module: "business" },
  { id: "operations", label: "Operaciones", module: "business" },
  { id: "project-management", label: "Gestión de proyectos", module: "business" },

  // Productividad
  { id: "organization", label: "Organización", module: "productivity" },
  { id: "planning", label: "Planificación", module: "productivity" },
  { id: "research", label: "Investigación", module: "productivity" },
  { id: "decision-making", label: "Toma de decisiones", module: "productivity" },
  { id: "communication", label: "Comunicación", module: "productivity" },
  { id: "learning", label: "Aprendizaje", module: "productivity" },
];
