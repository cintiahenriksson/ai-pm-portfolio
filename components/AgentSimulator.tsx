"use client";
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Scenario {
  id: string;
  name: string;
  userMessage: string;
  botReply: string;
  inspectorData: object;
}

const CONTENT = {
  es: {
    userLabel: "Usuario",
    agentLabel: "Agente Guarded",
    statusText: "Status: HTTP 200 OK • Latencia p50: 480ms",
    inspectorTitle: "PM INSPECTOR (LIVE PAYLOAD)",
    scenarios: [
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
    ]
  },
  en: {
    userLabel: "User",
    agentLabel: "Guarded Agent",
    statusText: "Status: HTTP 200 OK • p50 Latency: 480ms",
    inspectorTitle: "PM INSPECTOR (LIVE PAYLOAD)",
    scenarios: [
      {
        id: "T001",
        name: "T001: Happy Path",
        userMessage: "Hi, I sent 200 USD this morning and want to know if it has arrived yet.",
        botReply: "Your transfer TX-1092 is completed and funds have been credited to the recipient account since 14:30.",
        inspectorData: {
          intent: "STATUS_INQUIRY",
          confidence: 0.98,
          hard_constraints_checked: ["C2.1_PASS", "C2.2_PASS", "C2.8_PASS"],
          handoff_triggered: false
        }
      },
      {
        id: "T046",
        name: "T046: CFPB Cancellation",
        userMessage: "I sent the transfer 10 minutes ago to the wrong account, cancel it now!",
        botReply: "We have canceled the transaction within the statutory window. The refund will be processed back to your source account within a maximum of 3 business days.",
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
        name: "T049: Human Escalation",
        userMessage: "I've been waiting for 4 days, support is not answering, and I need to speak with a manager right now.",
        botReply: "I understand the urgency. I am escalating your case right now to a human specialist along with your full transaction history so you won't need to repeat your information.",
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
    ]
  }
};

export default function AgentSimulator() {
  const { lang } = useLanguage();
  const currentContent = CONTENT[lang] || CONTENT.es;
  const [activeScenarioId, setActiveScenarioId] = useState<string>("T001");

  const activeScenario =
    currentContent.scenarios.find((sc) => sc.id === activeScenarioId) ||
    currentContent.scenarios[0];

  return (
    <div className="border border-border bg-surface rounded-2xl overflow-hidden">
      <div className="flex border-b border-border bg-surface-2 p-3 gap-2 overflow-x-auto">
        {currentContent.scenarios.map((sc) => (
          <button
            key={sc.id}
            onClick={() => setActiveScenarioId(sc.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors whitespace-nowrap ${
              activeScenario.id === sc.id
                ? "bg-accent text-accent-foreground font-semibold"
                : "bg-surface text-muted border border-border hover:text-foreground"
            }`}
          >
            {sc.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Left panel: conversation */}
        <div className="p-5 flex flex-col justify-between h-[360px] bg-surface">
          <div className="space-y-4">
            <div className="bg-surface-2 text-foreground text-sm leading-relaxed p-3.5 rounded-2xl rounded-tl-sm max-w-[85%] self-start">
              <span className="text-[10px] uppercase tracking-wider text-muted block mb-1 font-mono">
                {currentContent.userLabel}
              </span>
              {activeScenario.userMessage}
            </div>
            <div className="bg-accent-soft border border-accent/25 text-foreground text-sm leading-relaxed p-3.5 rounded-2xl rounded-tr-sm max-w-[85%] ml-auto">
              <span className="text-[10px] uppercase tracking-wider text-accent block mb-1 font-mono font-semibold">
                {currentContent.agentLabel}
              </span>
              {activeScenario.botReply}
            </div>
          </div>
          <div className="text-[11px] text-muted font-mono mt-4 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {currentContent.statusText}
          </div>
        </div>

        {/* Right panel: PM inspector */}
        <div className="p-5 bg-surface-2 font-mono text-xs overflow-auto h-[360px]">
          <div className="text-muted mb-3 pb-2 border-b border-border flex justify-between">
            <span className="uppercase tracking-wider">{currentContent.inspectorTitle}</span>
            <span className="text-accent">Spec v1.1.0</span>
          </div>
          <pre className="text-foreground/85 whitespace-pre-wrap">
            {JSON.stringify(activeScenario.inspectorData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
