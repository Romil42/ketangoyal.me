import { siteConfig } from "@/content/site";
import ExternalLink from "./ExternalLink";

const LABELS: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  github: "GitHub",
  kraftt: "Kraftt Digital",
};

export default function SocialLinks({ className = "" }: { className?: string }) {
  const entries = Object.entries(siteConfig.social).filter(([, url]) => Boolean(url)) as [
    string,
    string,
  ][];

  if (entries.length === 0) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`}>
      {entries.map(([key, url]) => (
        <li key={key}>
          <ExternalLink href={url} className="text-sm font-medium text-slate">
            {LABELS[key] ?? key}
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}
