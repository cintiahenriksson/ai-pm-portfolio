"use client";
import React, { useState } from "react";

const FIELDS: { label: string; value: string }[] = [
  {
    label: "Trigger",
    value:
      "Unexpected-charge feedback rose 2.4× above its historical baseline after the release.",
  },
  {
    label: "Corroboration",
    value:
      "Simulated telemetry shows increased auto-top-up disabling and refund requests among exposed users.",
  },
  {
    label: "Risk",
    value:
      "High financial-trust risk, even if the absolute number of affected users is limited.",
  },
  {
    label: "Immediate action",
    value:
      "Halt rollout; audit consent events, default states, billing execution, confirmation copy, and localization.",
  },
  {
    label: "Customer action",
    value:
      "Identify potentially affected users and route remediation through supervised support and billing processes.",
  },
  {
    label: "Product follow-up",
    value:
      "Redesign the auto-top-up set-up and management experience around explicit control and clear pre-charge information.",
  },
  {
    label: "What we are not concluding",
    value:
      "Feedback and experiment signals do not alone prove that charges were invalid or that the flow caused every cancellation.",
  },
  { label: "Owner", value: "Product + Billing + Support + Engineering" },
  { label: "Review date", value: "One week after containment" },
];

export default function DecisionRecord() {
  const [reviewed, setReviewed] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-border bg-surface-2 p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <span className="inline-flex items-center rounded-full bg-risk-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-risk">
            Decision
          </span>
          <h3 className="font-display text-xl sm:text-2xl tracking-tight text-balance">
            Pause further rollout of the updated subscription flow for affected Android segments.
          </h3>
        </div>
      </div>

      <dl className="divide-y divide-border">
        {FIELDS.map((f) => (
          <div key={f.label} className="grid gap-1 p-5 sm:grid-cols-[200px_1fr] sm:gap-6">
            <dt className="text-xs uppercase tracking-[0.12em] text-muted">{f.label}</dt>
            <dd className="text-sm leading-relaxed text-foreground/85">{f.value}</dd>
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
          {reviewed ? "Reviewed" : "Mark as reviewed"}
          <span aria-hidden="true">{reviewed ? "✓" : "→"}</span>
        </button>
        <span
          className="text-xs text-muted"
          aria-live="polite"
        >
          {reviewed
            ? "Reviewed by Product Ops · today"
            : "Awaiting review sign-off"}
        </span>
      </div>
    </div>
  );
}
