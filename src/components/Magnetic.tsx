"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";

/**
 * Magnetic hover wrapper — the child gently follows the pointer while
 * hovered and springs back on leave. Mouse-only; touch and reduced-motion
 * users get a static element.
 */
export default function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Rect captured on enter (while untransformed) so the pull doesn't feed
  // back into itself as the element moves.
  const rect = useRef<DOMRect | null>(null);

  const reduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reduced()) return;
    rect.current = ref.current?.getBoundingClientRect() ?? null;
  };

  const onMove = (e: React.PointerEvent) => {
    const r = rect.current;
    if (!r || e.pointerType !== "mouse" || reduced()) return;
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width / 2) * strength,
      y: (e.clientY - r.top - r.height / 2) * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    rect.current = null;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </div>
  );
}
