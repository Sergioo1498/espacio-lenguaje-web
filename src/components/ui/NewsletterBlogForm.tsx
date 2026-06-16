"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  variant?: "card" | "inline";
  title?: string;
  description?: string;
}

export default function NewsletterBlogForm({
  variant = "card",
  title = "Newsletter semanal del blog",
  description = "Los lunes: un post nuevo + una idea concreta para aplicar en casa esa misma semana. Sin spam, baja con un click.",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "suggest">("idle");
  const [message, setMessage] = useState("");
  const [suggestion, setSuggestion] = useState<string | null>(null);

  async function submit(forcedEmail?: string, accepted = false) {
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forcedEmail || email, acceptedSuggestion: accepted }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setMessage("¡Listo! Revisa tu bandeja de entrada (y spam, por si acaso). Nos vemos el lunes.");
        setEmail("");
        setSuggestion(null);
      } else if (data.suggestion) {
        setSuggestion(data.suggestion);
        setStatus("suggest");
      } else {
        setStatus("error");
        setMessage(data.error || "Algo falló. Inténtalo de nuevo.");
      }
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Inténtalo de nuevo.");
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    submit();
  };

  const wrapClass =
    variant === "card"
      ? "rounded-2xl bg-arena/60 p-6 md:p-8 border border-cacao/5"
      : "border-t border-b border-cacao/10 py-8";

  return (
    <div className={wrapClass}>
      {title && <h3 className="font-serif text-xl text-cacao mb-2">{title}</h3>}
      {description && <p className="text-sm text-texto-secundario leading-relaxed mb-4">{description}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error" || status === "suggest") setStatus("idle");
            setSuggestion(null);
          }}
          placeholder="tu@email.com"
          autoComplete="email"
          required
          disabled={status === "loading"}
          className="flex-1 min-w-0 rounded-pill px-5 py-3 text-base bg-white text-cacao placeholder:text-texto-muted outline-none ring-1 ring-cacao/10 focus:ring-2 focus:ring-terracota/50 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-pill bg-cacao px-6 py-3 text-base font-semibold text-white transition-all hover:bg-cacao/90 whitespace-nowrap disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Suscribirme"}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {status === "suggest" && suggestion && (
          <motion.div
            key="suggest"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-3 text-sm"
          >
            <span className="text-cacao">¿Quisiste decir </span>
            <button
              type="button"
              onClick={() => {
                setEmail(suggestion);
                submit(suggestion, true);
              }}
              className="font-semibold text-terracota underline"
            >
              {suggestion}
            </button>
            <span className="text-cacao">?</span>
          </motion.div>
        )}

        {(status === "success" || status === "error") && (
          <motion.p
            key={status}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className={`mt-3 text-sm font-medium ${status === "success" ? "text-verde-dark" : "text-terracota"}`}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
