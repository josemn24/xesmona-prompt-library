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
    category: "quality-security-performance",
    subcategories: ["code-review"],
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
    category: "maintenance-and-evolution",
    subcategories: ["legacy-code", "refactoring"],
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
    category: "backend-and-apis",
    subcategories: ["rest-api-design"],
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
    category: "software-architecture",
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
    category: "software-architecture",
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
    category: "software-architecture",
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
    category: "software-architecture",
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
    id: "analyze-internal-application-organization",
    slug: "analizar-organizacion-interna",
    title: "Analizar la organización interna de una aplicación",
    description:
      "Diagnóstico de la estructura interna de una aplicación para identificar su organización dominante, la localización de cambios, la cohesión, el acoplamiento y su capacidad de evolución.",
    content: `Actúa como un arquitecto de software que analiza la estructura interna de una aplicación existente.

Descripción de la aplicación y estructura del código:
{{application}}

Contexto adicional (equipo, ritmo de cambios, problemas conocidos y stack):
{{context}}

Identifica si la aplicación está organizada principalmente por:

- capas técnicas;
- funcionalidades;
- módulos;
- componentes;
- casos de uso;
- una combinación de varias estrategias.

No infieras la organización solo por los nombres de las carpetas: contrasta la estructura física con las dependencias reales y el flujo de ejecución.

Evalúa:

- localización de cambios;
- cohesión;
- acoplamiento;
- facilidad para descubrir código;
- encapsulación;
- testabilidad;
- capacidad de evolución.

Para cada dimensión:

1. Describe la situación observada.
2. Cita la evidencia disponible: directorios, módulos, dependencias, imports, interfaces, tests o flujos.
3. Indica si el problema es confirmado, probable o no puede determinarse.
4. Explica qué tipo de cambio futuro lo haría especialmente costoso: nueva funcionalidad, cambio de persistencia, integración externa, modificación transversal, escalado del equipo u otro.

Presenta el resultado en este orden:

1. Resumen de la organización dominante y de las combinaciones detectadas.
2. Mapa breve de las fronteras y dependencias principales.
3. Evaluación por dimensión.
4. Problemas priorizados, con evidencia, impacto y cambio futuro que los agravaría.
5. Preguntas abiertas y datos que faltan para confirmar el diagnóstico.

Reglas:

- No propongas todavía una reorganización completa.
- No confundas una estructura diferente de la preferida con un problema.
- Distingue acoplamiento entre módulos, acoplamiento a infraestructura y acoplamiento a detalles de implementación.
- Señala los casos en los que una frontera parece existir en los directorios, pero no está protegida por dependencias o encapsulación.
- No inventes módulos ni dependencias que no aparezcan en la descripción.
- Si la información no permite evaluar una dimensión, indícalo en lugar de rellenarla con recomendaciones genéricas.

El objetivo es producir un diagnóstico útil para comparar estrategias de organización en una fase posterior.`,
    language: "es",
    module: "software-development",
    category: "software-architecture",
    subcategories: ["application-structure"],
    tags: ["analysis", "checklist"],
    useCases: [
      "Diagnosticar la estructura de un código existente antes de reorganizarlo",
      "Identificar por qué los cambios atraviesan demasiadas partes de una aplicación",
      "Preparar una revisión de modularidad con un equipo de desarrollo",
    ],
    notes:
      "Proporciona un árbol de directorios junto con ejemplos de dependencias y flujos relevantes; la estructura de carpetas por sí sola no demuestra una frontera.",
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "compare-application-organization-strategies",
    slug: "comparar-estrategias-de-organizacion",
    title: "Comparar estrategias de organización interna",
    description:
      "Comparación contextual de organización por capas, funcionalidades, módulos de dominio, casos de uso y vertical slices sin asumir un ganador universal.",
    content: `Actúa como un arquitecto de software especializado en organización interna y diseño modular.

Compara las siguientes estrategias de organización para esta aplicación:

- paquetes por capa técnica;
- organización por funcionalidad;
- módulos de dominio;
- organización por casos de uso;
- vertical slices.

Contexto:
{{context}}

Si se conoce, organización actual:
{{current_structure}}

Evalúa cada alternativa según:

- tamaño del sistema;
- tamaño y estructura del equipo;
- frecuencia y distribución de cambios;
- independencia entre funcionalidades;
- necesidad de reutilización;
- complejidad del dominio;
- testabilidad;
- facilidad de onboarding;
- coste y riesgo de transición desde la organización actual.

Para cada estrategia explica:

1. Cómo estructura el código y dónde coloca las dependencias.
2. Qué tipo de cambios localiza bien y cuáles tiende a dispersar.
3. Qué límites y responsabilidades hace visibles.
4. Qué problemas de acoplamiento, duplicación o descubribilidad puede introducir.
5. Qué capacidades necesita el equipo para mantenerla.
6. Bajo qué condiciones la elegirías.
7. Bajo qué condiciones dejaría de ser una buena opción.

Distingue explícitamente:

- organización física del código;
- modularidad lógica;
- dirección de dependencias;
- reutilización;
- unidades de despliegue.

No trates las estrategias como mutuamente excluyentes cuando puedan combinarse por niveles. Por ejemplo, una aplicación puede organizarse por módulos de dominio, contener casos de uso dentro de cada módulo y aplicar vertical slices solo a funcionalidades con alta frecuencia de cambio.

Presenta el resultado en este orden:

1. Hechos, supuestos e incertidumbres del contexto.
2. Tabla comparativa de las cinco estrategias.
3. Condiciones que favorecen cada estrategia.
4. Riesgos y costes de transición.
5. Preguntas cuya respuesta podría cambiar la elección.

Reglas:

- No determines un ganador universal.
- No recomiendes una estrategia por moda o por familiaridad con una tecnología.
- No inventes el tamaño del sistema, del equipo ni la complejidad del dominio.
- Distingue una estrategia que encaja bien en teoría de una que el equipo puede sostener en la práctica.
- Si el contexto es insuficiente, formula preguntas concretas y ofrece conclusiones condicionales.

Prioriza la capacidad de localizar cambios y mantener límites comprensibles sobre la apariencia de una estructura ideal.`,
    language: "es",
    module: "software-development",
    category: "software-architecture",
    subcategories: ["application-structure"],
    tags: ["analysis", "template"],
    useCases: [
      "Comparar una reorganización por funcionalidades con una estructura por capas",
      "Elegir una estrategia de modularidad para un sistema nuevo o existente",
      "Preparar una decisión de organización interna con el equipo",
    ],
    notes:
      "Úsalo después de diagnosticar la organización actual. La estrategia elegida puede variar entre módulos si el dominio y el ritmo de cambio no son homogéneos.",
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "migrate-layers-to-vertical-slices",
    slug: "migrar-de-capas-a-vertical-slices",
    title: "Migrar progresivamente de capas a vertical slices",
    description:
      "Planificación de una migración incremental desde Controller, Service y Repository hacia vertical slices, manteniendo el comportamiento y permitiendo la convivencia temporal.",
    content: `Actúa como un arquitecto de software especializado en migraciones incrementales y evolución de código existente.

Propón una estrategia incremental para evolucionar esta organización:

Controller → Service → Repository

Descripción de la aplicación y estructura actual:
{{application}}

Restricciones:

- no realizar una reescritura big-bang;
- mantener el comportamiento observable;
- permitir la convivencia temporal de ambas organizaciones;
- minimizar cambios transversales.

Antes de proponer pasos, identifica:

1. Los casos de uso actuales y sus fronteras.
2. Las dependencias compartidas entre controllers, services y repositories.
3. Los efectos laterales, contratos públicos y puntos de entrada que deben preservarse.
4. La cobertura de tests y las zonas donde habría que crear caracterización o tests de contrato.
5. Los candidatos de migración ordenados por riesgo, independencia, frecuencia de cambio y facilidad de verificación.

Para cada caso de uso candidato indica:

- por qué es un buen o mal candidato inicial;
- qué código se movería o encapsularía;
- qué dependencias quedarían dentro del slice;
- qué dependencias seguirían apuntando temporalmente a la organización antigua;
- cómo se mantiene la compatibilidad;
- cómo se verifica que el comportamiento no ha cambiado;
- cuál sería el criterio de terminado;
- cómo se revierte el paso si aparece una regresión.

Diseña una secuencia de migración por fases que incluya:

- preparación e instrumentación;
- primer slice de bajo riesgo;
- reglas de convivencia;
- migración progresiva de casos de uso;
- tratamiento de código compartido;
- prevención de nuevas dependencias hacia capas antiguas;
- retirada de adapters o fachadas temporales;
- criterios para detener, revisar o cancelar la migración.

Presenta el resultado en este orden:

1. Supuestos e incertidumbres.
2. Mapa de la organización actual.
3. Tabla de candidatos priorizados.
4. Estrategia de convivencia entre capas y vertical slices.
5. Plan incremental paso a paso.
6. Riesgos, regresiones posibles y señales de alerta.
7. Criterios de éxito y de abandono.

Reglas:

- No propongas una reescritura completa.
- No cambies comportamiento y estructura sin indicar cómo se verifica cada uno por separado.
- No muevas primero abstracciones compartidas sin demostrar que su ownership está claro.
- No fuerces todos los casos de uso a la misma forma si sus dependencias o ritmos de cambio son distintos.
- No inventes límites de dominio, cobertura de tests ni dependencias que no aparezcan en el contexto.
- La migración debe poder detenerse después de cualquier fase dejando el sistema funcionando.`,
    language: "es",
    module: "software-development",
    category: "software-architecture",
    subcategories: ["application-structure"],
    tags: ["analysis", "migration", "checklist"],
    useCases: [
      "Evolucionar una aplicación por capas sin una reescritura completa",
      "Migrar casos de uso de Controller-Service-Repository a vertical slices",
      "Planificar la convivencia temporal entre una estructura antigua y otra nueva",
    ],
    notes:
      "Acompáñalo con tests de caracterización y migra primero un caso de uso con límites claros, pocas dependencias compartidas y una verificación sencilla.",
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
    category: "software-architecture",
    subcategories: ["architecture-decisions"],
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
    category: "software-architecture",
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
    category: "software-architecture",
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
    category: "software-architecture",
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
    category: "software-architecture",
    subcategories: ["architecture-decisions"],
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
    category: "quality-security-performance",
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
    category: "observability",
    subcategories: ["incident-response", "logs", "alerts"],
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
    category: "observability",
    subcategories: ["observability-improvement", "metrics", "traces", "monitoring"],
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
    category: "software-architecture",
    subcategories: ["architecture-decisions"],
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
    category: "delivery-and-deployment",
    subcategories: ["ci-cd-pipelines", "automation", "deployments"],
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
    category: "quality-security-performance",
    subcategories: ["software-security"],
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
    id: "setup-supabase-local-project",
    slug: "configurar-supabase-local-desde-cero",
    title: "Configurar Supabase local desde cero",
    description:
      "Plan breve y adaptado al repositorio para preparar y arrancar Supabase local desde cero.",
    content: `Actúa como un ingeniero experto en desarrollo local.

Configura y arranca Supabase local desde cero en este repositorio. Antes de actuar, consulta la documentación oficial actual:

- https://supabase.com/docs/guides/local-development
- https://supabase.com/docs/guides/local-development/cli/getting-started
- https://supabase.com/docs/guides/local-development/cli-workflows

Inspecciona el repositorio y adapta la solución al framework, package manager y convenciones existentes.

Realiza únicamente estas tareas:

- comprueba que exista un runtime compatible con Docker;
- instala la CLI como dependencia de desarrollo si falta;
- inicializa \`supabase/\`;
- arranca el stack local y muestra cómo comprobar su estado.

No añadas todavía scripts de \`package.json\`, esquema, migraciones, seed, tipos ni variables de entorno. No ejecutes acciones remotas como \`login\`, \`link\` o \`db push\`. No sobrescribas cambios existentes.

Entrega:

1. decisiones tomadas;
2. archivos creados o modificados;
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

- https://supabase.com/docs/guides/local-development/cli/getting-started
- https://supabase.com/docs/guides/local-development/cli-workflows

Inspecciona el package manager, los scripts existentes y si la CLI está instalada localmente.

Incluye como mínimo scripts para:

- iniciar Supabase;
- consultar su estado;
- detenerlo;
- resetear la base de datos local.

Propón solo otros scripts claramente útiles para este proyecto, por ejemplo para crear migraciones, generar tipos, ejecutar lint o lanzar tests. Conserva los scripts existentes y marca explícitamente cualquier comando destructivo.

Entrega el cambio en formato diff, explica brevemente cada script y muestra los comandos de uso con sus argumentos cuando corresponda.`,
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

- https://supabase.com/docs/guides/local-development/managing-config
- https://supabase.com/docs/guides/local-development/cli-workflows

Inspecciona el framework, los archivos de entorno existentes, el \`.gitignore\`, \`supabase/config.toml\` y cómo la aplicación lee sus variables.

Realiza solo los cambios necesarios para:

- crear o actualizar un archivo de ejemplo sin valores secretos;
- excluir del control de versiones los archivos de entorno locales;
- configurar la URL local y la clave pública de Supabase según las convenciones del proyecto;
- mantener cualquier clave secreta o de administración únicamente en el servidor;
- usar referencias \`env(...)\` en \`config.toml\` cuando la configuración local necesite secretos.

No inventes credenciales, no expongas secretos al cliente y no ejecutes acciones remotas. Conserva la configuración existente y señala cualquier variable cuyo origen o ámbito no esté claro.

Entrega:

1. el diff de los archivos modificados;
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
    id: "evaluate-rendering-strategies",
    slug: "evaluar-estrategias-de-renderizado",
    title: "Evaluar estrategias de renderizado para una aplicación",
    description:
      "Evaluación por página y componente de estrategias de renderizado según SEO, personalización, actualización, interactividad, caché, latencia, coste y complejidad.",
    content: `Actúa como un arquitecto frontend especializado en renderizado web y rendimiento.

Para cada página o componente de esta aplicación determina la estrategia de rendering más apropiada:

- client-side rendering;
- server-side rendering;
- static generation;
- incremental regeneration;
- islands;
- híbrido.

Descripción de la aplicación, páginas y componentes:
{{application}}

Contexto técnico y de negocio:
{{context}}

Si se conoce, framework, infraestructura y estrategia actual:
{{stack}}

Antes de elegir una estrategia:

1. Identifica las páginas y componentes relevantes.
2. Separa hechos, supuestos e incertidumbres.
3. Distingue contenido público de contenido personalizado.
4. Identifica datos remotos, frecuencia de actualización, dependencias de sesión y necesidades de interacción.
5. Señala restricciones del framework o de la infraestructura que limiten las opciones.

Evalúa cada página o componente según:

- SEO;
- personalización;
- frecuencia de actualización;
- interactividad;
- caché e invalidación;
- latencia percibida;
- coste de servidor;
- coste de cliente;
- complejidad operativa y de desarrollo.

Para cada elemento entrega:

- estrategia recomendada, o combinación de estrategias;
- razones basadas en el contexto;
- datos que se generan o cargan en cada frontera;
- estrategia de caché y revalidación;
- impacto sobre SEO y latencia;
- riesgos y trade-offs;
- nivel de confianza;
- información que podría cambiar la decisión.

Presenta el resultado en este orden:

1. Mapa de páginas y componentes.
2. Tabla de decisión por elemento.
3. Fronteras de renderizado y flujo de datos.
4. Estrategia de caché, invalidación y actualización.
5. Riesgos, complejidad y preguntas pendientes.

Reglas:

- No elijas una única estrategia global si diferentes partes tienen necesidades distintas.
- No confundas server-side rendering con una garantía automática de buen rendimiento.
- No supongas que static generation o incremental regeneration son adecuadas si hay personalización por usuario.
- Considera el coste de invalidar contenido y mantener coherencia con las fuentes de datos.
- Menciona tecnologías concretas solo si el stack proporcionado las justifica.
- No inventes requisitos de SEO, tráfico, frecuencia de cambios ni necesidades de sesión.
- Si una estrategia depende de una capacidad concreta del framework, márcala como supuesto verificable.`,
    language: "es",
    module: "software-development",
    category: "frontend-and-experience",
    subcategories: ["rendering-strategies"],
    tags: ["analysis", "checklist", "template"],
    useCases: [
      "Elegir rendering por página en una aplicación web",
      "Equilibrar SEO, interactividad y coste de servidor",
      "Revisar una estrategia de caché y revalidación frontend",
    ],
    notes:
      "Proporciona el framework y la infraestructura si quieres recomendaciones concretas sobre SSR, generación estática, revalidación o islands.",
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "classify-frontend-state",
    slug: "clasificar-estado-frontend",
    title: "Clasificar y simplificar el estado frontend",
    description:
      "Clasificación del estado frontend entre estado remoto, UI local, estado compartido, URL, persistencia local y estado derivado, detectando duplicaciones innecesarias.",
    content: `Actúa como un arquitecto frontend especializado en gestión de estado y límites de responsabilidad.

Clasifica el estado utilizado por esta aplicación frontend en:

- server state;
- local UI state;
- shared client state;
- URL state;
- persisted local state;
- derived state.

Descripción de la aplicación, componentes y flujos:
{{application}}

Estado y mecanismos actuales (stores, cachés, props, URL, almacenamiento local y fetching):
{{state}}

Contexto técnico y restricciones:
{{context}}

Para cada pieza de estado identifica:

- nombre y ubicación;
- quién la produce;
- quién la consume;
- fuente de verdad;
- alcance;
- duración;
- mecanismo actual;
- categoría adecuada;
- si está duplicada o derivada de otra fuente;
- riesgo de desincronización;
- justificación de la clasificación.

Detecta especialmente datos remotos que estén siendo copiados innecesariamente a un store global. Distingue entre:

- caché de datos remotos;
- estado de sesión;
- preferencias persistentes;
- estado efímero de interfaz;
- estado compartido entre componentes;
- estado derivado.

Para cada problema encontrado explica:

1. qué fuente debería ser la autoridad;
2. qué mecanismo debería gestionar el estado;
3. qué duplicación o sincronización podría eliminarse;
4. qué componentes y tests se verían afectados;
5. qué riesgo tendría cambiarlo.

Presenta el resultado en este orden:

1. Inventario de estado y fuentes de verdad.
2. Tabla de clasificación.
3. Duplicaciones, estados derivados almacenados y datos remotos mal ubicados.
4. Fronteras recomendadas entre server state, UI state y estado del cliente.
5. Preguntas y decisiones pendientes.

Reglas:

- No asumas una librería concreta ni recomiendes un store global por defecto.
- No trates todo dato compartido como shared client state: comprueba si es remoto, derivado o representable en la URL.
- No almacenes como estado aquello que pueda calcularse de forma barata y fiable a partir de una fuente existente.
- Distingue persistencia local de cache de datos remotos.
- Si no se conoce el ciclo de vida o la fuente de verdad, marca la conclusión como provisional.
- No propongas una reescritura completa de la gestión de estado: prioriza problemas y cambios localizados.`,
    language: "es",
    module: "software-development",
    category: "frontend-and-experience",
    subcategories: ["frontend-state"],
    tags: ["analysis", "checklist"],
    useCases: [
      "Auditar el estado de una aplicación frontend",
      "Detectar datos remotos duplicados en stores globales",
      "Simplificar la gestión de estado antes de añadir una nueva funcionalidad",
    ],
    notes:
      "Incluye la fuente de datos remotos y el ciclo de vida de cada store; sin esa información no puede distinguirse un cache legítimo de una duplicación accidental.",
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
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
    category: "frontend-and-experience",
    subcategories: ["frontend-debugging"],
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
    category: "delivery-and-deployment",
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
    category: "quality-security-performance",
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
    category: "maintenance-and-evolution",
    subcategories: ["technical-documentation"],
    tags: ["template"],
    useCases: [
      "Documentar una librería interna antes de compartirla entre equipos",
      "Crear el README de un módulo crítico",
      "Mejorar el onboarding de nuevas personas al proyecto",
    ],
    createdAt: "2025-12-28",
    updatedAt: "2026-02-08",
  },
  {
    id: "evaluate-architecture-evolvability",
    slug: "evaluar-evolucion-arquitectura",
    title: "Evaluar la capacidad de evolución de una arquitectura",
    description:
      "Análisis de cómo respondería una arquitectura ante escenarios de cambio reales: crecimiento, nuevos requisitos, fallos de proveedores y restricciones regulatorias.",
    content: `Actúa como un arquitecto de software evaluando la capacidad de evolución de un sistema.

Descripción de la arquitectura:
{{architecture}}

Evalúa cómo respondería esta arquitectura ante los siguientes escenarios:

1. El tráfico crece 10×.
2. El número de desarrolladores pasa de 8 a 40.
3. Uno de los proveedores críticos deja de estar disponible.
4. Aparece un requisito de residencia regional de datos.
5. Una funcionalidad necesita desplegarse independientemente.
6. El modelo de datos principal debe cambiar.

Para cada escenario identifica:

- Componentes afectados.
- Cambios necesarios.
- Blast radius (qué otras partes del sistema se ven impactadas).
- Riesgos.
- Decisiones arquitectónicas que dificultan el cambio.

Finalmente identifica los 3 puntos de mayor rigidez estructural de la arquitectura.

Reglas:

- Sé específico: señala componentes, capas o decisiones concretas, no generalidades.
- Distingue entre cambios que requieren refactor local y cambios que obligan a rediseñar.
- Si un escenario no aplica al contexto descrito, indícalo y explica por qué.
- No propongas una arquitectura alternativa: el objetivo es diagnosticar la actual.`,
    language: "es",
    module: "software-development",
    category: "software-architecture",
    subcategories: ["quality-attributes"],
    tags: ["analysis", "checklist"],
    useCases: [
      "Evaluar si una arquitectura aguantará el crecimiento previsto",
      "Preparar una revisión de arquitectura antes de un cambio de escala",
      "Identificar puntos de rigidez antes de planificar una evolución",
    ],
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "define-architecture-fitness-functions",
    slug: "definir-fitness-functions-arquitectura",
    title: "Definir tests arquitectónicos y fitness functions",
    description:
      "Conversión de decisiones y principios arquitectónicos en tests automatizables: dependencias prohibidas y permitidas, verificaciones, herramientas, excepciones e integración en CI.",
    content: `Actúa como un arquitecto de software especializado en gobernanza arquitectónica automatizada.

Convierte las siguientes decisiones y principios arquitectónicos en tests arquitectónicos o fitness functions automatizables.

Arquitectura:
{{architecture}}

Decisiones y principios a convertir:
{{decisions}}

Stack tecnológico y herramientas disponibles:
{{stack}}

Para cada regla devuelve:

- Regla arquitectónica.
- Riesgo que evita.
- Dependencia que debe estar prohibida, si aplica.
- Dependencia que debe permitirse, si aplica.
- Cómo detectarla estáticamente o durante la ejecución.
- Herramienta o técnica posible, con un ejemplo adecuado al stack cuando sea posible.
- Cómo integrarla en CI: comando, etapa, condición de fallo y artefacto de diagnóstico.
- Dónde ejecutarla: local, CI, staging o producción.
- Frecuencia de evaluación.
- Excepciones legítimas y cómo documentarlas o acotarlas.

Prioriza mecanismos automáticos sobre revisiones manuales.

Reglas:

- Prefiere verificaciones que puedan ejecutarse en CI sobre revisiones humanas.
- Distingue entre reglas que pueden automatizarse por completo y las que requieren juicio humano.
- Para cada regla manual, explica por qué no puede automatizarse y qué reduciría la fricción.
- Distingue dependencias prohibidas, dependencias permitidas y dependencias permitidas solo mediante un puerto, adaptador o interfaz explícita.
- No propongas una excepción global: indica su alcance, responsable, fecha de revisión y condición de retirada cuando sea relevante.
- Incluye ejemplos de herramientas adecuadas al stack, como analizadores de imports, reglas de lint, tests de arquitectura, análisis estático, compilación por módulos o validaciones de paquetes.
- Incluye al menos una fitness function de producción cuando el principio dependa de comportamiento en runtime (latencia, tasa de error, disponibilidad).
- No propongas herramientas propietarias sin mencionar alternativas abiertas.`,
    language: "es",
    module: "software-development",
    category: "software-architecture",
    subcategories: ["quality-attributes"],
    tags: ["analysis", "checklist"],
    useCases: [
      "Automatizar la gobernanza de decisiones arquitectónicas",
      "Definir reglas verificables antes de iniciar un proyecto",
      "Convertir ADRs en checks automáticos en el pipeline de CI",
    ],
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "critical-architecture-review",
    slug: "revision-critica-arquitectura",
    title: "Realizar una revisión crítica de una arquitectura",
    description:
      "Revisión crítica profunda de una arquitectura en 10 dimensiones: supuestos, restricciones, complejidad, acoplamiento, datos, fallos, evolución, operación, seguridad y economía.",
    content: `Actúa como revisor crítico de esta arquitectura.

Tu objetivo no es rediseñarla inmediatamente, sino descubrir dónde pueden estar equivocadas nuestras decisiones.

Descripción de la arquitectura:
{{architecture}}

Contexto adicional (restricciones, equipo, plazos, estado actual):
{{context}}

Analiza:

1. Supuestos: ¿Qué estamos dando por cierto sin evidencia?
2. Restricciones: ¿Qué restricciones reales condicionan el diseño?
3. Complejidad: ¿Qué complejidad parece necesaria y cuál puede ser accidental?
4. Acoplamiento: ¿Dónde existen dependencias difíciles de cambiar?
5. Datos: ¿Está claro quién posee cada dato?
6. Fallos: ¿Cómo falla el sistema?
7. Evolución: ¿Qué cambios futuros serían especialmente costosos?
8. Operación: ¿Qué será difícil observar, desplegar, depurar o recuperar?
9. Seguridad: ¿Qué límites de confianza existen?
10. Economía: ¿Estamos pagando complejidad hoy por necesidades hipotéticas futuras?

Para cada hallazgo clasifica:

- Severidad: baja, media o alta.
- Confianza: baja, media o alta.
- Evidencia: qué parte del diseño origina el hallazgo.

Separa claramente:

- Problemas observados.
- Riesgos potenciales.
- Preguntas abiertas.

Reglas:

- No propongas una arquitectura alternativa hasta finalizar el diagnóstico.
- Sé específico: cita componentes, decisiones o flujos concretos de la descripción.
- Distingue entre lo que está mal y lo que simplemente es un trade-off consciente.
- Si una dimensión no aplica al contexto, indícalo en lugar de forzar un hallazgo genérico.`,
    language: "es",
    module: "software-development",
    category: "software-architecture",
    subcategories: ["architectural-review"],
    tags: ["analysis", "checklist"],
    useCases: [
      "Revisar una arquitectura antes de comprometer recursos",
      "Descubrir supuestos y riesgos ocultos en un diseño",
      "Preparar una revisión con un arquitecto externo",
    ],
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "analyze-hexagonal-architecture",
    slug: "analizar-arquitectura-hexagonal",
    title: "Analizar una aplicación desde la perspectiva de arquitectura hexagonal",
    description:
      "Análisis estructural de una aplicación según Hexagonal / Onion / Clean Architecture: núcleo, puertos, adaptadores y dirección de dependencias.",
    content: `Actúa como un arquitecto de software especializado en arquitectura hexagonal, onion y clean architecture.

Analiza esta aplicación desde el punto de vista de Hexagonal / Onion / Clean Architecture.

Código o estructura de la aplicación:
{{code}}

Contexto (propósito del sistema, stack, restricciones):
{{context}}

Identifica:

Núcleo:
- Dominio.
- Reglas de negocio.
- Casos de uso.

Puertos:
- Capacidades requeridas por el núcleo.
- Capacidades expuestas al exterior.

Adaptadores:
- HTTP.
- Persistencia.
- Mensajería.
- Servicios externos.
- UI.
- Infraestructura.

Después comprueba si las dependencias apuntan hacia el núcleo.

Señala cualquier dependencia donde una regla de negocio dependa de detalles de infraestructura.

Reglas:

- Sé específico: cita archivos, módulos o clases concretas.
- Distingue entre dependencias directas e indirectas.
- Si el código no sigue arquitectura hexagonal, analiza qué partes podrían beneficiarse de ella y cuáles no.
- No propongas una reescritura completa: señala violaciones concretas y su impacto.`,
    language: "es",
    module: "software-development",
    category: "software-architecture",
    subcategories: ["hexagonal-architecture"],
    tags: ["analysis", "checklist"],
    useCases: [
      "Evaluar si una aplicación sigue principios de arquitectura hexagonal",
      "Identificar violaciones de dependencias antes de un refactor",
      "Preparar una migración incremental hacia arquitectura limpia",
    ],
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "detect-domain-contamination",
    slug: "detectar-contaminacion-dominio",
    title: "Detectar contaminación del núcleo de dominio por detalles externos",
    description:
      "Búsqueda de fugas de detalles de infraestructura hacia el dominio: ORM, HTTP, frameworks, serialización, SDKs, logging, configuración y formatos de transporte.",
    content: `Actúa como un arquitecto de software especializado en detección de acoplamiento indebido en arquitecturas limpias.

Busca contaminación del núcleo de dominio por detalles externos.

Código del núcleo de dominio (entidades, casos de uso, reglas de negocio):
{{code}}

Contexto (arquitectura general, frameworks en uso, restricciones):
{{context}}

Considera especialmente:

- ORM.
- HTTP.
- Frameworks.
- Serialización.
- SDKs externos.
- Logging.
- Configuración.
- Infraestructura.
- Formatos de transporte.

Para cada fuga indica:

- Dónde ocurre (archivo, clase o función concreta).
- Qué conocimiento externo introduce.
- Qué problema genera.
- Si merece corregirse.
- Cuál sería la corrección mínima.

Reglas:

- Distingue entre contaminación real y uso pragmático justificado.
- No todas las dependencias externas son contaminación: señala solo las que acoplan el dominio a detalles que podrían cambiar.
- Prioriza las fugas por impacto: empieza por las que dificultan más la evolución o las pruebas.
- Si una fuga es deliberada (por ejemplo, un entity con anotaciones de ORM), explica el trade-off y si existe alternativa sin coste significativo.`,
    language: "es",
    module: "software-development",
    category: "software-architecture",
    subcategories: ["clean-architecture"],
    tags: ["analysis", "checklist"],
    useCases: [
      "Auditar la pureza del dominio antes de un refactor",
      "Identificar acoplamiento oculto en entidades y casos de uso",
      "Preparar la extracción de un módulo de dominio reutilizable",
    ],
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "choose-communication-style",
    slug: "elegir-estilo-comunicacion",
    title: "Elegir el estilo de comunicación entre componentes",
    description:
      "Análisis de alternativas de comunicación entre componentes: local, síncrono, asíncrono, event-driven, streaming, push y pull, evaluadas por acoplamiento, latencia, disponibilidad y complejidad.",
    content: `Actúa como un arquitecto de software especializado en sistemas distribuidos y comunicación entre componentes.

Analiza la siguiente interacción entre componentes:

Interacción:
{{interaction}}

Contexto (volumen, latencia requerida, disponibilidad, restricciones):
{{context}}

Determina qué estilo de comunicación es más apropiado:

- Llamada local.
- Request-response síncrono.
- Mensajería asíncrona.
- Event-driven.
- Streaming.
- Push.
- Pull.

Evalúa cada alternativa según:

- Acoplamiento temporal.
- Latencia.
- Throughput.
- Disponibilidad.
- Backpressure.
- Consistencia.
- Complejidad operacional.
- Observabilidad.
- Tolerancia a fallos.

Reglas:

- No elijas una tecnología concreta hasta determinar primero qué propiedades necesita la interacción.
- Justifica por qué descartas cada alternativa, no solo por qué recomiendas una.
- Si el contexto no proporciona datos suficientes para evaluar alguna propiedad, indícalo y formula la pregunta necesaria.
- Distingue entre comunicación dentro de un proceso, entre procesos en la misma máquina y entre servicios distribuidos.`,
    language: "es",
    module: "software-development",
    category: "software-architecture",
    subcategories: ["distributed-systems"],
    tags: ["analysis", "checklist"],
    useCases: [
      "Decidir cómo comunicar dos módulos antes de implementar",
      "Evaluar si una llamada síncrona debería ser asíncrona",
      "Preparar una decisión arquitectónica sobre mensajería o eventos",
    ],
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "analyze-remote-call-chain",
    slug: "analizar-cadena-llamadas-remotas",
    title: "Analizar una cadena de llamadas remotas",
    description:
      "Identificación de profundidad, dependencias síncronas, puntos de fallo, amplificación de latencia, propagación de timeouts y blast radius en una cadena de llamadas.",
    content: `Actúa como un arquitecto de software especializado en análisis de sistemas distribuidos.

Analiza esta cadena de llamadas remotas:

Cadena de llamadas:
{{chain}}

Contexto (SLAs, timeouts configurados, volumen de tráfico):
{{context}}

Identifica:

- Profundidad de la cadena.
- Dependencias síncronas.
- Puntos de fallo.
- Amplificación de latencia.
- Propagación de timeouts.
- Retries acumulativos.
- Blast radius.

Construye el escenario de fallo cuando cada dependencia deja de responder.

Determina qué llamadas realmente necesitan ser síncronas y cuáles podrían desacoplarse.

Reglas:

- Sé cuantitativo cuando sea posible: estima latencias acumuladas, no solo las nombres.
- Distingue entre fallos que degradan el servicio y fallos que lo interrumpen por completo.
- Señala explícitamente si la cadena tiene un single point of failure.
- No asumas que todas las llamadas de la cadena tienen el mismo SLA: pregunta o estima según el contexto.`,
    language: "es",
    module: "software-development",
    category: "software-architecture",
    subcategories: ["distributed-systems"],
    tags: ["analysis", "checklist"],
    useCases: [
      "Evaluar la fragilidad de una cadena de servicios antes de salir a producción",
      "Identificar cuellos de botella en una arquitectura de microservicios",
      "Preparar un plan de desacoplamiento para llamadas síncronas innecesarias",
    ],
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "analyze-distributed-failure-scenarios",
    slug: "analizar-escenarios-fallo-distribuido",
    title: "Analizar escenarios de fallo en comunicación distribuida",
    description:
      "Evaluación sistemática de qué ocurre cuando una comunicación distribuida falla: destino caído, respuestas perdidas, duplicados, desorden y procesamiento parcial.",
    content: `Actúa como un arquitecto de software especializado en tolerancia a fallos en sistemas distribuidos.

Para esta comunicación distribuida:

Flujo:
{{flow}}

Contexto (protocolo, garantías del transporte, idempotencia de operaciones):
{{context}}

Analiza qué ocurre si:

1. El destino está caído.
2. Responde lentamente.
3. La petición llega pero la respuesta se pierde.
4. El emisor reintenta.
5. Llegan mensajes duplicados.
6. Llegan fuera de orden.
7. El consumidor procesa parcialmente la operación.

Para cada escenario determina:

- Estado del emisor.
- Estado del receptor.
- Riesgo de inconsistencia.
- Mecanismo de recuperación necesario.

Reglas:

- No asumas que el transporte garantiza orden o entrega exactamente una vez: analiza según las garantías reales del protocolo.
- Distingue entre fallos que el emisor puede detectar y fallos que solo el receptor conoce.
- Para cada mecanismo de recuperación, indica si es preventivo (evita el fallo) o reactivo (lo corrige después).
- Si un escenario no aplica al protocolo o contexto descrito, indícalo y explica por qué.`,
    language: "es",
    module: "software-development",
    category: "software-architecture",
    subcategories: ["distributed-systems"],
    tags: ["analysis", "checklist"],
    useCases: [
      "Diseñar la estrategia de consistencia de un flujo asíncrono",
      "Evaluar si un sistema tolera los fallos reales de la red",
      "Preparar pruebas de caos para un servicio distribuido",
    ],
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "design-remote-call-resilience",
    slug: "disenar-resiliencia-llamada-remota",
    title: "Diseñar la estrategia de resiliencia para una llamada remota",
    description:
      "Diseño de timeout, retries, backoff, jitter, circuit breaker y fallback para una llamada remota, con análisis de retry storms y protección de idempotencia.",
    content: `Actúa como un ingeniero de software especializado en resiliencia de sistemas distribuidos.

Diseña la estrategia de resiliencia para esta llamada remota:

Llamada:
{{call}}

Contexto (SLA del servicio destino, criticidad para el usuario, idempotencia de la operación):
{{context}}

Propón:

- Timeout.
- Número máximo de retries.
- Exponential backoff.
- Jitter.
- Circuit breaker si procede.
- Fallback si procede.

Analiza también el riesgo de retry storm.

Reglas:

- No recomiendes retries para operaciones no idempotentes sin explicar cómo evitar efectos duplicados.
- Justifica cada valor numérico con el contexto: no uses valores por defecto genéricos.
- Distingue entre timeouts de conexión y timeouts de lectura/escritura.
- Para el circuit breaker, indica los umbrales de apertura, el tiempo de espera en estado abierto y el número de peticiones de prueba para cerrar.
- Si propones un fallback, explica qué garantiza y qué pierde el usuario frente al caso ideal.
- Evalúa explícitamente si los retries podrían empeorar un fallo del destino (retry storm) y cómo mitigarlo.`,
    language: "es",
    module: "software-development",
    category: "software-architecture",
    subcategories: ["distributed-systems"],
    tags: ["analysis", "checklist"],
    useCases: [
      "Configurar retries y circuit breakers para una integración externa",
      "Prevenir retry storms en un sistema con muchas dependencias",
      "Definir la política de timeouts de un servicio con múltiples llamadas salientes",
    ],
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "compare-api-styles",
    slug: "comparar-estilos-api",
    title: "Comparar estilos de API para una interfaz",
    description:
      "Comparación de REST, RPC, gRPC y GraphQL para una interfaz concreta, evaluando consumidores, latencia, volumen, streaming, discoverability y necesidades del frontend.",
    content: `Actúa como un arquitecto de software especializado en diseño de APIs y comunicación entre servicios.

Compara REST, RPC, gRPC y GraphQL para esta interfaz:

Interfaz a diseñar:
{{interface}}

Contexto (consumidores, volumen, latencia, restricciones):
{{context}}

Considera:

- Tipo de consumidores.
- Control sobre clientes.
- Latencia.
- Volumen.
- Streaming.
- Discoverability.
- Tooling.
- Compatibilidad.
- Caché.
- Observabilidad.
- Necesidades del frontend.

Para cada alternativa indica qué problema resuelve bien y qué complejidad introduce.

Reglas:

- No elijas por moda tecnológica.
- Justifica por qué descartas cada alternativa, no solo por qué recomiendas una.
- Si el contexto no proporciona datos suficientes para evaluar alguna propiedad, indícalo y formula la pregunta necesaria.
- Distingue entre APIs internas (entre servicios propios) y APIs externas (para terceros o frontend).
- Considera la madurez del equipo y el ecosistema disponible.`,
    language: "es",
    module: "software-development",
    category: "backend-and-apis",
    subcategories: ["rest-api-design"],
    tags: ["analysis", "api"],
    useCases: [
      "Elegir el estilo de API para un nuevo servicio",
      "Evaluar si migrar una API REST a GraphQL o gRPC",
      "Preparar una decisión arquitectónica sobre comunicación entre servicios",
    ],
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "review-api-contract",
    slug: "revisar-contrato-api",
    title: "Revisar un contrato de API",
    description:
      "Revisión crítica de un contrato API pensando en mantenibilidad a cinco años: acoplamiento, nombres, consistencia, errores, paginación, idempotencia y breaking changes.",
    content: `Actúa como un arquitecto de software especializado en diseño y evolución de APIs.

Revisa este contrato API como si tuviera que mantenerse durante los próximos cinco años.

Contrato API (endpoints, esquemas, ejemplos):
{{contract}}

Contexto (consumidores, frecuencia de cambio, versionado actual):
{{context}}

Busca:

- Endpoints excesivamente acoplados a implementación.
- Nombres ambiguos.
- Operaciones CRUD que esconden comportamiento de negocio.
- Respuestas inconsistentes.
- Errores poco expresivos.
- Problemas de paginación.
- Ausencia de idempotencia.
- Dependencias entre llamadas.
- Breaking changes futuros previsibles.

Reglas:

- Prioriza problemas de contrato sobre preferencias estilísticas.
- Distingue entre problemas que requieren breaking change y los que pueden corregirse de forma compatible.
- Para cada problema, indica su severidad (alta, media, baja) y el esfuerzo estimado para corregirlo.
- Si el contrato no especifica algo (por ejemplo, paginación o errores), señala la omisión y su impacto.
- No propongas un rediseño completo: señala problemas concretos y su impacto en la evolución.`,
    language: "es",
    module: "software-development",
    category: "backend-and-apis",
    subcategories: ["api-contracts"],
    tags: ["analysis", "api", "checklist"],
    useCases: [
      "Revisar una API antes de publicarla para clientes externos",
      "Evaluar la mantenibilidad de una API existente",
      "Preparar una migración o evolución de contrato",
    ],
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
  {
    id: "design-api-error-model",
    slug: "disenar-modelo-errores-api",
    title: "Diseñar el modelo de errores de una API",
    description:
      "Diseño de un modelo de errores completo para una API: códigos estables, mensajes, contexto seguro, reintentabilidad y acciones recomendadas para cada tipo de error.",
    content: `Actúa como un arquitecto de software especializado en diseño de APIs y experiencia de desarrollador.

Diseña el modelo de errores de esta API:

API (endpoints, operaciones, dominio):
{{api}}

Contexto (consumidores, criticidad, regulaciones aplicables):
{{context}}

Para cada error relevante especifica:

- Código estable para máquinas.
- HTTP/gRPC status si corresponde.
- Mensaje para humanos.
- Información contextual segura.
- Retryable o no retryable.
- Acción recomendada al cliente.

Diferencia:

- Errores de validación.
- Autorización.
- Conflictos.
- Recursos inexistentes.
- Límites.
- Errores transitorios.
- Errores internos.

Reglas:

- No expongas detalles internos o sensibles en los mensajes de error.
- Usa códigos de error estables y legibles por humanos, no solo números HTTP.
- Para errores retryable, indica el backoff recomendado.
- Distingue entre errores que el cliente puede corregir y errores que requieren intervención del proveedor.
- Incluye al menos un ejemplo de respuesta de error completa con todos los campos.
- Si la API tiene operaciones asíncronas, especifica cómo se comunican los errores en ese contexto.`,
    language: "es",
    module: "software-development",
    category: "backend-and-apis",
    subcategories: ["api-error-model"],
    tags: ["api", "template"],
    useCases: [
      "Diseñar el modelo de errores de una API nueva antes de implementarla",
      "Estandarizar los errores de varias APIs existentes",
      "Mejorar la experiencia de desarrollador de una API pública",
    ],
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },
];
