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

  {
    id: "recommend-nextjs-testing-stack",
    slug: "evaluar-recomendar-stack-testing-nextjs",
    title: "Evaluar y recomendar el stack de testing para una aplicación Next.js",
    description:
      "Analiza las necesidades de calidad de un proyecto Next.js nuevo y recomienda un stack de testing proporcionado antes de configurarlo.",
    content: `Actúa como un arquitecto de calidad especializado en Next.js, React y testing frontend.

Este proyecto nuevo ya ha sido creado con "create-next-app". Evalúa y recomienda su stack de testing, pero no instales dependencias ni modifiques archivos. Antes de actuar, consulta la documentación oficial actual:

- https://nextjs.org/docs/app/guides/testing
- https://nextjs.org/docs/app/guides/testing/vitest
- https://nextjs.org/docs/app/guides/testing/playwright
- https://nextjs.org/docs/app/guides/testing/jest
- https://nextjs.org/docs/app/guides/testing/cypress

Contexto de la aplicación:
{{application}}

Stack y estructura técnica:
{{stack}}

Flujos críticos, riesgos y funcionalidades prioritarias:
{{criticalFlows}}

Flujo actual de desarrollo y revisión:
{{workflow}}

CI, restricciones de ejecución y presupuesto de mantenimiento:
{{ci}}

Inspecciona "package.json", el package manager y sus lockfiles, TypeScript, aliases de importación, la estructura "app" o "src/app", Server y Client Components, Route Handlers, Server Functions, configuración de CI y cualquier herramienta o carpeta de testing ya existente. Conserva los cambios y decisiones que ya estén presentes.

Evalúa Vitest, Playwright, Jest y Cypress según las necesidades reales del proyecto:

- funciones, utilidades y lógica pura;
- componentes síncronos y pruebas de interacción;
- Server Components asíncronos;
- Route Handlers, Server Functions y flujos de integración;
- recorridos E2E en un navegador real;
- velocidad, feedback local y estabilidad;
- ejecución en CI, mantenimiento y complejidad operativa;
- cobertura útil, sin convertir el porcentaje en un objetivo aislado.

Ten en cuenta que la documentación actual de Next.js indica que Vitest y Jest no soportan completamente los Server Components asíncronos y recomienda pruebas E2E para esos casos. No conviertas esa limitación en una regla para todo el proyecto: distingue componentes síncronos, lógica aislable y flujos que necesitan un entorno real.

Recomienda una combinación concreta de herramientas y explica por qué. No recomiendes instalar Vitest, Playwright, Jest y Cypress a la vez sin una justificación específica. Considera si basta con una única herramienta, si conviene combinar Vitest con Playwright o si el stack existente debe conservarse.

La respuesta debe ser una recomendación, no una configuración. No instales paquetes, no edites "package.json", no crees "vitest.config.*", "playwright.config.*", "jest.config.*" ni archivos de test, y no ejecutes comandos que modifiquen el proyecto. No generes una suite completa de tests de negocio, no impongas una cobertura numérica sin contexto y no añadas servicios externos como BrowserStack o plataformas de regresión visual sin requisitos explícitos.

Diferencia claramente hechos observados, supuestos, recomendación, alternativas descartadas y decisiones pendientes.

Entrega:

1. recomendación principal del stack y su alcance;
2. herramientas evaluadas, descartadas o mantenidas y motivo;
3. matriz de herramientas frente a tipos de prueba;
4. estructura de carpetas y convenciones de tests propuesta;
5. dependencias, scripts y archivos de configuración que se añadirían en una segunda fase, sin crearlos;
6. uno o dos smoke tests representativos que convendría implementar después, sin escribirlos;
7. límites conocidos, riesgos y costes de mantenimiento;
8. decisiones pendientes y plan de adopción incremental.

Si faltan datos, no inventes flujos, requisitos de CI ni objetivos de cobertura: indica qué información concreta debe aportar el equipo. Verifica únicamente la coherencia de la recomendación con la versión de Next.js y el scaffold inspeccionado.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["testing"],
    tags: ["nextjs", "analysis", "checklist"],
    useCases: [
      "Elegir un stack de testing proporcionado para un proyecto Next.js nuevo",
      "Distinguir qué probar con Vitest y qué validar con Playwright",
      "Preparar una futura configuración de testing sin instalar herramientas prematuramente",
    ],
    notes:
      "Este prompt recomienda herramientas y convenciones; la instalación, configuración y creación de tests deben hacerse en una fase posterior con un prompt específico.",
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
  },

  {
    id: "define-nextjs-data-fetching-cache",
    slug: "definir-fetching-cache-revalidacion-nextjs",
    title: "Definir fetching, caché y revalidación en Next.js",
    description:
      "Define una estrategia explícita para obtener, cachear, transmitir y revalidar datos en una aplicación Next.js según sus requisitos de frescura y consistencia.",
    content: `Actúa como un arquitecto experto en Next.js, React Server Components y sistemas de datos.

Este proyecto nuevo ya ha sido creado con "create-next-app". Define la estrategia de acceso, caché y revalidación sin inventar una fuente de datos ni activar Cache Components por defecto. Antes de actuar, consulta la documentación oficial actual:

- https://nextjs.org/docs/app/getting-started/fetching-data
- https://nextjs.org/docs/app/getting-started/revalidating
- https://nextjs.org/docs/app/getting-started/partial-prerendering
- https://nextjs.org/docs/app/getting-started/server-and-client-components
- https://nextjs.org/docs/app/getting-started/updating-data

Contexto del producto:
{{application}}

Fuentes de datos, APIs, ORM o base de datos previstos:
{{dataSources}}

Lecturas y mutaciones principales:
{{operations}}

Requisitos de frescura, consistencia y tolerancia a datos obsoletos:
{{freshnessRequirements}}

Usuarios, autenticación y datos personalizados por request:
{{accessRequirements}}

Inspecciona la versión de Next.js, "next.config.*", la estructura "app" o "src/app", Server y Client Components existentes, Route Handlers, Server Functions, proveedores de datos, variables de entorno y cualquier uso actual de "fetch", "use cache", "cacheLife", "cacheTag", "revalidateTag", "updateTag", "revalidatePath" o configuraciones antiguas de caché.

Entrega primero una decisión sobre el modelo de caché:

1. mantener el modelo por defecto sin Cache Components;
2. activar "cacheComponents: true" y adoptar "use cache";
3. mantener Cache Components desactivado temporalmente y documentar qué información falta.

Para cada operación relevante, define:

- dónde se inicia el fetching: Server Component, Client Component, Route Handler, Server Function o capa de datos;
- si los datos son estáticos, cacheables, dinámicos o dependientes de la request;
- si debe usarse "use cache" y qué valores forman parte de la clave;
- duración mediante "cacheLife" cuando se use Cache Components;
- tags de invalidación mediante "cacheTag";
- si una mutación requiere "updateTag" para read-your-own-writes o "revalidateTag" para stale-while-revalidate;
- cuándo "revalidatePath" es preferible por no existir una etiqueta suficientemente precisa;
- qué datos deben quedar fuera de la caché por depender de cookies, headers, sesión o permisos;
- qué lecturas pueden ejecutarse en paralelo y dónde conviene usar "Suspense" o "loading.tsx" para streaming.

No mezcles el modelo de Cache Components con configuraciones antiguas como "dynamic", "revalidate" o "fetchCache" sin explicar la compatibilidad y la versión. No actives caché globalmente por defecto, no caches datos personalizados sin revisar la clave y la autorización, no expongas credenciales al cliente y no inventes consultas, tablas ni contratos de API. No ejecutes acciones remotas ni modifiques una base de datos real.

Si faltan requisitos para decidir la política, no elijas una duración arbitraria: crea una tabla de decisiones pendientes y propone el dato concreto que debe aportar el equipo.

Entrega:

1. modelo de caché recomendado y motivo;
2. matriz de operaciones con fuente, entorno de ejecución, frescura, caché e invalidación;
3. resumen de los archivos creados o modificados y de los cambios realizados;
4. riesgos de datos obsoletos, filtración entre usuarios, waterfalls y sobre-invalidación;
5. estrategia de streaming, loading y manejo de errores;
6. comandos y casos de prueba para verificar lecturas, mutaciones y revalidación;
7. cuestiones pendientes y decisiones que deba tomar el equipo.

Después verifica TypeScript, lint y build. Si existe una fuente de datos local, ejecuta únicamente pruebas sintéticas y no uses credenciales ni datos reales.`,
    language: "es",
    module: "software-development",
    category: "software-architecture",
    subcategories: ["architecture-decisions"],
    tags: ["nextjs", "checklist", "analysis"],
    useCases: [
      "Decidir cómo obtener y cachear datos en una aplicación Next.js",
      "Evitar mezclar el modelo antiguo de caché con Cache Components",
      "Diseñar la invalidación después de mutaciones y Server Functions",
    ],
    notes:
      "Debe ejecutarse cuando las fuentes de datos y operaciones principales estén definidas; no activa Cache Components ni inventa una política sin requisitos de frescura.",
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
  },

  {
    id: "audit-nextjs-production-readiness",
    slug: "auditar-preparacion-nextjs-produccion",
    title: "Preparar Next.js para producción",
    description:
      "Audita si un proyecto Next.js nuevo está preparado para llegar a producción y recomienda acciones priorizadas sin modificar el repositorio ni desplegarlo.",
    content: `Actúa como un arquitecto de plataforma y fiabilidad especializado en Next.js.

Este proyecto nuevo ya ha sido creado con "create-next-app". Audita su preparación para producción y recomienda las acciones necesarias, pero no modifiques archivos, no instales dependencias y no realices despliegues. Antes de actuar, consulta la documentación oficial actual:

- https://nextjs.org/docs/app/api-reference/cli/next
- https://nextjs.org/docs/app/guides/self-hosting
- https://nextjs.org/docs/app/guides/deploying-to-platforms
- https://nextjs.org/docs/app/guides/environment-variables
- https://nextjs.org/docs/app/guides/instrumentation
- https://nextjs.org/docs/app/api-reference/config/next-config-js/output

Contexto de la aplicación:
{{application}}

Plataforma y estrategia de despliegue prevista:
{{deployment}}

Entornos, variables y diferencias entre build-time y runtime:
{{environment}}

Rutas y flujos críticos:
{{criticalFlows}}

Logging, métricas, errores e instrumentación disponibles:
{{observability}}

Restricciones operativas, seguridad, disponibilidad y rollback:
{{constraints}}

Inspecciona, sin sobrescribir cambios existentes:

- versión de Node.js, Next.js, React y package manager;
- "package.json", lockfiles y scripts disponibles;
- TypeScript, ESLint, tests y comandos de build;
- "next.config.*", la opción "output", adaptadores y configuración de runtime;
- estructura "app" o "src/app", Server y Client Components, streaming y rutas críticas;
- imágenes, fuentes, assets, metadata, "robots.txt", "sitemap.xml" y dominio canónico;
- archivos de entorno, variables públicas y privadas, y valores necesarios durante build o runtime;
- caché, revalidación, Server Functions, Route Handlers y Proxy cuando afecten al despliegue;
- manejo de errores, logs, "instrumentation.ts", smoke tests y CI existente;
- requisitos de rollback, health checks, migraciones o coordinación operativa que estén documentados.

Evalúa como mínimo:

1. reproducibilidad y compatibilidad del build;
2. existencia y coherencia de los comandos "next build" y "next start";
3. compatibilidad entre la modalidad de despliegue y las capacidades utilizadas;
4. separación de secretos, variables públicas y configuración de build/runtime;
5. rendimiento de imágenes, bundles, streaming, caché y rutas críticas;
6. seguridad de headers, cookies, dominios, assets y superficies expuestas;
7. manejo de errores, logging, instrumentation y capacidad de diagnóstico;
8. smoke tests, rollback, health checks y comprobaciones posteriores;
9. riesgos específicos de self-hosting, reverse proxy o múltiples instancias cuando correspondan.

Entrega uno de estos veredictos:

- preparado;
- preparado con condiciones;
- no preparado.

Justifica el veredicto con evidencias observadas. Distingue hechos, supuestos, riesgos y recomendaciones. Si faltan requisitos de tráfico, disponibilidad, seguridad o plataforma, no inventes métricas ni SLA: indica la decisión pendiente y el dato concreto que debe aportar el equipo.

Entrega:

1. veredicto y resumen ejecutivo;
2. matriz por área con estado, evidencia, impacto y acción recomendada;
3. comandos locales no destructivos para verificar el proyecto;
4. diferencias entre configuración de build-time y runtime;
5. riesgos de seguridad, rendimiento, disponibilidad y operación;
6. requisitos pendientes del despliegue;
7. plan priorizado antes del primer despliegue;
8. comprobaciones y smoke tests posteriores al despliegue.

No modifiques "package.json", "next.config.*", Docker, CI ni archivos de entorno. No instales paquetes, no uses credenciales reales, no accedas a servicios externos y no despliegues la aplicación. No diseñes un pipeline completo de CI/CD, no sustituyas una checklist de release, no configures un proveedor de observabilidad y no redefinas la estrategia detallada de fetching, caché o revalidación. No conviertas la auditoría en una lista genérica: relaciona cada recomendación con evidencia del proyecto o marca la información como pendiente.

Puedes ejecutar únicamente comprobaciones locales ya disponibles y seguras, como inspección de versiones, lint, typecheck, tests, "next build" o una ejecución controlada de "next start" si el contexto lo permite. No borres artefactos ni cambies la configuración para hacer pasar una comprobación.`,
    language: "es",
    module: "software-development",
    category: "delivery-and-deployment",
    subcategories: ["deployments"],
    tags: ["nextjs", "analysis", "checklist"],
    useCases: [
      "Auditar si un proyecto Next.js nuevo está listo para producción",
      "Detectar riesgos de build, runtime, seguridad y operación antes del primer despliegue",
      "Preparar un plan de readiness sin modificar el repositorio",
    ],
    notes:
      "Este prompt audita y recomienda; no configura el despliegue, no instala dependencias y no sustituye una checklist de release ni un diseño de CI/CD.",
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
  },
];
