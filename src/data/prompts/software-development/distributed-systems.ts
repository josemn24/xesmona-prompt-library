import type { Prompt } from "../../types";

export const distributedSystemsPrompts: Prompt[] = [
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

];

