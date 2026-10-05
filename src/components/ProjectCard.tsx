"use client";

import { useState } from "react";
import Link from "next/link";
import { assetPath } from "@/lib/basePath";
import type { Project } from "@/data/profile";
import Arrow from "@/components/shared/Arrow";

export default function ProjectCard({
  project,
  featured = false,
  compact = false,
}: {
  project: Project;
  featured?: boolean;
  compact?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const pdfArtifact = project.artifacts?.find(
    (a) => a.url !== "#" && a.url.endsWith(".pdf")
  );
  const thumbUrl = pdfArtifact
    ? assetPath(
        `/thumbnails/${pdfArtifact.url.replace(/^\//, "").replace(".pdf", ".png")}`
      )
    : null;

  return (
    <article className="group paper paper-hover relative flex h-full flex-col overflow-hidden">
      {/* External-link icon — top-right indicator that the PDF opens in a new tab */}
      {pdfArtifact && (
        <a
          href={pdfArtifact.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} in new tab`}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)]/90 text-[1.0625rem] text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)] focus-ring"
        >
          <Arrow diagonal />
        </a>
      )}

      {/* Thumbnail — fixed aspect-ratio so every card's image aligns horizontally */}
      {thumbUrl ? (
        <a
          href={pdfArtifact!.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/thumb relative block aspect-[16/10] w-full overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-card)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbUrl}
            alt={`${project.title} preview`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-overlay)] opacity-0 transition-opacity duration-200 group-hover/thumb:opacity-100">
            <span className="link-arrow rounded-[var(--radius-md)] bg-[var(--color-card)] px-4 py-2.5 text-xs text-[var(--color-foreground)]">
              View project
              <Arrow diagonal />
            </span>
          </div>
        </a>
      ) : (
        <div className="seigaiha aspect-[16/10] w-full border-b border-[var(--color-border)] opacity-[0.12]" />
      )}

      {/* Body */}
      <div className={`flex flex-1 flex-col ${compact ? "p-5" : featured ? "p-7 lg:p-8" : "p-6"}`}>
        {/* Header */}
        <div className="mb-3 flex flex-col gap-1.5">
          {project.org && (
            <span className="text-[0.8125rem] font-medium text-[var(--color-muted)]">
              {project.org}
            </span>
          )}
          <h3 className="font-display text-[1.3125rem] font-semibold leading-[1.2] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
            <Link href={`/projects#${project.id}`} className="focus-ring">
              {project.title}
            </Link>
          </h3>
          <span className="text-xs tabular-nums text-[var(--color-muted)]">{project.dates}</span>
        </div>

        {/* Summary */}
        <div className="mb-4">
          <p
            className={`text-[0.9375rem] leading-relaxed text-[var(--color-muted)] ${
              !expanded ? "line-clamp-3" : ""
            }`}
          >
            {project.summary}
          </p>
          {!expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="link mt-1.5 text-[0.8125rem] font-semibold text-[var(--color-foreground)] focus-ring"
            >
              Read more
            </button>
          )}
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <ul className="mb-4 flex flex-wrap gap-x-4 gap-y-1">
            {project.highlights.map((h) => (
              <li key={h} className="kicker text-[0.8125rem] font-semibold text-[var(--color-shu)]">
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Tags — push to bottom */}
        <p className="mt-auto border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-muted)]">
          {project.tags.join(" / ")}
        </p>
      </div>
    </article>
  );
}
