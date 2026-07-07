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
    <section className="py-16 print:py-0">
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
      <div className="mx-auto max-w-3xl px-6 print:max-w-none print:px-8">
        {/* ── Header ────────────────────────────── */}
        <header className="mb-10 flex items-center gap-6 border-b border-[var(--color-border)] pb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-extrabold tracking-tight">
              {profile.name}
            </h1>
            <p className="mt-2 text-[var(--color-muted)]">
              {profile.headline}
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-muted)]">
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {profile.location}
              </span>
              {profile.contactEmail && (
                <span className="flex items-center gap-1">
                  <svg className="h-3.5 w-3.5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {profile.contactEmail}
                </span>
              )}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-photo.jpg"
            alt={profile.name}
            className="h-32 w-32 shrink-0 rounded-full border-2 border-[var(--color-border)] object-cover shadow-lg ring-4 ring-[var(--color-background)] sm:h-40 sm:w-40"
          />
        </header>

        {/* ── Summary ───────────────────────────── */}
        <div id="resume-summary" className="mb-10 scroll-mt-20">
          <SectionHeading className="mb-3">{ui.resume.summary}</SectionHeading>
          <p className="text-sm leading-relaxed text-[var(--color-muted)]">
            {profile.summary}
          </p>
        </div>

        {/* ── Languages ─────────────────────────── */}
        <div
          id="resume-languages"
          ref={langRef.ref}
          className={`mb-10 scroll-mt-20 reveal ${langRef.revealed ? "revealed" : ""}`}
        >
          <SectionHeading>{ui.resume.languages}</SectionHeading>
          <div className="flex flex-wrap gap-3">
            {profile.languages.map((lng) => (
              <div
                key={lng.name}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2.5 text-xs shadow-sm print:border-0 print:p-0 print:shadow-none"
              >
                <span className="font-bold">{lng.name}</span>{" "}
                <span className="text-[var(--color-muted)]">
                  — {lng.proficiency}
                </span>
              </div>
            ))}
          </div>
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
          <div className="grid gap-3">
            {profile.certifications.map((cert, i) => (
              <CertificationCard key={cert.name} cert={cert} index={i} />
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
            <SectionHeading className="mb-0">{ui.home.featuredProjects}</SectionHeading>
            <div className="flex items-center gap-3 print:hidden">
              <div className="hidden gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => scrollCarousel("left")}
                  disabled={!canScrollLeft}
                  aria-label="Previous projects"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[var(--color-border)] disabled:hover:bg-[var(--color-card)] disabled:hover:text-[var(--color-foreground)] disabled:hover:shadow-sm focus-ring"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel("right")}
                  disabled={!canScrollRight}
                  aria-label="Next projects"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] shadow-sm transition-all duration-200 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[var(--color-border)] disabled:hover:bg-[var(--color-card)] disabled:hover:text-[var(--color-foreground)] disabled:hover:shadow-sm focus-ring"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <Link
                href="/projects"
                className="group flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] focus-ring"
              >
                {ui.common.viewAll}
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
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
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 text-xs shadow-sm print:border-0 print:p-0 print:shadow-none"
              >
                <span className="font-bold text-[var(--color-accent)]">{group.category}</span>
                <p className="mt-1 text-[var(--color-muted)]">
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
