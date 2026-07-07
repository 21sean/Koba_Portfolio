"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Custom cursor for the home page — an accent dot with a trailing ring.
 *
 * - The ring lags behind the dot (GSAP quickTo) for a fluid, showcase feel.
 * - Hovering anything interactive grows the ring; elements can opt into a
 *   contextual label with `data-cursor-text="…"` (shown as a small pill).
 * - Every click bursts into sakura petals + an ink-ripple ring at the pointer.
 * - Mounts only for fine pointers (mouse/trackpad) and never when the user
 *   prefers reduced motion; touch devices keep their native behavior.
 */

// Sakura tints shared with SakuraPetals.
const TINTS = ["#ffd6e3", "#ffc1d6", "#ffb7c5", "#ff9bb6", "#f3574d"];

const petalSvg = (color: string) =>
  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:100%"><path d="M12 2 C6.5 8 6.5 14 12 22 C17.5 14 17.5 8 12 2 Z" fill="${color}"/></svg>`;

export default function CustomCursor() {
  const layerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layer = layerRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const tag = tagRef.current;
    if (!fine || reduced || !layer || !dot || !ring || !tag) return;

    document.body.classList.add("custom-cursor-active");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0, force3D: true });
    gsap.set(tag, { opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.07, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.07, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.38, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.38, ease: "power3.out" });
    const tagX = gsap.quickTo(tag, "x", { duration: 0.32, ease: "power3.out" });
    const tagY = gsap.quickTo(tag, "y", { duration: 0.32, ease: "power3.out" });

    let visible = false;
    let hovering = false;

    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25, overwrite: "auto" });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      tagX(e.clientX + 20);
      tagY(e.clientY + 20);
    };

    const interactive = (el: Element | null) =>
      el instanceof Element
        ? el.closest("a, button, [role='button'], input, textarea, select, [data-cursor]")
        : null;

    const onOver = (e: PointerEvent) => {
      const target = interactive(e.target as Element);
      if (!target) return;
      hovering = true;
      ring.classList.add("cc-ring-hover");
      const text = target.getAttribute("data-cursor-text");
      gsap.to(ring, { scale: text ? 2.1 : 1.8, duration: 0.3, ease: "power3.out", overwrite: "auto" });
      gsap.to(dot, { scale: 0.5, duration: 0.3, ease: "power3.out", overwrite: "auto" });
      if (text) {
        tag.textContent = text;
        gsap.to(tag, { opacity: 1, scale: 1, duration: 0.25, overwrite: "auto" });
      }
    };

    const onOut = (e: PointerEvent) => {
      const from = interactive(e.target as Element);
      const to = interactive(e.relatedTarget as Element | null);
      if (!from || from === to) return;
      hovering = false;
      ring.classList.remove("cc-ring-hover");
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "power3.out", overwrite: "auto" });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out", overwrite: "auto" });
      gsap.to(tag, { opacity: 0, duration: 0.2, overwrite: "auto" });
    };

    // Click feedback: the ring squeezes on press, then a sakura burst +
    // ink ripple fire at the pointer on release.
    const onDown = () => {
      gsap.to(ring, { scale: hovering ? 1.4 : 0.75, duration: 0.15, ease: "power2.out", overwrite: "auto" });
    };

    const burst = (x: number, y: number) => {
      const b = document.createElement("div");
      b.className = "cc-burst";
      b.style.transform = `translate(${x}px, ${y}px)`;

      const ripple = document.createElement("span");
      ripple.className = "cc-ripple";
      b.appendChild(ripple);

      const petals: HTMLSpanElement[] = [];
      for (let i = 0; i < 7; i++) {
        const p = document.createElement("span");
        p.className = "cc-petal";
        p.innerHTML = petalSvg(TINTS[i % TINTS.length]);
        b.appendChild(p);
        petals.push(p);
      }
      layer.appendChild(b);

      gsap.fromTo(
        ripple,
        { scale: 0.2, opacity: 0.55 },
        { scale: 1.6, opacity: 0, duration: 0.6, ease: "power2.out" }
      );
      petals.forEach((p, i) => {
        const angle = (i / petals.length) * Math.PI * 2 + Math.random() * 0.8;
        const dist = 34 + Math.random() * 34;
        gsap.fromTo(
          p,
          { x: 0, y: 0, scale: 0.9, opacity: 1, rotation: Math.random() * 360 },
          {
            x: Math.cos(angle) * dist,
            // Slight downward bias so petals feel like they flutter and fall.
            y: Math.sin(angle) * dist + 16,
            scale: 0.25,
            opacity: 0,
            rotation: `+=${120 + Math.random() * 180}`,
            duration: 0.65 + Math.random() * 0.35,
            ease: "power2.out",
          }
        );
      });
      window.setTimeout(() => b.remove(), 1100);
    };

    const onUp = (e: PointerEvent) => {
      gsap.to(ring, { scale: hovering ? 1.8 : 1, duration: 0.3, ease: "power3.out", overwrite: "auto" });
      burst(e.clientX, e.clientY);
    };

    const onLeaveDoc = () => {
      visible = false;
      gsap.to([dot, ring, tag], { opacity: 0, duration: 0.25, overwrite: "auto" });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeaveDoc);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeaveDoc);
      gsap.killTweensOf([dot, ring, tag]);
    };
  }, []);

  return (
    <div ref={layerRef} className="cc-layer" aria-hidden="true">
      <div ref={ringRef} className="cc-ring" />
      <div ref={dotRef} className="cc-dot" />
      <div ref={tagRef} className="cc-tag" />
    </div>
  );
}
