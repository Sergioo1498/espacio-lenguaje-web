"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ageRanges, quizByAge, interpretScore, type AgeRange, type QuizResult } from "@/lib/quiz-data";

type Stage = "intro" | "age" | "questions" | "result";

interface Answer {
  questionId: string;
  isAlert: boolean;
}

export default function QuizClient() {
  const [stage, setStage] = useState<Stage>("intro");
  const [age, setAge] = useState<AgeRange | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [leadMessage, setLeadMessage] = useState("");

  const questions = age ? quizByAge[age] : [];
  const currentQ = questions[qIndex];
  const score = answers.filter((a) => a.isAlert).length;
  const result: QuizResult | null =
    age && answers.length === questions.length ? interpretScore(score, questions.length, age) : null;

  function reset() {
    setStage("intro");
    setAge(null);
    setQIndex(0);
    setAnswers([]);
    setEmail("");
    setNombre("");
    setLeadStatus("idle");
    setLeadMessage("");
  }

  function selectAge(a: AgeRange) {
    setAge(a);
    setStage("questions");
  }

  function answer(value: "yes" | "no" | "sometimes") {
    if (!currentQ || !age) return;
    const isAlert =
      value === currentQ.alertWhen || (value === "sometimes" && currentQ.alertWhen === "yes");
    const newAnswers = [...answers, { questionId: currentQ.id, isAlert }];
    setAnswers(newAnswers);
    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
    } else {
      setStage("result");
    }
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (leadStatus === "loading") return;
    setLeadStatus("loading");
    setLeadMessage("");
    try {
      const res = await fetch("/api/quiz-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          nombre: nombre.trim() || undefined,
          age,
          score,
          total: questions.length,
          level: result?.level,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setLeadStatus("success");
        setLeadMessage("¡Listo! Revisa tu email — te hemos enviado la guía con el plan completo por edad.");
        setEmail("");
      } else {
        setLeadStatus("error");
        setLeadMessage(data.error || "Algo falló. Inténtalo de nuevo.");
      }
    } catch {
      setLeadStatus("error");
      setLeadMessage("Error de conexión.");
    }
  }

  return (
    <div className="container-custom max-w-2xl mx-auto py-12 md:py-16">
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <span className="inline-block bg-verde/15 text-verde-dark text-xs font-medium px-4 py-1.5 rounded-full mb-4">
              Test gratuito · 2 minutos
            </span>
            <h1 className="text-3xl md:text-5xl font-serif text-cacao mb-5 leading-tight">
              ¿Necesita mi peque consulta con logopeda?
            </h1>
            <p className="text-lg text-texto-secundario mb-8 leading-relaxed max-w-xl mx-auto">
              Un test rápido basado en hitos clínicos (GAT, AEP, Bosch 2004) para ayudarte a saber si los tiempos de tu peque están en rango — y si conviene consultar con una profesional. Revisado por logopeda colegiada.
            </p>
            <div className="rounded-2xl bg-arena/50 p-5 md:p-6 text-left text-sm text-texto-secundario mb-8 space-y-2">
              <p>✓ Solo 7 preguntas adaptadas a la edad de tu peque.</p>
              <p>✓ Resultado interpretado al instante, con tres niveles posibles.</p>
              <p>✓ <strong>No diagnostica</strong> — solo te orienta sobre si conviene profundizar.</p>
            </div>
            <button
              onClick={() => setStage("age")}
              className="rounded-pill bg-terracota hover:bg-terracota-dark text-white px-8 py-4 text-base font-semibold transition-all hover:scale-[1.02]"
            >
              Empezar test →
            </button>
          </motion.div>
        )}

        {stage === "age" && (
          <motion.div
            key="age"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-serif text-2xl md:text-3xl text-cacao mb-2">¿Qué edad tiene tu peque?</h2>
            <p className="text-texto-secundario mb-6">Las preguntas se adaptan al rango que elijas.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ageRanges.map((r) => (
                <button
                  key={r.id}
                  onClick={() => selectAge(r.id)}
                  className="text-left rounded-2xl border-2 border-arena bg-white p-5 hover:border-terracota hover:bg-terracota/5 transition-all"
                >
                  <span className="block font-serif text-lg text-cacao">{r.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {stage === "questions" && currentQ && age && (
          <motion.div
            key={`q-${qIndex}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs text-texto-muted mb-2">
                <span>Pregunta {qIndex + 1} de {questions.length}</span>
                <span>{ageRanges.find((r) => r.id === age)?.label}</span>
              </div>
              <div className="h-1.5 bg-arena rounded-full overflow-hidden">
                <div
                  className="h-full bg-terracota transition-all duration-300"
                  style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
            <h2 className="font-serif text-xl md:text-2xl text-cacao mb-3 leading-snug">
              {currentQ.question}
            </h2>
            {currentQ.hint && (
              <p className="text-xs text-texto-muted italic mb-6">{currentQ.hint}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <button
                onClick={() => answer("yes")}
                className="rounded-2xl border-2 border-arena bg-white p-4 hover:border-verde hover:bg-verde/5 transition-all font-semibold text-cacao"
              >
                Sí
              </button>
              <button
                onClick={() => answer("sometimes")}
                className="rounded-2xl border-2 border-arena bg-white p-4 hover:border-cacao/30 hover:bg-arena/30 transition-all font-semibold text-cacao"
              >
                A veces / no estoy seguro
              </button>
              <button
                onClick={() => answer("no")}
                className="rounded-2xl border-2 border-arena bg-white p-4 hover:border-terracota hover:bg-terracota/5 transition-all font-semibold text-cacao"
              >
                No
              </button>
            </div>
          </motion.div>
        )}

        {stage === "result" && result && age && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`rounded-3xl p-6 md:p-8 mb-6 border-2 ${
                result.level === "verde"
                  ? "bg-verde/10 border-verde/30"
                  : result.level === "amarillo"
                    ? "bg-arena border-cacao/15"
                    : "bg-terracota/10 border-terracota/30"
              }`}
            >
              <span
                className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${
                  result.level === "verde"
                    ? "bg-verde text-white"
                    : result.level === "amarillo"
                      ? "bg-cacao text-white"
                      : "bg-terracota text-white"
                }`}
              >
                {result.level === "verde" ? "🟢 En rango" : result.level === "amarillo" ? "🟡 Vigilar" : "🔴 Consultar"}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-cacao mb-4 leading-tight">{result.title}</h2>
              <p className="text-cacao/90 mb-4 leading-relaxed">{result.intro}</p>
              <p className="text-cacao/90 leading-relaxed">{result.recommendation}</p>
            </div>

            {leadStatus !== "success" ? (
              <div className="rounded-2xl bg-cacao text-white p-6 md:p-8">
                <h3 className="font-serif text-xl md:text-2xl mb-2">
                  Plan completo por edad — guía gratuita
                </h3>
                <p className="text-white/80 text-sm mb-5 leading-relaxed">
                  Recibe en tu email la guía de hitos del lenguaje 0-6 años con: señales de alerta por edad, ejercicios concretos de 10 min/día, y cuándo consultar. Revisada por logopeda colegiada.
                </p>
                <form onSubmit={submitLead} className="space-y-3">
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre (opcional)"
                    autoComplete="given-name"
                    className="w-full rounded-pill bg-white text-cacao placeholder:text-texto-muted px-5 py-3 outline-none"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    autoComplete="email"
                    required
                    disabled={leadStatus === "loading"}
                    className="w-full rounded-pill bg-white text-cacao placeholder:text-texto-muted px-5 py-3 outline-none disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={leadStatus === "loading"}
                    className="w-full rounded-pill bg-terracota hover:bg-terracota-dark text-white py-3 text-base font-semibold transition-all disabled:opacity-60"
                  >
                    {leadStatus === "loading" ? "Enviando..." : "Descargar guía gratis →"}
                  </button>
                </form>
                {leadStatus === "error" && (
                  <p className="mt-3 text-sm text-terracota-light">{leadMessage}</p>
                )}
                <p className="mt-4 text-xs text-white/60 leading-relaxed">
                  Sin spam. Te enviamos la guía + 4 emails con ideas prácticas. Baja con un click cuando quieras.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl bg-verde/15 border-2 border-verde/30 p-6 text-center">
                <p className="font-serif text-xl text-verde-dark mb-2">¡Guía enviada! 🌱</p>
                <p className="text-sm text-cacao/80">{leadMessage}</p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3 justify-center text-sm">
              <button onClick={reset} className="text-cacao underline hover:text-terracota">
                Hacer el test de otra edad
              </button>
              <span className="text-texto-muted">·</span>
              <Link href="/blog" className="text-cacao underline hover:text-terracota">
                Leer el blog
              </Link>
              <span className="text-texto-muted">·</span>
              <Link href="/recursos" className="text-cacao underline hover:text-terracota">
                Ver recursos
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
