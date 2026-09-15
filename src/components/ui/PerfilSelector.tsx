"use client";

export type Perfil = "familia" | "profesional" | "";

export default function PerfilSelector({ value, onChange }: {
  value: Perfil;
  onChange: (value: Perfil) => void;
}) {
  return (
    <fieldset className="mt-1">
      <legend className="mb-2 text-sm font-medium text-cacao">
        ¿Eres familia o profesional?
      </legend>
      <div className="flex gap-2">
        {(["familia", "profesional"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(value === option ? "" : option)}
            aria-pressed={value === option}
            className={`flex-1 rounded-pill px-4 py-2.5 text-sm font-medium transition-colors ${
              value === option
                ? "bg-verde text-white"
                : "bg-white text-cacao ring-1 ring-cacao/15 hover:ring-terracota/40"
            }`}
          >
            {option === "familia" ? "Familia" : "Profesional"}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
