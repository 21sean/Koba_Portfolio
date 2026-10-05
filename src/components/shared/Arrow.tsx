// Long, thin arrow for links and buttons. `diagonal` points up-right for
// links that open in a new tab. Inherits `currentColor`; the `.arrow` class
// lets `.btn` / `.link-arrow` nudge it on hover.
export default function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  if (diagonal) {
    return (
      <svg
        viewBox="0 0 12 12"
        className={`arrow h-[0.7em] w-[0.7em] shrink-0 ${className}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        aria-hidden="true"
      >
        <path d="M2 10 10 2M4 2h6v6" strokeLinecap="square" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 22 10"
      className={`arrow h-[0.6em] w-[1.35em] shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      aria-hidden="true"
    >
      <path d="M0 5h20M16 1l4 4-4 4" strokeLinecap="square" />
    </svg>
  );
}
