"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsletterFormProps {
  /** Visual variant to adapt to different backgrounds */
  variant?: "dark" | "light";
  /** Button label */
  buttonText?: string;
}

export default function NewsletterForm({
  variant = "dark",
  buttonText = "Descargar gratis",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage("¡Listo! Te hemos enviado la guía a tu email. Revisa tu bandeja de entrada (y spam, por si acaso).");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Ha ocurrido un error. Inténtalo de nuevo.");
      }
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Inténtalo de nuevo.");
    }
  };

  const isDark = variant === "dark";

  const inputClasses = isDark
    ? "flex-1 rounded-pill px-6 py-3.5 text-sm bg-white text-cacao placeholder:text-texto-muted outline-none focus:ring-2 focus:ring-terracota/50"
    : "flex-1 rounded-pill px-6 py-3.5 text-sm bg-white text-cacao placeholder:text-texto-muted outline-none ring-1 ring-cacao/10 focus:ring-2 focus:ring-terracota/50";

  return (
    <div>
      <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Tu email"
          required
          disabled={status === "loading"}
          className={`${inputClasses} ${status === "loading" ? "opacity-60" : ""}`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-pill bg-terracota px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-terracota-dark whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
        >
          {status === "loading" ? "Enviando..." : buttonText}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {(status === "success" || status === "error") && (
          <motion.p
            key={status}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className={`mt-3 text-sm font-medium ${
              status === "success"
                ? isDark
                  ? "text-verde-light"
                  : "text-verde-dark"
                : isDark
                  ? "text-terracota-light"
                  : "text-terracota"
            }`}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
