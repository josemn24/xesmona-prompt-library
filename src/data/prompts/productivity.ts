import type { Prompt } from "../types";

export const productivityPrompts: Prompt[] = [
  {
    id: "weekly-planning-review",
    slug: "revision-y-planificacion-semanal",
    title: "Hacer la revisión y planificación semanal",
    description:
      "Guía para una revisión semanal completa en 45 minutos: limpiar bandejas de entrada, revisar compromisos, elegir prioridades y planificar la semana.",
    content: `Actúa como un coach de productividad con enfoque GTD (Getting Things Done), pragmático y sin dogmas.

Guíame en mi revisión semanal. Este es mi estado actual:

Bandejas de entrada sin procesar (email, notas, mensajes, tareas sueltas):
{{inbox}}

Proyectos activos y su estado:
{{projects}}

Calendario de la semana próxima (reuniones, compromisos fijos):
{{calendar}}

Lo que quedó pendiente de la semana pasada:
{{pending}}

Estructura la revisión en bloques con tiempo estimado:

1. Vaciar y procesar (15 min): ayúdame a clasificar cada elemento de la bandeja: papelera, delegar, hacer ahora (menos de 2 minutos), incubar o convertir en próxima acción concreta dentro de un proyecto. Para los que convierta en acción, redacta la acción empezando por verbo y con criterio de "hecho".
2. Revisar proyectos (10 min): para cada proyecto activo, dime si tiene una próxima acción clara o está bloqueado (y qué lo desbloquea). Señala proyectos zombies que conviene archivar o matar explícitamente.
3. Elegir el foco (10 min): propón las 3 prioridades de la semana (no más) y justifícalas según mis objetivos. Todo lo demás queda en la lista de "podría hacerse" sin culpa.
4. Planificar (10 min): encaja prioridades y pendientes en el calendario real, reservando bloques de trabajo profundo para las prioridades y dejando margen para imprevistos. Señala conflictos y reuniones que debería declinar o acortar.

Cierra con: mi lista de próximas acciones por contexto, las 3 prioridades visibles, y una frase honesta sobre si la semana es realista o estoy sobrecomprometido.`,
    language: "es",
    module: "productivity",
    category: "planning",
    subcategories: ["weekly-review"],
    tags: ["checklist", "template"],
    useCases: [
      "Hacer la revisión semanal de los viernes o domingos",
      "Recuperar el control tras una semana caótica",
      "Preparar la semana cuando hay más demanda que horas",
    ],
    createdAt: "2025-09-12",
    updatedAt: "2026-01-05",
  },
  {
    id: "decision-matrix",
    slug: "matriz-de-decision",
    title: "Decidir entre opciones con una matriz ponderada",
    description:
      "Método para tomar una decisión compleja: criterios explícitos, ponderación, puntuación de opciones, análisis de sensibilidad y registro de la decisión.",
    content: `Actúa como un facilitador de decisiones que combina rigor analítico con sentido común.

Tengo que tomar una decisión y quiero hacerlo de forma estructurada.

Decisión a tomar:
{{decision}}

Opciones sobre la mesa:
{{options}}

Contexto (restricciones, plazos, qué está en juego):
{{context}}

Guíame por el proceso:

1. Encuadre: reformula la decisión en una frase precisa (decidir "si" no es lo mismo que decidir "cuál"). Detecta si hay opciones ocultas que no he listado, incluida la opción de no hacer nada.
2. Criterios: propón los criterios de evaluación relevantes (entre 4 y 7), definiendo cada uno de forma observable. Separa los criterios eliminatorios (requisitos mínimos que descartan una opción por sí solos) de los comparativos.
3. Ponderación: asígnale un peso a cada criterio (sumando 100) y explícame el razonamiento. Si dos criterios pesan casi igual que los demás juntos, coméntalo.
4. Puntuación: construye la matriz y puntúa cada opción en cada criterio del 1 al 5, justificando cada puntuación con una frase. Calcula el resultado ponderado.
5. Análisis de sensibilidad: muestra qué criterio tendría que cambiar de peso o puntuación para que gane otra opción. Si el resultado se invierte con un cambio pequeño, dilo claramente: la decisión es ajustada y el análisis no debería decidir solo.
6. Recomendación y registro: tu recomendación, el principal riesgo de la opción ganadora y cómo vigilarlo, y un párrafo de "registro de decisión" que pueda guardar para revisitarla en el futuro.

Si en algún punto falta información crítica, indícame exactamente qué averiguar antes de decidir y qué opción elegirías si tuviera que decidir hoy.`,
    language: "es",
    module: "productivity",
    category: "decision-making",
    subcategories: ["decision-matrix"],
    tags: ["analysis", "template"],
    useCases: [
      "Elegir entre varias ofertas, herramientas o candidatos",
      "Decidir con un equipo sin que gane quien más habla",
      "Documentar decisiones personales importantes para revisarlas después",
    ],
    createdAt: "2025-10-05",
    updatedAt: "2026-02-15",
  },
];
