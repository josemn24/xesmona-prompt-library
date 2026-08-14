import type { Prompt } from "../../types";

export const architectureStructurePrompts: Prompt[] = [
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

];

