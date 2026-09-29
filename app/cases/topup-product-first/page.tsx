"use client";
import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InfoTip from "@/components/retention-signals/InfoTip";
import TopupDemo from "@/components/topup-product-first/TopupDemo";
import InvestmentCalculator from "@/components/topup-product-first/InvestmentCalculator";
import DecisionModule from "@/components/topup-product-first/DecisionModule";
import { COST_REGISTER } from "@/lib/topup-product-first-data";
import { useLanguage } from "@/context/LanguageContext";

const VERBATIM = {
  mvp:
    "The MVP was not designed to solve global catalogue complexity. It was designed to find out whether solving it would create enough customer and commercial value to warrant the investment.",
  experiment:
    "An experiment can be successful even when the treatment loses: avoiding an unjustified integration is a valuable product decision. This portfolio case does not claim that such savings were realized.",
  decisionRule:
    "We would consider funding a phased build only if the A/B test shows a credible increase in completed purchases, the offer-mismatch guardrail stays within its pre-agreed limit, AND a conservative contribution-margin forecast covers build and ongoing operating costs within the company's agreed payback period.",
};

const content = {
  en: {
    eyebrow: "Case Study 05 / Product experimentation",
    title: "Show the value before the number",
    subtitle:
      "Testing whether product discovery should come before recipient verification in international mobile top-ups.",
    badge: "Portfolio simulation · Experiment design, not a live A/B result",
    tldr:
      "Today, the phone number unlocks the available top-up catalogue. I designed a narrow, product-first MVP to test whether showing illustrative recipient benefits before asking for the number could increase completed purchases. The proposed A/B experiment would determine whether that gain is large enough—and the mismatch risk low enough—to justify a full integration.",
    heroCards: [
      { label: "Decision", value: "Invest in a scalable catalogue or keep the number-first flow?" },
      { label: "Primary metric", value: "Completed purchases per eligible assigned visitor." },
      { label: "Main guardrail", value: "Offer mismatch after number verification." },
    ],
    nav: [
      { id: "problem", label: "Problem" },
      { id: "experiences", label: "Two experiences" },
      { id: "experiment", label: "Experiment" },
      { id: "decisions", label: "Decisions" },
      { id: "limits", label: "Limits & learning" },
    ],
    coreQTitle: "Core business question",
    coreQ:
      "Would showing the recipient's potential benefit before asking for their phone number generate enough additional completed purchases to justify building a scalable, accurate operator-and-product discovery experience?",
    coreQBody:
      "The cost of a full solution comes from differences across destination countries, operators, product types, recipient amounts, bundle benefits, validity periods, pricing, exchange-related presentation and number-specific promotions. We want evidence of commercial value before funding that integration and operational complexity.",

    // Section 1
    problemTitle: "The problem",
    problemBody:
      "The current number-first flow protects accuracy: once we know the recipient's number, we can identify the operator and query eligible products. But it also asks for an action before a new visitor can see what they might buy, what they would pay, and what the recipient would get. The hypothesis is that this ordering suppresses purchase conversion—not that the phone field has already been proven to cause abandonment.",
    valueChainTitle: "Where a visitor may drop",
    valueChain: [
      "Visitor arrives",
      "Wants to understand recipient benefit",
      "Encounters phone field",
      "Might leave before seeing the offer",
    ],
    riskLabel: "The investment risk",
    riskBody:
      "Building a global pre-number catalogue upfront would require maintaining changing products, operator rules, pricing and promotions. The experiment tests whether that investment is justified before committing to it.",

    // Section 2
    twoTitle: "The two experiences",
    twoIntro:
      "Both variants lead to the same underlying purchase. The only difference is the order in which value and verification appear.",
    flowATitle: "Flow A — Control · number first",
    flowASteps: [
      "US sender selects Colombia or lands on the destination entry page.",
      "Page asks for the recipient phone number before showing offers.",
      "Number is verified; the operator is identified.",
      "Eligible products and confirmed prices are shown.",
      "Customer chooses a product and proceeds to checkout.",
    ],
    flowBTitle: "Flow B — MVP treatment · product first",
    flowBSteps: [
      "Same eligible visitor arrives at the same entry point.",
      "Page displays curated, illustrative products for Colombia grouped by fictional operator.",
      "Each card distinguishes price, benefit type, validity, operator and 'example only' status.",
      "Visitor expresses interest in one offer, then the page asks for the recipient number.",
      "System checks operator and real eligibility through the existing number-based lookup.",
      "Before checkout, the verified final price, product, benefit and validity are shown.",
      "If the offer differs or is unavailable, the change is explained — never a silent substitution.",
    ],
    microcopyLabel: "Customer-facing microcopy for B",
    microcopy:
      "Explore example top-ups by operator. Enter the recipient's number to confirm the available products, exact benefits and final price before payment.",
    demoTitle: "Try it — A / B interactive demo",
    demoBody:
      "Toggle between the two experiences, filter by operator, and pick a demo recipient token to drive the verification state. No real lookup, payment or personal data is involved.",
    openDemo: "Open the full-screen demo",

    // Section 3
    expTitle: "Experiment design",
    hypothesisLabel: "Hypothesis",
    hypothesis:
      "For eligible US-to-Colombia top-up visitors, a curated product-first flow will increase completed purchases per assigned eligible visitor versus the current number-first flow, without causing an unacceptable rate of product, benefit or price discrepancies after recipient verification.",
    setupTitle: "Setup",
    setup: [
      "Unit of assignment: eligible visitor or stable user ID, with persistent assignment.",
      "Allocation: 50/50 A and B. Returning users keep their assignment.",
      "Entry population: visitors entering the same US-to-Colombia journey, eligible to complete the same final purchase in both variants.",
      "Analyze by assigned group (intention-to-treat); do not restrict to those who click an offer or enter a number.",
      "Both variants measure the same completed-purchase event, with the same attribution window.",
      "Comparing A and B measures the whole product-first experience, not the isolated effect of the phone field.",
      "Before interpreting: check event completeness, assignment persistence and sample-ratio mismatch.",
      "Pre-register metrics, decision criteria and maximum duration before launch.",
    ],
    metricTreeTitle: "Metric tree",
    primaryLabel: "Primary business outcome",
    primaryDef:
      "Purchase conversion rate = unique eligible assigned visitors completing a confirmed top-up purchase within the attribution window / all unique eligible assigned visitors.",
    funnelTitle: "Diagnostic funnel",
    funnel: [
      "Entry → product seen",
      "Entry → offer selected",
      "Entry → recipient verification attempted",
      "Verification attempted → verified offer found",
      "Verified offer shown → checkout started",
      "Checkout started → purchase completed",
    ],
    guardrailsTitle: "Guardrails",
    guardrails: [
      {
        title: "Offer mismatch rate",
        def: "B visitors whose selected illustrative offer is unavailable or materially changes in price or benefits after verification / B visitors who selected an offer and attempted verification. Subtypes: unavailable; price change; benefit/validity change.",
      },
      {
        title: "Post-verification abandonment",
        def: "B visitors who see a verified offer but do not continue / B visitors who see a verified offer.",
      },
      { title: "Checkout errors & failed purchase rate", def: "Technical failures in the shared checkout, monitored equally in A and B." },
      {
        title: "Support contacts / refunds",
        def: "Contacts and refunds due to confusing offer presentation, if instrumented in a real deployment.",
      },
    ],
    guardrailNote:
      "The guardrail denominator is conditional on selecting an offer and attempting verification, while the primary outcome uses all eligible assigned visitors.",
    sampleTitle: "Sample-size planning example",
    sampleNote: "Planning example — not a calculation from site traffic.",
    sampleRows: [
      ["Baseline conversion", "5.0%"],
      ["Minimum effect worth detecting", "6.0% (B)"],
      ["Absolute / relative change", "+1 pp / +20%"],
      ["Two-sided alpha", "0.05"],
      ["Power", "80%"],
      ["Allocation", "1:1"],
      ["Required sample", "8,143 per variant · 16,285 total"],
      ["Method", "Two-proportions power (Cohen's h)"],
    ],
    sensitivityNote:
      "Sensitivity: with the same assumptions but a target of 5.0% → 5.5%, approximately 31,217 visitors per variant are needed.",
    durationNote:
      "Duration = planned total sample / eligible assigned visitors per day, plus the attribution window. If daily traffic is unknown, duration cannot be estimated without eligible-traffic data.",
    calcTitle: "Commercial success and the investment decision",
    calcBody:
      "An increase in clicks is not commercial success. Neither is a purchase lift on its own. The question is whether the incremental contribution margin covers build and operating costs within an agreed payback period. Adjust the assumptions below to see how the decision changes.",
    breakEvenTitle: "Illustrative break-even example",
    breakEvenRows: [
      ["A purchase conversion", "5%"],
      ["B purchase conversion", "6% (+1 pp)"],
      ["Forecast eligible traffic (same corridor)", "100,000 / year"],
      ["Contribution margin per additional purchase", "USD 3"],
      ["Estimated additional purchases", "1,000 / year"],
      ["Incremental contribution margin", "USD 3,000 / year"],
      ["One-off build cost", "USD 20,000"],
      ["Ongoing cost", "USD 5,000 / year"],
    ],
    breakEvenDecision:
      "B improves conversion in this hypothetical example, but the modeled USD 3,000 annual incremental contribution does not even cover the USD 5,000 annual operating cost. Therefore, this result would NOT justify funding the full build under these assumptions.",
    breakEvenNote:
      "A +1 percentage-point conversion improvement is the illustrative minimum effect used for sample-size planning. It is NOT automatically the minimum commercially viable effect.",
    costTitle: "What scaling would cost",
    costBody:
      "MVP test costs are not scaled-product costs. Manual updates and a narrow approved snapshot are test-only shortcuts, not evidence that a production catalogue would be inexpensive to operate.",
    decisionRuleTitle: "Commercial success rule",
    decisionRuleItems: [
      "If B has more browsing but no purchase lift: do not scale; diagnose where the funnel loses users.",
      "If B lifts purchases but exceeds the mismatch threshold: stop or narrow B; fix offer accuracy first.",
      "If purchase results are inconclusive: do not call it 'no effect'; check power, measurement and scope.",
      "If a critical price/benefit misrepresentation occurs: pause B for investigation rather than waiting for significance.",
      "Example proposed thresholds (calibrate with real data): at least +1 pp absolute lift; critical mismatch limit 3% of attempted verifications.",
    ],

    // Section 4
    decTitle: "Decision trail & outcome scenarios",
    trailTitle: "Why these choices",
    trail: [
      ["Why test before full build?", "Full multi-country / multi-operator integration versus a scoped MVP: choose the scoped MVP to test commercial value first."],
      ["Why one corridor?", "Broad coverage versus US payer / Colombia recipient: choose one corridor with stable, maintainable offers and enough eligible traffic. The choice is hypothetical and must be checked against real data."],
      ["Why curated illustrative offers?", "A dynamic global catalogue versus a limited approved snapshot: choose the limited catalogue with operational ownership and strict confirmation before checkout."],
      ["Why purchases instead of clicks?", "Clicks show interest; completed purchases are the business outcome."],
      ["Why a trust guardrail?", "Pre-number browsing could create false expectations that only surface after verification."],
      ["Reversal / failure scenario", "Illustrative learning scenario, not an observed failure: higher offer clicks but no purchase lift would reverse the urge to scale, and point investigation at the verification handoff instead."],
    ],
    moduleTitle: "What would you decide?",
    moduleBody: "Three illustrative branches, each labeled simulated.",
    memoTitle: "Negative-result decision memo (example)",
    memoFields: [
      ["What we expected", "A product-first flow would raise completed purchases without breaching the mismatch guardrail."],
      ["What the simulated analysis suggests", "Interest rises but completed purchases do not clearly improve — presented as a scenario, not a real result."],
      ["Was the test sound?", "Confirm adequate power, clean persistent assignment and complete tracking before drawing conclusions."],
      ["New friction?", "Check whether real offer mismatch created friction after number entry."],
      ["Investment avoided or postponed", "A full catalogue build is deferred — no quantified saving is claimed without a real cost estimate."],
      ["Hypothesis that survived", "People may want visibility before sharing a number, but this particular product-first implementation did not increase completed purchases."],
      ["Next cheapest test", "Show concise recipient-value examples beside the phone input, without implying guaranteed availability."],
      ["Evidence distinction", "'No evidence of improvement' is not the same as 'evidence of no meaningful improvement.'"],
    ],
    outcomesTitle: "Outcome scenarios",
    outcomes: [
      ["A — Purchases up, guardrails held, economics support payback", "Fund a phased technical discovery and staged build for the tested corridor; verify cost assumptions before broader rollout."],
      ["B — Purchases up, guardrails held, but economics do not cover cost", "Do not fund the full catalogue. Test a cheaper way to communicate recipient value, or find a corridor with stronger economics."],
      ["C — Offer clicks up, completed purchases flat", "Not commercial success. Diagnose whether verification or offer mismatch moved abandonment later in the funnel."],
      ["D — Purchases up but the offer-mismatch guardrail fails", "Stop or narrow the treatment. Trust is not something the revenue lift can buy."],
      ["E — Negative or inconclusive", "Document whether the test was adequately powered, correctly assigned and instrumented. State which investment was avoided or deferred without inventing a monetary saving."],
    ],
    recordTitle: "Final decision record",
    recordFields: [
      ["Experimental outcome", "Simulated / not observed"],
      ["Purchase-conversion effect", "Illustrative only"],
      ["Trust guardrail", "Proposed threshold and illustrative outcome"],
      ["Incremental contribution margin", "Assumptions and range"],
      ["One-off build cost", "Illustrative estimate"],
      ["Annual operating cost", "Illustrative estimate"],
      ["Payback horizon", "Business-defined assumption"],
      ["Recommendation", "Build in phases / run a cheaper follow-up test / do not invest"],
      ["What would reverse this", "A change in traffic, margin, conversion lift, offer accuracy or build cost"],
    ],

    // Section 5
    limitsTitle: "Limits & learning",
    boundariesTitle: "Technical boundaries of the test MVP",
    boundaries: [
      ["Portfolio demo", "Local deterministic data → illustrative operator/product cards → simulated verification states → mock checkout completion. No supplier connection, real payments, phone processing or actual A/B randomization."],
      ["Proposed production experiment", "Small approved snapshot for one corridor and a few operator/product IDs → scheduled manual freshness checks → hide stale/unknown offers → existing number-based eligibility and final-price lookup → existing checkout → event logging and kill switch."],
      ["Full product, only if justified", "Reliable supplier integrations, expiry/invalidations, operator detection, number portability, promotion eligibility, pricing/FX display, monitoring, operational ownership, compliance review and scaled coverage."],
    ],
    risksTitle: "Risks & rules",
    risks: [
      "Supplier test numbers may not represent all real numbers; never infer universal eligibility from them.",
      "Operator ownership and product availability may vary by number.",
      "Prices, payout amounts, validity and bundle entitlements can change.",
      "Promotions may be number-specific or time-limited: do not display them before eligibility verification unless qualified.",
      "Every cache entry needs source, last_checked_at, valid_until, currency, operator, product ID, product type and verification status.",
      "Never use AI to invent pricing, benefits, availability, validity or FX rates. AI can help with synthetic copy, test fixtures or code; supplier-approved data and the final lookup determine what is sold.",
      "Hide or withdraw illustrative cards if freshness checks fail. No collection of real numbers or personal data in this demo.",
    ],
    scopeTitle: "Scope labels used throughout",
    scopePills: [
      "Test-only shortcut",
      "Requires production integration",
      "Illustrative metric",
      "Decision hypothesis",
      "Verified only after number entry",
    ],
    tempTitle: "Temporary choices vs. scaled capabilities",
    tempCols: ["Temporary choices made to learn", "Capabilities required for a scaled product"],
    tempRows: [
      ["Hardcoded, curated offer snapshot", "Reliable supplier product-feed integration"],
      ["Manual freshness checks by an owner", "Automated expiry, invalidation and monitoring"],
      ["Single corridor (US → Colombia)", "Multi-country, multi-operator coverage"],
      ["Simulated verification states", "Existing number-based eligibility and final-price lookup"],
      ["Mock checkout completion", "Live checkout, payments and reconciliation"],
    ],
    impactTitle: "Results / impact",
    impactBody:
      "If a real A/B test met the pre-agreed purchase-lift threshold while protecting offer accuracy, the next decision would be to estimate full-build cost, ongoing catalogue-maintenance cost and contribution-margin impact.",
    confidence: "Confidence in actual business impact: not established — no live test has been conducted.",
    footerTitle: "What I would do differently",
    footerDiff:
      "If a curated catalogue produces many mismatches, reduce the scope further and validate simpler ways of communicating value before revisiting a catalogue.",
    disclosure:
      "Hypothetical portfolio exercise; all offers, data and experiment outcomes in this demo are simulated. No confidential employer or supplier information is used.",
    prevLabel: "Previous",
    prevTitle: "04 — Retention Signals",
    nextLabel: "Next",
    nextTitle: "All case studies",
  },

  es: {
    eyebrow: "Caso 05 / Experimentación de producto",
    title: "Mostrar el valor antes del número",
    subtitle:
      "Probar si el descubrimiento de producto debe ir antes de la verificación del destinatario en recargas móviles internacionales.",
    badge: "Simulación de portafolio · Diseño de experimento, no un resultado A/B real",
    tldr:
      "Hoy, el número de teléfono desbloquea el catálogo de recargas disponible. Diseñé un MVP acotado, producto-primero, para probar si mostrar beneficios ilustrativos para el destinatario antes de pedir el número podría aumentar las compras completadas. El experimento A/B propuesto determinaría si esa ganancia es lo bastante grande —y el riesgo de discrepancia lo bastante bajo— para justificar una integración completa.",
    heroCards: [
      { label: "Decisión", value: "¿Invertir en un catálogo escalable o mantener el flujo número-primero?" },
      { label: "Métrica principal", value: "Compras completadas por visitante elegible asignado." },
      { label: "Guardarraíl principal", value: "Discrepancia de oferta tras la verificación del número." },
    ],
    nav: [
      { id: "problem", label: "Problema" },
      { id: "experiences", label: "Dos experiencias" },
      { id: "experiment", label: "Experimento" },
      { id: "decisions", label: "Decisiones" },
      { id: "limits", label: "Límites y aprendizaje" },
    ],
    coreQTitle: "Pregunta de negocio central",
    coreQ:
      "¿Mostrar el beneficio potencial del destinatario antes de pedir su número generaría suficientes compras completadas adicionales para justificar construir una experiencia de descubrimiento de operador y producto escalable y precisa?",
    coreQBody:
      "El costo de una solución completa viene de las diferencias entre países de destino, operadores, tipos de producto, montos, beneficios de paquetes, periodos de validez, precios, presentación de cambio de divisa y promociones específicas por número. Queremos evidencia de valor comercial antes de financiar esa integración y complejidad operativa.",

    problemTitle: "El problema",
    problemBody:
      "El flujo actual número-primero protege la precisión: al conocer el número, identificamos el operador y consultamos productos elegibles. Pero también pide una acción antes de que un visitante nuevo pueda ver qué compraría, cuánto pagaría y qué recibiría el destinatario. La hipótesis es que este orden reduce la conversión de compra, no que el campo del teléfono ya esté probado como causa de abandono.",
    valueChainTitle: "Dónde puede caer un visitante",
    valueChain: [
      "Llega el visitante",
      "Quiere entender el beneficio para el destinatario",
      "Se encuentra el campo del teléfono",
      "Podría irse antes de ver la oferta",
    ],
    riskLabel: "El riesgo de la inversión",
    riskBody:
      "Construir un catálogo global pre-número de entrada requeriría mantener productos cambiantes, reglas de operador, precios y promociones. El experimento prueba si esa inversión está justificada antes de comprometerse con ella.",

    twoTitle: "Las dos experiencias",
    twoIntro:
      "Ambas variantes llevan a la misma compra subyacente. La única diferencia es el orden en que aparecen el valor y la verificación.",
    flowATitle: "Flujo A — Control · número primero",
    flowASteps: [
      "El emisor en EE. UU. selecciona Colombia o llega a la página de destino.",
      "La página pide el número del destinatario antes de mostrar ofertas.",
      "Se verifica el número; se identifica el operador.",
      "Se muestran los productos elegibles y los precios confirmados.",
      "El cliente elige un producto y pasa al pago.",
    ],
    flowBTitle: "Flujo B — Tratamiento MVP · producto primero",
    flowBSteps: [
      "El mismo visitante elegible llega al mismo punto de entrada.",
      "La página muestra productos ilustrativos y curados para Colombia agrupados por operador ficticio.",
      "Cada tarjeta distingue precio, tipo de beneficio, validez, operador y estado 'solo ejemplo'.",
      "El visitante muestra interés en una oferta; luego la página pide el número del destinatario.",
      "El sistema comprueba operador y elegibilidad real mediante la consulta existente por número.",
      "Antes del pago, se muestran el precio final verificado, el producto, el beneficio y la validez.",
      "Si la oferta difiere o no está disponible, se explica el cambio, nunca una sustitución silenciosa.",
    ],
    microcopyLabel: "Microcopy para el cliente en B",
    microcopy:
      "Explora recargas de ejemplo por operador. Introduce el número del destinatario para confirmar los productos disponibles, los beneficios exactos y el precio final antes de pagar.",
    demoTitle: "Pruébalo — demo interactiva A / B",
    demoBody:
      "Alterna entre las dos experiencias, filtra por operador y elige un token de destinatario de demo para dirigir el estado de verificación. No hay consulta real, pago ni datos personales.",
    openDemo: "Abrir la demo a pantalla completa",

    expTitle: "Diseño del experimento",
    hypothesisLabel: "Hipótesis",
    hypothesis:
      "Para visitantes elegibles de recargas EE. UU.–Colombia, un flujo producto-primero curado aumentará las compras completadas por visitante elegible asignado frente al flujo número-primero actual, sin causar una tasa inaceptable de discrepancias de producto, beneficio o precio tras la verificación.",
    setupTitle: "Configuración",
    setup: [
      "Unidad de asignación: visitante elegible o ID de usuario estable, con asignación persistente.",
      "Asignación: 50/50 A y B. Los usuarios que regresan conservan su asignación.",
      "Población de entrada: visitantes del mismo recorrido EE. UU.–Colombia, elegibles para completar la misma compra final en ambas variantes.",
      "Analizar por grupo asignado (intención de tratar); no restringir a quienes hacen clic o introducen un número.",
      "Ambas variantes miden el mismo evento de compra completada, con la misma ventana de atribución.",
      "Comparar A y B mide toda la experiencia producto-primero, no el efecto aislado del campo del teléfono.",
      "Antes de interpretar: comprobar completitud de eventos, persistencia de asignación y sample-ratio mismatch.",
      "Preregistrar métricas, criterios de decisión y duración máxima antes del lanzamiento.",
    ],
    metricTreeTitle: "Árbol de métricas",
    primaryLabel: "Resultado de negocio principal",
    primaryDef:
      "Tasa de conversión de compra = visitantes únicos elegibles asignados que completan una recarga confirmada dentro de la ventana de atribución / todos los visitantes únicos elegibles asignados.",
    funnelTitle: "Embudo de diagnóstico",
    funnel: [
      "Entrada → producto visto",
      "Entrada → oferta seleccionada",
      "Entrada → verificación del destinatario intentada",
      "Verificación intentada → oferta verificada encontrada",
      "Oferta verificada mostrada → pago iniciado",
      "Pago iniciado → compra completada",
    ],
    guardrailsTitle: "Guardarraíles",
    guardrails: [
      {
        title: "Tasa de discrepancia de oferta",
        def: "Visitantes de B cuya oferta ilustrativa seleccionada no está disponible o cambia materialmente de precio o beneficio tras la verificación / visitantes de B que seleccionaron una oferta e intentaron verificar. Subtipos: no disponible; cambio de precio; cambio de beneficio/validez.",
      },
      {
        title: "Abandono tras verificación",
        def: "Visitantes de B que ven una oferta verificada pero no continúan / visitantes de B que ven una oferta verificada.",
      },
      { title: "Errores de pago y compras fallidas", def: "Fallos técnicos en el pago compartido, monitoreados por igual en A y B." },
      {
        title: "Contactos de soporte / reembolsos",
        def: "Contactos y reembolsos por presentación confusa de ofertas, si se instrumenta en un despliegue real.",
      },
    ],
    guardrailNote:
      "El denominador del guardarraíl es condicional a seleccionar una oferta e intentar verificar, mientras que el resultado principal usa todos los visitantes elegibles asignados.",
    sampleTitle: "Ejemplo de planificación de tamaño muestral",
    sampleNote: "Ejemplo de planificación, no un cálculo del tráfico del sitio.",
    sampleRows: [
      ["Conversión base", "5.0%"],
      ["Efecto mínimo detectable", "6.0% (B)"],
      ["Cambio absoluto / relativo", "+1 pp / +20%"],
      ["Alfa bilateral", "0.05"],
      ["Potencia", "80%"],
      ["Asignación", "1:1"],
      ["Muestra requerida", "8.143 por variante · 16.285 total"],
      ["Método", "Potencia de dos proporciones (h de Cohen)"],
    ],
    sensitivityNote:
      "Sensibilidad: con los mismos supuestos pero un objetivo de 5.0% → 5.5%, se necesitan aproximadamente 31.217 visitantes por variante.",
    durationNote:
      "Duración = muestra total planificada / visitantes elegibles asignados por día, más la ventana de atribución. Si el tráfico diario es desconocido, la duración no puede estimarse sin datos de tráfico elegible.",
    calcTitle: "Éxito comercial y la decisión de inversión",
    calcBody:
      "Un aumento de clics no es éxito comercial. Tampoco lo es un aumento de compras por sí solo. La pregunta es si el margen de contribución incremental cubre los costos de construcción y operación dentro de un periodo de recuperación acordado. Ajusta los supuestos de abajo para ver cómo cambia la decisión.",
    breakEvenTitle: "Ejemplo ilustrativo de punto de equilibrio",
    breakEvenRows: [
      ["Conversión de compra A", "5%"],
      ["Conversión de compra B", "6% (+1 pp)"],
      ["Tráfico elegible previsto (mismo corredor)", "100.000 / año"],
      ["Margen de contribución por compra adicional", "USD 3"],
      ["Compras adicionales estimadas", "1.000 / año"],
      ["Margen de contribución incremental", "USD 3.000 / año"],
      ["Costo de construcción único", "USD 20.000"],
      ["Costo continuo", "USD 5.000 / año"],
    ],
    breakEvenDecision:
      "B mejora la conversión en este ejemplo hipotético, pero la contribución incremental anual modelada de USD 3.000 ni siquiera cubre el costo operativo anual de USD 5.000. Por lo tanto, este resultado NO justificaría financiar la construcción completa bajo estos supuestos.",
    breakEvenNote:
      "Una mejora de +1 punto porcentual es el efecto mínimo ilustrativo usado para planificar el tamaño muestral. NO es automáticamente el efecto mínimo comercialmente viable.",
    costTitle: "Cuánto costaría escalar",
    costBody:
      "Los costos de prueba del MVP no son los costos del producto escalado. Las actualizaciones manuales y un snapshot aprobado y acotado son atajos solo para la prueba, no evidencia de que un catálogo en producción sea barato de operar.",
    decisionRuleTitle: "Regla de éxito comercial",
    decisionRuleItems: [
      "Si B tiene más navegación pero sin aumento de compras: no escalar; diagnosticar dónde pierde usuarios el embudo.",
      "Si B aumenta compras pero supera el umbral de discrepancia: detener o acotar B; corregir primero la precisión de las ofertas.",
      "Si los resultados de compra son inconclusos: no llamarlo 'sin efecto'; revisar potencia, medición y alcance.",
      "Si ocurre una tergiversación crítica de precio/beneficio: pausar B para investigar en lugar de esperar significancia.",
      "Umbrales propuestos de ejemplo (calibrar con datos reales): al menos +1 pp de aumento absoluto; límite crítico de discrepancia 3% de las verificaciones intentadas.",
    ],

    decTitle: "Rastro de decisiones y escenarios de resultado",
    trailTitle: "Por qué estas decisiones",
    trail: [
      ["¿Por qué probar antes de construir todo?", "Integración multi-país / multi-operador completa frente a un MVP acotado: elegir el MVP acotado para probar primero el valor comercial."],
      ["¿Por qué un solo corredor?", "Cobertura amplia frente a pagador de EE. UU. / destinatario en Colombia: elegir un corredor con ofertas estables y mantenibles y suficiente tráfico elegible. La elección es hipotética y debe contrastarse con datos reales."],
      ["¿Por qué ofertas ilustrativas curadas?", "Un catálogo global dinámico frente a un snapshot aprobado y limitado: elegir el catálogo limitado con propiedad operativa y confirmación estricta antes del pago."],
      ["¿Por qué compras en lugar de clics?", "Los clics muestran interés; las compras completadas son el resultado de negocio."],
      ["¿Por qué un guardarraíl de confianza?", "La navegación pre-número podría crear expectativas falsas que solo aparecen tras la verificación."],
      ["Escenario de reversión / fallo", "Escenario de aprendizaje ilustrativo, no un fallo observado: más clics en ofertas pero sin aumento de compras revertiría el impulso de escalar y dirigiría la investigación al traspaso de verificación."],
    ],
    moduleTitle: "¿Qué decidirías?",
    moduleBody: "Tres ramas ilustrativas, cada una marcada como simulada.",
    memoTitle: "Memo de decisión de resultado negativo (ejemplo)",
    memoFields: [
      ["Qué esperábamos", "Un flujo producto-primero aumentaría las compras completadas sin vulnerar el guardarraíl de discrepancia."],
      ["Qué sugiere el análisis simulado", "El interés sube pero las compras completadas no mejoran claramente — presentado como escenario, no como resultado real."],
      ["¿Fue sólido el test?", "Confirmar potencia adecuada, asignación persistente limpia y seguimiento completo antes de concluir."],
      ["¿Nueva fricción?", "Comprobar si una discrepancia de oferta real creó fricción tras introducir el número."],
      ["Inversión evitada o pospuesta", "La construcción del catálogo completo se aplaza — no se reclama ahorro cuantificado sin una estimación de costo real."],
      ["Hipótesis que sobrevivió", "La gente puede querer visibilidad antes de dar un número, pero esta implementación producto-primero concreta no aumentó las compras."],
      ["Próximo test más barato", "Mostrar ejemplos concisos de valor para el destinatario junto al campo del número, sin implicar disponibilidad garantizada."],
      ["Distinción de evidencia", "'Sin evidencia de mejora' no es lo mismo que 'evidencia de que no hay mejora significativa.'"],
    ],
    outcomesTitle: "Escenarios de resultado",
    outcomes: [
      ["A — Suben las compras, guardarraíles respetados, economía sostiene la recuperación", "Financiar un discovery técnico por fases y una construcción escalonada para el corredor probado; verificar los supuestos de costo antes de un despliegue más amplio."],
      ["B — Suben las compras, guardarraíles respetados, pero la economía no cubre el costo", "No financiar el catálogo completo. Probar una forma más barata de comunicar el valor, o buscar un corredor con mejor economía."],
      ["C — Suben los clics, las compras completadas se mantienen planas", "No es éxito comercial. Diagnosticar si la verificación o la discrepancia movió el abandono más adelante en el embudo."],
      ["D — Suben las compras pero falla el guardarraíl de discrepancia", "Detener o acotar el tratamiento. La confianza no se compra con el aumento de ingresos."],
      ["E — Negativo o inconcluso", "Documentar si el test tuvo potencia adecuada, asignación correcta e instrumentación. Indicar qué inversión se evitó o aplazó sin inventar un ahorro monetario."],
    ],
    recordTitle: "Registro final de decisión",
    recordFields: [
      ["Resultado experimental", "Simulado / no observado"],
      ["Efecto en conversión de compra", "Solo ilustrativo"],
      ["Guardarraíl de confianza", "Umbral propuesto y resultado ilustrativo"],
      ["Margen de contribución incremental", "Supuestos y rango"],
      ["Costo de construcción único", "Estimación ilustrativa"],
      ["Costo operativo anual", "Estimación ilustrativa"],
      ["Horizonte de recuperación", "Supuesto definido por el negocio"],
      ["Recomendación", "Construir por fases / hacer un test de seguimiento más barato / no invertir"],
      ["Qué revertiría esto", "Un cambio en tráfico, margen, aumento de conversión, precisión de oferta o costo de construcción"],
    ],

    limitsTitle: "Límites y aprendizaje",
    boundariesTitle: "Límites técnicos del MVP de prueba",
    boundaries: [
      ["Demo del portafolio", "Datos deterministas locales → tarjetas ilustrativas de operador/producto → estados de verificación simulados → finalización de pago simulada. Sin conexión con proveedores, pagos reales, procesamiento de teléfono ni aleatorización A/B real."],
      ["Experimento de producción propuesto", "Snapshot aprobado pequeño para un corredor y algunos IDs de operador/producto → chequeos de frescura manuales programados → ocultar ofertas obsoletas/desconocidas → elegibilidad existente por número y consulta de precio final → pago existente → registro de eventos y kill switch."],
      ["Producto completo, solo si se justifica", "Integraciones fiables con proveedores, caducidad/invalidaciones, detección de operador, portabilidad de número, elegibilidad de promociones, presentación de precio/FX, monitoreo, propiedad operativa, revisión de cumplimiento y cobertura escalada."],
    ],
    risksTitle: "Riesgos y reglas",
    risks: [
      "Los números de prueba del proveedor pueden no representar todos los números reales; nunca inferir elegibilidad universal a partir de ellos.",
      "La propiedad del operador y la disponibilidad del producto pueden variar por número.",
      "Precios, montos de pago, validez y beneficios de paquetes pueden cambiar.",
      "Las promociones pueden ser específicas por número o temporales: no mostrarlas antes de verificar la elegibilidad salvo que se cualifiquen.",
      "Cada entrada de caché necesita fuente, last_checked_at, valid_until, moneda, operador, ID de producto, tipo de producto y estado de verificación.",
      "Nunca usar IA para inventar precios, beneficios, disponibilidad, validez o tipos de cambio. La IA puede ayudar con copy sintético, fixtures de prueba o código; los datos aprobados por el proveedor y la consulta final determinan qué se vende.",
      "Ocultar o retirar las tarjetas ilustrativas si fallan los chequeos de frescura. Sin recolección de números reales ni datos personales en esta demo.",
    ],
    scopeTitle: "Etiquetas de alcance usadas en la página",
    scopePills: [
      "Atajo solo de prueba",
      "Requiere integración de producción",
      "Métrica ilustrativa",
      "Hipótesis de decisión",
      "Verificado solo tras introducir el número",
    ],
    tempTitle: "Decisiones temporales vs. capacidades escaladas",
    tempCols: ["Decisiones temporales para aprender", "Capacidades necesarias para un producto escalado"],
    tempRows: [
      ["Snapshot de ofertas curado y hardcodeado", "Integración fiable con el feed de producto del proveedor"],
      ["Chequeos de frescura manuales por un responsable", "Caducidad, invalidación y monitoreo automáticos"],
      ["Un solo corredor (EE. UU. → Colombia)", "Cobertura multi-país y multi-operador"],
      ["Estados de verificación simulados", "Elegibilidad existente por número y consulta de precio final"],
      ["Finalización de pago simulada", "Pago real, cobros y conciliación"],
    ],
    impactTitle: "Resultados / impacto",
    impactBody:
      "Si un test A/B real alcanzara el umbral de aumento de compras preacordado protegiendo la precisión de las ofertas, la siguiente decisión sería estimar el costo de construcción completo, el costo continuo de mantenimiento del catálogo y el impacto en el margen de contribución.",
    confidence: "Confianza en el impacto de negocio real: no establecida — no se ha realizado ningún test en vivo.",
    footerTitle: "Qué haría diferente",
    footerDiff:
      "Si un catálogo curado produce muchas discrepancias, reducir aún más el alcance y validar formas más simples de comunicar el valor antes de volver a un catálogo.",
    disclosure:
      "Ejercicio de portafolio hipotético; todas las ofertas, datos y resultados de experimento en esta demo son simulados. No se usa información confidencial de ningún empleador ni proveedor.",
    prevLabel: "Anterior",
    prevTitle: "04 — Retention Signals",
    nextLabel: "Siguiente",
    nextTitle: "Todos los casos",
  },
} as const;

export default function TopupProductFirstPage() {
  const { lang } = useLanguage();
  const t = content[lang] || content.en;

  return (
    <>
      <SiteHeader variant="inner" />

      <main className="text-foreground">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent/15 blur-[120px]"
          />
          <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-8">
            <div className="animate-rise space-y-5">
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-accent">
                {t.eyebrow}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-balance">
                {t.title}
              </h1>
              <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-muted text-pretty">
                {t.subtitle}
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-warn/40 bg-warn-soft px-4 py-1.5 text-xs font-semibold text-warn">
                <span className="h-1.5 w-1.5 rounded-full bg-warn" aria-hidden="true" />
                {t.badge}
              </div>
              <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">{t.tldr}</p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {t.heroCards.map((c) => (
                <div key={c.label} className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{c.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{c.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sticky jump nav */}
        <nav
          aria-label="Section navigation"
          className="sticky top-16 z-40 border-y border-border bg-background/85 backdrop-blur-xl"
        >
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <ul className="flex gap-1 overflow-x-auto py-2 text-sm">
              {t.nav.map((n, i) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 font-medium text-muted hover:bg-surface hover:text-foreground"
                  >
                    <span className="text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 space-y-20">
          {/* Core question */}
          <section className="rounded-3xl border border-accent/30 bg-accent-soft/40 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.14em] text-accent">{t.coreQTitle}</p>
            <p className="mt-3 font-display text-xl sm:text-2xl leading-snug tracking-tight text-foreground text-pretty">
              {t.coreQ}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{t.coreQBody}</p>
          </section>

          {/* Section 1 — Problem */}
          <section id="problem" className="scroll-mt-32 space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.problemTitle}</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">{t.problemBody}</p>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">{t.valueChainTitle}</p>
              <ol className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                {t.valueChain.map((step, i) => (
                  <React.Fragment key={i}>
                    <li
                      className={`flex-1 rounded-xl border p-4 text-sm leading-relaxed ${
                        i === t.valueChain.length - 1
                          ? "border-risk/40 bg-risk-soft/50 text-foreground/90"
                          : "border-border bg-surface-2 text-foreground/85"
                      }`}
                    >
                      <span className="font-display text-accent">{i + 1}</span>
                      <span className="mt-1 block">{step}</span>
                    </li>
                    {i < t.valueChain.length - 1 && (
                      <span className="hidden items-center text-muted sm:flex" aria-hidden="true">
                        →
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border-l-2 border-warn/60 bg-surface p-5">
              <p className="text-sm font-semibold text-foreground">{t.riskLabel}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.riskBody}</p>
            </div>
          </section>

          {/* Section 2 — Two experiences */}
          <section id="experiences" className="scroll-mt-32 space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.twoTitle}</h2>
            <p className="max-w-3xl text-[15px] leading-relaxed text-foreground/85">{t.twoIntro}</p>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <span className="inline-flex items-center rounded-full bg-info-soft px-2.5 py-0.5 text-[11px] font-semibold text-info">
                  {t.flowATitle}
                </span>
                <ol className="mt-4 space-y-2.5">
                  {t.flowASteps.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                      <span className="font-display text-sm tabular-nums text-muted">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-2xl border border-accent/30 bg-accent-soft/30 p-6">
                <span className="inline-flex items-center rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                  {t.flowBTitle}
                </span>
                <ol className="mt-4 space-y-2.5">
                  {t.flowBSteps.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                      <span className="font-display text-sm tabular-nums text-accent">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="rounded-2xl border-l-2 border-accent/60 bg-surface p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">{t.microcopyLabel}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">&ldquo;{t.microcopy}&rdquo;</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-display text-xl tracking-tight">{t.demoTitle}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted">{t.demoBody}</p>
                </div>
                <Link
                  href="/cases/topup-product-first/demo"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:border-accent/60 hover:text-accent"
                >
                  {t.openDemo}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
              <TopupDemo lang={lang} />
            </div>
          </section>

          {/* Section 3 — Experiment */}
          <section id="experiment" className="scroll-mt-32 space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.expTitle}</h2>

            <div className="rounded-2xl border-l-2 border-accent/60 bg-surface p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-accent">{t.hypothesisLabel}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/90">{t.hypothesis}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-lg tracking-tight">{t.setupTitle}</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {t.setup.map((s, i) => (
                  <li key={i} className="rounded-2xl border border-border bg-surface p-4 text-sm leading-relaxed text-foreground/85">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Metric tree */}
            <div className="space-y-4">
              <h3 className="font-display text-lg tracking-tight">{t.metricTreeTitle}</h3>
              <div className="rounded-2xl border border-accent/30 bg-accent-soft/30 p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-accent">{t.primaryLabel}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{t.primaryDef}</p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">{t.funnelTitle}</p>
                  <ol className="mt-3 space-y-2">
                    {t.funnel.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground/85">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <div className="flex items-center">
                    <p className="text-xs uppercase tracking-[0.14em] text-muted">{t.guardrailsTitle}</p>
                    <InfoTip term={t.guardrailsTitle}>{t.guardrailNote}</InfoTip>
                  </div>
                  <ul className="mt-3 space-y-3">
                    {t.guardrails.map((g) => (
                      <li key={g.title} className="text-sm">
                        <span className="font-semibold text-foreground">{g.title}</span>
                        <InfoTip term={g.title}>{g.def}</InfoTip>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sample size */}
            <details className="group rounded-2xl border border-border bg-surface p-5" open>
              <summary className="flex cursor-pointer items-center justify-between gap-3">
                <span className="font-display text-lg tracking-tight">{t.sampleTitle}</span>
                <span className="inline-flex items-center rounded-full bg-warn-soft px-2.5 py-0.5 text-[11px] font-semibold text-warn">
                  {t.sampleNote}
                </span>
              </summary>
              <div className="mt-4 overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-border">
                    {t.sampleRows.map(([k, v]) => (
                      <tr key={k}>
                        <td className="p-3 text-muted">{k}</td>
                        <td className="p-3 text-right font-medium tabular-nums text-foreground">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">{t.sensitivityNote}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{t.durationNote}</p>
            </details>

            {/* Commercial / investment */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-display text-lg tracking-tight">{t.calcTitle}</h3>
                <p className="max-w-3xl text-sm leading-relaxed text-muted">{t.calcBody}</p>
              </div>
              <InvestmentCalculator lang={lang} />

              <div className="rounded-2xl border border-risk/30 bg-risk-soft/40 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-display text-base tracking-tight text-foreground">{t.breakEvenTitle}</h4>
                  <span className="inline-flex items-center rounded-full bg-warn-soft px-2.5 py-0.5 text-[11px] font-semibold text-warn">
                    {t.sampleNote}
                  </span>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {t.breakEvenRows.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-3 rounded-lg bg-surface px-3 py-2">
                      <span className="text-xs text-muted">{k}</span>
                      <span className="text-sm font-medium tabular-nums text-foreground">{v}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 rounded-xl border border-risk/40 bg-surface p-4 text-sm leading-relaxed text-foreground/90">
                  {t.breakEvenDecision}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted">{t.breakEvenNote}</p>
              </div>
            </div>

            {/* Cost register */}
            <details className="group rounded-2xl border border-border bg-surface p-5">
              <summary className="flex cursor-pointer items-center justify-between gap-3">
                <span className="font-display text-lg tracking-tight">{t.costTitle}</span>
                <span className="text-sm text-muted transition-transform group-open:rotate-180" aria-hidden="true">▾</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{t.costBody}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-surface-2 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">{COST_REGISTER.oneOff.title[lang]}</p>
                  <ul className="mt-3 space-y-2">
                    {COST_REGISTER.oneOff.items.map((it, i) => (
                      <li key={i} className="flex gap-2 text-sm text-foreground/85">
                        <span className="text-accent" aria-hidden="true">·</span>
                        {it[lang]}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-surface-2 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">{COST_REGISTER.ongoing.title[lang]}</p>
                  <ul className="mt-3 space-y-2">
                    {COST_REGISTER.ongoing.items.map((it, i) => (
                      <li key={i} className="flex gap-2 text-sm text-foreground/85">
                        <span className="text-accent" aria-hidden="true">·</span>
                        {it[lang]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>

            {/* Decision rule */}
            <div className="space-y-4">
              <h3 className="font-display text-lg tracking-tight">{t.decisionRuleTitle}</h3>
              <blockquote className="rounded-2xl border-l-2 border-accent/60 bg-surface p-5 text-[15px] leading-relaxed text-foreground/90">
                &ldquo;{VERBATIM.decisionRule}&rdquo;
              </blockquote>
              <ul className="space-y-2">
                {t.decisionRuleItems.map((it, i) => (
                  <li key={i} className="flex gap-2 rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-foreground/85">
                    <span className="text-accent" aria-hidden="true">→</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 4 — Decisions */}
          <section id="decisions" className="scroll-mt-32 space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.decTitle}</h2>

            <div className="space-y-3">
              <h3 className="font-display text-lg tracking-tight">{t.trailTitle}</h3>
              <div className="space-y-2">
                {t.trail.map(([q, a], i) => (
                  <details key={i} className="group rounded-2xl border border-border bg-surface p-4">
                    <summary className="flex cursor-pointer items-center justify-between gap-3">
                      <span className="flex items-center gap-3 text-sm font-semibold text-foreground">
                        <span className="font-display tabular-nums text-accent">{i + 1}</span>
                        {q}
                      </span>
                      <span className="text-sm text-muted transition-transform group-open:rotate-180" aria-hidden="true">▾</span>
                    </summary>
                    <p className="mt-2 pl-7 text-sm leading-relaxed text-muted">{a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <h3 className="font-display text-lg tracking-tight">{t.moduleTitle}</h3>
                <p className="text-sm leading-relaxed text-muted">{t.moduleBody}</p>
              </div>
              <DecisionModule lang={lang} />
            </div>

            {/* Outcome scenarios */}
            <div className="space-y-3">
              <h3 className="font-display text-lg tracking-tight">{t.outcomesTitle}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {t.outcomes.map(([tag, body], i) => (
                  <div key={i} className="rounded-2xl border border-border bg-surface p-5">
                    <p className="text-sm font-semibold text-foreground">{tag}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Negative-result memo */}
            <details className="group rounded-2xl border border-warn/30 bg-warn-soft/30 p-5" open>
              <summary className="flex cursor-pointer items-center justify-between gap-3">
                <span className="font-display text-lg tracking-tight">{t.memoTitle}</span>
                <span className="inline-flex items-center rounded-full bg-warn-soft px-2.5 py-0.5 text-[11px] font-semibold text-warn">
                  {content[lang].sampleNote}
                </span>
              </summary>
              <dl className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface">
                {t.memoFields.map(([k, v]) => (
                  <div key={k} className="grid gap-1 p-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-foreground">{k}</dt>
                    <dd className="text-sm leading-relaxed text-muted">{v}</dd>
                  </div>
                ))}
              </dl>
            </details>

            {/* Final decision record */}
            <div className="space-y-3">
              <h3 className="font-display text-lg tracking-tight">{t.recordTitle}</h3>
              <dl className="divide-y divide-border rounded-2xl border border-border bg-surface">
                {t.recordFields.map(([k, v]) => (
                  <div key={k} className="grid gap-1 p-4 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-foreground">{k}</dt>
                    <dd className="text-sm leading-relaxed text-muted">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Section 5 — Limits & learning */}
          <section id="limits" className="scroll-mt-32 space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{t.limitsTitle}</h2>

            {/* Boundaries */}
            <div className="space-y-3">
              <h3 className="font-display text-lg tracking-tight">{t.boundariesTitle}</h3>
              <div className="grid gap-3 md:grid-cols-3">
                {t.boundaries.map(([phase, body], i) => (
                  <div key={i} className="rounded-2xl border border-border bg-surface p-5">
                    <p className="font-display text-sm tracking-tight text-accent">{String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{phase}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scope pills */}
            <div className="space-y-3">
              <h3 className="font-display text-lg tracking-tight">{t.scopeTitle}</h3>
              <div className="flex flex-wrap gap-2">
                {t.scopePills.map((p) => (
                  <span key={p} className="inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-foreground/80">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Temporary vs scaled */}
            <div className="space-y-3">
              <h3 className="font-display text-lg tracking-tight">{t.tempTitle}</h3>
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-2 text-muted">
                    <tr className="text-[11px] uppercase tracking-[0.1em]">
                      <th className="p-4 font-semibold">{t.tempCols[0]}</th>
                      <th className="p-4 font-semibold">{t.tempCols[1]}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-surface text-foreground/85">
                    {t.tempRows.map(([temp, scaled], i) => (
                      <tr key={i}>
                        <td className="p-4">{temp}</td>
                        <td className="p-4">{scaled}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Risks */}
            <div className="space-y-3">
              <h3 className="font-display text-lg tracking-tight">{t.risksTitle}</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {t.risks.map((r, i) => (
                  <li key={i} className="rounded-2xl border border-border bg-surface p-4 text-sm leading-relaxed text-foreground/85">
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact */}
            <div className="rounded-3xl border border-accent/30 bg-accent-soft/30 p-6 sm:p-8">
              <h3 className="font-display text-lg tracking-tight">{t.impactTitle}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/85">{t.impactBody}</p>
              <p className="mt-3 text-sm font-semibold text-foreground">{t.confidence}</p>
              <blockquote className="mt-5 border-l-2 border-accent/60 pl-4 text-[15px] leading-relaxed text-foreground/90">
                &ldquo;{VERBATIM.mvp}&rdquo;
              </blockquote>
              <blockquote className="mt-3 border-l-2 border-accent/60 pl-4 text-[15px] leading-relaxed text-foreground/90">
                &ldquo;{VERBATIM.experiment}&rdquo;
              </blockquote>
            </div>

            {/* Footer / disclosure */}
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-sm font-semibold text-foreground">{t.footerTitle}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.footerDiff}</p>
            </div>
            <p className="text-xs leading-relaxed text-muted">{t.disclosure}</p>
          </section>

          {/* Prev / next footer */}
          <nav className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/cases/retention-signals"
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
            >
              <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">←</span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.14em]">{t.prevLabel}</span>
                <span className="block font-medium text-foreground group-hover:text-accent">{t.prevTitle}</span>
              </span>
            </Link>
            <Link
              href="/#casos"
              className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent sm:text-right"
            >
              <span className="sm:order-2" aria-hidden="true">→</span>
              <span className="sm:order-1">
                <span className="block text-[11px] uppercase tracking-[0.14em]">{t.nextLabel}</span>
                <span className="block font-medium text-foreground group-hover:text-accent">{t.nextTitle}</span>
              </span>
            </Link>
          </nav>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
