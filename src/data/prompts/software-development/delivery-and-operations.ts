import type { Prompt } from "../../types";

export const deliveryAndOperationsPrompts: Prompt[] = [
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

];

