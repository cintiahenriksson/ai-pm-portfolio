import React from "react";
import Link from "next/link";
import AgentSimulator from "@/components/AgentSimulator";

export default function AgentePagosPage() {
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
            Caso 02 • Prototipo Funcional & Evals
          </span>
          <span className="text-zinc-500 font-mono text-xs">spec/behavior_spec.v1.json</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
          «¿Dónde está mi dinero?»: Agente de soporte con release gate asimétrico
        </h1>
        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
          Diseño e implementación de un agente de soporte para pagos en tránsito gobernado por una
          especificación formal sin prompt paralelo, validado contra un arnés de 120 tickets sintéticos
          con tolerancia cero a promesas falsas.
        </p>

        {/* Data Strip / Métricas Clave */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-mono">
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">DEFLECTION MODELADA</span>
            <span className="text-emerald-400 text-lg font-bold">18,8%</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Descuento de realismo</span>
          </div>
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">RELEASE GATE</span>
            <span className="text-emerald-400 text-lg font-bold">0 Violaciones</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">En C2.1–C2.6 y C2.8</span>
          </div>
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">COSTE / 1K TICKETS</span>
            <span className="text-zinc-200 text-lg font-bold">1,80 USD</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Modelo Economy-C</span>
          </div>
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">LATENCIA P50</span>
            <span className="text-zinc-200 text-lg font-bold">480 ms</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Inferencia optimizada</span>
          </div>
        </div>
      </section>

      {/* 1. Problem Statement y Hechos Regulados */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
          01. Problem Statement & Regulación CFPB
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed">
          En remesas internacionales, la mayor frustración ocurre cuando una transferencia queda «en proceso».
          Los chatbots habituales suelen calmar al usuario con frases empáticas vacías o prometiendo horas de entrega
          inexistentes, provocando quejas regulatorias y disputas bancarias.
        </p>
        <div className="p-4 rounded-lg bg-zinc-900/30 border border-zinc-800 text-xs text-zinc-400 space-y-2">
          <div className="font-mono text-zinc-300 text-[11px] font-semibold">
            Inyección de hechos normativos (Remittance Transfer Rule del CFPB):
          </div>
          <ul className="list-disc pl-5 space-y-1 font-mono text-[11px]">
            <li>Ventana de cancelación obligatoria: 30 minutos (siempre que los fondos no hayan sido cobrados).</li>
            <li>Plazo legal de reembolso: máximo 3 días hábiles.</li>
            <li>Plazos de disputa: 180 días para reportar un error y 90 días para resolución formal.</li>
          </ul>
          <p className="text-[11px] text-zinc-500 pt-1">
            Los hechos regulatorios viven como datos inyectados en la spec, nunca en la memoria estocástica del LLM.
          </p>
        </div>
      </section>

      {/* 2. Prototipo Interactivo */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-800 pb-2">
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            02. Prototipo Operativo (Live Simulator)
          </h2>
          <span className="text-xs font-mono text-emerald-400">spec/behavior_spec.v1.json</span>
        </div>
        <p className="text-xs text-zinc-400">
          Selecciona un escenario de prueba para observar el comportamiento conversacional en paralelo con la
          inspección del contrato JSON y la activación de guardrails en tiempo real.
        </p>
        
        {/* Componente del Simulador */}
        <AgentSimulator />
      </section>

      {/* 3. El Release Gate y Comparativa de Modelos */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
          03. Harness de Evaluación & Release Gate
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed">
          El release gate es asimétrico: <strong>cero violaciones de las restricciones críticas (C2.1–C2.6 y C2.8)</strong> sobre el golden set de 120 tickets. En pagos transfronterizos, una fecha inventada o una fuga de privacidad cuesta más que diez tickets no resueltos.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border border-zinc-800 rounded-lg overflow-hidden">
            <thead className="bg-zinc-900/60 text-zinc-400">
              <tr className="border-b border-zinc-800">
                <th className="p-3">Modelo</th>
                <th className="p-3">Coste / 1k</th>
                <th className="p-3">Latencia p50</th>
                <th className="p-3">Aprobado</th>
                <th className="p-3">Violaciones Gate</th>
                <th className="p-3 text-right">Decisión Release</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 bg-zinc-950 text-zinc-300">
              <tr>
                <td className="p-3 font-semibold text-zinc-100">Frontier-A</td>
                <td className="p-3">14,20 USD</td>
                <td className="p-3">1.850 ms</td>
                <td className="p-3">94,1%</td>
                <td className="p-3 text-rose-400 font-bold">1 violación (C2.1)</td>
                <td className="p-3 text-right">
                  <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 text-[10px]">
                    BLOQUEADO
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-100">Frontier-B</td>
                <td className="p-3">11,50 USD</td>
                <td className="p-3">1.200 ms</td>
                <td className="p-3">91,6%</td>
                <td className="p-3 text-emerald-400">0 violaciones</td>
                <td className="p-3 text-right">
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px]">
                    DESCARTADO (COSTE)
                  </span>
                </td>
              </tr>
              <tr className="bg-emerald-950/20">
                <td className="p-3 font-semibold text-emerald-300">Economy-C (Guarded)</td>
                <td className="p-3 text-emerald-300 font-bold">1,80 USD</td>
                <td className="p-3 text-emerald-300 font-bold">480 ms</td>
                <td className="p-3 text-emerald-300">89,2%</td>
                <td className="p-3 text-emerald-300 font-bold">0 violaciones</td>
                <td className="p-3 text-right">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                    RELEASE APROBADO
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Galería de Fallos y Reversión Post-Mortem */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
          04. Post-Mortem: Galería de Fallos & Endurecimiento de Gate
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
            <span className="font-mono text-rose-400 text-[11px] block font-semibold">
              Fallo T014: Promesa de hora alucinada (C2.1)
            </span>
            <p className="text-zinc-400 leading-relaxed">
              El modelo naive respondió: <em>«No te preocupes, llegará el lunes a más tardar a las 18:00»</em> cuando el sistema no tenía confirmación bancaria.
            </p>
            <div className="pt-2 text-[11px] font-mono text-zinc-300 border-t border-zinc-800/60">
              <strong>Solución:</strong> Prohibición estricta de emitir unidades de tiempo si <code className="text-emerald-400">system_eta == null</code>.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
            <span className="font-mono text-amber-400 text-[11px] block font-semibold">
              Adición Post-Run: Privacidad de Terceros (C2.8)
            </span>
            <p className="text-zinc-400 leading-relaxed">
              En la primera corrida, un destinatario con el ID de transacción logró que el modelo le revelara el importe enviado por el emisor en 3 casos.
            </p>
            <div className="pt-2 text-[11px] font-mono text-zinc-300 border-t border-zinc-800/60">
              <strong>Solución:</strong> El gate se endureció tras la primera prueba añadiendo C2.8 para exigir validación de sesión de usuario emisor.
            </div>
          </div>
        </div>
      </section>

      {/* 5. Modelo de Deflection de Negocio */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
          05. Impacto Económico: Modelo de Deflection Descontado
        </h2>
        <div className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800 space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row justify-between gap-2 items-baseline">
            <span className="font-mono font-semibold text-zinc-200">Cadena de Cálculo de Contención Neta:</span>
            <span className="font-mono text-emerald-400 text-sm font-bold">18,8% Deflection Real</span>
          </div>
          <div className="bg-zinc-950 p-3 rounded font-mono text-zinc-400 text-[11px] overflow-x-auto">
            Deflection = (% tickets estado: 34%) × (Pass rate: 82%) × (Contención residual: 45%) × (Descuento realismo: 0.70) ≈ 18,8%
          </div>
          <p className="text-zinc-400 leading-relaxed font-sans">
            Frente al 30–60% habitual anunciado por proveedores de IA, este modelo aplica un descuento de realismo explícito
            por ruido en soporte multiturno y repondera por el mix del corpus real del Caso 1, proyectando un ahorro sostenible
            de <strong>~115.000 USD anuales</strong> en costes directos de soporte.
          </p>
        </div>
      </section>

      {/* 6. Cierre: Conexión con el Caso 3 */}
      <section className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono text-emerald-400">
            Siguiente Paso • Decisión con Datos Propios
          </span>
          <p className="text-xs text-zinc-300 font-sans">
            De la especificación técnica y evaluación del agente a la priorización de producto digital con feedback real y matriz RICE.
          </p>
        </div>
        <Link
          href="/cases/alumnas-roadmap"
          className="px-4 py-2 rounded bg-zinc-100 text-zinc-900 text-xs font-mono font-semibold hover:bg-emerald-400 transition-colors whitespace-nowrap"
        >
          Ver Caso 3: Roadmap de Alumnas →
        </Link>
      </section>
    </main>
  );
}