"use client";

import type { IconType } from "react-icons";
import {
  SiGit,
  SiJavascript,
  SiR,
  SiGithubcopilot,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import {
  PiMicrosoftExcelLogo,
  PiMicrosoftPowerpointLogo,
  PiMicrosoftOutlookLogoFill,
} from "react-icons/pi";
import { TbMathFunction, TbChartBar } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useLanguage } from "@/components/LanguageProvider";
import { getProfile, getUI } from "@/lib/translations";

const iconMap: Record<string, IconType> = {
  "VS Code": VscCode,
  "GitHub Copilot": SiGithubcopilot,
  Git: SiGit,
  Excel: PiMicrosoftExcelLogo,
  "Office 365": PiMicrosoftOutlookLogoFill,
  PowerPoint: PiMicrosoftPowerpointLogo,
  Tableau: TbChartBar,
  JavaScript: SiJavascript,
  "CRM Systems": HiOutlineUserGroup,
  "R Studio": SiR,
  MATLAB: TbMathFunction,
};

// Per-card sticky-top stagger so cards pile up showing each title row.
const STACK_OFFSET = 60;
const HEADER_CLEAR = 80;

export default function Skills() {
  const { lang } = useLanguage();
  const ui = getUI(lang);
  const profile = getProfile(lang);

  const categories = profile.skills.filter(
    (s) => !s.category.toLowerCase().includes("collab")
  );

  return (
    <section id="skills" className="w-full pt-12 pb-4 sm:pt-20 sm:pb-6">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10">
          <h2 className="font-display text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-[3.5rem]">
            {ui.home.skills}
          </h2>
        </div>

        {/* Native CSS sticky stack. Each card sticks at a staggered top
            offset so they pile up on scroll. Browser-driven — no GSAP,
            no momentum-scroll jitter on iOS Safari. */}
        <div className="skills-pin-panel relative">
          {categories.map((cat, i) => (
            <div
              key={cat.category}
              className="skills-card skills-card-sticky mb-6 w-full"
              style={{ top: `${HEADER_CLEAR + i * STACK_OFFSET}px` }}
            >
              <h3 className="skills-card-title font-display">{cat.category}</h3>
              <ul className="skills-list">
                {cat.items.map((tag) => {
                  const Icon = iconMap[tag];
                  return (
                    <li key={tag} className="skills-item">
                      {Icon && <Icon aria-hidden="true" />}
                      {tag}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          {/* Runway so the last card has room to stay stuck for a beat
              before the whole stack unsticks and scrolls away. */}
          <div className="h-[60vh] md:h-[55vh]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
