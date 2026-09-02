"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { track } from "@vercel/analytics";

/**
 * Captura de lead en el punto de descarga del post de fichas.
 * Solo afecta al enlace de descarga de NUESTRO PDF gratuito: el resto del
 * artículo (incluida la tabla de repositorios externos) sigue abierto.
 */
export default function FichasGate() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [perfil, setPerfil] = useState<"familia" | "profesional" | "">("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (!consent) {
      setStatus("error");
      setMessage("Necesitamos tu consentimiento para enviarte la guía.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/lead-fichas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          nombre: nombre.trim() || undefined,
          perfil: perfil || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        track("lead", { fuente: "fichas-gratis", perfil: perfil || "sin_responder" });
        router.push("/gracias/fichas-gratis");
      } else {
        setStatus("error");
        setMessage(data.error || "Ha ocurrido un error. Inténtalo de nuevo.");
      }
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Inténtalo de nuevo.");
    }
  }

  const perfilOption = (value: "familia" | "profesional", label: string) => (
    <button
      key={value}
      type="button"
      onClick={() => setPerfil(perfil === value ? "" : value)}
      aria-pressed={perfil === value}
      className={`flex-1 rounded-pill px-4 py-2.5 text-sm font-medium transition-colors ${
        perfil === value
          ? "bg-verde text-white"
          : "bg-white text-cacao ring-1 ring-cacao/15 hover:ring-terracota/40"
      }`}
    >
      {label}
    </button>
  );

  return (
    <aside className="my-8 rounded-2xl border border-verde/25 bg-white p-6 shadow-sm md:p-7">
      <p className="font-serif text-xl text-cacao">
        Descarga gratis la Guía de Hitos del Lenguaje 0-6 años
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-texto-secundario">
        11 páginas revisadas por logopeda colegiada: qué fichas tocan según la edad de tu
        peque y qué señales conviene vigilar. Te la enviamos por email y la tienes al
        instante en la página siguiente.
      </p>

      <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu email"
          autoComplete="email"
          disabled={status === "loading"}
          className="rounded-pill bg-white px-5 py-3 text-base text-cacao outline-none ring-1 ring-cacao/15 placeholder:text-texto-muted focus:ring-2 focus:ring-terracota/50"
        />
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre (opcional)"
          autoComplete="given-name"
          disabled={status === "loading"}
          className="rounded-pill bg-white px-5 py-3 text-base text-cacao outline-none ring-1 ring-cacao/15 placeholder:text-texto-muted focus:ring-2 focus:ring-terracota/50"
        />

        <fieldset className="mt-1">
          <legend className="mb-2 text-sm font-medium text-cacao">
            ¿Eres familia o profesional?
          </legend>
          <div className="flex gap-2">
            {perfilOption("familia", "Familia")}
            {perfilOption("profesional", "Profesional")}
          </div>
        </fieldset>

        <label className="mt-2 flex items-start gap-2.5 text-[13px] leading-relaxed text-texto-secundario">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-verde"
          />
          <span>
            Acepto recibir la guía y los emails de Espacio Lenguaje. Puedo darme de baja
            cuando quiera. Consulta la{" "}
            <Link href="/privacidad" className="underline hover:text-terracota">
              política de privacidad
            </Link>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 rounded-pill bg-terracota px-6 py-3.5 font-sans font-semibold text-white transition-colors hover:bg-terracota-dark disabled:opacity-60"
        >
          {status === "loading" ? "Enviando..." : "Descargar gratis"}
        </button>

        {status === "error" && message && (
          <p role="alert" className="text-sm text-terracota-dark">
            {message}
          </p>
        )}
      </form>
    </aside>
  );
}
