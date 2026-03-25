interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: "light" | "dark";
}

export default function Logo({
  className = "",
  showText = true,
  variant = "light",
}: LogoProps) {
  const textColor = variant === "dark" ? "#FDF8F4" : "#3D2C2E";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Speech bubble icon */}
      <svg
        viewBox="0 0 80 80"
        className="h-10 w-10 shrink-0"
        aria-hidden="true"
      >
        <rect x="8" y="4" width="64" height="46" rx="13" fill="#C4745A" />
        <polygon points="18,50 10,68 38,50" fill="#C4745A" />
        <text
          x="40"
          y="29"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          fontSize="23"
          fill="#FDF8F4"
        >
          EL
        </text>
        <circle cx="22" cy="14" r="2.5" fill="#FDF8F4" opacity="0.45" />
        <circle cx="29" cy="10" r="1.8" fill="#FDF8F4" opacity="0.3" />
      </svg>

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
