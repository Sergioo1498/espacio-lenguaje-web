'use client';

import { useState } from 'react';
import BuyButton from './BuyButton';

interface BumpProduct {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface Props {
  productId: string;
  size?: 'default' | 'large';
  bump?: BumpProduct;
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100);
}

export default function BuyWithBump({ productId, size = 'large', bump }: Props) {
  const [bumpChecked, setBumpChecked] = useState(false);
  const addOns = bumpChecked && bump ? [bump.id] : undefined;

  return (
    <div className="space-y-4">
      {bump && (
        <label
          htmlFor={`bump-${productId}`}
          className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition-all ${
            bumpChecked
              ? 'border-terracota bg-terracota/5 shadow-sm'
              : 'border-arena bg-white hover:border-terracota/40'
          }`}
        >
          <input
            id={`bump-${productId}`}
            type="checkbox"
            checked={bumpChecked}
            onChange={(e) => setBumpChecked(e.target.checked)}
            className="mt-1 h-5 w-5 cursor-pointer accent-terracota"
          />
          <div className="flex-1">
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <p className="text-sm font-semibold text-cacao">
                Añade <span className="text-terracota">{bump.name}</span>
              </p>
              <span className="text-sm font-bold text-terracota whitespace-nowrap">
                +{formatPrice(bump.price)}
              </span>
            </div>
            <p className="mt-1 text-xs text-texto-muted leading-relaxed">{bump.description}</p>
            <p className="mt-2 text-[11px] uppercase tracking-wider font-semibold text-verde">
              Solo desde esta página · Un click extra al finalizar tu compra
            </p>
          </div>
        </label>
      )}
      <BuyButton productId={productId} size={size} addOnProductIds={addOns} />
    </div>
  );
}
