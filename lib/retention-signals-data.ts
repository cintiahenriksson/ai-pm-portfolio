/**
 * Retention Signals — local, typed, fully simulated data model.
 *
 * ETHICS / DATA BOUNDARY
 * ----------------------
 * Every value below is fictional and generated for a portfolio demonstration.
 * It does NOT use, mention, or recreate confidential data from any real
 * company. Qualitative categories are informed by public app-review patterns;
 * event-level telemetry, releases, experiments, and segments are simulated to
 * illustrate a product-management decision workflow.
 */

export type Lang = "en" | "es";
/** A string that exists in both supported languages. */
export type Loc = { en: string; es: string };
/** Resolve a localized string for the active language. */
export const pick = (l: Loc, lang: Lang): string => (lang === "es" ? l.es : l.en);

export type Severity = "high" | "medium" | "low";
export type StatusKind = "risk" | "warn" | "info" | "stable";

export const SEVERITY_LABEL: Record<Severity, Loc> = {
  high: { en: "High", es: "Alta" },
  medium: { en: "Medium", es: "Media" },
  low: { en: "Low", es: "Baja" },
};

export type CategoryId =
  | "unexpected-charges"
  | "call-failures"
  | "delayed-transfers"
  | "pending-refunds"
  | "bonus-not-applied"
  | "loss-of-value";

export type DateRange = "12w" | "6m" | "12m";
export type Platform = "all" | "android" | "ios" | "web";
export type FeedbackSource = "all" | "support" | "reviews" | "billing";
export type Market = "all" | "sweden" | "uk" | "us" | "philippines" | "nigeria";
export type Language = "all" | "english" | "spanish" | "portuguese" | "arabic";
export type AppVersion = "all" | "7.13.2" | "7.14.0" | "7.14.1";

export interface Filters {
  range: DateRange;
  platform: Platform;
  source: FeedbackSource;
  market: Market;
  language: Language;
  version: AppVersion;
}

export const DEFAULT_FILTERS: Filters = {
  range: "12w",
  platform: "all",
  source: "all",
  market: "all",
  language: "all",
  version: "all",
};

export interface Category {
  id: CategoryId;
  label: Loc;
  status: StatusKind;
  /** Signal counts, one per observation point (aligned to the 12w axis). */
  counts: number[];
  /** Latest share of total negative feedback, as a percentage. */
  latestPct: number;
  /** Latest multiplier vs. the 8-week baseline (e.g. 2.4 = +140%). */
  baselineMultiplier: number;
  severity: Severity;
  historicalPattern: Loc;
  recommendedAction: Loc;
  insight: Loc;
}

/** Per-observation total negative feedback (denominator for percentages). */
export const WEEKLY_TOTALS = [430, 445, 420, 455, 440, 460, 448, 452, 465, 470, 458, 462];

/** X-axis labels per date range, localized. */
const AXIS_LABELS_BY_LANG: Record<Lang, Record<DateRange, string[]>> = {
  en: {
    "12w": ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
    "6m": ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    "12m": ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  },
  es: {
    "12w": ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12"],
    "6m": ["Mar", "Abr", "May", "Jun", "Jul", "Ago"],
    "12m": ["Sep", "Oct", "Nov", "Dic", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago"],
  },
};

/** Resolve x-axis labels for a range in the active language. */
export function getAxisLabels(range: DateRange, lang: Lang): string[] {
  return AXIS_LABELS_BY_LANG[lang][range];
}

/**
 * Release annotation — only meaningful on the weekly (12w) axis, where the
 * unexpected-charge signal begins to climb the week the flow shipped.
 */
export const RELEASE_MARKER = {
  index: 6, // between W6 and W7 → drawn at the start of W7
  label: {
    en: "Subscription-flow update released · version 7.14.0",
    es: "Actualización del flujo de suscripción lanzada · versión 7.14.0",
  } as Loc,
};

export const CATEGORIES: Category[] = [
  {
    id: "unexpected-charges",
    label: { en: "Unexpected auto-top-up charges", es: "Cargos inesperados de recarga automática" },
    status: "risk",
    counts: [12, 13, 11, 13, 12, 13, 18, 23, 27, 29, 30, 31],
    latestPct: 6.7,
    baselineMultiplier: 2.4,
    severity: "high",
    historicalPattern: {
      en: "Flat at ~2.8% of negative feedback for eight weeks, then a sustained climb starting the week version 7.14.0 shipped.",
      es: "Estable en ~2.8% de los comentarios negativos durante ocho semanas, y luego un aumento sostenido a partir de la semana en que se lanzó la versión 7.14.0.",
    },
    recommendedAction: {
      en: "Escalate as a trust-risk alert: pause the rollout for affected Android segments and validate with internal telemetry before drawing conclusions.",
      es: "Escalar como alerta de riesgo de confianza: pausar el despliegue para los segmentos de Android afectados y validar con telemetría interna antes de sacar conclusiones.",
    },
    insight: {
      en: "A financial-control signal that rose 2.4× above its baseline within 24h of a release. Severity outranks its absolute volume.",
      es: "Una señal de control financiero que subió 2.4× por encima de su línea base dentro de las 24h de un lanzamiento. La severidad pesa más que su volumen absoluto.",
    },
  },
  {
    id: "call-failures",
    label: { en: "Technical call failures", es: "Fallos técnicos de llamadas" },
    status: "info",
    counts: [88, 90, 85, 92, 86, 90, 89, 91, 88, 90, 87, 89],
    latestPct: 19.3,
    baselineMultiplier: 1.0,
    severity: "medium",
    historicalPattern: {
      en: "The largest single category by volume, but broadly stable week over week with no release-linked spike.",
      es: "La categoría más grande por volumen, pero en general estable semana a semana, sin un pico vinculado a un lanzamiento.",
    },
    recommendedAction: {
      en: "Monitor and route to Engineering reliability review; high volume without a critical spike reads as a discovery opportunity, not an incident.",
      es: "Monitorear y derivar a la revisión de fiabilidad de Ingeniería; un volumen alto sin un pico crítico se interpreta como una oportunidad de descubrimiento, no como un incidente.",
    },
    insight: {
      en: "High volume, low volatility. A candidate for roadmap investment rather than urgent containment.",
      es: "Alto volumen, baja volatilidad. Un candidato para inversión en el roadmap en lugar de contención urgente.",
    },
  },
  {
    id: "delayed-transfers",
    label: { en: "Delayed transfers", es: "Transferencias retrasadas" },
    status: "warn",
    counts: [60, 64, 61, 65, 62, 66, 63, 64, 66, 67, 65, 66],
    latestPct: 14.3,
    baselineMultiplier: 1.1,
    severity: "medium",
    historicalPattern: {
      en: "Persistent and seasonal; small rises tend to track corridor and payout-partner conditions rather than app releases.",
      es: "Persistente y estacional; las pequeñas subidas tienden a seguir las condiciones del corredor y del socio de pagos, más que los lanzamientos de la app.",
    },
    recommendedAction: {
      en: "Investigate as a recurring reliability theme; correlate with payout-partner status before prioritizing.",
      es: "Investigar como un tema recurrente de fiabilidad; correlacionar con el estado del socio de pagos antes de priorizar.",
    },
    insight: {
      en: "A durable pain point worth a discovery track, but no evidence of a release-linked trust event.",
      es: "Un punto de dolor duradero que merece una línea de descubrimiento, pero sin evidencia de un evento de confianza vinculado a un lanzamiento.",
    },
  },
  {
    id: "pending-refunds",
    label: { en: "Pending refunds", es: "Reembolsos pendientes" },
    status: "warn",
    counts: [40, 42, 39, 43, 41, 44, 40, 42, 43, 44, 42, 43],
    latestPct: 9.3,
    baselineMultiplier: 1.1,
    severity: "medium",
    historicalPattern: {
      en: "Stable with a mild upward drift; partially entangled with the unexpected-charge topic as refund requests follow charges.",
      es: "Estable con una leve tendencia al alza; parcialmente ligado al tema de los cargos inesperados, ya que las solicitudes de reembolso siguen a los cargos.",
    },
    recommendedAction: {
      en: "Investigate alongside the unexpected-charge alert; treat as a secondary corroborating signal, not an independent incident.",
      es: "Investigar junto con la alerta de cargos inesperados; tratar como una señal corroborativa secundaria, no como un incidente independiente.",
    },
    insight: {
      en: "Moves with the charge topic. Useful as corroboration rather than a standalone driver.",
      es: "Se mueve con el tema de los cargos. Útil como corroboración, no como un factor independiente.",
    },
  },
  {
    id: "bonus-not-applied",
    label: { en: "Promotional bonus not applied", es: "Bono promocional no aplicado" },
    status: "stable",
    counts: [27, 28, 26, 29, 27, 29, 28, 29, 28, 30, 29, 30],
    latestPct: 6.5,
    baselineMultiplier: 1.0,
    severity: "low",
    historicalPattern: {
      en: "Low and stable; spikes historically align with specific promotional campaigns, none active in this window.",
      es: "Bajo y estable; los picos históricamente coinciden con campañas promocionales específicas, ninguna activa en esta ventana.",
    },
    recommendedAction: {
      en: "Monitor only; collect more evidence before any roadmap action.",
      es: "Solo monitorear; recopilar más evidencia antes de cualquier acción en el roadmap.",
    },
    insight: {
      en: "Low-severity, low-volatility. No action beyond continued monitoring.",
      es: "Baja severidad, baja volatilidad. Sin acción más allá del monitoreo continuo.",
    },
  },
  {
    id: "loss-of-value",
    label: { en: "Loss of value / lack of use", es: "Pérdida de valor / falta de uso" },
    status: "stable",
    counts: [48, 50, 47, 51, 49, 52, 50, 51, 52, 53, 51, 52],
    latestPct: 11.3,
    baselineMultiplier: 1.0,
    severity: "low",
    historicalPattern: {
      en: "Steady background churn sentiment typical of subscription products; no release-linked movement.",
      es: "Sentimiento de fuga de fondo constante, típico de los productos por suscripción; sin movimiento vinculado a lanzamientos.",
    },
    recommendedAction: {
      en: "Monitor; feed into lifecycle and engagement roadmap discussions rather than incident response.",
      es: "Monitorear; incorporar a las discusiones de roadmap de ciclo de vida y engagement, en lugar de respuesta a incidentes.",
    },
    insight: {
      en: "A slow, structural signal better addressed through engagement work than containment.",
      es: "Una señal lenta y estructural, mejor abordada mediante trabajo de engagement que mediante contención.",
    },
  },
];

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}

export interface SegmentRow {
  segment: Loc;
  share: number; // % of affected feedback
  changeVsBaseline: string; // e.g. "+220%"
  severity: Severity;
  interpretation: Loc;
}

export const SEGMENT_ROWS: SegmentRow[] = [
  {
    segment: { en: "Android · 7.14.0 · English", es: "Android · 7.14.0 · Inglés" },
    share: 42,
    changeVsBaseline: "+220%",
    severity: "high",
    interpretation: {
      en: "Likely linked to updated subscription flow",
      es: "Probablemente vinculado al flujo de suscripción actualizado",
    },
  },
  {
    segment: { en: "Android · 7.14.0 · Spanish", es: "Android · 7.14.0 · Español" },
    share: 25,
    changeVsBaseline: "+170%",
    severity: "high",
    interpretation: {
      en: "Validate localized consent copy",
      es: "Validar el texto de consentimiento localizado",
    },
  },
  {
    segment: { en: "iOS · 7.13.2 · English", es: "iOS · 7.13.2 · Inglés" },
    share: 8,
    changeVsBaseline: "+12%",
    severity: "low",
    interpretation: { en: "No equivalent increase", es: "Sin aumento equivalente" },
  },
  {
    segment: { en: "Android · 7.13.2 · Portuguese", es: "Android · 7.13.2 · Portugués" },
    share: 7,
    changeVsBaseline: "+4%",
    severity: "low",
    interpretation: { en: "Stable comparison group", es: "Grupo de comparación estable" },
  },
];

export interface EvidenceItem {
  channel: Loc;
  week: string;
  platform: string;
  version: string;
  language: Loc;
  topic: Loc;
  confidence: number;
  paraphrase: Loc;
}

/** Fictional paraphrased feedback — never verbatim, never from a real person. */
const TOPIC_CHARGES: Loc = {
  en: "Unexpected auto-top-up charges",
  es: "Cargos inesperados de recarga automática",
};

export const EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    channel: { en: "App review", es: "Reseña de app" },
    week: "W9",
    platform: "Android",
    version: "7.14.0",
    language: { en: "English", es: "Inglés" },
    topic: TOPIC_CHARGES,
    confidence: 0.92,
    paraphrase: {
      en: "Didn't realize auto-top-up was switched on after subscribing; noticed a charge a few days later.",
      es: "No me di cuenta de que la recarga automática quedó activada tras suscribirme; vi un cargo unos días después.",
    },
  },
  {
    channel: { en: "Support ticket", es: "Ticket de soporte" },
    week: "W8",
    platform: "Android",
    version: "7.14.0",
    language: { en: "Spanish", es: "Español" },
    topic: TOPIC_CHARGES,
    confidence: 0.88,
    paraphrase: {
      en: "Could not find where to turn off automatic top-ups anywhere in the app.",
      es: "No pude encontrar en ninguna parte de la app dónde desactivar las recargas automáticas.",
    },
  },
  {
    channel: { en: "Billing contact", es: "Contacto de facturación" },
    week: "W10",
    platform: "Android",
    version: "7.14.0",
    language: { en: "English", es: "Inglés" },
    topic: TOPIC_CHARGES,
    confidence: 0.9,
    paraphrase: {
      en: "Saw a top-up charge right after finishing the subscription setup.",
      es: "Vi un cargo de recarga justo después de terminar la configuración de la suscripción.",
    },
  },
  {
    channel: { en: "App review", es: "Reseña de app" },
    week: "W9",
    platform: "Android",
    version: "7.14.0",
    language: { en: "Spanish", es: "Español" },
    topic: TOPIC_CHARGES,
    confidence: 0.85,
    paraphrase: {
      en: "The confirmation screen wording was unclear about recurring charges.",
      es: "El texto de la pantalla de confirmación no era claro sobre los cargos recurrentes.",
    },
  },
  {
    channel: { en: "Support ticket", es: "Ticket de soporte" },
    week: "W11",
    platform: "Android",
    version: "7.14.0",
    language: { en: "English", es: "Inglés" },
    topic: TOPIC_CHARGES,
    confidence: 0.87,
    paraphrase: {
      en: "Asked for a refund on a top-up I never meant to enable.",
      es: "Pedí un reembolso por una recarga que nunca quise activar.",
    },
  },
  {
    channel: { en: "App review", es: "Reseña de app" },
    week: "W7",
    platform: "iOS",
    version: "7.13.2",
    language: { en: "English", es: "Inglés" },
    topic: TOPIC_CHARGES,
    confidence: 0.71,
    paraphrase: {
      en: "Expected a one-time top-up but seemed to end up on a recurring one.",
      es: "Esperaba una recarga única, pero parece que terminé en una recurrente.",
    },
  },
];

export interface ExperimentRow {
  metric: Loc;
  variantA: string;
  variantB: string;
  difference: string;
  interpretation: Loc;
}

export const EXPERIMENT_ROWS: ExperimentRow[] = [
  {
    metric: {
      en: "Auto-top-up disable rate (7-day)",
      es: "Tasa de desactivación de recarga automática (7 días)",
    },
    variantA: "4.6%",
    variantB: "8.1%",
    difference: "+3.5pp",
    interpretation: {
      en: "Potential loss of trust; investigate and consider stopping rollout",
      es: "Posible pérdida de confianza; investigar y considerar detener el despliegue",
    },
  },
  {
    metric: { en: "Refund-request rate", es: "Tasa de solicitudes de reembolso" },
    variantA: "1.6%",
    variantB: "3.4%",
    difference: "+1.8pp",
    interpretation: {
      en: "Secondary corroborating signal",
      es: "Señal corroborativa secundaria",
    },
  },
  {
    metric: {
      en: "Unexpected-charge support contacts",
      es: "Contactos de soporte por cargos inesperados",
    },
    variantA: "2.1%",
    variantB: "5.3%",
    difference: "+3.2pp",
    interpretation: {
      en: "Consistent with the feedback trend",
      es: "Consistente con la tendencia de los comentarios",
    },
  },
];

/**
 * Filter intensity model (simulated).
 *
 * Each filter contributes a multiplier to the unexpected-charge signal so the
 * dashboard reacts coherently: the scenario concentrates on Android + 7.14.0 +
 * recent weeks, and dampens elsewhere ("no equivalent increase").
 */
export function signalIntensity(f: Filters, category: CategoryId): number {
  // Only the trust-risk scenario is release/segment sensitive.
  if (category !== "unexpected-charges") return 1;

  let m = 1;
  if (f.platform === "android") m *= 1.15;
  else if (f.platform === "ios") m *= 0.2;
  else if (f.platform === "web") m *= 0.35;

  if (f.version === "7.14.0") m *= 1.2;
  else if (f.version === "7.14.1") m *= 0.9;
  else if (f.version === "7.13.2") m *= 0.18;

  if (f.language === "english") m *= 1.1;
  else if (f.language === "spanish") m *= 1.0;
  else if (f.language === "portuguese" || f.language === "arabic") m *= 0.5;

  if (f.source === "billing") m *= 1.15;
  else if (f.source === "reviews") m *= 1.05;

  // Markets with the largest Android concentration in this scenario.
  if (f.market === "us" || f.market === "uk") m *= 1.05;
  else if (f.market === "philippines" || f.market === "nigeria") m *= 0.85;

  return m;
}

export interface GlossaryEntry {
  term: Loc;
  def: Loc;
}

/** A tooltip glossary for metrics and unfamiliar terms. */
export const GLOSSARY: Record<string, GlossaryEntry> = {
  "trust-risk alert": {
    term: { en: "trust-risk alert", es: "alerta de riesgo de confianza" },
    def: {
      en: "A pattern that touches money or consent and is corroborated by more than one signal. It triggers containment and investigation, not a root-cause conclusion.",
      es: "Un patrón que afecta al dinero o al consentimiento y está corroborado por más de una señal. Activa contención e investigación, no una conclusión de causa raíz.",
    },
  },
  baseline: {
    term: { en: "baseline", es: "línea base" },
    def: {
      en: "The average rate over the preceding 8 weeks, used as the reference point for detecting change.",
      es: "La tasa promedio de las 8 semanas anteriores, usada como punto de referencia para detectar cambios.",
    },
  },
  pp: {
    term: { en: "pp", es: "pp" },
    def: {
      en: "Percentage points — the absolute difference between two percentages (e.g. 8.1% vs 4.6% = +3.5pp).",
      es: "Puntos porcentuales — la diferencia absoluta entre dos porcentajes (p. ej. 8.1% vs 4.6% = +3.5pp).",
    },
  },
  "classification agreement": {
    term: { en: "classification agreement", es: "concordancia de clasificación" },
    def: {
      en: "The share of a manually reviewed sample where a human reviewer agreed with the model's topic label.",
      es: "La proporción de una muestra revisada manualmente en la que un revisor humano estuvo de acuerdo con la etiqueta de tema del modelo.",
    },
  },
  guardrail: {
    term: { en: "guardrail", es: "métrica de protección" },
    def: {
      en: "A metric an experiment must not worsen. Here, the 7-day auto-top-up disable rate guards against silently eroding trust.",
      es: "Una métrica que un experimento no debe empeorar. Aquí, la tasa de desactivación de recarga automática a 7 días protege contra la erosión silenciosa de la confianza.",
    },
  },
  cohort: {
    term: { en: "cohort", es: "cohorte" },
    def: {
      en: "A group of users defined by a shared exposure — in this case, whether they saw the previous or updated subscription flow.",
      es: "Un grupo de usuarios definido por una exposición compartida — en este caso, si vieron el flujo de suscripción anterior o el actualizado.",
    },
  },
};
