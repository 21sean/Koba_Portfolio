// Vermilion seal. The characters stack top to bottom, the way a printmaker's
// seal sits beside the signature on a woodblock print. Decorative only: the
// text next to it always says the same thing in English.
export default function Hanko({
  text = "惠美",
  small = false,
}: {
  text?: string;
  small?: boolean;
}) {
  return (
    <span aria-hidden="true" className={`hanko font-mincho${small ? " hanko-sm" : ""}`}>
      {Array.from(text).map((ch, i) => (
        <span key={i}>{ch}</span>
      ))}
    </span>
  );
}
