"use client";
import React from "react";
import Link from "next/link";
import RiceCalculator from "@/components/RiceCalculator";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  es: {
    back: "← Volver al Portfolio",
    badge: "Caso 03 • Roadmap guiado por Feedback & RICE",
    fileTag: "roadmap/rice_sensitivity.v1.xlsx",
    title: "Del feedback de mis alumnas a un roadmap de producto digital",
    desc: "Un caso de discovery para una app de mindfulness, apoyado en mi experiencia como profesora de meditación certificada por el Buddhist Studies Institute (fundado por Pema Khandro Rinpoche). Captura cualitativa sobre usuarias reales (alumnas directas, Instagram y transacciones en Gumroad), filtrado de sesgos de cortesía, priorización con matriz RICE estresada y defensa con datos para descartar la funcionalidad más pedida en redes sociales.",
    metrics: [
      { label: "ORIGEN DE DATOS", val: "1ª Mano", sub: "Alumnas + IG + Gumroad" },
      { label: "DECISIÓN INCÓMODA", val: "-10 sem", sub: "Descarte de App Nativa" },
      { label: "TIME-TO-VALUE", val: "2,5 sem", sub: "Sprint 1 completado" },
      { label: "TEST DE SENSIBILIDAD", val: "Resiliente", sub: "Confianza penalizada al 50%" },
    ],
    s1: {
      title: "01. Captura Cualitativa: Eliminación del Sesgo de Cortesía",
      p1: "El problema de producto: las alumnas de meditación y mindfulness pierden el ritmo de práctica entre sesiones guiadas. Como profesora de meditación certificada por el Buddhist Studies Institute (fundado por Pema Khandro Rinpoche), tengo acceso directo a ese dolor y al vocabulario real de las practicantes. Para no caer en la trampa de preguntar «¿Qué te gustaría que construya?» (que produce listas de deseos infinitas y cero compromiso), la micro-encuesta v2 se calibró sobre comportamiento pasado y disposición transaccional inmediata.",
      boxTitle: "Micro-encuesta de 5 preguntas (sin sesgo inductivo):",
      q1Label: "Frecuencia real:",
      q1Text: "En los últimos 14 días, ¿cuántas veces dedicaste al menos 15 minutos a practicar en solitario?",
      q1Sub: "(Mide hábito base)",
      q2Label: "Momento de fricción:",
      q2Text: "Cuando querías practicar y no lo hiciste, ¿qué ocurrió en los 10 minutos previos?",
      q2Sub: "(Causa raíz abierta)",
      q3Label: "Alternativas actuales:",
      q3Text: "¿Cómo intentas resolver este bloqueo hoy cuando estás sola?",
      q3Sub: "(Descubre competidores reales)",
      q4Label: "Formato viable:",
      q4Text: "Selección forzada entre 4 formatos con carga cognitiva decreciente.",
      q5Label: "Compromiso real:",
      q5Text: "Opción de reserva anticipada del piloto por 15 € vs esperar lanzamiento abierto",
      q5Sub: "(Skin in the game)",
    },
    s2: {
      title: "02. Priorización RICE con Análisis de Sensibilidad",
      badge: "Aritmética reproducible",
      desc: "Utiliza el control deslizante para comprobar la resiliencia del orden de priorización ante escenarios de alta incertidumbre o degradación de confianza en las métricas.",
    },
    s3: {
      title: "03. Defensa de Trade-Offs & Reversión Metodológica",
      tradeoffTitle: "Trade-Off Incómodo: Descarte de la App Nativa",
      tradeoffP1: "En encuestas abiertas de Instagram, el 42% de las alumnas solicitó una app móvil propia. Pese al ruido social, la iniciativa fue descartada por su ratio RICE (15 vs 216).",
      tradeoffDefenseLabel: "Defensa de PM:",
      tradeoffDefenseText: "El dolor real era la rendición de cuentas y la falta de tiempo, no la ausencia de software nativo. Construir una app habría costado 10 semanas; los micro-audios con seguimiento por mensajería se entregaron en 2,5 semanas conjuntas con mayor retención final.",
      failureTitle: "Fallo Documentado: Sesgo de Cortesía en Encuesta v1",
      failureP1: "En el primer diseño se preguntó: «¿Te gustaría contar con una biblioteca de clases en vídeo?». El 92% respondió que sí. Al lanzar un piloto de vídeos largos, la finalización cayó por debajo del 8% a los 7 días.",
      failureFixLabel: "Reversión:",
      failureFixText: "Se reescribió la encuesta (v2) eliminando preguntas sobre intenciones futuras y sustituyéndolas por preguntas de comportamiento retrospectivo contrastable y compromiso transaccional previo.",
    },
    s4: {
      badge: "Scorecard Completo: 4 de 4 Dimensiones",
      desc: "Has recorrido el ciclo integral: Discovery (C1) → Especificación Técnica y Evals (C2) → Priorización con Datos Propios (C3).",
      btn: "Volver a la Home del Portfolio →",
    },
  },
  en: {
    back: "← Back to Portfolio",
    badge: "Case 03 • Feedback-Driven Roadmap & RICE",
    fileTag: "roadmap/rice_sensitivity.v1.xlsx",
    title: "From Student Feedback to a Digital Product Roadmap",
    desc: "A discovery case for a mindfulness app, grounded in my work as a certified meditation teacher through the Buddhist Studies Institute (founded by Pema Khandro Rinpoche). Qualitative discovery on authentic users (direct students, Instagram, and Gumroad transactions), politeness-bias filtering, prioritization with a stressed RICE matrix, and data-backed rationale for discarding the most requested feature on social media.",
    metrics: [
      { label: "DATA SOURCE", val: "1st-Party", sub: "Students + IG + Gumroad" },
      { label: "KEY TRADE-OFF", val: "-10 wks", sub: "Native App Rejected" },
      { label: "TIME-TO-VALUE", val: "2.5 wks", sub: "Sprint 1 completed" },
      { label: "SENSITIVITY TEST", val: "Resilient", sub: "Confidence penalized at 50%" },
    ],
    s1: {
      title: "01. Qualitative Discovery: Eliminating Politeness Bias",
      p1: "The product problem: meditation and mindfulness students lose their practice rhythm between guided sessions. As a certified meditation teacher through the Buddhist Studies Institute (founded by Pema Khandro Rinpoche), I have first-hand access to that pain point and to how practitioners actually describe it. To avoid the trap of asking “What would you like me to build?” (which yields endless wishlists and zero commitment), the v2 micro-survey was calibrated around past observable behavior and immediate transactional willingness.",
      boxTitle: "5-Question Micro-Survey (Zero Inductive Bias):",
      q1Label: "Actual frequency:",
      q1Text: "In the last 14 days, how many times did you spend at least 15 minutes practicing solo?",
      q1Sub: "(Measures baseline habit)",
      q2Label: "Friction trigger:",
      q2Text: "When you intended to practice but didn't, what happened in the 10 minutes prior?",
      q2Sub: "(Open-ended root cause)",
      q3Label: "Current workarounds:",
      q3Text: "How do you try to unblock yourself today when you're alone?",
      q3Sub: "(Uncovers real competitors)",
      q4Label: "Viable format:",
      q4Text: "Forced choice across 4 formats with decreasing cognitive load.",
      q5Label: "Skin in the game:",
      q5Text: "Early-bird pilot reservation option for €15 vs waiting for open launch",
      q5Sub: "(Verifiable commitment)",
    },
    s2: {
      title: "02. RICE Prioritization with Sensitivity Analysis",
      badge: "Reproducible arithmetic",
      desc: "Use the slider to test the resilience of the priority ranking under high uncertainty or degraded metric confidence.",
    },
    s3: {
      title: "03. Trade-Off Defense & Methodological Pivot",
      tradeoffTitle: "Uncomfortable Trade-Off: Rejecting the Native Mobile App",
      tradeoffP1: "In open Instagram polls, 42% of students requested a dedicated mobile app. Despite social momentum, the feature was discarded based on its RICE score (15 vs 216).",
      tradeoffDefenseLabel: "PM Defense:",
      tradeoffDefenseText: "The root pain point was accountability and lack of time, not the absence of native client software. Building an app would have taken 10 engineering weeks; micro-audio lessons with messaging follow-ups shipped in 2.5 weeks combined with higher long-term retention.",
      failureTitle: "Documented Failure: Courtesy Bias in Survey v1",
      failureP1: "In the initial survey design, students were asked: “Would you like access to an on-demand video library?”. 92% answered yes. When an on-demand pilot launched, completion plummeted below 8% after 7 days.",
      failureFixLabel: "Methodological Pivot:",
      failureFixText: "The survey was rewritten (v2) by eliminating forward-looking hypothetical questions and replacing them with retrospective verifiable habits and upfront transactional commitment.",
    },
    s4: {
      badge: "Full Scorecard: 4 of 4 Dimensions Covered",
      desc: "You have reviewed the complete lifecycle: Discovery (C1) → Technical Spec & Evals (C2) → First-Party Roadmap Prioritization (C3).",
      btn: "Return to Portfolio Home →",
    },
  },
};

export default function AlumnasRoadmapPage() {
  const { lang } = useLanguage();
  const t = content[lang] || content.es;

  const questions = [
    { label: t.s1.q1Label, text: t.s1.q1Text, sub: t.s1.q1Sub },
    { label: t.s1.q2Label, text: t.s1.q2Text, sub: t.s1.q2Sub },
    { label: t.s1.q3Label, text: t.s1.q3Text, sub: t.s1.q3Sub },
    { label: t.s1.q4Label, text: t.s1.q4Text, sub: "" },
    { label: t.s1.q5Label, text: t.s1.q5Text, sub: t.s1.q5Sub },
  ];

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
                  <p
                    className={`mt-2 font-display text-2xl sm:text-3xl tracking-tight tabular-nums ${
                      i === 1 ? "text-warm" : "text-accent"
                    }`}
                  >
                    {m.val}
                  </p>
                  <p className="mt-1 text-xs text-muted">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 space-y-16">
          {/* S1 — survey */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s1.title}</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">{t.s1.p1}</p>

            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7 space-y-4">
              <p className="text-sm font-semibold text-foreground">{t.s1.boxTitle}</p>
              <ol className="space-y-4">
                {questions.map((q, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="font-display text-xl leading-none text-accent/50">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed text-muted">
                      <strong className="text-foreground">{q.label}</strong> {q.text}{" "}
                      {q.sub && <em className="text-accent/80 not-italic">{q.sub}</em>}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* S2 — RICE calculator */}
          <section className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s2.title}</h2>
              <span className="font-mono text-xs text-accent">{t.s2.badge}</span>
            </div>
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted">{t.s2.desc}</p>
            <RiceCalculator />
          </section>

          {/* S3 — trade-offs */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s3.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
                <p className="font-display text-base tracking-tight text-warm">{t.s3.tradeoffTitle}</p>
                <p className="text-sm leading-relaxed text-muted">{t.s3.tradeoffP1}</p>
                <p className="border-t border-border pt-3 text-sm leading-relaxed text-foreground">
                  <strong className="text-accent">{t.s3.tradeoffDefenseLabel}</strong> {t.s3.tradeoffDefenseText}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
                <p className="font-display text-base tracking-tight text-warm">{t.s3.failureTitle}</p>
                <p className="text-sm leading-relaxed text-muted">{t.s3.failureP1}</p>
                <p className="border-t border-border pt-3 text-sm leading-relaxed text-foreground">
                  <strong className="text-accent">{t.s3.failureFixLabel}</strong> {t.s3.failureFixText}
                </p>
              </div>
            </div>
          </section>

          {/* S4 — closing */}
          <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent-soft/70 to-surface p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="space-y-2 max-w-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">{t.s4.badge}</p>
                <p className="text-[15px] leading-relaxed text-foreground/85">{t.s4.desc}</p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 hover:-translate-y-0.5 whitespace-nowrap"
              >
                {t.s4.btn.replace(" →", "")} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
