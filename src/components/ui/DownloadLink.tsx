"use client";

import { track } from "@vercel/analytics";

interface Props {
  href: string;
  recurso: string;
  children: React.ReactNode;
  className?: string;
}

/** Enlace de descarga que registra el evento `descarga_pdf`. */
export default function DownloadLink({ href, recurso, children, className }: Props) {
  return (
    <a
      href={href}
      download
      onClick={() => track("descarga_pdf", { recurso })}
      className={className}
    >
      {children}
    </a>
  );
}
