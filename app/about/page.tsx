"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = translations[lang].aboutPage;
  const navT = translations[lang].nav;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 font-sans space-y-16 text-zinc-200">
      {/* Navegación y Switch */}
      <nav className="flex items-center justify-between border-b border-zinc-800/80 pb-5">
        <Link
          href="/"
          className="text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
        >
          {navT.backHome}
        </Link>
        <LanguageSwitch />
      </nav>

      {/* Header & Bio Principal */}
      <section className="flex flex-col sm:flex-row items-start gap-8 border-b border-zinc-800 pb-12">
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0">
          <Image
            src="/profile.jpg"
            alt="Cintia Henriksson"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-400">
            {t.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
            {t.title}
          </h1>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            {t.bio1}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/cv.pdf"
              download
              className="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-900 text-xs font-mono font-semibold hover:bg-emerald-400 transition-colors flex items-center gap-2"
            >
              <span>{t.cvDownload}</span>
              <span>↓</span>
            </a>
            <a
              href="https://linkedin.com/in/cintiamars/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-zinc-900 text-zinc-300 text-xs font-mono border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:cintia.henriksson@gmail.com"
              className="px-4 py-2 rounded-lg bg-zinc-900 text-zinc-300 text-xs font-mono border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors"
            >
              Email ✉
            </a>
          </div>
        </div>
      </section>

      {/* Visión Estratégica & Proyecto Destacado */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
          {t.strategicSectionTitle}
        </h2>
        <div className="space-y-4 text-sm text-zinc-300 leading-relaxed font-sans">
          <p>{t.strategicP1}</p>

          {/* Destacado: MVP US Global Operator */}
          <div className="p-5 rounded-xl bg-zinc-900/40 border border-emerald-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                {t.mvpBadge}
              </span>
              <span className="text-[11px] font-mono text-zinc-500">{t.mvpLocation}</span>
            </div>
            <h3 className="text-base font-semibold text-zinc-100">
              {t.mvpTitle}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {t.mvpDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Trayectoria Completa de Producto */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-800 pb-2">
          {t.historySectionTitle}
        </h2>
        
        <div className="space-y-6">
          {/* Senior PM - Core & Brand */}
          <div className="p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/80 space-y-2">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
              <span className="text-emerald-400 font-bold">{t.rebtelSeniorRole}</span>
              <span className="text-zinc-500">{t.rebtelSeniorMeta}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {t.rebtelSeniorDesc}
            </p>
          </div>

          {/* PM - Core */}
          <div className="p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/80 space-y-2">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
              <span className="text-zinc-200 font-bold">{t.rebtelCoreRole}</span>
              <span className="text-zinc-500">{t.rebtelCoreMeta}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {t.rebtelCoreDesc}
            </p>
          </div>

          {/* Lead PM */}
          <div className="p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/80 space-y-2">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
              <span className="text-zinc-200 font-bold">{t.rebtelLeadRole}</span>
              <span className="text-zinc-500">{t.rebtelLeadMeta}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {t.rebtelLeadDesc}
            </p>
          </div>

          {/* PM Website & CX - MAJORITY */}
          <div className="p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/80 space-y-2">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
              <span className="text-zinc-200 font-bold">{t.majorityRole}</span>
              <span className="text-zinc-500">{t.majorityMeta}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {t.majorityDesc}
            </p>
          </div>

          {/* Junior PM / Calling Independence */}
          <div className="p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/80 space-y-2">
            <div className="flex flex-col sm:flex-row justify-between text-xs font-mono">
              <span className="text-zinc-200 font-bold">{t.rebtelJuniorRole}</span>
              <span className="text-zinc-500">{t.rebtelJuniorMeta}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {t.rebtelJuniorDesc}
            </p>
          </div>

          {/* Experiencia Operativa Previa */}
          <div className="p-5 rounded-xl bg-zinc-900/20 border border-zinc-800/80 space-y-3">
            <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block">
              {t.opsTitle}
            </span>
            <ul className="space-y-3 text-xs text-zinc-400 font-sans">
              <li>
                <strong className="text-zinc-200 font-mono">{t.opsItem1Label}</strong>
                {t.opsItem1Text}
              </li>
              <li>
                <strong className="text-zinc-200 font-mono">{t.opsItem2Label}</strong>
                {t.opsItem2Text}
              </li>
              <li>
                <strong className="text-zinc-200 font-mono">{t.opsItem3Label}</strong>
                {t.opsItem3Text}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Punto de Inflexión Personal & Filosofía */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-800 pb-2">
          {t.purposeTitle}
        </h2>
        <div className="space-y-4 text-sm text-zinc-300 leading-relaxed font-sans">
          <p>{t.purposeP1}</p>
          <p>{t.purposeP2}</p>
        </div>
      </section>

      {/* Enfoque Pragmático de Inteligencia Artificial */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-800 pb-2">
          {t.aiTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-1.5">
            <span className="text-emerald-400 font-bold block">{t.aiItem1Title}</span>
            <p className="text-zinc-400 font-sans">{t.aiItem1Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-1.5">
            <span className="text-emerald-400 font-bold block">{t.aiItem2Title}</span>
            <p className="text-zinc-400 font-sans">{t.aiItem2Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-1.5">
            <span className="text-emerald-400 font-bold block">{t.aiItem3Title}</span>
            <p className="text-zinc-400 font-sans">{t.aiItem3Desc}</p>
          </div>
        </div>
      </section>

      {/* Educación & Idiomas */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 border-b border-zinc-800 pb-2">
          {t.skillsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-2">
            <span className="font-mono text-emerald-400 font-bold block">
              {t.photoTitle}
            </span>
            <p className="text-zinc-400 leading-relaxed">
              {t.photoDesc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-2">
            <span className="font-mono text-emerald-400 font-bold block">
              {t.langTitle}
            </span>
            <ul className="text-zinc-400 space-y-1 font-mono text-[11px]">
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