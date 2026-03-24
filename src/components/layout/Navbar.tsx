"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/icons/Logo";

const navLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Recursos", href: "#servicios" },
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-crema/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" aria-label="Espacio Lenguaje - Inicio">
          <Logo showText />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 font-sans text-sm md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-cacao transition-colors duration-200 hover:text-terracota"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#lead-magnet"
          className="hidden rounded-pill bg-terracota px-5 py-2.5 font-sans text-sm font-semibold text-white transition-colors duration-200 hover:bg-terracota-dark md:inline-block"
        >
          Guía gratuita
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex items-center justify-center md:hidden"
          aria-label="Abrir menú"
        >
          <svg
            className="h-6 w-6 text-cacao"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 flex h-full w-4/5 max-w-sm flex-col bg-crema px-6 py-6 shadow-xl"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="mb-8 self-end"
                aria-label="Cerrar menú"
              >
                <svg
                  className="h-6 w-6 text-cacao"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Mobile links */}
              <ul className="flex flex-col gap-6 font-sans text-lg">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-cacao transition-colors duration-200 hover:text-terracota"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Mobile CTA */}
              <a
                href="#lead-magnet"
                onClick={() => setMobileOpen(false)}
                className="mt-10 inline-block rounded-pill bg-terracota px-6 py-3 text-center font-sans text-sm font-semibold text-white transition-colors duration-200 hover:bg-terracota-dark"
              >
                Guía gratuita
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
