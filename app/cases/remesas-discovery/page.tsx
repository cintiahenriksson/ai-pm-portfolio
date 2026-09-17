"use client";
import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
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
    nav: {
      prevLabel: "Anterior",
      prevTitle: "Todos los casos",
      prevHref: "/#casos",
      nextLabel: "Siguiente",
      nextTitle: "02 — Agente de pagos",
      nextHref: "/cases/agente-pagos",
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
    nav: {
      prevLabel: "Previous",
      prevTitle: "All case studies",
      prevHref: "/#casos",
      nextLabel: "Next",
      nextTitle: "02 — Payments support agent",
      nextHref: "/cases/agente-pagos",
    },
  },
};

export default function RemesasDiscoveryPage() {
  const { lang } = useLanguage();
  const t = content[lang] || content.es;

  return (
    <>
      <SiteHeader variant="inner" />

      <main className="text-foreground">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent/12 blur-[110px]"
          />
          <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-8">
            <div className="animate-rise space-y-5">
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-accent">
                {t.badge}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-balance">
                {t.title}
              </h1>
              <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-muted">{t.desc}</p>
            </div>

            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {t.metrics.map((m, i) => (
                <div key={i} className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{m.label}</p>
                  <p className="mt-2 font-display text-2xl sm:text-3xl tracking-tight text-accent tabular-nums">
                    {m.val}
                  </p>
                  <p className="mt-1 text-xs text-muted">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 space-y-16">
          {/* S1 */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s1.title}</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">{t.s1.p1}</p>
            <div className="rounded-2xl border-l-2 border-accent/50 bg-surface-2 p-5 space-y-2">
              <p className="text-sm font-semibold text-foreground">{t.s1.boxTitle}</p>
              <p className="text-sm leading-relaxed text-muted">{t.s1.boxDesc}</p>
            </div>
          </section>

          {/* S2 */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s2.title}</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">{t.s2.p1}</p>

            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <span className="font-display text-lg tracking-tight">{t.s2.cardTitle}</span>
                <span className="text-sm font-semibold text-accent">{t.s2.cardAgreement}</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-surface-2 p-4">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{t.s2.box1Label}</p>
                  <p className="mt-1.5 font-display text-xl tracking-tight text-accent">{t.s2.box1Val}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{t.s2.box1Sub}</p>
                </div>
                <div className="rounded-xl bg-surface-2 p-4">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{t.s2.box2Label}</p>
                  <p className="mt-1.5 font-display text-xl tracking-tight text-warm">{t.s2.box2Val}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{t.s2.box2Sub}</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-muted">{t.s2.rule}</p>
            </div>
          </section>

          {/* S3 */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s3.title}</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">{t.s3.p1}</p>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-left text-sm tabular-nums">
                <thead className="bg-surface-2 text-muted">
                  <tr className="text-[11px] uppercase tracking-[0.1em]">
                    <th className="p-4 font-semibold">{t.s3.thCode}</th>
                    <th className="p-4 font-semibold">{t.s3.thCorpus}</th>
                    <th className="p-4 font-semibold">{t.s3.thMix}</th>
                    <th className="p-4 font-semibold">{t.s3.thIncidence}</th>
                    <th className="p-4 font-semibold">{t.s3.thCost}</th>
                    <th className="p-4 text-right font-semibold">{t.s3.thScore}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-surface text-foreground/80">
                  {t.s3.rows.map((r, idx) => (
                    <tr key={idx} className={r.highlight ? "bg-accent-soft" : ""}>
                      <td className={`p-4 ${r.highlight ? "text-accent font-semibold" : "text-foreground"}`}>
                        {r.code}
                      </td>
                      <td className="p-4">{r.n}</td>
                      <td className={`p-4 ${r.highlight ? "text-accent font-semibold" : ""}`}>{r.mix}</td>
                      <td className="p-4">{r.inc}</td>
                      <td className="p-4">{r.cost}</td>
                      <td className={`p-4 text-right font-semibold ${r.highlight ? "text-accent" : "text-foreground"}`}>
                        {r.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs leading-relaxed text-muted">{t.s3.note}</p>
          </section>

          {/* S4 */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s4.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
                <p className="font-display text-base tracking-tight text-warm">{t.s4.fail1Title}</p>
                <p className="text-sm italic leading-relaxed text-muted">{t.s4.fail1Quote}</p>
                <p className="text-sm leading-relaxed text-foreground/80">{t.s4.fail1Desc}</p>
                <p className="border-t border-border pt-3 text-sm leading-relaxed text-foreground">
                  <strong className="text-accent">{t.s4.fail1Fix}</strong>
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
                <p className="font-display text-base tracking-tight text-warm">{t.s4.fail2Title}</p>
                <p className="text-sm leading-relaxed text-muted">{t.s4.fail2Attempt}</p>
                <p className="border-t border-border pt-3 text-sm leading-relaxed text-foreground/80">
                  {t.s4.fail2Fix}
                </p>
              </div>
            </div>
          </section>

          {/* S5 — next case */}
          <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent-soft/70 to-surface p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="space-y-2 max-w-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">{t.s5.badge}</p>
                <p className="text-[15px] leading-relaxed text-foreground/85">{t.s5.desc}</p>
              </div>
              <Link
                href="/cases/agente-pagos"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 hover:-translate-y-0.5 whitespace-nowrap"
              >
                {t.s5.btn.replace(" →", "")} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>

          {/* Prev / next footer */}
          <nav className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={t.nav.prevHref}
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
            >
              <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">←</span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.14em]">{t.nav.prevLabel}</span>
                <span className="block font-medium text-foreground group-hover:text-accent">{t.nav.prevTitle}</span>
              </span>
            </Link>
            <Link
              href={t.nav.nextHref}
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent sm:text-right"
            >
              <span className="sm:order-2" aria-hidden="true">→</span>
              <span className="sm:order-1">
                <span className="block text-[11px] uppercase tracking-[0.14em]">{t.nav.nextLabel}</span>
                <span className="block font-medium text-foreground group-hover:text-accent">{t.nav.nextTitle}</span>
              </span>
            </Link>
          </nav>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
