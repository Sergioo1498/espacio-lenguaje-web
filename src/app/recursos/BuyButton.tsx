'use client';

import { useState } from 'react';

export default function BuyButton({
  productId,
  size = 'default',
}: {
  productId: string;
  size?: 'default' | 'large';
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Error al procesar el pago.');
        setLoading(false);
      }
    } catch {
      alert('Error de conexión. Inténtalo de nuevo.');
      setLoading(false);
    }
  }

  const baseClasses =
    'inline-flex items-center justify-center rounded-pill font-sans font-semibold text-white transition-colors duration-200 bg-terracota hover:bg-terracota-dark disabled:opacity-60 disabled:cursor-not-allowed';
  const sizeClasses =
    size === 'large' ? 'px-8 py-4 text-base' : 'px-5 py-2.5 text-sm';

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${baseClasses} ${sizeClasses}`}
    >
      {loading ? (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : null}
      {loading ? 'Procesando...' : 'Comprar'}
    </button>
  );
}
