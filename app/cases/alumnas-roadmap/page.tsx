"use client";
import React from "react";
import Link from "next/link";
import RiceCalculator from "@/components/RiceCalculator";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  es: {
    back: "← Volver al Portfolio",
    badge: "Caso 03 • Roadmap guiado por feedback & RICE",
    title: "Del feedback de mis alumnas a un roadmap de producto digital",
    subtitle:
      "Una simulación anonimizada de estrategia de producto para un producto de práctica de mindfulness. A partir de patrones recurrentes de feedback de aprendices, el caso modela cómo separar la preferencia declarada del comportamiento, priorizar bajo incertidumbre y validar un bucle de práctica de menor esfuerzo antes de comprometerse con una app móvil nativa.",
    caseNoteLabel: "Nota del caso",
    caseNote:
      "Este es un caso de portfolio basado en un escenario. Las señales de aprendices, las métricas y los inputs de RICE son anonimizados e ilustrativos; están diseñados para demostrar el razonamiento de producto, el plan de validación y los trade-offs, no para representar el rendimiento real de un producto.",
    metrics: [
      { label: "MODELO DE EVIDENCIA", val: "Basado en escenario", sub: "Señales de aprendices informadas por patrones" },
      { label: "TRADE-OFF CLAVE", val: "−7,5 sem", sub: "Validar audio antes de construir nativo" },
      { label: "BUCLE DE APRENDIZAJE MÁS RÁPIDO", val: "2,5 sem", sub: "Estimación ilustrativa de setup del MVP" },
      { label: "TEST DE SENSIBILIDAD", val: "Resiliente", sub: "Ranking sin cambios con confianza al −50%" },
    ],
    framing: {
      qLabel: "Pregunta de decisión",
      qText:
        "En un producto de aprendizaje de mindfulness, ¿qué intervención debería probarse primero para ayudar a las personas a sostener una práctica en solitario entre sesiones guiadas, sin comprometerse prematuramente con una app nativa de 10 semanas de desarrollo?",
      outLabel: "Resultado principal a validar",
      outText:
        "Retención de práctica a 14 días: la proporción de participantes que completan al menos dos sesiones de meditación en solitario de 15 minutos o más dentro de los 14 días posteriores a una clase guiada.",
      statusLabel: "Estado del caso",
      statusText:
        "Simulación de planificación. No se reivindica ninguna mejora de retención, resultado de ingresos ni resultado de experimento.",
    },
    s1: {
      title: "01. Diseño de discovery: reduciendo el sesgo de cortesía",
      p1: "El problema de producto en este escenario no es simplemente la falta de contenido de meditación. Las personas salen de las sesiones guiadas con la intención de continuar por su cuenta, pero a menudo pierden el impulso antes de la siguiente sesión. La pregunta clave, por tanto, no es «¿Qué funcionalidad se pide más?», sino «¿Qué les impide empezar a practicar cuando están solas?».",
      p2: "El enfoque de discovery se modela sobre patrones recurrentes comunes en contextos de enseñanza y bienestar digital: las personas pueden expresar entusiasmo por un recurso completo, mientras que su comportamiento real favorece el apoyo inmediato y de baja fricción. Para reducir este sesgo, la encuesta simulada se estructura en torno al comportamiento reciente, la fricción inmediata, los workarounds existentes y una pequeña señal de compromiso.",
      evidenceTitle: "Modelo de evidencia usado en esta simulación",
      evidenceCols: [
        {
          title: "Patrones de aprendices en sesiones guiadas",
          body: "Observaciones anonimizadas y generalizadas sobre la dificultad de mantener la práctica en solitario entre sesiones.",
        },
        {
          title: "Patrones de feedback social",
          body: "Ejemplos simulados de preferencia declarada de funcionalidades, incluida la demanda de una app dedicada.",
        },
        {
          title: "Patrones de compra de producto digital",
          body: "Señales de compromiso ilustrativas usadas para distinguir el interés de la disposición a actuar.",
        },
      ],
      evidenceFootnote:
        "En este caso no se presentan datos a nivel individual, registros de clientes ni resultados comerciales reales.",
      surveyTitle: "Guion de discovery de ejemplo: diseñado para reducir el sesgo de preferencia hipotética",
      questions: [
        {
          text: "En los últimos 14 días, ¿cuántas veces dedicaste al menos 15 minutos a practicar por tu cuenta?",
          caption: "Modela una pregunta de práctica base en lugar de preguntar por la aspiración.",
        },
        {
          text: "Piensa en la última vez que quisiste practicar y no lo hiciste. ¿Qué pasó en los 10 minutos antes de decidir no hacerlo?",
          caption: "Modela una pregunta de fricción inmediata.",
        },
        {
          text: "Cuando estás sola y quieres practicar, ¿qué usas hoy para empezar?",
          caption: "Modela el descubrimiento de workarounds y alternativas existentes.",
        },
        {
          text: "¿Qué formato haría más fácil empezar a practicar hoy? Elige uno: un audio de 5 minutos, una clase en vídeo de 60 minutos, un grupo de rendición de cuentas entre pares, o una app móvil.",
          caption: "Modela una elección forzada entre formatos de entrega distintos.",
        },
        {
          text: "¿Reservarías una plaza early-bird en un piloto por 15 €, o esperarías a un lanzamiento abierto?",
          caption: "Modela una pequeña señal de compromiso. No reporta reservas reales.",
        },
      ],
      testTitle: "Qué probaría este diseño de discovery",
      testBullets: [
        "Si la frecuencia de práctica en solitario es un problema de retención relevante.",
        "Si la fricción de inicio es más importante que la disponibilidad de contenido.",
        "Si las personas ya dependen de workarounds informales.",
        "Si una app nativa solicitada refleja una necesidad real no cubierta o una solución por defecto familiar.",
        "Si el interés declarado se mantiene cuando se introduce un pequeño compromiso.",
      ],
    },
    s2: {
      title: "02. Priorización RICE basada en escenario",
      badge: "Aritmética reproducible",
      desc: "El siguiente modelo RICE es ilustrativo. Traduce las señales de aprendices del escenario en supuestos de planificación explícitos para que el trade-off pueda inspeccionarse, cuestionarse y someterse a estrés. No se presenta como un pronóstico ni como rendimiento de negocio medido.",
      readTitle: "Supuestos de RICE",
      formulaLabel: "Fórmula",
      formula: "RICE = Alcance × Impacto × Confianza ÷ Esfuerzo",
      interpLabel: "Interpretación",
      interp:
        "Alcance = personas alcanzadas de forma ilustrativa en 90 días. Impacto = efecto esperado sobre el resultado de retención de práctica a 14 días. Confianza = fuerza del supuesto del escenario. Esfuerzo = semanas de calendario estimadas para preparar, lanzar y medir.",
      readNote:
        "Todos los inputs son estimaciones directivas. El modelo se usa para elegir el siguiente paso de aprendizaje, no para reivindicar certeza.",
      stressTitle: "Test de estrés: confianza reducida un 50%",
      stressHead: ["Iniciativa", "RICE base", "RICE con confianza −50%", "Ranking"],
      stressRows: [
        ["MVP de micro-audio", "432", "216", "Sin cambios"],
        ["Grupo de Telegram", "261", "131", "Sin cambios"],
        ["App nativa", "30", "15", "Sin cambios"],
        ["Archivo de vídeo", "15", "8", "Sin cambios"],
      ],
      stressConclusion:
        "Conclusión del escenario: incluso reduciendo a la mitad cada supuesto de confianza, el orden de prioridades no cambia. El MVP de micro-audio sigue siendo la forma más rápida de probar la hipótesis de retención de práctica, mientras que la app nativa sigue siendo una apuesta de esfuerzo mucho mayor.",
    },
    s3: {
      title: "03. Roadmap de validación: aprende antes de escalar",
      intro:
        "RICE ordena apuestas; no prueba demanda. Por eso el roadmap empieza con la intervención más pequeña capaz de probar la hipótesis conductual central, y solo aumenta el alcance del producto cuando nueva evidencia lo justifica.",
      horizons: [
        {
          title: "Horizonte 1 — Validar el bucle de práctica",
          time: "0–2,5 semanas",
          initiative: "Rutinas guiadas de micro-audio de 5 min + check-ins ligeros por mensajería",
          purpose:
            "Probar si el apoyo guiado breve y un recordatorio ligero de rendición de cuentas reducen la fricción de inicio entre sesiones guiadas.",
          hypothesis:
            "Si las personas reciben una práctica guiada de 5 minutos más un check-in ligero, entonces su retención de práctica en solitario a 14 días podría mejorar respecto a la base de partida.",
          measured:
            "Frecuencia de práctica en solitario, activación del primer audio, finalización de la primera semana, respuesta al check-in y disposición a continuar.",
          gate:
            "Continuar solo si el experimento produce suficiente evidencia de engagement como para justificar probar una capa adicional de rendición de cuentas. En este caso simulado no se afirma ningún objetivo de mejora.",
        },
        {
          title: "Horizonte 2 — Probar la rendición de cuentas como capa añadida",
          time: "Semanas 3–8",
          initiative: "Serie estructurada de micro-audios + grupo de rendición de cuentas entre pares en Telegram",
          purpose: "Probar si la rendición de cuentas entre pares mejora la consistencia de práctica más allá del bucle de audio individual.",
          measured: "Consistencia de práctica a 28 días, participación activa, necesidades de moderación y disposición a pagar.",
          gate: "Continuar solo si la capa social produce un valor que supere el coste continuo de moderación.",
        },
        {
          title: "Horizonte 3 — Considerar inversiones de escala",
          time: "Tras la validación conductual",
          initiative: "Archivo on-demand, comunidad de pago o app nativa",
          purpose:
            "Explorar formatos de mayor inversión solo después de demostrar un bucle de práctica repetible y una señal significativa de disposición a pagar.",
          gate:
            "Reevaluar la app nativa solo si la evidencia futura sugiere que la funcionalidad nativa —no la fricción de contenido, la fricción de inicio o la rendición de cuentas— es la restricción restante.",
        },
      ],
      purposeLabel: "Propósito",
      hypothesisLabel: "Hipótesis",
      measuredLabel: "Qué se mediría",
      gateLabel: "Puerta de decisión",
    },
    s4: {
      title: "04. Trade-offs y aprendizaje metodológico",
      card1: {
        eyebrow: "Trade-off incómodo",
        title: "Por qué la app nativa no es la primera apuesta",
        body: "En el escenario, el 42% de los encuestados ilustrativos de una encuesta social elige una app móvil dedicada. Esto se trata intencionadamente como preferencia declarada, no como demanda validada. Una app nativa puede sonar como la solución completa, pero no prueba directamente que la fricción central sea la ausencia de software nativo.",
        bullets: [
          "La app se modela en 10 semanas de esfuerzo frente a 2,5 semanas para la vía de validación de micro-audio.",
          "La hipótesis de causa raíz del escenario es la falta de tiempo, la fricción de inicio y la rendición de cuentas, no la falta de un icono de app.",
          "Con la confianza base, la app puntúa 30 frente a 432 del MVP de micro-audio.",
          "Con un descuento de confianza del 50%, puntúa 15 frente a 216.",
          "La app se aplaza como opción posterior, no se rechaza permanentemente.",
        ],
        footer:
          "La decisión clave de PM es ganarse el derecho a construir la app mediante evidencia, en lugar de tratar la popularidad como una justificación de inversión suficiente.",
      },
      card2: {
        eyebrow: "Pivote metodológico",
        title: "Por qué una preferencia por una videoteca no es suficiente",
        body: "En la v1 de la encuesta simulada, el 92% de los encuestados responde que sí a: «¿Te gustaría tener acceso a una videoteca on-demand?». El caso modela un fallo habitual de la investigación de producto: las personas a menudo respaldan una opción futura atractiva sin demostrar que cambiará su comportamiento.",
        body2:
          "En lugar de reportar la cifra ilustrativa de «finalización por debajo del 8% tras siete días» como un resultado real, se etiqueta claramente como un ejemplo del riesgo que este diseño de discovery pretende evitar.",
        calloutLabel: "Modo de fallo ilustrativo, no datos reales reportados",
        calloutBody:
          "Una tasa alta de «sí» a una videoteca on-demand puede coexistir con un bajo seguimiento porque la pregunta mide aspiración y cortesía, no comportamiento, esfuerzo ni compromiso.",
        bullets: [
          "Sustituir preguntas de preferencia hipotética por preguntas de comportamiento reciente.",
          "Preguntar por el momento exacto en que la práctica se rompe.",
          "Comparar formatos mediante elección forzada.",
          "Introducir una pequeña señal de compromiso antes de tratar la demanda como validada.",
        ],
      },
      card3: {
        eyebrow: "Decisión de secuenciación",
        title: "Por qué Telegram es el segundo, no el primero",
        body: "La rendición de cuentas entre pares puntúa segunda en el escenario. No es el primer MVP porque introduce necesidades recurrentes de moderación y hace que el experimento dependa de la participación del grupo. La primera prueba aísla si el audio guiado de menor fricción puede resolver suficiente del problema de inicio antes de añadir complejidad operativa.",
      },
    },
    s5: {
      title: "05. Qué demuestra este caso",
      text: "Este caso no es una reivindicación de product-market fit ni de rendimiento de negocio real. Demuestra un enfoque de gestión de producto: definir el comportamiento a cambiar, identificar supuestos, distinguir señales de demanda por su fuerza probatoria, priorizar de forma transparente, probar el ranking bajo incertidumbre y secuenciar la inversión en torno al aprendizaje.",
      caps: [
        { title: "Disciplina de discovery", body: "Pasa de las funcionalidades deseadas al comportamiento reciente, la fricción y los workarounds." },
        { title: "Calibración de evidencia", body: "Separa la preferencia declarada, las señales de compromiso y los resultados validados." },
        { title: "Calidad de decisión", body: "Usa RICE como un modelo de supuestos transparente, y luego somete el ranking a estrés." },
        { title: "Secuenciación del roadmap", body: "Elige el bucle de aprendizaje viable más pequeño antes que apuestas de escala de mayor coste." },
      ],
    },
    closing: {
      label: "Contexto de portfolio",
      text: "Este escenario demuestra la priorización informada por feedback y la secuenciación de roadmap. Complementa los otros casos del portfolio sobre síntesis de investigación, evaluación de producto de IA y decisiones de producto basadas en evidencia.",
      btn: "Volver a la Home del Portfolio",
    },
    nav: {
      prevLabel: "Anterior",
      prevTitle: "02 — Agente de pagos",
      prevHref: "/cases/agente-pagos",
      nextLabel: "Siguiente",
      nextTitle: "04 — Señales de retención",
      nextHref: "/cases/retention-signals",
    },
  },
  en: {
    back: "← Back to Portfolio",
    badge: "Case 03 • Feedback-Driven Roadmap & RICE",
    title: "From Student Feedback to a Digital Product Roadmap",
    subtitle:
      "An anonymised product strategy simulation for a mindfulness practice product. Informed by recurring learner-feedback patterns, the case models how to separate stated preference from behaviour, prioritise under uncertainty and validate a lower-effort practice loop before committing to a native mobile app.",
    caseNoteLabel: "Case note",
    caseNote:
      "This is a scenario-based portfolio case. The learner signals, metrics and RICE inputs are anonymised and illustrative; they are designed to demonstrate the product reasoning, validation plan and trade-offs—not to represent live product performance.",
    metrics: [
      { label: "EVIDENCE MODEL", val: "Scenario-based", sub: "Pattern-informed learner signals" },
      { label: "KEY TRADE-OFF", val: "−7.5 weeks", sub: "Validate audio before building native" },
      { label: "FASTEST LEARNING LOOP", val: "2.5 weeks", sub: "Illustrative MVP setup estimate" },
      { label: "SENSITIVITY TEST", val: "Resilient", sub: "Ranking unchanged at −50% confidence" },
    ],
    framing: {
      qLabel: "Decision question",
      qText:
        "In a mindfulness learning product, which intervention should be tested first to help learners sustain a solo practice between guided sessions—without prematurely committing to a 10-week native-app build?",
      outLabel: "Primary outcome to validate",
      outText:
        "14-day practice retention: the share of participants completing at least two solo meditation sessions of 15 minutes or more within 14 days after a guided class.",
      statusLabel: "Case status",
      statusText: "Planning simulation. No retention uplift, revenue outcome or experiment result is claimed.",
    },
    s1: {
      title: "01. Discovery Design: Reducing Courtesy Bias",
      p1: "The product problem in this scenario is not simply a lack of meditation content. Learners leave guided sessions intending to continue on their own, yet often lose momentum before the next session. The key question is therefore not “Which feature do people request most?” but “What prevents them from beginning a practice when they are alone?”",
      p2: "The discovery approach is modelled on recurring patterns common in teaching and digital-wellness contexts: people may express enthusiasm for a comprehensive resource, while their actual behaviour favours low-friction, immediate support. To reduce this bias, the simulated survey is structured around recent behaviour, immediate friction, existing workarounds and a small commitment signal.",
      evidenceTitle: "Evidence model used in this simulation",
      evidenceCols: [
        {
          title: "Guided-session learner patterns",
          body: "Anonymised, generalised observations about difficulty maintaining solo practice between sessions.",
        },
        {
          title: "Social feedback patterns",
          body: "Simulated examples of stated feature preference, including demand for a dedicated app.",
        },
        {
          title: "Digital-product purchasing patterns",
          body: "Illustrative commitment signals used to distinguish interest from willingness to act.",
        },
      ],
      evidenceFootnote:
        "No individual-level data, customer records or live commercial results are presented in this case.",
      surveyTitle: "Example discovery script: designed to reduce hypothetical-preference bias",
      questions: [
        {
          text: "In the last 14 days, how many times did you spend at least 15 minutes practising on your own?",
          caption: "Models a baseline-practice question rather than asking about aspiration.",
        },
        {
          text: "Think about the last time you intended to practise but did not. What happened in the 10 minutes before you decided not to?",
          caption: "Models an immediate-friction question.",
        },
        {
          text: "When you are alone and want to practise, what do you use today to get started?",
          caption: "Models discovery of existing workarounds and alternatives.",
        },
        {
          text: "Which format would make it easiest to begin a practice today? Choose one: a 5-minute audio, a 60-minute video class, a peer accountability group, or a mobile app.",
          caption: "Models a forced choice between distinct delivery formats.",
        },
        {
          text: "Would you reserve an early-bird place in a pilot for €15, or wait for an open launch?",
          caption: "Models a small commitment signal. It does not report actual reservations.",
        },
      ],
      testTitle: "What this discovery design would test",
      testBullets: [
        "Whether solo-practice frequency is a meaningful retention problem.",
        "Whether initiation friction is more important than content availability.",
        "Whether learners already rely on informal workarounds.",
        "Whether a requested native app reflects a true unmet need or a familiar default solution.",
        "Whether stated interest holds when a small commitment is introduced.",
      ],
    },
    s2: {
      title: "02. Scenario-Based RICE Prioritisation",
      badge: "Reproducible arithmetic",
      desc: "The following RICE model is illustrative. It translates the scenario’s learner signals into explicit planning assumptions so that the trade-off can be inspected, challenged and stress-tested. It is not presented as a forecast or as measured business performance.",
      readTitle: "RICE assumptions",
      formulaLabel: "Formula",
      formula: "RICE = Reach × Impact × Confidence ÷ Effort",
      interpLabel: "Interpretation",
      interp:
        "Reach = illustrative people reached in 90 days. Impact = expected effect on the 14-day practice-retention outcome. Confidence = strength of the scenario assumption. Effort = estimated calendar weeks to prepare, launch and measure.",
      readNote: "All inputs are directional estimates. The model is used to choose the next learning step, not to claim certainty.",
      stressTitle: "Stress test: confidence reduced by 50%",
      stressHead: ["Initiative", "Base RICE", "RICE at −50% Confidence", "Ranking"],
      stressRows: [
        ["Micro-audio MVP", "432", "216", "Unchanged"],
        ["Telegram group", "261", "131", "Unchanged"],
        ["Native app", "30", "15", "Unchanged"],
        ["Video archive", "15", "8", "Unchanged"],
      ],
      stressConclusion:
        "Scenario conclusion: even when every confidence assumption is cut in half, the order of priorities does not change. The micro-audio MVP remains the fastest way to test the practice-retention hypothesis, while the native app remains a much higher-effort bet.",
    },
    s3: {
      title: "03. Validation Roadmap: Learn Before You Scale",
      intro:
        "RICE ranks bets; it does not prove demand. The roadmap therefore begins with the smallest intervention that can test the central behavioural hypothesis, and only increases product scope when new evidence justifies it.",
      horizons: [
        {
          title: "Horizon 1 — Validate the practice loop",
          time: "0–2.5 weeks",
          initiative: "5-minute guided micro-audio routines + lightweight messaging check-ins",
          purpose:
            "Test whether brief guided support and a lightweight accountability prompt reduce initiation friction between guided sessions.",
          hypothesis:
            "If learners receive a 5-minute guided practice plus a lightweight check-in, then their 14-day solo-practice retention may improve relative to the starting baseline.",
          measured:
            "Solo-practice frequency, first-audio activation, first-week completion, check-in response and willingness to continue.",
          gate:
            "Continue only if the experiment produces enough engagement evidence to justify testing an additional accountability layer. No uplift target is asserted in this mock case.",
        },
        {
          title: "Horizon 2 — Test accountability as an added layer",
          time: "Weeks 3–8",
          initiative: "Structured micro-audio series + Telegram peer accountability group",
          purpose: "Test whether peer accountability improves practice consistency beyond the individual audio loop.",
          measured: "28-day practice consistency, active participation, moderation needs and willingness to pay.",
          gate: "Continue only if the social layer produces value that outweighs the ongoing moderation cost.",
        },
        {
          title: "Horizon 3 — Consider scale investments",
          time: "After behavioural validation",
          initiative: "On-demand archive, paid community or native app",
          purpose:
            "Explore higher-investment formats only after a repeatable practice loop and a meaningful willingness-to-pay signal are demonstrated.",
          gate:
            "Reassess the native app only if future evidence suggests that native functionality—not content friction, initiation friction or accountability—is the remaining constraint.",
        },
      ],
      purposeLabel: "Purpose",
      hypothesisLabel: "Hypothesis",
      measuredLabel: "What would be measured",
      gateLabel: "Decision gate",
    },
    s4: {
      title: "04. Trade-Offs and Methodological Learning",
      card1: {
        eyebrow: "Uncomfortable trade-off",
        title: "Why the native app is not the first bet",
        body: "In the scenario, 42% of illustrative social-poll respondents select a dedicated mobile app. This is intentionally treated as stated preference, not as validated demand. A native app may sound like the complete solution, but it does not directly prove that the core friction is the absence of native software.",
        bullets: [
          "The app is modelled at 10 weeks of effort versus 2.5 weeks for the micro-audio validation path.",
          "The scenario’s root-cause hypothesis is lack of time, initiation friction and accountability—not a missing app icon.",
          "At base confidence, the app scores 30 versus 432 for the micro-audio MVP.",
          "At a 50% confidence discount, it scores 15 versus 216.",
          "The app is deferred as a later option, not permanently rejected.",
        ],
        footer:
          "The key PM decision is to earn the right to build the app through evidence, rather than treating popularity as a sufficient investment case.",
      },
      card2: {
        eyebrow: "Methodological pivot",
        title: "Why a video-library preference is not enough",
        body: "In the simulated survey v1, 92% of respondents say yes to: “Would you like access to an on-demand video library?” The case models a familiar product-research failure: people often endorse an appealing future option without demonstrating that it will change their behaviour.",
        body2:
          "Rather than reporting the illustrative “below 8% completion after seven days” figure as a real outcome, label it clearly as an example of the risk this discovery design is intended to avoid.",
        calloutLabel: "Illustrative failure mode, not reported live data",
        calloutBody:
          "A high “yes” rate to an on-demand library can coexist with low follow-through because the question measures aspiration and politeness, not behaviour, effort or commitment.",
        bullets: [
          "Replace hypothetical preference questions with recent-behaviour questions.",
          "Ask about the exact moment practice breaks down.",
          "Compare formats through forced choice.",
          "Introduce a small commitment signal before treating demand as validated.",
        ],
      },
      card3: {
        eyebrow: "Sequencing decision",
        title: "Why Telegram is second, not first",
        body: "Peer accountability scores second in the scenario. It is not the first MVP because it introduces recurring moderation needs and makes the experiment dependent on group participation. The first test isolates whether lower-friction guided audio can solve enough of the initiation problem before operational complexity is added.",
      },
    },
    s5: {
      title: "05. What This Case Demonstrates",
      text: "This case is not a claim of product-market fit or live business performance. It demonstrates a product-management approach: define the behaviour to change, identify assumptions, distinguish demand signals by their evidentiary strength, prioritise transparently, test the ranking under uncertainty and sequence investment around learning.",
      caps: [
        { title: "Discovery discipline", body: "Moves from desired features to recent behaviour, friction and workarounds." },
        { title: "Evidence calibration", body: "Separates stated preference, commitment signals and validated outcomes." },
        { title: "Decision quality", body: "Uses RICE as a transparent assumption model, then stress-tests the ranking." },
        { title: "Roadmap sequencing", body: "Chooses the smallest viable learning loop before higher-cost scale bets." },
      ],
    },
    closing: {
      label: "Portfolio context",
      text: "This scenario demonstrates feedback-informed prioritisation and roadmap sequencing. It complements the portfolio’s other cases on research synthesis, AI-product evaluation and evidence-led product decisions.",
      btn: "Return to Portfolio Home",
    },
    nav: {
      prevLabel: "Previous",
      prevTitle: "02 — Payments support agent",
      prevHref: "/cases/agente-pagos",
      nextLabel: "Next",
      nextTitle: "04 — Retention Signals",
      nextHref: "/cases/retention-signals",
    },
  },
};

export default function AlumnasRoadmapPage() {
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
              <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-muted">{t.subtitle}</p>
            </div>

            {/* Case note banner */}
            <div className="mt-8 rounded-2xl border border-accent/25 bg-accent-soft/40 p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{t.caseNoteLabel}</p>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/85">{t.caseNote}</p>
            </div>

            {/* Summary metrics */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {t.metrics.map((m, i) => (
                <div key={i} className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted leading-snug">{m.label}</p>
                  <p
                    className={`mt-2 font-display text-xl sm:text-2xl tracking-tight ${
                      i === 1 ? "text-warm" : "text-accent"
                    }`}
                  >
                    {m.val}
                  </p>
                  <p className="mt-1 text-xs text-muted leading-snug">{m.sub}</p>
                </div>
              ))}
            </div>

            {/* Decision framing */}
            <div className="mt-6 rounded-2xl border border-border bg-surface p-6 sm:p-7 grid gap-5 sm:grid-cols-3">
              <div className="space-y-1.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{t.framing.qLabel}</p>
                <p className="text-sm leading-relaxed text-foreground/85">{t.framing.qText}</p>
              </div>
              <div className="space-y-1.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{t.framing.outLabel}</p>
                <p className="text-sm leading-relaxed text-foreground/85">{t.framing.outText}</p>
              </div>
              <div className="space-y-1.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{t.framing.statusLabel}</p>
                <p className="text-sm leading-relaxed text-foreground/85">{t.framing.statusText}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 space-y-16">
          {/* S1 — discovery design */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s1.title}</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">{t.s1.p1}</p>
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted">{t.s1.p2}</p>

            {/* Evidence model card */}
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7 space-y-4">
              <p className="text-sm font-semibold text-foreground">{t.s1.evidenceTitle}</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {t.s1.evidenceCols.map((c, i) => (
                  <div key={i} className="rounded-xl border border-border bg-surface-2 p-4 space-y-2">
                    <p className="text-sm font-semibold text-accent">{c.title}</p>
                    <p className="text-xs leading-relaxed text-muted">{c.body}</p>
                  </div>
                ))}
              </div>
              <p className="border-t border-border pt-3 text-xs leading-relaxed text-muted">{t.s1.evidenceFootnote}</p>
            </div>

            {/* Discovery script */}
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7 space-y-4">
              <p className="text-sm font-semibold text-foreground">{t.s1.surveyTitle}</p>
              <ol className="space-y-4">
                {t.s1.questions.map((q, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="font-display text-xl leading-none text-accent/50">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm leading-relaxed text-foreground">{q.text}</p>
                      <p className="text-xs leading-relaxed text-accent/80">{q.caption}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* What this would test */}
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7 space-y-3">
              <p className="text-sm font-semibold text-foreground">{t.s1.testTitle}</p>
              <ul className="space-y-2">
                {t.s1.testBullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* S2 — RICE */}
          <section className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s2.title}</h2>
              <span className="font-mono text-xs text-accent">{t.s2.badge}</span>
            </div>
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted">{t.s2.desc}</p>

            {/* How to read the model */}
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7 space-y-4">
              <p className="text-sm font-semibold text-foreground">{t.s2.readTitle}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{t.s2.formulaLabel}</p>
                  <p className="font-mono text-sm leading-relaxed text-foreground">{t.s2.formula}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{t.s2.interpLabel}</p>
                  <p className="text-sm leading-relaxed text-muted">{t.s2.interp}</p>
                </div>
              </div>
              <p className="border-t border-border pt-3 text-xs leading-relaxed text-muted">{t.s2.readNote}</p>
            </div>

            <RiceCalculator />

            {/* Static stress test */}
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7 space-y-4">
              <p className="text-sm font-semibold text-foreground">{t.s2.stressTitle}</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-border rounded-lg overflow-hidden text-xs">
                  <thead className="bg-surface-2 text-muted text-[11px]">
                    <tr className="border-b border-border">
                      {t.s2.stressHead.map((h, i) => (
                        <th key={i} scope="col" className={`p-3 ${i === 0 ? "" : "text-center"}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-foreground/80">
                    {t.s2.stressRows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={`p-3 ${ci === 0 ? "font-medium text-foreground" : "text-center tabular-nums font-mono"}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm leading-relaxed text-foreground/85">{t.s2.stressConclusion}</p>
            </div>
          </section>

          {/* S3 — roadmap */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s3.title}</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-muted">{t.s3.intro}</p>
            <div className="grid gap-4 lg:grid-cols-3">
              {t.s3.horizons.map((h, i) => (
                <div key={i} className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-3">
                  <div className="space-y-1.5">
                    <span className="font-mono text-[11px] text-accent">{h.time}</span>
                    <p className="font-display text-lg tracking-tight text-foreground text-balance">{h.title}</p>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-foreground">{h.initiative}</p>
                  <div className="space-y-2.5 text-xs leading-relaxed">
                    <div>
                      <p className="font-mono uppercase tracking-[0.14em] text-muted">{t.s3.purposeLabel}</p>
                      <p className="mt-0.5 text-muted">{h.purpose}</p>
                    </div>
                    {"hypothesis" in h && h.hypothesis && (
                      <div>
                        <p className="font-mono uppercase tracking-[0.14em] text-muted">{t.s3.hypothesisLabel}</p>
                        <p className="mt-0.5 text-muted">{h.hypothesis}</p>
                      </div>
                    )}
                    {"measured" in h && h.measured && (
                      <div>
                        <p className="font-mono uppercase tracking-[0.14em] text-muted">{t.s3.measuredLabel}</p>
                        <p className="mt-0.5 text-muted">{h.measured}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-auto rounded-xl border border-accent/25 bg-accent-soft/40 p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">{t.s3.gateLabel}</p>
                    <p className="mt-1 text-xs leading-relaxed text-foreground/85">{h.gate}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* S4 — trade-offs */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s4.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Card 1 */}
              <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-warm">{t.s4.card1.eyebrow}</p>
                <p className="font-display text-lg tracking-tight text-foreground">{t.s4.card1.title}</p>
                <p className="text-sm leading-relaxed text-muted">{t.s4.card1.body}</p>
                <ul className="space-y-2">
                  {t.s4.card1.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warm" />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="border-t border-border pt-3 text-sm leading-relaxed text-foreground">{t.s4.card1.footer}</p>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-warm">{t.s4.card2.eyebrow}</p>
                <p className="font-display text-lg tracking-tight text-foreground">{t.s4.card2.title}</p>
                <p className="text-sm leading-relaxed text-muted">{t.s4.card2.body}</p>
                <p className="text-sm leading-relaxed text-muted">{t.s4.card2.body2}</p>
                <div className="rounded-xl border border-warm/30 bg-warm/10 p-4 space-y-1.5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-warm">{t.s4.card2.calloutLabel}</p>
                  <p className="text-sm leading-relaxed text-foreground/85">{t.s4.card2.calloutBody}</p>
                </div>
                <ul className="space-y-2">
                  {t.s4.card2.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card 3 — sequencing */}
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{t.s4.card3.eyebrow}</p>
              <p className="font-display text-lg tracking-tight text-foreground">{t.s4.card3.title}</p>
              <p className="max-w-3xl text-sm leading-relaxed text-muted">{t.s4.card3.body}</p>
            </div>
          </section>

          {/* S5 — what this demonstrates */}
          <section className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.s5.title}</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">{t.s5.text}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.s5.caps.map((c, i) => (
                <div key={i} className="rounded-2xl border border-border bg-surface p-5 space-y-2">
                  <p className="text-sm font-semibold text-accent">{c.title}</p>
                  <p className="text-xs leading-relaxed text-muted">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Closing */}
          <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent-soft/70 to-surface p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="space-y-2 max-w-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">{t.closing.label}</p>
                <p className="text-[15px] leading-relaxed text-foreground/85">{t.closing.text}</p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 hover:-translate-y-0.5 whitespace-nowrap"
              >
                {t.closing.btn} <span aria-hidden="true">→</span>
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
