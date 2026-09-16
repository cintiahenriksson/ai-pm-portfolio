"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitch() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-full bg-surface border border-border p-0.5 text-xs font-medium">
      {(["en", "es"] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2.5 py-1 rounded-full transition-all ${
            lang === code
              ? "bg-accent text-accent-foreground shadow-sm"
              : "text-muted hover:text-foreground"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
