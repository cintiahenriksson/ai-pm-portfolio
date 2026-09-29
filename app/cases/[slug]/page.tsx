import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getSiteUrl } from "@/lib/site";
import {
  caseStudies,
  getAllCaseStudySlugs,
  getCaseStudy,
  type CaseStudy,
} from "@/lib/case-studies";

const SITE_URL = getSiteUrl();
const AUTHOR = "Cintia Henriksson";

type RouteParams = { slug: string };

/** Prerender every case study in the data module at build time. */
export function generateStaticParams(): RouteParams[] {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

/** Resolve an absolute URL for crawlers, which reject relative image paths. */
function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

/**
 * Per-case Open Graph + Twitter metadata, generated dynamically from the
 * project's own data. Each case gets its own title, description, canonical URL,
 * and social image.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return {
      title: "Case study not found",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `/cases/${study.slug}`;
  const ogImage = absoluteUrl(study.ogImage);

  return {
    title: `${study.title} — ${AUTHOR}`,
    description: study.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: absoluteUrl(canonical),
      siteName: AUTHOR,
      title: study.title,
      description: study.description,
      publishedTime: study.datePublished,
      modifiedTime: study.dateModified,
      authors: [AUTHOR],
      section: study.category,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.description,
      images: [ogImage],
    },
  };
}

/** Build the Schema.org Article graph for a case study. */
function buildArticleJsonLd(study: CaseStudy) {
  const canonical = absoluteUrl(`/cases/${study.slug}`);
  const author = {
    "@type": "Person",
    name: AUTHOR,
    url: SITE_URL,
    jobTitle: "Product Manager",
  };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    image: [absoluteUrl(study.ogImage)],
    author,
    publisher: author,
    datePublished: study.datePublished,
    dateModified: study.dateModified,
    articleSection: study.category,
    url: canonical,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const articleJsonLd = buildArticleJsonLd(study);
  const publishedLabel = dateFormatter.format(new Date(study.datePublished));

  return (
    <>
      <SiteHeader variant="inner" />

      <main className="text-foreground">
        {/*
          JSON-LD coexisting with the rendered content. Safely injected via
          dangerouslySetInnerHTML over JSON.stringify (no manual string
          building), so the structured data mirrors exactly what is displayed.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />

        <article>
          {/* Hero */}
          <section className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent/12 blur-[110px]"
            />
            <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-8">
              <div className="animate-rise space-y-5">
                <Link
                  href="/#casos"
                  className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
                >
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:-translate-x-1"
                  >
                    ←
                  </span>
                  <span>Back to all case studies</span>
                </Link>

                <span className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-accent">
                  {study.category}
                </span>

                <h1 className="font-display text-4xl sm:text-5xl tracking-tight leading-[1.05] text-balance">
                  {study.title}
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-muted text-pretty">
                  {study.summary}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                  <span className="font-medium text-foreground">{AUTHOR}</span>
                  <span aria-hidden="true">•</span>
                  <time dateTime={study.datePublished}>{publishedLabel}</time>
                  <span aria-hidden="true">•</span>
                  <span>{study.readingTimeMinutes} min read</span>
                </div>
              </div>
            </div>
          </section>

          {/* Body */}
          <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-16 space-y-12">
            {study.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-balance">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[15px] leading-relaxed text-foreground/85"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            {/* Prev / next footer */}
            <nav className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/#casos"
                className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
              >
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-x-1"
                >
                  ←
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.14em]">
                    Back
                  </span>
                  <span className="block font-medium text-foreground group-hover:text-accent">
                    All case studies
                  </span>
                </span>
              </Link>
            </nav>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
