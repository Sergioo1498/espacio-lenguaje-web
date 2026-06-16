"use client";

import Script from "next/script";

/**
 * Microsoft Clarity — heatmaps + session recordings (free).
 * Inyecta el snippet solo si NEXT_PUBLIC_CLARITY_ID está configurada.
 *
 * Producción: NEXT_PUBLIC_CLARITY_ID debe estar definido en Vercel
 * (Settings → Environment Variables, marcando Production + Preview + Dev).
 * Dashboard del proyecto: https://clarity.microsoft.com
 */
export default function Clarity() {
  const id = process.env.NEXT_PUBLIC_CLARITY_ID;
  if (!id) return null;
  return (
    <Script
      id="ms-clarity"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${id}");
        `,
      }}
    />
  );
}
