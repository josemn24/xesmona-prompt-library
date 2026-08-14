import type { Prompt } from "../../types";

export const testingAndMaintenancePrompts: Prompt[] = [
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

];

