'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTag from '@/components/ui/SectionTag';
import AccordionItem from '@/components/ui/AccordionItem';

const faqs = [
  {
    question: '¿Cuándo debería preocuparme por el lenguaje de mi hijo?',
    answer:
      'Cada niño tiene su ritmo, pero hay algunas señales que conviene vigilar. Si a los 12 meses no balbucea ni señala, a los 18 meses no dice ninguna palabra, o a los 2 años no combina dos palabras, es recomendable consultar con un logopeda. Esto no significa que haya un problema grave, sino que es mejor valorar pronto para poder actuar si es necesario.',
  },
  {
    question: '¿Qué es un retraso del lenguaje?',
    answer:
      'Un retraso del lenguaje ocurre cuando un niño no alcanza los hitos esperados de comunicación para su edad. Puede afectar a la comprensión (lo que entiende), a la expresión (lo que dice) o a ambos. Muchos niños con retraso del lenguaje alcanzan a sus iguales con la estimulación adecuada, pero es importante hacer un seguimiento profesional.',
  },
  {
    question: '¿Cómo puedo estimular el lenguaje de mi peque en casa?',
    answer:
      'Hay muchas formas de estimular el lenguaje en el día a día: habla mucho con tu peque narrando lo que hacéis juntos, lee cuentos cada día, canta canciones, juega a juegos de turnos y dale tiempo para responder sin anticiparte. Lo más importante es que la comunicación sea un momento agradable y sin presión. En nuestro blog encontrarás ejercicios concretos paso a paso.',
  },
  {
    question: '¿Qué diferencia hay entre logopeda y pedagogo?',
    answer:
      'El logopeda es el profesional sanitario especializado en la evaluación, diagnóstico y tratamiento de los trastornos de la comunicación, el lenguaje, el habla y la voz. El pedagogo se centra en los procesos de aprendizaje y en las dificultades educativas. Ambos pueden trabajar de forma complementaria, pero ante una dificultad específica del lenguaje o el habla, el logopeda es el profesional de referencia.',
  },
  {
    question: '¿A partir de qué edad se puede ir al logopeda?',
    answer:
      'No hay una edad mínima. De hecho, cuanto antes se detecte y se aborde una dificultad del lenguaje, mejor es el pronóstico. Los programas de atención temprana atienden desde los 0 años. Si tienes dudas, consulta sin esperar: una valoración a tiempo puede marcar la diferencia.',
  },
  {
    question: '¿Los recursos descargables son suficientes o necesito un profesional?',
    answer:
      'Nuestros recursos están diseñados para complementar la estimulación del lenguaje en casa, pero no sustituyen la valoración ni el tratamiento de un logopeda. Si observas señales de alerta o tienes dudas, te recomendamos consultar con un profesional. Los recursos son una herramienta fantástica para acompañar el proceso, pero cada niño es único y merece una valoración individualizada.',
  },
];

/* FAQ Schema (JSON-LD) for SEO */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="section-padding bg-white relative overflow-hidden">
      {/* Decorative speech bubbles with sound waves */}
      <div className="absolute top-8 right-8 opacity-10 pointer-events-none" aria-hidden="true">
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Speech bubble 1 */}
          <path
            d="M30 10H120C131 10 140 19 140 30V70C140 81 131 90 120 90H70L50 110V90H30C19 90 10 81 10 70V30C10 19 19 10 30 10Z"
            stroke="#C4745A"
            strokeWidth="2"
          />
          {/* Sound waves inside bubble 1 */}
          <circle cx="50" cy="50" r="4" stroke="#C4745A" strokeWidth="1.5" />
          <path d="M58 42C62 44 62 56 58 58" stroke="#C4745A" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M64 36C70 40 70 60 64 64" stroke="#C4745A" strokeWidth="1.5" strokeLinecap="round" />
          {/* Speech bubble 2 (smaller) */}
          <path
            d="M90 70H155C163 70 170 77 170 85V115C170 123 163 130 155 130H130L115 148V130H90C82 130 75 123 75 115V85C75 77 82 70 90 70Z"
            stroke="#8FAE8B"
            strokeWidth="2"
          />
          {/* Sound waves inside bubble 2 */}
          <circle cx="110" cy="100" r="3" stroke="#8FAE8B" strokeWidth="1.5" />
          <path d="M116 95C119 97 119 103 116 105" stroke="#8FAE8B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <SectionTag variant="verde">FAQ</SectionTag>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl text-cacao">
            Preguntas frecuentes
          </h2>
        </AnimatedSection>

        {/* Accordion */}
        <AnimatedSection className="max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </AnimatedSection>
      </div>

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
