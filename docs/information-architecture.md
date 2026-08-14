# Arquitectura de información de la biblioteca

Este documento define los principios de organización y navegación de la
biblioteca. No es un inventario de contenidos: las categorías, subcategorías,
etiquetas y prompts actuales se mantienen en `src/data/`.

## Modelo conceptual

La arquitectura común es:

```text
Módulo → Categoría → Subcategoría → Etiquetas
```

- El **módulo** representa un área de trabajo reconocible por el usuario.
- La **categoría** representa el tipo principal de trabajo que quiere realizar.
- La **subcategoría** concreta la tarea dentro de una categoría.
- Las **etiquetas** describen aspectos transversales como tecnología, objetivo,
  formato o contexto.
- El **idioma** es un campo propio del prompt, no una etiqueta.

Cada prompt tiene un único módulo y una única categoría principal. Puede tener
varias subcategorías de esa categoría y varias etiquetas.

## Módulos y agrupaciones visuales

La biblioteca se organiza en cinco módulos:

- Desarrollo de software
- Inteligencia artificial
- Marketing
- Negocios
- Productividad

Las agrupaciones de navegación son opcionales y pertenecen a la experiencia
del módulo, no al modelo universal de los prompts. En la primera versión solo
se utilizan en Desarrollo de software:

- Definir
- Diseñar y construir
- Validar y operar

Estas agrupaciones no aparecen en breadcrumbs, URLs, filtros ni páginas de
detalle. Los módulos sin agrupaciones muestran sus categorías en una lista
plana.

## Reglas de clasificación

- La categoría principal responde a: «¿Qué tipo de trabajo intenta hacer el
  usuario?».
- La subcategoría responde a: «¿Qué tarea concreta necesita realizar?».
- Una tecnología debe ser etiqueta cuando pueda cruzar varias categorías.
- Un concepto transversal debe resolverse mediante etiquetas o contenido
  relacionado, no duplicando la categoría principal.
- No se crean subcategorías vacías solo por simetría.
- No se mantienen categorías con un significado claramente solapado.
- Las subcategorías de un prompt deben pertenecer a su categoría principal.
- Las etiquetas no deben duplicar el significado de categorías o
  subcategorías.

## Etiquetas

Las etiquetas se agrupan conceptualmente en cuatro facetas:

- `technology`: tecnologías, herramientas y protocolos.
- `objective`: objetivo del trabajo, como análisis o debugging.
- `format`: forma de salida, como checklist o plantilla.
- `context`: contexto o restricción, como código legado, MVP o Lean Startup.

Las facetas son parte del modelo de datos y deben validarse al añadir una
etiqueta nueva.

## Navegación y URLs

El recorrido principal es:

```text
Inicio → Módulo → Categoría → Prompt
```

Las rutas canónicas son:

```text
/                         Inicio
/modules/[module]         Página de módulo
/modules/[module]/[category]  Página de categoría
/prompts                  Explorador global
/prompts/[slug]           Detalle de prompt
```

Las páginas de categoría son el destino principal de las tarjetas de
categoría. El explorador global sigue siendo la herramienta transversal para
buscar y filtrar, incluyendo enlaces filtrados desde subcategorías, etiquetas
y relaciones entre prompts.

Los breadcrumbs solo reflejan la jerarquía canónica. Nunca incluyen las
agrupaciones visuales del módulo.

## Identificadores y URLs

- Los IDs de módulos, categorías, subcategorías, etiquetas y prompts son
  identificadores estables en inglés con formato `kebab-case`.
- Los slugs de prompts no se cambian durante una reorganización editorial.
- Los datos, enlaces internos, filtros y URLs usan únicamente los IDs
  canónicos actuales.
- No se añade una etapa ni otro parámetro de navegación al modelo `Prompt` o
  a los filtros globales.

## Fuentes de verdad

El contenido y las reglas técnicas se separan de este documento:

- `src/data/modules.ts`: módulos.
- `src/data/categories.ts`: categorías y sus descripciones.
- `src/data/subcategories.ts`: subcategorías materializadas.
- `src/data/tags.ts`: etiquetas y facetas.
- `src/data/prompts/`: prompts y metadatos de contenido.
- `src/data/module-navigation.ts`: agrupaciones visuales opcionales por módulo.
- `src/data/types.ts`, `schema.ts` y `validation.ts`: contratos y validación.

Este archivo documenta el criterio que relaciona esas fuentes, pero no duplica
sus registros.

## Flujo para añadir contenido

1. Elegir el módulo y la categoría principal en los datos de taxonomía.
2. Añadir solo subcategorías que pertenezcan a esa categoría.
3. Conservar el idioma como campo propio.
4. Usar etiquetas existentes cuando expresen un concepto transversal y
   asignar la faceta correcta a cualquier etiqueta nueva.
5. Mantener estable el `slug` del prompt.
6. Ejecutar `npm run test`, `npm run typecheck`, `npm run lint` y
   `npm run build`.

La validación estática debe ser la referencia para detectar relaciones
incorrectas, identificadores duplicados o referencias a taxonomía inexistente.
