"use client";
import React from "react";
import Link from "next/link";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function Home() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 font-sans space-y-20 text-zinc-200">
      {/* Barra de Navegación Superior */}
      <nav className="flex items-center justify-between border-b border-zinc-800/80 pb-5">
        <span className="font-mono text-sm font-semibold text-zinc-100 tracking-tight">
          Cintia Henriksson
        </span>
        <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono">
          <a href="#casos" className="text-zinc-400 hover:text-zinc-200 transition-colors">
            {t.nav.cases}
          </a>
          <Link
            href="/about"
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
          >
            {t.nav.about}
          </Link>
          <LanguageSwitch />
        </div>
      </nav>

      {/* 1. Hero & Posicionamiento */}
      <section className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-400 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {t.hero.badge}
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-100 leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          {t.hero.subtitle}
        </p>
      </section>

      {/* 2. Cobertura del Scorecard */}
      <section className="space-y-6">
        <div className="flex justify-between items-baseline border-b border-zinc-800 pb-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            {t.scorecard.title}
          </h2>
          <span className="text-xs font-mono text-emerald-400">{t.scorecard.status}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          {t.scorecard.items.map((item, index) => (
            <div key={index} className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80">
              <span className="text-zinc-500 block text-[10px] mb-1 font-bold">{item.label}</span>
              <span className="text-zinc-200 font-semibold block text-sm">{item.title}</span>
              <span className="text-emerald-400 block mt-2 text-[11px]">{item.metric}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Casos de Estudio Detallados */}
      <section id="casos" className="space-y-8 scroll-mt-10">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-800 pb-3">
          {t.casesSectionTitle}
        </h2>

        <div className="space-y-8">
          {/* Tarjeta Caso 1 */}
          <Link
            href="/cases/remesas-discovery"
            className="group block p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                {t.cases.case1.tag}
              </span>
              <span className="text-xs font-mono text-zinc-500">{t.cases.case1.sub}</span>
            </div>
            
            <h3 className="text-2xl font-medium text-zinc-100 group-hover:text-emerald-300 transition-colors">
              {t.cases.case1.title}
            </h3>

            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed font-sans">
              <p>{t.cases.case1.p1}</p>
              <p className="text-xs text-zinc-400 bg-zinc-950/60 p-3.5 rounded-lg border border-zinc-800/60 leading-relaxed">
                <strong className="text-zinc-200">{t.cases.case1.privacyLabel} </strong>
                {t.cases.case1.privacyText}
              </p>
              <p>
                <strong>{t.cases.case1.whyLabel} </strong>
                {t.cases.case1.whyText}
              </p>
              <p className="text-xs text-zinc-400">
                <strong>{t.cases.case1.bgLabel} </strong>
                {t.cases.case1.bgText}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end text-xs font-mono text-zinc-400 group-hover:text-emerald-400 transition-colors">
              {t.cases.case1.cta}
            </div>
          </Link>

          {/* Tarjeta Caso 2 */}
          <Link
            href="/cases/agente-pagos"
            className="group block p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                {t.cases.case2.tag}
              </span>
              <span className="text-xs font-mono text-zinc-500">{t.cases.case2.sub}</span>
            </div>

            <h3 className="text-2xl font-medium text-zinc-100 group-hover:text-emerald-300 transition-colors">
              {t.cases.case2.title}
            </h3>

            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed font-sans">
              <p>{t.cases.case2.p1}</p>
              <p className="text-xs text-zinc-400 bg-zinc-950/60 p-3.5 rounded-lg border border-zinc-800/60 leading-relaxed">
                <strong className="text-zinc-200">{t.cases.case2.privacyLabel} </strong>
                {t.cases.case2.privacyText}
              </p>
              <p>
                <strong>{t.cases.case2.whyLabel} </strong>
                {t.cases.case2.whyText}
              </p>
              <p className="text-xs text-zinc-400">
                <strong>{t.cases.case2.bgLabel} </strong>
                {t.cases.case2.bgText}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end text-xs font-mono text-zinc-400 group-hover:text-emerald-400 transition-colors">
              {t.cases.case2.cta}
            </div>
          </Link>

          {/* Tarjeta Caso 3 */}
          <Link
            href="/cases/alumnas-roadmap"
            className="group block p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                {t.cases.case3.tag}
              </span>
              <span className="text-xs font-mono text-zinc-500">{t.cases.case3.sub}</span>
            </div>

            <h3 className="text-2xl font-medium text-zinc-100 group-hover:text-emerald-300 transition-colors">
              {t.cases.case3.title}
            </h3>

            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed font-sans">
              <p>{t.cases.case3.p1}</p>
              <p className="text-xs text-zinc-400 bg-zinc-950/60 p-3.5 rounded-lg border border-zinc-800/60 leading-relaxed">
                <strong className="text-zinc-200">{t.cases.case3.privacyLabel} </strong>
                {t.cases.case3.privacyText}
              </p>
              <p>
                <strong>{t.cases.case3.whyLabel} </strong>
                {t.cases.case3.whyText}
              </p>
              <p className="text-xs text-zinc-400">
                <strong>{t.cases.case3.bgLabel} </strong>
                {t.cases.case3.bgText}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end text-xs font-mono text-zinc-400 group-hover:text-emerald-400 transition-colors">
              {t.cases.case3.cta}
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Sección Sobre Mí & Acceso a la Bio */}
      <section className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 flex-shrink-0">
            <img
              src="/profile.jpg"
              alt="Cintia Henriksson"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-emerald-400">
              {t.aboutTeaser.badge}
            </div>
            <h3 className="text-xl font-medium text-zinc-100">
              {t.aboutTeaser.title}
            </h3>
            <p className="text-xs text-zinc-400 max-w-xl leading-relaxed font-sans">
              {t.aboutTeaser.desc}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end flex-shrink-0">
          <a
            href="/cv.pdf"
            download
            className="w-full sm:w-auto text-center px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono border border-zinc-700 transition-colors"
          >
            {t.aboutTeaser.cvBtn}
          </a>
          <Link
            href="/about"
            className="w-full sm:w-auto text-center px-4 py-2.5 rounded-lg bg-zinc-100 text-zinc-900 text-xs font-mono font-semibold hover:bg-emerald-400 transition-colors whitespace-nowrap"
          >
            {t.aboutTeaser.aboutBtn}
          </Link>
        </div>
      </section>
    </main>
  );
}