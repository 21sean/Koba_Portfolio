// Renders `*word*` in a string as italic emphasis, so translated copy can mark
// the one word a display heading leans on without embedding HTML. Use
// `plain()` wherever the same string feeds an attribute (aria-label, title).
export default function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
          <em key={i}>{part.slice(1, -1)}</em>
        ) : (
          part
        )
      )}
    </>
  );
}

export const plain = (text: string) => text.replace(/\*/g, "");
