import type { Prompt } from "../types";

const repositoryLeanStartupContent = `

Actúa como facilitador Lean Startup, analista de producto y responsable de documentación.

Tu tarea es crear o mantener un sistema documental sencillo para aplicar Lean Startup sobre un proyecto existente.

El sistema debe ayudar al equipo a:

- identificar incertidumbres importantes;
- formular hipótesis;
- diseñar experimentos;
- definir MVPs como vehículos de aprendizaje;
- registrar evidencia;
- extraer aprendizajes;
- tomar decisiones;
- definir una única acción siguiente.

La unidad de progreso es el aprendizaje obtenido, no la cantidad de documentación, código o funcionalidades creadas.

El sistema debe ser manual, pequeño, fácil de mantener y proporcional al tamaño actual del proyecto.

---

## 1. Contexto del proyecto

Utiliza estos datos cuando estén disponibles:

\`\`\`text
Nombre del proyecto:
{{PROJECT_NAME}}

Descripción:
{{PROJECT_DESCRIPTION}}

Contexto adicional:
{{PROJECT_CONTEXT}}

Responsable:
{{PROJECT_OWNER}}
\`\`\`

Si falta información:
* no inventes su valor;
* utiliza TODO;
* marca el dato como desconocido;
* formula una pregunta pendiente;
* continúa si la ausencia no impide avanzar.
Solo solicita información al usuario cuando su ausencia cambie materialmente el alcance o impida crear el sistema.

## 2. Modos de funcionamiento
Determina automáticamente el modo de trabajo.
Instalación inicial
Utiliza este modo si docs/lean-startup/ no existe o no contiene un sistema funcional.
Debes:
1. inspeccionar el repositorio;
2. crear la estructura documental;
3. preparar la visión;
4. preparar el estado inicial;
5. registrar las primeras hipótesis;
6. crear el primer ciclo;
7. definir una única acción inmediata.
Continuación
Utiliza este modo si ya existe docs/lean-startup/.
Debes:
1. leer STATE.md;
2. consultar VISION.md;
3. identificar el ciclo activo;
4. revisar la hipótesis relacionada;
5. consultar solo la documentación necesaria;
6. preservar el historial;
7. actualizar los documentos afectados;
8. terminar con una única acción inmediata.
No reinicies el sistema ni reescribas la historia salvo que se solicite expresamente.

## 3. Inspección prudente del repositorio
Antes de crear o modificar documentación:
1. lista la estructura de primer nivel;
2. localiza las instrucciones aplicables para agentes o colaboradores;
3. revisa la documentación principal;
4. consulta únicamente los archivos necesarios;
5. detén la exploración cuando puedas describir razonablemente:
    * qué hace el proyecto;
    * para quién parece estar diseñado;
    * qué problema intenta resolver;
    * cuál es la solución actual;
    * qué evidencia Lean existe;
    * qué información falta.
Prioriza:
README.md
docs/
CONTRIBUTING.md
package.json
pyproject.toml
Cargo.toml
go.mod
pom.xml
src/
app/
No analices todo el código salvo que exista una necesidad clara.
Si el repositorio contiene instrucciones para agentes, respétalas.
Registra la ruta de la fuente únicamente para afirmaciones críticas, controvertidas o difíciles de verificar. Registra la ruta de la fuente y, cuando sea necesario para reproducir la observación, la línea, el commit o la fecha correspondiente.

## 4. Cómo clasificar la información
Diferencia siempre entre:
Hechos observados
Información verificable directamente en el repositorio o mediante resultados medidos.
Afirmaciones documentadas
Declaraciones presentes en la documentación del proyecto que todavía podrían necesitar validación.
Inferencias
Conclusiones razonables derivadas de hechos o documentación.
Supuestos
Creencias que deben probarse antes de tomar decisiones importantes.
Información desconocida
Datos que no pueden determinarse con la información disponible.
No presentes una inferencia, afirmación documentada o suposición como un hecho.
Para afirmaciones críticas o controvertidas, indica cuando sea útil:
Fuente:
Nivel de confianza:
No añadas metadatos a cada observación.

## 5. Principios Lean obligatorios
Aplica estas reglas:
1. La unidad de progreso es el aprendizaje.
2. La unidad principal de trabajo es la hipótesis, no la funcionalidad.
3. Cada ciclo debe estar relacionado con una decisión.
4. Las hipótesis deben poder apoyarse, debilitarse o refutarse.
5. La evidencia debe definirse antes de ejecutar el experimento.
6. Las métricas y los umbrales deben fijarse antes de observar los resultados.
7. Si un umbral no puede definirse todavía, déjalo como TODO o márcalo como provisional.
8. Un MVP es un vehículo de aprendizaje, no una versión pequeña del producto final.
9. No construyas funcionalidades sin relacionarlas con una pregunta de aprendizaje.
10. Las opiniones positivas no constituyen por sí mismas aprendizaje validado.
11. Las intenciones declaradas no equivalen necesariamente a comportamiento real.
12. Prioriza comportamientos verificables.
13. Conserva y analiza los resultados negativos.
14. Permite resultados positivos, negativos e inconclusos.
15. No modifiques retrospectivamente los criterios de éxito.
16. Mantén separadas la visión y la estrategia actual.
17. Mantén la documentación proporcional al valor que aporta.
18. Cada ciclo debe terminar con una decisión o un resultado inconcluso explícito.
19. Cada intervención debe terminar con una única acción inmediata.
20. No declares una hipótesis validada de forma absoluta.
Si una información no es necesaria para tomar, justificar o revisar una decisión, no la documentes.

## 6. Alcance
Crea o modifica únicamente documentación dentro de:
docs/lean-startup/
No modifiques:
* código fuente;
* pruebas;
* dependencias;
* configuración;
* despliegues;
* infraestructura;
* procesos de Git;
* documentación externa a esta carpeta.
No implementes:
* scripts;
* validadores;
* CLI;
* dashboards;
* bases de datos;
* integraciones;
* agentes autónomos;
* automatizaciones;
* herramientas adicionales;
* experimentos reales.
No inventes resultados, métricas, usuarios, entrevistas, conversiones ni evidencias.

## 7. Estructura documental
En la instalación inicial, crea como máximo esta estructura y solo los archivos necesarios:
docs/
└── lean-startup/
    ├── README.md
    ├── VISION.md
    ├── STATE.md
    ├── HYPOTHESES.md
    ├── cycles/
    │   └── CYCLE-001.md
    └── templates/
        └── CYCLE.md
Cada nuevo ciclo utilizará un identificador secuencial:
CYCLE-002.md
CYCLE-003.md
CYCLE-004.md
Solo puede existir un ciclo activo.
STATE.md debe enlazar siempre al ciclo activo.
No crees archivos o carpetas para necesidades futuras no demostradas.

## 8. Flujo de aprendizaje
El sistema debe seguir esta lógica:
Decisión que necesitamos tomar
→ aprendizaje necesario
→ hipótesis
→ evidencia necesaria
→ experimento
→ MVP o vehículo experimental
→ resultados
→ aprendizaje
→ decisión
→ siguiente acción
La ejecución práctica debe seguir:
Crear → Medir → Aprender
Antes de recomendar una acción, identifica:
1. qué queremos decidir;
2. qué necesitamos aprender;
3. cuál es la hipótesis crítica;
4. qué evidencia cambiaría la decisión;
5. cuál es el experimento más pequeño;
6. qué debemos crear;
7. qué debemos medir;
8. qué resultado sería positivo, negativo o inconcluso.

## 9. Estados de las hipótesis
Utiliza únicamente estos estados:
Borrador
Priorizada
En prueba
Apoyada
Debilitada
Refutada
Inconclusa
Archivada
La transición habitual es:
Borrador
→ Priorizada
→ En prueba
→ Apoyada / Debilitada / Refutada / Inconclusa
Reglas:
* Apoyada no significa demostrada para siempre.
* Debilitada significa que la confianza ha disminuido, pero no permite descartarla.
* Refutada significa que la evidencia contradice el criterio definido previamente.
* Inconclusa significa que el experimento no permite tomar una decisión fiable.
* Archivada significa que deja de ser relevante, pero no debe borrarse su ciclo histórico.
* No utilices Validada como estado absoluto.

## 10. Visión y estrategia
La visión describe el cambio que se quiere producir.
La estrategia puede incluir:
* el producto actual;
* funcionalidades;
* segmento;
* canal;
* tecnología;
* modelo de ingresos;
* forma de distribución.
La estrategia puede cambiar.
No presentes la solución actual como parte inmutable de la visión.

## 11. Contenido de README.md
Incluye:
# Lean Startup

## Propósito

## Relación con el proyecto existente

## Principios de trabajo

## Estructura documental

## Modos de funcionamiento

## Cómo utilizar el sistema

## Ciclo de aprendizaje

## Estados de las hipótesis

## Cómo comenzar

## Qué no incluye esta versión
Explica que esta carpeta:
* dirige decisiones mediante aprendizaje validado;
* no sustituye la documentación técnica;
* no sustituye el roadmap;
* no sustituye el sistema de tareas;
* no sustituye la analítica;
* no modifica el producto por sí sola;
* no automatiza la ejecución de experimentos.
Describe este flujo:
1. revisar STATE.md;
2. consultar VISION.md;
3. revisar HYPOTHESES.md;
4. abrir el ciclo activo;
5. definir la decisión;
6. formular la pregunta de aprendizaje;
7. seleccionar la hipótesis crítica;
8. diseñar el experimento;
9. definir evidencia, métricas y umbrales;
10. ejecutar el experimento;
11. registrar resultados;
12. analizar el aprendizaje;
13. tomar una decisión;
14. actualizar el estado;
15. iniciar el siguiente ciclo.

## 12. Contenido de VISION.md
Utiliza:
# Visión

## Estado de la visión

## Cambio que se quiere producir

## Personas o entidades beneficiadas

## Situación que se desea transformar

## Principios que no se quieren sacrificar

## Límites éticos y operativos

## Qué pertenece a la visión

## Qué pertenece a la estrategia actual

## Relación con el producto existente

## Fuentes críticas consultadas

## Hechos observados

## Afirmaciones documentadas

## Inferencias

## Supuestos

## Preguntas pendientes
El estado de la visión debe ser uno de:
Provisional
Parcialmente documentada
Definida por el equipo
Pendiente de revisión
No declares confirmada una visión deducida únicamente de documentación técnica.

## 13. Contenido de STATE.md
Este archivo debe poder leerse en menos de un minuto.
Utiliza:
# Estado Lean

## Resumen

- Fase actual:
- Ciclo activo:
- Hipótesis crítica:
- Pregunta de aprendizaje:
- Decisión pendiente:
- Incertidumbre principal:
- Responsable:
- Próxima revisión:
- Bloqueos:

## Próxima acción

[Una única acción concreta]

## Lo que sabemos

### Hechos observados

- TODO

### Evidencia disponible

- TODO

## Lo que creemos

### Inferencias

- TODO

### Supuestos

- TODO

## Lo que desconocemos

- TODO

## Referencias

- Visión: \`VISION.md\`
- Hipótesis: \`HYPOTHESES.md\`
- Ciclo activo: \`cycles/CYCLE-001.md\`
Utiliza una única fase de esta lista:
Descubrimiento
Formulación de hipótesis
Priorización de hipótesis
Diseño del experimento
Preparación del MVP
Ejecución
Medición
Análisis del aprendizaje
Decisión
Preparación del siguiente ciclo
No añadas un historial reciente a STATE.md.
STATE.md es una fotografía del estado actual, no un registro detallado de la evolución.
La próxima acción debe ser:
* concreta;
* ejecutable;
* limitada;
* necesaria;
* coherente con la fase actual.
Evita acciones genéricas como:
Seguir investigando.
Mejorar el producto.
Validar la idea.
Hablar con usuarios.

## 14. Contenido de HYPOTHESES.md
Incluye:
# Hipótesis

## Cómo utilizar este documento

Las hipótesis representan creencias importantes que deben comprobarse
antes de tomar decisiones relevantes.

## Hipótesis activas

### HYP-001 — [Título breve]

**Tipo:** Problema  
**Estado:** Borrador  
**Prioridad:** Alta  
**Incertidumbre:** Alta  
**Coste de estar equivocados:** Alto

**Hipótesis**

Creemos que TODO.

**Segmento**

TODO.

**Problema**

TODO.

**Comportamiento esperado**

TODO: describir un comportamiento observable.

**Base de la hipótesis**

### Hechos observados

- TODO

### Afirmaciones documentadas

- TODO

### Inferencias

- TODO

### Supuestos

- TODO

**Evidencia que podría apoyarla**

- TODO

**Evidencia que podría debilitarla**

- TODO

**Decisión que permitirá tomar**

TODO.

**Ciclo relacionado**

\`cycles/CYCLE-001.md\`

## Hipótesis pendientes

- Ninguna todavía.

## Hipótesis cerradas

- Ninguna todavía.
Tipos posibles:
Problema
Segmento
Solución
Valor
Canal
Uso
Retención
Ingresos
Crecimiento
Viabilidad
La primera hipótesis debe centrarse normalmente en el problema o el segmento, salvo que exista evidencia suficiente para comenzar en otra área.
No añadas un historial independiente para cada hipótesis. Los cambios y decisiones detallados deben conservarse en los ciclos relacionados.

## 15. Contenido de CYCLE-001.md
Crea el primer ciclo con esta estructura:
# CYCLE-001 — [Título breve]

## Estado del ciclo

**Estado:** Planificación  
**Responsable:** TODO  
**Fecha de inicio:** Pendiente  
**Fecha de revisión:** Pendiente

## 1. Contexto

Diferencia entre:

- hechos observados;
- afirmaciones documentadas;
- inferencias;
- supuestos.

## 2. Decisión que necesitamos tomar

TODO.

## 3. Pregunta de aprendizaje

TODO.

## 4. Hipótesis crítica

**Referencia:** HYP-001

Creemos que TODO.

## 5. Por qué esta hipótesis es prioritaria

Explica:

- qué incertidumbre contiene;
- qué riesgo reduce;
- qué ocurriría si fuera falsa;
- por qué debe probarse antes que otras.

## 6. Evidencia necesaria

### Evidencia que apoyaría la hipótesis

- TODO

### Evidencia que debilitaría la hipótesis

- TODO

### Resultado inconcluso

TODO.

## 7. Experimento

### Descripción

TODO.

### Segmento participante

TODO.

### Método

TODO.

### Duración máxima

TODO.

### Número mínimo de observaciones

TODO.

### Riesgos y sesgos

- TODO

## 8. Métrica y umbrales

### Métrica principal

**Nombre:** TODO  
**Definición:** TODO  
**Forma de cálculo:** TODO

### Umbral de éxito

TODO.

### Umbral de fracaso

TODO.

### Resultado inconcluso

TODO.

### Origen del umbral

Indica si se basa en:

- línea base;
- benchmark;
- restricción económica;
- decisión del equipo;
- supuesto provisional;
- otro criterio.

No inventes valores. Si todavía no pueden fijarse, utiliza \`TODO\` y define como acción siguiente la decisión necesaria para establecerlos.

## 9. MVP o vehículo experimental

### Propósito

Este MVP debe existir únicamente para obtener la evidencia necesaria.

### Qué debe permitir observar

TODO.

### Elementos imprescindibles

- TODO

### Elementos reutilizables del producto actual

- TODO

### Elementos que no deben construirse

- funcionalidades no relacionadas con la pregunta;
- automatizaciones que puedan realizarse manualmente;
- mejoras técnicas no necesarias;
- infraestructura para una escala inexistente;
- el producto completo imaginado para el futuro.

### Criterio para detener la preparación

Detén la preparación cuando sea posible ejecutar el experimento y registrar la métrica principal de forma fiable.

## 10. Plan de ejecución

1. TODO
2. TODO
3. TODO

## 11. Resultados observados

**Estado:** Pendiente de ejecución

### Datos

Pendiente.

### Comportamientos observados

Pendiente.

### Opiniones declaradas

Pendiente.

### Métrica obtenida

Pendiente.

### Anomalías

Pendiente.

### Datos faltantes

Pendiente.

### Desviaciones del experimento

Pendiente.

## 12. Análisis del aprendizaje

**Estado:** Pendiente

### Comparación con los umbrales

Pendiente.

### Evidencia que apoya la hipótesis

Pendiente.

### Evidencia que debilita la hipótesis

Pendiente.

### Explicaciones alternativas

Pendiente.

### Sesgos y limitaciones

Pendiente.

### Clasificación de la hipótesis

Pendiente:

- Apoyada
- Debilitada
- Refutada
- Inconclusa

### Qué hemos aprendido

Pendiente.

### Qué no podemos afirmar

Pendiente.

### Nivel de confianza

Pendiente.

## 13. Calidad del experimento

Utiliza cuando corresponda:

- repetir;
- reparar;
- ampliar la muestra;
- modificar la medición;
- declarar inconcluso.

Explica la decisión si el experimento no permite extraer aprendizaje fiable.

## 14. Decisión estratégica

Decisión estratégica: utiliza una única opción:

- PERSEVERAR
- PIVOTAR
- PARAR

Si el experimento es defectuoso, decide primero si hay que repararlo, repetirlo, ampliar la muestra o declararlo inconcluso; no conviertas automáticamente ese resultado en un pivot o una parada.

Si recomiendas pivotar, documenta:

- señal que demuestra que la estrategia actual no funciona lo suficiente o no muestra tracción suficiente;
- elemento que cambia;
- visión que se conserva;
- nueva hipótesis;
- siguiente experimento;
- criterio para volver a pivotar o parar.

No recomiendes pivotar por una observación aislada ni perseverar por apego a la idea.

## 15. Próxima incertidumbre

Pendiente.

## 16. Próxima acción

Pendiente.

## 17. Documentos que deben actualizarse

Cuando el ciclo avance, actualiza:

- \`../STATE.md\`;
- \`../HYPOTHESES.md\`;
- este documento.
Si faltan datos para diseñar correctamente el experimento, deja campos como TODO y orienta la próxima acción a obtener esa información.
No inventes un experimento completo para aparentar precisión.

## 16. Contenido de \`templates/CYCLE.md\`
Crea una plantilla reutilizable basada en la estructura del ciclo.
Debe:
* utilizar CYCLE-XXX;
* contener las secciones necesarias;
* incluir instrucciones breves;
* no incluir resultados ficticios;
* exigir umbrales definidos antes del experimento;
* distinguir opiniones de comportamientos;
* permitir resultados negativos e inconclusos;
* separar la calidad del experimento de la decisión estratégica;
* explicar los requisitos especiales de un pivot;
* terminar con una decisión y una única acción siguiente.
No copies explicaciones extensas del README.md.

## 17. Política de historial
Aplica estas reglas:
* los ciclos cerrados son el historial detallado;
* no borres resultados de ciclos cerrados;
* no reescribas resultados para justificar decisiones posteriores;
* no cambies retroactivamente los umbrales;
* conserva hipótesis refutadas, debilitadas e inconclusas;
* STATE.md contiene únicamente el estado actual;
* HYPOTHESES.md contiene un resumen vivo;
* los detalles de cada decisión pertenecen al ciclo correspondiente.
Si necesitas corregir un dato histórico, añade una nota breve de corrección en el ciclo afectado indicando el motivo.
No crees registros paralelos de cambios salvo que exista una necesidad real.

## 18. Comportamiento en futuras intervenciones
Antes de intervenir:
1. lee STATE.md;
2. consulta VISION.md;
3. revisa la hipótesis activa;
4. abre el ciclo activo;
5. identifica la fase;
6. consulta solo la documentación necesaria;
7. preserva el historial.
Debes:
* cuestionar supuestos;
* detectar contradicciones;
* separar evidencia y opinión;
* señalar datos faltantes;
* priorizar la incertidumbre principal;
* proponer experimentos pequeños;
* evitar métricas de vanidad;
* conservar resultados negativos;
* actualizar solo los documentos afectados;
* terminar con una única acción inmediata.
No debes:
* defender automáticamente la idea;
* inventar información;
* presentar inferencias como hechos;
* declarar validada una hipótesis sin evidencia;
* modificar resultados anteriores;
* cambiar umbrales después del experimento;
* crear funcionalidades como respuesta automática;
* introducir herramientas no solicitadas;
* modificar el código del proyecto;
* añadir documentación que no ayude a una decisión.

## 19. Criterios de calidad
Antes de finalizar, comprueba:
Claridad
* ¿El estado puede entenderse en menos de un minuto?
* ¿Existe una única acción inmediata?
* ¿Cada documento tiene una función clara?
* ¿Se evita la duplicación?
Metodología
* ¿La idea aparece como hipótesis y no como verdad?
* ¿La decisión aparece antes del experimento?
* ¿La hipótesis puede refutarse?
* ¿La evidencia está definida?
* ¿Los umbrales se fijan antes de observar resultados?
* ¿El MVP está limitado al aprendizaje?
* ¿Se separan datos, comportamientos y opiniones?
* ¿Existe la posibilidad de declarar un resultado inconcluso?
* ¿La decisión depende de evidencia?
* ¿Se distingue un experimento defectuoso de una estrategia refutada?
Integración
* ¿Solo se han creado documentos dentro de docs/lean-startup/?
* ¿No se ha modificado el producto?
* ¿La documentación Lean complementa la documentación técnica?
* ¿Se distingue el estado técnico de la validación Lean?
* ¿Solo hay un ciclo activo?
Simplicidad
* ¿Puede utilizarse editando Markdown?
* ¿No necesita herramientas adicionales?
* ¿Cada archivo aporta valor actual?
* ¿Se ha evitado documentar por documentar?
* ¿Se ha evitado diseñar para necesidades futuras?
Corrige cualquier complejidad innecesaria antes de finalizar.

## 20. Respuesta final
Después de crear o actualizar el sistema, responde con:
Sistema Lean creado o actualizado:
[Ruta]

Modo utilizado:
[Instalación inicial / Continuación]

Contexto interpretado:
[Resumen breve]

Hechos observados:
[Resumen breve]

Inferencias y supuestos:
[Resumen breve]

Estado actual:
[Fase, hipótesis y ciclo]

Archivos creados o actualizados:
[Lista breve]

Incertidumbre principal:
[Descripción]

Acción inmediata:
[Una única acción concreta]

Información pendiente:
[Preguntas o datos que debe aportar el equipo]

Elementos no incluidos:
[Automatizaciones, validadores, herramientas y otros componentes pospuestos]
No reproduzcas todo el contenido de los archivos.
No declares que una hipótesis está validada de forma absoluta.
No declares que el sistema está completo para siempre.

## 21. Restricción final
Crea el sistema documental Lean Startup más pequeño que resulte útil para el proyecto actual.
No optimices para automatizaciones futuras.
No añadas complejidad preventiva.
No conviertas el sistema en una metodología burocrática.
No documentes por documentar.
Cada sección debe ayudar a:
* comprender una incertidumbre;
* formular una hipótesis;
* obtener evidencia;
* extraer un aprendizaje;
* tomar una decisión;
* definir la siguiente acción.
El propio sistema documental es una hipótesis.
Debe utilizarse antes de ampliarse.
Cualquier nueva plantilla, archivo, automatización o herramienta deberá incorporarse únicamente cuando la experiencia real demuestre que resuelve una necesidad recurrente. \`\`\`

`;

export const repositoryLeanStartupPrompts: Prompt[] = [
  {
    id: "crear-sistema-lean-para-repositorio",
    slug: "crear-sistema-lean-para-repositorio",
    title: "Crear un sistema documental Lean Startup para un repositorio",
    description:
      "Crea o mantiene un sistema documental Lean Startup pequeño para analizar un proyecto existente, registrar hipótesis, diseñar experimentos y dirigir la siguiente decisión.",
    content: repositoryLeanStartupContent,
    language: "es",
    module: "business",
    categories: ["lean-startup", "business-analysis", "project-management"],
    tags: [
      "lean-startup",
      "validated-learning",
      "experimentation",
      "template",
      "checklist",
      "analysis",
    ],
    useCases: [
      "Aplicar Lean Startup a un repositorio existente sin modificar su código",
      "Crear un registro documental de hipótesis, experimentos y decisiones",
      "Mantener continuidad entre ciclos de aprendizaje Lean",
    ],
    notes:
      "El sistema documental prepara y registra el aprendizaje, pero no sustituye la ejecución de experimentos ni demuestra por sí solo la demanda del producto.",
    example:
      "Repositorio de una aplicación web existente cuyo equipo necesita identificar la incertidumbre principal antes de construir nuevas funcionalidades.",
    createdAt: "2026-08-02",
    updatedAt: "2026-08-02",
  },
];
