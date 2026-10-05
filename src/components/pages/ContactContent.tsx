"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import ContactForm from "@/components/ContactForm";
import SkyScene from "@/components/SkyScene";
import SakuraPetals from "@/components/SakuraPetals";
import FujiScene from "@/components/FujiScene";
import { useReveal } from "@/lib/useReveal";
import Arrow from "@/components/shared/Arrow";

export default function ContactContent() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);
  const asideRef = useReveal();

  return (
    <section className="relative overflow-hidden pb-20">
      {/* Ambient backdrop from kenta.page: drifting clouds, with a distant
          Mount Fuji on the right and the sun/moon rising behind its peak. */}
      <SkyScene celestial={false} />
      <FujiScene />
      <SakuraPetals />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-16">
        <div className="clear-fuji">
          <h1 className="font-display text-[2.5rem] font-semibold leading-[1.05] sm:text-5xl lg:text-[3.5rem]">{ui.contact.title}</h1>
          <p className="halo mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-[var(--color-muted)]">
            {ui.contact.description}
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* Social / Links */}
          <aside
            ref={asideRef.ref}
            className={`lg:col-span-2 reveal ${asideRef.revealed ? "revealed" : ""}`}
          >
            <div className="paper rule-list px-6">
              <div className="py-5">
                <h2 className="font-display mb-3 text-xl font-semibold">
                  {ui.contact.connect}
                </h2>
                <ul className="space-y-2">
                  {profile.socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.url}
                        className="link-arrow text-[0.9375rem] text-[var(--color-foreground)] transition-colors duration-200 hover:text-[var(--color-accent)] focus-ring"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="link">{link.label}</span>
                        <Arrow diagonal />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="py-5">
                <h2 className="font-display mb-2 text-xl font-semibold">
                  {ui.contact.location}
                </h2>
                <p className="kicker text-[0.9375rem]">{profile.location}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
