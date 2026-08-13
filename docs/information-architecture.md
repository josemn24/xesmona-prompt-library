# Arquitectura de información de la biblioteca

Estado: Arquitectura implementada — cierre de Fase 5  
Fecha: 2026-08-13

Este documento es la fuente de verdad de la arquitectura de información de la
biblioteca y de su navegación canónica.

## Estado de implementación

La arquitectura está integrada en la aplicación mediante estas rutas:

```text
/                         Inicio
/modules/[module]         Página de módulo
/modules/[module]/[category]  Página de categoría
/prompts                  Explorador global
/prompts/[slug]           Detalle de prompt
```

La estructura universal implementada es `Módulo → Categoría →
Subcategoría → Etiquetas`. Las agrupaciones `Definir`, `Diseñar y construir`
y `Validar y operar` solo organizan visualmente Desarrollo de software; no
forman parte del modelo `Prompt`, de los breadcrumbs ni de las URLs.

Los aliases de categorías antiguas se conservan exclusivamente al leer filtros
del explorador para mantener URLs compartidas. Los datos canónicos, enlaces
internos y nuevas páginas utilizan únicamente los IDs actuales.

## Decisiones generales

La arquitectura universal es:

```text
Módulo → Categoría → Subcategoría → Etiquetas
```

Las etapas no son una propiedad de los prompts ni una capa universal. Son
agrupaciones visuales opcionales que pueden organizar las categorías de un
módulo. En la primera versión solo se utilizarán en `software-development`.

Cada prompt tendrá una categoría principal única. Las relaciones secundarias
se expresarán mediante una subcategoría, una etiqueta o una relación editorial
entre contenidos. El idioma seguirá siendo un campo propio.

## Grupos de navegación de Desarrollo de software

Estos grupos son presentacionales. No forman parte del breadcrumb canónico ni
se serializan en la URL.

| Grupo | Categorías |
| --- | --- |
| Definir | Descubrimiento y alcance; Setup y forma de trabajar |
| Diseñar y construir | Arquitectura y diseño; Frontend y experiencia; Backend y APIs; Datos; Integraciones |
| Validar y operar | Calidad, seguridad y rendimiento; Entrega y despliegue; Observabilidad y operación; Mantenimiento y evolución |

## Taxonomía objetivo

### Desarrollo de software

| ID canónico | Etiqueta | Descripción |
| --- | --- | --- |
| `discovery-and-scope` | Descubrimiento y alcance | Entender el problema, definir requisitos, alcance, MVP y criterios de aceptación. |
| `project-setup-and-workflow` | Setup y forma de trabajar | Crear el proyecto, preparar el entorno y establecer el flujo de trabajo y colaboración. |
| `software-architecture` | Arquitectura y diseño | Tomar decisiones estructurales sobre el sistema, el dominio y sus atributos de calidad. |
| `frontend-and-experience` | Frontend y experiencia | Construir interfaces, interacción, estado, renderizado y experiencia de usuario. |
| `backend-and-apis` | Backend y APIs | Diseñar lógica de negocio, servicios, APIs, contratos y errores. |
| `data` | Datos | Modelar, consultar, migrar y optimizar datos persistentes. |
| `integrations` | Integraciones | Conectar el producto con servicios externos, webhooks y sistemas de terceros. |
| `quality-security-performance` | Calidad, seguridad y rendimiento | Verificar comportamiento y tratar riesgos de calidad, seguridad y rendimiento. |
| `delivery-and-deployment` | Entrega y despliegue | Automatizar, empaquetar, desplegar y revertir versiones. |
| `observability` | Observabilidad y operación | Entender y operar el sistema en producción mediante señales, alertas e incidentes. |
| `maintenance-and-evolution` | Mantenimiento y evolución | Documentar, refactorizar, modernizar y reducir deuda técnica. |

Subcategorías objetivo: `requirements-and-scope`, `project-setup`,
`local-environment`, `workflow-conventions`, `git`, `commits`,
`pull-requests`, `branching-strategies`, `conflict-resolution`,
`architecture-decisions`, `clean-architecture`, `hexagonal-architecture`,
`microservices`, `distributed-systems`, `design-patterns`,
`quality-attributes`, `c4-model`, `application-structure`, `ui-components`,
`accessibility`, `responsive-design`, `forms`, `frontend-state`,
`rendering-strategies`, `frontend-debugging`, `business-logic`,
`rest-api-design`, `api-contracts`, `api-error-model`, `authentication`,
`authorization`, `background-jobs`, `data-modeling`, `sql-queries`,
`database-migrations`, `query-performance`, `external-apis`, `webhooks`,
`third-party-services`, `unit-testing`, `integration-testing`, `e2e-testing`,
`code-review`, `static-analysis`, `debugging`, `software-security`,
`performance`, `ci-cd-pipelines`, `containers`, `infrastructure-as-code`,
`deployments`, `releases-and-rollbacks`, `incident-response`, `logs`,
`metrics`, `traces`, `alerts`, `monitoring`, `refactoring`, `legacy-code`,
`technical-documentation`, `technical-debt`.

Solo se materializarán en `src/data/subcategories.ts` las subcategorías que
tengan prompts actuales o contenido previsto. Las demás son el vocabulario
objetivo para futuras incorporaciones, no categorías vacías que deban aparecer
en la interfaz inmediatamente.

### Inteligencia artificial

| ID | Etiqueta |
| --- | --- |
| `prompt-engineering` | Diseño de prompts |
| `llm-applications` | Aplicaciones con modelos de lenguaje |
| `knowledge-and-rag` | Conocimiento y RAG |
| `agents-and-automation` | Agentes y automatización |
| `model-evaluation` | Evaluación y mejora |

### Marketing

| ID | Etiqueta |
| --- | --- |
| `audience-and-market` | Audiencia y mercado |
| `strategy-and-positioning` | Estrategia y posicionamiento |
| `content-creation` | Creación de contenido |
| `acquisition-and-distribution` | Adquisición y distribución |
| `conversion-and-retention` | Conversión y retención |
| `measurement-and-optimization` | Medición y optimización |

### Negocios

| ID | Etiqueta |
| --- | --- |
| `opportunities-and-discovery` | Oportunidades y descubrimiento |
| `strategy-and-business-model` | Estrategia y modelo de negocio |
| `validation-and-experimentation` | Validación y experimentación |
| `sales-and-growth` | Ventas y crecimiento |
| `operations-and-projects` | Operaciones y proyectos |

### Productividad

Se mantienen las seis categorías actuales porque ya son comprensibles y no
dependen de una etapa: Organización, Planificación, Investigación, Toma de
decisiones, Comunicación y Aprendizaje.

## Compatibilidad de identificadores

Los IDs canónicos nuevos son los que debe mostrar la interfaz. Los aliases se
conservarán durante la migración para interpretar enlaces compartidos antiguos.
No se cambiarán los slugs de los prompts.

| ID antiguo | ID canónico | Tratamiento |
| --- | --- | --- |
| `software-architecture` | `software-architecture` | Mantener; cambiar etiqueta a Arquitectura y diseño. |
| `frontend-development` | `frontend-and-experience` | Alias; migrar los datos al ID nuevo. |
| `backend-development` | `backend-and-apis` | Alias; migrar los datos al ID nuevo. |
| `web-development` | — | Alias de compatibilidad; redistribuir sus prompts. |
| `quality-and-testing` | `quality-security-performance` | Alias; ampliar el significado de la categoría. |
| `version-control` | `project-setup-and-workflow` | Alias; Git pasa a ser subcategoría o etiqueta. |
| `devops` | `delivery-and-deployment` | Alias; conservar Docker y despliegue como subcategorías. |
| `ci-cd` | `delivery-and-deployment` | Alias; CI/CD pasa a ser subcategoría. |
| `observability` | `observability` | Mantener; cambiar etiqueta a Observabilidad y operación. |
| `databases` | `data` | Alias; cambiar etiqueta a Datos. |
| `apis-and-integrations` | `backend-and-apis` / `integrations` | Alias de compatibilidad; redistribuir cada prompt. |
| `software-security` | `quality-security-performance` | Alias; seguridad pasa a ser subcategoría. |
| `technical-documentation` | `maintenance-and-evolution` | Alias; documentación pasa a ser subcategoría. |
| `performance` | `quality-security-performance` | Alias; rendimiento pasa a ser subcategoría. |
| `refactoring` | `maintenance-and-evolution` | Alias; refactorización pasa a ser subcategoría. |
| `prompt-engineering` | `prompt-engineering` | Mantener; cambiar etiqueta a Diseño de prompts. |
| `rag` | `knowledge-and-rag` | Alias. |
| `agents` | `agents-and-automation` | Alias. |
| `ai-automation` | `agents-and-automation` | Alias. |
| `model-evaluation` | `model-evaluation` | Mantener; cambiar etiqueta a Evaluación y mejora. |
| `content-strategy` | `content-creation` | Alias. |
| `seo` | `acquisition-and-distribution` | Alias; SEO pasa a ser subcategoría. |
| `email-marketing` | `conversion-and-retention` | Alias; email pasa a ser subcategoría. |
| `social-media` | `acquisition-and-distribution` | Alias; redes sociales pasa a ser subcategoría. |
| `copywriting` | `content-creation` | Alias; copywriting pasa a ser subcategoría. |
| `market-research` | `audience-and-market` | Alias. |
| `business-strategy` | `strategy-and-business-model` | Alias. |
| `business-analysis` | `opportunities-and-discovery` | Alias. |
| `business-models` | `strategy-and-business-model` | Alias. |
| `sales` | `sales-and-growth` | Alias. |
| `operations` | `operations-and-projects` | Alias. |
| `project-management` | `operations-and-projects` | Alias. |
| `lean-startup` | `validation-and-experimentation` | Alias; Lean Startup se conserva como etiqueta de método. |

## Catálogo de etiquetas por faceta

Las etiquetas no deben repetir una categoría o subcategoría.

| Faceta | Etiquetas actuales |
| --- | --- |
| Tecnología | `typescript`, `python`, `react`, `sql`, `postgresql`, `docker`, `api`, `rest`, `git`, `llm` |
| Objetivo | `analysis`, `debugging`, `conversion`, `migration`, `incident-response` |
| Formato | `checklist`, `template` |
| Contexto o método | `legacy-code`, `lean-startup`, `validated-learning`, `experimentation`, `mvp`, `pivot`, `growth-engine` |

Reglas de etiquetas:

- `language` permanece como campo independiente.
- `api`, `rest` y `git` siguen siendo etiquetas tecnológicas o de herramienta,
  no categorías globales.
- `analysis` se mantiene como objetivo transversal.
- `lean-startup` se mantiene como método transversal aunque los prompts tengan
  como categoría principal Validación y experimentación.
- No se añaden etiquetas nuevas en esta fase si no resuelven una ambigüedad
  real del inventario.

## Matriz de clasificación de prompts

La columna “Categorías secundarias actuales” registra las relaciones que se
revisaron y se convirtieron en subcategorías, etiquetas o relaciones
editoriales durante la migración.

| Prompt | Módulo | Categoría principal | Subcategoría principal | Categorías secundarias actuales | Etiquetas que conserva | Etiquetas nuevas | Acción necesaria | Motivo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `evaluate-prompt-quality` — Evaluar prompts de forma sistemática | IA | Evaluación y mejora | Evaluación de prompts | Prompt engineering | llm, template | — | Reclasificar | El objetivo principal es evaluar calidad. |
| `design-rag-pipeline` — Design a RAG pipeline that actually works | IA | Conocimiento y RAG | Diseño de pipeline RAG | Aplicaciones LLM | llm, python | — | Reclasificar | RAG es el problema principal. |
| `analisis-dafo` — Realizar un análisis DAFO accionable | Negocios | Oportunidades y descubrimiento | Análisis estratégico | Estrategia empresarial | analysis, template | — | Reclasificar | El prompt parte del análisis de una oportunidad o situación. |
| `sales-discovery-call` — Prepare and run a sales discovery call | Negocios | Ventas y crecimiento | Descubrimiento comercial | — | checklist | — | Reclasificar | La tarea es una conversación de ventas. |
| `business-model-canvas` — Map a business model with the Business Model Canvas | Negocios | Estrategia y modelo de negocio | Business Model Canvas | Estrategia empresarial | analysis, template | — | Reclasificar | El artefacto principal es el modelo de negocio. |
| `crear-sistema-lean-para-repositorio` — Crear un sistema documental Lean Startup para un repositorio | Negocios | Validación y experimentación | Documentación Lean | Análisis de negocio; gestión de proyectos | lean-startup, validated-learning, experimentation, template, checklist, analysis | — | Reclasificar | Lean Startup es el método y la documentación es el resultado. |
| `guiar-ciclo-lean` — Guiar un proyecto con el ciclo Lean Startup | Negocios | Validación y experimentación | Ciclo Lean Startup | Estrategia; gestión de proyectos | lean-startup, validated-learning, experimentation, checklist | — | Reclasificar | La categoría principal es el método de validación. |
| `definir-proyecto-lean` — Definir un proyecto con Lean Startup | Negocios | Validación y experimentación | Definición de proyecto Lean | Análisis de negocio; estrategia | lean-startup, validated-learning, template, analysis | — | Reclasificar | La definición se realiza dentro de un proceso de validación. |
| `mapear-hipotesis-lean` — Mapear las hipótesis críticas de un proyecto | Negocios | Validación y experimentación | Hipótesis | Análisis de negocio; estrategia | lean-startup, validated-learning, growth-engine, analysis | — | Reclasificar | El usuario busca identificar hipótesis verificables. |
| `priorizar-hipotesis-criticas` — Priorizar las hipótesis más arriesgadas | Negocios | Validación y experimentación | Priorización de hipótesis | Análisis de negocio; gestión de proyectos | lean-startup, experimentation, analysis, checklist | — | Reclasificar | La priorización sirve al ciclo experimental. |
| `disenar-experimento-lean` — Diseñar un experimento Lean | Negocios | Validación y experimentación | Diseño de experimentos | Análisis de negocio; gestión de proyectos | lean-startup, validated-learning, experimentation, checklist | — | Reclasificar | El resultado es un experimento validable. |
| `disenar-mvp-experimental` — Diseñar un MVP como vehículo experimental | Negocios | Validación y experimentación | MVP experimental | Estrategia; gestión de proyectos | lean-startup, mvp, experimentation, validated-learning | — | Reclasificar | El MVP se entiende como instrumento de aprendizaje. |
| `analizar-aprendizaje-validado` — Analizar aprendizaje validado | Negocios | Validación y experimentación | Aprendizaje validado | Análisis de negocio | lean-startup, validated-learning, experimentation, analysis | — | Reclasificar | Analiza evidencia del ciclo experimental. |
| `decidir-perseverar-pivotar-o-parar` — Decidir si perseverar, pivotar o parar | Negocios | Validación y experimentación | Perseverar, pivotar o parar | Estrategia; análisis de negocio | lean-startup, pivot, validated-learning, growth-engine | — | Reclasificar | Es una decisión posterior al aprendizaje validado. |
| `planificar-cadencia-lean` — Planificar la cadencia de aprendizaje Lean | Negocios | Validación y experimentación | Cadencia de aprendizaje | Gestión de proyectos; estrategia | lean-startup, experimentation, validated-learning, checklist | — | Reclasificar | La planificación está al servicio del aprendizaje. |
| `seo-content-brief` — Crear un brief de contenido SEO | Marketing | Adquisición y distribución | SEO | Estrategia de contenidos | template | — | Reclasificar | SEO es el canal; el brief es el formato. |
| `email-launch-sequence` — Escribir una secuencia de emails de lanzamiento | Marketing | Conversión y retención | Email de lanzamiento | Copywriting | template, conversion | — | Reclasificar | La secuencia busca activar o convertir usuarios. |
| `weekly-planning-review` — Hacer la revisión y planificación semanal | Productividad | Planificación | Revisión semanal | Organización | checklist, template | — | Reclasificar | La acción principal es planificar. |
| `decision-matrix` — Decidir entre opciones con una matriz ponderada | Productividad | Toma de decisiones | Matriz de decisión | — | analysis, template | — | Reclasificar | El resultado es una decisión estructurada. |
| `review-pull-request` — Revisar una pull request en profundidad | Software | Calidad, seguridad y rendimiento | Revisión de código | Control de versiones | checklist, git | — | Reclasificar | La tarea principal es evaluar calidad; Git es contexto. |
| `refactor-legacy-code` — Refactor a legacy code module safely | Software | Mantenimiento y evolución | Refactorización de código legado | — | legacy-code, typescript | — | Reclasificar | El foco es evolucionar código existente de forma segura. |
| `design-rest-api` — Diseñar una API REST completa | Software | Backend y APIs | Diseño de API REST | APIs e integraciones | api, rest | — | Reclasificar | Diseñar el contrato de una API es trabajo backend. |
| `review-software-architecture` — Review the architecture of a system | Software | Arquitectura y diseño | Arquitectura limpia | — | checklist | — | Renombrar categoría | Mantener subcategoría y moverla a la categoría canónica. |
| `discover-quality-attributes` — Descubrir y priorizar los atributos de calidad de un proyecto | Software | Arquitectura y diseño | Atributos de calidad | — | analysis, checklist, template | — | Mantener subcategoría | Los atributos condicionan decisiones arquitectónicas. |
| `convert-requirements-into-quality-scenarios` — Convertir requisitos no funcionales en escenarios de calidad | Software | Arquitectura y diseño | Atributos de calidad | — | analysis, checklist, template | — | Mantener subcategoría | Convierte requisitos en decisiones de arquitectura medibles. |
| `analyze-quality-attribute-tensions` — Analizar tensiones entre atributos de calidad | Software | Arquitectura y diseño | Atributos de calidad | — | analysis, checklist, template | — | Mantener subcategoría | Es análisis arquitectónico. |
| `analyze-internal-application-organization` — Analizar la organización interna de una aplicación | Software | Arquitectura y diseño | Organización interna | — | analysis, checklist | — | Mantener subcategoría | Trata la estructura interna del sistema. |
| `compare-application-organization-strategies` — Comparar estrategias de organización interna | Software | Arquitectura y diseño | Organización interna | — | analysis, template | — | Mantener subcategoría | Compara alternativas estructurales. |
| `migrate-layers-to-vertical-slices` — Migrar progresivamente de capas a vertical slices | Software | Arquitectura y diseño | Organización interna | — | analysis, migration, checklist | — | Mantener subcategoría | La migración cambia la estructura arquitectónica. |
| `generate-architectural-alternatives` — Generar alternativas para una decisión arquitectónica | Software | Arquitectura y diseño | Decisiones arquitectónicas | — | analysis, template | — | Añadir subcategoría | El prompt necesita distinguir decisiones de atributos de calidad. |
| `evaluate-economic-impact-of-architectural-decision` — Evaluar el impacto económico y organizativo de una decisión arquitectónica | Software | Arquitectura y diseño | Atributos de calidad | — | analysis, checklist, template | — | Mantener subcategoría | Coste y organización son atributos de la decisión. |
| `build-c4-system-model` — Construir un modelo C4 de un sistema | Software | Arquitectura y diseño | Modelo C4 | — | analysis, template | — | Mantener subcategoría | El modelo C4 es una técnica arquitectónica. |
| `review-c4-system-model` — Revisar un modelo C4 | Software | Arquitectura y diseño | Modelo C4 | — | analysis, checklist | — | Mantener subcategoría | Revisión del mismo artefacto arquitectónico. |
| `recommend-software-architecture` — Recomendar una arquitectura de software según el contexto | Software | Arquitectura y diseño | Decisiones arquitectónicas | — | analysis, checklist, template | — | Añadir subcategoría | Recomienda una solución, no un patrón concreto. |
| `generate-unit-tests` — Generar pruebas unitarias útiles | Software | Calidad, seguridad y rendimiento | Pruebas unitarias | — | typescript | — | Reclasificar | La verificación es el objetivo principal. |
| `investigate-production-incident` — Investigar una incidencia en producción | Software | Observabilidad y operación | Respuesta a incidentes | Observabilidad | incident-response, debugging | — | Reclasificar | El caso de uso es operativo y orientado a incidentes. |
| `improve-observability` — Design an observability improvement plan | Software | Observabilidad y operación | Observabilidad | — | checklist | — | Añadir subcategoría | Logs, métricas y trazas son componentes de una misma mejora. |
| `write-technical-decision-record` — Redactar un registro de decisión técnica (ADR) | Software | Arquitectura y diseño | Decisiones arquitectónicas | Documentación técnica | template | — | Reclasificar | El ADR documenta una decisión arquitectónica. |
| `design-cicd-pipeline` — Diseñar un pipeline de CI/CD | Software | Entrega y despliegue | CI/CD | DevOps | docker, checklist | — | Fusionar categorías | CI/CD y DevOps se presentan bajo una categoría de entrega. |
| `optimize-sql-query` — Optimize a slow SQL query | Software | Datos | Rendimiento de consultas | Rendimiento | sql, postgresql | — | Reclasificar | El objeto del trabajo es una consulta y sus datos. |
| `threat-modeling` — Realizar un modelado de amenazas | Software | Calidad, seguridad y rendimiento | Seguridad del software | — | checklist, api | — | Reclasificar | Seguridad es una preocupación transversal de calidad. |
| `write-git-commit-messages` — Escribir mensajes de commit útiles | Software | Setup y forma de trabajar | Commits | Control de versiones | git, template | — | Reclasificar | Git es la herramienta; la categoría es el flujo de trabajo. |
| `evaluate-rendering-strategies` — Evaluar estrategias de renderizado para una aplicación | Software | Frontend y experiencia | Estrategias de renderizado | Desarrollo web | analysis, checklist, template | — | Eliminar categoría secundaria | Web development no aporta una ubicación distinta. |
| `classify-frontend-state` — Clasificar y simplificar el estado frontend | Software | Frontend y experiencia | Estado frontend | — | analysis, checklist | — | Reclasificar | El área principal es frontend. |
| `debug-frontend-issue` — Depurar un error de frontend sistemáticamente | Software | Frontend y experiencia | Depuración frontend | Desarrollo web | debugging, react, typescript | — | Eliminar categoría secundaria | El problema se busca por frontend, no por web como área separada. |
| `review-docker-configuration` — Review a Dockerfile and Compose setup | Software | Entrega y despliegue | Contenedores | DevOps | docker, checklist | — | Fusionar categorías | Docker forma parte de empaquetado y entrega. |
| `plan-database-migration` — Planificar una migración de base de datos | Software | Datos | Migraciones de base de datos | — | migration, sql, postgresql | — | Reclasificar | El objeto principal son los datos persistentes. |
| `write-integration-tests` — Escribir pruebas de integración para una API | Software | Calidad, seguridad y rendimiento | Pruebas de integración | APIs e integraciones | api, typescript | — | Reclasificar | La intención principal es probar, no diseñar la API. |
| `document-module` — Documentar un módulo técnico | Software | Mantenimiento y evolución | Documentación técnica | — | template | — | Reclasificar | La documentación mantiene y hace evolucionar el sistema. |
| `evaluate-architecture-evolvability` — Evaluar la capacidad de evolución de una arquitectura | Software | Arquitectura y diseño | Atributos de calidad | — | analysis, checklist | — | Mantener subcategoría | La evolvabilidad es un atributo de calidad. |
| `define-architecture-fitness-functions` — Definir tests arquitectónicos y fitness functions | Software | Arquitectura y diseño | Atributos de calidad | — | analysis, checklist | — | Mantener subcategoría | Define controles para preservar decisiones arquitectónicas. |
| `critical-architecture-review` — Realizar una revisión crítica de una arquitectura | Software | Arquitectura y diseño | Revisión arquitectónica | — | analysis, checklist | — | Añadir subcategoría | La revisión arquitectónica es diferente de una revisión de código. |
| `analyze-hexagonal-architecture` — Analizar una aplicación desde la perspectiva de arquitectura hexagonal | Software | Arquitectura y diseño | Arquitectura hexagonal | — | analysis, checklist | — | Mantener subcategoría | El concepto es una forma de arquitectura. |
| `detect-domain-contamination` — Detectar contaminación del núcleo de dominio por detalles externos | Software | Arquitectura y diseño | Arquitectura limpia | — | analysis, checklist | — | Mantener subcategoría | Evalúa separación de dominio y detalles. |
| `choose-communication-style` — Elegir el estilo de comunicación entre componentes | Software | Arquitectura y diseño | Sistemas distribuidos | — | analysis, checklist | — | Mantener subcategoría | La decisión afecta la arquitectura distribuida. |
| `analyze-remote-call-chain` — Analizar una cadena de llamadas remotas | Software | Arquitectura y diseño | Sistemas distribuidos | — | analysis, checklist | — | Mantener subcategoría | Analiza dependencias distribuidas. |
| `analyze-distributed-failure-scenarios` — Analizar escenarios de fallo en comunicación distribuida | Software | Arquitectura y diseño | Sistemas distribuidos | — | analysis, checklist | — | Mantener subcategoría | Trata resiliencia y fallos estructurales. |
| `design-remote-call-resilience` — Diseñar la estrategia de resiliencia para una llamada remota | Software | Arquitectura y diseño | Sistemas distribuidos | — | analysis, checklist | — | Mantener subcategoría | La resiliencia se decide en el diseño distribuido. |
| `compare-api-styles` — Comparar estilos de API para una interfaz | Software | Backend y APIs | Diseño de API | — | analysis, api | — | Reclasificar | Compara formas de exponer una interfaz. |
| `review-api-contract` — Revisar un contrato de API | Software | Backend y APIs | Contratos de API | — | analysis, api, checklist | — | Reclasificar | El artefacto revisado es el contrato de backend. |
| `design-api-error-model` — Diseñar el modelo de errores de una API | Software | Backend y APIs | Modelo de errores de API | — | api, template | — | Reclasificar | Es una decisión de contrato y comportamiento backend. |

## Registro de revisión editorial de la migración

Estos prompts fueron revisados para verificar que el contenido y los casos de
uso coinciden con su nueva ubicación:

- `review-pull-request`: confirmar que la revisión de código es la intención
  principal y Git queda como contexto.
- `design-rest-api`: confirmar que el contenido no trata principalmente de
  integrar servicios externos.
- `write-technical-decision-record`: confirmar que el ADR documenta decisiones
  arquitectónicas y no documentación operativa.
- `design-cicd-pipeline`: confirmar que el alcance es entrega y despliegue,
  no infraestructura general.
- `optimize-sql-query`: confirmar que el objetivo es optimización de datos y
  no rendimiento general de la aplicación.
- `write-integration-tests`: confirmar que el prompt prioriza la estrategia de
  pruebas frente al diseño de APIs.
- `evaluate-architecture-evolvability`: confirmar que evolvabilidad se trata
  como atributo de calidad y no como mantenimiento.

## Criterios cumplidos de la definición inicial

- Los cinco módulos y sus categorías objetivo están definidos.
- Desarrollo de software tiene cerrados los grupos Definir, Diseñar y
  construir, y Validar y operar.
- Los 61 prompts actuales aparecen en la matriz, cada uno con una categoría
  principal y una subcategoría propuesta.
- Cada categoría secundaria actual tiene una acción explícita.
- Los IDs nuevos y aliases antiguos están documentados.
- El catálogo de etiquetas no introduce una nueva etiqueta para conceptos que
  ya son categorías o subcategorías.
- La migración de datos se pudo ejecutar sin decisiones de clasificación
  pendientes.

Las futuras incorporaciones de contenido deben respetar esta especificación,
la validación estática de la biblioteca y los contratos de URL descritos en el
README.
