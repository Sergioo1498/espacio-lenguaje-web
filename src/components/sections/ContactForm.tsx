"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SUBJECT_OPTIONS = [
  "Tengo dudas sobre el lenguaje de mi hijo/a",
  "Quiero información sobre recursos",
  "Colaboraciones profesionales",
  "Otro",
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setSubject(SUBJECT_OPTIONS[0]);
        setMessage("");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Algo salió mal. Inténtalo de nuevo.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Error de conexión. Comprueba tu red e inténtalo de nuevo.");
    }
  }

  const inputClasses =
    "w-full bg-white rounded-2xl border border-cacao/10 px-5 py-3.5 text-cacao placeholder:text-texto-muted focus:outline-none focus:ring-2 focus:ring-terracota/40 transition-shadow";

  return (
    <section className="bg-crema section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* ---- Form column ---- */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-cacao mb-1.5"
                >
                  Nombre
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className={inputClasses}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-cacao mb-1.5"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className={inputClasses}
                />
              </div>

              {/* Asunto */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-cacao mb-1.5"
                >
                  Asunto
                </label>
                <select
                  id="contact-subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={inputClasses}
                >
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mensaje */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-cacao mb-1.5"
                >
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  className={inputClasses + " resize-y"}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary rounded-full px-8 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Enviando..." : "Enviar mensaje"}
              </button>

              {/* Status messages */}
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-verde-dark font-medium"
                  >
                    ¡Mensaje enviado! Te responderemos lo antes posible.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-terracota font-medium"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* ---- Info column ---- */}
          <div className="lg:col-span-2">
            <div className="bg-arena rounded-3xl p-8 space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <span className="mt-0.5 shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="2"
                      y="4"
                      width="20"
                      height="16"
                      rx="3"
                      stroke="#C4745A"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M2 7L12 14L22 7"
                      stroke="#C4745A"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-sm text-texto-secundario mb-1">Email</p>
                  <a
                    href="mailto:hola@espaciolenguaje.com"
                    className="text-cacao font-medium hover:text-terracota transition-colors"
                  >
                    hola@espaciolenguaje.com
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4">
                <span className="mt-0.5 shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      stroke="#C4745A"
                      strokeWidth="1.8"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="5"
                      stroke="#C4745A"
                      strokeWidth="1.8"
                    />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="#C4745A" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm text-texto-secundario mb-1">
                    Instagram
                  </p>
                  <a
                    href="https://instagram.com/espaciolenguaje"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cacao font-medium hover:text-terracota transition-colors"
                  >
                    @espaciolenguaje
                  </a>
                </div>
              </div>

              {/* Response time */}
              <div className="flex items-start gap-4">
                <span className="mt-0.5 shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#C4745A"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M12 6V12L16 14"
                      stroke="#C4745A"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-sm text-texto-secundario mb-1">
                    Tiempo de respuesta
                  </p>
                  <p className="text-cacao font-medium">
                    Respondemos en 24-48 horas laborables
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
