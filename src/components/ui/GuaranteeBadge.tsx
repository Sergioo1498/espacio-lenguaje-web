/**
 * Garantía de 14 días, visible junto al botón de compra en las 7 páginas de producto.
 * Mismo lenguaje visual que la sección "Total transparencia" (tarjeta blanca + borde verde).
 */
export default function GuaranteeBadge() {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-2xl border border-verde/20 bg-white p-4 shadow-sm">
      <span aria-hidden="true" className="text-lg leading-none">🛡️</span>
      <p className="text-[14px] leading-relaxed text-texto-secundario">
        <strong className="font-serif text-[15px] font-normal text-cacao">Garantía de 14 días</strong>{' '}
        — Si no es lo que esperabas, escríbenos y te devolvemos el importe. Sin preguntas.
      </p>
    </div>
  );
}
