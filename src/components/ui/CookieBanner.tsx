"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = (type: "all" | "essential") => {
    localStorage.setItem("cookie-consent", type);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] rounded-t-2xl px-5 py-4 md:px-8 md:py-5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center gap-4">
        <p className="text-sm text-texto-secundario flex-1 leading-relaxed">
          Utilizamos cookies propias y de terceros para analizar el uso de este sitio web y mejorar
          tu experiencia. Puedes aceptar o rechazar las cookies no esenciales.{" "}
          <Link href="/cookies" className="text-terracota underline underline-offset-2 hover:text-terracota-dark">
            Más información
          </Link>
        </p>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            onClick={() => accept("all")}
            className="rounded-pill bg-terracota px-6 py-2.5 text-sm font-semibold text-white hover:bg-terracota-dark transition-colors touch-manipulation"
          >
            Aceptar
          </button>
          <button
            onClick={() => accept("essential")}
            className="rounded-pill border-2 border-terracota px-6 py-2.5 text-sm font-semibold text-terracota hover:bg-terracota hover:text-white transition-colors touch-manipulation"
          >
            Solo esenciales
          </button>
        </div>
      </div>
    </div>
  );
}
