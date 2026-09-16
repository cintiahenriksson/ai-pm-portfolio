"use client";
import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  es: {
    back: "← Volver al Portfolio",
    badge: "Caso 01 • Síntesis de Research & Sizing",
    fileTag: "pipeline/codebook.v2.json",
    title: "«Por qué se van»: Síntesis de 1.500 reseñas públicas de apps de remesas",
    desc: "Extracción y codificación multilingüe (ES, EN, PT, SV) sin romper confidencialidad corporativa. Evaluación de concordancia inter-anotador (Cohen's Kappa) y sizing aritmético que conecta el dolor cualitativo directamente con el roadmap técnico.",
    metrics: [
      { label: "CORPUS PROCESADO", val: "1.500", sub: "4 apps • 4 idiomas" },
      { label: "ACUERDO HUMANO-IA", val: "κ = 0,81", sub: "Cohen's Kappa (n=225)" },
      { label: "AHORRO POR CICLO", val: "~34 h", sub: "De 40h manuales a 6h" },
      { label: "TOP DOLOR DETECTADO", val: "34,0%", sub: "Retraso en entrega" },
    ],
    s1: {
      title: "01. Problem Statement & Extracción Pública",
      p1: "El momento crítico: una persona migrante envía dinero a su familia y la transacción queda bloqueada «en proceso». Abre el chat de soporte y, en paralelo, deja una reseña de 1 estrella. Sin cuantificación sistemática, los equipos de producto priorizan sobre anécdotas recientes en lugar de atacar la causa raíz de la fuga de confianza.",
      boxTitle: "Garantía de cumplimiento y confidencialidad:",
      boxDesc: "Corpus obtenido íntegramente de feeds RSS públicos de Apple App Store y la API pública de Google Play sobre competidores directos (Remitly, Wise, WorldRemit y apps de minutos internacionales). Cero exposición de datos internos de compañía.",
    },
    s2: {
      title: "02. Metodología de Codificación & Validación Humano-Modelo",
      p1: "Los LLMs solo alcanzan fiabilidad cualitativa con taxonomías formales previas. El codebook arrancó en v1 con 8 códigos y se versionó a v2 (11 códigos) tras analizar fallos de clasificación en casos límite.",
      cardTitle: "Validación Ciega sobre Muestra Aleatoria del 15% (n = 225 reseñas)",
      cardAgreement: "Acuerdo Global: 84,4%",
      box1Label: "CÓDIGOS FACTUALES / EXPLÍCITOS",
      box1Val: "κ = 0,86 (Alto)",
      box1Sub: "TRANS_DELAY, APP_TECH, REFUND_DELAY",
      box2Label: "CÓDIGOS INTERPRETATIVOS / SUBTEXTO",
      box2Val: "κ = 0,61 (Moderado)",
      box2Sub: "SUPPORT_NO_REPLY, FRAUD_SUSP",
      rule: "Regla anti-alucinación: ningún tema entra al informe final sin al menos 3 citas textuales verbatim enlazadas.",
    },
    s3: {
      title: "03. Sizing de Oportunidades: De Reviews a Impacto de Negocio",
      p1: "Extrapolación a una base transaccional de 500.000 operaciones/mes, 3% tasa de soporte (15.000 tickets) y 10 USD de coste directo por gestión humana:",
      thCode: "Código",
      thCorpus: "Corpus (n=1.500)",
      thMix: "% Mix",
      thIncidence: "Incidencia Est.",
      thCost: "Coste Soporte",
      thScore: "Opportunity Score",
      rows: [
        { code: "TRANS_DELAY (Retraso entrega)", n: "510", mix: "34,0%", inc: "5.100 tickets/mes", cost: "51.000 USD/mes", score: "7.650", highlight: true },
        { code: "SUPPORT_NO_REPLY (Soporte bucle)", n: "315", mix: "21,0%", inc: "3.150 tickets/mes", cost: "31.500 USD/mes", score: "4.410", highlight: false },
        { code: "KYC_BLOCK (Verificación)", n: "210", mix: "14,0%", inc: "2.100 tickets/mes", cost: "21.000 USD/mes", score: "2.520", highlight: false },
        { code: "PAYOUT_FAIL (Fallo receptor)", n: "165", mix: "11,0%", inc: "1.650 tickets/mes", cost: "16.500 USD/mes", score: "2.145", highlight: false },
        { code: "REFUND_DELAY (Reembolso retenido)", n: "120", mix: "8,0%", inc: "1.200 tickets/mes", cost: "12.000 USD/mes", score: "1.920", highlight: false },
      ],
      note: "Aritmética visible: Opportunity Score = Incidencia mensual × Multiplicador de severidad de churn. Los dolores #1 y #2 representan el 55% de toda la fricción y dan origen al prototipo del Caso 2.",
    },
    s4: {
      title: "04. Galería de Fallos de Inferencia & Reversión de Arquitectura",
      fail1Title: "Fallo: Sarcasmo no detectado en modelo ligero",
      fail1Quote: "«Increíble servicio, 6 días esperando para que le llegue la medicina a mi madre»",
      fail1Desc: "El clasificador económico asignó OTHER_UNCAT (elogio) por el sesgo léxico positivo.",
      fail1Fix: "Ajuste: Se reforzó la instrucción en el system prompt para priorizar el dolor factual subyacente sobre adjetivos superficiales.",
      fail2Title: "Reversión de Arquitectura: Clustering por Embeddings",
      fail2Attempt: "Intento inicial: Agrupar reseñas no supervisadas mediante embeddings vectoriales para descubrir temas emergentes.",
      fail2Fix: "Fallo y Corrección: El espacio vectorial agrupó las reseñas por idioma (portugués junto, sueco junto) en vez de por tipo de problema. Se revirtió a un codebook estructurado evaluado por LLM multilingüe.",
    },
    s5: {
      badge: "Cadena de Producto: Discovery → Construcción",
      desc: "El 55% de quejas concentradas en estados de transacción y soporte ausente justificó la creación del agente.",
      btn: "Ver Caso 2: Agente de Pagos →",
    },
  },
  en: {
    back: "← Back to Portfolio",
    badge: "Case 01 • Research Synthesis & Opportunity Sizing",
    fileTag: "pipeline/codebook.v2.json",
    title: "“Why They Leave”: Synthesis of 1,500 Public Remittance App Reviews",
    desc: "Multilingual extraction and structured coding (ES, EN, PT, SV) without compromising corporate confidentiality. Evaluated with inter-annotator agreement (Cohen's Kappa) and mathematical sizing linking qualitative pain directly to the technical roadmap.",
    metrics: [
      { label: "PROCESSED CORPUS", val: "1,500", sub: "4 apps • 4 languages" },
      { label: "HUMAN-AI AGREEMENT", val: "κ = 0.81", sub: "Cohen's Kappa (n=225)" },
      { label: "TIME SAVINGS / SPRINT", val: "~34 h", sub: "From 40h manual to 6h" },
      { label: "TOP DETECTED PAIN", val: "34.0%", sub: "Delivery delay" },
    ],
    s1: {
      title: "01. Problem Statement & Public Extraction",
      p1: "The critical inflection point: a migrant sends money to their family and the transaction gets stuck 'in transit'. They reach out to customer support while simultaneously leaving a 1-star app review. Without systematic quantification, product teams prioritize recent anecdotes rather than solving the root cause of trust erosion.",
      boxTitle: "Compliance & Confidentiality Guarantee:",
      boxDesc: "Corpus gathered entirely from public Apple App Store RSS feeds and Google Play public APIs across direct competitors (Remitly, Wise, WorldRemit, and international calling apps). Zero exposure of internal corporate data.",
    },
    s2: {
      title: "02. Coding Methodology & Human-Model Validation",
      p1: "LLMs only achieve reliable qualitative synthesis when guided by formal taxonomies. The codebook started in v1 with 8 categories and evolved to v2 (11 categories) after auditing classification edge cases.",
      cardTitle: "Blind Validation on a 15% Random Sample (n = 225 reviews)",
      cardAgreement: "Overall Agreement: 84.4%",
      box1Label: "FACTUAL / EXPLICIT CODES",
      box1Val: "κ = 0.86 (High)",
      box1Sub: "TRANS_DELAY, APP_TECH, REFUND_DELAY",
      box2Label: "INTERPRETATIVE / SUBTEXT CODES",
      box2Val: "κ = 0.61 (Moderate)",
      box2Sub: "SUPPORT_NO_REPLY, FRAUD_SUSP",
      rule: "Anti-hallucination guardrail: no theme enters the final report without at least 3 linked verbatim customer quotes.",
    },
    s3: {
      title: "03. Opportunity Sizing: From Reviews to Business Impact",
      p1: "Extrapolated across a baseline of 500,000 monthly transactions, a 3% support contact rate (15,000 tickets), and a $10 direct cost per human touchpoint:",
      thCode: "Code",
      thCorpus: "Corpus (n=1,500)",
      thMix: "% Mix",
      thIncidence: "Est. Volume",
      thCost: "Support Cost",
      thScore: "Opportunity Score",
      rows: [
        { code: "TRANS_DELAY (Delivery delay)", n: "510", mix: "34.0%", inc: "5,100 tickets/mo", cost: "$51,000/mo", score: "7,650", highlight: true },
        { code: "SUPPORT_NO_REPLY (Support loop)", n: "315", mix: "21.0%", inc: "3,150 tickets/mo", cost: "$31,500/mo", score: "4,410", highlight: false },
        { code: "KYC_BLOCK (Verification)", n: "210", mix: "14.0%", inc: "2,100 tickets/mo", cost: "$21,000/mo", score: "2,520", highlight: false },
        { code: "PAYOUT_FAIL (Payout failure)", n: "165", mix: "11.0%", inc: "1,650 tickets/mo", cost: "$16,500/mo", score: "2,145", highlight: false },
        { code: "REFUND_DELAY (Withheld refund)", n: "120", mix: "8.0%", inc: "1,200 tickets/mo", cost: "$12,000/mo", score: "1,920", highlight: false },
      ],
      note: "Visible arithmetic: Opportunity Score = Monthly incidence × Churn severity multiplier. Pain points #1 and #2 account for 55% of all friction and inform the Case 2 prototype.",
    },
    s4: {
      title: "04. Inference Failure Gallery & Architecture Pivot",
      fail1Title: "Failure: Sarcasm undetected in lightweight model",
      fail1Quote: "“Incredible service, 6 days waiting for my mother's medicine to arrive.”",
      fail1Desc: "The cost-effective classifier assigned OTHER_UNCAT (compliment) due to surface lexical positivity.",
      fail1Fix: "Correction: System prompt instructions were updated to prioritize underlying factual delay over superficial positive adjectives.",
      fail2Title: "Architecture Pivot: Vector Embedding Clustering",
      fail2Attempt: "Initial attempt: Unsupervised clustering using vector embeddings to identify emergent topics.",
      fail2Fix: "Failure & Correction: The vector space clustered reviews by language (Portuguese together, Swedish together) rather than by problem taxonomy. Reverted to a structured codebook evaluated by a multilingual LLM.",
    },
    s5: {
      badge: "Product Chain: Discovery → Build",
      desc: "55% of complaints concentrated in transaction status and unresponsive support justified building the agent.",
      btn: "View Case 2: Support Agent →",
    },
  },
};

export default function RemesasDiscoveryPage() {
  const { lang } = useLanguage();
  const t = content[lang] || content.es;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 font-sans space-y-16 text-foreground">
      {/* Navegación y Selectores */}
      <nav className="flex items-center justify-between border-b border-border pb-5">
        <Link
          href="/"
          className="text-xs font-mono text-muted hover:text-foreground transition-colors inline-flex items-center gap-1"
        >
          {t.back}
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </nav>

      {/* Header y Métricas */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            {t.badge}
          </span>
          <span className="text-muted font-mono text-xs">{t.fileTag}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
          {t.title}
        </h1>
        <p className="text-sm text-muted max-w-3xl leading-relaxed">
          {t.desc}
        </p>

        {/* Data Strip / Métricas Clave */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-mono">
          {t.metrics.map((m, i) => (
            <div key={i} className="p-3 rounded-xl bg-surface border border-border shadow-sm">
              <span className="text-muted block text-[10px] font-semibold">{m.label}</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-lg font-bold">{m.val}</span>
              <span className="text-[10px] text-muted block mt-0.5">{m.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 1. Problem Statement y Fuente de Datos */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted border-b border-border pb-2">
          {t.s1.title}
        </h2>
        <p className="text-sm text-foreground/85 leading-relaxed font-sans">
          {t.s1.p1}
        </p>
        <div className="p-4 rounded-xl bg-surface border border-border text-xs text-muted space-y-2 shadow-sm">
          <div className="font-mono text-foreground text-[11px] font-semibold">
            {t.s1.boxTitle}
          </div>
          <p className="text-[11px] text-muted leading-relaxed font-sans">
            {t.s1.boxDesc}
          </p>
        </div>
      </section>

      {/* 2. Metodología: Codebook Versionado y Kappa */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted border-b border-border pb-2">
          {t.s2.title}
        </h2>
        <p className="text-sm text-foreground/85 leading-relaxed font-sans">
          {t.s2.p1}
        </p>

        {/* Tabla de Resultados de Validación */}
        <div className="p-5 rounded-2xl bg-surface border border-border space-y-3 shadow-sm">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-mono font-bold text-foreground">
              {t.s2.cardTitle}
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{t.s2.cardAgreement}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-background rounded-lg border border-border">
              <span className="text-muted block text-[10px]">{t.s2.box1Label}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t.s2.box1Val}</span>
              <span className="text-muted block text-[11px] mt-1">
                {t.s2.box1Sub}
              </span>
            </div>
            <div className="p-3 bg-background rounded-lg border border-border">
              <span className="text-muted block text-[10px]">{t.s2.box2Label}</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{t.s2.box2Val}</span>
              <span className="text-muted block text-[11px] mt-1">
                {t.s2.box2Sub}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-muted font-mono pt-1">
            {t.s2.rule}
          </p>
        </div>
      </section>

      {/* 3. Sizing de Oportunidades con Aritmética Visible */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted border-b border-border pb-2">
          {t.s3.title}
        </h2>
        <p className="text-sm text-foreground/85 leading-relaxed font-sans">
          {t.s3.p1}
        </p>

        <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface text-muted border-b border-border">
              <tr>
                <th className="p-3 font-semibold">{t.s3.thCode}</th>
                <th className="p-3 font-semibold">{t.s3.thCorpus}</th>
                <th className="p-3 font-semibold">{t.s3.thMix}</th>
                <th className="p-3 font-semibold">{t.s3.thIncidence}</th>
                <th className="p-3 font-semibold">{t.s3.thCost}</th>
                <th className="p-3 text-right font-semibold">{t.s3.thScore}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface text-foreground/85">
              {t.s3.rows.map((r, idx) => (
                <tr
                  key={idx}
                  className={r.highlight ? "bg-emerald-500/10 font-semibold" : "hover:bg-background/50 transition-colors"}
                >
                  <td className={`p-3 ${r.highlight ? "text-emerald-700 dark:text-emerald-300" : "text-foreground"}`}>
                    {r.code}
                  </td>
                  <td className="p-3">{r.n}</td>
                  <td className={`p-3 ${r.highlight ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-foreground"}`}>
                    {r.mix}
                  </td>
                  <td className="p-3">{r.inc}</td>
                  <td className="p-3">{r.cost}</td>
                  <td className={`p-3 text-right font-bold ${r.highlight ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                    {r.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] font-mono text-muted pt-1">
          {t.s3.note}
        </p>
      </section>

      {/* 4. Galería de Fallos y Reversión Metodológica */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-muted border-b border-border pb-2">
          {t.s4.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-5 rounded-xl bg-surface border border-border space-y-2 shadow-sm">
            <span className="font-mono text-rose-600 dark:text-rose-400 text-[11px] block font-bold">
              {t.s4.fail1Title}
            </span>
            <p className="text-muted leading-relaxed italic">
              {t.s4.fail1Quote}
            </p>
            <p className="text-foreground/80 leading-relaxed">
              {t.s4.fail1Desc}
            </p>
            <div className="pt-2 text-[11px] font-mono text-foreground border-t border-border">
              <strong>{t.s4.fail1Fix}</strong>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-surface border border-border space-y-2 shadow-sm">
            <span className="font-mono text-amber-600 dark:text-amber-400 text-[11px] block font-bold">
              {t.s4.fail2Title}
            </span>
            <p className="text-muted leading-relaxed">
              {t.s4.fail2Attempt}
            </p>
            <p className="text-foreground/80 leading-relaxed">
              {t.s4.fail2Fix}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Cierre: Conexión con el Caso 2 */}
      <section className="p-6 rounded-2xl bg-surface border border-border shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{t.s5.badge}</span>
          <p className="text-xs text-muted font-sans">{t.s5.desc}</p>
        </div>
        <Link
          href="/cases/agente-pagos"
          className="px-4 py-2.5 rounded-lg bg-foreground text-background text-xs font-mono font-semibold hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm"
        >
          {t.s5.btn}
        </Link>
      </section>
    </main>
  );
}