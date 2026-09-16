"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitch() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex items-center rounded-lg bg-zinc-900 border border-zinc-800 p-0.5 text-xs font-mono">
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 rounded transition-all ${
          lang === "en"
            ? "bg-zinc-100 text-zinc-900 font-bold shadow-sm"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("es")}
        className={`px-2 py-1 rounded transition-all ${
          lang === "es"
            ? "bg-zinc-100 text-zinc-900 font-bold shadow-sm"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        ES
      </button>
    </div>
  );
}