"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const footerCopy = {
  en: {
    tagline: "Governed AI systems, multi-platform products, and evidence-driven roadmaps.",
    contact: "Get in touch",
    nav: "Explore",
    home: "Home",
    about: "About",
    cases: "Case studies",
    cv: "Download CV",
    rights: "All rights reserved.",
    based: "Product Manager · Stockholm, SE",
  },
  es: {
    tagline: "Sistemas de IA gobernados, productos multiplataforma y roadmaps basados en evidencia.",
    contact: "Hablemos",
    nav: "Explorar",
    home: "Inicio",
    about: "Sobre mí",
    cases: "Casos de estudio",
    cv: "Descargar CV",
    rights: "Todos los derechos reservados.",
    based: "Product Manager · Estocolmo, SE",
  },
};

export default function SiteFooter() {
  const { lang } = useLanguage();
  const t = footerCopy[lang] || footerCopy.en;

  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-3">
            <p className="font-display text-2xl tracking-tight text-foreground">
              Cintia Henriksson
            </p>
            <p className="text-sm text-muted max-w-xs leading-relaxed">{t.tagline}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted pt-2">{t.based}</p>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">{t.nav}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-foreground/80 hover:text-accent">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground/80 hover:text-accent">
                  {t.about}
                </Link>
              </li>
              <li>
                <a href="/#casos" className="text-foreground/80 hover:text-accent">
                  {t.cases}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">{t.contact}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:cintia.henriksson@gmail.com"
                  className="text-foreground/80 hover:text-accent break-all"
                >
                  cintia.henriksson@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/cintiamars/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-accent"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href="/cv.pdf" download className="text-foreground/80 hover:text-accent">
                  {t.cv} ↓
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
          <span>© {new Date().getFullYear()} Cintia Henriksson. {t.rights}</span>
          <span className="font-mono">Built with intent.</span>
        </div>
      </div>
    </footer>
  );
}
