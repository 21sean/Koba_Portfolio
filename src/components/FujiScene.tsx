"use client";

import { forwardRef } from "react";
import { assetPath } from "@/lib/basePath";

/**
 * Distant Mount Fuji with the sun (light) / moon (dark) rising from behind its
 * peak. Shared by the Home hero, the Contact page and the global PageBackdrop
 * so every page renders one identical volcano scene.
 *
 * The celestial body is centered on the peak (52.8% across, not 50% — see
 * below) and plays a one-shot rise (`celestial-rise`) on mount — emerging
 * from behind the opaque mountain up into the sky. Because the sun and moon
 * are display-toggled by the `.dark` theme class, flipping light↔dark re-runs
 * the rise for whichever body becomes visible, so switching to dark replays
 * the animation with the moon.
 *
 * A ref is forwarded to the outer layer for the Home page's scroll/mouse
 * parallax. Decorative only; hidden in print.
 */
const FujiScene = forwardRef<HTMLDivElement>(function FujiScene(_props, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute -right-8 top-20 z-0 w-[68%] max-w-2xl select-none sm:right-0 sm:top-24 sm:w-[54%]"
    >
      {/* Sun (light) / Moon (dark) — centered on the peak, rising from behind it.
          The summit is not at the artwork's horizontal midpoint: in mount-fuji.svg
          the crater ridge spans 1391–1523 of the 2757-wide viewBox, so its center
          sits at 52.8%. Anchoring the body at left-1/2 left it visibly off to the
          left of the peak. */}
      <div className="absolute left-[52.8%] top-[-13%] h-[42%] w-[42%] -translate-x-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assetPath("/sun.svg")} alt="" className="celestial-rise h-full w-full opacity-80 dark:hidden" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assetPath("/moon.svg")} alt="" className="celestial-rise hidden h-full w-full opacity-90 dark:block" />
      </div>
      {/* Mount Fuji — fully opaque so the celestial body stays hidden behind the
          peak. The mask feathers only the left/right/bottom rectangular edges
          (the top is left solid, keeping the mountain outline against the sky). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assetPath("/mount-fuji.svg")}
        alt=""
        className="relative w-full opacity-100 dark:opacity-90"
        style={{
          maskImage:
            "linear-gradient(to top, transparent 0, #000 13%), linear-gradient(to right, transparent 0, #000 11%), linear-gradient(to left, transparent 0, #000 8%)",
          maskComposite: "intersect",
          WebkitMaskImage:
            "linear-gradient(to top, transparent 0, #000 13%), linear-gradient(to right, transparent 0, #000 11%), linear-gradient(to left, transparent 0, #000 8%)",
          WebkitMaskComposite: "source-in",
        }}
      />
    </div>
  );
});

export default FujiScene;
