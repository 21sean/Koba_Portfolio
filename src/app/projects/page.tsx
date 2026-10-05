"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import ProjectCard from "@/components/ProjectCard";
import PageBackdrop from "@/components/PageBackdrop";
import CustomCursor from "@/components/CustomCursor";

export default function ProjectsPage() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    profile.projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [profile.projects]);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? profile.projects.filter((p) => p.tags.includes(activeTag))
    : profile.projects;

  return (
    <section className="relative overflow-hidden py-20">
      <CustomCursor />
      <PageBackdrop />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="clear-fuji">
          <h1 className="font-display text-[2.5rem] font-semibold leading-[1.05] sm:text-5xl lg:text-[3.5rem]">{ui.projects.title}</h1>
          <p className="font-display halo mt-3 text-xl italic text-[var(--color-muted)] lg:text-2xl">
            {ui.projects.description}
          </p>
        </div>

        {/* Tag filters */}
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by tag">
          <button
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className="chip focus-ring"
          >
            {ui.common.all}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              aria-pressed={activeTag === tag}
              className="chip focus-ring"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Project cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {filtered.map((project) => (
            <div key={project.id} id={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="font-display mt-16 text-center text-lg italic text-[var(--color-muted)]">
            {ui.projects.noMatch}
          </p>
        )}
      </div>
    </section>
  );
}
