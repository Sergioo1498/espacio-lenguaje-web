import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contacto — Logopedia Infantil",
  description:
    "¿Dudas sobre el lenguaje de tu hijo? Contacta con Espacio Lenguaje. Respondemos en 24-48h. Email: hola@espaciolenguaje.com",
};

export default function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-arena section-padding">
        <div className="container-custom text-center">
          {/* Decorative SVG — envelope with sound waves */}
          <div className="flex justify-center mb-6">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="8"
                y="16"
                width="48"
                height="32"
                rx="4"
                stroke="#C4745A"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M8 20L32 36L56 20"
                stroke="#C4745A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M36 10C40 10 42 7 42 4"
                stroke="#8FAE8B"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M42 12C46 12 49 8 49 4"
                stroke="#8FAE8B"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.4"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-cacao mb-4">
            Contacta con nosotros
          </h1>
          <p className="text-lg text-texto-secundario max-w-2xl mx-auto">
            ¿Tienes dudas sobre el lenguaje de tu peque? Escríbenos y te
            orientamos sin compromiso.
          </p>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
