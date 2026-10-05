"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import Arrow from "./shared/Arrow";
import { useLanguage } from "./LanguageProvider";
import { getUI, getProfile } from "@/lib/translations";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);

  // Track scroll for header shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { label: ui.nav.home, href: "/" },
    { label: ui.nav.about, href: "/about" },
    { label: ui.nav.projects, href: "/projects" },
    { label: ui.nav.contact, href: "/contact" },
  ];

  return (
    <>
      <header
        className={`no-print sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "border-[var(--color-border)] bg-[var(--color-background)]/90 backdrop-blur-md"
            : "border-transparent bg-[var(--color-background)]/60 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          {/* Logo / Name */}
          <Link href="/" className="group flex items-center gap-3 focus-ring">
            {/* Seal + name lockup — the same 惠 hanko that signs the home CTA */}
            <span aria-hidden="true" className="hanko hanko-sm font-mincho">
              惠
            </span>
            <span className="font-display text-xl font-semibold transition-colors duration-200 group-hover:text-[var(--color-accent)]">
              {profile.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3 py-2 text-[0.9375rem] font-medium transition-colors duration-200 focus-ring ${
                    isActive
                      ? "text-[var(--color-foreground)] nav-active"
                      : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="ml-2 flex items-center gap-1">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-accent-light)] focus-ring md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div className="flex h-5 w-5 flex-col items-center justify-center">
              <span
                className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`mt-1 block h-0.5 w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`mt-1 block h-0.5 w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "-translate-y-[9px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* ── Mobile fullscreen menu (md:hidden) ────────────────────
          Full-bleed glassy overlay with large tap targets and
          staggered fade-in. Desktop nav above is untouched. */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop — solid bg so the underlying page isn't readable */}
        <div
          className={`absolute inset-0 bg-[var(--color-background)]/95 backdrop-blur-2xl transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Content */}
        <div className="relative flex h-full flex-col px-6 pt-24 pb-10">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navItems.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group font-display flex items-center justify-between border-b border-[var(--color-border)] px-1 py-5 text-3xl font-semibold transition-all duration-300 first:border-t ${
                    isActive ? "text-[var(--color-foreground)]" : "text-[var(--color-foreground)]/75 active:text-[var(--color-foreground)]"
                  }`}
                  style={{
                    transitionDelay: menuOpen ? `${80 + i * 60}ms` : "0ms",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateY(0)" : "translateY(8px)",
                  }}
                >
                  <span className="flex items-center gap-3">
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-[var(--color-hanko)]" />
                    )}
                    {item.label}
                  </span>
                  <Arrow className="text-[var(--color-muted)] transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-1" />
                </Link>
              );
            })}
          </nav>

          {/* Theme toggle — anchored to bottom */}
          <div
            className="mt-auto flex flex-col gap-4 pt-8"
            style={{
              transitionProperty: "opacity, transform",
              transitionDuration: "300ms",
              transitionDelay: menuOpen ? `${80 + navItems.length * 60}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <div className="flex items-center justify-center gap-3 pt-2 text-xs text-[var(--color-muted)]">
              <span>Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
