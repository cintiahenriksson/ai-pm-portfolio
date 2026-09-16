"use client";
import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function Home() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 font-sans space-y-20 text-foreground">
      {/* Barra de Navegación Superior */}
      <nav className="flex items-center justify-between border-b border-border pb-5">
        <span className="font-mono text-sm font-semibold text-foreground tracking-tight">
          Cintia Henriksson
        </span>
        <div className="flex items-center gap-3 sm:gap-5 text-xs font-mono">
          <a href="#casos" className="text-muted hover:text-foreground transition-colors">
            {t.nav.cases}
          </a>
          <Link
            href="/about"
            className="px-3 py-1.5 rounded-lg bg-surface border border-border text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/50 transition-colors"
          >
            {t.nav.about}
          </Link>
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </nav>

      {/* 1. Hero & Posicionamiento */}
      <section className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-muted shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          {t.hero.badge}
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-base text-muted leading-relaxed">
          {t.hero.subtitle}
        </p>
      </section>

      {/* 2. Cobertura del Scorecard */}
      <section className="space-y-6">
        <div className="flex justify-between items-baseline border-b border-border pb-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-muted">
            {t.scorecard.title}
          </h2>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
            {t.scorecard.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          {t.scorecard.items.map((item, index) => (
            <div key={index} className="p-4 rounded-xl bg-surface border border-border shadow-sm">
              <span className="text-muted block text-[10px] mb-1 font-bold">{item.label}</span>
              <span className="text-foreground font-semibold block text-sm">{item.title}</span>
              <span className="text-emerald-600 dark:text-emerald-400 block mt-2 text-[11px]">
                {item.metric}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Casos de Estudio Detallados */}
      <section id="casos" className="space-y-8 scroll-mt-10">
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted border-b border-border pb-3">
          {t.casesSectionTitle}
        </h2>

        <div className="space-y-8">
          {/* Tarjeta Caso 1 */}
          <Link
            href="/cases/remesas-discovery"
            className="group block p-8 rounded-2xl bg-surface border border-border hover:border-emerald-500/40 hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                {t.cases.case1.tag}
              </span>
              <span className="text-xs font-mono text-muted">{t.cases.case1.sub}</span>
            </div>
            
            <h3 className="text-2xl font-medium text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {t.cases.case1.title}
            </h3>

            <div className="space-y-3 text-sm text-foreground/90 leading-relaxed font-sans">
              <p>{t.cases.case1.p1}</p>
              <p className="text-xs text-muted bg-background/80 p-3.5 rounded-lg border border-border leading-relaxed">
                <strong className="text-foreground">{t.cases.case1.privacyLabel} </strong>
                {t.cases.case1.privacyText}
              </p>
              <p>
                <strong>{t.cases.case1.whyLabel} </strong>
                {t.cases.case1.whyText}
              </p>
              <p className="text-xs text-muted">
                <strong>{t.cases.case1.bgLabel} </strong>
                {t.cases.case1.bgText}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end text-xs font-mono text-muted group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {t.cases.case1.cta}
            </div>
          </Link>

          {/* Tarjeta Caso 2 */}
          <Link
            href="/cases/agente-pagos"
            className="group block p-8 rounded-2xl bg-surface border border-border hover:border-emerald-500/40 hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                {t.cases.case2.tag}
              </span>
              <span className="text-xs font-mono text-muted">{t.cases.case2.sub}</span>
            </div>

            <h3 className="text-2xl font-medium text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {t.cases.case2.title}
            </h3>

            <div className="space-y-3 text-sm text-foreground/90 leading-relaxed font-sans">
              <p>{t.cases.case2.p1}</p>
              <p className="text-xs text-muted bg-background/80 p-3.5 rounded-lg border border-border leading-relaxed">
                <strong className="text-foreground">{t.cases.case2.privacyLabel} </strong>
                {t.cases.case2.privacyText}
              </p>
              <p>
                <strong>{t.cases.case2.whyLabel} </strong>
                {t.cases.case2.whyText}
              </p>
              <p className="text-xs text-muted">
                <strong>{t.cases.case2.bgLabel} </strong>
                {t.cases.case2.bgText}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end text-xs font-mono text-muted group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {t.cases.case2.cta}
            </div>
          </Link>

          {/* Tarjeta Caso 3 */}
          <Link
            href="/cases/alumnas-roadmap"
            className="group block p-8 rounded-2xl bg-surface border border-border hover:border-emerald-500/40 hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                {t.cases.case3.tag}
              </span>
              <span className="text-xs font-mono text-muted">{t.cases.case3.sub}</span>
            </div>

            <h3 className="text-2xl font-medium text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {t.cases.case3.title}
            </h3>

            <div className="space-y-3 text-sm text-foreground/90 leading-relaxed font-sans">
              <p>{t.cases.case3.p1}</p>
              <p className="text-xs text-muted bg-background/80 p-3.5 rounded-lg border border-border leading-relaxed">
                <strong className="text-foreground">{t.cases.case3.privacyLabel} </strong>
                {t.cases.case3.privacyText}
              </p>
              <p>
                <strong>{t.cases.case3.whyLabel} </strong>
                {t.cases.case3.whyText}
              </p>
              <p className="text-xs text-muted">
                <strong>{t.cases.case3.bgLabel} </strong>
                {t.cases.case3.bgText}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end text-xs font-mono text-muted group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {t.cases.case3.cta}
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Sección Sobre Mí & Acceso a la Bio */}
      <section className="p-8 rounded-2xl bg-surface border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-background border border-border flex-shrink-0">
            <img
              src="/profile.jpg"
              alt="Cintia Henriksson"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-background border border-border text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
              {t.aboutTeaser.badge}
            </div>
            <h3 className="text-xl font-medium text-foreground">
              {t.aboutTeaser.title}
            </h3>
            <p className="text-xs text-muted max-w-xl leading-relaxed font-sans">
              {t.aboutTeaser.desc}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end flex-shrink-0">
          <a
            href="/cv.pdf"
            download
            className="w-full sm:w-auto text-center px-4 py-2.5 rounded-lg bg-surface hover:bg-background text-foreground text-xs font-mono border border-border transition-colors"
          >
            {t.aboutTeaser.cvBtn}
          </a>
          <Link
            href="/about"
            className="w-full sm:w-auto text-center px-4 py-2.5 rounded-lg bg-foreground text-background text-xs font-mono font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            {t.aboutTeaser.aboutBtn}
          </Link>
        </div>
      </section>
    </main>
  );
}