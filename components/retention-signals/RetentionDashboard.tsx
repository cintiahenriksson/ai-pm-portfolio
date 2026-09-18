"use client";
import React, { useMemo, useState } from "react";
import TrendChart, { type ChartSeries } from "./TrendChart";
import InfoTip from "./InfoTip";
import {
  CATEGORIES,
  DEFAULT_FILTERS,
  EVIDENCE_ITEMS,
  GLOSSARY,
  RELEASE_MARKER,
  SEGMENT_ROWS,
  SEVERITY_LABEL,
  WEEKLY_TOTALS,
  getAxisLabels,
  getCategory,
  pick,
  signalIntensity,
  type CategoryId,
  type Filters,
  type Lang,
  type Loc,
  type Severity,
  type StatusKind,
} from "@/lib/retention-signals-data";

/* ---------- filter option config ---------- */
const FILTER_GROUPS: {
  key: keyof Filters;
  label: Loc;
  options: { value: string; label: Loc }[];
}[] = [
  {
    key: "range",
    label: { en: "Date range", es: "Rango de fechas" },
    options: [
      { value: "12w", label: { en: "Last 12 weeks", es: "Últimas 12 semanas" } },
      { value: "6m", label: { en: "Last 6 months", es: "Últimos 6 meses" } },
      { value: "12m", label: { en: "Last 12 months", es: "Últimos 12 meses" } },
    ],
  },
  {
    key: "platform",
    label: { en: "Platform", es: "Plataforma" },
    options: [
      { value: "all", label: { en: "All", es: "Todas" } },
      { value: "android", label: { en: "Android", es: "Android" } },
      { value: "ios", label: { en: "iOS", es: "iOS" } },
      { value: "web", label: { en: "Web", es: "Web" } },
    ],
  },
  {
    key: "source",
    label: { en: "Feedback source", es: "Fuente de comentarios" },
    options: [
      { value: "all", label: { en: "All", es: "Todas" } },
      { value: "support", label: { en: "Support tickets", es: "Tickets de soporte" } },
      { value: "reviews", label: { en: "App reviews", es: "Reseñas de app" } },
      { value: "billing", label: { en: "Billing contacts", es: "Contactos de facturación" } },
    ],
  },
  {
    key: "market",
    label: { en: "Market", es: "Mercado" },
    options: [
      { value: "all", label: { en: "All", es: "Todos" } },
      { value: "sweden", label: { en: "Sweden", es: "Suecia" } },
      { value: "uk", label: { en: "United Kingdom", es: "Reino Unido" } },
      { value: "us", label: { en: "United States", es: "Estados Unidos" } },
      { value: "philippines", label: { en: "Philippines", es: "Filipinas" } },
      { value: "nigeria", label: { en: "Nigeria", es: "Nigeria" } },
    ],
  },
  {
    key: "language",
    label: { en: "Language", es: "Idioma" },
    options: [
      { value: "all", label: { en: "All", es: "Todos" } },
      { value: "english", label: { en: "English", es: "Inglés" } },
      { value: "spanish", label: { en: "Spanish", es: "Español" } },
      { value: "portuguese", label: { en: "Portuguese", es: "Portugués" } },
      { value: "arabic", label: { en: "Arabic", es: "Árabe" } },
    ],
  },
  {
    key: "version",
    label: { en: "App version", es: "Versión de la app" },
    options: [
      { value: "all", label: { en: "All", es: "Todas" } },
      { value: "7.13.2", label: { en: "7.13.2", es: "7.13.2" } },
      { value: "7.14.0", label: { en: "7.14.0", es: "7.14.0" } },
      { value: "7.14.1", label: { en: "7.14.1", es: "7.14.1" } },
    ],
  },
];

/* ---------- UI copy ---------- */
const UI: Record<Lang, {
  monitorTitle: string;
  monitorSub: string;
  simulatedTelemetry: string;
  filtersApplied: string;
  filtersDefault: string;
  resetFilters: string;
  cardTrustAlerts: string;
  activeOne: string;
  activeZero: string;
  escalationRec: string;
  noneInView: string;
  cardFeedbackCharges: string;
  vsBaseline: string;
  cardDisableRate: string;
  vsControl: string;
  cardRefundRate: string;
  cardConfidence: string;
  reviewedAgreement: string;
  distTitle: string;
  weeklyCaption: string;
  aggCaption: string;
  signals: string;
  pctOfTotal: string;
  toggleHint: string;
  detail: string;
  signalsUnit: string;
  ofNegative: string;
  postRelease: string;
  alertCorroborated: string;
  signalPrefix: string;
  alertBody: string;
  escalate: string;
  severityWord: string;
  pills: string[];
  recommendedAction: string;
  inspectEvidence: string;
  viewDecision: string;
  compareCohorts: string;
  segmentTitle: string;
  segmentSub: string;
  segmentFootnote: string;
  evidenceTitle: string;
  evidenceSub: string;
  evidenceWarning: string;
  confidence: string;
  closeEvidence: string;
  valueSuffixPercent: string;
  valueSuffixSignals: string;
}> = {
  en: {
    monitorTitle: "Churn & Trust Signal Monitor",
    monitorSub: "Simulated monitoring surface. Filters update every panel below.",
    simulatedTelemetry: "Simulated telemetry",
    filtersApplied: "Filters applied to a simulated dataset.",
    filtersDefault: "Showing the default trust-risk scenario.",
    resetFilters: "Reset filters",
    cardTrustAlerts: "Trust-risk alerts",
    activeOne: "1 active",
    activeZero: "0 active",
    escalationRec: "Escalation recommended",
    noneInView: "None in current view",
    cardFeedbackCharges: "Feedback mentioning unexpected charges",
    vsBaseline: "vs. 8-week baseline",
    cardDisableRate: "Auto-top-up disable rate",
    vsControl: "vs. control",
    cardRefundRate: "Refund-request rate",
    cardConfidence: "Classification confidence",
    reviewedAgreement: "reviewed agreement",
    distTitle: "Negative-feedback distribution over time",
    weeklyCaption: "12 weekly observations · release line shown",
    aggCaption: "Aggregated view · release line hidden",
    signals: "Signals",
    pctOfTotal: "% of total",
    toggleHint: "Click a topic to select it; double-click to add or remove it from the chart.",
    detail: "Detail",
    signalsUnit: "signals",
    ofNegative: "of negative feedback",
    postRelease: "Post-release window",
    alertCorroborated: "Trust risk corroborated: unexpected auto-top-up charges",
    signalPrefix: "Signal",
    alertBody:
      "Feedback about unexpected charges increased from 2.8% to 6.7% of negative feedback after the subscription-flow update. Simulated telemetry shows a higher seven-day auto-top-up disable rate for users exposed to the new flow.",
    escalate: "Escalate",
    severityWord: "severity",
    pills: [
      "12 independent feedback signals",
      "2.4× above 8-week baseline",
      "Android concentration",
      "Started within 24h of release",
      "89% classification agreement",
    ],
    recommendedAction: "Recommended action:",
    inspectEvidence: "Inspect evidence",
    viewDecision: "View decision record",
    compareCohorts: "Compare experiment cohorts",
    segmentTitle: "Where is the signal concentrated?",
    segmentSub: "Share of affected feedback for the unexpected-charge topic, by segment.",
    segmentFootnote:
      "Geography, origin/destination corridor, exact billing logs, and customer-level behavior would require internal production data. They are represented only as simulated fields in this portfolio prototype.",
    evidenceTitle: "Evidence inspector",
    evidenceSub: "Unexpected auto-top-up charges · classified sample",
    evidenceWarning:
      "Fictional paraphrased feedback for demonstration — never verbatim, never from a real person.",
    confidence: "confidence",
    closeEvidence: "Close evidence inspector",
    valueSuffixPercent: "percent of total",
    valueSuffixSignals: "signals",
  },
  es: {
    monitorTitle: "Monitor de señales de fuga y confianza",
    monitorSub: "Superficie de monitoreo simulada. Los filtros actualizan cada panel de abajo.",
    simulatedTelemetry: "Telemetría simulada",
    filtersApplied: "Filtros aplicados a un conjunto de datos simulado.",
    filtersDefault: "Mostrando el escenario de riesgo de confianza por defecto.",
    resetFilters: "Restablecer filtros",
    cardTrustAlerts: "Alertas de riesgo de confianza",
    activeOne: "1 activa",
    activeZero: "0 activas",
    escalationRec: "Escalamiento recomendado",
    noneInView: "Ninguna en la vista actual",
    cardFeedbackCharges: "Comentarios que mencionan cargos inesperados",
    vsBaseline: "vs. línea base de 8 semanas",
    cardDisableRate: "Tasa de desactivación de recarga automática",
    vsControl: "vs. control",
    cardRefundRate: "Tasa de solicitudes de reembolso",
    cardConfidence: "Confianza de clasificación",
    reviewedAgreement: "concordancia revisada",
    distTitle: "Distribución de comentarios negativos a lo largo del tiempo",
    weeklyCaption: "12 observaciones semanales · línea de lanzamiento visible",
    aggCaption: "Vista agregada · línea de lanzamiento oculta",
    signals: "Señales",
    pctOfTotal: "% del total",
    toggleHint: "Haz clic en un tema para seleccionarlo; doble clic para añadirlo o quitarlo del gráfico.",
    detail: "Detalle",
    signalsUnit: "señales",
    ofNegative: "de los comentarios negativos",
    postRelease: "Ventana posterior al lanzamiento",
    alertCorroborated: "Riesgo de confianza corroborado: cargos inesperados de recarga automática",
    signalPrefix: "Señal",
    alertBody:
      "Los comentarios sobre cargos inesperados aumentaron del 2.8% al 6.7% de los comentarios negativos tras la actualización del flujo de suscripción. La telemetría simulada muestra una mayor tasa de desactivación de recarga automática a siete días entre los usuarios expuestos al nuevo flujo.",
    escalate: "Escalar",
    severityWord: "severidad",
    pills: [
      "12 señales de feedback independientes",
      "2.4× por encima de la línea base de 8 semanas",
      "Concentración en Android",
      "Comenzó dentro de las 24h del lanzamiento",
      "89% de concordancia de clasificación",
    ],
    recommendedAction: "Acción recomendada:",
    inspectEvidence: "Inspeccionar evidencia",
    viewDecision: "Ver registro de decisión",
    compareCohorts: "Comparar cohortes del experimento",
    segmentTitle: "¿Dónde se concentra la señal?",
    segmentSub: "Proporción de comentarios afectados por el tema de cargos inesperados, por segmento.",
    segmentFootnote:
      "La geografía, el corredor de origen/destino, los registros de facturación exactos y el comportamiento a nivel de cliente requerirían datos internos de producción. Aquí se representan solo como campos simulados en este prototipo de portafolio.",
    evidenceTitle: "Inspector de evidencia",
    evidenceSub: "Cargos inesperados de recarga automática · muestra clasificada",
    evidenceWarning:
      "Comentarios ficticios parafraseados para demostración — nunca textuales, nunca de una persona real.",
    confidence: "de confianza",
    closeEvidence: "Cerrar el inspector de evidencia",
    valueSuffixPercent: "por ciento del total",
    valueSuffixSignals: "señales",
  },
};

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

function SeverityBadge({ level, lang }: { level: Severity; lang: Lang }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${SEVERITY_BADGE[level]}`}>
      {pick(SEVERITY_LABEL[level], lang)}
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

export default function RetentionDashboard({ lang = "en" }: { lang?: Lang }) {
  const t = UI[lang];
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [selected, setSelected] = useState<CategoryId>("unexpected-charges");
  const [visible, setVisible] = useState<Set<CategoryId>>(new Set(["unexpected-charges"]));
  const [mode, setMode] = useState<"count" | "percent">("count");
  const [activeWeek, setActiveWeek] = useState<number | null>(11);
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  const labels = getAxisLabels(filters.range, lang);
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
      return { id: c.id, label: pick(c.label, lang), values, status: c.status };
    });
  }, [visible, filters, labels.length, mode, lang]);

  /* Overview cards react to the selected category + intensity. */
  const adjPct = +(activeCategory.latestPct * intensity).toFixed(1);
  const adjMultiplier = +(activeCategory.baselineMultiplier * intensity).toFixed(1);
  const alertActive = selected === "unexpected-charges" && intensity >= 0.9;
  const baselineDelta = `${adjMultiplier >= 1 ? "+" : ""}${Math.round((adjMultiplier - 1) * 100)}% ${t.vsBaseline}`;

  const cards = [
    {
      label: t.cardTrustAlerts,
      value: alertActive ? t.activeOne : t.activeZero,
      delta: alertActive ? t.escalationRec : t.noneInView,
      status: (alertActive ? "risk" : "stable") as StatusKind,
      term: "trust-risk alert",
    },
    {
      label: t.cardFeedbackCharges,
      value: `${adjPct}%`,
      delta: baselineDelta,
      status: (adjMultiplier >= 2 ? "risk" : adjMultiplier >= 1.3 ? "warn" : "stable") as StatusKind,
      term: "baseline",
    },
    {
      label: t.cardDisableRate,
      value: `${(8.1 * clampFactor(intensity)).toFixed(1)}%`,
      delta: `+3.5pp ${t.vsControl}`,
      status: "risk" as StatusKind,
      term: "pp",
    },
    {
      label: t.cardRefundRate,
      value: `${(3.4 * clampFactor(intensity)).toFixed(1)}%`,
      delta: `+1.8pp ${t.vsControl}`,
      status: "warn" as StatusKind,
      term: "pp",
    },
    {
      label: t.cardConfidence,
      value: "89%",
      delta: t.reviewedAgreement,
      status: "info" as StatusKind,
      term: "classification agreement",
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
          <h3 className="font-display text-xl sm:text-2xl tracking-tight">{t.monitorTitle}</h3>
          <p className="mt-1 text-sm text-muted">{t.monitorSub}</p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-warn-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-warn">
          {t.simulatedTelemetry}
        </span>
      </div>

      {/* Filter bar */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FILTER_GROUPS.map((g) => (
          <label key={g.key} className="flex flex-col gap-1.5">
            <span className="text-[11px] uppercase tracking-[0.12em] text-muted">{pick(g.label, lang)}</span>
            <select
              value={filters[g.key]}
              onChange={(e) => setFilter(g.key, e.target.value)}
              className="rounded-xl border border-border bg-surface-2 px-3 py-2 text-sm text-foreground focus-visible:border-accent"
            >
              {g.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {pick(o.label, lang)}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">
          {filtersDirty ? t.filtersApplied : t.filtersDefault}
        </p>
        <button
          type="button"
          onClick={() => setFilters(DEFAULT_FILTERS)}
          disabled={!filtersDirty}
          className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-foreground hover:border-accent/60 hover:text-accent disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
        >
          {t.resetFilters}
        </button>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {cards.map((c) => {
          const g = GLOSSARY[c.term];
          return (
            <div key={c.label} className="rounded-2xl border border-border bg-surface-2 p-4">
              <div className="flex items-start justify-between gap-1">
                <p className="text-[11px] leading-snug text-muted">{c.label}</p>
                {g && <InfoTip term={pick(g.term, lang)}>{pick(g.def, lang)}</InfoTip>}
              </div>
              <p className={`mt-2 font-display text-2xl tracking-tight tabular-nums ${STATUS_TEXT[c.status]}`}>
                {c.value}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${STATUS_DOT[c.status]}`} aria-hidden="true" />
                {c.delta}
              </p>
            </div>
          );
        })}
      </div>

      {/* Chart + category toggles */}
      <div className="rounded-2xl border border-border bg-surface-2 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="font-display text-lg tracking-tight">{t.distTitle}</h4>
            <p className="text-xs text-muted">
              {isWeekly ? t.weeklyCaption : t.aggCaption}
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
                {m === "count" ? t.signals : t.pctOfTotal}
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
                {pick(c.label, lang)}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-muted">{t.toggleHint}</p>

        <div className="mt-4">
          <TrendChart
            labels={labels}
            series={series}
            releaseIndex={isWeekly ? RELEASE_MARKER.index : null}
            releaseLabel={isWeekly ? pick(RELEASE_MARKER.label, lang) : undefined}
            activeIndex={activeWeek}
            onPointSelect={setActiveWeek}
            valueSuffix={mode === "percent" ? t.valueSuffixPercent : t.valueSuffixSignals}
            lang={lang}
          />
        </div>

        {/* Week detail */}
        {activeWeek != null && (
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] text-muted">{t.detail} · {labels[activeWeek]}</p>
              <p className="mt-1 text-sm text-foreground">
                <span className={`font-semibold ${STATUS_TEXT[activeCategory.status]}`}>{pick(activeCategory.label, lang)}</span>
                {" — "}
                {activeCounts[activeWeek]} {t.signalsUnit} · {activeWeekPct}% {t.ofNegative}
              </p>
            </div>
            {isWeekly && activeWeek >= RELEASE_MARKER.index && selected === "unexpected-charges" && (
              <span className="inline-flex w-fit items-center rounded-full bg-risk-soft px-3 py-1 text-[11px] font-semibold text-risk">
                {t.postRelease}
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
                  ? t.alertCorroborated
                  : `${t.signalPrefix}: ${pick(activeCategory.label, lang)}`}
              </h4>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/85">
              {alertActive ? t.alertBody : pick(activeCategory.insight, lang)}
            </p>
          </div>
          <span
            className={`inline-flex w-fit shrink-0 items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${
              alertActive ? "bg-risk text-accent-foreground" : SEVERITY_BADGE[activeCategory.severity]
            }`}
          >
            {alertActive
              ? t.escalate
              : lang === "es"
                ? `${t.severityWord} ${pick(SEVERITY_LABEL[activeCategory.severity], lang).toLowerCase()}`
                : `${pick(SEVERITY_LABEL[activeCategory.severity], lang).toLowerCase()} ${t.severityWord}`}
          </span>
        </div>

        {/* Evidence pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(alertActive
            ? t.pills
            : [
                (() => {
                  const hp = pick(activeCategory.historicalPattern, lang);
                  return hp.length > 60 ? hp.slice(0, 57) + "…" : hp;
                })(),
              ]
          ).map((pill) => (
            <span key={pill} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-foreground/80">
              {pill}
            </span>
          ))}
        </div>

        <div className="mt-2 rounded-xl border-l-2 border-accent/50 bg-surface px-4 py-3 text-xs leading-relaxed text-muted">
          <span className="font-semibold text-foreground">{t.recommendedAction} </span>
          {pick(activeCategory.recommendedAction, lang)}
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setEvidenceOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:opacity-90 hover:-translate-y-0.5"
          >
            {t.inspectEvidence}
          </button>
          <a
            href="#decision-record"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-accent/60 hover:text-accent"
          >
            {t.viewDecision}
          </a>
          <a
            href="#experiment-validation"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-accent/60 hover:text-accent"
          >
            {t.compareCohorts}
          </a>
        </div>
      </div>

      {/* Segment breakdown */}
      <div className="rounded-2xl border border-border bg-surface-2 p-5">
        <h4 className="font-display text-lg tracking-tight">{t.segmentTitle}</h4>
        <p className="mt-1 text-xs text-muted">{t.segmentSub}</p>
        <div className="mt-4 space-y-3">
          {SEGMENT_ROWS.map((r) => (
            <div key={r.segment.en} className="rounded-xl border border-border bg-surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-foreground">{pick(r.segment, lang)}</span>
                <SeverityBadge level={r.severity} lang={lang} />
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
              <p className="mt-2 text-xs text-muted">{pick(r.interpretation, lang)}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted">{t.segmentFootnote}</p>
      </div>

      {/* Evidence inspector drawer */}
      {evidenceOpen && (
        <EvidenceInspector onClose={() => setEvidenceOpen(false)} lang={lang} />
      )}
    </div>
  );
}

function EvidenceInspector({ onClose, lang }: { onClose: () => void; lang: Lang }) {
  const t = UI[lang];
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-background/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={t.evidenceTitle}
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-md overflow-y-auto border-l border-border bg-surface p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
          <div>
            <h4 className="font-display text-xl tracking-tight">{t.evidenceTitle}</h4>
            <p className="mt-1 text-xs text-muted">{t.evidenceSub}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeEvidence}
            className="rounded-full border border-border p-2 text-muted hover:border-accent/60 hover:text-accent"
          >
            <span aria-hidden="true" className="block h-4 w-4 leading-none">×</span>
          </button>
        </div>

        <div className="mt-3 rounded-xl bg-warn-soft px-3 py-2 text-[11px] font-semibold text-warn">
          {t.evidenceWarning}
        </div>

        <ul className="mt-4 space-y-3">
          {EVIDENCE_ITEMS.map((e, i) => (
            <li key={i} className="rounded-xl border border-border bg-surface-2 p-4">
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] text-muted">
                <span className="rounded-full bg-surface px-2 py-0.5 font-semibold text-foreground/80">{pick(e.channel, lang)}</span>
                <span>{e.week}</span>
                <span>· {e.platform}</span>
                <span>· {e.version}</span>
                <span>· {pick(e.language, lang)}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">&ldquo;{pick(e.paraphrase, lang)}&rdquo;</p>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-[11px]">
                <span className="text-muted">{pick(e.topic, lang)}</span>
                <span className="font-semibold tabular-nums text-accent">
                  {Math.round(e.confidence * 100)}% {t.confidence}
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
