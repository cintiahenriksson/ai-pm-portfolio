"use client";
import React, { useMemo, useState } from "react";
import {
  CALC_PRESETS,
  computeInvestment,
  fmtUsd,
  fmtInt,
  type CalcInputs,
  type Lang,
} from "@/lib/topup-product-first-data";

type PresetKey = "conservative" | "base" | "optimistic";

const T = {
  en: {
    illustrative: "Illustrative scenario — not actual company economics",
    presets: { conservative: "Conservative", base: "Base", optimistic: "Optimistic" },
    traffic: "Eligible annual traffic (tested corridor)",
    lift: "Conversion lift (percentage points)",
    margin: "Contribution margin per incremental purchase",
    buildCost: "One-off build cost",
    opCost: "Annual operating cost",
    resultsTitle: "Projected outcome",
    incrementalPurchases: "Additional purchases / year",
    incrementalContribution: "Incremental contribution margin / year",
    netAfterOp: "Net of annual operating cost",
    payback: "Estimated payback",
    months: "months",
    noBreakEven: "No operating break-even at current assumptions",
    noBreakEvenBody:
      "Projected annual contribution does not exceed annual operating cost, so the build never pays back under these inputs.",
    ref12: "12-month reference",
    ref24: "24-month reference",
    within: "within",
    beyond: "beyond",
    reset: "Reset to preset",
    marginNote: "Margin is net revenue attributable to top-up purchases minus the directly attributable variable costs.",
  },
  es: {
    illustrative: "Escenario ilustrativo — no es la economía real de la empresa",
    presets: { conservative: "Conservador", base: "Base", optimistic: "Optimista" },
    traffic: "Tráfico elegible anual (corredor probado)",
    lift: "Mejora de conversión (puntos porcentuales)",
    margin: "Margen de contribución por compra incremental",
    buildCost: "Costo de construcción único",
    opCost: "Costo operativo anual",
    resultsTitle: "Resultado proyectado",
    incrementalPurchases: "Compras adicionales / año",
    incrementalContribution: "Margen de contribución incremental / año",
    netAfterOp: "Neto tras el costo operativo anual",
    payback: "Recuperación estimada",
    months: "meses",
    noBreakEven: "Sin punto de equilibrio operativo con los supuestos actuales",
    noBreakEvenBody:
      "La contribución anual proyectada no supera el costo operativo anual, por lo que la construcción nunca se recupera con estos valores.",
    ref12: "Referencia de 12 meses",
    ref24: "Referencia de 24 meses",
    within: "dentro de",
    beyond: "más allá de",
    reset: "Restablecer al preset",
    marginNote: "El margen es el ingreso neto atribuible a las recargas menos los costos variables directamente atribuibles.",
  },
} as const;

function Field({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-medium text-muted">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2">
        {prefix && <span className="text-xs text-muted">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent text-sm tabular-nums text-foreground outline-none"
        />
        {suffix && <span className="text-xs text-muted">{suffix}</span>}
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="w-full"
      />
    </label>
  );
}

export default function InvestmentCalculator({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [preset, setPreset] = useState<PresetKey>("base");
  const [inputs, setInputs] = useState<CalcInputs>(CALC_PRESETS.base);

  const result = useMemo(() => computeInvestment(inputs), [inputs]);

  function applyPreset(key: PresetKey) {
    setPreset(key);
    setInputs(CALC_PRESETS[key]);
  }

  function update(patch: Partial<CalcInputs>) {
    setInputs((prev) => ({ ...prev, ...patch }));
  }

  const payback = result.paybackMonths;

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface-2 p-4">
        <div
          role="tablist"
          aria-label="Scenario"
          className="inline-flex rounded-full border border-border bg-surface p-1"
        >
          {(["conservative", "base", "optimistic"] as PresetKey[]).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={preset === k}
              onClick={() => applyPreset(k)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${
                preset === k ? "bg-accent text-accent-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {t.presets[k]}
            </button>
          ))}
        </div>
        <span className="inline-flex items-center rounded-full border border-warn/40 bg-warn-soft px-2.5 py-1 text-[11px] font-semibold text-warn">
          {t.illustrative}
        </span>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          <Field
            label={t.traffic}
            value={inputs.traffic}
            onChange={(n) => update({ traffic: n })}
            min={10000}
            max={500000}
            step={5000}
          />
          <Field
            label={t.lift}
            value={inputs.liftPp}
            onChange={(n) => update({ liftPp: n })}
            min={0.1}
            max={5}
            step={0.1}
            suffix="pp"
          />
          <Field
            label={t.margin}
            value={inputs.margin}
            onChange={(n) => update({ margin: n })}
            min={0.5}
            max={20}
            step={0.5}
            prefix="USD"
          />
          <Field
            label={t.buildCost}
            value={inputs.buildCost}
            onChange={(n) => update({ buildCost: n })}
            min={5000}
            max={200000}
            step={1000}
            prefix="USD"
          />
          <Field
            label={t.opCost}
            value={inputs.annualOpCost}
            onChange={(n) => update({ annualOpCost: n })}
            min={1000}
            max={100000}
            step={500}
            prefix="USD"
          />
          <p className="text-xs leading-relaxed text-muted">{t.marginNote}</p>
        </div>

        {/* Results */}
        <div className="space-y-4 rounded-2xl border border-border bg-surface-2 p-5">
          <h4 className="font-display text-lg tracking-tight text-foreground">{t.resultsTitle}</h4>

          <dl className="space-y-3">
            <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
              <dt className="text-sm text-muted">{t.incrementalPurchases}</dt>
              <dd className="font-display text-lg tabular-nums text-foreground">
                {fmtInt(result.incrementalPurchases)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
              <dt className="text-sm text-muted">{t.incrementalContribution}</dt>
              <dd className="font-display text-lg tabular-nums text-foreground">
                {fmtUsd(result.incrementalContribution)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
              <dt className="text-sm text-muted">{t.netAfterOp}</dt>
              <dd
                className={`font-display text-lg tabular-nums ${
                  result.netAfterOpCost > 0 ? "text-stable" : "text-risk"
                }`}
              >
                {fmtUsd(result.netAfterOpCost)}
              </dd>
            </div>
          </dl>

          {result.hasOperatingBreakEven && payback != null ? (
            <div className="rounded-2xl border border-stable/40 bg-stable-soft/50 p-4">
              <p className="text-xs uppercase tracking-[0.12em] text-muted">{t.payback}</p>
              <p className="mt-1 font-display text-2xl tabular-nums text-stable">
                {payback.toFixed(1)} {t.months}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                <span
                  className={`rounded-full px-2.5 py-0.5 font-semibold ${
                    payback <= 12 ? "bg-stable-soft text-stable" : "bg-warn-soft text-warn"
                  }`}
                >
                  {t.ref12}: {payback <= 12 ? t.within : t.beyond}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 font-semibold ${
                    payback <= 24 ? "bg-stable-soft text-stable" : "bg-risk-soft text-risk"
                  }`}
                >
                  {t.ref24}: {payback <= 24 ? t.within : t.beyond}
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-risk/40 bg-risk-soft/50 p-4">
              <p className="font-display text-base tracking-tight text-risk">{t.noBreakEven}</p>
              <p className="mt-1 text-xs leading-relaxed text-foreground/75">{t.noBreakEvenBody}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
