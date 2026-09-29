/**
 * Data source for the dynamic case-study route (`app/cases/[slug]/page.tsx`).
 *
 * This is the scalable pattern for new case studies: add an entry here and a
 * fully SEO-configured page (dynamic Open Graph tags + Article JSON-LD) is
 * generated automatically. The existing bespoke case pages
 * (e.g. /cases/remesas-discovery) remain hand-built client components; because
 * static route segments take priority over a dynamic `[slug]`, they are never
 * shadowed by this route.
 */

export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
}

export interface CaseStudy {
  slug: string;
  /** Short category, surfaced as the hero kicker and schema `articleSection`. */
  category: string;
  title: string;
  /** Meta description + OG/Twitter description + JSON-LD `description`. */
  description: string;
  /** Path to a 1200x630 social image, relative to the site root. */
  ogImage: string;
  /** ISO 8601 dates used by OG `article:published_time` and JSON-LD. */
  datePublished: string;
  dateModified: string;
  readingTimeMinutes: number;
  /** One-line summary shown under the hero title. */
  summary: string;
  sections: CaseStudySection[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "governed-ai-rollout",
    category: "AI Governance • 0→1",
    title: "Shipping a Governed AI Assistant in Regulated Fintech",
    description:
      "How a support AI assistant went from prototype to production inside a regulated fintech — with human-in-the-loop review, auditable guardrails, and a rollout that legal, risk, and support all signed off on.",
    ogImage: "/og/governed-ai-rollout.png",
    datePublished: "2024-11-12",
    dateModified: "2025-02-04",
    readingTimeMinutes: 7,
    summary:
      "Turning an impressive demo into a system that risk and compliance could stand behind, without stalling delivery.",
    sections: [
      {
        heading: "01. The tension: speed vs. accountability",
        paragraphs: [
          "The demo landed in a week. Getting it into production took a quarter — and that gap is the actual story. A generative assistant that drafts customer replies is trivial to prototype and genuinely hard to govern, because every answer it sends is a statement the company is legally accountable for.",
          "The goal was never 'ship AI.' It was to reduce support handling time without introducing a new class of compliance risk that no one could explain after the fact.",
        ],
      },
      {
        heading: "02. Guardrails as product requirements, not afterthoughts",
        paragraphs: [
          "Every generated reply was constrained to a retrieval set of approved knowledge-base articles, and each draft carried the citations it was built from. Agents saw the sources inline and could reject a draft in one click.",
          "Nothing reached a customer unreviewed during the first phase. The assistant drafted; a human sent. That single decision is what moved the risk conversation from 'no' to 'measured yes.'",
        ],
      },
      {
        heading: "03. Measuring what mattered",
        paragraphs: [
          "We instrumented acceptance rate (how often agents sent a draft unedited), edit distance (how much they changed it), and escalation rate. Acceptance climbed from 41% to 68% over six weeks as the retrieval set was tuned.",
          "Handling time dropped 22% without a measurable change in complaint or reopen rates — the guardrail metrics that would have signaled the assistant was creating downstream harm.",
        ],
      },
      {
        heading: "04. What I would keep and what I would change",
        paragraphs: [
          "Human-in-the-loop first was correct: it bought the trust needed to expand scope later. The mistake was underinvesting early in the evaluation harness — we were reading transcripts by hand far longer than we should have.",
          "The durable lesson: in regulated contexts, the roadmap is a trust curve. You earn autonomy for the system incrementally, and the evidence you collect is the currency.",
        ],
      },
    ],
  },
  {
    slug: "signal-driven-roadmap",
    category: "Discovery • Prioritization",
    title: "From Support Signals to a Signal-Driven Roadmap",
    description:
      "Replacing opinion-led prioritization with a lightweight system that turns raw support and review signals into a defensible, sized, and continuously updated product roadmap.",
    ogImage: "/og/signal-driven-roadmap.png",
    datePublished: "2024-08-27",
    dateModified: "2025-01-18",
    readingTimeMinutes: 6,
    summary:
      "Building the connective tissue between what customers say every day and what the team decides to build next.",
    sections: [
      {
        heading: "01. The problem with the loudest-voice roadmap",
        paragraphs: [
          "Prioritization ran on whoever argued most convincingly in the room. Support saw the same pain thousands of times a month, but that signal never made it into planning in a form anyone could weigh against effort.",
          "The opportunity wasn't a new framework. It was a pipeline: capture signals where they already exist, structure them, and size them so a roadmap decision could be defended with evidence instead of conviction.",
        ],
      },
      {
        heading: "02. Structuring the raw signal",
        paragraphs: [
          "Support tickets and public reviews were coded against a small, versioned taxonomy of problem types. Keeping the taxonomy deliberately small kept it consistent between coders — a broad codebook is a coin flip, a tight one is a measurement.",
          "Each theme carried linked verbatim quotes, so a line item on the roadmap could always be traced back to real customer language rather than a paraphrase.",
        ],
      },
      {
        heading: "03. Sizing opportunities in business terms",
        paragraphs: [
          "Each theme was extrapolated to monthly incidence and multiplied by a severity weight to produce a comparable opportunity score. Suddenly 'customers are confused by fees' had a number next to it that stood beside engineering effort.",
          "The top two themes accounted for more than half of all friction — which made the first two quarters of the roadmap an easy, evidence-backed conversation instead of a debate.",
        ],
      },
      {
        heading: "04. Keeping it alive",
        paragraphs: [
          "The pipeline ran on a cadence, so the roadmap re-scored itself as new signals arrived rather than freezing at planning time. Priorities shifted when the evidence shifted, and everyone could see why.",
          "The outcome that mattered most wasn't a single shipped feature — it was that prioritization stopped being a persuasion contest.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((study) => study.slug);
}
