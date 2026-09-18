"use client";
import React, { useState } from "react";
import { pick, type Lang, type Loc } from "@/lib/retention-signals-data";

const FIELDS: { label: Loc; value: Loc }[] = [
  {
    label: { en: "Trigger", es: "Disparador" },
    value: {
      en: "Unexpected-charge feedback rose 2.4× above its historical baseline after the release.",
      es: "Los comentarios sobre cargos inesperados subieron 2.4× por encima de su línea base histórica tras el lanzamiento.",
    },
  },
  {
    label: { en: "Corroboration", es: "Corroboración" },
    value: {
      en: "Simulated telemetry shows increased auto-top-up disabling and refund requests among exposed users.",
      es: "La telemetría simulada muestra un aumento de la desactivación de recargas automáticas y de las solicitudes de reembolso entre los usuarios expuestos.",
    },
  },
  {
    label: { en: "Risk", es: "Riesgo" },
    value: {
      en: "High financial-trust risk, even if the absolute number of affected users is limited.",
      es: "Alto riesgo de confianza financiera, aunque el número absoluto de usuarios afectados sea limitado.",
    },
  },
  {
    label: { en: "Immediate action", es: "Acción inmediata" },
    value: {
      en: "Halt rollout; audit consent events, default states, billing execution, confirmation copy, and localization.",
      es: "Detener el despliegue; auditar los eventos de consentimiento, los estados por defecto, la ejecución de la facturación, el texto de confirmación y la localización.",
    },
  },
  {
    label: { en: "Customer action", es: "Acción con clientes" },
    value: {
      en: "Identify potentially affected users and route remediation through supervised support and billing processes.",
      es: "Identificar a los usuarios potencialmente afectados y canalizar la remediación mediante procesos supervisados de soporte y facturación.",
    },
  },
  {
    label: { en: "Product follow-up", es: "Seguimiento de producto" },
    value: {
      en: "Redesign the auto-top-up set-up and management experience around explicit control and clear pre-charge information.",
      es: "Rediseñar la experiencia de configuración y gestión de la recarga automática en torno al control explícito y a una información clara antes del cargo.",
    },
  },
  {
    label: { en: "What we are not concluding", es: "Lo que no estamos concluyendo" },
    value: {
      en: "Feedback and experiment signals do not alone prove that charges were invalid or that the flow caused every cancellation.",
      es: "Los comentarios y las señales del experimento no prueban por sí solos que los cargos fueran inválidos ni que el flujo causara cada cancelación.",
    },
  },
  {
    label: { en: "Owner", es: "Responsable" },
    value: {
      en: "Product + Billing + Support + Engineering",
      es: "Producto + Facturación + Soporte + Ingeniería",
    },
  },
  {
    label: { en: "Review date", es: "Fecha de revisión" },
    value: { en: "One week after containment", es: "Una semana después de la contención" },
  },
];

const COPY: Record<Lang, {
  badge: string;
  heading: string;
  markReviewed: string;
  reviewed: string;
  reviewedBy: string;
  awaiting: string;
}> = {
  en: {
    badge: "Decision",
    heading: "Pause further rollout of the updated subscription flow for affected Android segments.",
    markReviewed: "Mark as reviewed",
    reviewed: "Reviewed",
    reviewedBy: "Reviewed by Product Ops · today",
    awaiting: "Awaiting review sign-off",
  },
  es: {
    badge: "Decisión",
    heading: "Pausar el resto del despliegue del flujo de suscripción actualizado para los segmentos de Android afectados.",
    markReviewed: "Marcar como revisado",
    reviewed: "Revisado",
    reviewedBy: "Revisado por Product Ops · hoy",
    awaiting: "A la espera de la aprobación de la revisión",
  },
};

export default function DecisionRecord({ lang = "en" }: { lang?: Lang }) {
  const [reviewed, setReviewed] = useState(false);
  const t = COPY[lang];

  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-border bg-surface-2 p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <span className="inline-flex items-center rounded-full bg-risk-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-risk">
            {t.badge}
          </span>
          <h3 className="font-display text-xl sm:text-2xl tracking-tight text-balance">
            {t.heading}
          </h3>
        </div>
      </div>

      <dl className="divide-y divide-border">
        {FIELDS.map((f) => (
          <div key={f.label.en} className="grid gap-1 p-5 sm:grid-cols-[200px_1fr] sm:gap-6">
            <dt className="text-xs uppercase tracking-[0.12em] text-muted">{pick(f.label, lang)}</dt>
            <dd className="text-sm leading-relaxed text-foreground/85">{pick(f.value, lang)}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setReviewed((r) => !r)}
          aria-pressed={reviewed}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${
            reviewed
              ? "border border-stable/40 bg-stable-soft text-stable"
              : "bg-accent text-accent-foreground hover:opacity-90 hover:-translate-y-0.5"
          }`}
        >
          {reviewed ? t.reviewed : t.markReviewed}
          <span aria-hidden="true">{reviewed ? "✓" : "→"}</span>
        </button>
        <span
          className="text-xs text-muted"
          aria-live="polite"
        >
          {reviewed ? t.reviewedBy : t.awaiting}
        </span>
      </div>
    </div>
  );
}
