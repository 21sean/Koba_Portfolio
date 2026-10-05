"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import CountUp from "@/components/CountUp";
import { useLanguage } from "@/components/LanguageProvider";
import Emphasis, { plain } from "@/components/shared/Emphasis";

/**
 * Global Impact — a dotted world map showing where Emi's marketing work has
 * landed: Tokyo (semiconductor B2B), Shanghai (native-language market),
 * Paris (Dassault Systèmes HQ) and San Diego (current base).
 *
 * The dot-matrix continents are computed from coarse lat/lon polygons at
 * build time (deterministic — SSR-safe). Flight arcs draw themselves on
 * scroll (GSAP ScrollTrigger) and carry a small traveling pulse
 * (MotionPathPlugin). Stats count up as they enter the viewport.
 */

/* ── Projection ─────────────────────────────────────────── */

const MAP_W = 760;
const LAT_TOP = 75;
const LAT_BOTTOM = -56;
const SCALE = MAP_W / 360;
const MAP_H = Math.round((LAT_TOP - LAT_BOTTOM) * SCALE);

const px = (lon: number) => (lon + 180) * SCALE;
const py = (lat: number) => (LAT_TOP - lat) * SCALE;

/* ── Coarse continent outlines ([lon, lat]) ─────────────
   Precision only needs to hold up at a 3° dot pitch. */

type Poly = [number, number][];

const CONTINENTS: Poly[] = [
  // North & Central America
  [[-166, 65], [-158, 70], [-145, 70], [-130, 70], [-120, 72], [-108, 73], [-96, 72], [-86, 69], [-78, 63], [-70, 60], [-60, 55], [-64, 48], [-70, 44], [-74, 40], [-77, 35], [-80, 31], [-81, 26], [-85, 29], [-91, 29], [-96, 26], [-97, 22], [-94, 17], [-88, 14], [-83, 10], [-79, 8], [-84, 12], [-92, 16], [-100, 19], [-106, 23], [-112, 28], [-117, 33], [-122, 37], [-124, 43], [-124, 48], [-130, 54], [-137, 58], [-146, 60], [-155, 58], [-163, 60]],
  // Greenland
  [[-52, 60], [-44, 60], [-38, 65], [-22, 70], [-18, 75], [-25, 80], [-38, 82], [-55, 82], [-65, 78], [-60, 73], [-55, 68]],
  // South America
  [[-79, 9], [-72, 12], [-64, 11], [-60, 9], [-52, 4], [-44, -2], [-35, -6], [-35, -10], [-39, -14], [-41, -22], [-48, -26], [-53, -33], [-58, -38], [-62, -40], [-65, -45], [-68, -50], [-69, -54], [-72, -52], [-73, -45], [-71, -37], [-71, -30], [-70, -22], [-70, -18], [-75, -14], [-79, -7], [-81, -3], [-80, 3]],
  // Africa
  [[-17, 15], [-16, 20], [-12, 26], [-7, 32], [-2, 35], [5, 36], [11, 34], [19, 32], [29, 31], [33, 30], [35, 24], [37, 18], [43, 11], [48, 11], [51, 12], [47, 4], [41, -3], [39, -10], [35, -18], [33, -24], [28, -32], [22, -34], [18, -33], [15, -27], [12, -19], [10, -10], [8, -2], [6, 4], [0, 6], [-8, 5], [-13, 9]],
  // Eurasia (Iberia → Scandinavia → Siberia → SE Asia → India → Arabia → Mediterranean)
  [[-9, 37], [-9, 43], [-2, 44], [-1, 47], [-5, 48], [-2, 50], [3, 53], [8, 55], [8, 58], [5, 60], [10, 64], [16, 69], [25, 71], [35, 69], [45, 68], [55, 70], [68, 72], [80, 73], [95, 75], [110, 74], [125, 73], [140, 72], [155, 70], [168, 68], [178, 66], [172, 62], [163, 58], [158, 53], [148, 52], [142, 53], [135, 47], [132, 43], [129, 38], [126, 35], [122, 37], [120, 32], [122, 28], [115, 22], [108, 17], [109, 12], [105, 9], [100, 8], [103, 2], [100, 6], [98, 12], [96, 17], [92, 21], [88, 22], [86, 20], [83, 17], [80, 13], [78, 8], [76, 10], [73, 17], [70, 21], [67, 24], [62, 25], [57, 26], [56, 27], [58, 23], [55, 17], [52, 15], [48, 14], [43, 12], [43, 17], [40, 20], [37, 24], [35, 28], [34, 30], [36, 36], [30, 36], [27, 37], [22, 37], [19, 40], [15, 41], [12, 44], [10, 44], [8, 44], [5, 43], [3, 42], [0, 40], [-2, 37], [-6, 36]],
  // Australia
  [[114, -22], [122, -18], [130, -12], [137, -12], [142, -11], [146, -15], [149, -20], [153, -27], [150, -35], [145, -38], [140, -38], [135, -35], [129, -32], [124, -33], [115, -34], [113, -26]],
];

// Islands too small for polygons at this pitch — placed as individual dots.
const ISLAND_DOTS: [number, number][] = [
  // Japan
  [130, 32], [131, 33], [133, 34], [135, 34.5], [137, 35], [139, 35.5], [140, 37], [141, 39], [140.5, 41], [141, 43], [143, 43.5], [142.5, 45],
  // British Isles
  [-4, 51], [-2, 52], [-1, 53.5], [-3, 55], [-4, 57], [-8, 53.5],
  // Iceland
  [-19, 65], [-16, 64.5],
  // Indonesia & New Guinea
  [101, 0], [103, -2], [106, -6], [110, -7], [113, -7.5], [117, -8.5], [120, -9], [110, 0.5], [113, 1.5], [116, 3.5], [121, -2], [128, -3], [136, -4], [140, -5], [144, -6], [147, -7],
  // Philippines
  [121, 16], [122, 13], [124, 11], [125, 8],
  // Taiwan · Hainan · Sri Lanka
  [121, 24], [110, 19], [81, 7],
  // Madagascar
  [46, -16], [47, -19], [46, -22], [44.5, -24],
  // Caribbean
  [-80, 22], [-77, 21], [-71, 19], [-66, 18],
  // New Zealand
  [174, -36.5], [175.5, -38.5], [172.5, -42], [169, -45],
];

function insidePoly(lon: number, lat: number, poly: Poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

/* ── Cities & arcs ──────────────────────────────────────── */

const CITIES: Record<string, { lon: number; lat: number }> = {
  sandiego: { lon: -117.16, lat: 32.72 },
  tokyo: { lon: 139.69, lat: 35.68 },
  shanghai: { lon: 121.47, lat: 31.23 },
  paris: { lon: 2.35, lat: 48.86 },
};

// Hover-tooltip anchoring per marker. Left markers open toward the center
// (rightward), right markers open leftward, so a ~210px card never clips the
// map edge. Shanghai opens downward since Tokyo sits just above it.
const TOOLTIP_TRANSFORM: Record<string, string> = {
  sandiego: "translate(-12%, calc(-100% - 14px))",
  paris: "translate(-50%, calc(-100% - 14px))",
  tokyo: "translate(-88%, calc(-100% - 14px))",
  shanghai: "translate(-88%, 14px)",
};

const ARCS: [string, string][] = [
  ["tokyo", "sandiego"],
  ["tokyo", "shanghai"],
  ["tokyo", "paris"],
  ["sandiego", "paris"],
];

/* ── Trilingual copy ────────────────────────────────────── */

type Lang = "en" | "ja" | "zh";

interface ImpactCopy {
  kicker: string;
  kickerJp: string;
  title: string;
  subtitle: string;
  hint: string;
  stats: { value: number; prefix?: string; suffix?: string; label: string }[];
  locations: { id: string; flag: string; country: string; points: string[] }[];
}

const COPY: Record<Lang, ImpactCopy> = {
  en: {
    kicker: "Global Impact",
    kickerJp: "世界での実績",
    title: "Marketing *without* borders.",
    subtitle:
      "Campaigns planned in Tokyo, localized for Shanghai, scaled across Europe, and led today from San Diego.",
    hint: "Hover a marker to see the market",
    stats: [
      { value: 140, prefix: "+", suffix: "%", label: "Revenue growth led from Tokyo" },
      { value: 7, suffix: "+", label: "Years in global B2B marketing" },
      { value: 4, label: "Working languages" },
    ],
    locations: [
      { id: "sandiego", flag: "🇺🇸", country: "United States", points: ["UC San Diego: earned MBA", "Dassault Systèmes: marketing at BIOVIA", "Moretec: drove North America GTM strategy"] },
      { id: "tokyo", flag: "🇯🇵", country: "Japan", points: ["Moretec: 6+ years leading B2B semiconductor marketing", "Impact: +140% revenue from GTM strategy"] },
      { id: "shanghai", flag: "🇨🇳", country: "China", points: ["Native market: campaigns in Mandarin and Shanghainese", "Moretec: grew China market with localized GTM"] },
      { id: "paris", flag: "🇪🇺", country: "Europe", points: ["Dassault Systèmes: global SaaS across EU markets", "Moretec: scaled GTM across European markets"] },
    ],
  },
  ja: {
    kicker: "Global Impact",
    kickerJp: "世界での実績",
    title: "国境を越えるマーケティング。",
    subtitle:
      "東京で立案し、上海へローカライズ、欧州へスケール。現在はサンディエゴから世界のキャンペーンを指揮。",
    hint: "マーカーにカーソルを合わせると市場が表示されます",
    stats: [
      { value: 140, prefix: "+", suffix: "%", label: "東京から牽引した売上成長" },
      { value: 7, suffix: "+", label: "グローバルB2Bマーケティング歴（年）" },
      { value: 4, label: "ビジネスで使う言語" },
    ],
    locations: [
      { id: "sandiego", flag: "🇺🇸", country: "アメリカ", points: ["UCサンディエゴ：MBA取得", "ダッソー・システムズ：BIOVIAでマーケティング", "Moretec：北米GTM戦略を推進"] },
      { id: "tokyo", flag: "🇯🇵", country: "日本", points: ["Moretec：B2B半導体マーケティングを6年以上主導", "実績：GTM戦略で売上+140%成長"] },
      { id: "shanghai", flag: "🇨🇳", country: "中国", points: ["ネイティブ市場：中国語・上海語でキャンペーン", "Moretec：ローカライズで中国市場を拡大"] },
      { id: "paris", flag: "🇪🇺", country: "ヨーロッパ", points: ["ダッソー・システムズ：欧州向けグローバルSaaS", "Moretec：欧州市場でGTMを展開"] },
    ],
  },
  zh: {
    kicker: "Global Impact",
    kickerJp: "全球影响力",
    title: "跨越国界的营销。",
    subtitle:
      "在东京策划，在上海本地化，在欧洲扩展，如今在圣地亚哥主导全球营销。",
    hint: "将光标悬停在标记上即可查看市场",
    stats: [
      { value: 140, prefix: "+", suffix: "%", label: "从东京推动的营收增长" },
      { value: 7, suffix: "+", label: "全球B2B营销经验（年）" },
      { value: 4, label: "工作语言" },
    ],
    locations: [
      { id: "sandiego", flag: "🇺🇸", country: "美国", points: ["加州大学圣地亚哥分校：获得MBA学位", "达索系统：BIOVIA营销", "Moretec：推动北美GTM战略"] },
      { id: "tokyo", flag: "🇯🇵", country: "日本", points: ["Moretec：主导B2B半导体营销6年以上", "成果：以GTM战略推动营收增长140%"] },
      { id: "shanghai", flag: "🇨🇳", country: "中国", points: ["母语市场：以中文与上海话开展营销", "Moretec：以本地化拓展中国市场"] },
      { id: "paris", flag: "🇪🇺", country: "欧洲", points: ["达索系统：面向欧洲的全球SaaS营销", "Moretec：在欧洲市场推进GTM"] },
    ],
  },
};

/* ── Component ──────────────────────────────────────────── */

export default function GlobalImpactMap() {
  const { lang } = useLanguage();
  const copy = COPY[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Deterministic — identical on server and client, so no hydration drift.
  const dots = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    for (let lat = 73.5; lat >= LAT_BOTTOM + 1.5; lat -= 3) {
      for (let lon = -177; lon <= 177; lon += 3) {
        if (CONTINENTS.some((p) => insidePoly(lon, lat, p))) {
          out.push({ x: px(lon), y: py(lat) });
        }
      }
    }
    for (const [lon, lat] of ISLAND_DOTS) {
      out.push({ x: px(lon), y: py(lat) });
    }
    return out;
  }, []);

  const cityPx = useMemo(() => {
    const m: Record<string, { x: number; y: number }> = {};
    for (const [id, { lon, lat }] of Object.entries(CITIES)) {
      m[id] = { x: px(lon), y: py(lat) };
    }
    return m;
  }, []);

  const arcPaths = useMemo(
    () =>
      ARCS.map(([from, to]) => {
        const a = cityPx[from];
        const b = cityPx[to];
        // Quadratic arc lifted above the endpoints, clamped inside the viewBox.
        const lift = Math.min(70, Math.max(22, Math.abs(b.x - a.x) * 0.18));
        const cx = (a.x + b.x) / 2;
        const cy = Math.min(a.y, b.y) - lift;
        return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
      }),
    [cityPx]
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const arcs = gsap.utils.toArray<SVGPathElement>(".impact-arc");
      const pulses = gsap.utils.toArray<SVGCircleElement>(".impact-pulse");
      const markers = gsap.utils.toArray<SVGGElement>(".impact-marker");

      if (reduced) {
        gsap.set("[data-map-reveal]", { opacity: 1 });
        gsap.set(pulses, { opacity: 0 });
        return;
      }

      gsap.set(markers, { scale: 0, transformOrigin: "50% 50%" });
      arcs.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(pulses, { opacity: 0 });

      const startPulses = () => {
        pulses.forEach((pulse, i) => {
          gsap.to(pulse, {
            motionPath: { path: arcs[i], align: arcs[i], alignOrigin: [0.5, 0.5] },
            duration: 4.5 + i * 1.2,
            repeat: -1,
            ease: "none",
            delay: i * 1.1,
            // Reveal only once it's on its arc; during the stagger delay it
            // would otherwise sit visible at the SVG origin.
            onStart: () => gsap.set(pulse, { opacity: 0.9 }),
          });
        });
      };

      gsap
        .timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
          defaults: { ease: "power3.out" },
        })
        .fromTo(
          "[data-map-reveal]",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, clearProps: "transform" },
          0
        )
        .fromTo(
          ".impact-dots",
          { opacity: 0, scale: 0.985, transformOrigin: "50% 50%" },
          { opacity: 1, scale: 1, duration: 1.1 },
          0.15
        )
        .to(arcs, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", stagger: 0.18 }, 0.55)
        .to(
          markers,
          { scale: 1, duration: 0.55, ease: "back.out(2.2)", stagger: 0.12 },
          0.8
        )
        .add(startPulses, 2.1);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="global-impact" className="relative overflow-hidden py-16 sm:py-24">
      {/* Seigaiha wave texture, fading upward */}
      <div
        aria-hidden="true"
        className="seigaiha pointer-events-none absolute inset-x-0 bottom-0 h-56 opacity-[0.07] dark:opacity-[0.12]"
        style={{ maskImage: "linear-gradient(to top, transparent, #000 35%, transparent)", WebkitMaskImage: "linear-gradient(to top, transparent, #000 35%, transparent)" }}
      />
      {/* Vertical kanji watermark */}
      <div
        aria-hidden="true"
        className="vertical-rl font-mincho pointer-events-none absolute right-3 top-10 select-none text-7xl font-bold text-[var(--color-foreground)] opacity-[0.045] sm:right-8 sm:text-8xl"
      >
        世界へ
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Heading */}
        <div className="mb-10 max-w-2xl" data-map-reveal>
          <p className="kicker mb-4">
            {copy.kicker}
            <span className="font-mincho tracking-[0.2em] text-[var(--color-muted)]/80">
              {copy.kickerJp}
            </span>
          </p>
          <h2 className="font-display text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-[3.5rem]">
            <Emphasis text={copy.title} />
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            {copy.subtitle}
          </p>
          <p className="font-display mt-4 text-sm italic text-[var(--color-muted)]">
            {copy.hint}
          </p>
        </div>

        {/* Map */}
        <div className="relative" data-map-reveal>
          <svg
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            className="h-auto w-full"
            role="img"
            aria-label={plain(copy.title)}
          >
            <defs>
              <linearGradient id="impact-arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-accent)" />
                <stop offset="100%" stopColor="var(--color-sakura)" />
              </linearGradient>
            </defs>

            {/* Dotted continents */}
            <g className="impact-dots" fill="var(--color-muted)" opacity="0.9">
              {dots.map((d, i) => (
                <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r="1.9" opacity="0.32" />
              ))}
            </g>

            {/* Flight arcs */}
            <g fill="none" stroke="url(#impact-arc-grad)" strokeWidth="1.6" strokeLinecap="round">
              {arcPaths.map((d, i) => (
                <path key={i} d={d} className="impact-arc" opacity="0.75" />
              ))}
            </g>

            {/* Traveling pulses along the arcs */}
            {arcPaths.map((_, i) => (
              <circle key={i} className="impact-pulse" r="2.4" fill="var(--color-sakura)" opacity="0" />
            ))}

            {/* City markers — hover/tap surfaces a tooltip for that market */}
            {copy.locations.map((loc) => {
              const p = cityPx[loc.id];
              const active = activeId === loc.id;
              return (
                <g
                  key={loc.id}
                  className="impact-marker"
                  style={{ cursor: "none" }}
                  onPointerEnter={() => setActiveId(loc.id)}
                  onPointerLeave={() => setActiveId((cur) => (cur === loc.id ? null : cur))}
                  onClick={() => setActiveId((cur) => (cur === loc.id ? null : loc.id))}
                >
                  <circle cx={p.x} cy={p.y} r="9" fill="var(--color-accent)" opacity={active ? 0.28 : 0.14} />
                  <circle cx={p.x} cy={p.y} r="8" fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.5" className="map-ping" />
                  <circle cx={p.x} cy={p.y} r={active ? 4.4 : 3.2} fill="var(--color-accent)" stroke="var(--color-background)" strokeWidth="1.4" />
                  {/* Generous invisible hit area for easy hovering */}
                  <circle cx={p.x} cy={p.y} r="17" fill="transparent" style={{ pointerEvents: "all" }} />
                </g>
              );
            })}
          </svg>

          {/* Hover tooltips (HTML, % positioned over the SVG) */}
          {copy.locations.map((loc) => {
            const p = cityPx[loc.id];
            const active = activeId === loc.id;
            return (
              <div
                key={loc.id}
                className={`map-tooltip ${active ? "is-active" : ""}`}
                style={{
                  left: `${(p.x / MAP_W) * 100}%`,
                  top: `${(p.y / MAP_H) * 100}%`,
                  transform: TOOLTIP_TRANSFORM[loc.id],
                }}
              >
                <div className="map-tooltip-head">
                  {loc.country}
                </div>
                <ul className="map-tooltip-body">
                  {loc.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Stats — a ruled figures row, like a table in a printed report */}
        <dl
          className="mx-auto mt-12 grid max-w-3xl grid-cols-3 divide-x divide-[var(--color-border)] border-y border-[var(--color-border)]"
          data-map-reveal
        >
          {copy.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-2 px-3 py-5 text-center sm:px-6 sm:py-6">
              <dt className="text-xs leading-snug text-[var(--color-muted)] sm:text-[0.8125rem]">
                {stat.label}
              </dt>
              <dd className="font-display text-3xl font-semibold tabular-nums text-[var(--color-foreground)] sm:text-[2.75rem] sm:leading-none">
                <CountUp
                  end={stat.value}
                  prefix={stat.prefix ?? ""}
                  suffix={stat.suffix ?? ""}
                  durationMs={1600}
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
