import type { Prompt } from "../../types";

export const dataAndSupabasePrompts: Prompt[] = [
  {
    id: "optimize-sql-query",
    slug: "optimize-sql-query",
    title: "Optimize a slow SQL query",
    description:
      "Systematic optimization of a slow SQL query: execution plan analysis, index recommendations, rewrite options and verification of the improvement.",
    content: `You are a database performance expert specialized in {{database}}.

I have a slow SQL query. Help me make it fast, with evidence.

The query:
{{code}}

Schema (tables, columns, existing indexes):
{{schema}}

Context: data volumes, current execution time, target time, how often it runs:
{{context}}

Work through these steps:

1. Explain what the query does in plain language and what result shape it returns.
2. Ask me for (or reason about) the execution plan: EXPLAIN (ANALYZE, BUFFERS) output. Point out the expensive nodes: sequential scans on large tables, nested loops with high row estimates, sorts spilling to disk, misestimated cardinalities.
3. Diagnose the root cause(s): missing index, wrong index column order, non-sargable predicates, unnecessary joins, functions on indexed columns, implicit casts, over-fetching columns.
4. Propose fixes in order of preference:
   a. Index changes (exact CREATE INDEX statements, with the read/write trade-off of each new index).
   b. Query rewrite (show the rewritten query and explain why the planner handles it better).
   c. Schema or application-level changes only if a and b are not enough.
5. Verification: how to measure the improvement safely (staging with realistic data volume, EXPLAIN comparison before/after, regression risk for other queries using the same tables).

Show me the optimized query and the expected plan change. If you need information I have not provided, list the exact queries or commands I should run to get it.`,
    language: "en",
    module: "software-development",
    category: "data",
    subcategories: ["query-performance"],
    tags: ["sql", "postgresql"],
    useCases: [
      "Fixing a query that times out in production",
      "Reviewing the slowest queries from a monitoring report",
      "Learning to read execution plans with a real example",
    ],
    notes:
      "Paste the real EXPLAIN (ANALYZE, BUFFERS) output whenever possible: optimization without a plan is guesswork.",
    createdAt: "2025-12-10",
    updatedAt: "2026-03-08",
  },

  {
    id: "setup-supabase-local-project",
    slug: "configurar-supabase-local-desde-cero",
    title: "Configurar Supabase local desde cero",
    description:
      "Plan breve y adaptado al repositorio para preparar y arrancar Supabase local desde cero.",
    content: `Actúa como un ingeniero experto en desarrollo local.

Configura y arranca Supabase local desde cero en este repositorio. Antes de actuar, consulta la documentación oficial actual:

- https://supabase.com/docs/guides/local-development.md
- https://supabase.com/docs/guides/local-development/cli/getting-started.md
- https://supabase.com/docs/guides/local-development/cli-workflows.md

Inspecciona el repositorio y adapta la solución al framework, package manager y convenciones existentes.

Realiza únicamente estas tareas:

- comprueba que exista un runtime compatible con Docker;
- instala la CLI como dependencia de desarrollo si falta;
- inicializa \`supabase/\`;
- arranca el stack local y muestra cómo comprobar su estado.

No añadas todavía scripts de \`package.json\`, esquema, migraciones, seed, tipos ni variables de entorno. No ejecutes acciones remotas como \`login\`, \`link\` o \`db push\`. No sobrescribas cambios existentes.

Entrega:

1. decisiones tomadas;
2. resumen de los cambios realizados y archivos afectados;
3. comandos para verificar el setup;
4. cuestiones pendientes o decisiones que deba tomar.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["local-environment"],
    tags: ["supabase", "docker", "checklist"],
    useCases: [
      "Preparar Supabase local al comenzar un proyecto nuevo",
      "Adaptar el setup de Supabase a un repositorio existente",
      "Estandarizar el onboarding local de un equipo",
    ],
    notes:
      "El prompt cubre únicamente el arranque local; los scripts, la configuración de datos y la verificación avanzada se tratan en prompts separados.",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-14",
  },

  {
    id: "add-supabase-package-scripts",
    slug: "anadir-scripts-de-supabase-al-package-json",
    title: "Añadir scripts de Supabase al package.json",
    description:
      "Añade comandos npm claros y seguros para manejar el entorno local de Supabase y las tareas habituales del proyecto.",
    content: `Actúa como un ingeniero de desarrollo local.

Quiero añadir scripts de Supabase al \`package.json\` de este repositorio. Consulta la documentación oficial actual antes de proponer cambios:

- https://supabase.com/docs/guides/local-development/cli/getting-started.md
- https://supabase.com/docs/guides/local-development/cli-workflows.md

Inspecciona el package manager, los scripts existentes y si la CLI está instalada localmente.

Incluye como mínimo scripts para:

- iniciar Supabase;
- consultar su estado;
- detenerlo;
- resetear la base de datos local.

Propón solo otros scripts claramente útiles para este proyecto, por ejemplo para crear migraciones, generar tipos, ejecutar lint o lanzar tests. Conserva los scripts existentes y marca explícitamente cualquier comando destructivo.

Explica los cambios realizados en \`package.json\`, justifica brevemente cada script y muestra los comandos de uso con sus argumentos cuando corresponda.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["local-environment"],
    tags: ["supabase", "checklist", "template"],
    useCases: [
      "Estandarizar los comandos locales de Supabase en un proyecto",
      "Facilitar el onboarding de nuevos colaboradores",
      "Evitar comandos largos o inconsistentes durante el desarrollo",
    ],
    notes:
      "El script de reset debe mantenerse explícito porque elimina y reconstruye la base de datos local.",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-14",
  },

  {
    id: "configure-supabase-environment-secrets",
    slug: "configurar-variables-entorno-secretos-supabase",
    title: "Configurar variables de entorno y secretos de Supabase",
    description:
      "Organiza la configuración local de Supabase y separa las variables públicas de los secretos sin exponer credenciales.",
    content: `Actúa como un ingeniero experto en configuración segura de aplicaciones.

Configura las variables de entorno y los secretos de Supabase en este repositorio. Antes de actuar, consulta la documentación oficial actual:

- https://supabase.com/docs/guides/local-development/managing-config.md
- https://supabase.com/docs/guides/local-development/cli-workflows.md

Inspecciona el framework, los archivos de entorno existentes, el \`.gitignore\`, \`supabase/config.toml\` y cómo la aplicación lee sus variables.

Realiza solo los cambios necesarios para:

- crear o actualizar un archivo de ejemplo sin valores secretos;
- excluir del control de versiones los archivos de entorno locales;
- configurar la URL local y la clave pública de Supabase según las convenciones del proyecto;
- mantener cualquier clave secreta o de administración únicamente en el servidor;
- usar referencias \`env(...)\` en \`config.toml\` cuando la configuración local necesite secretos.

No inventes credenciales, no expongas secretos al cliente y no ejecutes acciones remotas. Conserva la configuración existente y señala cualquier variable cuyo origen o ámbito no esté claro.

Entrega:

1. resumen de los cambios realizados y archivos afectados;
2. una tabla de variables con nombre, ámbito y archivo donde deben definirse;
3. los pasos para completar la configuración local sin compartir secretos.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["local-environment"],
    tags: ["supabase", "checklist", "template"],
    useCases: [
      "Preparar las variables de entorno al configurar Supabase local",
      "Revisar si una clave de Supabase puede llegar al cliente",
      "Documentar la configuración necesaria para nuevos colaboradores",
    ],
    notes:
      "El prompt no crea credenciales reales: genera configuración segura y deja al desarrollador completar los valores locales.",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-14",
  },

  {
    id: "create-supabase-seed-data",
    slug: "crear-datos-seed-para-desarrollo-supabase",
    title: "Crear datos seed para desarrollo con Supabase",
    description:
      "Prepara datos sintéticos, deterministas y reproducibles para desarrollar y probar una aplicación Supabase en local.",
    content: `Actúa como un ingeniero experto en PostgreSQL y Supabase.

Crea los datos seed para el entorno local de este proyecto. Antes de actuar, consulta:

- https://supabase.com/docs/guides/local-development/seeding-your-database.md
- https://supabase.com/docs/guides/local-development/cli-workflows.md

Inspecciona \`supabase/schemas/\`, \`supabase/migrations/\`, \`supabase/config.toml\` y cualquier seed existente.

Requisitos de los datos:
{{requirements}}

Escenarios que deben poder probarse:
{{scenarios}}

Crea o actualiza \`supabase/seed.sql\`. Si el volumen lo justifica, divide los datos en varios archivos y configura su orden en \`config.toml\`.

Sigue estas reglas:

- utiliza únicamente datos sintéticos;
- respeta el orden de las relaciones y las claves foráneas;
- usa identificadores y fechas deterministas cuando facilite las pruebas;
- incluye usuarios o roles de prueba solo cuando sean necesarios;
- distingue entre usuarios de Auth de referencia y usuarios capaces de iniciar sesión;
- no incluyas contraseñas, secretos, datos reales ni información personal;
- incluye únicamente datos, no definiciones de esquema ni migraciones;
- no ejecutes acciones remotas.

Si no existe todavía un esquema compatible, no inventes tablas: explica qué debe completarse antes de crear el seed.

Entrega:

1. resumen de los cambios realizados y archivos afectados;
2. escenarios cubiertos por los datos;
3. comando para reconstruir el entorno local;
4. supuestos, limitaciones y datos que falten.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["database"],
    tags: ["supabase", "postgresql", "sql", "checklist"],
    useCases: [
      "Preparar datos de prueba al comenzar un proyecto Supabase",
      "Crear un entorno local reproducible para todo el equipo",
      "Cubrir escenarios de desarrollo sin utilizar datos reales",
    ],
    notes:
      "El prompt trata el seed como datos posteriores al esquema y las migraciones; los usuarios capaces de iniciar sesión requieren un flujo específico de Auth.",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-14",
  },

  {
    id: "recommend-shadcn-preset",
    slug: "recomendar-preset-visual-shadcn",
    title: "Recomendar un preset visual de shadcn/create",
    description:
      "Compara presets visuales de shadcn/create y recomienda una configuración para probar antes de inicializar una web app.",
    content: `Actúa como un diseñador de sistemas UI especializado en shadcn/ui.

Quiero elegir un preset visual en https://ui.shadcn.com/create antes de configurar shadcn en este proyecto. Consulta la documentación oficial actual:

- https://ui.shadcn.com/docs.md
- https://ui.shadcn.com/docs/theming.md
- https://ui.shadcn.com/docs/installation.md

Contexto del producto:
{{product}}

Público objetivo y tono de marca:
{{audience}}

Tipo de aplicación y densidad de información:
{{application}}

Framework y package manager:
{{stack}}

Propón tres presets visuales para probar en shadcn/create. Para cada uno indica:

- estilo;
- color base y tema;
- tipografías;
- iconos;
- radio de bordes;
- configuración de dark mode;
- ventajas y riesgos para este producto.

Recomienda uno para probar primero y explica qué decisiones deberíamos comparar visualmente en la herramienta.

No modifiques todavía el repositorio ni inventes un comando de setup. El objetivo es obtener una configuración visual concreta para probarla en shadcn/create. Cuando se elija un preset, indica qué información necesitas para generar el comando final de instalación.

Entrega:

1. resumen de los tres presets propuestos;
2. recomendación principal y motivo;
3. lista de decisiones que deben probarse visualmente;
4. información pendiente para generar el setup final.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["frontend-and-components"],
    tags: ["shadcn", "checklist", "analysis"],
    useCases: [
      "Elegir la dirección visual de una web app nueva",
      "Comparar presets de shadcn/create antes de inicializar el proyecto",
      "Traducir requisitos de marca y producto a decisiones de UI",
    ],
    notes:
      "Este prompt decide qué preset probar; la instalación y la configuración detallada del tema deben hacerse en prompts posteriores.",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-14",
  },

  {
    id: "configure-shadcn-theme",
    slug: "configurar-tema-shadcn-ui",
    title: "Configurar el tema de shadcn/ui",
    description:
      "Configura un sistema de tema coherente para shadcn/ui mediante tokens semánticos, variables CSS y modos claro y oscuro.",
    content: `Actúa como un diseñador de sistemas UI especializado en shadcn/ui.

Configura el tema de shadcn/ui en este repositorio. Antes de actuar, consulta la documentación oficial actual:

- https://ui.shadcn.com/docs/theming.md
- https://ui.shadcn.com/docs/components-json.md
- https://ui.shadcn.com/docs/dark-mode.md

Inspecciona \`components.json\`, los archivos CSS globales, la configuración de Tailwind, los aliases y cualquier proveedor de tema existente.

Dirección visual elegida:
{{visualDirection}}

Requisitos de marca y producto:
{{brand}}

Requisitos de light mode, dark mode y accesibilidad:
{{requirements}}

Configura, cuando corresponda:

- tokens semánticos para superficies, texto, acciones, estados, bordes y focus;
- valores para \`:root\` y \`.dark\`;
- tipografía, escala de radius y colores de gráficos;
- integración con \`components.json\` y las variables CSS de Tailwind;
- dark mode sin duplicar estilos ni romper componentes existentes.

Conserva las convenciones actuales y no cambies \`cssVariables\`, el estilo base o el color base sin explicar el impacto y la posible necesidad de reinstalar componentes. No rediseñes componentes concretos ni inventes una identidad visual sin basarte en el contexto proporcionado.

Entrega:

1. resumen de los cambios realizados y archivos afectados;
2. tabla de tokens definidos o modificados;
3. comprobaciones visuales y técnicas que deben ejecutarse;
4. decisiones pendientes y riesgos de compatibilidad.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["frontend-and-components"],
    tags: ["shadcn", "checklist", "analysis"],
    useCases: [
      "Aplicar un preset visual de shadcn a una web app",
      "Configurar una identidad visual con light mode y dark mode",
      "Detectar inconsistencias entre tokens, CSS y components.json",
    ],
    notes:
      "Debe ejecutarse después de elegir el preset visual y antes de realizar una personalización extensa de componentes.",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-14",
  },

  {
    id: "install-shadcn-core-components",
    slug: "configurar-componentes-core-shadcn-ui",
    title: "Configurar componentes core de shadcn/ui",
    description:
      "Selecciona e instala un conjunto mínimo de componentes reutilizables de shadcn/ui, adaptado a las necesidades reales de la aplicación.",
    content: `Actúa como un arquitecto frontend experto en shadcn/ui.

Selecciona e instala los componentes esenciales de shadcn/ui para esta web app. Antes de actuar, consulta la documentación oficial actual:

- https://ui.shadcn.com/docs/components.md
- https://ui.shadcn.com/docs/cli.md

Inspecciona el framework, el package manager, components.json, los componentes ya instalados y la estructura del proyecto.

Contexto de la aplicación:
{{application}}

Pantallas y funcionalidades principales:
{{features}}

Usuarios y principales interacciones:
{{users}}

Instala como core universal únicamente estos componentes, salvo que ya existan:

- button, card, input, label y textarea;
- badge, alert, dialog y dropdown-menu;
- separator, skeleton y tooltip.

Añade componentes condicionales solo si el contexto los justifica, por ejemplo:

- formularios: field, select, combobox, checkbox, radio-group o switch;
- navegación: sidebar, breadcrumb, tabs o sheet;
- datos: table, pagination o empty.

No uses --all, no sobrescribas componentes personalizados y no instales componentes especializados sin una necesidad clara. Usa la CLI de shadcn/ui y conserva las convenciones del repositorio.

Después verifica imports, TypeScript, lint y build.

Entrega:

1. resumen de los cambios realizados y archivos afectados;
2. componentes instalados y motivo de cada uno;
3. componentes descartados o aplazados y motivo;
4. comprobaciones realizadas y cuestiones pendientes.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["frontend-and-components"],
    tags: ["shadcn", "checklist", "analysis"],
    useCases: [
      "Preparar la base de componentes de una web app nueva",
      "Evitar instalar componentes de shadcn/ui sin una necesidad clara",
      "Adaptar la selección de componentes al tipo de aplicación",
    ],
    notes:
      "El core es intencionadamente mínimo; los componentes de formularios, navegación y datos se añaden según las funcionalidades del proyecto.",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-14",
  },

  {
    id: "create-shadcn-component-gallery",
    slug: "crear-galeria-componentes-shadcn-ui",
    title: "Crear una galería interna de componentes shadcn/ui",
    description:
      "Crea una ruta de desarrollo para visualizar e interactuar con los componentes instalados de shadcn/ui usando ejemplos y estados locales.",
    content: `Actúa como un ingeniero frontend especializado en shadcn/ui y sistemas de diseño.

Crea una galería interna de componentes shadcn/ui en este repositorio. Antes de actuar, consulta la documentación oficial actual:

- https://ui.shadcn.com/docs/components.md
- https://ui.shadcn.com/docs/installation.md

Inspecciona el framework y router, la estructura de rutas, el tema, los componentes instalados y cualquier galería o Storybook existente.

Contexto de la aplicación:
{{application}}

Componentes que deben mostrarse:
{{components}}

Crea una ruta de desarrollo, siguiendo las convenciones del proyecto, para mostrar los componentes instalados agrupados como mínimo en:

- fundamentos;
- formularios;
- feedback y overlays;
- navegación;
- tablas y visualización de datos.

Para cada componente relevante incluye ejemplos interactivos y, cuando corresponda, estados de loading, disabled, error, empty, focus, dark mode y responsive. Usa datos locales y sintéticos. No conectes la galería con Supabase, APIs ni datos reales.

Por defecto, la ruta debe estar disponible solo durante el desarrollo o quedar protegida mediante el mecanismo de acceso ya existente. No inventes un sistema de autenticación nuevo. Si el proyecto ya usa Storybook u otra herramienta equivalente, amplía esa solución en lugar de duplicarla.

Reutiliza los componentes existentes, no copies su implementación dentro de la galería y no instales componentes adicionales salvo que sean necesarios y estén justificados.

Después verifica navegación, interacción por teclado, light mode, dark mode, responsive, TypeScript, lint y build.

Entrega:

1. resumen de los cambios realizados y archivos afectados;
2. ruta y categorías disponibles;
3. componentes y estados demostrados;
4. estrategia usada para limitar el acceso en producción;
5. comprobaciones realizadas y cuestiones pendientes.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["frontend-and-components"],
    tags: ["shadcn", "checklist", "analysis"],
    useCases: [
      "Validar visualmente los componentes tras configurar shadcn/ui",
      "Crear una referencia interna para diseñadores y desarrolladores",
      "Probar estados y variantes antes de usarlos en pantallas reales",
    ],
    notes:
      "La galería es una herramienta de desarrollo y validación; no sustituye a Storybook cuando se necesitan pruebas visuales, documentación publicada o integración avanzada con un design system.",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-14",
  },

  {
    id: "evaluate-configure-storybook",
    slug: "evaluar-configurar-storybook-web-app",
    title: "Evaluar y configurar Storybook para una web app",
    description:
      "Decide si Storybook aporta valor al proyecto y, si procede, lo configura para documentar y probar componentes de forma aislada.",
    content: `Actúa como un arquitecto frontend especializado en sistemas de diseño y calidad de UI.

Evalúa si conviene configurar Storybook en este repositorio y hazlo solo si aporta valor claro. Antes de actuar, consulta la documentación oficial actual:

- https://storybook.js.org/docs.md
- https://storybook.js.org/docs/get-started/install.md
- https://storybook.js.org/docs/writing-docs/index.md
- https://storybook.js.org/docs/writing-tests/index.md

Inspecciona el framework, el package manager, los componentes existentes, la galería interna, cualquier configuración de Storybook y los scripts del proyecto.

Contexto del producto:
{{application}}

Equipo y horizonte del proyecto:
{{team}}

Componentes, design system y requisitos de calidad:
{{uiRequirements}}

Evalúa estos factores:

- número y complejidad de componentes reutilizables;
- necesidad de documentación compartida;
- pruebas de interacción, accesibilidad y regresión visual;
- existencia de un design system o intención de construirlo;
- tamaño y experiencia del equipo;
- coste de mantener stories, configuración y CI.

Entrega primero una recomendación: configurar Storybook ahora, posponerlo o no usarlo. Si recomiendas posponerlo, no modifiques el repositorio y define las condiciones que justificarían retomarlo.

Si recomiendas configurarlo:

- usa la CLI oficial y adapta la instalación al framework y package manager;
- habilita documentación, testing y accesibilidad solo cuando estén justificadas;
- crea stories iniciales para los componentes core realmente existentes;
- conserva los componentes y ejemplos personalizados del repositorio;
- no añadas Chromatic, servicios externos ni regresión visual en la nube sin pedirlo explícitamente;
- no dupliques una solución de Storybook ya existente.

Mantén la galería interna si ayuda a validar la integración real con el layout, los providers y la navegación. Storybook debe cubrir el desarrollo y la documentación aislada, no sustituir necesariamente esa galería.

Verifica la ejecución local, la generación de documentación, las stories, TypeScript, lint y build según los scripts disponibles.

Entrega:

1. recomendación y criterios utilizados;
2. resumen de los cambios realizados y archivos afectados;
3. capacidades de Storybook configuradas y stories creadas;
4. relación entre Storybook y la galería interna;
5. comprobaciones realizadas, costes asumidos y cuestiones pendientes.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["frontend-and-components"],
    tags: ["storybook", "checklist", "analysis"],
    useCases: [
      "Decidir si una web app necesita Storybook desde el inicio",
      "Configurar documentación y testing de componentes reutilizables",
      "Separar la validación aislada de componentes de la integración en la aplicación",
    ],
    notes:
      "Storybook no debe instalarse automáticamente en proyectos pequeños; su valor aumenta cuando crecen los componentes reutilizables, el equipo o las necesidades de calidad visual.",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-14",
  },

  {
    id: "write-git-commit-messages",
    slug: "escribir-mensajes-de-commit",
    title: "Escribir mensajes de commit útiles",
    description:
      "Generación de mensajes de commit claros siguiendo Conventional Commits a partir de un diff, con énfasis en explicar el porqué del cambio.",
    content: `Actúa como un ingeniero de software que escribe mensajes de commit que de verdad ayudan a entender la historia del proyecto.

Voy a darte un diff. Genera el mensaje de commit.

Diff:
{{code}}

Contexto adicional (issue relacionada, motivación del cambio):
{{context}}

Sigue estas reglas:

1. Formato Conventional Commits: tipo(scope): resumen. Tipos: feat, fix, refactor, perf, test, docs, build, ci, chore. El scope es el módulo o área afectada.
2. Resumen: máximo 72 caracteres, imperativo, sin punto final. Describe QUÉ cambia, no cómo.
3. Cuerpo: explica el PORQUÉ. Qué problema resuelve, qué alternativas se descartaron y cualquier efecto colateral relevante. Escribe para alguien que revisa la historia en seis meses sin contexto.
4. Footer: referencias a issues (Refs: #123, Closes: #123) y BREAKING CHANGE si aplica, con descripción del cambio incompatible.
5. Si el diff mezcla varios cambios independientes, dilo: propón cómo dividirlo en commits atómicos y escribe el mensaje de cada uno.

Entrega el mensaje completo listo para pegar, y una justificación de una línea del tipo elegido.

Ejemplo del nivel de calidad esperado:

fix(auth): renovar el token antes de su expiración en sesiones largas

El refresco se disparaba solo al recibir un 401, lo que provocaba
errores visibles para el usuario en sesiones de más de una hora.
Ahora se programa el refresco un minuto antes de la expiración.

Closes: #412`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["version-control-and-collaboration"],
    tags: ["git", "template"],
    useCases: [
      "Escribir el mensaje de un commit complejo",
      "Dividir un commit grande en commits atómicos bien descritos",
      "Preparar los mensajes antes de hacer squash de una rama",
    ],
    createdAt: "2025-09-05",
    updatedAt: "2026-01-25",
  },

  {
    id: "create-contributing-guide",
    slug: "crear-guia-contributing",
    title: "Crear una guía CONTRIBUTING.md",
    description:
      "Analiza el repositorio y propone una guía CONTRIBUTING.md clara para preparar el entorno y colaborar con seguridad.",
    content: `Actúa como un responsable de onboarding y colaboración técnica.

Necesito crear o mejorar la guía \`CONTRIBUTING.md\` de este repositorio. No modifiques directamente ningún archivo: primero inspecciona el proyecto y propón el contenido exacto y las decisiones necesarias.

Inspecciona, cuando existan:

- README y otra documentación de entrada;
- package manager, dependencias y scripts;
- versiones de runtime y herramientas necesarias;
- archivos de variables de entorno y configuración local;
- comandos de desarrollo, lint, typecheck, tests y build;
- configuración de CI;
- convenciones visibles de ramas, commits y pull requests;
- instrucciones específicas para migraciones, datos seed o servicios locales.

Contexto adicional del equipo o del proyecto:
{{context}}

Diseña la guía con esta estructura:

1. propósito y audiencia;
2. requisitos previos y versiones;
3. preparación del entorno local;
4. comandos habituales con su resultado esperado;
5. flujo para crear una rama, implementar un cambio y abrir un pull request;
6. convenciones que ya existen y convenciones que todavía deben decidirse;
7. problemas frecuentes y cómo diagnosticarlos;
8. checklist final para confirmar que una contribución está lista.

No inventes comandos, scripts, servicios ni políticas que no puedas justificar con el repositorio. Distingue entre hechos observados, recomendaciones y decisiones pendientes. Si la información actual es contradictoria o está incompleta, señala exactamente qué debe confirmarse antes de publicar la guía.

Entrega:

1. diagnóstico de la documentación actual;
2. estructura propuesta para \`CONTRIBUTING.md\`;
3. contenido completo listo para revisar y copiar;
4. decisiones pendientes y supuestos;
5. checklist para validar la guía con una persona que no conozca el repositorio.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["onboarding-and-conventions"],
    tags: ["template", "checklist", "git"],
    useCases: [
      "Documentar cómo empezar a contribuir a un repositorio nuevo",
      "Actualizar una guía de contribución que ya no refleja el proyecto",
      "Reducir preguntas repetitivas durante la incorporación de colaboradores",
    ],
    notes:
      "El prompt genera una propuesta basada en el repositorio; una persona del equipo debe revisar las convenciones antes de publicarla como norma.",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-14",
  },

  {
    id: "prepare-project-onboarding-checklist",
    slug: "preparar-checklist-onboarding-proyecto",
    title: "Preparar una checklist de onboarding",
    description:
      "Convierte la preparación de un proyecto en una checklist verificable para que una persona nueva pueda empezar a contribuir.",
    content: `Actúa como una persona responsable de developer experience.

Prepara una checklist de onboarding para este proyecto. Inspecciona el repositorio y propone los pasos exactos, pero no modifiques archivos ni ejecutes acciones destructivas.

Contexto del proyecto y del rol de la persona que se incorpora:
{{context}}

Comprueba y documenta:

- sistema operativo, runtime, package manager y herramientas necesarias;
- instalación de dependencias;
- configuración de variables de entorno y secretos locales sin exponer valores;
- servicios externos o locales que haya que arrancar;
- comando para ejecutar la aplicación;
- lint, typecheck, tests y build;
- estructura básica del repositorio y puntos de entrada importantes;
- dónde encontrar documentación, decisiones técnicas y tareas pendientes;
- cómo crear un primer cambio pequeño y abrir un pull request.

Organiza la salida por fases:

1. antes de clonar o instalar;
2. preparar la máquina;
3. arrancar el proyecto;
4. comprobar que todo funciona;
5. entender la estructura y las convenciones;
6. realizar la primera contribución.

Para cada paso incluye:

- acción concreta;
- comando, archivo o URL cuando corresponda;
- resultado esperado;
- criterio de completado;
- bloqueo frecuente y cómo resolverlo.

No inventes requisitos que no aparezcan en el repositorio o en el contexto. Marca como "por confirmar" cualquier paso que dependa de credenciales, permisos o servicios no documentados.

Entrega también una versión resumida de una página que pueda seguir una persona nueva sin acompañamiento y una lista de mejoras recomendadas para hacer el onboarding más reproducible.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["onboarding-and-conventions"],
    tags: ["checklist", "template"],
    useCases: [
      "Preparar la llegada de una persona nueva al equipo",
      "Detectar pasos de instalación que solo conoce el equipo actual",
      "Convertir un onboarding informal en un proceso repetible",
    ],
    notes:
      "La checklist debe basarse en el repositorio real y señalar cualquier requisito que necesite acceso o confirmación del equipo.",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-14",
  },

  {
    id: "define-branch-and-commit-conventions",
    slug: "definir-convenciones-ramas-y-commits",
    title: "Definir convenciones de ramas y commits",
    description:
      "Analiza el historial de Git y propone convenciones pragmáticas para ramas, commits, squash, merge y rebase.",
    content: `Actúa como un responsable de colaboración técnica con experiencia en Git.

Necesito definir o revisar las convenciones de ramas y commits de este proyecto. Inspecciona el historial y la configuración disponible, pero no reescribas commits ni modifiques ramas.

Información del repositorio o salida de comandos Git:
{{repository}}

Contexto del equipo, tamaño, frecuencia de despliegue y flujo de revisión:
{{context}}

Analiza, cuando esté disponible:

- nombres y patrones de ramas existentes;
- mensajes de commit recientes;
- ramas protegidas y reglas de pull request;
- relación entre issues, ramas, commits y releases;
- uso actual de merge, squash o rebase;
- automatizaciones de CI relacionadas con ramas o commits.

Propón una política concreta que cubra:

1. nombres de ramas y prefijos recomendados;
2. estructura y nivel de detalle de los mensajes de commit;
3. cuándo usar squash, merge o rebase;
4. cómo enlazar issues y pull requests;
5. qué debe comprobarse antes de integrar un cambio;
6. cómo aplicar la convención gradualmente sin reescribir el historial existente.

Incluye ejemplos realistas de ramas, commits y pull requests. Considera Conventional Commits como una opción, no como una obligación: recomiéndalo solo si aporta valor al versionado, changelog, automatizaciones o comunicación del proyecto.

Entrega:

1. diagnóstico de las prácticas actuales;
2. convención propuesta con ejemplos válidos e inválidos;
3. política breve lista para añadir a la documentación del repositorio;
4. estrategia de adopción gradual;
5. decisiones pendientes y riesgos de la propuesta.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["onboarding-and-conventions"],
    tags: ["git", "template", "checklist"],
    useCases: [
      "Alinear las prácticas Git de un equipo nuevo",
      "Mejorar la claridad del historial sin reescribir commits antiguos",
      "Preparar una política de ramas y commits para documentarla en CONTRIBUTING.md",
    ],
    notes:
      "La propuesta debe adaptarse al tamaño y al flujo real del equipo; una convención demasiado estricta puede añadir trabajo sin mejorar la colaboración.",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-14",
  },

  {
    id: "configure-supabase-migration-workflow",
    slug: "configurar-workflow-migraciones-supabase",
    title: "Elegir y configurar el workflow de migraciones de Supabase",
    description:
      "Define la fuente de verdad del esquema y establece un flujo reproducible para generar, revisar y aplicar migraciones de Supabase.",
    content: `Actúa como un ingeniero experto en PostgreSQL y Supabase.

Define y configura el workflow de migraciones de este repositorio. Antes de actuar, consulta la documentación oficial actual:

- https://supabase.com/docs/guides/local-development/declarative-database-schemas.md
- https://supabase.com/docs/guides/local-development/cli-workflows.md

Inspecciona la estructura actual de \`supabase/\`, sus migraciones, esquemas y configuración.

Si es un proyecto nuevo o todavía no tiene un workflow establecido, recomienda por defecto el enfoque declarativo usando \`supabase/schemas/\`. Solo recomienda migraciones imperativas si existe una razón concreta.

Define:

- la fuente de verdad del esquema;
- la estructura de carpetas;
- el flujo para crear cambios y generar migraciones;
- cómo revisar y aplicar las migraciones localmente;
- qué cambios requieren migraciones SQL manuales;
- qué archivos deben versionarse.

No diseñes tablas ni políticas RLS. No mezcles ambos enfoques ni ejecutes acciones remotas como \`login\`, \`link\` o \`db push\`.

Entrega:

1. enfoque recomendado y motivo;
2. resumen de los cambios realizados y archivos afectados;
3. comandos del workflow diario;
4. excepciones y precauciones importantes.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["database"],
    tags: ["supabase", "postgresql", "migration", "checklist"],
    useCases: [
      "Establecer un workflow de base de datos en un proyecto nuevo",
      "Decidir entre esquemas declarativos y migraciones imperativas",
      "Evitar cambios de esquema fuera de la fuente de verdad versionada",
    ],
    notes:
      "Para proyectos nuevos recomienda el enfoque declarativo; los cambios de datos y ciertas excepciones deben tratarse mediante migraciones SQL explícitas.",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-14",
  },

  {
    id: "design-supabase-schema-rls",
    slug: "disenar-esquema-inicial-y-rls-supabase",
    title: "Diseñar el esquema inicial y las políticas RLS de Supabase",
    description:
      "Convierte los requisitos del dominio y las reglas de acceso en un esquema declarativo de Supabase con RLS explícito y verificable.",
    content: `Actúa como un arquitecto de bases de datos PostgreSQL experto en Supabase.

Diseña el esquema inicial y las políticas Row Level Security (RLS) para este proyecto. Consulta la documentación oficial actual:

- https://supabase.com/docs/guides/local-development/declarative-database-schemas.md
- https://supabase.com/docs/guides/database/postgres/row-level-security.md

Requisitos del dominio:
{{requirements}}

Usuarios, roles y reglas de acceso:
{{access}}

Contexto técnico y restricciones:
{{context}}

Genera una propuesta para \`supabase/schemas/\` que incluya:

- tablas, columnas, tipos, relaciones y restricciones;
- índices justificados;
- RLS activado en las tablas expuestas;
- políticas explícitas de \`select\`, \`insert\`, \`update\` y \`delete\` cuando correspondan;
- separación entre \`anon\`, \`authenticated\` y cualquier rol administrativo;
- casos permitidos y denegados que deberían probarse.

No generes migraciones, seed data ni configuración remota. No inventes reglas de negocio: señala las ambigüedades y propone decisiones provisionales.

Entrega:

1. decisiones y supuestos;
2. resumen de los archivos SQL creados o modificados y su propósito;
3. matriz de permisos por rol y tabla;
4. riesgos de seguridad y casos de prueba RLS.`,
    language: "es",
    module: "software-development",
    category: "project-setup-and-workflow",
    subcategories: ["database"],
    tags: ["supabase", "postgresql", "sql", "checklist"],
    useCases: [
      "Diseñar la primera versión de la base de datos de una aplicación Supabase",
      "Traducir roles y reglas de negocio a políticas RLS",
      "Revisar si un esquema expuesto mediante la API está correctamente protegido",
    ],
    notes:
      "Está pensado para usarse después de definir el workflow declarativo y antes de generar la migración inicial o los datos seed.",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-14",
  },

  {
    id: "plan-database-migration",
    slug: "planificar-migracion-base-de-datos",
    title: "Planificar una migración de base de datos",
    description:
      "Planificación de una migración de esquema o de datos sin downtime: estrategia expand/contract, backfill, validación, rollback y coordinación con despliegues.",
    content: `Actúa como un ingeniero de datos/backend experto en migraciones sin downtime en {{database}}.

Necesito planificar la siguiente migración:

Cambio a realizar (esquema actual → esquema deseado, o movimiento de datos):
{{migration}}

Contexto: volumen de datos, tráfico, ventana de mantenimiento disponible (si la hay), herramienta de migraciones:
{{context}}

Diseña un plan completo:

1. Análisis del cambio: clasifica cada operación según su riesgo (segura online, bloqueante, destructiva, irreversible). En {{database}}, señala qué operaciones bloquean la tabla y sus alternativas (por ejemplo: creación concurrente de índices, añadir columna con default en dos pasos).
2. Estrategia expand/contract: si el cambio es incompatible, divide la migración en fases (expandir esquema → desplegar código que escribe en ambos → backfill → validar → desplegar código que solo lee lo nuevo → contraer esquema). Detalla qué va en cada fase y qué despliegue de código la acompaña.
3. Backfill: estrategia para rellenar datos históricos (por lotes, con pausas, durante horas valle), con estimación de duración y consulta de progreso.
4. Validación: comprobaciones antes, durante y después (conteos, muestreo de filas, checksums, comparación de resultados entre esquema viejo y nuevo).
5. Rollback: plan de vuelta atrás para cada fase, indicando hasta qué punto se puede revertir sin pérdida de datos.
6. Coordinación: orden exacto de migraciones y despliegues, y qué alarmas vigilar durante el proceso.

Entrega el plan como una secuencia numerada de pasos ejecutables, cada uno con su comando o migración concreta y su criterio de "hecho".`,
    language: "es",
    module: "software-development",
    category: "data",
    subcategories: ["database-migrations"],
    tags: ["migration", "sql", "postgresql"],
    useCases: [
      "Migrar esquema en producción sin parar el servicio",
      "Mover datos entre tablas o sistemas de forma segura",
      "Planificar un cambio destructivo (borrar columna, cambiar tipo) sin sustos",
    ],
    createdAt: "2026-01-09",
    updatedAt: "2026-03-28",
  },

];
