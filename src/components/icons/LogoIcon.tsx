interface LogoIconProps {
  size?: number;
  className?: string;
}

export default function LogoIcon({ size = 40, className = "" }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={className}
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
      {size >= 24 && (
        <>
          <circle cx="22" cy="14" r="2.5" fill="#FDF8F4" opacity="0.45" />
          <circle cx="29" cy="10" r="1.8" fill="#FDF8F4" opacity="0.3" />
        </>
      )}
    </svg>
  );
}
