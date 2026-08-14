import type { Prompt } from "../../types";

export const backendAndApisPrompts: Prompt[] = [
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

