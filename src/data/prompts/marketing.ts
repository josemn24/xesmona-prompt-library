import type { Prompt } from "../types";

export const marketingPrompts: Prompt[] = [
  {
    id: "seo-content-brief",
    slug: "brief-de-contenido-seo",
    title: "Crear un brief de contenido SEO",
    description:
      "Brief completo para un artículo orientado a SEO: intención de búsqueda, estructura, palabras clave, preguntas frecuentes y criterios de calidad editorial.",
    content: `Actúa como un estratega de contenidos SEO que prioriza la utilidad real para el lector sobre el relleno para buscadores.

Necesito un brief de contenido para la siguiente pieza:

Tema y palabra clave objetivo:
{{keyword}}

Audiencia y etapa del funnel:
{{audience}}

Contexto (sitio, autoridad del dominio, competidores que ya posicionan):
{{context}}

Genera el brief completo:

1. Intención de búsqueda: clasifica la intención (informacional, comercial, transaccional, navegacional) y explica en dos frases qué espera encontrar exactamente quien busca esto. Todo el artículo se juzga contra esta expectativa.
2. Ángulo y propuesta de valor: qué va a aportar este artículo que los resultados actuales no tienen (datos propios, experiencia práctica, un punto de vista, mejor estructura).
3. Estructura propuesta: título (H1) y esqueleto de H2/H3, con una línea por sección indicando qué debe cubrir. Incluye una sección de preguntas frecuentes con 4-6 preguntas reales que haría la audiencia.
4. Palabras clave: principal, secundarias y entidades relacionadas que deben aparecer de forma natural. Sin densidades artificiales: indica dónde encaja cada una.
5. Requisitos editoriales: extensión orientativa, tono, nivel técnico, ejemplos o datos que hay que conseguir antes de escribir, y enlaces internos relevantes.
6. Criterios de aceptación: checklist que el redactor y el revisor usarán para dar el artículo por terminado (responde la intención, aporta algo único, sin afirmaciones sin fuente, etc.).

No escribas el artículo: solo el brief. Un buen brief hace que el artículo casi se escriba solo.`,
    language: "es",
    module: "marketing",
    categories: ["seo", "content-strategy"],
    tags: ["template"],
    useCases: [
      "Encargar artículos SEO a redactores con criterios claros",
      "Planificar un calendario de contenidos orientado a búsqueda",
      "Revisar por qué un artículo publicado no posiciona",
    ],
    createdAt: "2025-10-21",
    updatedAt: "2026-01-16",
  },
  {
    id: "email-launch-sequence",
    slug: "secuencia-emails-lanzamiento",
    title: "Escribir una secuencia de emails de lanzamiento",
    description:
      "Secuencia de 5 emails para el lanzamiento de un producto o funcionalidad: narrativa, asuntos, llamadas a la acción y variantes para pruebas A/B.",
    content: `Actúa como un copywriter especializado en email marketing que escribe correos que la gente abre y lee.

Voy a lanzar lo siguiente y necesito una secuencia de emails:

Producto o funcionalidad:
{{product}}

Audiencia (quiénes son, qué problema tienen, relación actual con nosotros):
{{audience}}

Detalles del lanzamiento (fecha, precio u oferta, restricciones):
{{context}}

Escribe una secuencia de 5 emails:

1. Email de anticipación: despierta el problema, sin vender todavía.
2. Email de anuncio: qué es, para quién, beneficio principal y CTA claro.
3. Email de valor en profundidad: el caso de uso más potente con un ejemplo concreto o historia breve.
4. Email de objeciones: responde las tres objeciones más probables de esta audiencia, sin sonar defensivo.
5. Email de cierre: urgencia honesta (si la hay) y último CTA.

Para cada email entrega:
- 3 opciones de asunto (una directa, una de curiosidad, una de beneficio) y el preheader.
- El cuerpo completo, de 100 a 200 palabras, con un único CTA.
- Una variante del asunto para prueba A/B con la hipótesis de por qué podría funcionar mejor.

Reglas: lenguaje de conversación, párrafos de una o dos frases, nada de adjetivos vacíos ("increíble", "revolucionario"), y cada email debe poder entenderse sin haber leído los anteriores. Si la oferta no tiene urgencia real, no la inventes: propón otro ángulo de cierre.`,
    language: "es",
    module: "marketing",
    categories: ["email-marketing", "copywriting"],
    tags: ["template", "conversion"],
    useCases: [
      "Lanzar una funcionalidad nueva a la lista de usuarios",
      "Preparar la campaña de un producto o servicio nuevo",
      "Reactivar una lista con una oferta concreta",
    ],
    createdAt: "2025-11-25",
    updatedAt: "2026-02-06",
  },
];
