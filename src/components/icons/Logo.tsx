interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 120 120"
        className="h-10 w-10 shrink-0"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="60"
          r="56"
          fill="#FDF8F4"
          stroke="#C4745A"
          strokeWidth="2"
        />
        <path
          d="M38 82 C38 72,35 67,33 63 C31 59,32 54,36 51 C40 48,43 51,45 56 C46 53,49 49,51 48 C53 49,56 53,57 56 C58 51,62 48,65 51 C69 54,70 59,67 63 C65 67,62 72,62 82"
          fill="#8FAE8B"
          fillOpacity="0.75"
        />
        <path
          d="M42 79 Q51 66 60 79"
          fill="none"
          stroke="#C4745A"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M37 74 Q51 56 65 74"
          fill="none"
          stroke="#C4745A"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M32 69 Q51 46 70 69"
          fill="none"
          stroke="#C4745A"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.2"
        />
      </svg>

      {showText && (
        <span className="text-xl leading-tight tracking-tight">
          <span className="font-bold text-cacao">espacio</span>
          <span className="font-normal text-terracota">lenguaje</span>
        </span>
      )}
    </div>
  );
}
