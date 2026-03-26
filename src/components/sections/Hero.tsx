"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

const badges = [
  {
    label: "Estimulación temprana",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M7 1l1.76 3.57L13 5.24l-3 2.92.71 4.13L7 10.27 3.29 12.3 4 8.16 1 5.24l4.24-.67L7 1z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Ejercicios en casa",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M2.5 11.5l8.5-8.5M4 2.5h-1.5V4M10 11.5h1.5V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Recursos descargables",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M7 1.5v8M4 7l3 3 3-3M2.5 12h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with hero-bg.png at low opacity */}
      <div className="absolute inset-0 bg-crema" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 w-full section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="order-2 lg:order-1">
            <motion.span
              className="inline-flex items-center gap-2 bg-verde text-white text-sm font-sans font-medium px-4 py-1.5 rounded-pill mb-6 relative overflow-hidden"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <span className="relative z-10">Logopedia infantil</span>
              {/* Shimmer effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 2 }}
              />
            </motion.span>

            <motion.h1
              className="font-serif text-[2.5rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.5rem] leading-[1.08] text-cacao mb-6"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Donde cada{" "}
              <span className="text-terracota">peque</span> encuentra su{" "}
              <span className="text-terracota">voz</span>
            </motion.h1>

            <motion.p
              className="text-texto-secundario text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              Estimulación del lenguaje, dislexia y tartamudez. Recursos, ejercicios y
              acompañamiento profesional para que tu hijo avance con confianza.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <a href="#lead-magnet" className="btn-primary">
                Descarga la guía gratuita
              </a>
              <a href="#servicios" className="btn-outline">
                Conoce más
                <span className="ml-2" aria-hidden>&rarr;</span>
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="flex items-center gap-3"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              {/* Avatar placeholders */}
              <div className="flex -space-x-2">
                {["bg-terracota", "bg-verde", "bg-terracota-light"].map((bg, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {["M", "A", "L"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-texto-secundario">
                <span className="font-semibold text-cacao">+2.500 familias</span> confían en nosotros
              </p>
            </motion.div>
          </div>

          {/* Image column */}
          <motion.div
            className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            {/* Decorative organic shape behind image */}
            <div
              className="absolute -top-8 -right-8 w-[110%] h-[110%] rounded-[40%_60%_60%_40%/60%_30%_70%_40%] bg-arena opacity-50"
              aria-hidden="true"
            />

            {/* Main image */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/hero-main.png"
                alt="Mesa de trabajo de logopedia infantil con letras de madera, tarjetas ilustradas y materiales educativos"
                width={600}
                height={400}
                priority
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating badges over the image */}
            <motion.div
              className="absolute top-4 -left-4 z-20 bg-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-2"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <span className="w-8 h-8 rounded-full bg-verde/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M8 1l2 4.07 4.47.65-3.24 3.15.76 4.46L8 11.27l-3.99 2.06.76-4.46L1.53 5.72 6 5.07 8 1z" fill="#8FAE8B" />
                </svg>
              </span>
              <span className="text-xs font-medium text-cacao whitespace-nowrap">Estimulación temprana</span>
            </motion.div>

            <motion.div
              className="absolute bottom-16 -left-6 z-20 bg-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-2"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
            >
              <span className="w-8 h-8 rounded-full bg-terracota/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 13l10-10M5 2.5H3V5M11 13.5h2V11" stroke="#C4745A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-xs font-medium text-cacao whitespace-nowrap">Ejercicios en casa</span>
            </motion.div>

            <motion.div
              className="absolute bottom-6 right-4 z-20 bg-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-2"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
            >
              <span className="w-8 h-8 rounded-full bg-verde/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M8 2v9M5 8l3 3 3-3M3 14h10" stroke="#8FAE8B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-xs font-medium text-cacao whitespace-nowrap">Recursos descargables</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
