import SkyScene from "@/components/SkyScene";
import SakuraPetals from "@/components/SakuraPetals";
import FujiScene from "@/components/FujiScene";

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
      <FujiScene />
      <SakuraPetals />
    </div>
  );
}
