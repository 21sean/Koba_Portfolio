"use client";

import { useState } from "react";
import { Experience } from "@/data/profile";

interface ExperienceCardProps {
  exp: Experience;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function ExperienceCard({
  exp,
  isFirst = false,
  isLast = false,
}: ExperienceCardProps) {
  const [open, setOpen] = useState(false);

  const years = exp.dates.match(/\d{4}/g) ?? [];
  const startYear = years[0] ?? "";
  const endYear = years[1] ?? "Present";
  const yearLabel = `${startYear} – ${endYear}`;

  return (
    <div className="group relative flex items-stretch">
      {/* Left: vertical line + dot + year range */}
      <div className="relative flex flex-col items-center w-4 shrink-0">
        {/* Vertical line */}
        <div className={`absolute left-1/2 -translate-x-1/2 w-px bg-[var(--color-border)] ${isFirst ? "top-4" : "top-0"} ${isLast ? "h-4" : "bottom-0"}`} />
        {/* Dot */}
        <div className="relative z-10 mt-[0.85rem] h-2 w-2 shrink-0 rounded-full bg-[var(--color-hanko)] shadow-[0_0_0_4px_var(--color-background)] transition-transform duration-200 group-hover:scale-125" />
      </div>
      {/* Year label */}
      <div className="hidden items-start pt-[0.55rem] pl-3 pr-3 shrink-0 w-[8.25rem] sm:flex">
        <span className="font-display text-sm font-medium leading-tight whitespace-nowrap tabular-nums text-[var(--color-muted)]">
          {yearLabel}
        </span>
      </div>
      {/* Card content */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        className="paper paper-hover flex-1 mb-5 ml-3 sm:ml-0 cursor-pointer p-4 focus-ring"
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(!open);
          }
        }}
      >
        <div className="flex gap-3">
          {exp.logo && (
            <img
              src={exp.logo}
              alt={exp.company}
              className="h-9 w-9 shrink-0 rounded-[var(--radius-md)] object-contain"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="mb-1 text-xs font-medium tabular-nums text-[var(--color-muted)] sm:hidden">{yearLabel}</p>
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-[1.0625rem] font-semibold leading-snug">{exp.title}</h3>
              <svg
                className={`h-3.5 w-3.5 shrink-0 text-[var(--color-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <p className="mt-1 text-[0.8125rem] text-[var(--color-muted)]">
              {exp.company}
              {exp.type ? ` · ${exp.type}` : ""} · {exp.location}
            </p>
          </div>
        </div>
        {/* Expandable bullets */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            open ? "mt-3 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="list-disc space-y-1.5 pl-4 marker:text-[var(--color-hanko)]">
            {exp.bullets.map((b, j) => (
              <li key={j} className="text-[0.8125rem] leading-relaxed text-[var(--color-muted)]">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
