import type { Prompt } from "../../types";

export const architectureDecisionPrompts: Prompt[] = [
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

];

