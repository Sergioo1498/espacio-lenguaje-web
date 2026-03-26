"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/icons/Logo";

const navLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Recursos", href: "#servicios" },
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
  { label: "Contacto", href: "/contacto" },
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
          ? "bg-crema/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
          : "md:bg-transparent bg-crema/95"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-6 md:py-4">
        {/* Logo — Full seal+text on desktop, seal only on mobile */}
        <Link href="/" aria-label="Espacio Lenguaje - Inicio">
          <span className="hidden md:block">
            <Logo showText size={44} />
          </span>
          <span className="md:hidden">
            <Logo showText={false} size={38} />
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 font-sans text-sm md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.href.startsWith("/") ? (
                <Link
                  href={link.href}
                  className="text-cacao transition-colors duration-200 hover:text-terracota"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="text-cacao transition-colors duration-200 hover:text-terracota"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="/#lead-magnet"
          className="hidden rounded-pill bg-terracota px-5 py-2.5 font-sans text-sm font-semibold text-white transition-colors duration-200 hover:bg-terracota-dark md:inline-block"
        >
          Guía gratuita
        </a>

        {/* Mobile hamburger — min 44x44 touch target */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex items-center justify-center w-11 h-11 -mr-2 md:hidden touch-manipulation"
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
            {/* Overlay — dark blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-cacao/85 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in panel — solid background */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 flex h-dvh w-4/5 max-w-sm flex-col bg-crema px-6 py-6 shadow-2xl"
            >
              {/* Close button — 44x44 touch target */}
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="mb-8 self-end flex items-center justify-center w-11 h-11 -mr-1 touch-manipulation"
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

              {/* Mobile links — 44px min touch target with padding */}
              <ul className="flex flex-col gap-1 font-sans text-lg">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 text-cacao transition-colors duration-200 hover:text-terracota touch-manipulation"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 text-cacao transition-colors duration-200 hover:text-terracota touch-manipulation"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              {/* Mobile CTA */}
              <a
                href="/#lead-magnet"
                onClick={() => setMobileOpen(false)}
                className="mt-10 block rounded-pill bg-terracota px-6 py-4 text-center font-sans text-base font-semibold text-white transition-colors duration-200 hover:bg-terracota-dark touch-manipulation"
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
