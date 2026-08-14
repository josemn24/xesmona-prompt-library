import type { Prompt } from "../../types";

export const architectureQualityPrompts: Prompt[] = [
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

];

