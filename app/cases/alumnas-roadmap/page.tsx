import React from "react";
import Link from "next/link";
import RiceCalculator from "@/components/RiceCalculator";

export default function AlumnasRoadmapPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 font-sans space-y-16">
      {/* Navegación y Header */}
      <section className="space-y-4">
        <Link
          href="/"
          className="text-xs font-mono text-zinc-500 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
        >
          ← Volver al Portfolio
        </Link>
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 text-[11px] font-mono text-emerald-400">
            Caso 03 • Roadmap guiado por Feedback & RICE
          </span>
          <span className="text-zinc-500 font-mono text-xs">roadmap/rice_sensitivity.v1.xlsx</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
          Del feedback de mis alumnas a un roadmap de producto digital
        </h1>
        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
          Captura cualitativa sobre usuarias reales (alumnas directas, Instagram y transacciones en Gumroad).
          Filtrado de sesgos de cortesía, priorización con matriz RICE estresada y defensa con datos para descartar
          la funcionalidad más pedida en redes sociales.
        </p>

        {/* Data Strip / Métricas Clave */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-mono">
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">ORIGEN DE DATOS</span>
            <span className="text-emerald-400 text-lg font-bold">1ª Mano</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Alumnas + IG + Gumroad</span>
          </div>
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">DECISIÓN INCÓMODA</span>
            <span className="text-rose-400 text-lg font-bold">-10 sem</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Descarte de App Nativa</span>
          </div>
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">TIME-TO-VALUE</span>
            <span className="text-zinc-200 text-lg font-bold">2,5 sem</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Sprint 1 completado</span>
          </div>
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">TEST DE SENSIBILIDAD</span>
            <span className="text-emerald-400 text-lg font-bold">Resiliente</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Confianza penalizada al 50%</span>
          </div>
        </div>
      </section>

      {/* 1. Problem Statement y Micro-encuesta v2 */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
          01. Captura Cualitativa: Eliminación del Sesgo de Cortesía
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed">
          El problema de producto: las alumnas de formación física y hábitos pierden el ritmo entre sesiones guiadas.
          Para no caer en la trampa de preguntar <em>«¿Qué te gustaría que construya?»</em> (que produce listas de deseos infinitas y cero compromiso), la micro-encuesta v2 se calibró sobre comportamiento pasado y disposición transaccional inmediata.
        </p>

        <div className="p-4 rounded-lg bg-zinc-900/30 border border-zinc-800 text-xs text-zinc-400 space-y-3">
          <div className="font-mono text-zinc-300 text-[11px] font-semibold">
            Micro-encuesta de 5 preguntas (sin sesgo inductivo):
          </div>
          <ol className="list-decimal pl-5 space-y-1.5 font-mono text-[11px] text-zinc-300">
            <li>
              <strong>Frecuencia real:</strong> En los últimos 14 días, ¿cuántas veces dedicaste al menos 15 minutos a practicar en solitario? <em>(Mide hábito base)</em>
            </li>
            <li>
              <strong>Momento de fricción:</strong> Cuando querías practicar y no lo hiciste, ¿qué ocurrió en los 10 minutos previos? <em>(Causa raíz abierta)</em>
            </li>
            <li>
              <strong>Alternativas actuales:</strong> ¿Cómo intentas resolver este bloqueo hoy cuando estás sola? <em>(Descubre competidores reales)</em>
            </li>
            <li>
              <strong>Formato viable:</strong> Selección forzada entre 4 formatos con carga cognitiva decreciente.
            </li>
            <li>
              <strong>Compromiso real:</strong> Opción de reserva anticipada del piloto por 15 € vs esperar lanzamiento abierto <em>(Skin in the game)</em>.
            </li>
          </ol>
        </div>
      </section>

      {/* 2. Matriz RICE Interactiva */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-800 pb-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            02. Priorización RICE con Análisis de Sensibilidad
          </h2>
          <span className="text-xs font-mono text-emerald-400">Aritmética reproducible</span>
        </div>
        <p className="text-xs text-zinc-400">
          Utiliza el control deslizante para comprobar la resiliencia del orden de priorización ante escenarios de alta incertidumbre o degradación de confianza en las métricas.
        </p>

        {/* Componente del Simulador RICE */}
        <RiceCalculator />
      </section>

      {/* 3. La Decisión Incómoda y el Fallo Documentado */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
          03. Defensa de Trade-Offs & Reversión Metodológica
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          {/* Trade-off incómodo */}
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
            <span className="font-mono text-rose-400 text-[11px] block font-semibold">
              Trade-Off Incómodo: Descarte de la App Nativa
            </span>
            <p className="text-zinc-400 leading-relaxed">
              En encuestas abiertas de Instagram, el <strong>42% de las alumnas solicitó una app móvil propia</strong>. Pese al ruido social, la iniciativa fue descartada por su ratio RICE (15 vs 216).
            </p>
            <div className="pt-2 text-[11px] font-mono text-zinc-300 border-t border-zinc-800/60 leading-relaxed">
              <strong>Defensa de PM:</strong> El dolor real era la rendición de cuentas y la falta de tiempo, no la ausencia de software nativo. Construir una app habría costado 10 semanas; los micro-audios con seguimiento por mensajería se entregaron en 2,5 semanas conjuntas con mayor retención final.
            </div>
          </div>

          {/* Fallo y reversión */}
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
            <span className="font-mono text-amber-400 text-[11px] block font-semibold">
              Fallo Documentado: Sesgo de Cortesía en Encuesta v1
            </span>
            <p className="text-zinc-400 leading-relaxed">
              En el primer diseño se preguntó: <em>«¿Te gustaría contar con una biblioteca de clases en vídeo?»</em>. El 92% respondió que sí. Al lanzar un piloto de vídeos largos, la finalización cayó por debajo del 8% a los 7 días.
            </p>
            <div className="pt-2 text-[11px] font-mono text-zinc-300 border-t border-zinc-800/60 leading-relaxed">
              <strong>Reversión:</strong> Se reescribió la encuesta (v2) eliminando preguntas sobre intenciones futuras y sustituyéndolas por preguntas de comportamiento retrospectivo contrastable y compromiso transaccional previo.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Conexión de Cierre del Portfolio */}
      <section className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono text-emerald-400">Scorecard Completo: 4 de 4 Dimensiones</span>
          <p className="text-xs text-zinc-300 font-sans">
            Has recorrido el ciclo integral: Discovery (C1) → Especificación Técnica y Evals (C2) → Priorización con Datos Propios (C3).
          </p>
        </div>
        <Link
          href="/"
          className="px-4 py-2 rounded bg-zinc-100 text-zinc-900 text-xs font-mono font-semibold hover:bg-emerald-400 transition-colors whitespace-nowrap"
        >
          Volver a la Home del Portfolio →
        </Link>
      </section>
    </main>
  );
}