import Image from "next/image";

interface LogoIconProps {
  size?: number;
  className?: string;
}

export default function LogoIcon({ size = 36, className = "" }: LogoIconProps) {
  return (
    <Image
      src="/images/logo-icon.png"
      alt="Espacio Lenguaje"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
