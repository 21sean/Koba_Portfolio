"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/LanguageProvider";
import { getUI } from "@/lib/translations";
import Arrow from "@/components/shared/Arrow";
import Hanko from "@/components/shared/Hanko";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });

const RECAPTCHA_SITE_KEY = "6Lf8DYMsAAAAAAwVXa0OfqHsKMyfttw6zCOqruV2";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [message, setMessage] = useState("");
  const { lang } = useLanguage();
  const ui = getUI(lang);

  const wordCount = message.trim() === "" ? 0 : message.trim().split(/\s+/).length;
  const overLimit = wordCount > 200;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (overLimit) return;
    setSending(true);
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formsubmit.co/ajax/emi.kobayashi.work@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
      setCaptchaToken(null);
      setCaptchaKey((k) => k + 1);
    }
  }

  if (submitted) {
    return (
      <div className="animate-scale-in paper flex flex-col items-center p-10 text-center">
        {/* Seal — 感謝 ("gratitude") */}
        <Hanko text="感謝" />
        <p className="font-display mt-6 text-2xl font-semibold">{ui.contact.thankYou}</p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Your message has been sent successfully.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn btn-outline mt-6 focus-ring"
        >
          {ui.contact.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot for spam prevention */}
      <input type="text" name="_honey" className="hidden" />
      {/* Disable captcha page */}
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="New message from emikoba.com" />

      {error && (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-shu)]/40 bg-[var(--color-shu)]/[0.06] px-4 py-3 text-sm text-[var(--color-shu)]">
          Something went wrong. Please try again in a moment, or reach out on LinkedIn.
        </div>
      )}

      <div className="group">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-semibold"
        >
          {ui.contact.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          className="w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-200 placeholder:text-[var(--color-muted)]/70 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
          placeholder={ui.contact.namePlaceholder}
        />
      </div>

      <div className="group">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold"
        >
          {ui.contact.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
          title="Please enter a valid email address"
          className="w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-200 placeholder:text-[var(--color-muted)]/70 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
          placeholder={ui.contact.emailPlaceholder}
        />
      </div>

      <div className="group">
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold"
        >
          {ui.contact.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`w-full resize-none rounded-[var(--radius-lg)] border bg-[var(--color-card)] px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-200 placeholder:text-[var(--color-muted)]/70 focus:ring-1 ${overLimit ? "border-[var(--color-shu)] focus:border-[var(--color-shu)] focus:ring-[var(--color-shu)]" : "border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]"}`}
          placeholder={ui.contact.messagePlaceholder}
        />
        <div className={`mt-1.5 text-right text-xs tabular-nums ${overLimit ? "text-[var(--color-shu)] font-medium" : "text-[var(--color-muted)]"}`}>
          {wordCount} / 200 words
        </div>
      </div>

      <div className="flex justify-center">
        <ReCAPTCHA
          key={captchaKey}
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={(token: string | null) => setCaptchaToken(token)}
          onExpired={() => setCaptchaToken(null)}
        />
      </div>

      <button
        type="submit"
        disabled={sending || !captchaToken || overLimit}
        className="btn btn-primary w-full py-4 focus-ring disabled:pointer-events-none disabled:opacity-50"
      >
        {sending ? "Sending…" : ui.contact.sendMessage}
        <Arrow />
      </button>
    </form>
  );
}
