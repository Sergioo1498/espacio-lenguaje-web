'use client';

import { useState } from 'react';

export default function LandingForm() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          nombre: nombre.trim() || undefined,
        }),
      });

      if (res.ok) {
        setStatus('success');
        window.location.href = '/descargar-guia';
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const inputClasses =
    'flex-1 min-w-0 rounded-pill px-5 py-3.5 text-base bg-white text-cacao ring-1 ring-cacao/10 placeholder:text-texto-muted outline-none focus:ring-2 focus:ring-terracota/50';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre (opcional)"
        autoComplete="given-name"
        className={inputClasses}
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu email"
          autoComplete="email"
          required
          className={inputClasses}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-pill bg-terracota px-6 py-3.5 font-sans text-base font-semibold text-white transition-colors hover:bg-terracota-dark disabled:opacity-60"
        >
          {status === 'loading' ? 'Enviando...' : 'Descargar gratis'}
        </button>
      </div>
    </form>
  );
}
