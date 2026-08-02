import type { Prompt } from "../types";
import { repositoryLeanStartupPrompts } from "./lean-startup-repository";

const sharedStateGuidance = `
Estado compartido del proyecto Lean:
{{lean_state}}

Usa este estado como registro de trabajo, no como una verdad incuestionable. Distingue siempre entre hechos observados, opiniones, supuestos, hipótesis, evidencias y decisiones. Al terminar, incluye una sección "Actualización del estado" con los cambios concretos que deben incorporarse al registro.
`;

export const leanStartupPrompts: Prompt[] = [
  {
    id: "guiar-ciclo-lean",
    slug: "guiar-ciclo-lean",
    title: "Guiar un proyecto con el ciclo Lean Startup",
    description:
      "Orquestación paso a paso de un proyecto Lean Startup: identificar la fase actual, escoger el aprendizaje crítico y dirigir el siguiente ciclo Crear–Medir–Aprender.",
    content: `Actúa como facilitador de Lean Startup para un proyecto sometido a incertidumbre. Tu función no es defender la idea ni producir una lista de funcionalidades: es reducir la incertidumbre importante mediante ciclos rápidos de aprendizaje validado.

${sharedStateGuidance}

Determina en qué fase se encuentra el proyecto:

- definición del problema y del cliente;
- formulación de hipótesis;
- priorización de incertidumbres;
- diseño del experimento;
- diseño o construcción del MVP;
- medición;
- análisis del aprendizaje;
- decisión de perseverar, pivotar o parar;
- planificación del siguiente ciclo.

Después entrega:

1. Diagnóstico de la fase actual y evidencia que lo justifica.
2. La pregunta de aprendizaje más importante ahora.
3. La hipótesis crítica que debemos poner a prueba.
4. La acción más pequeña que puede producir evidencia útil.
5. Qué debemos crear, qué debemos medir y qué debemos aprender.
6. Qué no debemos construir todavía.
7. Criterio explícito para avanzar, repetir, pivotar o parar.
8. Plan de trabajo con una duración máxima y una fecha de revisión.

No avances a una fase posterior si falta información que pueda cambiar la decisión. No confundas actividad con aprendizaje ni interés declarado con comportamiento validado. Termina con una única acción inmediata y la condición que permitirá evaluar si el ciclo funcionó.`,
    language: "es",
    module: "business",
    categories: ["lean-startup", "business-strategy", "project-management"],
    tags: ["lean-startup", "validated-learning", "experimentation", "checklist"],
    useCases: [
      "Guiar un proyecto nuevo desde la idea hasta el primer experimento",
      "Decidir cuál debe ser el siguiente ciclo de aprendizaje",
      "Evitar construir funcionalidades antes de validar los supuestos críticos",
    ],
    notes:
      "Pega el estado actualizado después de cada ciclo. El prompt debe orientar el proceso, pero las decisiones deben basarse en evidencia del contexto real.",
    example:
      "Idea: una herramienta para ayudar a autónomos a preparar presupuestos profesionales en menos tiempo. Estado: todavía no se ha hablado con clientes.",
    createdAt: "2026-08-02",
    updatedAt: "2026-08-02",
  },
  {
    id: "definir-proyecto-lean",
    slug: "definir-proyecto-lean",
    title: "Definir un proyecto con Lean Startup",
    description:
      "Transformación de una idea inicial en una visión, cliente, problema, propuesta de valor y estrategia inicial, separando hechos de supuestos.",
    content: `Actúa como facilitador de descubrimiento de producto con enfoque Lean Startup. Analiza el contexto del proyecto sin dar por cierta la idea inicial.

Contexto o idea del proyecto:
{{project_context}}
${sharedStateGuidance}

Construye una primera definición del proyecto:

1. Visión de largo plazo: qué cambio se quiere producir y para quién.
2. Segmento de cliente inicial, descrito de forma concreta y accesible.
3. Problema o trabajo que el cliente intenta resolver.
4. Alternativas que utiliza actualmente, aunque sean manuales o imperfectas.
5. Propuesta de valor inicial.
6. Comportamiento que esperamos provocar.
7. Modelo de ingresos posible, sin presentarlo como validado.
8. Canal inicial de adquisición posible.

Clasifica cada afirmación como hecho, observación, opinión, supuesto o hipótesis. Señala las contradicciones y la información que falta.

Formula las tres primeras hipótesis falsables con este formato:

"Creemos que [cliente] tiene [problema] y que, si le ofrecemos [solución], entonces [comportamiento observable] ocurrirá porque [razón]."

No diseñes todavía el producto completo. Termina indicando cuál es la decisión que estas hipótesis deben ayudar a tomar, qué no sabemos todavía y cuál debería ser el primer aprendizaje buscado.`,
    language: "es",
    module: "business",
    categories: ["lean-startup", "business-analysis", "business-strategy"],
    tags: ["lean-startup", "validated-learning", "template", "analysis"],
    useCases: [
      "Convertir una idea difusa en un problema comprobable",
      "Preparar el arranque Lean de un proyecto personal o profesional",
      "Alinear una visión con un segmento de cliente inicial",
    ],
    notes:
      "La salida es una hipótesis de trabajo, no un plan de negocio ni una confirmación de que exista demanda.",
    createdAt: "2026-08-02",
    updatedAt: "2026-08-02",
  },
  {
    id: "mapear-hipotesis-lean",
    slug: "mapear-hipotesis-lean",
    title: "Mapear las hipótesis críticas de un proyecto",
    description:
      "Inventario estructurado de hipótesis de valor, crecimiento, ingresos, canal y operación, con criterios para hacerlas observables y falsables.",
    content: `Actúa como analista de hipótesis para un proyecto Lean Startup. Tu objetivo es hacer visible qué tendría que ser verdad para que la iniciativa funcione.

Contexto del proyecto:
{{project_context}}
${sharedStateGuidance}

Identifica hipótesis de estas clases:

- hipótesis de valor: el cliente tiene un problema importante y la solución aporta valor;
- hipótesis de crecimiento: nuevos clientes pueden descubrir y recomendar la solución;
- hipótesis de ingresos: existe una forma sostenible de capturar valor;
- hipótesis de canal: podemos llegar al segmento de forma eficiente;
- hipótesis operativas: podemos entregar la solución con recursos y calidad razonables;
- hipótesis técnicas o regulatorias, si son relevantes.

Para cada hipótesis entrega:

- ID estable;
- afirmación falsable;
- cliente o comportamiento afectado;
- supuesto que la sostiene;
- impacto si es falsa;
- nivel de incertidumbre;
- evidencia disponible a favor y en contra;
- métrica o comportamiento que permitiría evaluarla;
- experimento candidato;
- qué decisión desbloquea.

Reescribe cualquier hipótesis vaga como "los usuarios lo quieren" o "el mercado es grande". No aceptes métricas de vanidad como prueba suficiente. Termina con las cinco hipótesis de mayor riesgo y una recomendación sobre cuál debe probarse primero.`,
    language: "es",
    module: "business",
    categories: ["lean-startup", "business-analysis", "business-strategy"],
    tags: ["lean-startup", "validated-learning", "growth-engine", "analysis"],
    useCases: [
      "Hacer explícitos los supuestos detrás de una idea",
      "Preparar un mapa de riesgos antes de construir un MVP",
      "Distinguir hipótesis de valor de hipótesis de crecimiento",
    ],
    notes:
      "Una hipótesis útil debe poder quedar debilitada por un resultado observable. Si no puede fallar, es una opinión o una visión, no una hipótesis experimental.",
    createdAt: "2026-08-02",
    updatedAt: "2026-08-02",
  },
  {
    id: "priorizar-hipotesis-criticas",
    slug: "priorizar-hipotesis-criticas",
    title: "Priorizar las hipótesis más arriesgadas",
    description:
      "Priorización de incertidumbres según impacto, desconocimiento, coste del error y velocidad con la que puede obtenerse evidencia útil.",
    content: `Actúa como responsable de priorización de aprendizaje Lean Startup.

Hipótesis disponibles:
{{hypotheses}}

Contexto y restricciones:
{{context}}
${sharedStateGuidance}

Evalúa cada hipótesis con una escala de 1 a 5 en:

- importancia para la supervivencia del proyecto;
- incertidumbre actual;
- coste de equivocarnos;
- dependencia de otras hipótesis;
- velocidad y coste de obtener evidencia.

Calcula una prioridad razonada y crea una tabla con:

- posición;
- hipótesis;
- puntuaciones;
- evidencia que ya existe;
- por qué es crítica;
- qué experimento inicial sería suficiente;
- qué hipótesis debe esperar.

No priorices la hipótesis más fácil de probar si una hipótesis más arriesgada puede invalidar todo el proyecto. Selecciona una única hipótesis para el próximo ciclo y define la pregunta exacta que debemos responder.`,
    language: "es",
    module: "business",
    categories: ["lean-startup", "business-analysis", "project-management"],
    tags: ["lean-startup", "experimentation", "analysis", "checklist"],
    useCases: [
      "Decidir qué supuesto probar primero",
      "Evitar construir la parte menos arriesgada del producto por comodidad",
      "Ordenar un backlog de experimentos",
    ],
    notes:
      "La priorización es provisional y debe cambiar cuando aparezca nueva evidencia. No convierte una puntuación subjetiva en un hecho.",
    createdAt: "2026-08-02",
    updatedAt: "2026-08-02",
  },
  {
    id: "disenar-experimento-lean",
    slug: "disenar-experimento-lean",
    title: "Diseñar un experimento Lean",
    description:
      "Diseño de un experimento con hipótesis falsable, segmento, comportamiento observable, métrica primaria, umbrales y decisión posterior.",
    content: `Actúa como diseñador de experimentos de Lean Startup. Diseña el experimento más pequeño que pueda producir evidencia útil sobre la hipótesis indicada.

Hipótesis crítica:
{{hypothesis}}

Decisión que depende de ella:
{{decision}}

Contexto y restricciones:
{{context}}
${sharedStateGuidance}

Entrega:

1. Pregunta de aprendizaje.
2. Hipótesis falsable.
3. Segmento exacto y criterios de inclusión.
4. Experimento y pasos de ejecución.
5. Comportamiento observable que se registrará.
6. Métrica primaria y métricas secundarias.
7. Umbral de éxito definido antes de ejecutar.
8. Umbral de fracaso.
9. Resultado inconcluso y cómo resolverlo.
10. Número mínimo de observaciones o participantes, si aplica.
11. Duración máxima.
12. Sesgos, falsos positivos y falsos negativos.
13. Qué no se va a construir.
14. Decisión prevista para cada resultado.

Da prioridad a acciones, pagos, retención, uso repetido o compromisos reales frente a opiniones declaradas. No llames aprendizaje validado a una señal débil. Termina con un protocolo breve para ejecutar y registrar el experimento.`,
    language: "es",
    module: "business",
    categories: ["lean-startup", "business-analysis", "project-management"],
    tags: ["lean-startup", "validated-learning", "experimentation", "checklist"],
    useCases: [
      "Convertir una hipótesis en un experimento ejecutable",
      "Definir métricas y umbrales antes de recoger resultados",
      "Reducir el coste y la duración del primer ciclo de feedback",
    ],
    notes:
      "Si el resultado no puede cambiar ninguna decisión, no es un buen experimento para este momento del proyecto.",
    createdAt: "2026-08-02",
    updatedAt: "2026-08-02",
  },
  {
    id: "disenar-mvp-experimental",
    slug: "disenar-mvp-experimental",
    title: "Diseñar un MVP como vehículo experimental",
    description:
      "Selección del vehículo mínimo para aprender: prototipo, concierge, wizard-of-oz, landing page, preventa, piloto o servicio manual.",
    content: `Actúa como diseñador de MVPs experimentales. El MVP no es una versión incompleta del producto final: es el vehículo mínimo que permite obtener aprendizaje validado con el menor esfuerzo razonable.

Hipótesis y experimento:
{{experiment}}

Contexto del cliente, canal y restricciones:
{{context}}
${sharedStateGuidance}

Compara estas alternativas cuando sean aplicables:

- entrevista o prueba de concepto;
- prototipo navegable;
- landing page o smoke test;
- preventa o carta de compromiso;
- concierge o servicio manual;
- wizard-of-oz;
- piloto limitado;
- integración parcial;
- producto funcional reducido.

Para cada alternativa indica:

- hipótesis que permite probar;
- comportamiento que permite observar;
- tiempo y coste;
- calidad de la evidencia;
- riesgo de falso positivo;
- riesgo de falso negativo;
- qué parte debe quedar manual.

Recomienda una alternativa y descompón su alcance en:

- imprescindible para medir;
- necesario para una experiencia creíble;
- útil pero prescindible;
- prohibido en esta iteración.

Incluye el flujo completo del experimento, la métrica primaria, el umbral y la decisión asociada. Termina con una lista explícita de funcionalidades que no deben construirse todavía.`,
    language: "es",
    module: "business",
    categories: ["lean-startup", "business-strategy", "project-management"],
    tags: ["lean-startup", "mvp", "experimentation", "validated-learning"],
    useCases: [
      "Definir el primer MVP sin inflar su alcance",
      "Elegir entre prototipo, preventa, concierge o piloto",
      "Probar una propuesta antes de invertir en producto completo",
    ],
    notes:
      "Un MVP puede ser manual, incompleto o no parecerse al producto final si eso permite probar mejor la hipótesis relevante.",
    createdAt: "2026-08-02",
    updatedAt: "2026-08-02",
  },
  {
    id: "analizar-aprendizaje-validado",
    slug: "analizar-aprendizaje-validado",
    title: "Analizar aprendizaje validado",
    description:
      "Análisis disciplinado de los resultados de un experimento, separando datos observados, opiniones, comportamientos, métricas e inferencias.",
    content: `Actúa como analista de aprendizaje validado. Analiza los resultados del experimento sin intentar salvar la idea ni justificar decisiones anteriores.

Hipótesis y umbrales definidos antes del experimento:
{{hypothesis_and_thresholds}}

Resultados, datos y observaciones:
{{experiment_results}}

Contexto y limitaciones del experimento:
{{context}}
${sharedStateGuidance}

Separa claramente:

1. Datos observados.
2. Comportamientos observados.
3. Opiniones o respuestas declaradas.
4. Métricas calculadas.
5. Comparación con el umbral de éxito y fracaso.
6. Anomalías y datos faltantes.
7. Explicaciones alternativas.
8. Sesgos o defectos del experimento.
9. Hipótesis apoyadas.
10. Hipótesis debilitadas o rechazadas.

Clasifica cada conclusión como confirmado, apoyado provisionalmente, inconcluso o contradicho. Explica qué evidencia permitiría subir o bajar el nivel de confianza.

No uses "a los usuarios les gustó" como prueba suficiente. No declares validación si solo existe intención declarada, muestra sesgada o una métrica de vanidad.

Termina con:

- aprendizaje validado;
- aprendizaje no validado;
- qué todavía no podemos afirmar;
- nueva pregunta crítica;
- siguiente experimento recomendado;
- actualización concreta del estado del proyecto.`,
    language: "es",
    module: "business",
    categories: ["lean-startup", "business-analysis"],
    tags: ["lean-startup", "validated-learning", "experimentation", "analysis"],
    useCases: [
      "Revisar los resultados de un MVP o piloto",
      "Separar evidencia real de opiniones de usuarios",
      "Preparar una decisión basada en el resultado de un experimento",
    ],
    notes:
      "El aprendizaje validado no significa que el negocio esté demostrado; significa que una hipótesis concreta ha obtenido evidencia suficiente para la decisión actual.",
    createdAt: "2026-08-02",
    updatedAt: "2026-08-02",
  },
  {
    id: "decidir-perseverar-pivotar-o-parar",
    slug: "decidir-perseverar-pivotar-o-parar",
    title: "Decidir si perseverar, pivotar o parar",
    description:
      "Marco de decisión basado en evidencia para mantener la estrategia, cambiar una hipótesis fundamental o detener una iniciativa.",
    content: `Actúa como comité de decisión Lean Startup. Debes recomendar una única opción: PERSEVERAR, PIVOTAR o PARAR.

Historial del proyecto:
{{lean_state}}

Último aprendizaje y resultados:
{{learning}}

Restricciones actuales y visión que no queremos perder:
{{context}}

Evalúa:

- evidencia frente a los umbrales establecidos;
- evolución de la hipótesis de valor;
- evolución de la hipótesis de crecimiento;
- señales del motor de crecimiento;
- coste de continuar;
- velocidad de aprendizaje;
- calidad y fiabilidad de los experimentos;
- si el problema es la idea, el segmento, el canal, el modelo de ingresos o la ejecución.

Si recomiendas PERSEVERAR, define la siguiente hipótesis y experimento.

Si recomiendas PIVOTAR, especifica:

- señal que demuestra que la estrategia actual no tiene suficiente tracción;
- elemento que cambia;
- visión que se conserva;
- nueva hipótesis fundamental;
- experimento que probará el pivot;
- criterio para volver a pivotar o parar.

Si recomiendas PARAR, explica si la causa es una hipótesis invalidada, un experimento defectuoso, un segmento incorrecto, un canal inviable, restricciones de recursos o falta de tracción.

No recomiendes pivotar solo por una observación aislada ni perseverar por apego a la idea. Termina con la decisión, la evidencia principal, el nivel de confianza y la acción inmediata.`,
    language: "es",
    module: "business",
    categories: ["lean-startup", "business-strategy", "business-analysis"],
    tags: ["lean-startup", "pivot", "validated-learning", "growth-engine"],
    useCases: [
      "Revisar una iniciativa después de varios experimentos",
      "Decidir si un resultado exige cambiar de estrategia",
      "Evitar continuar por inercia o pivotar impulsivamente",
    ],
    notes:
      "Pivotar es una corrección estructurada de la estrategia, no abandonar la visión para perseguir cualquier idea nueva.",
    createdAt: "2026-08-02",
    updatedAt: "2026-08-02",
  },
  {
    id: "planificar-cadencia-lean",
    slug: "planificar-cadencia-lean",
    title: "Planificar la cadencia de aprendizaje Lean",
    description:
      "Plan de ciclos sucesivos de aprendizaje con hipótesis, experimentos, tiempos máximos, revisiones y condiciones explícitas de avance.",
    content: `Actúa como responsable de la cadencia de aprendizaje de un proyecto Lean Startup. Diseña las próximas iteraciones para reducir la incertidumbre crítica, no para llenar un backlog de funcionalidades.

Estado actual:
{{lean_state}}

Horizonte de planificación:
{{time_horizon}}

Recursos, disponibilidad y restricciones:
{{constraints}}

Para cada ciclo define:

- hipótesis activa;
- pregunta de aprendizaje;
- experimento;
- MVP o vehículo experimental;
- responsable;
- tiempo máximo de preparación;
- fecha de ejecución;
- fecha de medición;
- fecha de revisión;
- métrica primaria;
- umbral de éxito y fracaso;
- decisión que debe producirse;
- condición para pasar al siguiente ciclo.

Aplica estas reglas:

- no ejecutar más de una hipótesis crítica por experimento;
- no comenzar una funcionalidad sin vincularla a un aprendizaje;
- reservar tiempo para analizar resultados;
- no continuar un experimento que ya no pueda cambiar una decisión;
- registrar también los aprendizajes negativos;
- mantener la visión separada de la estrategia actual.

Incluye dependencias, riesgos de calendario y un protocolo breve de revisión semanal. Termina con el primer ciclo ejecutable en menos tiempo y con la acción concreta que debe realizarse hoy.`,
    language: "es",
    module: "business",
    categories: ["lean-startup", "project-management", "business-strategy"],
    tags: ["lean-startup", "experimentation", "validated-learning", "checklist"],
    useCases: [
      "Organizar ciclos semanales de experimentación",
      "Coordinar construcción, medición y revisión",
      "Convertir el aprendizaje en una cadencia operativa",
    ],
    notes:
      "La cadencia debe medirse por incertidumbres importantes resueltas, no por tareas completadas o funcionalidades entregadas.",
    createdAt: "2026-08-02",
    updatedAt: "2026-08-02",
  },
  ...repositoryLeanStartupPrompts,
];
