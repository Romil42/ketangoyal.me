import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Eyebrow from "@/components/typography/Eyebrow";
import ExternalLink from "@/components/shared/ExternalLink";
import ContactForm from "@/components/contact/ContactForm";
import { ContactPageJsonLd } from "@/components/shared/StructuredData";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Ketan Goyal",
  description:
    "Contact Ketan Goyal, Software Engineer and founder of Kraftt Digital, about software systems, digital transformation, automation, or collaboration.",
  path: "/contact",
  keywords: [
    "contact Ketan Goyal",
    "Ketan Goyal email",
    "contact software engineer India",
    "Kraftt Digital contact",
    "digital transformation consultation India",
  ],
});

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-24">
      <ContactPageJsonLd />
      <div className="max-w-2xl">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="font-display mt-6 text-4xl sm:text-5xl text-ink">Let&rsquo;s connect.</h1>
        <p className="mt-6 text-lg text-slate prose-measure">
          Share what you&rsquo;re working on, what you need help with, or simply what you&rsquo;d
          like to discuss. I&rsquo;ll reply directly by email.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <h2 className="font-display text-2xl text-ink">Contact details</h2>
          <p className="mt-3 text-slate">
            Prefer writing directly? These are the best places to reach me.
          </p>

          <dl className="mt-8 space-y-8">
            <div className="border-t border-mist pt-6">
              <dt className="eyebrow">Email</dt>
              <dd className="mt-2 break-words">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-display text-xl sm:text-2xl text-ink hover:text-signal transition-colors"
                >
                  {siteConfig.email}
                </a>
              </dd>
            </div>

            {siteConfig.social.instagram ? (
              <div className="border-t border-mist pt-6">
                <dt className="eyebrow">Instagram</dt>
                <dd className="mt-2">
                  <ExternalLink
                    href={siteConfig.social.instagram}
                    className="font-display text-2xl text-ink"
                  >
                    @ketangoyal_001
                  </ExternalLink>
                </dd>
              </div>
            ) : null}

            {siteConfig.social.linkedin ? (
              <div className="border-t border-mist pt-6">
                <dt className="eyebrow">LinkedIn</dt>
                <dd className="mt-2">
                  <ExternalLink
                    href={siteConfig.social.linkedin}
                    className="font-display text-2xl text-ink"
                  >
                    Ketan Goyal
                  </ExternalLink>
                </dd>
              </div>
            ) : null}

            {siteConfig.social.kraftt ? (
              <div className="border-t border-mist pt-6">
                <dt className="eyebrow">Kraftt Digital</dt>
                <dd className="mt-2">
                  <ExternalLink
                    href={siteConfig.social.kraftt}
                    className="font-display text-2xl text-ink"
                  >
                    krafttdigital.in
                  </ExternalLink>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="lg:col-span-7">
          <h2 className="font-display text-2xl text-ink">Send a message</h2>
          <div className="mt-6">
            <ContactForm recipient={siteConfig.email} />
          </div>
        </div>
      </div>
    </Container>
  );
}
