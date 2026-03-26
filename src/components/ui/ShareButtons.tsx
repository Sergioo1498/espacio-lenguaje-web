"use client";

import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;

  return (
    <div className="flex items-center gap-2">
      {/* Copy link */}
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-cacao/20 text-cacao hover:border-terracota hover:text-terracota transition-colors"
        aria-label="Copiar enlace"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M5.5 8.5L8.5 5.5M6 4.5L7.5 3C8.33 2.17 9.67 2.17 10.5 3L11 3.5C11.83 4.33 11.83 5.67 11 6.5L9.5 8M4.5 6L3 7.5C2.17 8.33 2.17 9.67 3 10.5L3.5 11C4.33 11.83 5.67 11.83 6.5 11L8 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {copied ? "Copiado" : "Copiar"}
      </button>

      {/* Twitter/X */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-cacao/20 text-cacao hover:border-terracota hover:text-terracota transition-colors"
        aria-label="Compartir en X"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
          <path d="M11.02 1.5H13.1L8.64 6.6L13.9 12.5H9.78L6.55 8.37L2.85 12.5H0.77L5.53 7.08L0.5 1.5H4.72L7.62 5.3L11.02 1.5ZM10.28 11.36H11.44L4.17 2.68H2.92L10.28 11.36Z" />
        </svg>
      </a>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-cacao/20 text-cacao hover:border-verde hover:text-verde transition-colors"
        aria-label="Compartir en WhatsApp"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
          <path d="M7.01 1.17C3.79 1.17 1.17 3.79 1.17 7.01C1.17 8.12 1.47 9.15 2 10.03L1.17 12.83L4.05 12.02C4.9 12.5 5.92 12.83 7.01 12.83C10.22 12.83 12.83 10.22 12.83 7.01C12.83 3.79 10.22 1.17 7.01 1.17ZM9.84 9.17C9.72 9.5 9.08 9.83 8.75 9.83C8.42 9.83 7.17 9.5 5.92 8.17C4.67 6.83 4.17 5.67 4.17 5.25C4.17 4.83 4.5 4.58 4.67 4.42C4.83 4.25 5 4.25 5.17 4.25C5.33 4.25 5.42 4.25 5.58 4.25C5.75 4.25 5.92 4.17 6.08 4.58C6.25 5 6.58 5.75 6.58 5.83C6.67 5.92 6.67 6.08 6.58 6.17C6.5 6.25 6.42 6.42 6.33 6.5C6.25 6.58 6.08 6.75 6.17 6.92C6.33 7.17 6.75 7.83 7.33 8.33C8.08 8.92 8.58 9.08 8.83 9.17C9.08 9.25 9.17 9.17 9.33 9C9.5 8.83 9.58 8.67 9.75 8.5C9.92 8.33 10 8.33 10.17 8.42C10.33 8.5 11.08 8.92 11.08 8.92C11.08 8.92 11.08 9 9.84 9.17Z" />
        </svg>
      </a>
    </div>
  );
}
