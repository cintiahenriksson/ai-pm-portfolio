"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = translations[lang].aboutPage;
  const navT = translations[lang].nav;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 font-sans space-y-16 text-foreground">
      {/* Navegación y Switches */}
      <nav className="flex items-center justify-between border-b border-border pb-5">
        <Link
          href="/"
          className="text-xs font-mono text-muted hover:text-foreground transition-colors inline-flex items-center gap-1"
        >
          {navT.backHome}
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </nav>

      {/* Header & Bio Principal */}
      <section className="flex flex-col sm:flex-row items-start gap-8 border-b border-border pb-12">
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-surface border border-border flex-shrink-0 shadow-sm">
          <Image
            src="/profile.jpg"
            alt="Cintia Henriksson"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-surface border border-border text-xs font-mono text-emerald-600 dark:text-emerald-400">
            {t.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            {t.title}
          </h1>
          <p className="text-sm text-foreground/85 leading-relaxed font-sans">
            {t.bio1}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/cv.pdf"
              download
              className="px-4 py-2 rounded-lg bg-foreground text-background text-xs font-mono font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
            >
              <span>{t.cvDownload}</span>
              <span>↓</span>
            </a>
            <a
              href="https://linkedin.com/in/cintiamars/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-surface text-foreground text-xs font-mono border border-border hover:bg-background transition-colors shadow-sm"
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:cintia.henriksson@gmail.com"
              className="px-4 py-2 rounded-lg bg-surface text-foreground text-xs font-mono border border-border hover:bg-background transition-colors shadow-sm"
            >
              Email ✉
            </a>
          </div>
        </div>
      </section>

      {/* Visión Estratégica & Proyecto Destacado */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted">
          {t.strategicSectionTitle}
        </h2>
        <div className="space-y-4 text-sm text-foreground/85 leading-relaxed font-sans">
          <p>{t.strategicP1}</p>

          {/* Destacado: MVP US Global Operator */}
          <div className="p-6 rounded-xl bg-surface border border-emerald-500/30 dark:border-emerald-500/20 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                {t.mvpBadge}
              </span>
              <span className="text-[11px] font-mono text-muted">{t.mvpLocation}</span>
            </div>
            <h3 className="text-base font-semibold text-foreground">
              {t.mvpTitle}
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              {t.mvpDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Trayectoria Completa de Producto */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted border-b border-border pb-2">
          {t.historySectionTitle}
        </h2>
        
        <div className="space-y-5">
          {/* Senior PM - Core & Brand */}
          <div className="p-5 rounded-xl bg-surface border border-border space-y-2 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t.rebtelSeniorRole}</span>
              <span className="text-muted">{t.rebtelSeniorMeta}</span>
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed font-sans">
              {t.rebtelSeniorDesc}
            </p>
          </div>

          {/* PM - Core */}
          <div className="p-5 rounded-xl bg-surface border border-border space-y-2 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
              <span className="text-foreground font-bold">{t.rebtelCoreRole}</span>
              <span className="text-muted">{t.rebtelCoreMeta}</span>
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed font-sans">
              {t.rebtelCoreDesc}
            </p>
          </div>

          {/* Lead PM */}
          <div className="p-5 rounded-xl bg-surface border border-border space-y-2 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
              <span className="text-foreground font-bold">{t.rebtelLeadRole}</span>
              <span className="text-muted">{t.rebtelLeadMeta}</span>
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed font-sans">
              {t.rebtelLeadDesc}
            </p>
          </div>

          {/* PM Website & CX - MAJORITY */}
          <div className="p-5 rounded-xl bg-surface border border-border space-y-2 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
              <span className="text-foreground font-bold">{t.majorityRole}</span>
              <span className="text-muted">{t.majorityMeta}</span>
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed font-sans">
              {t.majorityDesc}
            </p>
          </div>

          {/* Junior PM / Calling Independence */}
          <div className="p-5 rounded-xl bg-surface border border-border space-y-2 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
              <span className="text-foreground font-bold">{t.rebtelJuniorRole}</span>
              <span className="text-muted">{t.rebtelJuniorMeta}</span>
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed font-sans">
              {t.rebtelJuniorDesc}
            </p>
          </div>

          {/* Experiencia Operativa Previa */}
          <div className="p-5 rounded-xl bg-surface border border-border space-y-3 shadow-sm">
            <span className="text-xs font-mono text-muted font-bold uppercase tracking-wider block">
              {t.opsTitle}
            </span>
            <ul className="space-y-3 text-xs text-muted font-sans">
              <li>
                <strong className="text-foreground font-mono">{t.opsItem1Label}</strong>
                {t.opsItem1Text}
              </li>
              <li>
                <strong className="text-foreground font-mono">{t.opsItem2Label}</strong>
                {t.opsItem2Text}
              </li>
              <li>
                <strong className="text-foreground font-mono">{t.opsItem3Label}</strong>
                {t.opsItem3Text}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Punto de Inflexión Personal & Filosofía */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted border-b border-border pb-2">
          {t.purposeTitle}
        </h2>
        <div className="space-y-4 text-sm text-foreground/85 leading-relaxed font-sans">
          <p>{t.purposeP1}</p>
          <p>{t.purposeP2}</p>
        </div>
      </section>

      {/* Enfoque Pragmático de Inteligencia Artificial */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted border-b border-border pb-2">
          {t.aiTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-surface border border-border space-y-1.5 shadow-sm">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold block">{t.aiItem1Title}</span>
            <p className="text-muted font-sans">{t.aiItem1Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-border space-y-1.5 shadow-sm">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold block">{t.aiItem2Title}</span>
            <p className="text-muted font-sans">{t.aiItem2Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-border space-y-1.5 shadow-sm">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold block">{t.aiItem3Title}</span>
            <p className="text-muted font-sans">{t.aiItem3Desc}</p>
          </div>
        </div>
      </section>

      {/* Educación & Idiomas */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted border-b border-border pb-2">
          {t.skillsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-4 rounded-xl bg-surface border border-border space-y-2 shadow-sm">
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
              {t.photoTitle}
            </span>
            <p className="text-muted leading-relaxed">
              {t.photoDesc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-border space-y-2 shadow-sm">
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
              {t.langTitle}
            </span>
            <ul className="text-muted space-y-1 font-mono text-[11px]">
              <li>{t.lang1}</li>
              <li>{t.lang2}</li>
              <li>{t.lang3}</li>
              <li>{t.lang4}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}