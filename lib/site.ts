export const SITE_NAME = "Cintia Henriksson — Senior Product Manager";

/**
 * Canonical origin for the site, used by metadata, robots, and sitemap.
 * Prefers an explicit override, then the Vercel production domain, and
 * falls back to the default deployment URL for local/dev builds.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) return `https://${vercelProd}`;

  return "https://ai-pm-portfolio.vercel.app";
}

/** Every indexable route on the site. */
export const ROUTES = [
  "/",
  "/about",
  "/cases/remesas-discovery",
  "/cases/agente-pagos",
  "/cases/alumnas-roadmap",
] as const;
