"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

interface Props {
  producto: string;
  campana: string;
}

/** Registra el evento `compra` una sola vez al aterrizar en /compra-exitosa. */
export default function PurchaseTracker({ producto, campana }: Props) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    track("compra", { producto, campana });
  }, [producto, campana]);
  return null;
}
