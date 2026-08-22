"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import { siteConfig } from "@/content/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/95 backdrop-blur transition-shadow ${
        scrolled ? "border-b border-mist" : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-18 items-center justify-between py-4">
        <Link href="/" className="inline-flex items-center gap-3 text-ink">
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-mist bg-fog">
            <Image
              src="/images/ketan/ketan-goyal-formal-candid.JPG"
              alt=""
              fill
              sizes="36px"
              className="object-cover"
              style={{ objectPosition: "54% 26%" }}
              priority
            />
          </span>
          <span className="font-display text-xl">Ketan Goyal.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href ? "text-signal" : "text-slate hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center h-10 w-10 -mr-2"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path
                d="M4 4L18 18M18 4L4 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <>
                <path d="M2 6H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M2 11H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M2 16H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="md:hidden border-t border-mist bg-paper"
        >
          <Container className="flex flex-col py-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-base font-medium border-b border-mist last:border-b-0 ${
                  pathname === item.href ? "text-signal" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
