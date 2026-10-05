import { Education } from "@/data/profile";

interface EducationCardProps {
  edu: Education;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function EducationCard({
  edu,
  isFirst = false,
  isLast = false,
}: EducationCardProps) {
  const years = edu.dates.match(/\d{4}/g) ?? [];
  const startYear = years[0] ?? "";
  const endYear = years[1] ?? "Present";
  const yearLabel = `${startYear} – ${endYear}`;

  return (
    <div className="group relative flex items-stretch">
      {/* Left: vertical line + dot */}
      <div className="relative flex flex-col items-center w-4 shrink-0">
        <div className={`absolute left-1/2 -translate-x-1/2 w-px bg-[var(--color-border)] ${isFirst ? "top-4" : "top-0"} ${isLast ? "h-4" : "bottom-0"}`} />
        <div className="relative z-10 mt-[0.85rem] h-2 w-2 shrink-0 rounded-full bg-[var(--color-hanko)] shadow-[0_0_0_4px_var(--color-background)] transition-transform duration-200 group-hover:scale-125" />
      </div>
      {/* Year label */}
      <div className="hidden items-start pt-[0.55rem] pl-3 pr-3 shrink-0 w-[8.25rem] sm:flex">
        <span className="font-display text-sm font-medium leading-tight whitespace-nowrap tabular-nums text-[var(--color-muted)]">
          {yearLabel}
        </span>
      </div>
      {/* Card content */}
      <div className="paper flex-1 mb-5 ml-3 sm:ml-0 p-4">
        <div className="flex gap-3">
          {edu.logo && (
            <img
              src={edu.logo}
              alt={edu.school}
              className="h-9 w-9 shrink-0 rounded-[var(--radius-md)] object-contain"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="mb-1 text-xs font-medium tabular-nums text-[var(--color-muted)] sm:hidden">{yearLabel}</p>
            <h3 className="font-display text-[1.0625rem] font-semibold leading-snug">{edu.school}</h3>
            <p className="mt-1 text-[0.8125rem] text-[var(--color-muted)]">{edu.degree}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
