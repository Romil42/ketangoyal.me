const WRITING_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function safeExternalHref(
  value: unknown,
  options: {allowMailto?: boolean} = {},
): string | null {
  if (typeof value !== "string" || value.length > 2048) return null;

  const candidate = value.trim();
  if (!candidate) return null;

  try {
    const parsed = new URL(candidate);
    const allowedProtocols = options.allowMailto
      ? new Set(["https:", "http:", "mailto:"])
      : new Set(["https:", "http:"]);

    if (!allowedProtocols.has(parsed.protocol)) return null;
    if ((parsed.protocol === "https:" || parsed.protocol === "http:") && !parsed.hostname) {
      return null;
    }
    if (parsed.protocol === "mailto:" && !parsed.pathname.includes("@")) return null;

    return parsed.href;
  } catch {
    return null;
  }
}

export function safeWritingHref(slug: unknown): string | null {
  if (typeof slug !== "string" || !WRITING_SLUG_PATTERN.test(slug)) return null;
  return `/writing/${slug}`;
}
