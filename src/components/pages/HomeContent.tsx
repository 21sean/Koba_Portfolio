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
import CustomCursor from "@/components/CustomCursor";
import Magnetic from "@/components/Magnetic";
import GlobalImpactMap from "@/components/GlobalImpactMap";
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
      <section ref={heroRef} className="relative overflow-hidden py-12 lg:py-16">
        {/* Subtle background gradient */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[var(--color-accent)]/3 blur-3xl" />
        </div>

        {/* Ambient scene from kenta.page: drifting clouds, a distant Mount Fuji
            on the right with the sun/moon rising behind its peak, and falling
            sakura — mirroring the Contact page backdrop. */}
        <SkyScene celestial={false} />
        <div
          ref={fujiRef}
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 top-20 z-0 w-[68%] max-w-2xl select-none sm:right-0 sm:top-24 sm:w-[54%]"
        >
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
        <SakuraPetals count={12} />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          {/* Giant kanji watermark — 惠 (Megumi, "blessing"), from 惠美 */}
          <div
            aria-hidden="true"
            className="font-display pointer-events-none absolute -left-10 -top-8 select-none text-[15rem] font-bold leading-none text-[var(--color-foreground)] opacity-[0.04] dark:opacity-[0.06] sm:-top-12 sm:text-[19rem]"
          >
            惠
          </div>

          {/* Vertical tategaki tagline (wide screens only) */}
          <div
            aria-hidden="true"
            data-hero
            className="vertical-rl font-display absolute -left-12 top-4 hidden text-xs font-semibold tracking-[0.5em] text-[var(--color-muted)]/70 xl:block"
          >
            {VERTICAL_TAGLINE}
          </div>

          <div className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <p
                data-hero
                className="mb-4 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]"
              >
                {/* Hinomaru dot */}
                <span aria-hidden="true" className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-hanko)]" />
                {profile.location}
              </p>
              <h1 className="font-display max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
                <SplitChars text={profile.name} />
              </h1>
              <p
                data-hero
                className="font-display mt-3 text-base font-semibold tracking-[0.35em] text-[var(--color-muted)]"
              >
                小林惠美
              </p>

              {/* Quantifiable headline with one inline animated number */}
              <p data-hero className="mt-5 max-w-2xl text-xl font-medium leading-relaxed text-[var(--color-foreground)] lg:text-2xl">
                {headline.before}
                <span className="font-extrabold text-[var(--color-accent)] tabular-nums">
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
              <div data-hero className="mt-3 text-lg leading-[1.4] text-[var(--color-muted)] lg:text-xl">
                <span>{flip.prefix} </span>
                <span
                  className="inline-flex h-[1.4em] overflow-hidden align-bottom font-semibold text-[var(--color-accent)]"
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

              {/* Specialties pills */}
              <div data-hero className="mt-7 flex flex-wrap gap-2">
                {profile.specialties.map((s) => (
                  <span
                    key={s}
                    className="glass-card glass-card-hover !rounded-full px-4 py-1.5 text-sm font-medium text-[var(--color-foreground)]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTAs — magnetic, with contextual cursor labels */}
              <div data-hero className="mt-9 flex flex-wrap gap-3">
                <Magnetic>
                  <Link
                    href="/about"
                    data-cursor-text="→"
                    className="group inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[var(--color-accent)]/30 focus-ring"
                  >
                    {ui.home.viewProjects}
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/contact"
                    data-cursor-text="→"
                    className="inline-block rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-6 py-3 text-sm font-semibold shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent-light)] hover:shadow-md focus-ring"
                  >
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
                data-cursor-text="こんにちは 👋"
              >
                {/* Slow-spinning dashed enso ring */}
                <div className="slow-spin absolute -inset-3 rounded-full border border-dashed border-[var(--color-accent)]/30" />
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 blur-sm" />
                <div className="relative h-56 w-56 transition-transform duration-500 [transform-style:preserve-3d] group-hover/photo:[transform:rotateY(180deg)]">
                  {/* Front — original headshot */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath("/headshot.jpg")}
                    alt={profile.name}
                    width={224}
                    height={224}
                    className="absolute inset-0 h-56 w-56 rounded-full border-2 border-[var(--color-border)] object-cover shadow-xl ring-4 ring-[var(--color-background)] [backface-visibility:hidden]"
                  />
                  {/* Back — hover photo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath("/headshot-hover.jpg")}
                    alt={profile.name}
                    width={224}
                    height={224}
                    className="absolute inset-0 h-56 w-56 rounded-full border-2 border-[var(--color-border)] object-cover shadow-xl ring-4 ring-[var(--color-background)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4">
                <a
                  href={`mailto:${profile.contactEmail}`}
                  className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] hover:shadow-md"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/emi-kobayashi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] hover:shadow-md"
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
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
          <div className="skills-card relative overflow-hidden px-8 py-16 text-center">
            {/* Seigaiha wave texture along the top edge */}
            <div
              aria-hidden="true"
              className="seigaiha pointer-events-none absolute inset-x-0 top-0 h-28 opacity-[0.06] dark:opacity-[0.1]"
              style={{ maskImage: "linear-gradient(to bottom, #000, transparent)", WebkitMaskImage: "linear-gradient(to bottom, #000, transparent)" }}
            />
            {/* Decorative gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/8 via-transparent to-[var(--color-accent)]/8" />
            <div className="relative">
              {/* Hanko seal — 惠 */}
              <div className="mb-6 flex justify-center">
                <span className="hanko font-display" aria-hidden="true">
                  惠
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {ui.home.interestedTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-[var(--color-muted)]">
                {ui.home.interestedDesc}
              </p>
              <Magnetic className="mt-8">
                <Link
                  href="/contact"
                  data-cursor-text="→"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-accent)]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[var(--color-accent)]/30 focus-ring"
                >
                  {ui.home.contactMe}
                  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
