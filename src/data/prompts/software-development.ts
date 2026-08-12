import type { Prompt } from "../types";

export const softwareDevelopmentPrompts: Prompt[] = [
  {
    id: "review-pull-request",
    slug: "revisar-pull-request",
    title: "Revisar una pull request en profundidad",
    description:
      "Revisión estructurada de una pull request que cubre corrección, legibilidad, pruebas, seguridad y alineación con la arquitectura del proyecto.",
    content: `Actúa como un revisor de código senior con experiencia en {{language}} y en el dominio de {{domain}}.

Voy a compartirte el diff de una pull request. Tu tarea es hacer una revisión rigurosa pero constructiva.

Contexto del cambio:
{{context}}

Diff de la pull request:
{{code}}

Evalúa los siguientes aspectos, en este orden de prioridad:

1. Corrección: ¿el código hace lo que dice la descripción? ¿Hay errores lógicos, condiciones de carrera o casos límite sin cubrir?
2. Seguridad: inyección, validación de entradas, manejo de secretos, exposición de datos sensibles.
3. Legibilidad: nombres, tamaño de funciones, complejidad innecesaria, comentarios que no aportan o que faltan.
4. Pruebas: ¿los cambios están cubiertos por tests? ¿Qué casos faltan?
5. Consistencia: ¿sigue las convenciones del proyecto y los patrones ya establecidos?

Formato de salida:
- Un resumen de dos líneas con tu veredicto: aprobar, aprobar con comentarios menores o solicitar cambios.
- Una lista de hallazgos ordenada por severidad (bloqueante, importante, sugerencia), cada uno con el fragmento afectado y una propuesta concreta de cambio.
- Una sección final de "lo que está bien" con al menos dos aciertos del autor.

Sé directo y específico. No uses frases genéricas como "podría mejorarse": explica el porqué y muestra el código alternativo cuando propongas un cambio.`,
    language: "es",
    module: "software-development",
    categories: ["quality-and-testing", "version-control"],
    subcategories: ["code-review", "pull-requests"],
    tags: ["checklist", "git"],
    useCases: [
      "Revisar pull requests de compañeros antes de aprobarlas",
      "Preparar una auto-revisión antes de pedir feedback",
      "Estandarizar los criterios de revisión de un equipo",
    ],
    notes:
      "Pega el diff completo si es posible. Si la PR es muy grande, divídela por archivos o por commits y revisa por partes.",
    createdAt: "2025-09-15",
    updatedAt: "2026-01-20",
  },
  {
    id: "refactor-legacy-code",
    slug: "refactor-legacy-code",
    title: "Refactor a legacy code module safely",
    description:
      "Step-by-step plan to refactor a legacy module without changing its behavior, starting from characterization tests and ending with a clean public API.",
    content: `You are a senior software engineer specialized in working with legacy code (Michael Feathers style: seams, characterization tests, incremental refactoring).

I will give you a legacy module written in {{language}}. Your job is to produce a safe, incremental refactoring plan.

Constraints and context:
{{context}}

Legacy code:
{{code}}

Follow this process:

1. Understand first. Summarize what the module actually does (not what the names suggest). List its inputs, outputs, side effects and hidden dependencies.
2. Risk map. Identify the riskiest parts: global state, I/O mixed with logic, untestable constructs, unclear error handling, dead code.
3. Characterization tests. Before any refactor, write the characterization tests that pin down the CURRENT behavior (including quirks). Provide the test code in {{test_framework}}.
4. Refactoring plan. Propose a sequence of small, behavior-preserving steps (extract function, introduce parameter, move method, etc.). For each step, state: goal, exact transformation, and how we verify nothing broke.
5. Target design. Sketch the end state: the public API, the internal structure, and which patterns you apply (and why).

Rules:
- Never change behavior and structure in the same step.
- Every step must leave the codebase in a working state.
- Flag explicitly any place where you are unsure about the intended behavior, and suggest how to confirm it.

Do not rewrite the whole module in one go. Incremental, reviewable changes only.`,
    language: "en",
    module: "software-development",
    categories: ["refactoring"],
    tags: ["legacy-code", "typescript"],
    useCases: [
      "Modernizing a module nobody dares to touch",
      "Preparing legacy code before adding a new feature",
      "Reducing technical debt incrementally during normal development",
    ],
    notes:
      "If the module is large, run the prompt per file or per class. Keep the characterization tests in the repo permanently, they document real behavior.",
    createdAt: "2025-10-02",
    updatedAt: "2026-02-11",
  },
  {
    id: "design-rest-api",
    slug: "disenar-api-rest",
    title: "Diseñar una API REST completa",
    description:
      "Diseño de una API REST a partir de requisitos: recursos, endpoints, códigos de estado, paginación, errores, versionado y contrato OpenAPI.",
    content: `Actúa como un arquitecto de APIs con experiencia en diseño REST pragmático.

Necesito diseñar una API REST para el siguiente caso:

Requisitos:
{{requirements}}

Contexto técnico (stack, restricciones, sistemas existentes):
{{context}}

Entrega un diseño completo que incluya:

1. Modelo de recursos: lista los recursos principales, sus relaciones y justifica por qué son recursos y no acciones.
2. Endpoints: para cada recurso, define método HTTP, ruta, parámetros (path, query, body), códigos de respuesta y un ejemplo de request y response en JSON.
3. Convenciones: nombrado de rutas, uso de plurales, campos en snake_case o camelCase (elige uno y justifícalo).
4. Paginación, filtrado y ordenación: define el mecanismo (cursor u offset) y los parámetros de query.
5. Errores: formato estándar de error (tipo, mensaje, detalles, trazabilidad) y tabla de códigos de estado usados.
6. Versionado: estrategia (URL, cabecera o contenido) y política de cambios incompatibles.
7. Seguridad: autenticación, autorización por recurso y límites de tasa.
8. Idempotencia: qué operaciones la necesitan y cómo garantizarla.

Cierra con un esqueleto de documento OpenAPI 3 (solo las rutas principales) que sirva como contrato inicial.

Si algún requisito es ambiguo, propón la opción más simple y señala la decisión explícitamente en una lista de "decisiones tomadas".`,
    language: "es",
    module: "software-development",
    categories: ["apis-and-integrations", "backend-development"],
    tags: ["api", "rest"],
    useCases: [
      "Diseñar una API nueva antes de escribir código",
      "Revisar la coherencia de una API existente",
      "Generar el borrador inicial de un contrato OpenAPI",
    ],
    example:
      "Requisitos: una API para un sistema de reservas con salas, usuarios y reservas; las reservas no pueden solaparse; los administradores pueden ver todas las reservas.",
    createdAt: "2025-11-05",
    updatedAt: "2026-01-08",
  },
  {
    id: "review-software-architecture",
    slug: "review-software-architecture",
    title: "Review the architecture of a system",
    description:
      "Structured architecture review covering boundaries, dependencies, data flow, failure modes, scalability and evolution, with concrete findings and trade-offs.",
    content: `You are a staff software architect performing an architecture review. Be rigorous and pragmatic: every finding must include a trade-off analysis, not just an opinion.

System description:
{{architecture}}

Quality goals (ranked by importance):
{{requirements}}

Known pain points and constraints:
{{context}}

Perform the review in this order:

1. Architecture summary. Restate the architecture in your own words: main components, responsibilities, and how they communicate. If your summary differs from the description, flag the mismatch.
2. Boundaries and dependencies. Evaluate module/service boundaries, dependency direction, coupling and cohesion. Identify cyclic dependencies, leaky abstractions and misplaced responsibilities.
3. Data and consistency. How is state owned, shared and kept consistent? Identify single sources of truth, duplication and consistency risks.
4. Failure modes. For each integration point, describe what breaks, how it is detected, and how the system degrades. Note missing timeouts, retries, circuit breakers or fallbacks.
5. Scalability and performance. Identify the first three bottlenecks the system will hit as load grows 10x, and what design decision makes each one hard to fix later.
6. Evolvability. How easy is it to change a requirement, replace a component, or onboard a new developer? Point out the decisions that lock the system in.

Output format:
- One-paragraph overall assessment.
- Findings table: area, severity (high/medium/low), finding, trade-off of fixing it vs. leaving it.
- Top 3 recommended actions, each with effort estimate and expected payoff.

Do not recommend a full rewrite unless you can justify why incremental change is impossible.`,
    language: "en",
    module: "software-development",
    categories: ["software-architecture"],
    subcategories: ["clean-architecture"],
    tags: ["checklist"],
    useCases: [
      "Periodic architecture health checks",
      "Preparing an architecture review with an external reviewer",
      "Evaluating a design proposal before implementation starts",
    ],
    createdAt: "2025-09-28",
    updatedAt: "2026-03-02",
  },
  {
    id: "discover-quality-attributes",
    slug: "descubrir-atributos-de-calidad",
    title: "Descubrir y priorizar los atributos de calidad de un proyecto",
    description:
      "Cuestionario adaptado al contexto de un proyecto para identificar, priorizar y convertir sus atributos de calidad en escenarios medibles y decisiones arquitectónicas.",
    content: `Actúa como un arquitecto de software especializado en descubrimiento de requisitos y definición de atributos de calidad.

Necesito identificar qué atributos de calidad son realmente importantes para este proyecto antes de tomar decisiones arquitectónicas.

Contexto del proyecto:
{{project}}

Funcionalidades principales y usuarios:
{{functional_requirements}}

Contexto de negocio, riesgos y consecuencias de fallo:
{{business_context}}

Restricciones técnicas, presupuesto, equipo y calendario:
{{constraints}}

Sistemas externos, integraciones y dependencias:
{{integrations}}

Genera un cuestionario adaptado al proyecto. No inventes respuestas ni asumas que todos los atributos tienen la misma importancia.

Analiza, cuando sean relevantes, estos atributos:

- Rendimiento.
- Escalabilidad.
- Disponibilidad.
- Resiliencia.
- Seguridad.
- Privacidad.
- Mantenibilidad.
- Operabilidad.
- Coste.
- Compatibilidad o interoperabilidad.
- Usabilidad y accesibilidad.

Entrega el resultado en este orden:

1. Resumen de los principales riesgos y decisiones que podrían condicionar la arquitectura.
2. Lista priorizada de preguntas, agrupadas por atributo de calidad.
3. Para cada pregunta, indica:
   - por qué es importante;
   - qué decisión puede afectar;
   - qué tipo de respuesta se necesita;
   - si es crítica, importante u opcional.
4. Limita el cuestionario inicial a las 15-25 preguntas con mayor impacto. Añade después una sección de preguntas adicionales.
5. Señala qué preguntas dependen de respuestas anteriores y cuál debería ser el orden recomendado para resolverlas.
6. Indica qué atributos parecen inicialmente prioritarios, cuáles parecen secundarios y cuáles todavía no pueden evaluarse.
7. Identifica posibles conflictos entre atributos, por ejemplo rendimiento frente a consistencia, disponibilidad frente a coste, seguridad frente a facilidad de uso, modularidad frente a simplicidad y resiliencia frente a complejidad operativa.
8. Proporciona una plantilla para convertir las respuestas en escenarios de calidad medibles con esta estructura: fuente del estímulo, estímulo, condiciones, parte afectada, respuesta esperada y métrica o umbral.
9. Termina con una tabla de decisiones pendientes que indique decisión, información necesaria, responsable sugerido e impacto de no resolverla.

Reglas:

- No uses frases vagas como "el sistema debe ser rápido" sin proponer qué medida concreta falta.
- Distingue entre disponibilidad y resiliencia, y entre seguridad y privacidad.
- Pregunta por volúmenes, picos, tiempos, porcentajes, límites, datos y consecuencias.
- No maximices todos los atributos: busca prioridades proporcionales al proyecto.
- Si no hay información suficiente, marca el dato como desconocido.
- No propongas tecnologías concretas hasta que las respuestas justifiquen una decisión.`,
    language: "es",
    module: "software-development",
    categories: ["software-architecture"],
    subcategories: ["quality-attributes"],
    tags: ["analysis", "checklist", "template"],
    useCases: [
      "Descubrir los requisitos arquitectónicos antes de diseñar un sistema",
      "Preparar entrevistas de descubrimiento con negocio y equipos técnicos",
      "Convertir riesgos y expectativas vagas en escenarios de calidad medibles",
    ],
    notes:
      "Usa las respuestas obtenidas como entrada para una revisión arquitectónica posterior y valida los umbrales con las personas responsables del negocio y de la operación.",
    createdAt: "2026-08-02",
    updatedAt: "2026-08-02",
  },
  {
    id: "convert-requirements-into-quality-scenarios",
    slug: "convertir-requisitos-en-escenarios-de-calidad",
    title: "Convertir requisitos no funcionales en escenarios de calidad",
    description:
      "Transformación de requisitos no funcionales vagos en escenarios de calidad verificables, con métricas, umbrales, prioridades y conflictos explícitos.",
    content: `Actúa como un arquitecto de software especializado en requisitos de calidad.

Convierte los siguientes requisitos no funcionales en escenarios de calidad verificables. No diseñes todavía una arquitectura ni elijas tecnologías: primero transforma las expectativas en criterios que puedan validarse.

Requisitos:
{{requirements}}

Para cada requisito:

1. Asígnale un identificador estable (por ejemplo, NFR-01).
2. Normaliza su intención en una frase breve y separa el requisito explícito de cualquier supuesto.
3. Construye uno o más escenarios de calidad independientes y comprobables. Para cada escenario indica:
   - atributo de calidad;
   - fuente del estímulo;
   - estímulo;
   - contexto o condiciones de operación;
   - componente, servicio o parte afectada;
   - respuesta esperada;
   - métrica verificable y umbral de aceptación;
   - prioridad (crítica, importante u opcional).
4. Señala los datos que faltan para poder medir el escenario: volumen, carga, percentil, ventana temporal, tasa de error, objetivo de recuperación, nivel de protección u otro parámetro relevante.
5. Detecta requisitos que puedan entrar en conflicto. Para cada posible conflicto indica los identificadores implicados, los atributos afectados, la causa de la tensión y qué decisión o dato falta para resolverla.

Presenta el resultado en este orden:

1. Supuestos e incertidumbres.
2. Tabla de requisitos normalizados.
3. Tabla de escenarios de calidad verificables.
4. Requisitos potencialmente conflictivos.
5. Lista priorizada de preguntas o decisiones pendientes.

Reglas:

- No uses métricas vagas como "rápido", "seguro", "escalable" o "fácil de mantener" sin indicar qué medida concreta falta.
- Usa unidades, porcentajes, percentiles, ventanas temporales, cargas y umbrales cuando estén disponibles.
- No inventes cifras. Si falta un valor, marca el umbral como desconocido y formula la pregunta necesaria.
- Distingue entre rendimiento, escalabilidad, disponibilidad, resiliencia, seguridad, privacidad, mantenibilidad, operabilidad y coste.
- No conviertas automáticamente todos los requisitos en trade-offs: señala solo conflictos razonables y explica la evidencia.
- Mantén trazabilidad entre cada escenario y el requisito del que procede.
- Si un requisito mezcla varias cualidades o comportamientos, divídelo en escenarios separados.

Usa una redacción concreta para que cada escenario pueda convertirse posteriormente en una prueba, una alerta, un objetivo operativo o un criterio de aceptación.`,
    language: "es",
    module: "software-development",
    categories: ["software-architecture"],
    subcategories: ["quality-attributes"],
    tags: ["analysis", "checklist", "template"],
    useCases: [
      "Convertir requisitos no funcionales vagos en criterios de aceptación medibles",
      "Preparar escenarios de calidad antes de comparar alternativas arquitectónicas",
      "Detectar ambigüedades y conflictos en requisitos de un sistema",
    ],
    notes:
      "Úsalo después de recopilar los requisitos y antes de recomendar una arquitectura. Valida los umbrales con las personas responsables del negocio y de la operación.",
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "analyze-quality-attribute-tensions",
    slug: "analizar-tensiones-entre-atributos-de-calidad",
    title: "Analizar tensiones entre atributos de calidad",
    description:
      "Construcción de una matriz contextual de relaciones entre atributos de calidad para distinguir refuerzos, independencia y trade-offs antes de tomar decisiones arquitectónicas.",
    content: `Actúa como un arquitecto de software especializado en análisis de trade-offs.

Analiza los siguientes atributos de calidad y construye una matriz de tensiones arquitectónicas. El objetivo es hacer explícitas las fuerzas que condicionarán decisiones posteriores, no proponer todavía una arquitectura.

Atributos de calidad:
{{quality_attributes}}

Contexto del sistema, restricciones y prioridades conocidas:
{{context}}

Presta especial atención a:

- rendimiento;
- escalabilidad;
- disponibilidad;
- resiliencia;
- seguridad;
- privacidad;
- mantenibilidad;
- operabilidad;
- coste.

Para cada pareja relevante de atributos indica una de estas relaciones:

- se refuerzan mutuamente;
- son independientes en este contexto;
- generan un trade-off.

Para cada relación explica brevemente:

1. por qué existe o por qué no hay interacción relevante;
2. qué mecanismo o restricción del contexto la provoca;
3. qué síntoma o métrica podría hacerla observable;
4. qué información falta, si la relación no puede determinarse con confianza.

Presenta el resultado en este orden:

1. Resumen de prioridades y restricciones que influyen en las tensiones.
2. Matriz de relaciones entre parejas relevantes, omitiendo la diagonal y las duplicidades.
3. Explicación de cada trade-off, ordenada por impacto.
4. Atributos que se refuerzan mutuamente y cómo aprovechar esa relación.
5. Atributos que parecen independientes, indicando las condiciones bajo las que podrían dejar de serlo.
6. Preguntas y decisiones pendientes que deberían resolverse antes de comparar arquitecturas.

Reglas:

- Analiza solo parejas relevantes para el contexto; no rellenes una matriz completa con relaciones genéricas.
- No supongas que todos los atributos tienen la misma prioridad.
- Distingue disponibilidad de resiliencia, y seguridad de privacidad.
- Explica la causa del trade-off, no solo lo nombres. Por ejemplo, indica si proviene de replicación, controles de acceso, cifrado, asincronía, complejidad operativa, recursos adicionales o coste de cambio.
- Considera también tensiones entre coste y los demás atributos, y entre operabilidad y resiliencia.
- No recomiendes una arquitectura, patrón, proveedor ni tecnología.
- Si no hay datos suficientes, marca la conclusión como provisional y formula la pregunta que permitiría confirmarla.

Termina con una síntesis de las tres tensiones que más deberían influir en la siguiente fase de decisión arquitectónica.`,
    language: "es",
    module: "software-development",
    categories: ["software-architecture"],
    subcategories: ["quality-attributes"],
    tags: ["analysis", "checklist", "template"],
    useCases: [
      "Preparar una conversación de trade-offs con negocio y equipos técnicos",
      "Comparar prioridades antes de evaluar alternativas arquitectónicas",
      "Hacer explícitas las consecuencias de priorizar un atributo de calidad",
    ],
    notes:
      "Úsalo después de convertir los requisitos en escenarios medibles y antes del prompt de recomendación arquitectónica. No sustituye la validación de los objetivos con las personas responsables.",
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "generate-architectural-alternatives",
    slug: "generar-alternativas-arquitectonicas",
    title: "Generar alternativas para una decisión arquitectónica",
    description:
      "Exploración de alternativas arquitectónicas reales y comparables, incluyendo opciones incrementales y no hacer nada todavía cuando sean razonables.",
    content: `Actúa como un arquitecto de software pragmático especializado en explorar decisiones con incertidumbre.

Para la siguiente decisión arquitectónica, genera alternativas reales y comparables. Todavía no elijas una solución definitiva: primero amplía el espacio de opciones y haz explícitas sus consecuencias.

Decisión:
{{decision}}

Contexto:
{{context}}

Restricciones:
{{constraints}}

Antes de proponer alternativas, separa brevemente:

- hechos conocidos;
- supuestos;
- incertidumbres;
- criterios que parecen decisivos.

Genera normalmente entre dos y cuatro alternativas. Incluye la alternativa "no hacer nada todavía" o mantener la solución actual si es razonable y explica qué riesgo implica no actuar.

Para cada alternativa analiza:

- descripción y alcance;
- beneficios;
- costes iniciales;
- riesgos;
- complejidad técnica y organizativa introducida;
- impacto operacional;
- impacto a largo plazo;
- reversibilidad y dificultad de migración o abandono;
- supuestos de los que depende.

Después:

1. Explica qué alternativas son realmente comparables y cuáles resuelven problemas distintos.
2. Indica qué alternativa representa el camino incremental más pequeño.
3. Identifica los riesgos de las opciones descartadas o aplazadas.
4. Enumera la información adicional que podría cambiar potencialmente la decisión, indicando qué alternativa favorecería cada dato.

Reglas:

- No presentes variantes artificiales ni alternativas de paja.
- No recomiendes una arquitectura por moda ni asumas que la solución técnicamente más sofisticada es la mejor.
- No inventes restricciones, costes, volúmenes o capacidades del equipo.
- Distingue una alternativa arquitectónica de una elección concreta de tecnología.
- No cierres con una recomendación definitiva si faltan datos que puedan cambiar materialmente el resultado.
- Si el contexto es insuficiente, formula las preguntas de mayor impacto después de generar las opciones provisionales.

Presenta una tabla comparativa final, pero no uses puntuaciones con falsa precisión: justifica cada comparación con hechos, supuestos o incertidumbres.`,
    language: "es",
    module: "software-development",
    categories: ["software-architecture"],
    subcategories: ["quality-attributes"],
    tags: ["analysis", "template"],
    useCases: [
      "Explorar opciones antes de tomar una decisión arquitectónica",
      "Comparar una migración incremental con un cambio más profundo",
      "Preparar un debate técnico con alternativas que no sean hombres de paja",
    ],
    notes:
      "Úsalo antes de evaluar el impacto económico y organizativo de cada alternativa y antes del prompt de recomendación arquitectónica.",
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "evaluate-economic-impact-of-architectural-decision",
    slug: "evaluar-impacto-economico-decision-arquitectonica",
    title: "Evaluar el impacto económico y organizativo de una decisión arquitectónica",
    description:
      "Evaluación de alternativas arquitectónicas considerando coste inicial, TCO, operación, conocimiento, riesgo, reversibilidad, lock-in, coste de oportunidad y complejidad accidental.",
    content: `Actúa como un arquitecto de software con experiencia en economía de decisiones técnicas y diseño organizativo.

Evalúa esta decisión arquitectónica considerando no solamente su calidad técnica, sino también su impacto económico y organizativo. No elijas automáticamente la alternativa técnicamente más sofisticada.

Contexto:
{{context}}

Alternativas:
{{alternatives}}

Antes de comparar, separa claramente:

- hechos respaldados por el contexto;
- supuestos necesarios para estimar;
- incertidumbres;
- información que falta y puede cambiar la conclusión.

Evalúa cada alternativa considerando:

| Dimensión | Pregunta |
|---|---|
| Coste inicial | ¿Qué esfuerzo requiere implementarla? |
| TCO | ¿Qué coste genera durante 3-5 años? |
| Operación | ¿Qué infraestructura, soporte y carga operativa necesita? |
| Conocimiento | ¿Qué expertise necesita el equipo y qué formación o contratación implica? |
| Riesgo | ¿Qué puede salir mal y cuál sería el impacto? |
| Reversibilidad | ¿Qué tan difícil es abandonar o sustituir la decisión? |
| Lock-in | ¿Qué dependencias externas, técnicas u organizativas crea? |
| Coste de oportunidad | ¿Qué dejamos de construir o mantener por elegirla? |
| Complejidad | ¿Cuánta complejidad accidental introduce en desarrollo y operación? |

Para cada dimensión indica:

- valoración cualitativa o rango, solo si los datos lo permiten;
- evidencia, supuesto o incertidumbre que la sustenta;
- horizonte temporal relevante;
- consecuencias para el equipo, la operación y la evolución del sistema.

En el análisis del TCO considera, cuando sean relevantes, infraestructura, licencias, tráfico, almacenamiento, observabilidad, soporte, incidentes, formación, contratación, migración, retirada y coste de cambio. No conviertas estos conceptos en cifras inventadas.

Presenta el resultado en este orden:

1. Resumen ejecutivo sin decisión automática.
2. Hechos, supuestos e incertidumbres.
3. Tabla comparativa por dimensión y alternativa.
4. Costes y riesgos que suelen quedar ocultos.
5. Dependencias organizativas y de conocimiento.
6. Alternativas más reversibles y más difíciles de abandonar.
7. Información adicional que podría cambiar la decisión.
8. Conclusión condicionada: qué alternativa parece encajar mejor bajo cada conjunto de supuestos.

Reglas:

- No confundas coste inicial con TCO.
- No trates el coste como únicamente infraestructura: incluye tiempo de personas y coste de oportunidad.
- No confundas complejidad accidental con complejidad necesaria del dominio.
- Explica los trade-offs entre calidad técnica, velocidad de entrega, operación, organización y coste.
- Si faltan datos, formula preguntas concretas y marca la confianza de la evaluación.
- No recomiendes una alternativa solo porque sea más moderna, distribuida o sofisticada.`,
    language: "es",
    module: "software-development",
    categories: ["software-architecture"],
    subcategories: ["quality-attributes"],
    tags: ["analysis", "checklist", "template"],
    useCases: [
      "Evaluar una decisión técnica con responsables de negocio y tecnología",
      "Comparar el coste total de alternativas arquitectónicas",
      "Hacer visibles los riesgos de lock-in y de capacidad operativa",
    ],
    notes:
      "Úsalo después de generar alternativas reales. Valida las estimaciones de esfuerzo, operación y TCO con las personas que poseen esos datos.",
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "build-c4-system-model",
    slug: "construir-modelo-c4",
    title: "Construir un modelo C4 de un sistema",
    description:
      "Construcción progresiva de los niveles System Context, Containers y Components de un modelo C4, señalando ambigüedades y evitando inventar elementos no deducibles.",
    content: `Actúa como un arquitecto de software que documenta un sistema para personas que necesitan entenderlo y evolucionarlo.

A partir de la siguiente descripción del sistema, construye su modelo C4. Antes de construirlo, identifica la información ambigua, contradictoria o ausente.

Descripción del sistema:
{{system}}

Genera los siguientes niveles:

## Nivel 1 — System Context

Incluye:

- personas;
- sistema principal;
- sistemas externos;
- relaciones entre ellos y el propósito de cada relación.

## Nivel 2 — Containers

Incluye, cuando puedan deducirse razonablemente:

- aplicaciones;
- servicios;
- bases de datos;
- colas o brokers;
- caches;
- responsabilidades;
- dependencias y dirección de las relaciones;
- datos que posee cada elemento.

En C4, interpreta "container" como una aplicación, servicio, almacén de datos o unidad ejecutable relevante, no necesariamente como un contenedor Docker. Menciona tecnologías solo cuando sean arquitectónicamente relevantes para comprender una relación, una responsabilidad o una restricción.

## Nivel 3 — Components

Genera este nivel solo para los containers donde aporte información útil para entender sus responsabilidades, dependencias o evolución. No lo generes mecánicamente para todos.

Para cada elemento de cualquier nivel incluye:

- nombre;
- tipo;
- responsabilidad;
- dependencias;
- datos que posee;
- relaciones relevantes;
- nivel de confianza: deducido, supuesto o desconocido.

Presenta primero:

1. Ambigüedades, contradicciones y ausencias de información.
2. Supuestos mínimos utilizados.
3. Modelo C4 por niveles.
4. Elementos que no pueden modelarse con confianza y preguntas para confirmarlos.

Reglas:

- Evita inventar componentes, bases de datos, colas, caches, usuarios o integraciones que no puedan deducirse razonablemente del contexto.
- Si dos elementos podrían ser uno solo o estar separados, marca la incertidumbre en lugar de decidir sin evidencia.
- Mantén separadas las responsabilidades, la propiedad de los datos y las dependencias.
- No mezcles detalles de implementación con decisiones arquitectónicas relevantes.
- Usa relaciones dirigidas y explica el sentido de cada una.
- No presentes una tecnología como hecho si solo es una posibilidad.
- Si un nivel no aporta información suficiente, indícalo y explica qué falta.

Puedes incluir una representación textual o diagramable, pero la claridad y la trazabilidad tienen prioridad sobre el formato.`,
    language: "es",
    module: "software-development",
    categories: ["software-architecture"],
    subcategories: ["c4-model"],
    tags: ["analysis", "template"],
    useCases: [
      "Documentar la arquitectura de un sistema existente",
      "Preparar una sesión de onboarding técnico",
      "Crear una primera versión de un modelo C4 antes de revisarlo con el equipo",
    ],
    notes:
      "Empieza con una descripción del sistema suficientemente concreta. Valida el ownership de datos y las relaciones con las personas responsables de cada parte.",
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "review-c4-system-model",
    slug: "revisar-modelo-c4",
    title: "Revisar un modelo C4",
    description:
      "Revisión externa de un modelo C4 para detectar responsabilidades ambiguas, ownership de datos, dependencias ocultas y niveles de detalle inadecuados.",
    content: `Actúa como un arquitecto externo que acaba de incorporarse al proyecto y necesita entender el sistema a partir de su modelo C4.

Modelo C4:
{{model}}

Contexto adicional conocido:
{{context}}

Revisa el modelo y busca específicamente:

- responsabilidades ambiguas o solapadas;
- ownership de datos poco claro;
- dependencias ocultas o relaciones sin dirección clara;
- relaciones bidireccionales que puedan indicar acoplamiento;
- componentes, containers o sistemas externos demasiado genéricos;
- detalles de implementación innecesarios para el nivel C4 mostrado;
- elementos importantes que falten;
- relaciones o niveles que parezcan inconsistentes entre sí.

Prioriza los problemas que dificultarían:

- comprender el sistema;
- localizar el ownership de una capacidad o dato;
- anticipar el impacto de un cambio;
- incorporar a nuevas personas al proyecto;
- evolucionar los límites y las dependencias.

Presenta el resultado en este orden:

1. Resumen de la comprensibilidad y utilidad del modelo.
2. Hallazgos priorizados con esta estructura:
   - nivel C4 y elemento afectado;
   - severidad (alta, media o baja);
   - problema observado;
   - evidencia en el modelo;
   - impacto sobre comprensión o evolución;
   - información necesaria para confirmar el hallazgo;
   - corrección recomendada para el modelo.
3. Elementos que parecen correctos y ayudan a entender el sistema.
4. Preguntas que harías al equipo durante una revisión.
5. Lista breve de cambios de documentación ordenados por impacto.

Reglas:

- Distingue un defecto del modelo de una ausencia de información del sistema.
- No inventes la arquitectura real que debería existir.
- No conviertas automáticamente una ambigüedad documental en un problema de diseño.
- Señala por separado los detalles de implementación que sobran y los elementos arquitectónicos que faltan.
- No propongas una reescritura ni una arquitectura alternativa salvo que sea imprescindible para explicar un hallazgo.
- Si el modelo no permite confirmar algo, formula la pregunta correspondiente y marca la conclusión como provisional.

Evalúa el modelo como herramienta de comunicación y evolución, no como una prueba de que la arquitectura sea técnicamente correcta.`,
    language: "es",
    module: "software-development",
    categories: ["software-architecture"],
    subcategories: ["c4-model"],
    tags: ["analysis", "checklist"],
    useCases: [
      "Revisar un modelo C4 antes de compartirlo con otros equipos",
      "Detectar problemas de ownership y dependencias en documentación arquitectónica",
      "Mejorar un modelo C4 para onboarding y evolución del sistema",
    ],
    notes:
      "Pasa primero el modelo C4 y después contrasta los hallazgos con las personas responsables de los datos, containers y relaciones señaladas.",
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "recommend-software-architecture",
    slug: "recomendar-arquitectura-software",
    title: "Recomendar una arquitectura de software según el contexto",
    description:
      "Descubrimiento guiado y comparación razonada de alternativas para recomendar una arquitectura de software simple, evolutiva y adecuada al dominio, los requisitos y la capacidad real del equipo.",
    content: `Actúa como un arquitecto o arquitecta de software sénior, pragmático y orientado a la toma de decisiones.

Tu objetivo es analizar un sistema real y recomendar una arquitectura adecuada a su contexto. No elijas por moda, no supongas que todo el sistema debe seguir el mismo estilo y no introduzcas complejidad sin una razón verificable.

## Proceso interactivo

Trabaja por rondas. En cada respuesta:

1. Resume brevemente lo que ya está confirmado.
2. Separa hechos, supuestos e incertidumbres.
3. Formula solo entre dos y tres preguntas nuevas, priorizadas por su impacto en la decisión.
4. No repitas información que el usuario ya haya proporcionado.
5. Explica en una frase por qué cada pregunta importante puede cambiar la recomendación.

No presentes un cuestionario completo de una vez. No emitas una recomendación definitiva hasta disponer de contexto suficiente. Si todavía falta información crítica, termina la respuesta en modo descubrimiento y pide únicamente la siguiente ronda de preguntas.

Empieza preguntando, en este orden:

1. ¿Qué sistema quieres construir o analizar y qué problema resuelve?
2. ¿Quién lo utilizará y cuáles son sus principales capacidades de negocio?
3. ¿Dónde están las reglas de negocio más complejas o las consecuencias más graves de un fallo?
4. ¿Es un sistema nuevo o existente?
5. ¿Qué restricciones importantes existen en volumen, disponibilidad, seguridad, equipo, presupuesto y plazo?

Adapta el orden y el contenido de las preguntas a las respuestas recibidas. Como mínimo, intenta conocer:

- usuarios, capacidades y límites naturales del dominio;
- complejidad de las reglas de negocio e invariantes;
- volumen, picos, latencia, disponibilidad, crecimiento y recuperación;
- dependencias externas, su criticidad y su estabilidad;
- seguridad, privacidad, auditoría y regulación;
- propiedad de los datos y necesidades de consistencia;
- número de desarrolladores y equipos, autonomía y experiencia operativa;
- necesidad real de despliegues independientes;
- presupuesto, plazo, restricciones técnicas y estado del sistema.

## Análisis

Cuando haya suficiente contexto, identifica y prioriza las fuerzas arquitectónicas:

- complejidad del dominio y límites de negocio;
- acoplamiento, cohesión y autonomía de equipos;
- escalabilidad, rendimiento, disponibilidad y resiliencia;
- consistencia, propiedad de datos y dependencias externas;
- seguridad, operabilidad, testabilidad, coste y velocidad de entrega;
- capacidad real del equipo para operar la solución.

Distingue explícitamente estos niveles, sin mezclarlos:

- organización del código y estructura de módulos;
- arquitectura lógica y dirección de dependencias;
- comunicación entre componentes;
- persistencia y propiedad de los datos;
- unidades de despliegue e infraestructura.

Evalúa solo alternativas razonables para el contexto, normalmente entre dos y cuatro. Considera, cuando aporten valor:

- capas simples;
- monolito modular;
- Vertical Slice;
- arquitectura hexagonal, Onion o Clean;
- microservicios;
- DDD estratégico o táctico;
- CQRS;
- arquitectura orientada a eventos;
- Event Sourcing;
- serverless;
- microkernel;
- Functional Core, Imperative Shell.

No trates estos enfoques como opciones mutuamente excluyentes cuando pertenezcan a niveles diferentes. Puedes combinar, por ejemplo, un monolito modular con Vertical Slice y arquitectura hexagonal solo en los módulos que tengan integraciones relevantes.

Para cada alternativa considerada, analiza:

- ventajas e inconvenientes;
- complejidad técnica y operativa;
- encaje con el dominio y con el equipo;
- riesgos y coste de equivocarse;
- facilidad de evolución y migración incremental.

Construye una matriz de decisión. Usa criterios derivados de las respuestas del usuario, asigna a cada criterio una prioridad relativa y puntúa las alternativas con una escala de 1 a 5. Justifica cada puntuación con evidencias del contexto y señala qué supuestos podrían cambiar el resultado. No presentes una puntuación con apariencia de precisión si faltan datos.

## Recomendación

Recomienda la solución más simple que satisfaga los requisitos conocidos. La recomendación debe poder diferir entre módulos y debe indicar:

- topología general: monolito, monolito modular, servicios, microservicios, serverless o combinación;
- módulos o límites de negocio propuestos, solo cuando estén justificados;
- arquitectura interna de cada módulo y dirección de dependencias;
- propiedad de los datos y necesidades de consistencia;
- comunicación síncrona o asíncrona y motivo de cada elección;
- integraciones externas y aislamiento de sus fallos;
- estrategia de pruebas;
- estrategia de despliegue y observabilidad, cuando sean relevantes;
- plan incremental de implementación o migración.

Aplica estas heurísticas:

- capas simples para CRUD y dominios sencillos;
- monolito modular para obtener límites claros sin complejidad distribuida;
- Hexagonal cuando haya dependencias externas relevantes o intercambiables;
- Clean u Onion cuando las reglas de negocio necesiten protección frente a frameworks e infraestructura;
- Vertical Slice cuando el sistema evolucione principalmente por funcionalidades;
- DDD estratégico para descubrir capacidades y límites;
- DDD táctico solo donde existan invariantes y comportamiento de dominio reales;
- CQRS solo cuando lectura y escritura tengan necesidades claramente diferentes;
- eventos solo cuando el desacoplamiento o la asincronía aporten valor concreto;
- microservicios solo con límites claros, equipos autónomos y necesidad real de despliegue independiente;
- Event Sourcing solo cuando el historial de eventos sea parte esencial del dominio, no como sustituto genérico de la auditoría.

No introduzcas interfaces, buses, eventos, capas, bounded contexts ni tecnologías concretas sin explicar qué problema resuelven. No recomiendes una reescritura completa sin evaluar una migración incremental.

## Formato final

Cuando el contexto sea suficiente, presenta:

1. Resumen del contexto.
2. Hechos, supuestos e incertidumbres.
3. Fuerzas arquitectónicas principales y prioridades.
4. Criterios y matriz de alternativas comparadas.
5. Arquitectura recomendada y justificación.
6. Módulos, responsabilidades y límites.
7. Reglas de dependencias y propiedad de datos.
8. Comunicación, integraciones y manejo de fallos.
9. Pruebas, despliegue y observabilidad.
10. Riesgos, trade-offs y mitigaciones.
11. Plan incremental.
12. Señales que justificarían evolucionar la arquitectura.
13. Nivel de confianza y datos que podrían cambiar la recomendación.

Incluye un diagrama textual sencillo. Si una sección no aplica, indícalo y explica por qué en lugar de rellenarla con recomendaciones genéricas.

No confundas una arquitectura recomendada con una lista de tecnologías. Presenta primero las decisiones y sus razones; menciona tecnologías concretas solo cuando las restricciones y los requisitos las justifiquen.`,
    language: "es",
    module: "software-development",
    categories: ["software-architecture"],
    subcategories: ["quality-attributes"],
    tags: ["analysis", "checklist", "template"],
    useCases: [
      "Elegir una arquitectura antes de iniciar un proyecto nuevo",
      "Definir una evolución incremental para un sistema existente",
      "Preparar una decisión arquitectónica con alternativas y trade-offs explícitos",
    ],
    notes:
      "Úsalo como conversación iterativa: responde a cada ronda de preguntas con el contexto disponible y valida las prioridades con las personas responsables del negocio y de la operación.",
    createdAt: "2026-08-02",
    updatedAt: "2026-08-02",
  },
  {
    id: "generate-unit-tests",
    slug: "generar-pruebas-unitarias",
    title: "Generar pruebas unitarias útiles",
    description:
      "Generación de pruebas unitarias centradas en comportamiento: casos felices, casos límite, errores y regresiones, evitando tests frágiles acoplados a la implementación.",
    content: `Actúa como un ingeniero de software experto en testing con {{language}} y {{test_framework}}.

Voy a darte una unidad de código (función, clase o módulo). Genera una suite de pruebas unitarias útil y mantenible.

Código a probar:
{{code}}

Contexto (qué hace en el sistema, dependencias, restricciones):
{{context}}

Sigue estas reglas:

1. Prueba comportamiento observable, no detalles de implementación. Nada de tests que rompan al renombrar una variable interna.
2. Cubre, en este orden: caso feliz principal, variantes del caso feliz, casos límite (vacío, nulo, cero, límites de rango, unicode), casos de error y, si aplica, regresiones de bugs conocidos que te indique.
3. Un concepto por test, con nombre descriptivo en lenguaje natural (por ejemplo: devuelve_error_cuando_el_importe_es_negativo).
4. Usa el patrón Arrange / Act / Assert con secciones claras.
5. Aísla las dependencias externas con dobles de prueba (mocks, stubs o fakes) y explica en una línea por qué elegiste cada uno.
6. Datos de prueba realistas y mínimos: nada de objetos gigantes cuando bastan dos campos.

Entrega:
- La lista de casos identificados antes del código, para revisar la cobertura de un vistazo.
- El código de la suite completo y ejecutable.
- Una nota final con lo que NO has probado y por qué (integración, rendimiento, concurrencia), para decidir si hacen falta otros niveles de prueba.`,
    language: "es",
    module: "software-development",
    categories: ["quality-and-testing"],
    subcategories: ["unit-testing"],
    tags: ["typescript"],
    useCases: [
      "Añadir tests a código nuevo antes de subir una PR",
      "Aumentar la cobertura de un módulo crítico",
      "Generar regresiones rápidas tras corregir un bug",
    ],
    notes:
      "Indica siempre el framework de test concreto (Vitest, Jest, Pytest, JUnit...) para que el código generado sea ejecutable sin adaptaciones.",
    createdAt: "2025-10-19",
    updatedAt: "2026-02-25",
  },
  {
    id: "investigate-production-incident",
    slug: "investigar-incidencia-produccion",
    title: "Investigar una incidencia en producción",
    description:
      "Guía estructurada para investigar una incidencia en producción: hipótesis ordenadas, comandos y consultas concretas, y plantilla de postmortem.",
    content: `Actúa como un ingeniero de fiabilidad (SRE) experimentado guiando la investigación de una incidencia en producción.

Descripción de la incidencia:
{{incident}}

Contexto del sistema (arquitectura, despliegues recientes, cambios de tráfico):
{{context}}

Telemetría disponible (logs, métricas, trazas; pega fragmentos si los tienes):
{{telemetry}}

Ayúdame en tres fases:

Fase 1 — Estabilizar:
- Resume el impacto en una frase (qué falla, a quién afecta, desde cuándo).
- Propón acciones de mitigación inmediatas ordenadas por relación riesgo/beneficio (rollback, feature flag, escalar, degradar funcionalidad).

Fase 2 — Diagnosticar:
- Genera una lista de hipótesis ordenadas de más a menos probable, cada una con la evidencia que la confirmaría o descartaría.
- Para cada hipótesis, dame las consultas concretas a ejecutar: filtros de logs, queries de métricas, análisis de trazas o comandos de sistema.
- Señala correlaciones típicas que debería comprobar (despliegue reciente ↔ inicio del fallo, pico de tráfico ↔ latencia, etc.).

Fase 3 — Aprender:
- Plantilla de postmortem sin culpables: línea temporal, causa raíz, factores contribuyentes, qué funcionó bien en la respuesta.
- Acciones de seguimiento clasificadas en: prevenir, detectar antes y responder mejor.

Reglas: no afirmes una causa raíz sin evidencia; distingue siempre entre "confirmado", "probable" y "por verificar"; prioriza restaurar el servicio sobre entenderlo todo.`,
    language: "es",
    module: "software-development",
    categories: ["observability"],
    subcategories: ["logs", "alerts"],
    tags: ["incident-response", "debugging"],
    useCases: [
      "Guiar a la persona de guardia durante una incidencia real",
      "Estructurar la investigación cuando hay presión y poca información",
      "Redactar el postmortem después de resolver la incidencia",
    ],
    createdAt: "2025-12-01",
    updatedAt: "2026-01-30",
  },
  {
    id: "improve-observability",
    slug: "improve-observability",
    title: "Design an observability improvement plan",
    description:
      "Audit and improve the observability of a service: structured logging, useful metrics, distributed tracing, actionable alerts and SLOs.",
    content: `You are an observability expert. Help me turn a service that is hard to debug into one that explains itself.

Service description (stack, architecture, current telemetry):
{{architecture}}

Recent incidents or debugging pain points:
{{context}}

Produce an observability improvement plan with these sections:

1. Current state audit. Based on what I described, list the blind spots: questions about production behavior that we cannot answer today with our telemetry.
2. Logs. Define the structured logging standard: format (JSON), mandatory fields (timestamp, level, service, trace_id, message), what to log at each level, and a short list of things we must never log (secrets, PII).
3. Metrics. Propose the RED/USE metrics that fit this service. For each metric: name, type (counter/gauge/histogram), labels, and the question it answers. Warn about cardinality traps.
4. Traces. Where to add spans, which attributes to attach, and how to propagate context across {{integrations}}.
5. Alerts. Convert the pain points into alert definitions. Every alert must be actionable: condition, threshold, why it matters, and the first thing to check when it fires. Delete or downgrade alerts that do not require human action.
6. SLOs. Propose one or two SLIs with target SLOs and the error budget policy.

Close with a prioritized implementation order: what gives the most debugging value in the first week, the first month, and the first quarter. Prefer open standards (OpenTelemetry) over vendor lock-in.`,
    language: "en",
    module: "software-development",
    categories: ["observability"],
    subcategories: ["metrics", "traces", "monitoring"],
    tags: ["checklist"],
    useCases: [
      "Improving a service that is painful to debug in production",
      "Defining logging and alerting standards for a team",
      "Preparing a service for on-call rotations",
    ],
    createdAt: "2025-11-22",
    updatedAt: "2026-03-15",
  },
  {
    id: "write-technical-decision-record",
    slug: "redactar-registro-decision-tecnica",
    title: "Redactar un registro de decisión técnica (ADR)",
    description:
      "Redacción de un Architecture Decision Record completo: contexto, opciones consideradas, decisión, consecuencias y plan de revisión.",
    content: `Actúa como un arquitecto de software que documenta decisiones de forma clara y honesta.

Necesito redactar un ADR (Architecture Decision Record) sobre la siguiente decisión:

Decisión a documentar:
{{decision}}

Contexto (problema, restricciones, fuerzas en tensión):
{{context}}

Opciones que se han barajado:
{{options}}

Genera el ADR completo con esta estructura:

1. Título: frase corta en forma de decisión ("Usamos X para Y").
2. Estado: propuesto / aceptado, con la fecha.
3. Contexto: el problema que obliga a decidir, las restricciones técnicas y de equipo, y las fuerzas en tensión (coste vs. velocidad, simplicidad vs. flexibilidad...). Escríbelo de forma que alguien que llegue al proyecto en un año lo entienda.
4. Opciones consideradas: para cada opción, descripción breve, ventajas, desventajas y por qué se descartó (si aplica). Sé justo con las opciones descartadas: nada de hombres de paja.
5. Decisión: la opción elegida y la justificación principal en dos o tres frases.
6. Consecuencias: qué mejora, qué empeora, qué deja de ser posible y qué trabajo nuevo genera.
7. Plan de revisión: en qué condiciones esta decisión debería revisarse (métricas, cambios de escala, hitos).

Tono: directo, sin marketing interno. Un ADR bueno permite estar en desacuerdo con la decisión entendiendo por qué se tomó.`,
    language: "es",
    module: "software-development",
    categories: ["software-architecture", "technical-documentation"],
    tags: ["template"],
    useCases: [
      "Documentar la elección de una base de datos, framework o patrón",
      "Dejar constancia de una decisión discutida en el equipo",
      "Onboarding: explicar por qué el sistema es como es",
    ],
    example:
      "Decisión: usar PostgreSQL con particionado por fecha en lugar de una base de datos de series temporales dedicada para las métricas de producto.",
    createdAt: "2025-10-08",
    updatedAt: "2026-01-12",
  },
  {
    id: "design-cicd-pipeline",
    slug: "disenar-pipeline-ci-cd",
    title: "Diseñar un pipeline de CI/CD",
    description:
      "Diseño completo de un pipeline de integración y despliegue continuos: etapas, calidad, seguridad, estrategia de despliegue y tiempos objetivo.",
    content: `Actúa como un ingeniero de plataforma especializado en CI/CD.

Diseña un pipeline de integración y despliegue continuos para el siguiente proyecto:

Descripción del proyecto (stack, tipo de artefacto, entornos):
{{context}}

Restricciones y requisitos:
{{requirements}}

Entrega el diseño con esta estructura:

1. Visión general: diagrama de etapas en texto (commit → build → … → producción) con el objetivo de cada etapa y su tiempo objetivo. El pipeline completo hasta artefacto desplegable no debería superar los 10-15 minutos; justifica cualquier etapa más lenta.
2. Etapas de integración: instalación de dependencias (con caché), compilación, lint, análisis estático, pruebas unitarias, pruebas de integración. Indica qué se ejecuta en paralelo y qué bloquea el merge.
3. Seguridad: escaneo de dependencias, de secretos y de imagen/artefacto; gestión de credenciales del pipeline (nada de secretos en el YAML).
4. Empaquetado y versionado: cómo se construye el artefacto una sola vez y se promociona entre entornos; esquema de versionado.
5. Estrategia de despliegue: rolling, blue-green o canary, con criterios de elección; rollback automático y manual.
6. Calidad del propio pipeline: tiempos por etapa, detección de tests inestables, métricas DORA que conviene vigilar.
7. Definición del pipeline: esqueleto en YAML para {{ci_tool}} con las etapas principales.

Prioriza la velocidad de feedback: lo que falla más a menudo debe ejecutarse primero.`,
    language: "es",
    module: "software-development",
    categories: ["ci-cd", "devops"],
    subcategories: ["automation", "deployments"],
    tags: ["docker", "checklist"],
    useCases: [
      "Montar CI/CD desde cero en un proyecto nuevo",
      "Reducir el tiempo de feedback de un pipeline lento",
      "Añadir despliegues seguros con rollback a un pipeline existente",
    ],
    createdAt: "2025-11-14",
    updatedAt: "2026-02-03",
  },
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
    categories: ["databases", "performance"],
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
    id: "threat-modeling",
    slug: "modelado-de-amenazas",
    title: "Realizar un modelado de amenazas",
    description:
      "Sesión guiada de threat modeling con STRIDE: diagrama de flujo de datos, enumeración de amenazas, priorización por riesgo y mitigaciones concretas.",
    content: `Actúa como un ingeniero de seguridad facilitando una sesión de threat modeling.

Descripción del sistema o funcionalidad a analizar:
{{architecture}}

Contexto: datos que maneja, usuarios, exposición (internet, red interna), cumplimiento aplicable:
{{context}}

Guíame por un modelado de amenazas completo:

1. Modelo del sistema: describe el diagrama de flujo de datos en texto (procesos, almacenes de datos, flujos, entidades externas) y, sobre todo, marca las fronteras de confianza. Las amenazas viven en las fronteras.
2. Enumeración de amenazas: recorre cada elemento del diagrama con STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege). Para cada amenaza: descripción concreta en este sistema (nada genérico), escenario de ataque plausible y activo afectado.
3. Priorización: estima cada amenaza con probabilidad × impacto (alto/medio/bajo) y justifica la estimación. Ordena la lista de mayor a menor riesgo.
4. Mitigaciones: para las amenazas altas y medias, propón controles concretos (validación, autenticación, cifrado, límites de tasa, logging...) indicando si mitigan, detectan o transfieren el riesgo, y el coste aproximado de implementarlos.
5. Riesgo residual: qué amenazas aceptamos conscientemente y por qué.

Cierra con una tabla resumen: amenaza, categoría STRIDE, riesgo, mitigación, responsable sugerido y estado.

Sé específico para mi sistema: prefiero diez amenazas concretas a cincuenta genéricas de una checklist.`,
    language: "es",
    module: "software-development",
    categories: ["software-security"],
    tags: ["checklist", "api"],
    useCases: [
      "Analizar una funcionalidad nueva antes de implementarla",
      "Revisar la seguridad de un sistema expuesto a internet",
      "Preparar la documentación de seguridad para una auditoría",
    ],
    createdAt: "2025-12-18",
    updatedAt: "2026-02-20",
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
    categories: ["version-control"],
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
    id: "debug-frontend-issue",
    slug: "depurar-error-frontend",
    title: "Depurar un error de frontend sistemáticamente",
    description:
      "Método sistemático para depurar un problema de frontend: reproducir, acotar, formar hipótesis y localizar la causa raíz sin cambios al azar.",
    content: `Actúa como un desarrollador frontend senior experto en {{framework}} y en las herramientas de depuración del navegador.

Tengo un problema de frontend y quiero depurarlo de forma sistemática, sin probar cambios al azar.

Síntoma (qué debería pasar y qué pasa en realidad):
{{symptom}}

Código relevante:
{{code}}

Contexto (navegadores afectados, desde cuándo, cambios recientes, errores de consola):
{{context}}

Guíame por este proceso:

1. Reproducción: define los pasos mínimos para reproducir el problema de forma fiable. Si es intermitente, propón qué instrumentación añadir para capturarlo.
2. Acotar el problema: clasifícalo (renderizado, estado, datos, red, eventos, estilos, concurrencia) y propón comprobaciones rápidas para descartar categorías enteras (por ejemplo: ¿llega bien el dato de la API? ¿el estado se actualiza? ¿falla solo el render?).
3. Hipótesis: lista las causas posibles ordenadas por probabilidad, con la comprobación concreta que confirma o descarta cada una (qué breakpoint poner, qué log añadir, qué mirar en la pestaña Network o en React DevTools).
4. Causa raíz: una vez localizada, explica por qué ocurre, no solo dónde. Distingue entre el error que ves y la decisión de diseño que lo permitió.
5. Corrección: propón el arreglo mínimo y, por separado, el arreglo estructural si existe.
6. Prevención: qué test (unitario, de integración o e2e) habría detectado este bug, y escríbelo.

Regla de oro: cada paso debe reducir el espacio de búsqueda. Nada de "prueba a actualizar las dependencias".`,
    language: "es",
    module: "software-development",
    categories: ["frontend-development", "web-development"],
    tags: ["debugging", "react", "typescript"],
    useCases: [
      "Depurar un bug de interfaz difícil de reproducir",
      "Investigar un problema de estado o renderizado en React",
      "Diagnosticar diferencias de comportamiento entre navegadores",
    ],
    createdAt: "2025-10-27",
    updatedAt: "2026-02-14",
  },
  {
    id: "review-docker-configuration",
    slug: "review-docker-configuration",
    title: "Review a Dockerfile and Compose setup",
    description:
      "Security and efficiency review of a Dockerfile and docker-compose setup: image size, layers, caching, non-root execution, secrets and healthchecks.",
    content: `You are a DevOps engineer specialized in containers. Review my container setup with a focus on security, image size and build speed.

Dockerfile:
{{code}}

docker-compose.yml (if any):
{{compose}}

Context (what the app does, how the image is built and deployed):
{{context}}

Review the following, in priority order:

1. Security:
   - Running as root? Provide the exact instructions to create and switch to a non-root user.
   - Secrets: build-time secrets, leaked env vars, credentials in layers. Show the correct alternative (BuildKit secrets, runtime env).
   - Base image: known-heavy or unmaintained tags, mutable tags in production (latest), unnecessary attack surface.
2. Image size and layers:
   - Multi-stage build opportunities (show the restructured Dockerfile).
   - Layer ordering for cache efficiency, combined RUN commands, cleanup of package manager caches, .dockerignore contents.
3. Build performance:
   - Dependency installation cached separately from source code copy.
   - BuildKit cache mounts where they help.
4. Runtime correctness:
   - CMD vs ENTRYPOINT, signal handling (PID 1 problem), healthchecks, restart policies, resource limits.
   - In compose: dependency ordering, networks, volumes, and config that must differ between development and production.

Output: findings ordered by severity, each with the offending lines and the corrected version. End with the full rewritten Dockerfile applying all fixes.

Base image preference: official, minimal (alpine or distroless when the runtime allows it), pinned by digest for production.`,
    language: "en",
    module: "software-development",
    categories: ["devops"],
    subcategories: ["containers"],
    tags: ["docker", "checklist"],
    useCases: [
      "Hardening images before deploying to production",
      "Reducing image size and CI build times",
      "Reviewing a compose setup that only works on the author's machine",
    ],
    createdAt: "2025-11-30",
    updatedAt: "2026-03-20",
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
    categories: ["databases"],
    tags: ["migration", "sql", "postgresql"],
    useCases: [
      "Migrar esquema en producción sin parar el servicio",
      "Mover datos entre tablas o sistemas de forma segura",
      "Planificar un cambio destructivo (borrar columna, cambiar tipo) sin sustos",
    ],
    createdAt: "2026-01-09",
    updatedAt: "2026-03-28",
  },
  {
    id: "write-integration-tests",
    slug: "escribir-pruebas-de-integracion",
    title: "Escribir pruebas de integración para una API",
    description:
      "Diseño e implementación de pruebas de integración para una API: entorno aislado, datos de prueba, contratos, errores y limpieza entre tests.",
    content: `Actúa como un ingeniero de software experto en testing de APIs con {{language}} y {{test_framework}}.

Quiero escribir pruebas de integración para los siguientes endpoints:

Endpoints y comportamiento esperado:
{{endpoints}}

Contexto (stack, base de datos, servicios externos, autenticación):
{{context}}

Diseña la suite completa:

1. Estrategia de entorno: cómo levantar un entorno aislado por ejecución (base de datos efímera o contenedor, esquema migrado, puertos aleatorios) y cómo simular los servicios externos (servidor HTTP falso o grabaciones). Justifica la elección frente a mocks profundos.
2. Gestión de datos de prueba: factories o fixtures mínimos por test, aislamiento entre tests (transacción con rollback o recreación) y limpieza. Nada de tests que dependan del orden de ejecución.
3. Casos a cubrir por endpoint: contrato del caso feliz (status, cabeceras, esquema del cuerpo), validaciones de entrada, autenticación y autorización, recursos inexistentes, conflictos (duplicados, concurrencia) y comportamiento ante el fallo del servicio externo.
4. Aserciones de calidad: verifica también los efectos laterales relevantes (fila creada en base de datos, evento emitido), no solo la respuesta HTTP.
5. Fiabilidad: cómo evitar tests inestables (timeouts, relojes, aleatoriedad, datos compartidos) y cuánto debería tardar la suite.

Entrega: la estructura de la suite, el código de al menos dos tests completos representativos (uno de caso feliz y uno de error), y la configuración del entorno de pruebas.`,
    language: "es",
    module: "software-development",
    categories: ["quality-and-testing", "apis-and-integrations"],
    subcategories: ["integration-testing"],
    tags: ["api", "typescript"],
    useCases: [
      "Cubrir con tests los endpoints críticos de una API",
      "Detectar regresiones de contrato antes de desplegar",
      "Probar la integración real con base de datos en CI",
    ],
    createdAt: "2026-01-22",
    updatedAt: "2026-04-05",
  },
  {
    id: "document-module",
    slug: "documentar-modulo-tecnico",
    title: "Documentar un módulo técnico",
    description:
      "Generación de documentación técnica útil para un módulo: propósito, API pública, ejemplos de uso, decisiones de diseño y guía de contribución.",
    content: `Actúa como un ingeniero de software que escribe documentación técnica que la gente realmente lee.

Voy a darte el código de un módulo. Escribe su documentación.

Código del módulo:
{{code}}

Contexto (dónde encaja en el sistema, quién lo usa):
{{context}}

Estructura de la documentación:

1. Qué es y para qué sirve: dos o tres frases que respondan "¿cuándo usaría yo esto?". Si el nombre del módulo no lo deja claro, este apartado ha fallado.
2. Inicio rápido: el ejemplo mínimo que funciona, copiable y pegable, con el resultado esperado.
3. API pública: para cada función o clase exportada: firma, parámetros, valor de retorno, errores que puede lanzar y un ejemplo corto. Marca claramente qué es estable y qué es experimental.
4. Cómo funciona por dentro: un resumen de una página del diseño interno: componentes, flujo de datos y las dos o tres decisiones de diseño más importantes con su motivo. Sin volcar el código: enlaza a los archivos clave.
5. Casos límite y advertencias: comportamiento con entradas raras, límites conocidos, cosas que NO hace (y qué usar en su lugar).
6. Contribución: cómo ejecutar los tests, convenciones del código y dónde pedir ayuda.

Reglas de estilo: frases cortas, ejemplos antes que explicaciones, nada de documentar lo obvio ("este parámetro es el nombre"), y cada afirmación debe poder comprobarse en el código. Si algo del código es confuso, no lo maquilles en la documentación: señálalo como mejora pendiente.`,
    language: "es",
    module: "software-development",
    categories: ["technical-documentation"],
    tags: ["template"],
    useCases: [
      "Documentar una librería interna antes de compartirla entre equipos",
      "Crear el README de un módulo crítico",
      "Mejorar el onboarding de nuevas personas al proyecto",
    ],
    createdAt: "2025-12-28",
    updatedAt: "2026-02-08",
  },
];
