"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import { useReveal } from "@/lib/useReveal";
import SideNav from "@/components/SideNav";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/shared/SectionHeading";
import CertificationCard from "@/components/shared/CertificationCard";
import EducationCard from "@/components/shared/EducationCard";
import ExperienceCard from "@/components/shared/ExperienceCard";
import PageBackdrop from "@/components/PageBackdrop";
import CustomCursor from "@/components/CustomCursor";
import Arrow from "@/components/shared/Arrow";

export default function ResumeContent() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);

  const expRef = useReveal();
  const eduRef = useReveal();
  const projRef = useReveal();
  const skillsRef = useReveal();
  const certsRef = useReveal();
  const langRef = useReveal();

  // ── Projects carousel state (moved from the home page) ──
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollCarousel = (dir: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>("[data-carousel-card]");
    const step = firstCard ? firstCard.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-16 print:overflow-visible print:py-0">
      <CustomCursor />
      <PageBackdrop />
      <SideNav
        items={[
          { id: "resume-summary", label: ui.resume.summary },
          { id: "resume-languages", label: ui.resume.languages },
          { id: "resume-experience", label: ui.resume.experience },
          { id: "resume-education", label: ui.resume.education },
          { id: "resume-certifications", label: ui.resume.certifications },
          { id: "resume-projects", label: ui.resume.projects },
          { id: "resume-skills", label: ui.resume.skills },
        ]}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 print:max-w-none print:px-8">
        {/* ── Header ────────────────────────────── */}
        <header className="clear-fuji mb-12 pb-2">
          <div className="min-w-0">
            <p className="kicker mb-4">{profile.location}</p>
            <h1 className="font-display text-[2.5rem] font-semibold leading-[1.05] sm:text-5xl lg:text-[3.5rem]">
              {profile.name}
            </h1>
            <p className="font-display halo mt-3 text-xl italic text-[var(--color-muted)] lg:text-2xl">
              {profile.headline}
            </p>
          </div>
        </header>

        {/* ── Summary ───────────────────────────── */}
        <div id="resume-summary" className="mb-10 scroll-mt-20">
          <SectionHeading>{ui.resume.summary}</SectionHeading>
          <div className="paper p-6 print:border-0 print:p-0">
            <p className="max-w-[65ch] text-[1.0625rem] leading-[1.75] text-[var(--color-foreground)]">
              {profile.summary}
            </p>
          </div>
        </div>

        {/* ── Languages ─────────────────────────── */}
        <div
          id="resume-languages"
          ref={langRef.ref}
          className={`mb-10 scroll-mt-20 reveal ${langRef.revealed ? "revealed" : ""}`}
        >
          <SectionHeading>{ui.resume.languages}</SectionHeading>
          <dl className="grid grid-cols-2 gap-x-6 sm:grid-cols-4">
            {profile.languages.map((lng) => (
              <div key={lng.name} className="border-t border-[var(--color-border)] pt-3 pb-1">
                <dt className="font-display text-[1.0625rem] font-semibold leading-snug">{lng.name}</dt>
                <dd className="mt-0.5 text-[0.8125rem] text-[var(--color-muted)]">{lng.proficiency}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Experience ─────────────────────────── */}
        <div
          id="resume-experience"
          ref={expRef.ref}
          className={`mb-10 scroll-mt-20 reveal ${expRef.revealed ? "revealed" : ""}`}
        >
          <SectionHeading>{ui.resume.experience}</SectionHeading>
          <div>
            {profile.experience.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} isFirst={i === 0} isLast={i === profile.experience.length - 1} />
            ))}
          </div>
        </div>

        {/* ── Education ──────────────────────────── */}
        <div
          id="resume-education"
          ref={eduRef.ref}
          className={`mb-10 scroll-mt-20 reveal ${eduRef.revealed ? "revealed" : ""}`}
        >
          <SectionHeading>{ui.resume.education}</SectionHeading>
          <div>
            {profile.education.map((edu, i) => (
              <EducationCard key={i} edu={edu} isFirst={i === 0} isLast={i === profile.education.length - 1} />
            ))}
          </div>
        </div>

        {/* ── Certifications ────────────────────── */}
        <div
          id="resume-certifications"
          ref={certsRef.ref}
          className={`mb-10 scroll-mt-20 reveal ${certsRef.revealed ? "revealed" : ""}`}
        >
          <SectionHeading>{ui.resume.certifications}</SectionHeading>
          <div className="paper rule-list px-5 print:border-0 print:px-0">
            {profile.certifications.map((cert) => (
              <CertificationCard key={cert.name} cert={cert} />
            ))}
          </div>
        </div>

        {/* ── Projects ──────────────────────────── */}
        <div
          id="resume-projects"
          ref={projRef.ref}
          className={`mb-10 scroll-mt-20 reveal ${projRef.revealed ? "revealed" : ""}`}
        >
          <div className="mb-4 flex items-end justify-between gap-4">
            <SectionHeading className="mb-0 flex-1">{ui.home.featuredProjects}</SectionHeading>
            <div className="flex items-center gap-3 print:hidden">
              <div className="hidden gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => scrollCarousel("left")}
                  disabled={!canScrollLeft}
                  aria-label="Previous projects"
                  className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] transition-colors duration-200 hover:border-[var(--color-foreground)]/40 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[var(--color-border)] focus-ring"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="square" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel("right")}
                  disabled={!canScrollRight}
                  aria-label="Next projects"
                  className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] transition-colors duration-200 hover:border-[var(--color-foreground)]/40 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[var(--color-border)] focus-ring"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="square" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <Link
                href="/projects"
                className="link-arrow text-sm text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] focus-ring"
              >
                {ui.common.viewAll}
                <Arrow />
              </Link>
            </div>
          </div>
          {/* Snap-scroll carousel (moved from the home page) */}
          <div className="relative -mx-6 print:mx-0">
            <div
              ref={carouselRef}
              className="carousel-scroll flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 py-4 print:grid print:grid-cols-1 print:gap-4 print:overflow-visible print:px-0"
            >
              {profile.projects.map((project) => (
                <div
                  key={project.id}
                  data-carousel-card
                  className="flex w-[300px] shrink-0 snap-start print:w-full"
                >
                  <ProjectCard project={project} featured compact />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Skills ────────────────────────────── */}
        <div
          id="resume-skills"
          ref={skillsRef.ref}
          className={`mb-10 scroll-mt-20 reveal ${skillsRef.revealed ? "revealed" : ""}`}
        >
          <SectionHeading>{ui.resume.skills}</SectionHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            {profile.skills.map((group) => (
              <div
                key={group.category}
                className="paper p-4 print:border-0 print:p-0"
              >
                <h3 className="font-display text-[1.0625rem] font-semibold leading-snug">{group.category}</h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-[var(--color-muted)]">
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
