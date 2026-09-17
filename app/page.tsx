"use client";
import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const caseSlugs = ["remesas-discovery", "agente-pagos", "alumnas-roadmap", "retention-signals"] as const;

export default function Home() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const cases = [t.cases.case1, t.cases.case2, t.cases.case3, t.cases.case4];

  return (
    <>
      <SiteHeader variant="home" />

      <main className="text-foreground">
        {/* ---------------------------------------------------------- */}
        {/* Hero                                                       */}
        {/* ---------------------------------------------------------- */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-accent/15 blur-[120px]"
          />
          <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-16 sm:pb-24">
            <div className="grid lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-16 items-center">
              <div className="animate-rise space-y-8">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  {t.hero.badge}
                </span>

                <h1 className="font-display text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.4rem] tracking-tight text-balance">
                  {t.hero.title}
                </h1>

                <p className="max-w-xl text-lg text-muted leading-relaxed text-pretty">
                  {t.hero.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#casos"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 hover:-translate-y-0.5"
                  >
                    {t.nav.cases}
                    <span aria-hidden="true">↓</span>
                  </a>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:border-accent/60 hover:text-accent"
                  >
                    {t.aboutTeaser.aboutBtn}
                  </Link>
                </div>
              </div>

              {/* Portrait */}
              <div className="animate-rise relative mx-auto w-full max-w-sm lg:max-w-none" style={{ animationDelay: "120ms" }}>
                <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-accent/25" aria-hidden="true" />
                <div className="absolute -left-3 -top-3 h-16 w-16 rounded-full border border-warm/50 bg-warm/10" aria-hidden="true" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-surface-2">
                  <img
                    src="/profile.jpg"
                    alt="Portrait of Cintia Henriksson"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-border/60 bg-background/80 px-4 py-2.5 backdrop-blur-md">
                    <span className="font-display text-base tracking-tight">Cintia Henriksson</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Stockholm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Case studies                                               */}
        {/* ---------------------------------------------------------- */}
        <section id="casos" className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12 scroll-mt-20">
          <div className="space-y-2 border-b border-border pb-5">
            <p className="text-xs uppercase tracking-[0.22em] text-accent">01 — 04</p>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight">
              {t.casesSectionTitle}
            </h2>
            <p className="max-w-2xl pt-1 text-sm leading-relaxed text-muted text-pretty">
              {t.casesTransparency}
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {cases.map((c, i) => (
              <Link
                key={caseSlugs[i]}
                href={`/cases/${caseSlugs[i]}`}
                className="group relative block overflow-hidden rounded-3xl border border-border bg-surface p-7 sm:p-10 hover:border-accent/40 hover:shadow-[0_24px_60px_-24px_rgba(75,69,212,0.35)] hover:-translate-y-1 transition-all"
              >
                <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:gap-10">
                  <div className="flex items-baseline gap-4 lg:flex-col lg:items-start lg:gap-2">
                    <span className="font-display text-6xl sm:text-7xl leading-none text-accent/25 group-hover:text-accent/60 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs uppercase tracking-[0.16em] text-muted lg:mt-2">
                      {c.sub}
                    </span>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-accent">{c.tag}</p>
                      <h3 className="font-display text-2xl sm:text-[2rem] leading-tight tracking-tight text-balance group-hover:text-accent transition-colors">
                        {c.title}
                      </h3>
                    </div>

                    <p className="max-w-2xl text-[15px] leading-relaxed text-foreground/85">
                      {c.p1}
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2 pt-1">
                      <p className="text-sm leading-relaxed text-muted">
                        <span className="font-semibold text-foreground">{c.whyLabel} </span>
                        {c.whyText}
                      </p>
                      <p className="rounded-xl border-l-2 border-accent/50 bg-surface-2 px-4 py-3 text-xs leading-relaxed text-muted">
                        <span className="font-semibold text-foreground">{c.privacyLabel} </span>
                        {c.privacyText}
                      </p>
                    </div>

                    <p className="text-xs leading-relaxed text-muted">
                      <span className="font-semibold text-foreground/80">{c.bgLabel} </span>
                      {c.bgText}
                    </p>

                    <span className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                      {c.cta.replace(" →", "")}
                      <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* About teaser                                               */}
        {/* ---------------------------------------------------------- */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
            />
            <div className="relative grid gap-10 md:grid-cols-[auto_1fr] md:items-center">
              <div className="relative mx-auto md:mx-0">
                <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-3xl bg-warm/20" aria-hidden="true" />
                <div className="relative h-40 w-40 overflow-hidden rounded-3xl border border-border bg-surface-2">
                  <img src="/profile.jpg" alt="Cintia Henriksson" className="h-full w-full object-cover" />
                </div>
              </div>

              <div className="space-y-5 text-center md:text-left">
                <p className="text-xs uppercase tracking-[0.22em] text-accent">{t.aboutTeaser.badge}</p>
                <h2 className="font-display text-3xl sm:text-4xl tracking-tight">{t.aboutTeaser.title}</h2>
                <p className="mx-auto md:mx-0 max-w-2xl text-[15px] leading-relaxed text-muted">
                  {t.aboutTeaser.desc}
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 hover:-translate-y-0.5"
                  >
                    {t.aboutTeaser.aboutBtn.replace(" →", "")}
                    <span aria-hidden="true">→</span>
                  </Link>
                  <a
                    href="/cv.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:border-accent/60 hover:text-accent"
                  >
                    {t.aboutTeaser.cvBtn}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
