import type { ModuleNavigation } from "./types";

/** Optional presentation groupings. The canonical prompt taxonomy remains module/category/subcategory. */
export const moduleNavigation: ModuleNavigation[] = [
  {
    module: "software-development",
    groups: [
      {
        id: "define",
        label: "Definir",
        description: "Aclarar el problema, preparar el proyecto y establecer una forma de trabajar.",
        categories: ["discovery-and-scope", "project-setup-and-workflow"],
      },
      {
        id: "design-and-build",
        label: "Diseñar y construir",
        description: "Tomar decisiones de diseño y construir las partes principales del producto.",
        categories: [
          "software-architecture",
          "frontend-and-experience",
          "backend-and-apis",
          "data",
          "integrations",
        ],
      },
      {
        id: "validate-and-operate",
        label: "Validar y operar",
        description: "Comprobar la calidad, entregar el software y mantenerlo operativo.",
        categories: [
          "quality-security-performance",
          "delivery-and-deployment",
          "observability",
          "maintenance-and-evolution",
        ],
      },
    ],
  },
];
