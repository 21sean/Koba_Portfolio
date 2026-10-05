import { Certification } from "@/data/profile";
import Arrow from "@/components/shared/Arrow";

interface CertificationCardProps {
  cert: Certification;
}

// One ruled row in the certifications sheet (see `.rule-list`).
export default function CertificationCard({ cert }: CertificationCardProps) {
  return (
    <div className="py-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[1.0625rem] font-semibold leading-snug">{cert.name}</h3>
        <span className="shrink-0 text-xs tabular-nums text-[var(--color-muted)]">{cert.date}</span>
      </div>
      <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[0.8125rem] font-medium text-[var(--color-foreground)]/80">
        {cert.issuer}
        {cert.credentialUrl && (
          <>
            <span aria-hidden="true" className="text-[var(--color-muted)]">·</span>
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              <span className="link">Show credential</span>
              <Arrow diagonal />
            </a>
          </>
        )}
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-muted)]">
        {cert.skills.join(" · ")}
      </p>
    </div>
  );
}
