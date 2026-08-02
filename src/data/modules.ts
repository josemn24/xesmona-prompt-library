import type { Module } from "./types";

export const modules: Module[] = [
  {
    id: "software-development",
    label: "Desarrollo de software",
    description:
      "Prompts para el ciclo de vida completo del software: arquitectura, frontend, backend, pruebas, control de versiones, DevOps, observabilidad, bases de datos, seguridad y más.",
  },
  {
    id: "artificial-intelligence",
    label: "Inteligencia artificial",
    description:
      "Prompts para trabajar con modelos de lenguaje: prompt engineering, aplicaciones con LLM, agentes, RAG, evaluación de modelos y automatización con IA.",
  },
  {
    id: "marketing",
    label: "Marketing",
    description:
      "Prompts para estrategia de contenidos, SEO, email marketing, redes sociales, copywriting e investigación de mercado.",
  },
  {
    id: "business",
    label: "Negocios",
    description:
      "Prompts para estrategia empresarial, análisis de negocio, modelos de negocio, ventas, operaciones y gestión de proyectos.",
  },
  {
    id: "productivity",
    label: "Productividad",
    description:
      "Prompts para organización personal, planificación, investigación, toma de decisiones, comunicación y aprendizaje.",
  },
];
