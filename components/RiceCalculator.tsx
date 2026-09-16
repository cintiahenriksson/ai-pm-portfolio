"use client";
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  es: {
    sliderLabel: "Penalización por Incertidumbre (Confianza):",
    sliderHelp: "Simula el impacto de degradar las estimaciones optimistas hasta un 50%.",
    discountTag: "Descuento aplicado:",
    thInitiative: "Iniciativa",
    thReach: "Alcance (R)",
    thImpact: "Impacto (I)",
    thConfidence: "Confianza (C)",
    thEffort: "Esfuerzo (E)",
    thScore: "Score RICE",
    effortUnit: "sem",
    tagDiscarded: "DESCARTADA (TRADE-OFF)",
    tagWinner: "PRIORIDAD #1 (MVP)",
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
        name: "Grupo de rendición de cuentas en Telegram",
        reach: 280,
        impact: 2,
        baseConfidence: 0.7,
        effort: 1.5,
        highlight: false,
      },
      {
        id: "biblioteca-video",
        name: "Biblioteca on-demand de clases grabadas (60 min)",
        reach: 120,
        impact: 1,
        baseConfidence: 0.5,
        effort: 4.0,
        highlight: false,
      },
      {
        id: "app-nativa",
        name: "App móvil nativa en iOS/Android (Petición en IG)",
        reach: 300,
        impact: 2,
        baseConfidence: 0.5,
        effort: 10.0,
        highlight: false,
        discarded: true,
      },
    ],
  },
  en: {
    sliderLabel: "Uncertainty Penalty (Confidence Discount):",
    sliderHelp: "Simulates the resilience of the roadmap when optimistic estimates drop up to 50%.",
    discountTag: "Applied discount:",
    thInitiative: "Initiative",
    thReach: "Reach (R)",
    thImpact: "Impact (I)",
    thConfidence: "Confidence (C)",
    thEffort: "Effort (E)",
    thScore: "RICE Score",
    effortUnit: "w",
    tagDiscarded: "DISCARDED (TRADE-OFF)",
    tagWinner: "PRIORITY #1 (MVP)",
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
        id: "biblioteca-video",
        name: "On-demand 60-min video class archive",
        reach: 120,
        impact: 1,
        baseConfidence: 0.5,
        effort: 4.0,
        highlight: false,
      },
      {
        id: "app-nativa",
        name: "Native iOS/Android mobile app (Top IG request)",
        reach: 300,
        impact: 2,
        baseConfidence: 0.5,
        effort: 10.0,
        highlight: false,
        discarded: true,
      },
    ],
  },
};

export default function RiceCalculator() {
  const { lang } = useLanguage();
  const t = content[lang] || content.es;

  const [discount, setDiscount] = useState<number>(0);

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
          <label className="text-foreground font-semibold font-mono">
            {t.sliderLabel}
          </label>
          <span className="text-accent font-bold font-mono">
            {t.discountTag} -{discount}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          step="5"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          className="w-full cursor-pointer"
        />
        <p className="text-[11px] text-muted leading-relaxed">
          {t.sliderHelp}
        </p>
      </div>

      {/* RICE table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-border rounded-lg overflow-hidden font-mono">
          <thead className="bg-surface-2 text-muted text-[11px]">
            <tr className="border-b border-border">
              <th className="p-3">{t.thInitiative}</th>
              <th className="p-3 text-center">{t.thReach}</th>
              <th className="p-3 text-center">{t.thImpact}</th>
              <th className="p-3 text-center">{t.thConfidence}</th>
              <th className="p-3 text-center">{t.thEffort}</th>
              <th className="p-3 text-right">{t.thScore}</th>
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
                      ? "bg-warm/10 opacity-70"
                      : ""
                  }
                >
                  <td className="p-3 font-sans">
                    <span className="font-semibold block text-foreground">{item.name}</span>
                    {item.highlight && (
                      <span className="text-[10px] font-mono text-accent font-bold">
                        {t.tagWinner}
                      </span>
                    )}
                    {item.discarded && (
                      <span className="text-[10px] font-mono text-warm font-bold">
                        {t.tagDiscarded}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">{item.reach}</td>
                  <td className="p-3 text-center">{item.impact}</td>
                  <td className="p-3 text-center text-muted">
                    {Math.round(adjustedConf * 100)}%
                  </td>
                  <td className="p-3 text-center">{item.effort}{t.effortUnit}</td>
                  <td
                    className={`p-3 text-right font-bold text-sm ${
                      item.highlight
                        ? "text-accent"
                        : item.discarded
                        ? "text-warm"
                        : "text-foreground"
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
    </div>
  );
}
