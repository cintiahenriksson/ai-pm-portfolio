"use client";
import React, { useId, useState } from "react";

/**
 * Accessible, dependency-free tooltip for metrics and unfamiliar terms.
 * Shows on hover and focus, dismissible with Escape.
 */
export default function InfoTip({ term, children }: { term: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        aria-label={`Definition of ${term}`}
        aria-describedby={open ? id : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-border bg-surface-2 text-[10px] font-semibold leading-none text-muted hover:border-accent/60 hover:text-accent"
      >
        i
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-30 mb-2 w-64 -translate-x-1/2 rounded-xl border border-border bg-surface p-3 text-left text-xs leading-relaxed text-foreground/85 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.4)]"
        >
          <span className="mb-0.5 block font-semibold text-foreground">{term}</span>
          {children}
        </span>
      )}
    </span>
  );
}
