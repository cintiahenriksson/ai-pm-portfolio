"use client";
import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RetentionDashboard from "@/components/retention-signals/RetentionDashboard";
import DecisionRecord from "@/components/retention-signals/DecisionRecord";
import { EXPERIMENT_ROWS, pick } from "@/lib/retention-signals-data";
import { useLanguage } from "@/context/LanguageContext";

type Tone = "risk" | "warn" | "info";

const content = {
  en: {
    badge: "Case Study 04 · Product strategy · AI-assisted feedback synthesis",
    title: "Retention Signals",
    lede: "An explainable dashboard that turns emerging customer feedback into trust-risk alerts and product decisions.",
    intro:
      "A hypothetical international calling, subscriptions, top-up, and remittances service receives feedback across app stores and support channels. Teams can see complaints, but struggle to distinguish a gradual retention issue from a critical trust-risk event that needs immediate intervention.",
    heroFacts: [
      { label: "Primary decision", value: "Investigate, contain, or prioritize" },
      { label: "Evidence sources", value: "Public feedback patterns + simulated product telemetry" },
      { label: "Focus scenario", value: "Unexpected auto-top-up charges after a subscription-flow change" },
    ],
    problemTitle: "The product problem",
    problemBody:
      "Teams often react to the loudest recent complaint. That approach misses two things: whether a topic is genuinely worsening over time, and whether it signals a high-severity loss of financial trust.",
    journey: [
      "Customer sees or experiences an unexpected top-up charge.",
      "They contact support, leave negative feedback, request a refund, or disable auto-top-up.",
      "Product teams receive fragmented signals across channels.",
      "The dashboard detects the pattern, surfaces evidence, and recommends the appropriate level of response.",
    ],
    principlesTitle: "Design principles",
    principles: [
      { n: "01", title: "Trust before volume", body: "Financial-control signals can outrank larger but lower-severity issues." },
      { n: "02", title: "Trends, not snapshots", body: "Compare current rates against historical baselines, not the loudest recent complaint." },
      { n: "03", title: "Evidence before causality", body: "Alerts trigger investigation; they do not prove root cause." },
      { n: "04", title: "Different problems, different actions", body: "Contain an incident, investigate a hypothesis, or prioritize a roadmap initiative." },
    ],
    dashEyebrow: "Interactive prototype",
    dashTitle: "The dashboard",
    dashBody:
      "Filter the view, switch topics, and click a point on the chart to inspect a single week. The unexpected-charge scenario is the most complete flow; other topics use simplified but coherent simulated data.",
    experimentTitle: "How the team would validate the alert",
    experimentBody:
      "A trust-risk alert is a hypothesis. In production, the team would validate it with a controlled comparison rather than by comparing app versions after the fact.",
    variantA: "Variant A",
    variantABody: "Previous subscription flow.",
    variantB: "Variant B",
    variantBBody: "Updated subscription flow with auto-top-up setup.",
    experimentSetup:
      "Eligible users: Android users with auto-top-up already enabled. Primary guardrail metric: seven-day auto-top-up disable rate. Secondary signals: refund requests, support contacts about unexpected charges, and qualitative feedback. This is a simulated production-validation plan, not a real experiment result.",
    tableHead: { metric: "Metric", a: "Variant A", b: "Variant B", diff: "Difference", interp: "Interpretation" },
    methodologyLabel: "Methodology:",
    methodologyBody:
      "An A/B test within the same app version is more reliable than comparing app versions alone, because both groups experience the same date, platform, campaigns, and external conditions. Results still require checks for instrumentation, exposure, and segment imbalance.",
    decisionTitle: "Decision record",
    prioritizationTitle: "Prioritization logic",
    prioritizationBody:
      "Retention Signals does not rank every issue with one universal number. It first classifies whether a pattern is an incident, a trust-risk alert, a discovery opportunity, or a monitor-only trend.",
    prioritization: [
      { signal: "Core-service reliability spike", classification: "Incident", action: "Engineering investigation now", tone: "risk" as Tone },
      { signal: "Money or consent signal + corroboration", classification: "Trust-risk alert", action: "Contain and investigate", tone: "risk" as Tone },
      { signal: "Persistent high-volume pain without a critical spike", classification: "Discovery opportunity", action: "Research and roadmap evaluation", tone: "warn" as Tone },
      { signal: "Low-volume or uncertain emerging pattern", classification: "Monitor", action: "Collect more evidence", tone: "info" as Tone },
    ],
    opportunityLabel: "Opportunity score:",
    opportunityBody:
      "For non-incident opportunities, teams consider trust impact first, then reach, trend, and evidence confidence. Scores support discussion; they do not replace judgment.",
    methodologySectionTitle: "Data & methodology",
    simulatedBadge: "Simulated",
    methodology: [
      "Public review patterns can be used to identify and classify recurring customer problems across languages.",
      "The dashboard's event-level telemetry, release metadata, experiment results, and user analytics are simulated to demonstrate the decision workflow.",
      "Topic classification uses a pre-defined taxonomy with a manual-review sample.",
      "Do not treat a review, a topic label, or an alert as proof of causality.",
      "A topic needs at least 3 independent qualitative signals to enter the report; a high-severity alert requires a historical increase and validation through internal telemetry in a real environment.",
      "This case does not use confidential data from any real employer.",
    ],
    outcomeTitle: "Outcome",
    outcomeBody:
      "The prototype demonstrates a PM operating model rather than a claimed business result: detect a signal, inspect its distribution and evidence, validate it with appropriate internal data, contain potential harm, and convert verified learning into a product decision.",
    prevLabel: "Previous",
    prevTitle: "03 — Student feedback to roadmap",
    nextLabel: "Next",
    nextTitle: "All case studies",
  },
  es: {
    badge: "Caso 04 · Estrategia de producto · Síntesis de feedback asistida por IA",
    title: "Retention Signals",
    lede: "Un panel explicable que convierte los comentarios emergentes de los clientes en alertas de riesgo de confianza y decisiones de producto.",
    intro:
      "Un servicio hipotético de llamadas internacionales, suscripciones, recargas y remesas recibe comentarios en tiendas de aplicaciones y canales de soporte. Los equipos pueden ver las quejas, pero les cuesta distinguir un problema de retención gradual de un evento crítico de riesgo de confianza que necesita intervención inmediata.",
    heroFacts: [
      { label: "Decisión principal", value: "Investigar, contener o priorizar" },
      { label: "Fuentes de evidencia", value: "Patrones de comentarios públicos + telemetría de producto simulada" },
      { label: "Escenario principal", value: "Cargos inesperados de recarga automática tras un cambio en el flujo de suscripción" },
    ],
    problemTitle: "El problema de producto",
    problemBody:
      "Los equipos suelen reaccionar a la queja reciente más ruidosa. Ese enfoque pasa por alto dos cosas: si un tema está empeorando realmente con el tiempo, y si señala una pérdida de confianza financiera de alta severidad.",
    journey: [
      "El cliente ve o experimenta un cargo de recarga inesperado.",
      "Contacta a soporte, deja comentarios negativos, solicita un reembolso o desactiva la recarga automática.",
      "Los equipos de producto reciben señales fragmentadas en varios canales.",
      "El panel detecta el patrón, muestra la evidencia y recomienda el nivel de respuesta adecuado.",
    ],
    principlesTitle: "Principios de diseño",
    principles: [
      { n: "01", title: "Confianza antes que volumen", body: "Las señales de control financiero pueden pesar más que problemas mayores pero de menor severidad." },
      { n: "02", title: "Tendencias, no instantáneas", body: "Comparar las tasas actuales con líneas base históricas, no con la queja reciente más ruidosa." },
      { n: "03", title: "Evidencia antes que causalidad", body: "Las alertas activan investigación; no prueban la causa raíz." },
      { n: "04", title: "Problemas distintos, acciones distintas", body: "Contener un incidente, investigar una hipótesis o priorizar una iniciativa del roadmap." },
    ],
    dashEyebrow: "Prototipo interactivo",
    dashTitle: "El panel",
    dashBody:
      "Filtra la vista, cambia de tema y haz clic en un punto del gráfico para inspeccionar una semana. El escenario de cargos inesperados es el flujo más completo; los demás temas usan datos simulados simplificados pero coherentes.",
    experimentTitle: "Cómo el equipo validaría la alerta",
    experimentBody:
      "Una alerta de riesgo de confianza es una hipótesis. En producción, el equipo la validaría con una comparación controlada en lugar de comparar versiones de la app a posteriori.",
    variantA: "Variante A",
    variantABody: "Flujo de suscripción anterior.",
    variantB: "Variante B",
    variantBBody: "Flujo de suscripción actualizado con configuración de recarga automática.",
    experimentSetup:
      "Usuarios elegibles: usuarios de Android con la recarga automática ya activada. Métrica de protección principal: tasa de desactivación de recarga automática a siete días. Señales secundarias: solicitudes de reembolso, contactos de soporte sobre cargos inesperados y comentarios cualitativos. Este es un plan de validación en producción simulado, no el resultado de un experimento real.",
    tableHead: { metric: "Métrica", a: "Variante A", b: "Variante B", diff: "Diferencia", interp: "Interpretación" },
    methodologyLabel: "Metodología:",
    methodologyBody:
      "Una prueba A/B dentro de la misma versión de la app es más fiable que comparar solo versiones, porque ambos grupos experimentan la misma fecha, plataforma, campañas y condiciones externas. Aun así, los resultados requieren comprobaciones de instrumentación, exposición y desequilibrio entre segmentos.",
    decisionTitle: "Registro de decisión",
    prioritizationTitle: "Lógica de priorización",
    prioritizationBody:
      "Retention Signals no clasifica cada problema con un único número universal. Primero clasifica si un patrón es un incidente, una alerta de riesgo de confianza, una oportunidad de descubrimiento o una tendencia solo para monitorear.",
    prioritization: [
      { signal: "Pico de fiabilidad del servicio principal", classification: "Incidente", action: "Investigación de Ingeniería ahora", tone: "risk" as Tone },
      { signal: "Señal de dinero o consentimiento + corroboración", classification: "Alerta de riesgo de confianza", action: "Contener e investigar", tone: "risk" as Tone },
      { signal: "Dolor persistente de alto volumen sin un pico crítico", classification: "Oportunidad de descubrimiento", action: "Investigación y evaluación de roadmap", tone: "warn" as Tone },
      { signal: "Patrón emergente de bajo volumen o incierto", classification: "Monitorear", action: "Recopilar más evidencia", tone: "info" as Tone },
    ],
    opportunityLabel: "Puntuación de oportunidad:",
    opportunityBody:
      "Para las oportunidades que no son incidentes, los equipos consideran primero el impacto en la confianza, luego el alcance, la tendencia y la confianza de la evidencia. Las puntuaciones apoyan la discusión; no reemplazan el criterio.",
    methodologySectionTitle: "Datos y metodología",
    simulatedBadge: "Simulado",
    methodology: [
      "Los patrones de reseñas públicas pueden usarse para identificar y clasificar problemas recurrentes de los clientes en varios idiomas.",
      "La telemetría a nivel de evento del panel, los metadatos de lanzamiento, los resultados de experimentos y la analítica de usuarios están simulados para demostrar el flujo de decisión.",
      "La clasificación de temas usa una taxonomía predefinida con una muestra de revisión manual.",
      "No trates una reseña, una etiqueta de tema o una alerta como prueba de causalidad.",
      "Un tema necesita al menos 3 señales cualitativas independientes para entrar en el informe; una alerta de alta severidad requiere un aumento histórico y validación mediante telemetría interna en un entorno real.",
      "Este caso no utiliza datos confidenciales de ningún empleador real.",
    ],
    outcomeTitle: "Resultado",
    outcomeBody:
      "El prototipo demuestra un modelo de trabajo de PM más que un resultado de negocio declarado: detectar una señal, inspeccionar su distribución y evidencia, validarla con datos internos adecuados, contener el posible daño y convertir el aprendizaje verificado en una decisión de producto.",
    prevLabel: "Anterior",
    prevTitle: "03 — Del feedback de estudiantes al roadmap",
    nextLabel: "Siguiente",
    nextTitle: "Todos los casos",
  },
} as const;

const toneText: Record<Tone, string> = {
  risk: "text-risk",
  warn: "text-warn",
  info: "text-info",
};
const toneBg: Record<Tone, string> = {
  risk: "bg-risk-soft",
  warn: "bg-warn-soft",
  info: "bg-info-soft",
};

export default function RetentionSignalsPage() {
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
            className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-risk/10 blur-[120px]"
          />
          <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-8">
            <div className="animate-rise space-y-5">
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-accent">
                {t.badge}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-balance">
                {t.title}
              </h1>
              <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-muted text-pretty">
                {t.lede}
              </p>
              <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/80">
                {t.intro}
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {t.heroFacts.map((f) => (
                <div key={f.label} className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{f.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 space-y-16">
          {/* Problem */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.problemTitle}</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">
              {t.problemBody}
            </p>
            <ol className="grid gap-3 sm:grid-cols-2">
              {t.journey.map((step, i) => (
                <li key={i} className="flex gap-3 rounded-2xl border border-border bg-surface p-5">
                  <span className="font-display text-lg tabular-nums text-accent">{i + 1}</span>
                  <span className="text-sm leading-relaxed text-foreground/85">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Design principles */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.principlesTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {t.principles.map((p) => (
                <div key={p.n} className="rounded-2xl border border-border bg-surface p-6">
                  <p className="font-display text-sm tracking-[0.1em] text-accent">{p.n}</p>
                  <h3 className="mt-2 font-display text-lg tracking-tight">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive dashboard */}
          <section className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">{t.dashEyebrow}</p>
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.dashTitle}</h2>
              <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">
                {t.dashBody}
              </p>
            </div>
            <RetentionDashboard lang={lang} />
          </section>

          {/* Experiment validation */}
          <section id="experiment-validation" className="space-y-5 scroll-mt-20">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.experimentTitle}</h2>
            </div>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">
              {t.experimentBody}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-5 space-y-1.5">
                <span className="inline-flex items-center rounded-full bg-info-soft px-2.5 py-0.5 text-[11px] font-semibold text-info">
                  {t.variantA}
                </span>
                <p className="text-sm leading-relaxed text-foreground/85">{t.variantABody}</p>
              </div>
              <div className="rounded-2xl border border-risk/30 bg-risk-soft/40 p-5 space-y-1.5">
                <span className="inline-flex items-center rounded-full bg-risk-soft px-2.5 py-0.5 text-[11px] font-semibold text-risk">
                  {t.variantB}
                </span>
                <p className="text-sm leading-relaxed text-foreground/85">{t.variantBBody}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted">
              {t.experimentSetup}
            </p>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-left text-sm tabular-nums">
                <thead className="bg-surface-2 text-muted">
                  <tr className="text-[11px] uppercase tracking-[0.1em]">
                    <th className="p-4 font-semibold">{t.tableHead.metric}</th>
                    <th className="p-4 font-semibold">{t.tableHead.a}</th>
                    <th className="p-4 font-semibold">{t.tableHead.b}</th>
                    <th className="p-4 font-semibold">{t.tableHead.diff}</th>
                    <th className="p-4 font-semibold">{t.tableHead.interp}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-surface text-foreground/80">
                  {EXPERIMENT_ROWS.map((r) => (
                    <tr key={r.metric.en}>
                      <td className="p-4 font-medium text-foreground">{pick(r.metric, lang)}</td>
                      <td className="p-4">{r.variantA}</td>
                      <td className="p-4 font-semibold text-risk">{r.variantB}</td>
                      <td className="p-4 font-semibold text-risk">{r.difference}</td>
                      <td className="p-4 text-xs leading-relaxed text-muted">{pick(r.interpretation, lang)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl border-l-2 border-accent/50 bg-surface-2 p-5">
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-semibold text-foreground">{t.methodologyLabel} </span>
                {t.methodologyBody}
              </p>
            </div>
          </section>

          {/* Decision record */}
          <section id="decision-record" className="space-y-5 scroll-mt-20">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.decisionTitle}</h2>
            <DecisionRecord lang={lang} />
          </section>

          {/* Prioritization logic */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.prioritizationTitle}</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">
              {t.prioritizationBody}
            </p>
            <div className="space-y-3">
              {t.prioritization.map((row) => (
                <div
                  key={row.classification}
                  className="grid gap-3 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-[1.4fr_auto_1.2fr] sm:items-center"
                >
                  <p className="text-sm leading-relaxed text-foreground/85">{row.signal}</p>
                  <span
                    className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold ${toneBg[row.tone]} ${toneText[row.tone]}`}
                  >
                    {row.classification}
                  </span>
                  <p className="text-sm font-medium text-foreground sm:text-right">{row.action}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border-l-2 border-accent/50 bg-surface-2 p-5">
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-semibold text-foreground">{t.opportunityLabel} </span>
                {t.opportunityBody}
              </p>
            </div>
          </section>

          {/* Data & methodology */}
          <section className="space-y-5">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.methodologySectionTitle}</h2>
              <span className="inline-flex items-center rounded-full bg-warn-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-warn">
                {t.simulatedBadge}
              </span>
            </div>
            <ul className="space-y-3">
              {t.methodology.map((m, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
          </section>

          {/* Outcome */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.outcomeTitle}</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">
              {t.outcomeBody}
            </p>
          </section>

          {/* Prev / next footer */}
          <nav className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/cases/alumnas-roadmap"
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
            >
              <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">←</span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.14em]">{t.prevLabel}</span>
                <span className="block font-medium text-foreground group-hover:text-accent">{t.prevTitle}</span>
              </span>
            </Link>
            <Link
              href="/#casos"
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent sm:text-right"
            >
              <span className="sm:order-2" aria-hidden="true">→</span>
              <span className="sm:order-1">
                <span className="block text-[11px] uppercase tracking-[0.14em]">{t.nextLabel}</span>
                <span className="block font-medium text-foreground group-hover:text-accent">{t.nextTitle}</span>
              </span>
            </Link>
          </nav>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
