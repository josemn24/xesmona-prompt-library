import type { Prompt } from "../../types";

export const projectDiscoveryPrompts: Prompt[] = [
  {
    id: "analyze-project-repository",
    slug: "analizar-proyecto-repositorio",
    title: "Analizar un proyecto software a partir de su repositorio",
    description:
      "Informe breve y comprensible sobre el propósito, los usuarios, el estado, el equipo y la construcción de un proyecto software a partir de la información disponible en su repositorio.",
    content: `Analiza el repositorio del proyecto y las fuentes accesibles asociadas —como documentación, configuración, historial Git, issues, releases, CI/CD y otras— y genera un informe breve, claro y orientado a la comprensión del proyecto.

El informe debe permitir que una persona técnica o no técnica entienda rápidamente:

- qué es el proyecto;
- qué problema resuelve;
- para quién está pensado;
- en qué estado se encuentra;
- quién parece desarrollarlo o mantenerlo;
- cómo está construido.

## Criterio de análisis

Basa el informe en la información observable en el proyecto y distingue cuidadosamente entre:

- **Hechos:** información claramente confirmada.
- **Inferencias:** conclusiones razonables basadas en varios indicios. Preséntalas como aproximaciones, no como certezas.
- **Desconocido:** aspectos que no pueden determinarse con suficiente confianza.

No inventes información ni presentes suposiciones como hechos. Si faltan datos, indícalo de forma natural, por ejemplo: “no queda claro”, “parece”, “todo apunta a” o “no hay información suficiente para determinarlo”.

No confundas la ausencia de evidencia con la inexistencia de una característica. Si alguna fuente no es accesible, tenlo en cuenta y limita la conclusión a la información disponible.

## Contenido del informe

### 1. Resumen

Explica qué es el proyecto, qué problema aborda, cuáles son sus capacidades principales y cuál parece ser su propósito.

### 2. Producto y usuarios

Describe para quién está pensado, qué valor aporta y qué tipo de producto parece ser: B2B, B2C, SaaS, herramienta interna, open source u otro.

### 3. Estado actual

Indica la fase aproximada del proyecto —por ejemplo, prototipo, MVP, desarrollo activo, producción, mantenimiento o legacy— y explica brevemente los principales indicios que sustentan esa valoración.

Aclara si la valoración describe el estado actual o si existen señales de etapas anteriores del proyecto.

### 4. Equipo y forma de trabajo

Resume quién parece desarrollar o mantener el proyecto según la información disponible.

Describe únicamente las prácticas que puedan observarse: colaboración, ritmo de cambios, releases, CI/CD, testing, revisión de código, documentación, metodología o dinámica de trabajo. No deduzcas el tamaño real del equipo solo a partir del historial Git.

### 5. Arquitectura y tecnologías

Explica a alto nivel cómo está construido el sistema: componentes principales, almacenamiento, infraestructura, despliegue e integraciones relevantes.

Menciona únicamente las tecnologías principales y explica brevemente qué papel desempeña cada una. Evita convertir esta sección en un inventario de dependencias.

### 6. Observaciones

Incluye las incertidumbres, limitaciones, contradicciones o aspectos especialmente relevantes para interpretar correctamente el proyecto.

## Estilo

- Ve al grano y prioriza la información significativa.
- Combina perspectivas de producto, negocio, equipo y tecnología.
- Explica las conclusiones en lenguaje natural, comprensible para personas técnicas y no técnicas.
- Prioriza el significado y las implicaciones sobre los detalles que demuestran cómo has llegado a cada conclusión.
- Evita referencias técnicas explícitas, listas de archivos, citas de commits o explicaciones detalladas de las fuentes analizadas, salvo que sean necesarias para comprender el proyecto.
- No escribas como una auditoría técnica ni como documentación de onboarding.
- Evita repetir información entre secciones.
- El informe debe poder leerse en aproximadamente 3-5 minutos.

El objetivo es que, al terminar de leerlo, alguien que no conoce el proyecto pueda responder:

**¿Qué es? ¿Para qué sirve? ¿Para quién? ¿En qué estado está? ¿Quién lo desarrolla? ¿Cómo está construido?**`,
    language: "es",
    module: "software-development",
    category: "discovery-and-scope",
    subcategories: ["project-analysis"],
    tags: ["analysis", "template"],
    useCases: [
      "Entender rápidamente un repositorio o proyecto desconocido",
      "Preparar una visión compartida del proyecto para una conversación de equipo",
      "Facilitar el contexto inicial antes de revisar, mantener o evolucionar un proyecto",
    ],
    notes:
      "Úsalo cuando se necesite una visión global del proyecto para audiencias técnicas y no técnicas. El informe debe mantener el rigor sin convertirse en una auditoría ni en una lista de fuentes.",
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
  },
];
