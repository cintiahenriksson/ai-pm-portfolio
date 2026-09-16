export const SITE_NAME = "Cintia Henriksson — Senior Product Manager";

/**
 * Canonical origin for the site, used by metadata, robots, and sitemap.
 * Prefers an explicit override (set NEXT_PUBLIC_SITE_URL when moving to a
 * custom domain), and otherwise uses the canonical production domain.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  return "https://cintiahenriksson.vercel.app";
}

/** Every indexable route on the site. */
export const ROUTES = [
  "/",
  "/about",
  "/cases/remesas-discovery",
  "/cases/agente-pagos",
  "/cases/alumnas-roadmap",
] as const;
