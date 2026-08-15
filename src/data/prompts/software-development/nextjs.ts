import type { Prompt } from "../../types";

export const nextjsPrompts: Prompt[] = [
  {
    id: "configure-nextjs-environment",
    slug: "configurar-entorno-configuracion-base-nextjs",
    title: "Configurar el entorno y la configuración base de Next.js",
    description:
      "Prepara las variables de entorno, los scripts y la configuración mínima de Next.js en un proyecto nuevo ya creado con create-next-app.",
    content: `Actúa como un ingeniero experto en desarrollo local y configuración de Next.js.

Este proyecto nuevo ya ha sido creado con \`create-next-app\`. Configura su entorno y su base técnica sin volver a crear el proyecto. Antes de actuar, consulta la documentación oficial actual:

- https://nextjs.org/docs/app/guides/environment-variables
- https://nextjs.org/docs/app/api-reference/config/next-config-js
- https://nextjs.org/docs/app/getting-started/installation

Contexto de la aplicación:
{{application}}

Entorno de despliegue previsto:
{{deployment}}

Servicios externos y requisitos de configuración:
{{environmentRequirements}}

Inspecciona el package manager, \`package.json\`, los scripts existentes, \`next.config.*\`, los archivos \`.env*\`, \`.gitignore\`, \`tsconfig.json\`, la configuración de ESLint y la estructura \`app\` o \`src/app\`.

Realiza solo los cambios justificados para:

- crear o actualizar un \`.env.example\` sin valores secretos;
- confirmar que los archivos de entorno locales no se versionan;
- clasificar cada variable como pública o exclusiva del servidor;
- conservar cualquier variable pública con prefijo \`NEXT_PUBLIC_\` únicamente cuando deba llegar al navegador;
- añadir o actualizar scripts de desarrollo, build, start, lint y typecheck sin sobrescribir scripts útiles;
- crear o actualizar \`next.config.ts\` únicamente cuando exista una opción de configuración necesaria;
- mantener la configuración compatible con el package manager, la versión de Next.js y el modo de despliegue del proyecto.

No vuelvas a ejecutar \`create-next-app\`, no inventes credenciales, no escribas valores reales en archivos de entorno y no configures todavía autenticación, base de datos, \`proxy.ts\`, SEO, caché ni servicios externos. No añadas opciones experimentales sin una justificación basada en la documentación actual.

Ten en cuenta que las variables \`NEXT_PUBLIC_\` pueden quedar incorporadas en el bundle durante el build. Si el proyecto necesita valores distintos al promover la misma imagen entre entornos, señala la diferencia entre configuración de build y de runtime en lugar de ocultarla.

Entrega:

1. decisiones tomadas y configuración que se conserva;
2. tabla de variables con nombre, visibilidad, entorno y archivo donde deben definirse;
3. resumen de los cambios realizados y archivos afectados;
4. comandos de verificación para desarrollo y producción;
5. cuestiones pendientes, riesgos y configuración que debe completarse manualmente.

Después verifica los scripts disponibles, TypeScript, lint y build sin ejecutar despliegues remotos.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["local-environment"],
    tags: ["nextjs", "checklist", "template"],
    useCases: [
      "Preparar las variables y scripts de un proyecto Next.js nuevo",
      "Separar correctamente la configuración pública y privada",
      "Establecer una configuración base antes de añadir funcionalidades",
    ],
    notes:
      "El proyecto debe existir previamente; este prompt configura el scaffold generado y no crea una aplicación desde un directorio vacío.",
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
  },

  {
    id: "configure-nextjs-error-states",
    slug: "configurar-estados-carga-errores-nextjs",
    title: "Configurar estados de carga y errores en Next.js",
    description:
      "Prepara estados coherentes de carga, error, recurso inexistente y recuperación para las primeras rutas de un proyecto Next.js.",
    content: `Actúa como un ingeniero frontend experto en Next.js y diseño de estados de interfaz.

Este proyecto nuevo ya ha sido creado con \`create-next-app\`. Configura sus estados base de carga y error sin rediseñar toda la aplicación. Antes de actuar, consulta la documentación oficial actual:

- https://nextjs.org/docs/app/api-reference/file-conventions/loading
- https://nextjs.org/docs/app/getting-started/error-handling
- https://nextjs.org/docs/app/api-reference/file-conventions/not-found
- https://nextjs.org/docs/app/getting-started/project-structure

Contexto de la aplicación:
{{application}}

Rutas y áreas iniciales:
{{routes}}

Requisitos visuales, de accesibilidad y de idioma:
{{uiRequirements}}

Política de errores y recuperación:
{{errorPolicy}}

Inspecciona la estructura \`app\` o \`src/app\`, los layouts, las rutas existentes, los estilos globales, los componentes compartidos y cualquier archivo \`loading\`, \`error\`, \`not-found\` o \`global-error\` ya presente.

Configura, cuando corresponda:

- un estado de carga global o específico por segmento mediante \`loading.tsx\`;
- un estado de error recuperable mediante \`error.tsx\` en los segmentos que tengan una frontera independiente;
- una página de recurso inexistente mediante \`not-found.tsx\` y el uso apropiado de \`notFound()\`;
- \`global-error.tsx\` únicamente si hay una razón clara para cubrir errores del root layout;
- estados vacíos y errores esperados cuando formen parte normal del producto, sin tratarlos como excepciones inesperadas.

Mantén los Server Components por defecto. Respeta la firma vigente documentada para los error boundaries, convierte \`error.tsx\` y \`global-error.tsx\` en Client Components cuando sea necesario y recuerda que \`global-error.tsx\` debe definir sus propios elementos \`html\` y \`body\`.

No sobrescribas estados existentes sin explicar el impacto. No añadas una librería de observabilidad, autenticación, fetching de datos ni una solución de diseño completa. No uses spinners genéricos donde un skeleton o un estado contextual sea más apropiado.

Entrega:

1. mapa de boundaries y estados por ruta;
2. resumen de los cambios realizados y archivos afectados;
3. diferencia entre errores esperados, excepciones y recursos inexistentes;
4. comportamiento de recuperación y retry;
5. comprobaciones de accesibilidad, navegación y responsive;
6. cuestiones pendientes y decisiones que dependan del diseño del producto.

Después verifica TypeScript, lint, build y manualmente cada estado que pueda activarse sin datos reales ni servicios externos.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["frontend-and-components"],
    tags: ["nextjs", "checklist"],
    useCases: [
      "Preparar los estados base de una aplicación Next.js nueva",
      "Evitar que cada ruta implemente errores y cargas de forma distinta",
      "Definir una estrategia inicial para errores recuperables y no recuperables",
    ],
    notes:
      "El prompt configura fronteras y estados iniciales; no sustituye una estrategia completa de observabilidad ni de manejo de errores de dominio.",
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
  },

  {
    id: "configure-nextjs-metadata-seo",
    slug: "configurar-metadata-seo-nextjs",
    title: "Configurar metadata y SEO inicial de Next.js",
    description:
      "Establece la metadata, la indexación y los archivos SEO fundamentales de una aplicación Next.js nueva sin inventar contenido de marketing.",
    content: `Actúa como un ingeniero frontend especializado en Next.js, SEO técnico y metadata web.

Este proyecto nuevo ya ha sido creado con \`create-next-app\`. Configura su base de metadata y SEO sin inventar mensajes comerciales ni indexar rutas privadas. Antes de actuar, consulta la documentación oficial actual:

- https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata
- https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- https://nextjs.org/docs/app/getting-started/project-structure

Producto y propuesta de valor:
{{product}}

Marca, idioma y región:
{{brand}}

Rutas públicas:
{{publicRoutes}}

Rutas privadas, de autenticación o de preview:
{{privateRoutes}}

Dominio, despliegue y requisitos de indexación:
{{deployment}}

Inspecciona \`app/layout.tsx\`, las páginas y layouts existentes, cualquier export de \`metadata\` o \`generateMetadata\`, iconos, imágenes Open Graph, \`robots\`, \`sitemap\`, configuración de dominio y variables de entorno relacionadas.

Configura, cuando la información esté disponible:

- metadata global mediante el objeto \`metadata\`;
- \`title.default\` y \`title.template\` para títulos consistentes;
- \`metadataBase\` cuando exista un dominio canónico fiable;
- descripción, idioma, Open Graph, Twitter/X e iconos;
- \`robots.ts\` y \`sitemap.ts\` únicamente para las rutas públicas que deban descubrirse;
- \`generateMetadata\` solo para rutas cuya metadata dependa de parámetros o datos dinámicos;
- metadata específica para páginas públicas relevantes.

Mantén estas APIs en Server Components. No uses el campo deprecado \`viewport\` dentro de \`metadata\` si la configuración correspondiente debe hacerse mediante la API de viewport. No generes títulos, descripciones, URLs canónicas, imágenes ni datos estructurados ficticios: marca la información pendiente.

En entornos de preview o staging, evita la indexación cuando no existan requisitos explícitos que indiquen lo contrario. No configures analítica, Search Console, autenticación ni contenido editorial.

Entrega:

1. estrategia de indexación por grupo de rutas;
2. metadata global y metadata específica propuesta;
3. resumen de los cambios realizados y archivos afectados;
4. rutas incluidas y excluidas de \`robots.txt\` y \`sitemap.xml\`;
5. comprobaciones para el \`head\`, Open Graph, URLs absolutas y metadata dinámica;
6. datos pendientes, riesgos y decisiones que deba completar el propietario del producto.

Después verifica TypeScript, lint, build y las respuestas de \`robots.txt\` y \`sitemap.xml\` sin publicar el proyecto.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["frontend-and-components"],
    tags: ["nextjs", "checklist", "analysis"],
    useCases: [
      "Preparar el SEO técnico de una aplicación Next.js nueva",
      "Evitar indexar dashboards, previews y rutas de autenticación",
      "Establecer títulos y metadata consistentes desde el inicio",
    ],
    notes:
      "El prompt configura la infraestructura de metadata; el copy SEO, las imágenes y la estrategia editorial deben confirmarse con el producto.",
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
  },

  {
    id: "evaluate-configure-nextjs-proxy",
    slug: "evaluar-configurar-proxy-nextjs",
    title: "Evaluar y configurar Proxy en Next.js",
    description:
      "Decide si un proyecto Next.js nuevo necesita redirects, rewrites, headers o Proxy y configura la opción más pequeña que resuelva el requisito.",
    content: `Actúa como un arquitecto frontend y de infraestructura especializado en Next.js.

Este proyecto nuevo ya ha sido creado con \`create-next-app\`. Evalúa si necesita una frontera de petición y configúrala solo cuando exista una necesidad concreta. Antes de actuar, consulta la documentación oficial actual:

- https://nextjs.org/docs/app/getting-started/proxy
- https://nextjs.org/docs/app/api-reference/file-conventions/proxy
- https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects
- https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites
- https://nextjs.org/docs/app/api-reference/config/next-config-js/headers

Requisitos de routing y requests:
{{routingRequirements}}

Rutas, cookies, headers o dominios implicados:
{{requestRequirements}}

Requisitos de seguridad y autenticación ya decididos:
{{securityRequirements}}

Modalidad de despliegue:
{{deployment}}

Inspecciona la raíz del proyecto, \`app\` o \`src/app\`, \`next.config.*\`, cualquier \`proxy.*\` o \`middleware.*\`, rutas públicas, assets, iconos, Open Graph, \`robots\` y \`sitemap\`.

Entrega primero una recomendación entre estas opciones:

1. no añadir ninguna frontera;
2. usar \`redirects\` en \`next.config.ts\`;
3. usar \`rewrites\` en \`next.config.ts\`;
4. configurar headers en \`next.config.ts\`;
5. crear o actualizar \`proxy.ts\`.

Prefiere \`redirects\`, \`rewrites\` o headers estáticos cuando resuelvan el requisito. Si necesitas \`proxy.ts\`:

- usa el nombre y la firma vigentes documentados para Next.js;
- coloca el archivo en la raíz o junto a \`app\` dentro de \`src\`;
- define un matcher explícito y limitado;
- excluye assets, \`_next\`, iconos, Open Graph, \`robots.txt\` y \`sitemap.xml\` cuando corresponda;
- limita la lógica a redirects, rewrites, headers o comprobaciones rápidas basadas en la request;
- evita fetching lento, consultas a base de datos y lógica de negocio.

No uses Proxy como sistema completo de autenticación o autorización. No renombres automáticamente una implementación existente de \`middleware\` sin explicar la compatibilidad y la documentación de la versión instalada. No crees reglas para rutas que no estén justificadas por los requisitos proporcionados.

Entrega:

1. recomendación y alternativa descartada;
2. resumen de los cambios realizados y archivos afectados;
3. tabla de rutas afectadas y comportamiento esperado;
4. matcher final y exclusiones;
5. riesgos de loops, redirects permanentes, cookies, headers y despliegue;
6. comandos o requests para verificar cada caso.

Después verifica TypeScript, lint, build y requests representativas sin ejecutar despliegues remotos ni acceder a servicios externos.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["frontend-and-components"],
    tags: ["nextjs", "checklist", "analysis"],
    useCases: [
      "Decidir si una aplicación Next.js nueva necesita Proxy",
      "Configurar redirects y rewrites sin añadir complejidad innecesaria",
      "Limitar una frontera de requests a rutas y casos concretos",
    ],
    notes:
      "La respuesta correcta puede ser no crear Proxy; la autenticación y autorización definitiva deben resolverse cerca del recurso protegido.",
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
  },
];

