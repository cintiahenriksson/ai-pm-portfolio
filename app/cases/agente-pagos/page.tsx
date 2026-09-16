"use client";
import React from "react";
import Link from "next/link";
import AgentSimulator from "@/components/AgentSimulator";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  es: {
    back: "← Volver al Portfolio",
    badge: "Caso 02 • Prototipo Funcional & Evals",
    fileTag: "spec/behavior_spec.v1.json",
    title: "«¿Dónde está mi dinero?»: Agente de soporte con release gate asimétrico",
    desc: "Diseño e implementación de un agente de soporte para pagos en tránsito gobernado por una especificación formal sin prompt paralelo, validado contra un arnés de 120 tickets sintéticos con tolerancia cero a promesas falsas.",
    metrics: [
      { label: "DEFLECTION MODELADA", val: "18,8%", sub: "Descuento de realismo" },
      { label: "RELEASE GATE", val: "0 Violaciones", sub: "En C2.1–C2.6 y C2.8" },
      { label: "COSTE / 1K TICKETS", val: "1,80 USD", sub: "Modelo Economy-C" },
      { label: "LATENCIA P50", val: "480 ms", sub: "Inferencia optimizada" },
    ],
    s1: {
      title: "01. Problem Statement & Regulación CFPB",
      p1: "En remesas internacionales, la mayor frustración ocurre cuando una transferencia queda «en proceso». Los chatbots habituales suelen calmar al usuario con frases empáticas vacías o prometiendo horas de entrega inexistentes, provocando quejas regulatorias y disputas bancarias.",
      boxTitle: "Inyección de hechos normativos (Remittance Transfer Rule del CFPB):",
      items: [
        "Ventana de cancelación obligatoria: 30 minutos (siempre que los fondos no hayan sido cobrados).",
        "Plazo legal de reembolso: máximo 3 días hábiles.",
        "Plazos de disputa: 180 días para reportar un error y 90 días para resolución formal.",
      ],
      note: "Los hechos regulatorios viven como datos inyectados en la spec, nunca en la memoria estocástica del LLM.",
    },
    s2: {
      title: "02. Prototipo Operativo (Live Simulator)",
      badge: "spec/behavior_spec.v1.json",
      desc: "Selecciona un escenario de prueba para observar el comportamiento conversacional en paralelo con la inspección del contrato JSON y la activación de guardrails en tiempo real.",
    },
    s3: {
      title: "03. Harness de Evaluación & Release Gate",
      p1: "El release gate es asimétrico: cero violaciones de las restricciones críticas (C2.1–C2.6 y C2.8) sobre el golden set de 120 tickets. En pagos transfronterizos, una fecha inventada o una fuga de privacidad cuesta más que diez tickets no resueltos.",
      thModel: "Modelo",
      thCost: "Coste / 1k",
      thLatency: "Latencia p50",
      thPass: "Aprobado",
      thViolations: "Violaciones Gate",
      thDecision: "Decisión Release",
      decisionBlocked: "BLOQUEADO",
      decisionRejected: "DESCARTADO (COSTE)",
      decisionApproved: "RELEASE APROBADO",
    },
    s4: {
      title: "04. Post-Mortem: Galería de Fallos & Endurecimiento de Gate",
      fail1Title: "Fallo T014: Promesa de hora alucinada (C2.1)",
      fail1Quote: "«No te preocupes, llegará el lunes a más tardar a las 18:00»",
      fail1Desc: "El modelo naive respondió esto cuando el sistema no tenía confirmación bancaria.",
      fail1FixLabel: "Solución:",
      fail1FixText: "Prohibición estricta de emitir unidades de tiempo si system_eta == null.",
      fail2Title: "Adición Post-Run: Privacidad de Terceros (C2.8)",
      fail2Desc: "En la primera corrida, un destinatario con el ID de transacción logró que el modelo le revelara el importe enviado por el emisor en 3 casos.",
      fail2FixLabel: "Solución:",
      fail2FixText: "El gate se endureció tras la primera prueba añadiendo C2.8 para exigir validación de sesión de usuario emisor.",
    },
    s5: {
      title: "05. Impacto Económico: Modelo de Deflection Descontado",
      chainTitle: "Cadena de Cálculo de Contención Neta:",
      chainBadge: "18,8% Deflection Real",
      formula: "Deflection = (% tickets estado: 34%) × (Pass rate: 82%) × (Contención residual: 45%) × (Descuento realismo: 0.70) ≈ 18,8%",
      p1: "Frente al 30–60% habitual anunciado por proveedores de IA, este modelo aplica un descuento de realismo explícito por ruido en soporte multiturno y repondera por el mix del corpus real del Caso 1, proyectando un ahorro sostenible de ~115.000 USD anuales en costes directos de soporte.",
    },
    s6: {
      badge: "Siguiente Paso • Decisión con Datos Propios",
      desc: "De la especificación técnica y evaluación del agente a la priorización de producto digital con feedback real y matriz RICE.",
      btn: "Ver Caso 3: Roadmap de Alumnas →",
    },
  },
  en: {
    back: "← Back to Portfolio",
    badge: "Case 02 • Functional Prototype & Evals",
    fileTag: "spec/behavior_spec.v1.json",
    title: "“Where is my money?”: Support Agent with Asymmetric Release Gates",
    desc: "Design and implementation of an in-transit payments support agent governed by a formal behavior specification without out-of-band prompts, validated across a 120-ticket test harness with zero tolerance for false promises.",
    metrics: [
      { label: "MODELED DEFLECTION", val: "18.8%", sub: "Realism discount" },
      { label: "RELEASE GATE", val: "0 Violations", sub: "On C2.1–C2.6 & C2.8" },
      { label: "COST / 1K TICKETS", val: "$1.80", sub: "Economy-C Model" },
      { label: "P50 LATENCY", val: "480 ms", sub: "Optimized inference" },
    ],
    s1: {
      title: "01. Problem Statement & CFPB Regulation",
      p1: "In international remittances, peak friction happens when a transfer is flagged 'in transit'. Standard chatbots placate users with empty empathy or invent delivery timestamps, triggering regulatory complaints and chargeback disputes.",
      boxTitle: "Injection of Statutory Facts (CFPB Remittance Transfer Rule):",
      items: [
        "Mandatory cancellation window: 30 minutes (provided funds have not been picked up).",
        "Statutory refund timeline: maximum 3 business days.",
        "Dispute windows: 180 days to report an error and 90 days for formal resolution.",
      ],
      note: "Regulatory facts live as structured data injected into the spec, never in stochastic LLM memory.",
    },
    s2: {
      title: "02. Operating Prototype (Live Simulator)",
      badge: "spec/behavior_spec.v1.json",
      desc: "Select a test scenario to inspect conversational behavior in real time alongside JSON contract extraction and guardrail enforcement.",
    },
    s3: {
      title: "03. Evaluation Test Harness & Release Gate",
      p1: "The release gate is asymmetric: zero violations across critical constraints (C2.1–C2.6 and C2.8) across the 120-ticket golden test set. In cross-border remittances, a single hallucinated arrival date or privacy breach costs far more than ten uncontained tickets.",
      thModel: "Model",
      thCost: "Cost / 1k",
      thLatency: "p50 Latency",
      thPass: "Pass Rate",
      thViolations: "Gate Violations",
      thDecision: "Release Decision",
      decisionBlocked: "BLOCKED",
      decisionRejected: "DISCARDED (COST)",
      decisionApproved: "RELEASE APPROVED",
    },
    s4: {
      title: "04. Post-Mortem: Failure Gallery & Gate Hardening",
      fail1Title: "Failure T014: Hallucinated arrival timestamp (C2.1)",
      fail1Quote: "“Don't worry, it will arrive Monday by 6:00 PM at the latest”",
      fail1Desc: "The naive model responded with this timestamp when the core banking engine had no confirmation.",
      fail1FixLabel: "Solution:",
      fail1FixText: "Strict prohibition against outputting time units whenever system_eta == null.",
      fail2Title: "Post-Run Addition: Third-Party Privacy (C2.8)",
      fail2Desc: "In the initial run, a recipient with a valid transaction ID prompted the model to disclose the sender's source amount in 3 edge cases.",
      fail2FixLabel: "Solution:",
      fail2FixText: "The release gate was hardened post-run by adding C2.8 to mandate sender session validation.",
    },
    s5: {
      title: "05. Economic Impact: Discounted Deflection Modeling",
      chainTitle: "Net Containment Calculation Chain:",
      chainBadge: "18.8% Net Deflection",
      formula: "Deflection = (% status tickets: 34%) × (Pass rate: 82%) × (Residual containment: 45%) × (Realism discount: 0.70) ≈ 18.8%",
      p1: "In contrast to the 30–60% deflection routinely marketed by AI vendors, this model enforces an explicit realism discount for multi-turn support noise and reweights against Case 1 corpus mix, projecting ~115,000 USD in sustainable annual direct support savings.",
    },
    s6: {
      badge: "Next Step • First-Party Data Decision",
      desc: "From technical agent specifications and evaluations to digital product roadmap prioritization backed by authentic feedback and RICE.",
      btn: "View Case 3: Student Roadmap →",
    },
  },
};

export default function AgentePagosPage() {
  const { lang } = useLanguage();
  const t = content[lang] || content.es;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 font-sans space-y-16 text-foreground">
      {/* Navegación y Selectores */}
      <nav className="flex items-center justify-between border-b border-border pb-5">
        <Link
          href="/"
          className="text-xs font-mono text-muted hover:text-foreground transition-colors inline-flex items-center gap-1"
        >
          {t.back}
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </nav>

      {/* Header y Métricas */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            {t.badge}
          </span>
          <span className="text-muted font-mono text-xs">{t.fileTag}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          {t.title}
        </h1>
        <p className="text-sm text-muted max-w-3xl leading-relaxed">
          {t.desc}
        </p>

        {/* Data Strip / Métricas Clave */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-surface border border-border shadow-sm">
            <span className="text-muted block text-[10px] font-semibold">{t.metrics[0].label}</span>
            <span className="text-emerald-600 dark:text-emerald-400 text-lg font-bold">{t.metrics[0].val}</span>
            <span className="text-[10px] text-muted block mt-0.5">{t.metrics[0].sub}</span>
          </div>
          <div className="p-3 rounded-xl bg-surface border border-border shadow-sm">
            <span className="text-muted block text-[10px] font-semibold">{t.metrics[1].label}</span>
            <span className="text-emerald-600 dark:text-emerald-400 text-lg font-bold">{t.metrics[1].val}</span>
            <span className="text-[10px] text-muted block mt-0.5">{t.metrics[1].sub}</span>
          </div>
          <div className="p-3 rounded-xl bg-surface border border-border shadow-sm">
            <span className="text-muted block text-[10px] font-semibold">{t.metrics[2].label}</span>
            <span className="text-foreground text-lg font-bold">{t.metrics[2].val}</span>
            <span className="text-[10px] text-muted block mt-0.5">{t.metrics[2].sub}</span>
          </div>
          <div className="p-3 rounded-xl bg-surface border border-border shadow-sm">
            <span className="text-muted block text-[10px] font-semibold">{t.metrics[3].label}</span>
            <span className="text-foreground text-lg font-bold">{t.metrics[3].val}</span>
            <span className="text-[10px] text-muted block mt-0.5">{t.metrics[3].sub}</span>
          </div>
        </div>
      </section>

      {/* 1. Problem Statement y Hechos Regulados */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted border-b border-border pb-2">
          {t.s1.title}
        </h2>
        <p className="text-sm text-foreground/85 leading-relaxed font-sans">
          {t.s1.p1}
        </p>
        <div className="p-4 rounded-xl bg-surface border border-border text-xs text-muted space-y-2 shadow-sm">
          <div className="font-mono text-foreground text-[11px] font-semibold">
            {t.s1.boxTitle}
          </div>
          <ul className="list-disc pl-5 space-y-1 font-mono text-[11px]">
            {t.s1.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p className="text-[11px] text-muted font-mono pt-1">
            {t.s1.note}
          </p>
        </div>
      </section>

      {/* 2. Prototipo Interactivo */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border pb-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted">
            {t.s2.title}
          </h2>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{t.s2.badge}</span>
        </div>
        <p className="text-xs text-muted font-sans">
          {t.s2.desc}
        </p>
        
        {/* Componente del Simulador */}
        <AgentSimulator />
      </section>

      {/* 3. El Release Gate y Comparativa de Modelos */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted border-b border-border pb-2">
          {t.s3.title}
        </h2>
        <p className="text-sm text-foreground/85 leading-relaxed font-sans">
          {t.s3.p1}
        </p>

        <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface text-muted border-b border-border">
              <tr>
                <th className="p-3 font-semibold">{t.s3.thModel}</th>
                <th className="p-3 font-semibold">{t.s3.thCost}</th>
                <th className="p-3 font-semibold">{t.s3.thLatency}</th>
                <th className="p-3 font-semibold">{t.s3.thPass}</th>
                <th className="p-3 font-semibold">{t.s3.thViolations}</th>
                <th className="p-3 text-right font-semibold">{t.s3.thDecision}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface text-foreground/85">
              <tr className="hover:bg-background/40 transition-colors">
                <td className="p-3 font-semibold text-foreground">Frontier-A</td>
                <td className="p-3">14,20 USD</td>
                <td className="p-3">1.850 ms</td>
                <td className="p-3">94,1%</td>
                <td className="p-3 text-rose-600 dark:text-rose-400 font-bold">1 violación (C2.1)</td>
                <td className="p-3 text-right">
                  <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-[10px] font-semibold">
                    {t.s3.decisionBlocked}
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-background/40 transition-colors">
                <td className="p-3 font-semibold text-foreground">Frontier-B</td>
                <td className="p-3">11,50 USD</td>
                <td className="p-3">1.200 ms</td>
                <td className="p-3">91,6%</td>
                <td className="p-3 text-emerald-600 dark:text-emerald-400">0 violaciones</td>
                <td className="p-3 text-right">
                  <span className="px-2 py-0.5 rounded bg-background text-muted border border-border text-[10px]">
                    {t.s3.decisionRejected}
                  </span>
                </td>
              </tr>
              <tr className="bg-emerald-500/10 font-semibold">
                <td className="p-3 text-emerald-700 dark:text-emerald-300">Economy-C (Guarded)</td>
                <td className="p-3 text-emerald-700 dark:text-emerald-300 font-bold">1,80 USD</td>
                <td className="p-3 text-emerald-700 dark:text-emerald-300 font-bold">480 ms</td>
                <td className="p-3 text-emerald-700 dark:text-emerald-300">89,2%</td>
                <td className="p-3 text-emerald-700 dark:text-emerald-300 font-bold">0 violaciones</td>
                <td className="p-3 text-right">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                    {t.s3.decisionApproved}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Galería de Fallos y Reversión Post-Mortem */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted border-b border-border pb-2">
          {t.s4.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-5 rounded-xl bg-surface border border-border space-y-2 shadow-sm">
            <span className="font-mono text-rose-600 dark:text-rose-400 text-[11px] block font-bold">
              {t.s4.fail1Title}
            </span>
            <p className="text-muted leading-relaxed italic">
              «{t.s4.fail1Quote}». <span className="not-italic text-foreground/80">{t.s4.fail1Desc}</span>
            </p>
            <div className="pt-2 text-[11px] font-mono text-foreground border-t border-border">
              <strong>{t.s4.fail1FixLabel}</strong> {t.s4.fail1FixText}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-surface border border-border space-y-2 shadow-sm">
            <span className="font-mono text-amber-600 dark:text-amber-400 text-[11px] block font-bold">
              {t.s4.fail2Title}
            </span>
            <p className="text-foreground/80 leading-relaxed">
              {t.s4.fail2Desc}
            </p>
            <div className="pt-2 text-[11px] font-mono text-foreground border-t border-border">
              <strong>{t.s4.fail2FixLabel}</strong> {t.s4.fail2FixText}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Modelo de Deflection de Negocio */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted border-b border-border pb-2">
          {t.s5.title}
        </h2>
        <div className="p-5 rounded-xl bg-surface border border-border space-y-4 text-xs shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between gap-2 items-baseline">
            <span className="font-mono font-semibold text-foreground">{t.s5.chainTitle}</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 text-sm font-bold">{t.s5.chainBadge}</span>
          </div>
          <div className="bg-background p-3.5 rounded-lg border border-border font-mono text-muted text-[11px] overflow-x-auto">
            {t.s5.formula}
          </div>
          <p className="text-muted leading-relaxed font-sans">
            {t.s5.p1}
          </p>
        </div>
      </section>

      {/* 6. Cierre: Conexión con el Caso 3 */}
      <section className="p-6 rounded-2xl bg-surface border border-border shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            {t.s6.badge}
          </span>
          <p className="text-xs text-muted font-sans">
            {t.s6.desc}
          </p>
        </div>
        <Link
          href="/cases/alumnas-roadmap"
          className="px-4 py-2.5 rounded-lg bg-foreground text-background text-xs font-mono font-semibold hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm"
        >
          {t.s6.btn}
        </Link>
      </section>
    </main>
  );
}