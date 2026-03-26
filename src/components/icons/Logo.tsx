import Image from "next/image";

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: "light" | "dark";
  size?: number;
}

export default function Logo({
  className = "",
  showText = true,
  variant = "light",
  size = 44,
}: LogoProps) {
  const textColor = variant === "dark" ? "#FDF8F4" : "#3D2C2E";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo V5 "El Sello" — full circular badge */}
      <Image
        src="/images/logo-chosen.png"
        alt="Espacio Lenguaje"
        width={size}
        height={size}
        className="shrink-0 rounded-full"
        style={{ width: size, height: size }}
        priority
      />

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className="text-[9px] font-sans font-normal tracking-[4px] uppercase"
            style={{ color: textColor }}
          >
            ESPACIO
          </span>
          <span
            className="font-serif text-[21px] font-bold -mt-0.5"
            style={{ color: textColor }}
          >
            LENGUAJE
          </span>
          <span className="text-[10px] font-sans font-normal tracking-[2px] text-verde mt-0.5">
            logopedia infantil
          </span>
        </div>
      )}
    </div>
  );
}
