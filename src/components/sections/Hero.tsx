"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const floatVariant = (offset: number, duration: number) => ({
  y: [0, -offset, 0],
  transition: { repeat: Infinity, duration, ease: "easeInOut" },
});

const badges = [
  {
    label: "Estimulación temprana",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d="M7 1l1.76 3.57L13 5.24l-3 2.92.71 4.13L7 10.27 3.29 12.3 4 8.16 1 5.24l4.24-.67L7 1z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Ejercicios en casa",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d="M2.5 11.5l8.5-8.5M4 2.5h-1.5V4M10 11.5h1.5V10"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Recursos descargables",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d="M7 1.5v8M4 7l3 3 3-3M2.5 12h9"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function HeroIllustration() {
  return (
    <motion.svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[400px] h-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Background circle */}
      <circle cx="200" cy="200" r="180" fill="#F5E6D3" fillOpacity="0.45" />

      {/* Concentric dashed circles */}
      <circle cx="200" cy="200" r="150" stroke="#F5E6D3" strokeWidth="1.2" strokeDasharray="6 6" />
      <circle cx="200" cy="200" r="120" stroke="#F5E6D3" strokeWidth="1" strokeDasharray="4 6" />
      <circle cx="200" cy="200" r="90" stroke="#F5E6D3" strokeWidth="0.8" strokeDasharray="3 5" />

      {/* Verde blob shapes */}
      <motion.path
        d="M160 170c-20 30 10 70 50 60s50-40 30-65-60-25-80 5z"
        fill="#8FAE8B"
        fillOpacity="0.18"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        style={{ transformOrigin: "190px 195px" }}
      />
      <motion.path
        d="M220 200c-15 35 15 60 45 50s35-45 15-65-45-20-60 15z"
        fill="#8FAE8B"
        fillOpacity="0.13"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
        style={{ transformOrigin: "245px 225px" }}
      />

      {/* Sound wave arcs */}
      {[
        { r: 40, opacity: 0.5, delay: 0 },
        { r: 60, opacity: 0.35, delay: 0.3 },
        { r: 80, opacity: 0.2, delay: 0.6 },
      ].map((wave, i) => (
        <motion.path
          key={i}
          d={`M${200 + wave.r * Math.cos(Math.PI * 0.75)} ${200 - wave.r * Math.sin(Math.PI * 0.75)} A ${wave.r} ${wave.r} 0 0 1 ${200 + wave.r * Math.cos(Math.PI * 0.25)} ${200 - wave.r * Math.sin(Math.PI * 0.25)}`}
          stroke="#C4745A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          strokeOpacity={wave.opacity}
          animate={{ scale: [1, 1.08, 1], opacity: [wave.opacity, wave.opacity * 1.4, wave.opacity] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: wave.delay }}
          style={{ transformOrigin: "200px 200px" }}
        />
      ))}

      {/* Speech bubble shapes */}
      <motion.g animate={floatVariant(6, 4)} style={{ transformOrigin: "100px 120px" }}>
        <rect x="80" y="105" width="40" height="28" rx="10" fill="#8FAE8B" fillOpacity="0.22" />
        <polygon points="95,133 100,140 105,133" fill="#8FAE8B" fillOpacity="0.22" />
      </motion.g>
      <motion.g animate={floatVariant(5, 4.5)} style={{ transformOrigin: "310px 110px" }}>
        <rect x="290" y="95" width="36" height="24" rx="9" fill="#C4745A" fillOpacity="0.18" />
        <polygon points="302,119 307,125 312,119" fill="#C4745A" fillOpacity="0.18" />
      </motion.g>
      <motion.g animate={floatVariant(7, 5)} style={{ transformOrigin: "300px 290px" }}>
        <rect x="280" y="278" width="34" height="22" rx="8" fill="#8FAE8B" fillOpacity="0.16" />
        <polygon points="292,300 297,306 302,300" fill="#8FAE8B" fillOpacity="0.16" />
      </motion.g>

      {/* Center logo icon — stylized speech bubble with heart */}
      <motion.g
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{ transformOrigin: "200px 195px" }}
      >
        <rect x="175" y="172" width="50" height="38" rx="12" fill="#C4745A" />
        <polygon points="192,210 200,220 208,210" fill="#C4745A" />
        <path
          d="M193 188c0-4 3.5-7 7-4.5 3.5-2.5 7 .5 7 4.5 0 5-7 9-7 9s-7-4-7-9z"
          fill="white"
        />
      </motion.g>

      {/* Small floating decorative circles */}
      {[
        { cx: 130, cy: 80, r: 5, color: "#C4745A", delay: 0, dur: 3.5, dist: 4 },
        { cx: 310, cy: 160, r: 4, color: "#8FAE8B", delay: 0.4, dur: 4, dist: 5 },
        { cx: 90, cy: 270, r: 6, color: "#F5E6D3", delay: 0.8, dur: 3.8, dist: 6 },
        { cx: 280, cy: 340, r: 3, color: "#C4745A", delay: 1, dur: 4.2, dist: 4 },
        { cx: 340, cy: 240, r: 5, color: "#F5E6D3", delay: 0.2, dur: 3.6, dist: 5 },
        { cx: 70, cy: 180, r: 4, color: "#8FAE8B", delay: 0.6, dur: 4.4, dist: 3 },
      ].map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill={dot.color}
          fillOpacity="0.35"
          animate={{ y: [0, -dot.dist, 0] }}
          transition={{ repeat: Infinity, duration: dot.dur, ease: "easeInOut", delay: dot.delay }}
        />
      ))}
    </motion.svg>
  );
}

export default function Hero() {
  return (
    <section className="min-h-[90vh] section-padding flex items-center bg-crema relative overflow-hidden">
      <div className="container-custom w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="order-2 lg:order-1">
            <motion.span
              className="inline-block bg-verde text-white text-sm font-sans font-medium px-4 py-1.5 rounded-pill mb-6"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Logopedia infantil
            </motion.span>

            <motion.h1
              className="font-serif text-[2.5rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.5rem] leading-[1.1] text-cacao mb-6"
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
                <span className="ml-2" aria-hidden>
                  &rarr;
                </span>
              </a>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              className="flex flex-wrap gap-3"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              {badges.map((badge, i) => (
                <motion.span
                  key={badge.label}
                  className="inline-flex items-center gap-1.5 bg-verde/20 text-verde-dark text-xs font-sans font-medium px-3 py-1.5 rounded-pill"
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + i * 0.4,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                >
                  {badge.icon}
                  {badge.label}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Illustration column */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
