"use client";
import React, { useId, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  es: {
    sliderLabel: "Penalización por incertidumbre (descuento de confianza):",
    sliderHelp: "Simula la resiliencia del orden de prioridades cuando las estimaciones optimistas bajan hasta un 50%.",
    discountTag: "Descuento aplicado:",
    valueText: (d: number) => `Descuento de confianza del ${d}%`,
    thInitiative: "Iniciativa",
    thReach: "Alcance (R)",
    thImpact: "Impacto (I)",
    thConfidence: "Confianza (C)",
    thEffort: "Esfuerzo (E)",
    thScore: "Score RICE",
    effortUnit: "sem",
    tagDiscarded: "APLAZADA (TRADE-OFF)",
    tagWinner: "PRIORIDAD #1 (MVP)",
    impactScale:
      "Escala de impacto: 0 = insignificante, 1 = bajo, 2 = medio, 3 = efecto esperado alto sobre la hipótesis de retención de práctica.",
    reachNote: "El alcance es una estimación ilustrativa a 90 días, no un pronóstico de audiencia medida.",
    effortNote:
      "El esfuerzo incluye preparación, producción, lanzamiento y medición básica; son supuestos de planificación directivos.",
    initiatives: [
      {
        id: "micro-audios",
        name: "Micro-audios guiados de 5 min con check-in por mensajería",
        reach: 450,
        impact: 3,
        baseConfidence: 0.8,
        effort: 2.5,
        highlight: true,
      },
      {
        id: "comunidad-telegram",
        name: "Grupo de rendición de cuentas entre pares en Telegram",
        reach: 280,
        impact: 2,
        baseConfidence: 0.7,
        effort: 1.5,
        highlight: false,
      },
      {
        id: "app-nativa",
        name: "App móvil nativa en iOS/Android",
        reach: 300,
        impact: 2,
        baseConfidence: 0.5,
        effort: 10.0,
        highlight: false,
        discarded: true,
      },
      {
        id: "biblioteca-video",
        name: "Archivo on-demand de clases grabadas (60 min)",
        reach: 120,
        impact: 1,
        baseConfidence: 0.5,
        effort: 4.0,
        highlight: false,
      },
    ],
  },
  en: {
    sliderLabel: "Uncertainty penalty (confidence discount):",
    sliderHelp: "Simulates the resilience of the priority ranking when optimistic estimates drop up to 50%.",
    discountTag: "Applied discount:",
    valueText: (d: number) => `${d}% confidence discount`,
    thInitiative: "Initiative",
    thReach: "Reach (R)",
    thImpact: "Impact (I)",
    thConfidence: "Confidence (C)",
    thEffort: "Effort (E)",
    thScore: "RICE Score",
    effortUnit: "w",
    tagDiscarded: "DEFERRED (TRADE-OFF)",
    tagWinner: "PRIORITY #1 (MVP)",
    impactScale:
      "Impact scale: 0 = negligible, 1 = low, 2 = medium, 3 = high expected effect on the practice-retention hypothesis.",
    reachNote: "Reach is an illustrative 90-day scenario estimate, not a measured audience forecast.",
    effortNote:
      "Effort estimates include preparation, production, launch and basic measurement; they are directional planning assumptions.",
    initiatives: [
      {
        id: "micro-audios",
        name: "5-min guided micro-audio routines with messaging check-ins",
        reach: 450,
        impact: 3,
        baseConfidence: 0.8,
        effort: 2.5,
        highlight: true,
      },
      {
        id: "comunidad-telegram",
        name: "Telegram peer accountability group",
        reach: 280,
        impact: 2,
        baseConfidence: 0.7,
        effort: 1.5,
        highlight: false,
      },
      {
        id: "app-nativa",
        name: "Native iOS/Android mobile app",
        reach: 300,
        impact: 2,
        baseConfidence: 0.5,
        effort: 10.0,
        highlight: false,
        discarded: true,
      },
      {
        id: "biblioteca-video",
        name: "On-demand 60-min video class archive",
        reach: 120,
        impact: 1,
        baseConfidence: 0.5,
        effort: 4.0,
        highlight: false,
      },
    ],
  },
};

export default function RiceCalculator() {
  const { lang } = useLanguage();
  const t = content[lang] || content.es;

  const [discount, setDiscount] = useState<number>(0);
  const sliderId = useId();

  const calculateScore = (reach: number, impact: number, conf: number, effort: number) => {
    const adjustedConf = Math.max(0.1, conf * (1 - discount / 100));
    return Math.round((reach * impact * adjustedConf) / effort);
  };

  const sortedInitiatives = [...t.initiatives].sort((a, b) => {
    const scoreA = calculateScore(a.reach, a.impact, a.baseConfidence, a.effort);
    const scoreB = calculateScore(b.reach, b.impact, b.baseConfidence, b.effort);
    return scoreB - scoreA;
  });

  return (
    <div className="p-5 rounded-2xl bg-surface border border-border space-y-6 text-xs">
      {/* Sensitivity slider */}
      <div className="space-y-2 bg-surface-2 p-4 rounded-xl border border-border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <label htmlFor={sliderId} className="text-foreground font-semibold font-mono">
            {t.sliderLabel}
          </label>
          <span className="text-accent font-bold font-mono" aria-hidden="true">
            {t.discountTag} -{discount}%
          </span>
        </div>
        <input
          id={sliderId}
          type="range"
          min="0"
          max="50"
          step="5"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          className="w-full cursor-pointer accent-[var(--accent)]"
          aria-label={t.sliderLabel}
          aria-valuetext={t.valueText(discount)}
        />
        <p className="text-[11px] text-muted leading-relaxed">{t.sliderHelp}</p>
      </div>

      {/* RICE table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-border rounded-lg overflow-hidden font-mono">
          <caption className="sr-only">
            {t.thInitiative} — RICE = Reach × Impact × Confidence ÷ Effort
          </caption>
          <thead className="bg-surface-2 text-muted text-[11px]">
            <tr className="border-b border-border">
              <th scope="col" className="p-3">{t.thInitiative}</th>
              <th scope="col" className="p-3 text-center">{t.thReach}</th>
              <th scope="col" className="p-3 text-center">{t.thImpact}</th>
              <th scope="col" className="p-3 text-center">{t.thConfidence}</th>
              <th scope="col" className="p-3 text-center">{t.thEffort}</th>
              <th scope="col" className="p-3 text-right">{t.thScore}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface text-foreground/80">
            {sortedInitiatives.map((item) => {
              const adjustedConf = Math.max(0.1, item.baseConfidence * (1 - discount / 100));
              const score = calculateScore(item.reach, item.impact, item.baseConfidence, item.effort);

              return (
                <tr
                  key={item.id}
                  className={
                    item.highlight
                      ? "bg-accent-soft"
                      : item.discarded
                      ? "bg-warm/10 opacity-80"
                      : ""
                  }
                >
                  <td className="p-3 font-sans">
                    <span className="font-semibold block text-foreground">{item.name}</span>
                    {item.highlight && (
                      <span className="text-[10px] font-mono text-accent font-bold">{t.tagWinner}</span>
                    )}
                    {item.discarded && (
                      <span className="text-[10px] font-mono text-warm font-bold">{t.tagDiscarded}</span>
                    )}
                  </td>
                  <td className="p-3 text-center tabular-nums">{item.reach}</td>
                  <td className="p-3 text-center tabular-nums">{item.impact}</td>
                  <td className="p-3 text-center text-muted tabular-nums">{Math.round(adjustedConf * 100)}%</td>
                  <td className="p-3 text-center tabular-nums">
                    {item.effort}
                    {t.effortUnit}
                  </td>
                  <td
                    className={`p-3 text-right font-bold text-sm tabular-nums ${
                      item.highlight ? "text-accent" : item.discarded ? "text-warm" : "text-foreground"
                    }`}
                  >
                    {score}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Reading notes */}
      <div className="space-y-1.5 text-[11px] leading-relaxed text-muted">
        <p>{t.impactScale}</p>
        <p>{t.reachNote}</p>
        <p>{t.effortNote}</p>
      </div>
    </div>
  );
}
