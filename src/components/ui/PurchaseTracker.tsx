"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

interface Props {
  producto: string;
  campana: string;
}

/**
 * Registra el evento `compra` una sola vez al aterrizar en /compra-exitosa.
 *
 * En el layout, <Analytics /> se monta DESPUÉS de children, así que en una carga
 * fría `window.va` todavía no existe cuando corre este efecto y `track()` se
 * descarta en silencio. Esperamos a que la cola esté disponible antes de emitir.
 */
export default function PurchaseTracker({ producto, campana }: Props) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    let tries = 0;
    const id = setInterval(() => {
      const ready = typeof window !== "undefined" && "va" in window;
      if (!ready && tries++ < 40) return; // ~10 s de margen
      clearInterval(id);
      if (sent.current) return;
      sent.current = true;
      track("compra", { producto, campana });
    }, 250);
    return () => clearInterval(id);
  }, [producto, campana]);

  return null;
}
