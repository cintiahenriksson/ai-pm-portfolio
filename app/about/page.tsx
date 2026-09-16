"use client";
import React from "react";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = translations[lang].aboutPage;

  const roles = [
    { role: t.rebtelSeniorRole, meta: t.rebtelSeniorMeta, desc: t.rebtelSeniorDesc, current: true },
    { role: t.rebtelCoreRole, meta: t.rebtelCoreMeta, desc: t.rebtelCoreDesc },
    { role: t.rebtelLeadRole, meta: t.rebtelLeadMeta, desc: t.rebtelLeadDesc },
    { role: t.majorityRole, meta: t.majorityMeta, desc: t.majorityDesc },
    { role: t.rebtelJuniorRole, meta: t.rebtelJuniorMeta, desc: t.rebtelJuniorDesc },
  ];

  const aiPrinciples = [
    { title: t.aiItem1Title, desc: t.aiItem1Desc },
    { title: t.aiItem2Title, desc: t.aiItem2Desc },
    { title: t.aiItem3Title, desc: t.aiItem3Desc },
  ];

  return (
    <>
      <SiteHeader variant="inner" />

      <main className="text-foreground">
        {/* ---------------------------------------------------------- */}
        {/* Intro                                                      */}
        {/* ---------------------------------------------------------- */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent/12 blur-[110px]"
          />
          <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-12 sm:pb-16">
            <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-center">
              <div className="relative mx-auto md:mx-0 animate-rise">
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] bg-accent/25" aria-hidden="true" />
                <div className="relative h-44 w-44 sm:h-52 sm:w-52 overflow-hidden rounded-[1.75rem] border border-border bg-surface-2">
                  <Image src="/profile.jpg" alt="Cintia Henriksson" fill className="object-cover" priority />
                </div>
              </div>

              <div className="space-y-5 animate-rise" style={{ animationDelay: "100ms" }}>
                <span className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
                  {t.badge}
                </span>
                <h1 className="font-display text-4xl sm:text-6xl tracking-tight leading-[1.04]">
                  {t.title}
                </h1>
                <p className="max-w-2xl text-[15px] sm:text-base leading-relaxed text-muted">
                  {t.bio1}
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="/cv.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 hover:-translate-y-0.5"
                  >
                    {t.cvDownload} <span aria-hidden="true">↓</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/cintiamars/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground hover:border-accent/60 hover:text-accent"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="mailto:cintia.henriksson@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground hover:border-accent/60 hover:text-accent"
                  >
                    Email ✉
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Strategic vision + MVP highlight                           */}
        {/* ---------------------------------------------------------- */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <p className="text-xs uppercase tracking-[0.22em] text-accent">{t.strategicSectionTitle}</p>
          <p className="mt-5 max-w-3xl font-display text-xl sm:text-2xl leading-snug tracking-tight text-foreground/90">
            {t.strategicP1}
          </p>

          <div className="relative mt-8 overflow-hidden rounded-3xl border border-accent/30 bg-surface p-8 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-2xl"
            />
            <div className="relative space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-xs font-semibold text-accent">
                  {t.mvpBadge}
                </span>
                <span className="text-xs uppercase tracking-[0.16em] text-muted">{t.mvpLocation}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl tracking-tight">{t.mvpTitle}</h3>
              <p className="max-w-2xl text-[15px] leading-relaxed text-muted">{t.mvpDesc}</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Career timeline                                            */}
        {/* ---------------------------------------------------------- */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight border-b border-border pb-5">
            {t.historySectionTitle}
          </h2>

          <ol className="mt-8 space-y-0">
            {roles.map((r, i) => (
              <li
                key={i}
                className="group relative grid gap-1.5 sm:grid-cols-[1fr_2fr] gap-x-8 border-l-2 border-border pl-6 pb-8 last:pb-0"
              >
                <span
                  className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full ring-4 ring-background ${
                    r.current ? "bg-accent" : "bg-border group-hover:bg-accent/60"
                  } transition-colors`}
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <h3 className="font-display text-lg tracking-tight leading-tight">{r.role}</h3>
                  <p className="text-xs uppercase tracking-[0.12em] text-accent">{r.meta}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted">{r.desc}</p>
              </li>
            ))}
          </ol>

          {/* Operational foundations */}
          <div className="mt-4 rounded-3xl border border-border bg-surface-2 p-7 sm:p-9">
            <h3 className="text-xs uppercase tracking-[0.16em] text-muted">{t.opsTitle}</h3>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
              <li>
                <strong className="text-foreground font-semibold">{t.opsItem1Label}</strong>
                {t.opsItem1Text}
              </li>
              <li>
                <strong className="text-foreground font-semibold">{t.opsItem2Label}</strong>
                {t.opsItem2Text}
              </li>
              <li>
                <strong className="text-foreground font-semibold">{t.opsItem3Label}</strong>
                {t.opsItem3Text}
              </li>
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Purpose / turning point                                    */}
        {/* ---------------------------------------------------------- */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent-soft/60 to-surface p-8 sm:p-12">
            <p className="text-xs uppercase tracking-[0.22em] text-accent">{t.purposeTitle}</p>
            <div className="mt-5 space-y-5 max-w-3xl text-[15px] sm:text-lg leading-relaxed text-foreground/85 font-display tracking-tight">
              <p>{t.purposeP1}</p>
              <p>{t.purposeP2}</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* AI principles                                              */}
        {/* ---------------------------------------------------------- */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight border-b border-border pb-5">
            {t.aiTitle}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {aiPrinciples.map((p, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-border bg-surface p-6 hover:border-accent/40 hover:-translate-y-1 transition-all"
              >
                <span className="font-display text-3xl text-accent/40 group-hover:text-accent/70 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Education & languages                                      */}
        {/* ---------------------------------------------------------- */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-16">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight border-b border-border pb-5">
            {t.skillsTitle}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-7">
              <h3 className="font-display text-xl tracking-tight text-accent">{t.photoTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t.photoDesc}</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-7">
              <h3 className="font-display text-xl tracking-tight text-accent">{t.langTitle}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>{t.lang1}</li>
                <li>{t.lang2}</li>
                <li>{t.lang3}</li>
                <li>{t.lang4}</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
