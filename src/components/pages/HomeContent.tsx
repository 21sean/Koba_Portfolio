"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assetPath } from "@/lib/basePath";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import Skills from "@/components/Skills";
import CountUp from "@/components/CountUp";
import SkyScene from "@/components/SkyScene";
import SakuraPetals from "@/components/SakuraPetals";
import SakuraBlossom from "@/components/SakuraBlossom";
import FujiScene from "@/components/FujiScene";
import CustomCursor from "@/components/CustomCursor";
import Magnetic from "@/components/Magnetic";
import GlobalImpactMap from "@/components/GlobalImpactMap";
import Arrow from "@/components/shared/Arrow";
import Emphasis from "@/components/shared/Emphasis";
import { useMounted, useReveal } from "@/lib/useReveal";

// Hero headline: single quantifiable sentence with one inline animated number.
const HERO_HEADLINE: Record<"en" | "ja" | "zh", { value: number; suffix: string; prefix: string; before: string; after: string }> = {
  en: {
    value: 140,
    suffix: "%",
    prefix: "+",
    before: "Driving ",
    after: " revenue growth across global B2B markets in semiconductors, life sciences & AI.",
  },
  ja: {
    value: 140,
    suffix: "%",
    prefix: "+",
    before: "半導体・ライフサイエンス・AI分野のグローバルB2B市場で、",
    after: " の売上成長を牽引。",
  },
  zh: {
    value: 140,
    suffix: "%",
    prefix: "+",
    before: "在半导体、生命科学与人工智能的全球B2B市场，推动",
    after: " 的营收增长。",
  },
};

// Phrases for the hero flip animation. Last entry duplicates the first so the
// CSS keyframe loops seamlessly.
const FLIP_PHRASES: Record<"en" | "ja" | "zh", { prefix: string; words: string[] }> = {
  en: {
    prefix: "I market & scale",
    words: [
      "Semiconductor B2B campaigns",
      "Life sciences SaaS launches",
      "AI & advanced manufacturing",
      "Cross-border GTM strategy",
      "Deep-tech brand stories",
      "Semiconductor B2B campaigns",
    ],
  },
  ja: {
    prefix: "私が手がけるのは",
    words: [
      "半導体B2Bキャンペーン",
      "ライフサイエンスSaaSローンチ",
      "AI & 先進製造",
      "国境を越えるGTM戦略",
      "ディープテックのブランド戦略",
      "半導体B2Bキャンペーン",
    ],
  },
  zh: {
    prefix: "我策划与扩展",
    words: [
      "半导体B2B营销",
      "生命科学SaaS发布",
      "AI 与先进制造",
      "跨境市场进入策略",
      "深科技品牌叙事",
      "半导体B2B营销",
    ],
  },
};

// Vertical tategaki tagline beside the hero (decorative, kept in Japanese
// across languages — part of the site's visual identity).
const VERTICAL_TAGLINE = "世界を動かすマーケティング";

// Name rendered per-character so GSAP can stagger the letters rising out of
// overflow-hidden word wrappers.
function SplitChars({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, wi) => (
        <span key={wi} data-hero-line className="mr-[0.28em] last:mr-0">
          {word.split("").map((ch, ci) => (
            <span key={ci} data-hero-char>
              {ch}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

export default function HomeContent() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);
  const mounted = useMounted();
  const flip = FLIP_PHRASES[lang];
  const headline = HERO_HEADLINE[lang];

  const ctaRef = useReveal();
  const heroRef = useRef<HTMLElement>(null);
  const fujiRef = useRef<HTMLDivElement>(null);

  // Hero intro timeline + Fuji parallax.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // CSS reduced-motion overrides reveal everything.

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(
          "[data-hero-char]",
          { y: 0, duration: 0.9, stagger: 0.035, ease: "power4.out" },
          0.15
        )
        .fromTo(
          "[data-hero]",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.09, clearProps: "transform" },
          0.4
        );

      // Mt Fuji drifts down slower than the page scroll.
      if (fujiRef.current) {
        gsap.to(fujiRef.current, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Gentle mouse parallax on the Fuji art layer (desktop only).
  useEffect(() => {
    const hero = heroRef.current;
    const fuji = fujiRef.current;
    if (!hero || !fuji) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const toX = gsap.quickTo(fuji, "x", { duration: 0.8, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      toX(((e.clientX - r.left) / r.width - 0.5) * -14);
    };
    hero.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      hero.removeEventListener("pointermove", onMove);
      gsap.killTweensOf(fuji, "x");
    };
  }, []);

  return (
    <>
      <CustomCursor />

      {/* ── Hero ──────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden py-14 lg:py-20">
        {/* Ambient scene from kenta.page: drifting clouds, a distant Mount Fuji
            on the right with the sun/moon rising behind its peak, and falling
            sakura — mirroring the Contact page backdrop. */}
        <SkyScene celestial={false} />
        <FujiScene ref={fujiRef} />
        <SakuraPetals count={12} />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          {/* Giant kanji watermark — 惠 (Megumi, "blessing"), from 惠美 */}
          <div
            aria-hidden="true"
            className="font-mincho pointer-events-none absolute -left-10 -top-8 select-none text-[15rem] font-bold leading-none text-[var(--color-foreground)] opacity-[0.04] dark:opacity-[0.06] sm:-top-12 sm:text-[19rem]"
          >
            惠
          </div>

          {/* Vertical tategaki tagline (wide screens only) */}
          <div
            aria-hidden="true"
            data-hero
            className="vertical-rl font-mincho absolute -left-12 top-4 hidden text-xs font-semibold tracking-[0.5em] text-[var(--color-muted)]/70 xl:block"
          >
            {VERTICAL_TAGLINE}
          </div>

          <div className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <p data-hero className="kicker mb-5">
                {profile.location}
              </p>
              <h1 className="font-display max-w-3xl text-[2.75rem] font-semibold leading-[1.02] sm:text-6xl lg:text-[5.25rem]">
                <SplitChars text={profile.name} />
              </h1>
              <p
                data-hero
                className="font-mincho mt-4 text-base font-semibold tracking-[0.35em] text-[var(--color-muted)]"
              >
                小林惠美
              </p>

              {/* Quantifiable headline with one inline animated number */}
              <p data-hero className="halo mt-7 max-w-2xl text-xl leading-[1.5] text-[var(--color-foreground)] sm:max-w-[34rem] lg:text-[1.4rem]">
                {headline.before}
                <span className="font-display text-[1.12em] font-semibold italic text-[var(--color-shu)] tabular-nums">
                  {mounted ? (
                    <CountUp
                      end={headline.value}
                      prefix={headline.prefix}
                      suffix={headline.suffix}
                      durationMs={1800}
                    />
                  ) : (
                    <span>
                      {headline.prefix}0{headline.suffix}
                    </span>
                  )}
                </span>
                {headline.after}
              </p>

              {/* Flip animation: prefix + rotating phrase */}
              <div data-hero className="halo mt-3 text-lg leading-[1.4] text-[var(--color-muted)] lg:text-xl">
                <span>{flip.prefix} </span>
                <span
                  className="font-display inline-flex h-[1.4em] overflow-hidden align-bottom font-medium italic text-[var(--color-accent)]"
                  aria-label={flip.words.slice(0, -1).join(", ")}
                >
                  <span className="flex flex-col animate-text-flip">
                    {flip.words.map((word, i) => (
                      <span key={i} className="block whitespace-nowrap">
                        {word}
                      </span>
                    ))}
                  </span>
                </span>
              </div>

              {/* Specialties — a typeset line rather than a row of pills */}
              <ul data-hero className="dot-list halo mt-7 text-[0.9375rem] font-medium text-[var(--color-foreground)]/80">
                {profile.specialties.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>

              {/* CTAs — magnetic, with contextual cursor labels */}
              <div data-hero className="mt-9 flex flex-wrap gap-3">
                <Magnetic>
                  <Link href="/about" data-cursor-text="→" className="btn btn-primary focus-ring">
                    {ui.home.viewProjects}
                    <Arrow />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link href="/contact" data-cursor-text="→" className="btn btn-outline focus-ring">
                    {ui.home.getInTouch}
                  </Link>
                </Magnetic>
              </div>
            </div>

            {/* Headshot */}
            <div data-hero className="shrink-0 self-center sm:self-auto">
              <div
                className="group/photo relative cursor-pointer"
                style={{ perspective: "600px" }}
                data-cursor-text="こんにちは"
              >
                {/* Slow-spinning dotted enso ring */}
                <div className="slow-spin absolute -inset-3 rounded-full border border-dotted border-[var(--color-foreground)]/30" />
                <div className="relative h-56 w-56 transition-transform duration-500 [transform-style:preserve-3d] group-hover/photo:[transform:rotateY(180deg)]">
                  {/* Front — original headshot */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath("/headshot.jpg")}
                    alt={profile.name}
                    width={224}
                    height={224}
                    className="absolute inset-0 h-56 w-56 rounded-full border border-[var(--color-border)] object-cover ring-4 ring-[var(--color-background)] [backface-visibility:hidden]"
                  />
                  {/* Back — hover photo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath("/headshot-hover.jpg")}
                    alt={profile.name}
                    width={224}
                    height={224}
                    className="absolute inset-0 h-56 w-56 rounded-full border border-[var(--color-border)] object-cover ring-4 ring-[var(--color-background)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-center gap-5 text-sm font-medium text-[var(--color-muted)]">
                <Link href="/contact" className="link transition-colors hover:text-[var(--color-foreground)]">
                  Email
                </Link>
                <a
                  href="https://www.linkedin.com/in/emi-kobayashi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow transition-colors hover:text-[var(--color-foreground)]"
                >
                  <span className="link">LinkedIn</span>
                  <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sakura divider ────────────────────── */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="jp-divider" aria-hidden="true">
          <SakuraBlossom className="h-5 w-5 text-[var(--color-sakura)] opacity-70" />
        </div>
      </div>

      {/* ── Global impact map ─────────────────── */}
      <GlobalImpactMap />

      {/* ── Skills ──────────────────────────────
          Note: cannot wrap in .reveal — its CSS transform breaks
          the sticky-stack pinning inside Skills. */}
      <Skills />

      {/* ── CTA ───────────────────────────────── */}
      <section
        ref={ctaRef.ref}
        className={`pt-4 pb-16 sm:pt-6 sm:pb-20 reveal ${ctaRef.revealed ? "revealed" : ""}`}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="paper relative overflow-hidden px-8 py-16 text-center">
            {/* Seigaiha wave texture along the top edge */}
            <div
              aria-hidden="true"
              className="seigaiha pointer-events-none absolute inset-x-0 top-0 h-28 opacity-[0.07] dark:opacity-[0.1]"
              style={{ maskImage: "linear-gradient(to bottom, #000, transparent)", WebkitMaskImage: "linear-gradient(to bottom, #000, transparent)" }}
            />
            <div className="relative">
              {/* Hanko seal — 惠 */}
              <div className="mb-7 flex justify-center">
                <span className="hanko font-mincho" aria-hidden="true">
                  惠
                </span>
              </div>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                <Emphasis text={ui.home.interestedTitle} />
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-[var(--color-muted)]">
                {ui.home.interestedDesc}
              </p>
              <Magnetic className="mt-8">
                <Link href="/contact" data-cursor-text="→" className="btn btn-primary focus-ring">
                  {ui.home.contactMe}
                  <Arrow />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
