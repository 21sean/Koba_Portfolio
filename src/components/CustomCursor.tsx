"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { assetPath } from "@/lib/basePath";

/**
 * Custom cursor for the home page — a koi fish that swims after the pointer.
 *
 * - The koi trails the cursor with easing and rotates to face its heading, so
 *   it looks like it's swimming toward wherever you move (a rAF lerp loop).
 * - Hovering interactive elements makes the koi flick larger; elements can
 *   surface a contextual label with `data-cursor-text="…"`.
 * - Every click bursts into sakura petals + an ink-ripple ring.
 * - Mounts only for hover-capable fine pointers and never under
 *   prefers-reduced-motion; touch/mobile devices keep native behavior.
 */

// Sakura tints shared with SakuraPetals.
const TINTS = ["#ffd6e3", "#ffc1d6", "#ffb7c5", "#ff9bb6", "#f3574d"];

// koi-b.svg is drawn with its nose toward the upper-left (~-111° in screen
// coords). Adding ~111° makes the fish point along its heading (heading 0 =
// travel to the right). Tuned visually against the raw silhouette.
const BASE_ROTATION = 111;

const petalSvg = (color: string) =>
  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:100%"><path d="M12 2 C6.5 8 6.5 14 12 22 C17.5 14 17.5 8 12 2 Z" fill="${color}"/></svg>`;

export default function CustomCursor() {
  const layerRef = useRef<HTMLDivElement>(null);
  const koiRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Require a hover-capable fine pointer: touch/mobile devices report
    // `hover: none` (and often a coarse pointer), so they keep the native
    // cursor. Some phones/tablets claim `pointer: fine`, which is why the
    // hover check is what actually keeps the koi off mobile.
    const fine = window.matchMedia("(pointer: fine)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layer = layerRef.current;
    const koi = koiRef.current;
    const tag = tagRef.current;
    if (!fine || !canHover || reduced || !layer || !koi || !tag) return;

    document.body.classList.add("custom-cursor-active");
    gsap.set([koi, tag], { opacity: 0 });

    const tagX = gsap.quickTo(tag, "x", { duration: 0.32, ease: "power3.out" });
    const tagY = gsap.quickTo(tag, "y", { duration: 0.32, ease: "power3.out" });

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let koiX = targetX;
    let koiY = targetY;
    let angle = 0;
    let scale = 1;
    let scaleTarget = 1;
    let visible = false;
    let hovering = false;
    let raf = 0;

    const tick = () => {
      koiX += (targetX - koiX) * 0.16;
      koiY += (targetY - koiY) * 0.16;
      const dx = targetX - koiX;
      const dy = targetY - koiY;
      const dist = Math.hypot(dx, dy);
      // Only re-aim while actually swimming, so the koi doesn't spin in place
      // when the pointer is still.
      if (dist > 2.2) {
        const desired = (Math.atan2(dy, dx) * 180) / Math.PI + BASE_ROTATION;
        const diff = ((desired - angle + 540) % 360) - 180;
        angle += diff * 0.16;
      }
      scale += (scaleTarget - scale) * 0.2;
      koi.style.transform = `translate(${koiX}px, ${koiY}px) translate(-50%, -50%) rotate(${angle}deg) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        gsap.to(koi, { opacity: 1, duration: 0.3, overwrite: "auto" });
      }
      tagX(e.clientX + 22);
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
      scaleTarget = 1.4;
      const text = target.getAttribute("data-cursor-text");
      if (text) {
        tag.textContent = text;
        gsap.to(tag, { opacity: 1, duration: 0.25, overwrite: "auto" });
      }
    };

    const onOut = (e: PointerEvent) => {
      const from = interactive(e.target as Element);
      const to = interactive(e.relatedTarget as Element | null);
      if (!from || from === to) return;
      hovering = false;
      scaleTarget = 1;
      gsap.to(tag, { opacity: 0, duration: 0.2, overwrite: "auto" });
    };

    const onDown = () => {
      scaleTarget = hovering ? 1.15 : 0.78;
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
        const a = (i / petals.length) * Math.PI * 2 + Math.random() * 0.8;
        const dst = 34 + Math.random() * 34;
        gsap.fromTo(
          p,
          { x: 0, y: 0, scale: 0.9, opacity: 1, rotation: Math.random() * 360 },
          {
            x: Math.cos(a) * dst,
            // Slight downward bias so petals flutter and fall.
            y: Math.sin(a) * dst + 16,
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
      scaleTarget = hovering ? 1.4 : 1;
      burst(e.clientX, e.clientY);
    };

    const onLeaveDoc = () => {
      visible = false;
      gsap.to([koi, tag], { opacity: 0, duration: 0.25, overwrite: "auto" });
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
      cancelAnimationFrame(raf);
      gsap.killTweensOf([koi, tag]);
    };
  }, []);

  return (
    <div ref={layerRef} className="cc-layer" aria-hidden="true">
      <div
        ref={koiRef}
        className="cc-koi"
        style={{
          maskImage: `url(${assetPath("/koi-b.svg")})`,
          WebkitMaskImage: `url(${assetPath("/koi-b.svg")})`,
        }}
      />
      <div ref={tagRef} className="cc-tag" />
    </div>
  );
}
