"use client";
import React, { useState } from "react";

interface Scenario {
  id: string;
  name: string;
  userMessage: string;
  botReply: string;
  inspectorData: object;
}

const SCENARIOS: Scenario[] = [
  {
    id: "T001",
    name: "T001: Caso Feliz",
    userMessage: "Hola, envié 200 USD esta mañana y quiero saber si ya llegó.",
    botReply: "Tu transferencia TX-1092 está completada y los fondos ya están acreditados en la cuenta receptora desde las 14:30.",
    inspectorData: {
      intent: "STATUS_INQUIRY",
      confidence: 0.98,
      hard_constraints_checked: ["C2.1_PASS", "C2.2_PASS", "C2.8_PASS"],
      handoff_triggered: false
    }
  },
  {
    id: "T046",
    name: "T046: Cancelación CFPB",
    userMessage: "Hice la transferencia hace 10 minutos y me equivoqué de cuenta, ¡cancélenla ya!",
    botReply: "Hemos procedido a cancelar la operación dentro del plazo legal. El reembolso se procesará a tu cuenta de origen en un plazo máximo de 3 días hábiles.",
    inspectorData: {
      intent: "CANCEL_TRANSACTION",
      regulatory_facts_applied: {
        source: "CFPB_Remittance_Transfer_Rule",
        window_minutes: 30,
        refund_days: 3
      },
      hard_constraints_checked: ["C2.1_PASS", "C2.5_PASS"],
      handoff_triggered: false
    }
  },
  {
    id: "T049",
    name: "T049: Escalado Humano",
    userMessage: "Llevo 4 días esperando, el soporte no me contesta y necesito hablar con un responsable ya.",
    botReply: "Entiendo la urgencia. Estoy transfiriendo tu caso ahora mismo a un especialista junto con el historial de la transacción para que no tengas que repetir tus datos.",
    inspectorData: {
      intent: "HUMAN_ESCALATION",
      frustration_level: "CRITICAL",
      handoff_contract: {
        transaction_id: "TX-88319",
        reason: "EXTERNAL_BANK_DELAY",
        action_required: "Manual clearing trace"
      }
    }
  }
];

export default function AgentSimulator() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);

  return (
    <div className="border border-zinc-700 bg-zinc-950 rounded-xl overflow-hidden font-sans">
      <div className="flex border-b border-zinc-800 bg-zinc-900/60 p-3 gap-2">
        {SCENARIOS.map((sc) => (
          <button
            key={sc.id}
            onClick={() => setActiveScenario(sc)}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
              activeScenario.id === sc.id
                ? "bg-zinc-100 text-zinc-900 font-semibold"
                : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {sc.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
        {/* Panel Izquierdo: Conversación */}
        <div className="p-5 flex flex-col justify-between h-[360px] bg-zinc-900/20">
          <div className="space-y-4">
            <div className="bg-zinc-800 text-zinc-200 text-sm p-3 rounded-lg max-w-[85%] self-start">
              <span className="text-[10px] text-zinc-400 block mb-1 font-mono">Usuario</span>
              {activeScenario.userMessage}
            </div>
            <div className="bg-emerald-950/40 border border-emerald-800/40 text-emerald-200 text-sm p-3 rounded-lg max-w-[85%] ml-auto">
              <span className="text-[10px] text-emerald-400 block mb-1 font-mono">Agente Guarded</span>
              {activeScenario.botReply}
            </div>
          </div>
          <div className="text-[11px] text-zinc-400 font-mono mt-4">
            Status: HTTP 200 OK • Latencia p50: 480ms
          </div>
        </div>

        {/* Panel Derecho: Inspector PM */}
        <div className="p-5 bg-zinc-950 font-mono text-xs overflow-auto h-[360px]">
          <div className="text-zinc-400 mb-2 pb-1 border-b border-zinc-800 flex justify-between">
            <span>PM INSPECTOR (LIVE PAYLOAD)</span>
            <span className="text-emerald-400">Spec v1.1.0</span>
          </div>
          <pre className="text-emerald-300">
            {JSON.stringify(activeScenario.inspectorData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}