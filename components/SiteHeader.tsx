"use client";
import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function SiteHeader({
  variant = "home",
}: {
  variant?: "home" | "inner";
}) {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="group inline-flex items-baseline gap-2">
          <span className="font-display text-lg sm:text-xl tracking-tight text-foreground">
            Cintia Henriksson
          </span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.25em] text-accent">
            PM
          </span>
        </Link>

        <nav className="flex items-center gap-1.5 sm:gap-3">
          {variant === "home" ? (
            <>
              <a
                href="/#casos"
                className="hidden sm:inline text-sm text-muted hover:text-foreground px-2"
              >
                {t.nav.cases}
              </a>
              <Link
                href="/about"
                className="hidden sm:inline text-sm text-muted hover:text-foreground px-2"
              >
                {t.nav.about}
              </Link>
            </>
          ) : (
            <Link
              href="/"
              className="text-sm text-muted hover:text-foreground inline-flex items-center gap-1.5 pr-1"
            >
              {t.nav.backHome}
            </Link>
          )}
          <span className="hidden sm:block h-5 w-px bg-border mx-1" aria-hidden="true" />
          <LanguageSwitch />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
