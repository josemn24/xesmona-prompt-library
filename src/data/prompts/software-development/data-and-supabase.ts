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
    subcategories: ["local-development"],
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
    subcategories: ["local-development"],
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
    subcategories: ["environment-configuration"],
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
    subcategories: ["supabase-seed-data"],
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
    subcategories: ["commits", "git"],
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
    subcategories: ["supabase-migrations"],
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
    subcategories: ["supabase-schema-design"],
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

