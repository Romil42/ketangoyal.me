import Link from "next/link";
import { Heart } from "lucide-react";
import Container from "./Container";
import SocialLinks from "@/components/shared/SocialLinks";
import { siteConfig } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-mist bg-paper">
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl text-ink">Ketan Goyal.</p>
            <p className="mt-2 text-sm text-slate">{siteConfig.footerTagline}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate hover:text-signal transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <SocialLinks />
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-slate hover:text-signal transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-mist pt-6 text-xs text-dust md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <p>© {year} Ketan Goyal. All rights reserved.</p>
            <p className="inline-flex items-center gap-1.5">
              Made with
              <Heart className="h-3.5 w-3.5 fill-signal text-signal" aria-label="heart" />
              by
              <a
                href={siteConfig.social.kraftt ?? "https://krafttdigital.in"}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate transition-colors hover:text-signal"
              >
                Kraftt Digital
              </a>
              .
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-signal transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-signal transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
