"use client";
import React, { useState } from "react";

interface Initiative {
  id: string;
  name: string;
  reach: number;
  impact: number;
  baseConfidence: number;
  effort: number;
  status: "SPRINT_1" | "DISCARDED";
  rationale: string;
}

const INITIATIVES: Initiative[] = [
  {
    id: "A",
    name: "Micro-audios asíncronos (10 min)",
    reach: 180,
    impact: 2.0,
    baseConfidence: 0.8,
    effort: 1.5,
    status: "SPRINT_1",
    rationale: "Ataca la fricción de hábito sin abrumar con vídeo largo."
  },
  {
    id: "B",
    name: "Acompañamiento semanal por mensajería",
    reach: 90,
    impact: 3.0,
    baseConfidence: 0.8,
    effort: 1.0,
    status: "SPRINT_1",
    rationale: "Resuelve la necesidad de rendición de cuentas con esfuerzo mínimo."
  },
  {
    id: "C",
    name: "Plataforma web propia con login",
    reach: 120,
    impact: 1.0,
    baseConfidence: 0.5,
    effort: 6.0,
    status: "DISCARDED",
    rationale: "Fricción de acceso excesiva; Gumroad ya cubre la transacción."
  },
  {
    id: "D",
    name: "App móvil nativa dedicada (iOS/Android)",
    reach: 150,
    impact: 2.0,
    baseConfidence: 0.5,
    effort: 10.0,
    status: "DISCARDED",
    rationale: "Pedida por el 42% en redes, pero rechazada por ratio impacto/coste."
  }
];

export default function RiceCalculator() {
  const [confidencePenalty, setConfidencePenalty] = useState<number>(0);

  const calculateScore = (init: Initiative) => {
    const adjustedConfidence = Math.max(0.1, init.baseConfidence - confidencePenalty);
    return Math.round((init.reach * init.impact * adjustedConfidence) / init.effort);
  };

  const sortedInitiatives = [...INITIATIVES].sort(
    (a, b) => calculateScore(b) - calculateScore(a)
  );

  return (
    <div className="border border-zinc-700 bg-zinc-950 rounded-xl p-6 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-wide">
            Test de Sensibilidad RICE Dinámico
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Simula incertidumbre degradando la confianza en todas las hipótesis.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800">
          <label htmlFor="confidence-slider" className="text-xs font-mono text-zinc-300">
            Penalización de Confianza:
          </label>
          <input
            id="confidence-slider"
            type="range"
            min="0"
            max="0.4"
            step="0.05"
            value={confidencePenalty}
            onChange={(e) => setConfidencePenalty(parseFloat(e.target.value))}
            className="accent-emerald-500 cursor-pointer w-28"
          />
          <span className="text-xs font-mono font-bold text-emerald-400 min-w-[40px] text-right">
            -{(confidencePenalty * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="text-zinc-500 border-b border-zinc-800/80">
              <th className="pb-3">Iniciativa</th>
              <th className="pb-3">Reach</th>
              <th className="pb-3">Impact</th>
              <th className="pb-3">Conf. Ajustada</th>
              <th className="pb-3">Effort (sem)</th>
              <th className="pb-3 text-right">RICE Score</th>
              <th className="pb-3 text-right">Decisión</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/40">
            {sortedInitiatives.map((item) => {
              const score = calculateScore(item);
              const isSelected = item.status === "SPRINT_1";
              return (
                <tr key={item.id} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="py-3 text-zinc-200 font-sans font-medium">
                    <span className="font-mono text-zinc-500 mr-2">[{item.id}]</span>
                    {item.name}
                  </td>
                  <td className="py-3 text-zinc-400">{item.reach}</td>
                  <td className="py-3 text-zinc-400">{item.impact.toFixed(1)}</td>
                  <td className="py-3 text-emerald-400 font-bold">
                    {((item.baseConfidence - confidencePenalty) * 100).toFixed(0)}%
                  </td>
                  <td className="py-3 text-zinc-400">{item.effort.toFixed(1)}</td>
                  <td className="py-3 text-right font-bold text-zinc-100">{score}</td>
                  <td className="py-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isSelected
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                      }`}
                    >
                      {isSelected ? "PRIORIZADO" : "DESCARTADO"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 pt-3 border-t border-zinc-800/60 text-[11px] text-zinc-500 font-mono flex justify-between">
        <span>Fórmula: (Reach × Impact × Confidence) / Effort</span>
        <span>Aritmética visible • Sin cajas negras</span>
      </div>
    </div>
  );
}