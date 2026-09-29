"use client";
import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TopupDemo from "@/components/topup-product-first/TopupDemo";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  en: {
    eyebrow: "Case Study 05 · Interactive demo",
    title: "Product-first top-up — A / B prototype",
    body:
      "Toggle between the number-first control (A) and the product-first treatment (B). In Flow B, browse illustrative offers, then pick a demo recipient token to drive the verification state: offer matches, different operator, expired / no match, or price / benefit changed. No real lookup, payment, or personal data is involved.",
    badge: "Simulation · no real purchase",
    back: "← Back to Case Study 05",
    scenarios: "Try each demo recipient token to see how the treatment handles matches and mismatches.",
  },
  es: {
    eyebrow: "Caso 05 · Demo interactiva",
    title: "Recarga producto-primero — prototipo A / B",
    body:
      "Alterna entre el control número-primero (A) y el tratamiento producto-primero (B). En el Flujo B, explora ofertas ilustrativas y luego elige un token de destinatario de demo para dirigir el estado de verificación: la oferta coincide, operador distinto, expirada / sin coincidencia, o cambió el precio / beneficio. No hay consulta real, pago ni datos personales.",
    badge: "Simulación · sin compra real",
    back: "← Volver al Caso 05",
    scenarios: "Prueba cada token de destinatario de demo para ver cómo el tratamiento maneja coincidencias y discrepancias.",
  },
} as const;

export default function TopupDemoPage() {
  const { lang } = useLanguage();
  const t = content[lang] || content.en;

  return (
    <>
      <SiteHeader variant="inner" />

      <main className="text-foreground">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-16 space-y-8">
          <div className="animate-rise space-y-4">
            <Link
              href="/cases/topup-product-first"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground"
            >
              {t.back}
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-accent">
                {t.eyebrow}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-warn/40 bg-warn-soft px-3 py-1 text-[11px] font-semibold text-warn">
                <span className="h-1.5 w-1.5 rounded-full bg-warn" aria-hidden="true" />
                {t.badge}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.05] text-balance">
              {t.title}
            </h1>
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted text-pretty">{t.body}</p>
            <p className="max-w-3xl text-sm leading-relaxed text-foreground/80">{t.scenarios}</p>
          </div>

          <TopupDemo lang={lang} embedded />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
