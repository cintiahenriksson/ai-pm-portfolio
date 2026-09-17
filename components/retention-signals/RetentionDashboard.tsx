"use client";
import React, { useMemo, useState } from "react";
import TrendChart, { type ChartSeries } from "./TrendChart";
import InfoTip from "./InfoTip";
import {
  AXIS_LABELS,
  CATEGORIES,
  DEFAULT_FILTERS,
  EVIDENCE_ITEMS,
  GLOSSARY,
  RELEASE_MARKER,
  SEGMENT_ROWS,
  WEEKLY_TOTALS,
  getCategory,
  signalIntensity,
  type CategoryId,
  type Filters,
  type Severity,
  type StatusKind,
} from "@/lib/retention-signals-data";

/* ---------- filter option config ---------- */
const FILTER_GROUPS: {
  key: keyof Filters;
  label: string;
  options: { value: string; label: string }[];
}[] = [
  {
    key: "range",
    label: "Date range",
    options: [
      { value: "12w", label: "Last 12 weeks" },
      { value: "6m", label: "Last 6 months" },
      { value: "12m", label: "Last 12 months" },
    ],
  },
  {
    key: "platform",
    label: "Platform",
    options: [
      { value: "all", label: "All" },
      { value: "android", label: "Android" },
      { value: "ios", label: "iOS" },
      { value: "web", label: "Web" },
    ],
  },
  {
    key: "source",
    label: "Feedback source",
    options: [
      { value: "all", label: "All" },
      { value: "support", label: "Support tickets" },
      { value: "reviews", label: "App reviews" },
      { value: "billing", label: "Billing contacts" },
    ],
  },
  {
    key: "market",
    label: "Market",
    options: [
      { value: "all", label: "All" },
      { value: "sweden", label: "Sweden" },
      { value: "uk", label: "United Kingdom" },
      { value: "us", label: "United States" },
      { value: "philippines", label: "Philippines" },
      { value: "nigeria", label: "Nigeria" },
    ],
  },
  {
    key: "language",
    label: "Language",
    options: [
      { value: "all", label: "All" },
      { value: "english", label: "English" },
      { value: "spanish", label: "Spanish" },
      { value: "portuguese", label: "Portuguese" },
      { value: "arabic", label: "Arabic" },
    ],
  },
  {
    key: "version",
    label: "App version",
    options: [
      { value: "all", label: "All" },
      { value: "7.13.2", label: "7.13.2" },
      { value: "7.14.0", label: "7.14.0" },
      { value: "7.14.1", label: "7.14.1" },
    ],
  },
];

const STATUS_TEXT: Record<StatusKind, string> = {
  risk: "text-risk",
  warn: "text-warn",
  info: "text-info",
  stable: "text-stable",
};
const STATUS_DOT: Record<StatusKind, string> = {
  risk: "bg-risk",
  warn: "bg-warn",
  info: "bg-info",
  stable: "bg-stable",
};

const SEVERITY_BADGE: Record<Severity, string> = {
  high: "bg-risk-soft text-risk",
  medium: "bg-warn-soft text-warn",
  low: "bg-stable-soft text-stable",
};

function SeverityBadge({ level }: { level: Severity }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${SEVERITY_BADGE[level]}`}>
      {level}
    </span>
  );
}

/* Scale a base count series by an intensity factor, keeping integers. */
function scale(values: number[], factor: number): number[] {
  if (factor === 1) return values;
  return values.map((v) => Math.max(0, Math.round(v * factor)));
}

/* Down-sample / reshape a 12-week series to the requested axis length. */
function reshape(values: number[], targetLen: number): number[] {
  if (targetLen === values.length) return values;
  const out: number[] = [];
  for (let i = 0; i < targetLen; i++) {
    const idx = Math.round((i / (targetLen - 1)) * (values.length - 1));
    out.push(values[idx]);
  }
  return out;
}

export default function RetentionDashboard() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [selected, setSelected] = useState<CategoryId>("unexpected-charges");
  const [visible, setVisible] = useState<Set<CategoryId>>(new Set(["unexpected-charges"]));
  const [mode, setMode] = useState<"count" | "percent">("count");
  const [activeWeek, setActiveWeek] = useState<number | null>(11);
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  const labels = AXIS_LABELS[filters.range];
  const isWeekly = filters.range === "12w";

  const setFilter = (key: keyof Filters, value: string) =>
    setFilters((f) => ({ ...f, [key]: value }));

  const activeCategory = getCategory(selected);
  const intensity = signalIntensity(filters, selected);

  /* Build chart series from the visible categories. */
  const series: ChartSeries[] = useMemo(() => {
    return CATEGORIES.filter((c) => visible.has(c.id)).map((c) => {
      const factor = signalIntensity(filters, c.id);
      const scaled = scale(c.counts, factor);
      const shaped = reshape(scaled, labels.length);
      const totals = reshape(WEEKLY_TOTALS, labels.length);
      const values =
        mode === "percent"
          ? shaped.map((v, i) => +((v / totals[i]) * 100).toFixed(1))
          : shaped;
      return { id: c.id, label: c.label, values, status: c.status };
    });
  }, [visible, filters, labels.length, mode]);

  /* Overview cards react to the selected category + intensity. */
  const adjPct = +(activeCategory.latestPct * intensity).toFixed(1);
  const adjMultiplier = +(activeCategory.baselineMultiplier * intensity).toFixed(1);
  const alertActive = selected === "unexpected-charges" && intensity >= 0.9;

  const cards = [
    {
      label: "Trust-risk alerts",
      value: alertActive ? "1 active" : "0 active",
      delta: alertActive ? "Escalation recommended" : "None in current view",
      status: (alertActive ? "risk" : "stable") as StatusKind,
      term: "trust-risk alert" as const,
    },
    {
      label: "Feedback mentioning unexpected charges",
      value: `${adjPct}%`,
      delta: `${adjMultiplier >= 1 ? "+" : ""}${Math.round((adjMultiplier - 1) * 100)}% vs. 8-week baseline`,
      status: (adjMultiplier >= 2 ? "risk" : adjMultiplier >= 1.3 ? "warn" : "stable") as StatusKind,
      term: "baseline" as const,
    },
    {
      label: "Auto-top-up disable rate",
      value: `${(8.1 * clampFactor(intensity)).toFixed(1)}%`,
      delta: "+3.5pp vs. control",
      status: "risk" as StatusKind,
      term: "pp" as const,
    },
    {
      label: "Refund-request rate",
      value: `${(3.4 * clampFactor(intensity)).toFixed(1)}%`,
      delta: "+1.8pp vs. control",
      status: "warn" as StatusKind,
      term: "pp" as const,
    },
    {
      label: "Classification confidence",
      value: "89%",
      delta: "reviewed agreement",
      status: "info" as StatusKind,
      term: "classification agreement" as const,
    },
  ];

  const filtersDirty = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  const toggleVisible = (id: CategoryId) => {
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const weekTotals = reshape(WEEKLY_TOTALS, labels.length);
  const activeCounts = activeWeek != null ? scale(reshape(activeCategory.counts, labels.length), intensity) : [];
  const activeWeekPct =
    activeWeek != null ? +((activeCounts[activeWeek] / weekTotals[activeWeek]) * 100).toFixed(1) : 0;

  return (
    <div className="rounded-3xl border border-border bg-surface p-5 sm:p-7 space-y-7">
      {/* Header */}
      <div className="flex flex-col gap-1.5 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-display text-xl sm:text-2xl tracking-tight">Churn &amp; Trust Signal Monitor</h3>
          <p className="mt-1 text-sm text-muted">
            Simulated monitoring surface. Filters update every panel below.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-warn-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-warn">
          Simulated telemetry
        </span>
      </div>

      {/* Filter bar */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FILTER_GROUPS.map((g) => (
          <label key={g.key} className="flex flex-col gap-1.5">
            <span className="text-[11px] uppercase tracking-[0.12em] text-muted">{g.label}</span>
            <select
              value={filters[g.key]}
              onChange={(e) => setFilter(g.key, e.target.value)}
              className="rounded-xl border border-border bg-surface-2 px-3 py-2 text-sm text-foreground focus-visible:border-accent"
            >
              {g.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">
          {filtersDirty ? "Filters applied to a simulated dataset." : "Showing the default trust-risk scenario."}
        </p>
        <button
          type="button"
          onClick={() => setFilters(DEFAULT_FILTERS)}
          disabled={!filtersDirty}
          className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-foreground hover:border-accent/60 hover:text-accent disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
        >
          Reset filters
        </button>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-surface-2 p-4">
            <div className="flex items-start justify-between gap-1">
              <p className="text-[11px] leading-snug text-muted">{c.label}</p>
              <InfoTip term={c.term}>{glossaryText(c.term)}</InfoTip>
            </div>
            <p className={`mt-2 font-display text-2xl tracking-tight tabular-nums ${STATUS_TEXT[c.status]}`}>
              {c.value}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted">
              <span className={`inline-block h-1.5 w-1.5 rounded-full ${STATUS_DOT[c.status]}`} aria-hidden="true" />
              {c.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Chart + category toggles */}
      <div className="rounded-2xl border border-border bg-surface-2 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="font-display text-lg tracking-tight">Negative-feedback distribution over time</h4>
            <p className="text-xs text-muted">
              {isWeekly ? "12 weekly observations · release line shown" : "Aggregated view · release line hidden"}
            </p>
          </div>
          <div className="inline-flex rounded-full border border-border bg-surface p-0.5 text-xs font-semibold">
            {(["count", "percent"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-full px-3 py-1.5 ${mode === m ? "bg-accent text-accent-foreground" : "text-muted hover:text-foreground"}`}
              >
                {m === "count" ? "Signals" : "% of total"}
              </button>
            ))}
          </div>
        </div>

        {/* Category toggles */}
        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const on = visible.has(c.id);
            const isSel = selected === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelected(c.id);
                  if (!visible.has(c.id)) toggleVisible(c.id);
                }}
                onDoubleClick={() => toggleVisible(c.id)}
                aria-pressed={on}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                  isSel
                    ? "border-accent bg-accent-soft text-accent"
                    : on
                      ? "border-border bg-surface text-foreground"
                      : "border-border bg-surface text-muted opacity-60"
                }`}
              >
                <span className={`inline-block h-2 w-2 rounded-full ${STATUS_DOT[c.status]}`} aria-hidden="true" />
                {c.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-muted">
          Click a topic to select it; double-click to add or remove it from the chart.
        </p>

        <div className="mt-4">
          <TrendChart
            labels={labels}
            series={series}
            releaseIndex={isWeekly ? RELEASE_MARKER.index : null}
            releaseLabel={isWeekly ? RELEASE_MARKER.label : undefined}
            activeIndex={activeWeek}
            onPointSelect={setActiveWeek}
            valueSuffix={mode === "percent" ? "percent of total" : "signals"}
          />
        </div>

        {/* Week detail */}
        {activeWeek != null && (
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] text-muted">Detail · {labels[activeWeek]}</p>
              <p className="mt-1 text-sm text-foreground">
                <span className={`font-semibold ${STATUS_TEXT[activeCategory.status]}`}>{activeCategory.label}</span>
                {" — "}
                {activeCounts[activeWeek]} signals · {activeWeekPct}% of negative feedback
              </p>
            </div>
            {isWeekly && activeWeek >= RELEASE_MARKER.index && selected === "unexpected-charges" && (
              <span className="inline-flex w-fit items-center rounded-full bg-risk-soft px-3 py-1 text-[11px] font-semibold text-risk">
                Post-release window
              </span>
            )}
          </div>
        )}
      </div>

      {/* Alert panel */}
      <div className={`rounded-2xl border p-5 sm:p-6 ${alertActive ? "border-risk/40 bg-risk-soft/40" : "border-border bg-surface-2"}`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${STATUS_DOT[activeCategory.status]} ${alertActive ? "animate-pulse" : ""}`} aria-hidden="true" />
              <h4 className="font-display text-lg tracking-tight">
                {alertActive
                  ? "Trust risk corroborated: unexpected auto-top-up charges"
                  : `Signal: ${activeCategory.label}`}
              </h4>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/85">
              {alertActive
                ? "Feedback about unexpected charges increased from 2.8% to 6.7% of negative feedback after the subscription-flow update. Simulated telemetry shows a higher seven-day auto-top-up disable rate for users exposed to the new flow."
                : activeCategory.insight}
            </p>
          </div>
          <span
            className={`inline-flex w-fit shrink-0 items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${
              alertActive ? "bg-risk text-accent-foreground" : SEVERITY_BADGE[activeCategory.severity]
            }`}
          >
            {alertActive ? "Escalate" : `${activeCategory.severity} severity`}
          </span>
        </div>

        {/* Evidence pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(alertActive
            ? [
                "12 independent feedback signals",
                "2.4× above 8-week baseline",
                "Android concentration",
                "Started within 24h of release",
                "89% classification agreement",
              ]
            : [
                activeCategory.historicalPattern.length > 60
                  ? activeCategory.historicalPattern.slice(0, 57) + "…"
                  : activeCategory.historicalPattern,
              ]
          ).map((pill) => (
            <span key={pill} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-foreground/80">
              {pill}
            </span>
          ))}
        </div>

        <div className="mt-2 rounded-xl border-l-2 border-accent/50 bg-surface px-4 py-3 text-xs leading-relaxed text-muted">
          <span className="font-semibold text-foreground">Recommended action: </span>
          {activeCategory.recommendedAction}
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setEvidenceOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 hover:-translate-y-0.5"
          >
            Inspect evidence
          </button>
          <a
            href="#decision-record"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-accent/60 hover:text-accent"
          >
            View decision record
          </a>
          <a
            href="#experiment-validation"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-accent/60 hover:text-accent"
          >
            Compare experiment cohorts
          </a>
        </div>
      </div>

      {/* Segment breakdown */}
      <div className="rounded-2xl border border-border bg-surface-2 p-5">
        <h4 className="font-display text-lg tracking-tight">Where is the signal concentrated?</h4>
        <p className="mt-1 text-xs text-muted">
          Share of affected feedback for the unexpected-charge topic, by segment.
        </p>
        <div className="mt-4 space-y-3">
          {SEGMENT_ROWS.map((r) => (
            <div key={r.segment} className="rounded-xl border border-border bg-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-foreground">{r.segment}</span>
                <SeverityBadge level={r.severity} />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className={`h-full rounded-full ${r.severity === "high" ? "bg-risk" : "bg-info"}`}
                    style={{ width: `${r.share}%` }}
                  />
                </div>
                <span className="w-10 text-right text-sm font-semibold tabular-nums text-foreground">{r.share}%</span>
                <span className={`w-16 text-right text-xs font-semibold tabular-nums ${r.severity === "high" ? "text-risk" : "text-muted"}`}>
                  {r.changeVsBaseline}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted">{r.interpretation}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Geography, origin/destination corridor, exact billing logs, and customer-level behavior would require internal
          production data. They are represented only as simulated fields in this portfolio prototype.
        </p>
      </div>

      {/* Evidence inspector drawer */}
      {evidenceOpen && (
        <EvidenceInspector onClose={() => setEvidenceOpen(false)} />
      )}
    </div>
  );
}

function EvidenceInspector({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-background/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Evidence inspector"
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-md overflow-y-auto border-l border-border bg-surface p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
          <div>
            <h4 className="font-display text-xl tracking-tight">Evidence inspector</h4>
            <p className="mt-1 text-xs text-muted">Unexpected auto-top-up charges · classified sample</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close evidence inspector"
            className="rounded-full border border-border p-2 text-muted hover:border-accent/60 hover:text-accent"
          >
            <span aria-hidden="true" className="block h-4 w-4 leading-none">×</span>
          </button>
        </div>

        <div className="mt-3 rounded-xl bg-warn-soft px-3 py-2 text-[11px] font-semibold text-warn">
          Fictional paraphrased feedback for demonstration — never verbatim, never from a real person.
        </div>

        <ul className="mt-4 space-y-3">
          {EVIDENCE_ITEMS.map((e, i) => (
            <li key={i} className="rounded-xl border border-border bg-surface-2 p-4">
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] text-muted">
                <span className="rounded-full bg-surface px-2 py-0.5 font-semibold text-foreground/80">{e.channel}</span>
                <span>{e.week}</span>
                <span>· {e.platform}</span>
                <span>· {e.version}</span>
                <span>· {e.language}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">&ldquo;{e.paraphrase}&rdquo;</p>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-[11px]">
                <span className="text-muted">{e.topic}</span>
                <span className="font-semibold tabular-nums text-accent">
                  {Math.round(e.confidence * 100)}% confidence
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Keep derived rates within a believable band regardless of filter stacking. */
function clampFactor(f: number): number {
  return Math.min(1.25, Math.max(0.35, f));
}

function glossaryText(term: string): string {
  return GLOSSARY[term] ?? "";
}
