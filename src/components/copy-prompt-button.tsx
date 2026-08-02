"use client";

import { Check, ClipboardCopy, TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type CopyState = "idle" | "copied" | "error";

const RESET_DELAY_MS = 3000;

/** Fallback for browsers/contexts where the async clipboard API is unavailable. */
function legacyCopy(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  let success = false;
  try {
    success = document.execCommand("copy");
  } catch {
    success = false;
  }
  document.body.removeChild(textarea);
  return success;
}

type CopyPromptButtonProps = {
  /** Only the prompt content: never the title, description or metadata. */
  content: string;
};

export function CopyPromptButton({ content }: CopyPromptButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  function scheduleReset() {
    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current);
    }
    resetTimer.current = window.setTimeout(() => setState("idle"), RESET_DELAY_MS);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setState("copied");
    } catch {
      setState(legacyCopy(content) ? "copied" : "error");
    }
    scheduleReset();
  }

  const Icon =
    state === "copied" ? Check : state === "error" ? TriangleAlert : ClipboardCopy;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-md bg-blue-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-900"
      >
        <Icon className="size-4" aria-hidden />
        Copiar prompt
      </button>
      <span
        role="status"
        aria-live="polite"
        className={`text-sm font-medium ${
          state === "error" ? "text-red-700" : "text-emerald-700"
        }`}
      >
        {state === "copied" && "Prompt copiado"}
        {state === "error" &&
          "No se pudo copiar el prompt. Selecciona el texto y cópialo manualmente."}
      </span>
    </div>
  );
}
