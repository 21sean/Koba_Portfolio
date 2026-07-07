import { assetPath } from "@/lib/basePath";
import SkyScene from "@/components/SkyScene";
import SakuraPetals from "@/components/SakuraPetals";

/**
 * Shared ambient page backdrop — drifting clouds, a distant Mount Fuji with the
 * sun/moon rising behind its peak, and falling sakura. Bundles the same scene
 * the Home hero and Contact page use so every page shares one Japanese-themed
 * background with a single call. Decorative only; hidden in print.
 *
 * The children are absolutely positioned, so the nearest positioned ancestor
 * (the page `<section>`) must be `relative overflow-hidden`, and its content
 * wrapper should sit at `relative z-10` above the scene.
 */
export default function PageBackdrop() {
  return (
    <div aria-hidden="true" className="print:hidden">
      <SkyScene celestial={false} />
      <div className="pointer-events-none absolute -right-8 top-20 z-0 w-[68%] max-w-2xl select-none sm:right-0 sm:top-24 sm:w-[54%]">
        {/* Sun (light) / Moon (dark) rising behind the volcano's peak */}
        <div className="absolute left-[47%] top-[-13%] h-[42%] w-[42%] -translate-x-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={assetPath("/sun.svg")} alt="" className="h-full w-full opacity-80 dark:hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={assetPath("/moon.svg")} alt="" className="hidden h-full w-full opacity-90 dark:block" />
        </div>
        {/* Mount Fuji — fully opaque so the sun stays hidden behind the peak.
            The mask feathers only the left/right/bottom rectangular edges (the
            top is left solid, keeping the mountain outline against the sky). */}
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
      <SakuraPetals />
    </div>
  );
}
