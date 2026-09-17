"use client";
import React from "react";
import Link from "next/link";
import AgentSimulator from "@/components/AgentSimulator";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
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
      badge: "behavior_spec.v1",
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
      violationsOne: "1 violación (C2.1)",
      violationsZero: "0 violaciones",
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
    nav: {
      prevLabel: "Anterior",
      prevTitle: "01 — Por qué se van",
      prevHref: "/cases/remesas-discovery",
      nextLabel: "Siguiente",
      nextTitle: "03 — Del feedback al roadmap",
      nextHref: "/cases/alumnas-roadmap",
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
      badge: "behavior_spec.v1",
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
      violationsOne: "1 violation (C2.1)",
      violationsZero: "0 violations",
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
    nav: {
      prevLabel: "Previous",
      prevTitle: "01 — Why they leave",
      prevHref: "/cases/remesas-discovery",
      nextLabel: "Next",
      nextTitle: "03 — Student feedback to roadmap",
      nextHref: "/cases/alumnas-roadmap",
    },
  },
};

export default function AgentePagosPage() {
  const { lang } = useLanguage();
  const t = content[lang] || content.es;

  return (
    <>
      <SiteHeader variant="inner" />

      <main className="text-foreground">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent/12 blur-[110px]"
          />
          <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-8">
            <div className="animate-rise space-y-5">
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-accent">
                {t.badge}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-balance">
                {t.title}
              </h1>
              <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-muted">{t.desc}</p>
            </div>

            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {t.metrics.map((m, i) => (
                <div key={i} className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{m.label}</p>
                  <p className="mt-2 font-display text-2xl sm:text-3xl tracking-tight text-accent tabular-nums">
                    {m.val}
                  </p>
                  <p className="mt-1 text-xs text-muted">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 space-y-16">
          {/* S1 */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s1.title}</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">{t.s1.p1}</p>
            <div className="rounded-2xl border-l-2 border-accent/50 bg-surface-2 p-5 space-y-3">
              <p className="text-sm font-semibold text-foreground">{t.s1.boxTitle}</p>
              <ul className="space-y-2">
                {t.s1.items.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs italic leading-relaxed text-muted pt-1">{t.s1.note}</p>
            </div>
          </section>

          {/* S2 — simulator */}
          <section className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s2.title}</h2>
              <span className="font-mono text-xs text-accent">{t.s2.badge}</span>
            </div>
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted">{t.s2.desc}</p>
            <AgentSimulator />
          </section>

          {/* S3 — release gate table */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s3.title}</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">{t.s3.p1}</p>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-left text-sm tabular-nums">
                <thead className="bg-surface-2 text-muted">
                  <tr className="text-[11px] uppercase tracking-[0.1em]">
                    <th className="p-4 font-semibold">{t.s3.thModel}</th>
                    <th className="p-4 font-semibold">{t.s3.thCost}</th>
                    <th className="p-4 font-semibold">{t.s3.thLatency}</th>
                    <th className="p-4 font-semibold">{t.s3.thPass}</th>
                    <th className="p-4 font-semibold">{t.s3.thViolations}</th>
                    <th className="p-4 text-right font-semibold">{t.s3.thDecision}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-surface text-foreground/80">
                  <tr>
                    <td className="p-4 font-semibold text-foreground">Frontier-A</td>
                    <td className="p-4">14,20 USD</td>
                    <td className="p-4">1.850 ms</td>
                    <td className="p-4">94,1%</td>
                    <td className="p-4 font-semibold text-warm">{t.s3.violationsOne}</td>
                    <td className="p-4 text-right">
                      <span className="inline-block rounded-full border border-warm/30 bg-warm/10 px-2.5 py-1 text-[11px] font-semibold text-warm">
                        {t.s3.decisionBlocked}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-foreground">Frontier-B</td>
                    <td className="p-4">11,50 USD</td>
                    <td className="p-4">1.200 ms</td>
                    <td className="p-4">91,6%</td>
                    <td className="p-4">{t.s3.violationsZero}</td>
                    <td className="p-4 text-right">
                      <span className="inline-block rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-muted">
                        {t.s3.decisionRejected}
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-accent-soft">
                    <td className="p-4 font-semibold text-accent">Economy-C (Guarded)</td>
                    <td className="p-4 font-semibold text-accent">1,80 USD</td>
                    <td className="p-4 font-semibold text-accent">480 ms</td>
                    <td className="p-4 text-accent">89,2%</td>
                    <td className="p-4 font-semibold text-accent">{t.s3.violationsZero}</td>
                    <td className="p-4 text-right">
                      <span className="inline-block rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                        {t.s3.decisionApproved}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* S4 — failure gallery */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s4.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
                <p className="font-display text-base tracking-tight text-warm">{t.s4.fail1Title}</p>
                <p className="text-sm leading-relaxed text-muted">
                  <span className="italic">{t.s4.fail1Quote}</span>{" "}
                  <span className="text-foreground/80">{t.s4.fail1Desc}</span>
                </p>
                <p className="border-t border-border pt-3 text-sm leading-relaxed text-foreground">
                  <strong className="text-accent">{t.s4.fail1FixLabel}</strong> {t.s4.fail1FixText}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
                <p className="font-display text-base tracking-tight text-warm">{t.s4.fail2Title}</p>
                <p className="text-sm leading-relaxed text-foreground/80">{t.s4.fail2Desc}</p>
                <p className="border-t border-border pt-3 text-sm leading-relaxed text-foreground">
                  <strong className="text-accent">{t.s4.fail2FixLabel}</strong> {t.s4.fail2FixText}
                </p>
              </div>
            </div>
          </section>

          {/* S5 — economic model */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s5.title}</h2>
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-2 items-baseline">
                <span className="text-sm font-semibold text-foreground">{t.s5.chainTitle}</span>
                <span className="font-display text-lg tracking-tight text-accent">{t.s5.chainBadge}</span>
              </div>
              <div className="overflow-x-auto rounded-xl bg-surface-2 p-4 font-mono text-xs leading-relaxed text-muted">
                {t.s5.formula}
              </div>
              <p className="text-sm leading-relaxed text-muted">{t.s5.p1}</p>
            </div>
          </section>

          {/* S6 — next case */}
          <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent-soft/70 to-surface p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="space-y-2 max-w-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">{t.s6.badge}</p>
                <p className="text-[15px] leading-relaxed text-foreground/85">{t.s6.desc}</p>
              </div>
              <Link
                href="/cases/alumnas-roadmap"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 hover:-translate-y-0.5 whitespace-nowrap"
              >
                {t.s6.btn.replace(" →", "")} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>

          {/* Prev / next footer */}
          <nav className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={t.nav.prevHref}
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
            >
              <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">←</span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.14em]">{t.nav.prevLabel}</span>
                <span className="block font-medium text-foreground group-hover:text-accent">{t.nav.prevTitle}</span>
              </span>
            </Link>
            <Link
              href={t.nav.nextHref}
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent sm:text-right"
            >
              <span className="sm:order-2" aria-hidden="true">→</span>
              <span className="sm:order-1">
                <span className="block text-[11px] uppercase tracking-[0.14em]">{t.nav.nextLabel}</span>
                <span className="block font-medium text-foreground group-hover:text-accent">{t.nav.nextTitle}</span>
              </span>
            </Link>
          </nav>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
