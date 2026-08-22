import { ReactNode } from "react";

export default function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline decoration-mist underline-offset-4 hover:decoration-signal hover:text-signal transition-colors ${className}`}
    >
      {children}
    </a>
  );
}
