const trustBadges = [
  "Colegiada n.º XXXX",
  "Atención temprana",
  "Logopedia basada en evidencia",
  "Formación continua",
];

export default function TrustBar() {
  return (
    <section className="bg-white border-t border-b border-arena py-6 px-6">
      <div className="container-custom text-center">
        <p className="text-texto-muted text-sm font-sans mb-4">
          Más de 2.500 familias ya confían en nuestros recursos
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="inline-block text-xs font-sans font-medium text-texto-secundario bg-arena/60 px-4 py-1.5 rounded-pill border border-arena"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
