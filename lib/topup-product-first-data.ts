/**
 * Synthetic, portfolio-only data for Case Study 05 — "Show the value before the number".
 *
 * Everything in this file is illustrative and fabricated. No real operators,
 * prices, exchange rates, promotions, supplier feeds, or A/B results are used.
 * The final lookup and checkout in a real product would replace this data.
 */

export type Lang = "en" | "es";
export type Bi = { en: string; es: string };

/* ------------------------------------------------------------------ */
/* Products — illustrative catalogue snapshot for one corridor         */
/* (United States sender / Colombia recipient)                         */
/* ------------------------------------------------------------------ */

export type ProductType = "airtime" | "data" | "combo";
export type OperatorId = "A" | "B";

export interface TopupProduct {
  id: string;
  operator: OperatorId;
  type: ProductType;
  payUsd: number;
  /** Airtime only — recipient balance in COP. Never shown for data/combo. */
  recipientCop?: number;
  dataGb?: number;
  sms?: number;
  validityDays?: number;
}

export const OPERATORS: { id: OperatorId; label: Bi }[] = [
  { id: "A", label: { en: "Operator A", es: "Operador A" } },
  { id: "B", label: { en: "Operator B", es: "Operador B" } },
];

export const PRODUCTS: TopupProduct[] = [
  { id: "a-air-5", operator: "A", type: "airtime", payUsd: 5, recipientCop: 19000 },
  { id: "a-data-8", operator: "A", type: "data", payUsd: 8, dataGb: 3, validityDays: 15 },
  { id: "a-combo-12", operator: "A", type: "combo", payUsd: 12, dataGb: 5, sms: 200, validityDays: 30 },
  { id: "b-air-10", operator: "B", type: "airtime", payUsd: 10, recipientCop: 39000 },
  { id: "b-data-7", operator: "B", type: "data", payUsd: 7, dataGb: 2, validityDays: 10 },
  { id: "b-combo-15", operator: "B", type: "combo", payUsd: 15, dataGb: 8, sms: 300, validityDays: 30 },
];

export const PRODUCT_TYPE_LABEL: Record<ProductType, Bi> = {
  airtime: { en: "Airtime balance", es: "Saldo de recarga" },
  data: { en: "Data bundle", es: "Paquete de datos" },
  combo: { en: "Data + SMS combo", es: "Combo datos + SMS" },
};

/* ------------------------------------------------------------------ */
/* Verification scenarios — deterministic demo tokens                  */
/* ------------------------------------------------------------------ */

export type ScenarioId = "match" | "operator" | "expired" | "changed";
export type VerificationOutcome = "match" | "operator_mismatch" | "unavailable" | "changed";

export interface DemoScenario {
  id: ScenarioId;
  label: Bi;
  short: Bi;
  /** Operator the number actually belongs to, once verified. */
  detectedOperator: OperatorId;
  outcome: VerificationOutcome;
  note: Bi;
  /** For the "changed" outcome: the verified figures after checking. */
  changed?: {
    payUsd: number;
    recipientCop?: number;
    dataGb?: number;
    validityDays?: number;
  };
}

export const SCENARIOS: DemoScenario[] = [
  {
    id: "match",
    label: { en: "Scenario 1 — offer matches", es: "Escenario 1 — la oferta coincide" },
    short: { en: "Offer matches", es: "La oferta coincide" },
    detectedOperator: "A",
    outcome: "match",
    note: {
      en: "The recipient's number belongs to the same operator and the illustrative offer is confirmed unchanged.",
      es: "El número del destinatario pertenece al mismo operador y la oferta ilustrativa se confirma sin cambios.",
    },
  },
  {
    id: "operator",
    label: { en: "Scenario 2 — different operator", es: "Escenario 2 — operador distinto" },
    short: { en: "Different operator", es: "Operador distinto" },
    detectedOperator: "B",
    outcome: "operator_mismatch",
    note: {
      en: "The number belongs to a different operator than the example. We never silently substitute — we show the confirmed options for the real operator.",
      es: "El número pertenece a un operador distinto al del ejemplo. Nunca sustituimos en silencio: mostramos las opciones confirmadas del operador real.",
    },
  },
  {
    id: "expired",
    label: { en: "Scenario 3 — offer expired / no match", es: "Escenario 3 — oferta expirada / sin coincidencia" },
    short: { en: "Expired / no match", es: "Expirada / sin coincidencia" },
    detectedOperator: "A",
    outcome: "unavailable",
    note: {
      en: "The illustrative offer is no longer available for this number. We explain the change and return the confirmed alternatives.",
      es: "La oferta ilustrativa ya no está disponible para este número. Explicamos el cambio y devolvemos las alternativas confirmadas.",
    },
  },
  {
    id: "changed",
    label: { en: "Scenario 4 — price or benefit changed", es: "Escenario 4 — cambió el precio o el beneficio" },
    short: { en: "Price / benefit changed", es: "Cambió precio / beneficio" },
    detectedOperator: "A",
    outcome: "changed",
    note: {
      en: "The offer exists but its verified price or benefit differs from the example. We show the verified figures before any payment.",
      es: "La oferta existe pero su precio o beneficio verificado difiere del ejemplo. Mostramos las cifras verificadas antes de cualquier pago.",
    },
    changed: { payUsd: 6, recipientCop: 17500, validityDays: 12 },
  },
];

/* ------------------------------------------------------------------ */
/* Sample-size planning example — fixed illustrative assumptions        */
/* ------------------------------------------------------------------ */

export const SAMPLE_SIZE = {
  baseline: 0.05,
  target: 0.06,
  absolute: 0.01,
  relative: 0.2,
  alpha: 0.05,
  power: 0.8,
  perVariant: 8143,
  total: 16285,
  sensitivityTarget: 0.055,
  sensitivityPerVariant: 31217,
} as const;

/* ------------------------------------------------------------------ */
/* Cost register — what scaling would cost                             */
/* ------------------------------------------------------------------ */

export const COST_REGISTER: {
  oneOff: { title: Bi; items: Bi[] };
  ongoing: { title: Bi; items: Bi[] };
} = {
  oneOff: {
    title: { en: "One-off build", es: "Construcción inicial" },
    items: [
      { en: "Product discovery and design.", es: "Discovery de producto y diseño." },
      { en: "Engineering integration with supplier product feeds.", es: "Integración de ingeniería con los feeds de producto del proveedor." },
      { en: "Operator and product mapping.", es: "Mapeo de operadores y productos." },
      { en: "Number-based eligibility verification.", es: "Verificación de elegibilidad basada en el número." },
      { en: "Price and benefit confirmation before payment.", es: "Confirmación de precio y beneficio antes del pago." },
      { en: "Experimentation and analytics instrumentation.", es: "Instrumentación de experimentación y analítica." },
      { en: "QA across destinations, operators, product types, currencies and failure states.", es: "QA en destinos, operadores, tipos de producto, monedas y estados de fallo." },
    ],
  },
  ongoing: {
    title: { en: "Ongoing operation", es: "Operación continua" },
    items: [
      { en: "Catalogue updates and offer expiry handling.", es: "Actualizaciones de catálogo y gestión de caducidad de ofertas." },
      { en: "Price, benefit and validity monitoring.", es: "Monitoreo de precio, beneficio y validez." },
      { en: "Promotion eligibility and localization.", es: "Elegibilidad de promociones y localización." },
      { en: "Supplier changes and incidents.", es: "Cambios e incidentes del proveedor." },
      { en: "Customer support caused by offer mismatch.", es: "Soporte al cliente causado por discrepancias de oferta." },
      { en: "Maintenance, monitoring and compliance review.", es: "Mantenimiento, monitoreo y revisión de cumplimiento." },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Investment calculator presets                                       */
/* ------------------------------------------------------------------ */

export interface CalcInputs {
  /** Eligible annual traffic for the tested corridor. */
  traffic: number;
  /** Conversion lift in percentage points (B minus A). */
  liftPp: number;
  /** Contribution margin per incremental purchase, USD. */
  margin: number;
  /** One-off build cost, USD. */
  buildCost: number;
  /** Annual operating cost, USD. */
  annualOpCost: number;
}

export const CALC_PRESETS: Record<"conservative" | "base" | "optimistic", CalcInputs> = {
  conservative: { traffic: 60000, liftPp: 0.8, margin: 2, buildCost: 28000, annualOpCost: 8000 },
  base: { traffic: 100000, liftPp: 1, margin: 3, buildCost: 20000, annualOpCost: 5000 },
  optimistic: { traffic: 160000, liftPp: 1.5, margin: 4, buildCost: 16000, annualOpCost: 3500 },
};

export interface CalcResult {
  incrementalPurchases: number;
  incrementalContribution: number;
  netAfterOpCost: number;
  hasOperatingBreakEven: boolean;
  paybackMonths: number | null;
}

export function computeInvestment(inputs: CalcInputs): CalcResult {
  const incrementalPurchases = Math.round((inputs.traffic * inputs.liftPp) / 100);
  const incrementalContribution = incrementalPurchases * inputs.margin;
  const netAfterOpCost = incrementalContribution - inputs.annualOpCost;
  const hasOperatingBreakEven = netAfterOpCost > 0;
  const paybackMonths = hasOperatingBreakEven ? (inputs.buildCost / netAfterOpCost) * 12 : null;
  return {
    incrementalPurchases,
    incrementalContribution,
    netAfterOpCost,
    hasOperatingBreakEven,
    paybackMonths,
  };
}

/* ------------------------------------------------------------------ */
/* "What would you decide?" branches                                   */
/* ------------------------------------------------------------------ */

export type BranchTone = "stable" | "warn" | "risk";

export interface DecisionBranch {
  id: "positive" | "negative" | "harmful";
  tone: BranchTone;
  title: Bi;
  condition: Bi;
  decision: Bi;
}

export const DECISION_BRANCHES: DecisionBranch[] = [
  {
    id: "positive",
    tone: "stable",
    title: { en: "Positive — and economics hold", es: "Positivo — y la economía se sostiene" },
    condition: {
      en: "Purchases improve enough, mismatch stays below the agreed threshold, and a conservative contribution-margin forecast covers build and operating costs within the agreed payback period.",
      es: "Las compras mejoran lo suficiente, la discrepancia se mantiene por debajo del umbral acordado y una proyección conservadora de margen de contribución cubre los costos de construcción y operación dentro del periodo de recuperación acordado.",
    },
    decision: {
      en: "Commission a phased technical discovery, supplier data audit and cost estimate for the tested corridor. Verify cost assumptions before broader rollout — do not claim production rollout is already warranted.",
      es: "Encargar un discovery técnico por fases, una auditoría de datos del proveedor y una estimación de costos para el corredor probado. Verificar los supuestos de costo antes de un despliegue más amplio; no afirmar que el despliegue a producción ya está justificado.",
    },
  },
  {
    id: "negative",
    tone: "warn",
    title: { en: "Negative — clicks up, purchases flat", es: "Negativo — más clics, compras planas" },
    condition: {
      en: "Interest and offer clicks increase but completed purchases do not, or modeled contribution does not cover build and operating costs.",
      es: "El interés y los clics en ofertas aumentan pero las compras completadas no, o la contribución modelada no cubre los costos de construcción y operación.",
    },
    decision: {
      en: "Do not invest in the global catalogue. Diagnose verification abandonment and operator mismatch, and test a cheaper way to communicate recipient value — such as example values beside the phone input.",
      es: "No invertir en el catálogo global. Diagnosticar el abandono en la verificación y la discrepancia de operador, y probar una forma más barata de comunicar el valor para el destinatario, como ejemplos junto al campo del número.",
    },
  },
  {
    id: "harmful",
    tone: "risk",
    title: { en: "Harmful / mixed — trust breached", es: "Perjudicial / mixto — confianza vulnerada" },
    condition: {
      en: "Purchases appear to improve but offer-mismatch or misleading price/benefit exceeds the guardrail.",
      es: "Las compras parecen mejorar pero la discrepancia de oferta o el precio/beneficio engañoso supera el guardarraíl.",
    },
    decision: {
      en: "Stop or narrow the treatment. Fix offer reliability and wording, then retest. Business lift does not justify inaccurate presentation — trust is not something the revenue lift can buy.",
      es: "Detener o acotar el tratamiento. Corregir la fiabilidad y el texto de las ofertas y volver a probar. El aumento de negocio no justifica una presentación inexacta: la confianza no se compra con el incremento de ingresos.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Formatting helpers                                                  */
/* ------------------------------------------------------------------ */

export function fmtUsd(n: number): string {
  return `USD ${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

export function fmtCop(n: number): string {
  return `COP ${n.toLocaleString("en-US")}`;
}

export function fmtInt(n: number): string {
  return n.toLocaleString("en-US");
}
