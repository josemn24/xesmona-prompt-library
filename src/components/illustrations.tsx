import type { SVGProps } from "react";
import type { IllustrationId } from "@/src/data";

type SceneId =
  | "book"
  | "calendar"
  | "chart"
  | "chat"
  | "code"
  | "decision"
  | "document"
  | "data-cylinder"
  | "integration-plugs"
  | "deploy-package"
  | "files"
  | "funnel"
  | "gears"
  | "globe"
  | "loupe"
  | "megaphone"
  | "nodes"
  | "pencil"
  | "pipeline"
  | "project-analysis"
  | "robot"
  | "refactor-loop"
  | "server"
  | "shield"
  | "speed"
  | "wand";

type IllustrationProps = Omit<SVGProps<SVGSVGElement>, "viewBox"> & {
  iconId: IllustrationId;
  size?: "sm" | "md" | "lg";
};

const sceneByIllustration: Record<IllustrationId, SceneId> = {
  "module-software-development": "code",
  "module-artificial-intelligence": "robot",
  "module-marketing": "megaphone",
  "module-business": "chart",
  "module-productivity": "files",
  "architecture-blocks": "nodes",
  "browser-window": "code",
  "server-stack": "server",
  "data-cylinder": "data-cylinder",
  "integration-plugs": "integration-plugs",
  "deploy-package": "deploy-package",
  "refactor-loop": "refactor-loop",
  "project-analysis": "project-analysis",
  "globe-window": "globe",
  "test-check": "shield",
  "git-branches": "nodes",
  "gear-cycle": "gears",
  pipeline: "pipeline",
  "chart-radar": "chart",
  "database-cylinder": "server",
  "link-nodes": "nodes",
  "shield-code": "shield",
  "document-code": "document",
  speedometer: "speed",
  "code-refresh": "pipeline",
  "prompt-wand": "wand",
  "chat-chip": "chat",
  "robot-compass": "robot",
  "document-retrieval": "document",
  "model-score": "chart",
  "automation-spark": "gears",
  "editorial-calendar": "calendar",
  "search-chart": "loupe",
  "mail-growth": "chart",
  "social-bubbles": "chat",
  "pencil-copy": "pencil",
  "market-loupe": "loupe",
  "roadmap-flag": "decision",
  "analysis-chart": "chart",
  "canvas-blocks": "nodes",
  "sales-funnel": "funnel",
  "operations-gears": "gears",
  "kanban-check": "pipeline",
  "build-measure-learn": "pipeline",
  "organized-files": "files",
  "planning-calendar": "calendar",
  "research-loupe": "loupe",
  "decision-branch": "decision",
  "communication-bubbles": "chat",
  "learning-book": "book",
};

const sizeClass = {
  sm: "size-10",
  md: "size-16",
  lg: "size-24",
} as const;

const ink = "var(--brand-ink)";
const slate = "var(--brand-slate)";
const coral = "var(--brand-coral)";
const orange = "var(--brand-orange)";
const yellow = "var(--brand-yellow)";
const turquoise = "var(--brand-turquoise)";
const blue = "var(--brand-blue)";
const violet = "var(--brand-violet)";
const cream = "var(--brand-cream)";

function Line({
  x1,
  y1,
  x2,
  y2,
  color = ink,
  width = 4,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeLinecap="round"
      strokeWidth={width}
    />
  );
}

function Dot({ cx, cy, r = 5, color = coral }: { cx: number; cy: number; r?: number; color?: string }) {
  return <circle cx={cx} cy={cy} r={r} fill={color} stroke={ink} strokeWidth="2" />;
}

function Scene({ scene }: { scene: SceneId }) {
  switch (scene) {
    case "book":
      return (
        <>
          <path d="M18 25c13-6 25-6 40 2v49c-15-8-27-8-40-2z" fill={turquoise} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <path d="M102 25c-13-6-25-6-40 2v49c15-8 27-8 40-2z" fill={yellow} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <Line x1={60} y1={28} x2={60} y2={76} color={ink} />
          <Line x1={29} y1={39} x2={47} y2={43} color={cream} width={3} />
          <Line x1={73} y1={39} x2={91} y2={35} color={cream} width={3} />
        </>
      );
    case "calendar":
      return (
        <>
          <rect x="17" y="20" width="86" height="63" rx="10" fill={cream} stroke={ink} strokeWidth="4" />
          <path d="M17 37h86" stroke={ink} strokeWidth="7" />
          <Line x1={35} y1={13} x2={35} y2={27} color={coral} width={6} />
          <Line x1={85} y1={13} x2={85} y2={27} color={turquoise} width={6} />
          <circle cx="38" cy="53" r="5" fill={orange} /><circle cx="60" cy="53" r="5" fill={blue} /><circle cx="82" cy="53" r="5" fill={violet} />
          <circle cx="38" cy="70" r="5" fill={turquoise} /><circle cx="60" cy="70" r="5" fill={coral} />
        </>
      );
    case "chart":
      return (
        <>
          <rect x="15" y="15" width="90" height="68" rx="13" fill={cream} stroke={ink} strokeWidth="4" />
          <Line x1={30} y1={68} x2={30} y2={31} color={ink} width={3} />
          <Line x1={30} y1={68} x2={92} y2={68} color={ink} width={3} />
          <path d="M35 57l15-14 13 8 20-24" fill="none" stroke={coral} strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
          <Dot cx={35} cy={57} color={orange} /><Dot cx={50} cy={43} color={yellow} /><Dot cx={63} cy={51} color={turquoise} /><Dot cx={83} cy={27} color={violet} />
        </>
      );
    case "chat":
      return (
        <>
          <path d="M18 26c0-7 6-12 13-12h40c7 0 13 5 13 12v24c0 7-6 12-13 12H50l-15 12 2-12h-6c-7 0-13-5-13-12z" fill={turquoise} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <path d="M40 48c0-7 6-12 13-12h26c7 0 13 5 13 12v17c0 7-6 12-13 12H66L54 86l2-9h-3c-7 0-13-5-13-12z" fill={coral} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <Line x1={32} y1={29} x2={59} y2={29} color={cream} width={4} /><Line x1={55} y1={50} x2={76} y2={50} color={cream} width={4} />
        </>
      );
    case "code":
      return (
        <>
          <rect x="13" y="17" width="94" height="66" rx="11" fill={slate} stroke={ink} strokeWidth="4" />
          <path d="M13 34h94" stroke={ink} strokeWidth="5" />
          <circle cx="26" cy="26" r="3" fill={coral} /><circle cx="36" cy="26" r="3" fill={yellow} /><circle cx="46" cy="26" r="3" fill={turquoise} />
          <path d="M35 51l-11 9 11 9M85 51l11 9-11 9M69 47l-10 27" fill="none" stroke={cream} strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
          <path d="M45 46h12v8H45zM72 67h13v8H72z" fill={orange} />
        </>
      );
    case "decision":
      return (
        <>
          <path d="M60 16v20M60 36L29 67M60 36l31 31" fill="none" stroke={ink} strokeLinecap="round" strokeWidth="6" />
          <Dot cx={60} cy={17} r={8} color={yellow} /><Dot cx={29} cy={67} r={12} color={turquoise} /><Dot cx={91} cy={67} r={12} color={coral} />
          <path d="M23 67h12M85 67h12" stroke={cream} strokeLinecap="round" strokeWidth="3" />
        </>
      );
    case "document":
      return (
        <>
          <path d="M27 12h43l24 24v50H27z" fill={cream} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <path d="M70 12v25h24" fill={yellow} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <Line x1={42} y1={51} x2={78} y2={51} color={blue} width={5} /><Line x1={42} y1={63} x2={84} y2={63} color={slate} width={4} /><Line x1={42} y1={74} x2={70} y2={74} color={slate} width={4} />
          <Dot cx={40} cy={31} r={6} color={coral} />
        </>
      );
    case "data-cylinder":
      return (
        <>
          <path
            d="M21 24v48c0 8 17 13 39 13s39-5 39-13V24"
            fill={blue}
            stroke={ink}
            strokeLinejoin="round"
            strokeWidth="4"
          />
          <ellipse cx="60" cy="24" rx="39" ry="13" fill={yellow} stroke={ink} strokeWidth="4" />
          <path
            d="M21 48c0 8 17 13 39 13s39-5 39-13"
            fill="none"
            stroke={cream}
            strokeWidth="4"
          />
          <circle cx="42" cy="36" r="4" fill={coral} stroke={ink} strokeWidth="2" />
          <Line x1={53} y1={36} x2={80} y2={36} color={cream} width={4} />
        </>
      );
    case "project-analysis":
      return (
        <>
          <path
            d="M19 14h43l20 20v48H19z"
            fill={cream}
            stroke={ink}
            strokeLinejoin="round"
            strokeWidth="4"
          />
          <path d="M62 14v22h20" fill={yellow} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <Line x1={31} y1={49} x2={61} y2={49} color={blue} width={5} />
          <Line x1={31} y1={61} x2={54} y2={61} color={slate} width={4} />
          <Line x1={31} y1={72} x2={47} y2={72} color={slate} width={4} />
          <circle cx="68" cy="61" r="17" fill={turquoise} stroke={ink} strokeWidth="4" />
          <path d="M60 64l6-7 5 4 7-10" fill="none" stroke={coral} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <Line x1={81} y1={74} x2={98} y2={88} color={ink} width={8} />
        </>
      );
    case "integration-plugs":
      return (
        <>
          <path d="M43 43h34" stroke={ink} strokeLinecap="round" strokeWidth="7" />
          <path d="M51 43h18" stroke={yellow} strokeLinecap="round" strokeWidth="4" />
          <path d="M16 31h28v25H16z" fill={turquoise} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <path d="M76 31h28v25H76z" fill={coral} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <Line x1={24} y1={24} x2={24} y2={31} color={ink} width={5} />
          <Line x1={36} y1={24} x2={36} y2={31} color={ink} width={5} />
          <Line x1={84} y1={56} x2={84} y2={63} color={ink} width={5} />
          <Line x1={96} y1={56} x2={96} y2={63} color={ink} width={5} />
          <path d="M46 37l7 6-7 6M74 37l-7 6 7 6" fill="none" stroke={cream} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </>
      );
    case "deploy-package":
      return (
        <>
          <rect x="13" y="50" width="22" height="25" rx="6" fill={coral} stroke={ink} strokeWidth="4" />
          <rect x="43" y="50" width="22" height="25" rx="6" fill={yellow} stroke={ink} strokeWidth="4" />
          <Line x1={35} y1={62} x2={43} y2={62} color={ink} width={5} />
          <Line x1={65} y1={62} x2={77} y2={62} color={ink} width={5} />
          <path d="M77 39h27v36H77z" fill={turquoise} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <path d="M77 49h27M90 39v36" fill="none" stroke={cream} strokeWidth="3" />
          <path d="M90 14v20M82 23l8-9 8 9" fill="none" stroke={violet} strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
        </>
      );
    case "files":
      return (
        <>
          <path d="M19 29h36l8 9v42H19z" fill={yellow} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <path d="M56 22h37l8 9v42H56z" fill={coral} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <path d="M27 29v-9h27l8 9M64 22v-9h27l8 9" fill="none" stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <Line x1={70} y1={43} x2={88} y2={43} color={cream} width={4} /><Line x1={70} y1={55} x2={94} y2={55} color={cream} width={4} />
        </>
      );
    case "funnel":
      return (
        <>
          <path d="M15 18h90L73 52v27l-25 7V52z" fill={orange} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <path d="M15 18h90l-10 14H25z" fill={yellow} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <circle cx="47" cy="45" r="6" fill={turquoise} /><circle cx="66" cy="56" r="6" fill={coral} /><circle cx="61" cy="74" r="5" fill={violet} />
        </>
      );
    case "gears":
      return (
        <>
          <circle cx="43" cy="53" r="23" fill={turquoise} stroke={ink} strokeWidth="5" />
          <circle cx="80" cy="35" r="15" fill={yellow} stroke={ink} strokeWidth="5" />
          <circle cx="82" cy="75" r="13" fill={coral} stroke={ink} strokeWidth="5" />
          <circle cx="43" cy="53" r="7" fill={cream} stroke={ink} strokeWidth="3" /><circle cx="80" cy="35" r="5" fill={cream} /><circle cx="82" cy="75" r="4" fill={cream} />
        </>
      );
    case "globe":
      return (
        <>
          <circle cx="57" cy="48" r="32" fill={turquoise} stroke={ink} strokeWidth="5" />
          <path d="M25 48h64M57 16c-14 9-14 55 0 64M57 16c14 9 14 55 0 64M31 30c15 8 37 8 52 0M31 66c15-8 37-8 52 0" fill="none" stroke={cream} strokeLinecap="round" strokeWidth="3" />
          <path d="M86 66l17 8-15 8z" fill={coral} stroke={ink} strokeLinejoin="round" strokeWidth="3" />
        </>
      );
    case "loupe":
      return (
        <>
          <circle cx="48" cy="42" r="25" fill={yellow} stroke={ink} strokeWidth="5" />
          <Line x1={66} y1={61} x2={94} y2={85} color={ink} width={10} />
          <path d="M36 49l9-10 8 5 10-16" fill="none" stroke={coral} strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
          <Dot cx={36} cy={49} r={4} color={turquoise} /><Dot cx={45} cy={39} r={4} color={blue} /><Dot cx={53} cy={44} r={4} color={violet} />
        </>
      );
    case "megaphone":
      return (
        <>
          <path d="M24 42l61-22v42L24 40z" fill={coral} stroke={ink} strokeLinejoin="round" strokeWidth="5" />
          <path d="M24 42v20c0 7 7 10 13 5l7-21" fill={orange} stroke={ink} strokeLinejoin="round" strokeWidth="5" />
          <path d="M88 29c9 4 14 9 17 16M88 53c9-4 14-9 17-16" fill="none" stroke={turquoise} strokeLinecap="round" strokeWidth="5" />
          <circle cx="36" cy="49" r="6" fill={yellow} />
        </>
      );
    case "nodes":
      return (
        <>
          <Line x1={28} y1={27} x2={60} y2={48} color={ink} width={5} /><Line x1={92} y1={27} x2={60} y2={48} color={ink} width={5} /><Line x1={60} y1={48} x2={36} y2={78} color={ink} width={5} /><Line x1={60} y1={48} x2={86} y2={78} color={ink} width={5} />
          <Dot cx={28} cy={27} r={11} color={coral} /><Dot cx={92} cy={27} r={11} color={yellow} /><Dot cx={60} cy={48} r={14} color={turquoise} /><Dot cx={36} cy={78} r={11} color={violet} /><Dot cx={86} cy={78} r={11} color={orange} />
        </>
      );
    case "pencil":
      return (
        <>
          <path d="M29 72l7-19 40-40 13 13-40 40z" fill={yellow} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <path d="M76 13l13 13M36 53l13 13" stroke={coral} strokeLinecap="round" strokeWidth="7" />
          <path d="M29 72l-4 13 13-4z" fill={cream} stroke={ink} strokeLinejoin="round" strokeWidth="4" />
          <Line x1={54} y1={38} x2={72} y2={56} color={turquoise} width={4} />
        </>
      );
    case "pipeline":
      return (
        <>
          <rect x="15" y="25" width="23" height="46" rx="7" fill={coral} stroke={ink} strokeWidth="4" />
          <rect x="49" y="25" width="23" height="46" rx="7" fill={yellow} stroke={ink} strokeWidth="4" />
          <rect x="83" y="25" width="23" height="46" rx="7" fill={turquoise} stroke={ink} strokeWidth="4" />
          <Line x1={38} y1={48} x2={49} y2={48} color={ink} width={5} /><Line x1={72} y1={48} x2={83} y2={48} color={ink} width={5} />
          <path d="M29 38v22M63 38v22M97 38v22" stroke={cream} strokeLinecap="round" strokeWidth="4" />
        </>
      );
    case "refactor-loop":
      return (
        <>
          <path d="M30 35a34 34 0 0 1 57-5l7 7" fill="none" stroke={turquoise} strokeLinecap="round" strokeWidth="5" />
          <path d="M94 37l-2-11-10 5" fill="none" stroke={turquoise} strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
          <path d="M90 61a34 34 0 0 1-57 5l-7-7" fill="none" stroke={coral} strokeLinecap="round" strokeWidth="5" />
          <path d="M26 59l2 11 10-5" fill="none" stroke={coral} strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
          <path d="M43 40l-11 8 11 8M77 40l11 8-11 8M65 37l-9 22" fill="none" stroke={ink} strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
          <circle cx="60" cy="48" r="3" fill={yellow} />
        </>
      );
    case "robot":
      return (
        <>
          <rect x="27" y="27" width="66" height="52" rx="16" fill={violet} stroke={ink} strokeWidth="5" />
          <Line x1={60} y1={14} x2={60} y2={27} color={ink} width={5} /><Dot cx={60} cy={12} r={6} color={yellow} />
          <circle cx="48" cy="51" r="6" fill={cream} /><circle cx="72" cy="51" r="6" fill={cream} /><Line x1={48} y1={66} x2={72} y2={66} color={cream} width={4} />
          <path d="M19 43h8M93 43h8" stroke={turquoise} strokeLinecap="round" strokeWidth="5" />
        </>
      );
    case "server":
      return (
        <>
          <rect x="22" y="17" width="76" height="22" rx="7" fill={blue} stroke={ink} strokeWidth="4" />
          <rect x="22" y="43" width="76" height="22" rx="7" fill={turquoise} stroke={ink} strokeWidth="4" />
          <rect x="22" y="69" width="76" height="12" rx="5" fill={slate} stroke={ink} strokeWidth="4" />
          <Dot cx={38} cy={28} r={4} color={yellow} /><Line x1={52} y1={28} x2={82} y2={28} color={cream} width={4} />
          <Dot cx={38} cy={54} r={4} color={coral} /><Line x1={52} y1={54} x2={82} y2={54} color={cream} width={4} />
        </>
      );
    case "shield":
      return (
        <>
          <path d="M60 13l35 13v25c0 19-13 30-35 39-22-9-35-20-35-39V26z" fill={turquoise} stroke={ink} strokeLinejoin="round" strokeWidth="5" />
          <path d="M42 51l12 12 25-26" fill="none" stroke={cream} strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" />
          <circle cx="84" cy="24" r="9" fill={coral} stroke={ink} strokeWidth="3" />
        </>
      );
    case "speed":
      return (
        <>
          <path d="M18 72a42 42 0 0184 0" fill={yellow} stroke={ink} strokeWidth="5" />
          <path d="M32 72a28 28 0 0156 0" fill={cream} stroke={ink} strokeWidth="4" />
          <Line x1={60} y1={69} x2={78} y2={40} color={coral} width={6} /><circle cx="60" cy="72" r="7" fill={turquoise} stroke={ink} strokeWidth="3" />
          <Line x1={28} y1={65} x2={34} y2={65} color={ink} width={3} /><Line x1={86} y1={65} x2={92} y2={65} color={ink} width={3} />
        </>
      );
    case "wand":
      return (
        <>
          <path d="M25 73l52-52" stroke={ink} strokeLinecap="round" strokeWidth="12" /><path d="M25 73l52-52" stroke={violet} strokeLinecap="round" strokeWidth="7" />
          <path d="M88 14v17M79 22h18M96 38l6 6M90 44l-6 6" stroke={orange} strokeLinecap="round" strokeWidth="4" />
          <path d="M35 23v11M29 29h12" stroke={turquoise} strokeLinecap="round" strokeWidth="4" />
          <circle cx="25" cy="73" r="8" fill={coral} stroke={ink} strokeWidth="3" />
        </>
      );
  }
}

export function Illustration({ iconId, size = "md", className, ...props }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 96"
      className={`${sizeClass[size]} shrink-0 ${className ?? ""}`}
      role="img"
      aria-hidden={props["aria-label"] === undefined ? true : undefined}
      {...props}
    >
      <Scene scene={sceneByIllustration[iconId]} />
    </svg>
  );
}
