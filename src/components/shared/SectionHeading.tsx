import { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

// Display-serif heading followed by a hairline rule that runs to the edge.
export default function SectionHeading({
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={`font-display mb-5 flex items-center gap-4 text-2xl font-semibold after:h-px after:flex-1 after:bg-[var(--color-border)] after:content-[''] ${className}`}
    >
      {children}
    </h2>
  );
}
