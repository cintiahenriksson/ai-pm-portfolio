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

export type Severity = "high" | "medium" | "low";
export type StatusKind = "risk" | "warn" | "info" | "stable";

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
  label: string;
  status: StatusKind;
  /** Signal counts, one per observation point (aligned to the 12w axis). */
  counts: number[];
  /** Latest share of total negative feedback, as a percentage. */
  latestPct: number;
  /** Latest multiplier vs. the 8-week baseline (e.g. 2.4 = +140%). */
  baselineMultiplier: number;
  severity: Severity;
  historicalPattern: string;
  recommendedAction: string;
  insight: string;
}

/** Per-observation total negative feedback (denominator for percentages). */
export const WEEKLY_TOTALS = [430, 445, 420, 455, 440, 460, 448, 452, 465, 470, 458, 462];

/** X-axis labels per date range. */
export const AXIS_LABELS: Record<DateRange, string[]> = {
  "12w": ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
  "6m": ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  "12m": ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
};

/**
 * Release annotation — only meaningful on the weekly (12w) axis, where the
 * unexpected-charge signal begins to climb the week the flow shipped.
 */
export const RELEASE_MARKER = {
  index: 6, // between W6 and W7 → drawn at the start of W7
  label: "Subscription-flow update released · version 7.14.0",
};

export const CATEGORIES: Category[] = [
  {
    id: "unexpected-charges",
    label: "Unexpected auto-top-up charges",
    status: "risk",
    counts: [12, 13, 11, 13, 12, 13, 18, 23, 27, 29, 30, 31],
    latestPct: 6.7,
    baselineMultiplier: 2.4,
    severity: "high",
    historicalPattern:
      "Flat at ~2.8% of negative feedback for eight weeks, then a sustained climb starting the week version 7.14.0 shipped.",
    recommendedAction:
      "Escalate as a trust-risk alert: pause the rollout for affected Android segments and validate with internal telemetry before drawing conclusions.",
    insight:
      "A financial-control signal that rose 2.4× above its baseline within 24h of a release. Severity outranks its absolute volume.",
  },
  {
    id: "call-failures",
    label: "Technical call failures",
    status: "info",
    counts: [88, 90, 85, 92, 86, 90, 89, 91, 88, 90, 87, 89],
    latestPct: 19.3,
    baselineMultiplier: 1.0,
    severity: "medium",
    historicalPattern:
      "The largest single category by volume, but broadly stable week over week with no release-linked spike.",
    recommendedAction:
      "Monitor and route to Engineering reliability review; high volume without a critical spike reads as a discovery opportunity, not an incident.",
    insight:
      "High volume, low volatility. A candidate for roadmap investment rather than urgent containment.",
  },
  {
    id: "delayed-transfers",
    label: "Delayed transfers",
    status: "warn",
    counts: [60, 64, 61, 65, 62, 66, 63, 64, 66, 67, 65, 66],
    latestPct: 14.3,
    baselineMultiplier: 1.1,
    severity: "medium",
    historicalPattern:
      "Persistent and seasonal; small rises tend to track corridor and payout-partner conditions rather than app releases.",
    recommendedAction:
      "Investigate as a recurring reliability theme; correlate with payout-partner status before prioritizing.",
    insight:
      "A durable pain point worth a discovery track, but no evidence of a release-linked trust event.",
  },
  {
    id: "pending-refunds",
    label: "Pending refunds",
    status: "warn",
    counts: [40, 42, 39, 43, 41, 44, 40, 42, 43, 44, 42, 43],
    latestPct: 9.3,
    baselineMultiplier: 1.1,
    severity: "medium",
    historicalPattern:
      "Stable with a mild upward drift; partially entangled with the unexpected-charge topic as refund requests follow charges.",
    recommendedAction:
      "Investigate alongside the unexpected-charge alert; treat as a secondary corroborating signal, not an independent incident.",
    insight:
      "Moves with the charge topic. Useful as corroboration rather than a standalone driver.",
  },
  {
    id: "bonus-not-applied",
    label: "Promotional bonus not applied",
    status: "stable",
    counts: [27, 28, 26, 29, 27, 29, 28, 29, 28, 30, 29, 30],
    latestPct: 6.5,
    baselineMultiplier: 1.0,
    severity: "low",
    historicalPattern:
      "Low and stable; spikes historically align with specific promotional campaigns, none active in this window.",
    recommendedAction:
      "Monitor only; collect more evidence before any roadmap action.",
    insight:
      "Low-severity, low-volatility. No action beyond continued monitoring.",
  },
  {
    id: "loss-of-value",
    label: "Loss of value / lack of use",
    status: "stable",
    counts: [48, 50, 47, 51, 49, 52, 50, 51, 52, 53, 51, 52],
    latestPct: 11.3,
    baselineMultiplier: 1.0,
    severity: "low",
    historicalPattern:
      "Steady background churn sentiment typical of subscription products; no release-linked movement.",
    recommendedAction:
      "Monitor; feed into lifecycle and engagement roadmap discussions rather than incident response.",
    insight:
      "A slow, structural signal better addressed through engagement work than containment.",
  },
];

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}

export interface SegmentRow {
  segment: string;
  share: number; // % of affected feedback
  changeVsBaseline: string; // e.g. "+220%"
  severity: Severity;
  interpretation: string;
}

export const SEGMENT_ROWS: SegmentRow[] = [
  {
    segment: "Android · 7.14.0 · English",
    share: 42,
    changeVsBaseline: "+220%",
    severity: "high",
    interpretation: "Likely linked to updated subscription flow",
  },
  {
    segment: "Android · 7.14.0 · Spanish",
    share: 25,
    changeVsBaseline: "+170%",
    severity: "high",
    interpretation: "Validate localized consent copy",
  },
  {
    segment: "iOS · 7.13.2 · English",
    share: 8,
    changeVsBaseline: "+12%",
    severity: "low",
    interpretation: "No equivalent increase",
  },
  {
    segment: "Android · 7.13.2 · Portuguese",
    share: 7,
    changeVsBaseline: "+4%",
    severity: "low",
    interpretation: "Stable comparison group",
  },
];

export interface EvidenceItem {
  channel: string;
  week: string;
  platform: string;
  version: string;
  language: string;
  topic: string;
  confidence: number;
  paraphrase: string;
}

/** Fictional paraphrased feedback — never verbatim, never from a real person. */
export const EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    channel: "App review",
    week: "W9",
    platform: "Android",
    version: "7.14.0",
    language: "English",
    topic: "Unexpected auto-top-up charges",
    confidence: 0.92,
    paraphrase:
      "Didn't realize auto-top-up was switched on after subscribing; noticed a charge a few days later.",
  },
  {
    channel: "Support ticket",
    week: "W8",
    platform: "Android",
    version: "7.14.0",
    language: "Spanish",
    topic: "Unexpected auto-top-up charges",
    confidence: 0.88,
    paraphrase: "Could not find where to turn off automatic top-ups anywhere in the app.",
  },
  {
    channel: "Billing contact",
    week: "W10",
    platform: "Android",
    version: "7.14.0",
    language: "English",
    topic: "Unexpected auto-top-up charges",
    confidence: 0.9,
    paraphrase: "Saw a top-up charge right after finishing the subscription setup.",
  },
  {
    channel: "App review",
    week: "W9",
    platform: "Android",
    version: "7.14.0",
    language: "Spanish",
    topic: "Unexpected auto-top-up charges",
    confidence: 0.85,
    paraphrase: "The confirmation screen wording was unclear about recurring charges.",
  },
  {
    channel: "Support ticket",
    week: "W11",
    platform: "Android",
    version: "7.14.0",
    language: "English",
    topic: "Unexpected auto-top-up charges",
    confidence: 0.87,
    paraphrase: "Asked for a refund on a top-up I never meant to enable.",
  },
  {
    channel: "App review",
    week: "W7",
    platform: "iOS",
    version: "7.13.2",
    language: "English",
    topic: "Unexpected auto-top-up charges",
    confidence: 0.71,
    paraphrase: "Expected a one-time top-up but seemed to end up on a recurring one.",
  },
];

export interface ExperimentRow {
  metric: string;
  variantA: string;
  variantB: string;
  difference: string;
  interpretation: string;
}

export const EXPERIMENT_ROWS: ExperimentRow[] = [
  {
    metric: "Auto-top-up disable rate (7-day)",
    variantA: "4.6%",
    variantB: "8.1%",
    difference: "+3.5pp",
    interpretation: "Potential loss of trust; investigate and consider stopping rollout",
  },
  {
    metric: "Refund-request rate",
    variantA: "1.6%",
    variantB: "3.4%",
    difference: "+1.8pp",
    interpretation: "Secondary corroborating signal",
  },
  {
    metric: "Unexpected-charge support contacts",
    variantA: "2.1%",
    variantB: "5.3%",
    difference: "+3.2pp",
    interpretation: "Consistent with the feedback trend",
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

/** A tooltip glossary for metrics and unfamiliar terms. */
export const GLOSSARY: Record<string, string> = {
  "trust-risk alert":
    "A pattern that touches money or consent and is corroborated by more than one signal. It triggers containment and investigation, not a root-cause conclusion.",
  baseline:
    "The average rate over the preceding 8 weeks, used as the reference point for detecting change.",
  pp: "Percentage points — the absolute difference between two percentages (e.g. 8.1% vs 4.6% = +3.5pp).",
  "classification agreement":
    "The share of a manually reviewed sample where a human reviewer agreed with the model's topic label.",
  guardrail:
    "A metric an experiment must not worsen. Here, the 7-day auto-top-up disable rate guards against silently eroding trust.",
  cohort:
    "A group of users defined by a shared exposure — in this case, whether they saw the previous or updated subscription flow.",
};
