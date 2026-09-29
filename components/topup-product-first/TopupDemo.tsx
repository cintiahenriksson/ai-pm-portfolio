"use client";
import React, { useMemo, useState } from "react";
import {
  PRODUCTS,
  OPERATORS,
  SCENARIOS,
  PRODUCT_TYPE_LABEL,
  fmtUsd,
  fmtCop,
  type Lang,
  type OperatorId,
  type ScenarioId,
  type TopupProduct,
  type DemoScenario,
} from "@/lib/topup-product-first-data";

type Flow = "A" | "B";
type OperatorFilter = "all" | OperatorId;
type Step = "a-number" | "a-browse" | "b-browse" | "b-verify" | "b-result" | "checkout";

const T = {
  en: {
    simLabel: "Simulation · no real purchase",
    flowLabel: "Flow",
    flowA: "A · Number first",
    flowB: "B · Product first",
    fixed: "United States · USD → Colombia",
    reset: "Reset demo",
    operator: "Operator",
    all: "All",
    // flow A
    aNumberTitle: "Enter the recipient's number to see eligible products",
    aNumberBody:
      "In the control flow the number comes first. The operator is identified from the number, then eligible products appear.",
    aBrowseTitle: "Eligible products for this number",
    aBrowseBody: "The operator was identified from the number, so prices and benefits below are already confirmed.",
    ctaShowProducts: "Show available products",
    // flow B
    bBrowseTitle: "Explore example top-ups by operator",
    bBrowseBody:
      "Enter the recipient's number to confirm the available products, exact benefits and final price before payment.",
    bVerifyTitle: "Check this offer for the recipient's number",
    bVerifyBody:
      "Pick a demo recipient token to simulate verification. No real number is sent or stored.",
    youPay: "You pay",
    illustrative: "illustrative until verified",
    recipientGets: "Recipient gets",
    airtimeSuffix: "airtime",
    validFor: "Valid for",
    days: "days",
    exampleStatus: "Example only — confirm for recipient number",
    ctaCheck: "Check for this number",
    chooseToken: "Choose a demo recipient token",
    verifiedBadge: "Verified only after number entry",
    confirmedTitle: "Confirmed for this number",
    notAvailableTitle: "This offer is not available for this number",
    changedTitle: "This offer changed after verification",
    hereAreOptions: "Here are the confirmed options.",
    detectedOperator: "Detected operator",
    verifiedPrice: "Verified price",
    verifiedBenefit: "Verified benefit",
    continue: "Continue to checkout",
    backToBrowse: "Back to browsing",
    checkoutTitle: "Simulated purchase complete",
    checkoutBody:
      "No real recharge, payment, supplier call or phone lookup occurred. This screen only demonstrates the end of the flow.",
    startOver: "Start over",
    select: "Select",
    phoneLabel: "Recipient's mobile number",
    phonePlaceholder: "300 000 0000",
    phoneHint: "For illustration only — no real number is sent or stored.",
  },
  es: {
    simLabel: "Simulación · sin compra real",
    flowLabel: "Flujo",
    flowA: "A · Número primero",
    flowB: "B · Producto primero",
    fixed: "Estados Unidos · USD → Colombia",
    reset: "Reiniciar demo",
    operator: "Operador",
    all: "Todos",
    aNumberTitle: "Introduce el número del destinatario para ver productos elegibles",
    aNumberBody:
      "En el flujo de control, el número va primero. El operador se identifica a partir del número y luego aparecen los productos elegibles.",
    aBrowseTitle: "Productos elegibles para este número",
    aBrowseBody: "El operador se identificó a partir del número, así que los precios y beneficios de abajo ya están confirmados.",
    ctaShowProducts: "Mostrar productos disponibles",
    bBrowseTitle: "Explora recargas de ejemplo por operador",
    bBrowseBody:
      "Introduce el número del destinatario para confirmar los productos disponibles, los beneficios exactos y el precio final antes de pagar.",
    bVerifyTitle: "Verifica esta oferta para el número del destinatario",
    bVerifyBody:
      "Elige un token de destinatario de demo para simular la verificación. No se envía ni se guarda ningún número real.",
    youPay: "Pagas",
    illustrative: "ilustrativo hasta verificar",
    recipientGets: "El destinatario recibe",
    airtimeSuffix: "de saldo",
    validFor: "Válido por",
    days: "días",
    exampleStatus: "Solo ejemplo — confirma para el número del destinatario",
    ctaCheck: "Verificar para este número",
    chooseToken: "Elige un token de destinatario de demo",
    verifiedBadge: "Verificado solo tras introducir el número",
    confirmedTitle: "Confirmado para este número",
    notAvailableTitle: "Esta oferta no está disponible para este número",
    changedTitle: "Esta oferta cambió tras la verificación",
    hereAreOptions: "Estas son las opciones confirmadas.",
    detectedOperator: "Operador detectado",
    verifiedPrice: "Precio verificado",
    verifiedBenefit: "Beneficio verificado",
    continue: "Continuar al pago",
    backToBrowse: "Volver a explorar",
    checkoutTitle: "Compra simulada completada",
    checkoutBody:
      "No ocurrió ninguna recarga, pago, llamada a proveedor ni consulta de número reales. Esta pantalla solo demuestra el final del flujo.",
    startOver: "Empezar de nuevo",
    select: "Seleccionar",
    phoneLabel: "Número de móvil del destinatario",
    phonePlaceholder: "300 000 0000",
    phoneHint: "Solo ilustrativo — no se envía ni se guarda ningún número real.",
  },
} as const;

function benefitLine(p: TopupProduct, lang: Lang): string {
  const t = T[lang];
  if (p.type === "airtime" && p.recipientCop != null) {
    return `${fmtCop(p.recipientCop)} ${t.airtimeSuffix}`;
  }
  if (p.type === "data") {
    return `${p.dataGb} GB · ${t.validFor} ${p.validityDays} ${t.days}`;
  }
  // combo
  return `${p.dataGb} GB + ${p.sms} SMS · ${t.validFor} ${p.validityDays} ${t.days}`;
}

export default function TopupDemo({ lang, embedded = false }: { lang: Lang; embedded?: boolean }) {
  const t = T[lang];
  const [flow, setFlow] = useState<Flow>("B");
  const [operatorFilter, setOperatorFilter] = useState<OperatorFilter>("all");
  const [step, setStep] = useState<Step>("b-browse");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scenarioId, setScenarioId] = useState<ScenarioId | null>(null);
  const [phone, setPhone] = useState("");

  const scenario: DemoScenario | null = useMemo(
    () => SCENARIOS.find((s) => s.id === scenarioId) ?? null,
    [scenarioId],
  );
  const selected = useMemo(
    () => PRODUCTS.find((p) => p.id === selectedId) ?? null,
    [selectedId],
  );

  function resetTo(nextFlow: Flow) {
    setFlow(nextFlow);
    setOperatorFilter("all");
    setSelectedId(null);
    setScenarioId(null);
    setStep(nextFlow === "A" ? "a-number" : "b-browse");
  }

  function fullReset() {
    resetTo(flow);
  }

  const browseList = useMemo(
    () => PRODUCTS.filter((p) => operatorFilter === "all" || p.operator === operatorFilter),
    [operatorFilter],
  );

  const opLabel = (id: OperatorId) => OPERATORS.find((o) => o.id === id)!.label[lang];

  /* --------------------------- sub-renderers --------------------------- */

  function TokenPicker({ onPick }: { onPick: (id: ScenarioId) => void }) {
    return (
      <fieldset className="space-y-3">
        <legend className="text-xs uppercase tracking-[0.14em] text-muted">{t.chooseToken}</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onPick(s.id)}
              className="rounded-2xl border border-border bg-surface p-4 text-left hover:border-accent/60 hover:-translate-y-0.5"
            >
              <span className="block text-sm font-semibold text-foreground">{s.label[lang]}</span>
              <span className="mt-1 block text-xs leading-relaxed text-muted">{s.note[lang]}</span>
            </button>
          ))}
        </div>
      </fieldset>
    );
  }

  function ProductCard({
    p,
    variant,
    onAction,
  }: {
    p: TopupProduct;
    variant: "illustrative" | "confirmed";
    onAction?: () => void;
  }) {
    const confirmed = variant === "confirmed";
    return (
      <div className="flex flex-col rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent">
            {PRODUCT_TYPE_LABEL[p.type][lang]}
          </span>
          <span className="text-[11px] uppercase tracking-[0.12em] text-muted">{opLabel(p.operator)}</span>
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-xs text-muted">{t.youPay}</p>
          <p className="font-display text-2xl tracking-tight text-foreground tabular-nums">{fmtUsd(p.payUsd)}</p>
          {!confirmed && <p className="text-[11px] text-warn">{t.illustrative}</p>}
        </div>

        <div className="mt-3 space-y-1 border-t border-border pt-3">
          <p className="text-xs text-muted">{t.recipientGets}</p>
          <p className="text-sm leading-relaxed text-foreground/90">{benefitLine(p, lang)}</p>
        </div>

        <div className="mt-4 flex-1" />

        {confirmed ? (
          <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-stable-soft px-2.5 py-0.5 text-[11px] font-semibold text-stable">
            {t.confirmedTitle}
          </span>
        ) : (
          <span className="mb-3 inline-flex w-fit items-center rounded-full bg-warn-soft px-2.5 py-0.5 text-[11px] font-medium text-warn">
            {t.exampleStatus}
          </span>
        )}

        {onAction && (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90"
          >
            {confirmed ? t.continue : t.select}
          </button>
        )}
      </div>
    );
  }

  function VerifiedFigures({ p, s }: { p: TopupProduct; s: DemoScenario }) {
    const price = s.changed?.payUsd ?? p.payUsd;
    const cop = s.changed?.recipientCop ?? p.recipientCop;
    const validity = s.changed?.validityDays ?? p.validityDays;
    return (
      <dl className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface-2 p-3">
          <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">{t.verifiedPrice}</dt>
          <dd className="mt-1 font-display text-lg tabular-nums text-foreground">{fmtUsd(price)}</dd>
        </div>
        <div className="rounded-xl border border-border bg-surface-2 p-3">
          <dt className="text-[11px] uppercase tracking-[0.12em] text-muted">{t.verifiedBenefit}</dt>
          <dd className="mt-1 text-sm text-foreground/90">
            {p.type === "airtime" && cop != null
              ? `${fmtCop(cop)} ${t.airtimeSuffix}`
              : benefitLine(validity != null ? { ...p, validityDays: validity } : p, lang)}
          </dd>
        </div>
      </dl>
    );
  }

  /* ------------------------------- steps ------------------------------- */

  function renderStep() {
    // Flow A — number first
    if (step === "a-number") {
      return (
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="font-display text-lg tracking-tight text-foreground">{t.aNumberTitle}</h4>
            <p className="text-sm leading-relaxed text-muted">{t.aNumberBody}</p>
          </div>
          <div className="space-y-2">
            <label htmlFor="topup-phone" className="block text-xs uppercase tracking-[0.14em] text-muted">
              {t.phoneLabel}
            </label>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-3 py-2.5 focus-within:border-accent/60">
              <span className="flex items-center gap-1.5 border-r border-border pr-3 text-sm font-medium text-foreground/80">
                +57
              </span>
              <input
                id="topup-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="off"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^\d\s]/g, "").slice(0, 12))}
                placeholder={t.phonePlaceholder}
                className="w-full bg-transparent text-sm text-foreground tabular-nums outline-none placeholder:text-muted/60"
              />
            </div>
            <p className="text-[11px] leading-relaxed text-muted">{t.phoneHint}</p>
          </div>
          <button
            type="button"
            onClick={() => setStep("a-browse")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90"
          >
            {t.ctaShowProducts}
          </button>
        </div>
      );
    }

    if (step === "a-browse") {
      const op: OperatorId = "A";
      const list = PRODUCTS.filter((p) => p.operator === op);
      return (
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-display text-lg tracking-tight text-foreground">{t.aBrowseTitle}</h4>
              <span className="inline-flex items-center rounded-full bg-stable-soft px-2.5 py-0.5 text-[11px] font-semibold text-stable">
                {t.detectedOperator}: {opLabel(op)}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted">{t.aBrowseBody}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.id} p={p} variant="confirmed" />
            ))}
          </div>
        </div>
      );
    }

    // Flow B — product first
    if (step === "b-browse") {
      return (
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="font-display text-lg tracking-tight text-foreground">{t.bBrowseTitle}</h4>
            <p className="text-sm leading-relaxed text-muted">{t.bBrowseBody}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {browseList.map((p) => (
              <ProductCard
                key={p.id}
                p={p}
                variant="illustrative"
                onAction={() => {
                  setSelectedId(p.id);
                  setScenarioId(null);
                  setStep("b-verify");
                }}
              />
            ))}
          </div>
        </div>
      );
    }

    if (step === "b-verify" && selected) {
      return (
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="font-display text-lg tracking-tight text-foreground">{t.bVerifyTitle}</h4>
            <p className="text-sm leading-relaxed text-muted">{t.bVerifyBody}</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface-2 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-foreground">
                {PRODUCT_TYPE_LABEL[selected.type][lang]} · {opLabel(selected.operator)}
              </span>
              <span className="font-display text-lg tabular-nums text-foreground">{fmtUsd(selected.payUsd)}</span>
            </div>
            <p className="mt-1 text-xs text-warn">{t.illustrative}</p>
          </div>
          <TokenPicker
            onPick={(id) => {
              setScenarioId(id);
              setStep("b-result");
            }}
          />
          <button
            type="button"
            onClick={() => setStep("b-browse")}
            className="text-sm font-medium text-muted hover:text-foreground"
          >
            {t.backToBrowse}
          </button>
        </div>
      );
    }

    if (step === "b-result" && selected && scenario) {
      const outcome = scenario.outcome;

      if (outcome === "match") {
        return (
          <div className="space-y-4">
            <div className="rounded-2xl border border-stable/40 bg-stable-soft/50 p-5">
              <span className="inline-flex items-center rounded-full bg-stable-soft px-2.5 py-0.5 text-[11px] font-semibold text-stable">
                {t.confirmedTitle}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">{scenario.note[lang]}</p>
              <div className="mt-4">
                <VerifiedFigures p={selected} s={scenario} />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setStep("checkout")}
                className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90"
              >
                {t.continue}
              </button>
              <button
                type="button"
                onClick={() => setStep("b-browse")}
                className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground hover:border-accent/60"
              >
                {t.backToBrowse}
              </button>
            </div>
          </div>
        );
      }

      if (outcome === "changed") {
        return (
          <div className="space-y-4">
            <div className="rounded-2xl border border-warn/40 bg-warn-soft/50 p-5">
              <span className="inline-flex items-center rounded-full bg-warn-soft px-2.5 py-0.5 text-[11px] font-semibold text-warn">
                {t.changedTitle}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">{scenario.note[lang]}</p>
              <div className="mt-4">
                <VerifiedFigures p={selected} s={scenario} />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setStep("checkout")}
                className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90"
              >
                {t.continue}
              </button>
              <button
                type="button"
                onClick={() => setStep("b-browse")}
                className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground hover:border-accent/60"
              >
                {t.backToBrowse}
              </button>
            </div>
          </div>
        );
      }

      // operator_mismatch or unavailable → show confirmed alternatives
      const op = outcome === "operator_mismatch" ? scenario.detectedOperator : selected.operator;
      const alternatives = PRODUCTS.filter((p) => p.operator === op && p.id !== selected.id);
      return (
        <div className="space-y-4">
          <div className="rounded-2xl border border-risk/40 bg-risk-soft/50 p-5">
            <span className="inline-flex items-center rounded-full bg-risk-soft px-2.5 py-0.5 text-[11px] font-semibold text-risk">
              {t.notAvailableTitle}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-foreground/85">{scenario.note[lang]}</p>
            {outcome === "operator_mismatch" && (
              <p className="mt-2 text-xs font-medium text-foreground/70">
                {t.detectedOperator}: {opLabel(op)}
              </p>
            )}
          </div>
          <p className="text-sm font-semibold text-foreground">{t.hereAreOptions}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {alternatives.map((p) => (
              <ProductCard
                key={p.id}
                p={p}
                variant="confirmed"
                onAction={() => {
                  setSelectedId(p.id);
                  setStep("checkout");
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep("b-browse")}
            className="text-sm font-medium text-muted hover:text-foreground"
          >
            {t.backToBrowse}
          </button>
        </div>
      );
    }

    if (step === "checkout" && selected) {
      return (
        <div className="space-y-5 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stable-soft text-stable">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="font-display text-xl tracking-tight text-foreground">{t.checkoutTitle}</h4>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-muted">{t.checkoutBody}</p>
          </div>
          <div className="mx-auto max-w-sm rounded-2xl border border-border bg-surface-2 p-4 text-left">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-foreground">
                {PRODUCT_TYPE_LABEL[selected.type][lang]} · {opLabel(selected.operator)}
              </span>
              <span className="font-display text-lg tabular-nums text-foreground">{fmtUsd(selected.payUsd)}</span>
            </div>
            <p className="mt-1 text-sm text-muted">
              {t.recipientGets}: {benefitLine(selected, lang)}
            </p>
          </div>
          <button
            type="button"
            onClick={fullReset}
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground hover:border-accent/60"
          >
            {t.startOver}
          </button>
        </div>
      );
    }

    return null;
  }

  return (
    <div
      className={`overflow-hidden rounded-3xl border border-border bg-surface-2 ${
        embedded ? "" : "shadow-[0_24px_60px_-32px_rgba(75,69,212,0.35)]"
      }`}
    >
      {/* Toolbar */}
      <div className="flex flex-col gap-4 border-b border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div
            role="tablist"
            aria-label={t.flowLabel}
            className="inline-flex rounded-full border border-border bg-surface-2 p-1"
          >
            <button
              role="tab"
              aria-selected={flow === "A"}
              onClick={() => resetTo("A")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                flow === "A" ? "bg-accent text-accent-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {t.flowA}
            </button>
            <button
              role="tab"
              aria-selected={flow === "B"}
              onClick={() => resetTo("B")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                flow === "B" ? "bg-accent text-accent-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {t.flowB}
            </button>
          </div>
          <span className="text-xs font-medium text-muted">{t.fixed}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-warn/40 bg-warn-soft px-2.5 py-1 text-[11px] font-semibold text-warn">
            <span className="h-1.5 w-1.5 rounded-full bg-warn" aria-hidden="true" />
            {t.simLabel}
          </span>
          <button
            type="button"
            onClick={fullReset}
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground hover:border-accent/60"
          >
            {t.reset}
          </button>
        </div>
      </div>

      {/* Operator filter — only while browsing in flow B */}
      {step === "b-browse" && (
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface px-5 py-3">
          <span className="text-[11px] uppercase tracking-[0.14em] text-muted">{t.operator}</span>
          {(["all", "A", "B"] as OperatorFilter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setOperatorFilter(f)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                operatorFilter === f
                  ? "bg-accent text-accent-foreground"
                  : "border border-border bg-surface-2 text-muted hover:text-foreground"
              }`}
            >
              {f === "all" ? t.all : opLabel(f)}
            </button>
          ))}
        </div>
      )}

      <div className="p-5 sm:p-6">{renderStep()}</div>
    </div>
  );
}
