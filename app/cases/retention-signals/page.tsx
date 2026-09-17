"use client";
import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RetentionDashboard from "@/components/retention-signals/RetentionDashboard";
import DecisionRecord from "@/components/retention-signals/DecisionRecord";
import { EXPERIMENT_ROWS } from "@/lib/retention-signals-data";

const HERO_FACTS = [
  { label: "Primary decision", value: "Investigate, contain, or prioritize" },
  { label: "Evidence sources", value: "Public feedback patterns + simulated product telemetry" },
  { label: "Focus scenario", value: "Unexpected auto-top-up charges after a subscription-flow change" },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Trust before volume",
    body: "Financial-control signals can outrank larger but lower-severity issues.",
  },
  {
    n: "02",
    title: "Trends, not snapshots",
    body: "Compare current rates against historical baselines, not the loudest recent complaint.",
  },
  {
    n: "03",
    title: "Evidence before causality",
    body: "Alerts trigger investigation; they do not prove root cause.",
  },
  {
    n: "04",
    title: "Different problems, different actions",
    body: "Contain an incident, investigate a hypothesis, or prioritize a roadmap initiative.",
  },
];

const JOURNEY = [
  "Customer sees or experiences an unexpected top-up charge.",
  "They contact support, leave negative feedback, request a refund, or disable auto-top-up.",
  "Product teams receive fragmented signals across channels.",
  "The dashboard detects the pattern, surfaces evidence, and recommends the appropriate level of response.",
];

const PRIORITIZATION = [
  {
    signal: "Core-service reliability spike",
    classification: "Incident",
    action: "Engineering investigation now",
    tone: "risk" as const,
  },
  {
    signal: "Money or consent signal + corroboration",
    classification: "Trust-risk alert",
    action: "Contain and investigate",
    tone: "risk" as const,
  },
  {
    signal: "Persistent high-volume pain without a critical spike",
    classification: "Discovery opportunity",
    action: "Research and roadmap evaluation",
    tone: "warn" as const,
  },
  {
    signal: "Low-volume or uncertain emerging pattern",
    classification: "Monitor",
    action: "Collect more evidence",
    tone: "info" as const,
  },
];

const METHODOLOGY = [
  "Public review patterns can be used to identify and classify recurring customer problems across languages.",
  "The dashboard's event-level telemetry, release metadata, experiment results, and user analytics are simulated to demonstrate the decision workflow.",
  "Topic classification uses a pre-defined taxonomy with a manual-review sample.",
  "Do not treat a review, a topic label, or an alert as proof of causality.",
  "A topic needs at least 3 independent qualitative signals to enter the report; a high-severity alert requires a historical increase and validation through internal telemetry in a real environment.",
  "This case does not use confidential data from any real employer.",
];

const toneText: Record<string, string> = {
  risk: "text-risk",
  warn: "text-warn",
  info: "text-info",
};
const toneBg: Record<string, string> = {
  risk: "bg-risk-soft",
  warn: "bg-warn-soft",
  info: "bg-info-soft",
};

export default function RetentionSignalsPage() {
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
                Case Study 04 · Product strategy · AI-assisted feedback synthesis
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-balance">
                Retention Signals
              </h1>
              <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-muted text-pretty">
                An explainable dashboard that turns emerging customer feedback into trust-risk alerts and product
                decisions.
              </p>
              <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/80">
                A hypothetical international calling, subscriptions, top-up, and remittances service receives feedback
                across app stores and support channels. Teams can see complaints, but struggle to distinguish a gradual
                retention issue from a critical trust-risk event that needs immediate intervention.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {HERO_FACTS.map((f) => (
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
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">The product problem</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">
              Teams often react to the loudest recent complaint. That approach misses two things: whether a topic is
              genuinely worsening over time, and whether it signals a high-severity loss of financial trust.
            </p>
            <ol className="grid gap-3 sm:grid-cols-2">
              {JOURNEY.map((step, i) => (
                <li key={i} className="flex gap-3 rounded-2xl border border-border bg-surface p-5">
                  <span className="font-display text-lg tabular-nums text-accent">{i + 1}</span>
                  <span className="text-sm leading-relaxed text-foreground/85">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Design principles */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">Design principles</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {PRINCIPLES.map((p) => (
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
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Interactive prototype</p>
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight">The dashboard</h2>
              <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">
                Filter the view, switch topics, and click a point on the chart to inspect a single week. The
                unexpected-charge scenario is the most complete flow; other topics use simplified but coherent
                simulated data.
              </p>
            </div>
            <RetentionDashboard />
          </section>

          {/* Experiment validation */}
          <section id="experiment-validation" className="space-y-5 scroll-mt-20">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight">How the team would validate the alert</h2>
            </div>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">
              A trust-risk alert is a hypothesis. In production, the team would validate it with a controlled comparison
              rather than by comparing app versions after the fact.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-5 space-y-1.5">
                <span className="inline-flex items-center rounded-full bg-info-soft px-2.5 py-0.5 text-[11px] font-semibold text-info">
                  Variant A
                </span>
                <p className="text-sm leading-relaxed text-foreground/85">Previous subscription flow.</p>
              </div>
              <div className="rounded-2xl border border-risk/30 bg-risk-soft/40 p-5 space-y-1.5">
                <span className="inline-flex items-center rounded-full bg-risk-soft px-2.5 py-0.5 text-[11px] font-semibold text-risk">
                  Variant B
                </span>
                <p className="text-sm leading-relaxed text-foreground/85">Updated subscription flow with auto-top-up setup.</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted">
              Eligible users: Android users with auto-top-up already enabled. Primary guardrail metric: seven-day
              auto-top-up disable rate. Secondary signals: refund requests, support contacts about unexpected charges,
              and qualitative feedback. This is a simulated production-validation plan, not a real experiment result.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-left text-sm tabular-nums">
                <thead className="bg-surface-2 text-muted">
                  <tr className="text-[11px] uppercase tracking-[0.1em]">
                    <th className="p-4 font-semibold">Metric</th>
                    <th className="p-4 font-semibold">Variant A</th>
                    <th className="p-4 font-semibold">Variant B</th>
                    <th className="p-4 font-semibold">Difference</th>
                    <th className="p-4 font-semibold">Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-surface text-foreground/80">
                  {EXPERIMENT_ROWS.map((r) => (
                    <tr key={r.metric}>
                      <td className="p-4 font-medium text-foreground">{r.metric}</td>
                      <td className="p-4">{r.variantA}</td>
                      <td className="p-4 font-semibold text-risk">{r.variantB}</td>
                      <td className="p-4 font-semibold text-risk">{r.difference}</td>
                      <td className="p-4 text-xs leading-relaxed text-muted">{r.interpretation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl border-l-2 border-accent/50 bg-surface-2 p-5">
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-semibold text-foreground">Methodology: </span>
                An A/B test within the same app version is more reliable than comparing app versions alone, because both
                groups experience the same date, platform, campaigns, and external conditions. Results still require
                checks for instrumentation, exposure, and segment imbalance.
              </p>
            </div>
          </section>

          {/* Decision record */}
          <section id="decision-record" className="space-y-5 scroll-mt-20">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">Decision record</h2>
            <DecisionRecord />
          </section>

          {/* Prioritization logic */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">Prioritization logic</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">
              Retention Signals does not rank every issue with one universal number. It first classifies whether a
              pattern is an incident, a trust-risk alert, a discovery opportunity, or a monitor-only trend.
            </p>
            <div className="space-y-3">
              {PRIORITIZATION.map((row) => (
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
                <span className="font-semibold text-foreground">Opportunity score: </span>
                For non-incident opportunities, teams consider trust impact first, then reach, trend, and evidence
                confidence. Scores support discussion; they do not replace judgment.
              </p>
            </div>
          </section>

          {/* Data & methodology */}
          <section className="space-y-5">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight">Data &amp; methodology</h2>
              <span className="inline-flex items-center rounded-full bg-warn-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-warn">
                Simulated
              </span>
            </div>
            <ul className="space-y-3">
              {METHODOLOGY.map((m, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {m}
                </li>
              ))}
            </ul>
          </section>

          {/* Outcome */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">Outcome</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">
              The prototype demonstrates a PM operating model rather than a claimed business result: detect a signal,
              inspect its distribution and evidence, validate it with appropriate internal data, contain potential harm,
              and convert verified learning into a product decision.
            </p>
          </section>

          {/* Reflection callout */}
          <section className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
            />
            <div className="relative space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">What I would test next</p>
              <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">
                Whether clearer consent, a visible auto-top-up status, and an easy in-context disable control reduce the
                auto-top-up disable rate and support contacts without reducing successful top-ups or subscription
                conversion.
              </p>
            </div>
          </section>

          {/* Prev / next footer */}
          <nav className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/cases/alumnas-roadmap"
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
            >
              <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">←</span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.14em]">Previous</span>
                <span className="block font-medium text-foreground group-hover:text-accent">03 — Student feedback to roadmap</span>
              </span>
            </Link>
            <Link
              href="/#casos"
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent sm:text-right"
            >
              <span className="sm:order-2" aria-hidden="true">→</span>
              <span className="sm:order-1">
                <span className="block text-[11px] uppercase tracking-[0.14em]">Next</span>
                <span className="block font-medium text-foreground group-hover:text-accent">All case studies</span>
              </span>
            </Link>
          </nav>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
