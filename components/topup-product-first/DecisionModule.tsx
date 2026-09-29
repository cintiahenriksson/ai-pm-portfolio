"use client";
import React, { useState } from "react";
import { DECISION_BRANCHES, type BranchTone, type Lang } from "@/lib/topup-product-first-data";

const T = {
  en: {
    prompt: "What would you decide?",
    simulated: "Simulated",
    ifTitle: "If the experiment shows…",
    thenTitle: "Then the decision is…",
  },
  es: {
    prompt: "¿Qué decidirías?",
    simulated: "Simulado",
    ifTitle: "Si el experimento muestra…",
    thenTitle: "Entonces la decisión es…",
  },
} as const;

const toneText: Record<BranchTone, string> = {
  stable: "text-stable",
  warn: "text-warn",
  risk: "text-risk",
};
const toneChip: Record<BranchTone, string> = {
  stable: "bg-stable-soft text-stable",
  warn: "bg-warn-soft text-warn",
  risk: "bg-risk-soft text-risk",
};
const toneBorder: Record<BranchTone, string> = {
  stable: "border-stable/40 bg-stable-soft/40",
  warn: "border-warn/40 bg-warn-soft/40",
  risk: "border-risk/40 bg-risk-soft/40",
};

export default function DecisionModule({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [activeId, setActiveId] = useState(DECISION_BRANCHES[0].id);
  const active = DECISION_BRANCHES.find((b) => b.id === activeId)!;

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface">
      <div className="flex flex-col gap-3 border-b border-border bg-surface-2 p-4 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="font-display text-lg tracking-tight text-foreground">{t.prompt}</h4>
        <div role="tablist" aria-label={t.prompt} className="flex flex-wrap gap-2">
          {DECISION_BRANCHES.map((b) => (
            <button
              key={b.id}
              role="tab"
              aria-selected={activeId === b.id}
              onClick={() => setActiveId(b.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                activeId === b.id
                  ? "bg-accent text-accent-foreground"
                  : "border border-border bg-surface text-muted hover:text-foreground"
              }`}
            >
              {b.title[lang]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${toneChip[active.tone]}`}>
            {t.simulated}
          </span>
          <span className={`font-display text-base tracking-tight ${toneText[active.tone]}`}>
            {active.title[lang]}
          </span>
        </div>

        <div className={`rounded-2xl border p-5 ${toneBorder[active.tone]}`}>
          <p className="text-xs uppercase tracking-[0.12em] text-muted">{t.ifTitle}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{active.condition[lang]}</p>
          <div className="my-4 h-px bg-border" />
          <p className="text-xs uppercase tracking-[0.12em] text-muted">{t.thenTitle}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{active.decision[lang]}</p>
        </div>
      </div>
    </div>
  );
}
