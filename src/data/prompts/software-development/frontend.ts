import type { Prompt } from "../../types";

export const frontendPrompts: Prompt[] = [
  {
    id: "evaluate-rendering-strategies",
    slug: "evaluar-estrategias-de-renderizado",
    title: "Evaluar estrategias de renderizado para una aplicación",
    description:
      "Evaluación por página y componente de estrategias de renderizado según SEO, personalización, actualización, interactividad, caché, latencia, coste y complejidad.",
    content: `Actúa como un arquitecto frontend especializado en renderizado web y rendimiento.

Para cada página o componente de esta aplicación determina la estrategia de rendering más apropiada:

- client-side rendering;
- server-side rendering;
- static generation;
- incremental regeneration;
- islands;
- híbrido.

Descripción de la aplicación, páginas y componentes:
{{application}}

Contexto técnico y de negocio:
{{context}}

Si se conoce, framework, infraestructura y estrategia actual:
{{stack}}

Antes de elegir una estrategia:

1. Identifica las páginas y componentes relevantes.
2. Separa hechos, supuestos e incertidumbres.
3. Distingue contenido público de contenido personalizado.
4. Identifica datos remotos, frecuencia de actualización, dependencias de sesión y necesidades de interacción.
5. Señala restricciones del framework o de la infraestructura que limiten las opciones.

Evalúa cada página o componente según:

- SEO;
- personalización;
- frecuencia de actualización;
- interactividad;
- caché e invalidación;
- latencia percibida;
- coste de servidor;
- coste de cliente;
- complejidad operativa y de desarrollo.

Para cada elemento entrega:

- estrategia recomendada, o combinación de estrategias;
- razones basadas en el contexto;
- datos que se generan o cargan en cada frontera;
- estrategia de caché y revalidación;
- impacto sobre SEO y latencia;
- riesgos y trade-offs;
- nivel de confianza;
- información que podría cambiar la decisión.

Presenta el resultado en este orden:

1. Mapa de páginas y componentes.
2. Tabla de decisión por elemento.
3. Fronteras de renderizado y flujo de datos.
4. Estrategia de caché, invalidación y actualización.
5. Riesgos, complejidad y preguntas pendientes.

Reglas:

- No elijas una única estrategia global si diferentes partes tienen necesidades distintas.
- No confundas server-side rendering con una garantía automática de buen rendimiento.
- No supongas que static generation o incremental regeneration son adecuadas si hay personalización por usuario.
- Considera el coste de invalidar contenido y mantener coherencia con las fuentes de datos.
- Menciona tecnologías concretas solo si el stack proporcionado las justifica.
- No inventes requisitos de SEO, tráfico, frecuencia de cambios ni necesidades de sesión.
- Si una estrategia depende de una capacidad concreta del framework, márcala como supuesto verificable.`,
    language: "es",
    module: "software-development",
    category: "frontend-and-experience",
    subcategories: ["rendering-strategies"],
    tags: ["analysis", "checklist", "template"],
    useCases: [
      "Elegir rendering por página en una aplicación web",
      "Equilibrar SEO, interactividad y coste de servidor",
      "Revisar una estrategia de caché y revalidación frontend",
    ],
    notes:
      "Proporciona el framework y la infraestructura si quieres recomendaciones concretas sobre SSR, generación estática, revalidación o islands.",
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },

  {
    id: "classify-frontend-state",
    slug: "clasificar-estado-frontend",
    title: "Clasificar y simplificar el estado frontend",
    description:
      "Clasificación del estado frontend entre estado remoto, UI local, estado compartido, URL, persistencia local y estado derivado, detectando duplicaciones innecesarias.",
    content: `Actúa como un arquitecto frontend especializado en gestión de estado y límites de responsabilidad.

Clasifica el estado utilizado por esta aplicación frontend en:

- server state;
- local UI state;
- shared client state;
- URL state;
- persisted local state;
- derived state.

Descripción de la aplicación, componentes y flujos:
{{application}}

Estado y mecanismos actuales (stores, cachés, props, URL, almacenamiento local y fetching):
{{state}}

Contexto técnico y restricciones:
{{context}}

Para cada pieza de estado identifica:

- nombre y ubicación;
- quién la produce;
- quién la consume;
- fuente de verdad;
- alcance;
- duración;
- mecanismo actual;
- categoría adecuada;
- si está duplicada o derivada de otra fuente;
- riesgo de desincronización;
- justificación de la clasificación.

Detecta especialmente datos remotos que estén siendo copiados innecesariamente a un store global. Distingue entre:

- caché de datos remotos;
- estado de sesión;
- preferencias persistentes;
- estado efímero de interfaz;
- estado compartido entre componentes;
- estado derivado.

Para cada problema encontrado explica:

1. qué fuente debería ser la autoridad;
2. qué mecanismo debería gestionar el estado;
3. qué duplicación o sincronización podría eliminarse;
4. qué componentes y tests se verían afectados;
5. qué riesgo tendría cambiarlo.

Presenta el resultado en este orden:

1. Inventario de estado y fuentes de verdad.
2. Tabla de clasificación.
3. Duplicaciones, estados derivados almacenados y datos remotos mal ubicados.
4. Fronteras recomendadas entre server state, UI state y estado del cliente.
5. Preguntas y decisiones pendientes.

Reglas:

- No asumas una librería concreta ni recomiendes un store global por defecto.
- No trates todo dato compartido como shared client state: comprueba si es remoto, derivado o representable en la URL.
- No almacenes como estado aquello que pueda calcularse de forma barata y fiable a partir de una fuente existente.
- Distingue persistencia local de cache de datos remotos.
- Si no se conoce el ciclo de vida o la fuente de verdad, marca la conclusión como provisional.
- No propongas una reescritura completa de la gestión de estado: prioriza problemas y cambios localizados.`,
    language: "es",
    module: "software-development",
    category: "frontend-and-experience",
    subcategories: ["frontend-state"],
    tags: ["analysis", "checklist"],
    useCases: [
      "Auditar el estado de una aplicación frontend",
      "Detectar datos remotos duplicados en stores globales",
      "Simplificar la gestión de estado antes de añadir una nueva funcionalidad",
    ],
    notes:
      "Incluye la fuente de datos remotos y el ciclo de vida de cada store; sin esa información no puede distinguirse un cache legítimo de una duplicación accidental.",
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
  },

  {
    id: "debug-frontend-issue",
    slug: "depurar-error-frontend",
    title: "Depurar un error de frontend sistemáticamente",
    description:
      "Método sistemático para depurar un problema de frontend: reproducir, acotar, formar hipótesis y localizar la causa raíz sin cambios al azar.",
    content: `Actúa como un desarrollador frontend senior experto en {{framework}} y en las herramientas de depuración del navegador.

Tengo un problema de frontend y quiero depurarlo de forma sistemática, sin probar cambios al azar.

Síntoma (qué debería pasar y qué pasa en realidad):
{{symptom}}

Código relevante:
{{code}}

Contexto (navegadores afectados, desde cuándo, cambios recientes, errores de consola):
{{context}}

Guíame por este proceso:

1. Reproducción: define los pasos mínimos para reproducir el problema de forma fiable. Si es intermitente, propón qué instrumentación añadir para capturarlo.
2. Acotar el problema: clasifícalo (renderizado, estado, datos, red, eventos, estilos, concurrencia) y propón comprobaciones rápidas para descartar categorías enteras (por ejemplo: ¿llega bien el dato de la API? ¿el estado se actualiza? ¿falla solo el render?).
3. Hipótesis: lista las causas posibles ordenadas por probabilidad, con la comprobación concreta que confirma o descarta cada una (qué breakpoint poner, qué log añadir, qué mirar en la pestaña Network o en React DevTools).
4. Causa raíz: una vez localizada, explica por qué ocurre, no solo dónde. Distingue entre el error que ves y la decisión de diseño que lo permitió.
5. Corrección: propón el arreglo mínimo y, por separado, el arreglo estructural si existe.
6. Prevención: qué test (unitario, de integración o e2e) habría detectado este bug, y escríbelo.

Regla de oro: cada paso debe reducir el espacio de búsqueda. Nada de "prueba a actualizar las dependencias".`,
    language: "es",
    module: "software-development",
    category: "frontend-and-experience",
    subcategories: ["frontend-debugging"],
    tags: ["debugging", "react", "typescript"],
    useCases: [
      "Depurar un bug de interfaz difícil de reproducir",
      "Investigar un problema de estado o renderizado en React",
      "Diagnosticar diferencias de comportamiento entre navegadores",
    ],
    createdAt: "2025-10-27",
    updatedAt: "2026-02-14",
  },

];

