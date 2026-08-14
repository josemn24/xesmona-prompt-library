import type { Prompt } from "../types";

export const businessPrompts: Prompt[] = [
  {
    id: "analisis-dafo",
    slug: "analisis-dafo",
    title: "Realizar un análisis DAFO accionable",
    description:
      "Análisis DAFO (SWOT) riguroso que va más allá de listas genéricas: factores específicos, evidencia, cruces CAME y acciones concretas priorizadas.",
    content: `Actúa como un consultor de estrategia que odia los DAFO genéricos. Cada punto debe ser específico, defendible y útil para decidir.

Descripción del negocio o proyecto:
{{business}}

Objetivo del análisis (qué decisión queremos tomar con este DAFO):
{{objective}}

Contexto (mercado, competencia, momento actual):
{{context}}

Desarrolla el análisis:

1. DAFO:
   - Debilidades: factores internos que nos frenan, con la evidencia que los respalda.
   - Amenazas: factores externos que pueden dañarnos, con su probabilidad e impacto.
   - Fortalezas: ventajas internas reales y diferenciales (no "buen equipo": qué puede hacer este equipo que otros no).
   - Oportunidades: tendencias o huecos externos que podemos capturar, con la ventana de tiempo estimada.
   Máximo 5 puntos por cuadrante. Si un punto podría aplicar a cualquier empresa del sector, reescríbelo hasta que sea específico.

2. Cruce CAME: convierte el diagnóstico en estrategia:
   - Corregir debilidades: cuáles atacar primero y cómo.
   - Afrontar amenazas: planes de contingencia para las dos más probables.
   - Mantener fortalezas: cómo proteger las ventajas que ya tenemos.
   - Explotar oportunidades: cuáles perseguir con los recursos actuales.

3. Plan de acción: de todo lo anterior, las 3-5 acciones prioritarias para el próximo trimestre, cada una con responsable sugerido, esfuerzo estimado y métrica de éxito.

Cierra con una advertencia honesta: qué información me falta para que este análisis deje de ser una hipótesis razonable y se convierta en un diagnóstico sólido.`,
    language: "es",
    module: "business",
    category: "opportunities-and-discovery",
    subcategories: ["strategic-analysis"],
    tags: ["analysis", "template"],
    useCases: [
      "Preparar la planificación estratégica anual",
      "Decidir si lanzar un nuevo producto o entrar en un nuevo mercado",
      "Revisar la posición competitiva tras un cambio en el mercado",
    ],
    createdAt: "2025-09-30",
    updatedAt: "2026-01-28",
  },
  {
    id: "sales-discovery-call",
    slug: "sales-discovery-call",
    title: "Prepare and run a sales discovery call",
    description:
      "Preparation guide and question framework for a B2B discovery call: hypothesis-driven questions, qualification signals and next-step criteria.",
    content: `You are a B2B sales coach specialized in consultative selling. Help me prepare a discovery call that uncovers real needs instead of delivering a disguised pitch.

What we sell:
{{product}}

The prospect (company, role of my contact, how they reached us):
{{prospect}}

What I already know and what I assume:
{{context}}

Prepare the call:

1. Pre-call hypotheses: based on the prospect, write 2-3 hypotheses about their likely problem and why now. Each hypothesis gets a question that would confirm or kill it early in the call.
2. Opening: a 30-second framing that sets an agenda and earns permission to ask questions. No company monologue.
3. Question framework, ordered to build depth:
   - Situation: how they solve this today, tools, team, volume.
   - Problem: what is not working, how often, what it costs (time, money, risk). Quantify whenever possible.
   - Implication: what happens if they do nothing for six months.
   - Need-payoff: what would solving it be worth, and how they would measure success.
   For each group, give me 3-4 questions phrased to invite long answers, not yes/no.
4. Qualification signals: what I need to learn about budget, authority, need and timeline; the exact phrasing to ask about budget and decision process without awkwardness.
5. Red flags and graceful exits: signs this is not a fit, and honest ways to say so.
6. Closing the call: how to summarize what I heard, confirm value, and agree on a concrete next step with a date. Include the fallback next step if they hesitate.

End with a one-page cheat sheet I can keep open during the call: hypotheses, key questions, and qualification checklist.`,
    language: "en",
    module: "business",
    category: "sales-and-growth",
    subcategories: ["sales-discovery"],
    tags: ["checklist"],
    useCases: [
      "Preparing a first call with an inbound lead",
      "Improving qualification to stop wasting time on bad-fit prospects",
      "Training a founder or engineer who is new to sales conversations",
    ],
    createdAt: "2025-10-14",
    updatedAt: "2026-02-22",
  },
  {
    id: "business-model-canvas",
    slug: "business-model-canvas",
    title: "Map a business model with the Business Model Canvas",
    description:
      "Guided completion of a Business Model Canvas with hard questions per block, consistency checks across blocks and a list of riskiest assumptions to validate.",
    content: `You are a business strategy facilitator. Help me map and stress-test a business model using the Business Model Canvas.

The business or idea:
{{business}}

Stage and context (idea, early traction, running business; market; resources):
{{context}}

Work through the nine blocks in an order that builds the story, not the poster order:

1. Customer segments: who exactly we serve. Push me beyond "everyone": define the early adopter profile precisely.
2. Value proposition: the concrete problem we solve for that segment and why our way is meaningfully different. One sentence per segment, no buzzwords.
3. Channels: how customers discover, buy and receive the value. Note which channels we can actually afford at our stage.
4. Customer relationships: acquisition, retention and growth mechanics.
5. Revenue streams: what we charge for, how, and the pricing logic.
6. Key resources, 7. Key activities and 8. Key partners: the minimum set required to deliver the value proposition, and what we deliberately will NOT do in-house.
9. Cost structure: the main fixed and variable costs, and which blocks drive them.

After the canvas, add the part most teams skip:

- Consistency check: contradictions between blocks (e.g., a low-touch self-serve channel with an enterprise price point). Flag every inconsistency you find.
- Riskiest assumptions: the three assumptions the whole model depends on, ordered by "if this is false, we are dead". For each, the cheapest experiment to validate it, with a pass/fail criterion.
- One-sentence summary of the business model that a stranger could repeat.

Be direct: if a block is weak or vague, say so and propose the strongest honest version of it.`,
    language: "en",
    module: "business",
    category: "strategy-and-business-model",
    subcategories: ["business-model-canvas"],
    tags: ["analysis", "template"],
    useCases: [
      "Sketching the model of a new product or side project",
      "Revisiting the business model when growth stalls",
      "Preparing a strategy workshop with co-founders",
    ],
    createdAt: "2025-11-18",
    updatedAt: "2026-03-05",
  },
];
