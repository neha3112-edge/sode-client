"use client";

import React from "react";
import LandingButton from "../LandingButton";

export default function EsgciAbout({ about = {}, brand = {}, onOpenApply }) {
  const bg = brand.aboutBg || about.backgroundColor || "#04903c";
  const title = about.title || `About ${brand.name || "ESGCI"}`;

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const buttonText = about.buttonText || "Apply Now";

  return (
    <section
      id="about"
      className="w-full relative select-none py-14 sm:py-18 text-white text-center scroll-mt-20"
      style={{ backgroundColor: bg }}
    >
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <h2 className="text-[28px] sm:text-[36px] font-bold text-white mb-4 uppercase tracking-wide m-0">
          {title}
        </h2>
        {paragraphs.length > 0 && (
          <div className="space-y-4 text-[14px] sm:text-[15.5px] leading-relaxed text-white/95 font-normal mt-4">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="m-0">
                {p}
              </p>
            ))}
          </div>
        )}
        <div className="pt-6">
          <LandingButton
            onClick={onOpenApply}
            bg="#fff000"
            textColor="#000000"
            className="!px-8 !py-3 !font-bold !text-[15px] !rounded-[5px] hover:brightness-95 border-none shadow-xs active:scale-95"
          >
            {buttonText}
          </LandingButton>
        </div>
      </div>
    </section>
  );
}
