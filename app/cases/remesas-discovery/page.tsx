import React from "react";
import Link from "next/link";

export default function RemesasDiscoveryPage() {
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
            Caso 01 • Síntesis de Research & Sizing
          </span>
          <span className="text-zinc-500 font-mono text-xs">pipeline/codebook.v2.json</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100">
          «Por qué se van»: Síntesis de 1.500 reseñas públicas de apps de remesas
        </h1>
        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
          Extracción y codificación multilingüe (ES, EN, PT, SV) sin romper confidencialidad corporativa.
          Evaluación de concordancia inter-anotador (Cohen&apos;s Kappa) y sizing aritmético que conecta
          el dolor cualitativo directamente con el roadmap técnico.
        </p>

        {/* Data Strip / Métricas Clave */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-mono">
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">CORPUS PROCESADO</span>
            <span className="text-emerald-400 text-lg font-bold">1.500</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">4 apps • 4 idiomas</span>
          </div>
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">ACUERDO HUMANO-IA</span>
            <span className="text-emerald-400 text-lg font-bold">κ = 0,81</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Cohen&apos;s Kappa (n=225)</span>
          </div>
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">AHORRO POR CICLO</span>
            <span className="text-zinc-200 text-lg font-bold">~34 h</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">De 40h manuales a 6h</span>
          </div>
          <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">TOP DOLOR DETECTADO</span>
            <span className="text-zinc-200 text-lg font-bold">34,0%</span>
            <span className="text-[10px] text-zinc-500 block mt-0.5">Retraso en entrega</span>
          </div>
        </div>
      </section>

      {/* 1. Problem Statement y Fuente de Datos */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
          01. Problem Statement & Extracción Pública
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed">
          El momento crítico: una persona migrante envía dinero a su familia y la transacción queda bloqueada «en proceso». Abre el chat de soporte y, en paralelo, deja una reseña de 1 estrella. Sin cuantificación sistemática, los equipos de producto priorizan sobre anécdotas recientes en lugar de atacar la causa raíz de la fuga de confianza.
        </p>
        <div className="p-4 rounded-lg bg-zinc-900/30 border border-zinc-800 text-xs text-zinc-400 space-y-2">
          <div className="font-mono text-zinc-300 text-[11px] font-semibold">
            Garantía de cumplimiento y confidencialidad:
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Corpus obtenido íntegramente de feeds RSS públicos de Apple App Store y la API pública de Google Play sobre competidores directos (Remitly, Wise, WorldRemit y apps de minutos internacionales). Cero exposición de datos internos de compañía.
          </p>
        </div>
      </section>

      {/* 2. Metodología: Codebook Versionado y Kappa */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
          02. Metodología de Codificación & Validación Humano-Modelo
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Los LLMs solo alcanzan fiabilidad cualitativa con taxonomías formales previas. El codebook arrancó en v1 con 8 códigos y se versionó a v2 (11 códigos) tras analizar fallos de clasificación en casos límite.
        </p>

        {/* Tabla de Resultados de Validación */}
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-mono font-bold text-zinc-200">
              Validación Ciega sobre Muestra Aleatoria del 15% (n = 225 reseñas)
            </span>
            <span className="text-xs font-mono text-emerald-400">Acuerdo Global: 84,4%</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">CÓDIGOS FACTUALES / EXPLÍCITOS</span>
              <span className="text-emerald-400 font-bold">κ = 0,86 (Alto)</span>
              <span className="text-zinc-400 block text-[11px] mt-1">
                TRANS_DELAY, APP_TECH, REFUND_DELAY
              </span>
            </div>
            <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">CÓDIGOS INTERPRETATIVOS / SUBTEXTO</span>
              <span className="text-amber-400 font-bold">κ = 0,61 (Moderado)</span>
              <span className="text-zinc-400 block text-[11px] mt-1">
                SUPPORT_NO_REPLY, FRAUD_SUSP
              </span>
            </div>
          </div>
          <p className="text-[11px] text-zinc-500 font-mono">
            Regla anti-alucinación: ningún tema entra al informe final sin al menos 3 citas textuales verbatim enlazadas.
          </p>
        </div>
      </section>

      {/* 3. Sizing de Oportunidades con Aritmética Visible */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
          03. Sizing de Oportunidades: De Reviews a Impacto de Negocio
        </h2>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Extrapolación a una base transaccional de 500.000 operaciones/mes, 3% tasa de soporte (15.000 tickets) y 10 USD de coste directo por gestión humana:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border border-zinc-800 rounded-lg overflow-hidden">
            <thead className="bg-zinc-900/60 text-zinc-400">
              <tr className="border-b border-zinc-800">
                <th className="p-3">Código</th>
                <th className="p-3">Corpus (n=1.500)</th>
                <th className="p-3">% Mix</th>
                <th className="p-3">Incidencia Est.</th>
                <th className="p-3">Coste Soporte</th>
                <th className="p-3 text-right">Opportunity Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 bg-zinc-950 text-zinc-300">
              <tr className="bg-emerald-950/20">
                <td className="p-3 font-semibold text-emerald-300">TRANS_DELAY (Retraso entrega)</td>
                <td className="p-3">510</td>
                <td className="p-3 font-bold text-emerald-400">34,0%</td>
                <td className="p-3">5.100 tickets/mes</td>
                <td className="p-3">51.000 USD/mes</td>
                <td className="p-3 text-right font-bold text-emerald-400">7.650</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-100">SUPPORT_NO_REPLY (Soporte bucle)</td>
                <td className="p-3">315</td>
                <td className="p-3 font-bold text-zinc-200">21,0%</td>
                <td className="p-3">3.150 tickets/mes</td>
                <td className="p-3">31.500 USD/mes</td>
                <td className="p-3 text-right font-bold text-zinc-200">4.410</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-100">KYC_BLOCK (Verificación)</td>
                <td className="p-3">210</td>
                <td className="p-3">14,0%</td>
                <td className="p-3">2.100 tickets/mes</td>
                <td className="p-3">21.000 USD/mes</td>
                <td className="p-3 text-right">2.520</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-100">PAYOUT_FAIL (Fallo receptor)</td>
                <td className="p-3">165</td>
                <td className="p-3">11,0%</td>
                <td className="p-3">1.650 tickets/mes</td>
                <td className="p-3">16.500 USD/mes</td>
                <td className="p-3 text-right">2.145</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-100">REFUND_DELAY (Reembolso retenido)</td>
                <td className="p-3">120</td>
                <td className="p-3">8,0%</td>
                <td className="p-3">1.200 tickets/mes</td>
                <td className="p-3">12.000 USD/mes</td>
                <td className="p-3 text-right">1.920</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[11px] font-mono text-zinc-500 pt-1">
          Aritmética visible: Opportunity Score = Incidencia mensual × Multiplicador de severidad de churn.
          Los dolores #1 y #2 representan el 55% de toda la fricción y dan origen al prototipo del Caso 2.
        </p>
      </section>

      {/* 4. Galería de Fallos y Reversión Metodológica */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
          04. Galería de Fallos de Inferencia & Reversión de Arquitectura
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
            <span className="font-mono text-rose-400 text-[11px] block font-semibold">
              Fallo: Sarcasmo no detectado en modelo ligero
            </span>
            <p className="text-zinc-400 leading-relaxed">
              Reseña: <em>«Increíble servicio, 6 días esperando para que le llegue la medicina a mi madre»</em>. El clasificador económico asignó <code className="text-zinc-300">OTHER_UNCAT</code> (elogio) por el sesgo léxico positivo.
            </p>
            <div className="pt-2 text-[11px] font-mono text-zinc-300 border-t border-zinc-800/60">
              <strong>Ajuste:</strong> Se reforzó la instrucción en el system prompt para priorizar el dolor factual subyacente sobre adjetivos superficiales.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2">
            <span className="font-mono text-amber-400 text-[11px] block font-semibold">
              Reversión de Arquitectura: Clustering por Embeddings
            </span>
            <p className="text-zinc-400 leading-relaxed">
              <strong>Intento inicial:</strong> Agrupar reseñas no supervisadas mediante embeddings vectoriales para descubrir temas emergentes.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              <strong>Fallo y Corrección:</strong> El espacio vectorial agrupó las reseñas por idioma (portugués junto, sueco junto) en vez de por tipo de problema. Se revirtió a un codebook estructurado evaluado por LLM multilingüe.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Cierre: Conexión con el Caso 2 */}
      <section className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono text-emerald-400">Cadena de Producto: Discovery → Construcción</span>
          <p className="text-xs text-zinc-300 font-sans">
            El 55% de quejas concentradas en estados de transacción y soporte ausente justificó la creación del agente.
          </p>
        </div>
        <Link
          href="/cases/agente-pagos"
          className="px-4 py-2 rounded bg-zinc-100 text-zinc-900 text-xs font-mono font-semibold hover:bg-emerald-400 transition-colors whitespace-nowrap"
        >
          Ver Caso 2: Agente de Pagos →
        </Link>
      </section>
    </main>
  );
}