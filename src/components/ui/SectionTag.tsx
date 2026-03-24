'use client';

import { motion } from 'framer-motion';

interface SectionTagProps {
  children: React.ReactNode;
  variant?: 'terracota' | 'verde';
}

const variantStyles = {
  terracota: 'bg-terracota/10 text-terracota-dark',
  verde: 'bg-verde/15 text-verde-dark',
} as const;

export default function SectionTag({
  children,
  variant = 'verde',
}: SectionTagProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${variantStyles[variant]}`}
    >
      {children}
    </motion.span>
  );
}
