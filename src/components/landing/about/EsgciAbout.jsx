"use client";

import React from "react";
import LandingButton from "../LandingButton";

export default function EsgciAbout({ about = {}, brand = {}, onOpenApply }) {
  const bg = brand.aboutBg || about.backgroundColor || "#000000";
  const title = about.title || `About ${brand.name || "ESGCI"}`;

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const buttonText = about.buttonText || "Apply Now";

  return (
    <section
      id="about"
      className="w-full relative select-none py-14 sm:py-18 text-white text-start scroll-mt-15"
      style={{ backgroundColor: bg }}
    >
      <div className="max-w-[900px] mx-0 px-12 sm:px-16">
        <h2 className="text-[24px] sm:text-[32px] font-bold text-white mb-4 uppercase tracking-wide m-0">
          {title}
        </h2>
        {paragraphs.length > 0 && (
          <div className=" max-w-[600px] space-y-3 text-[12px] sm:text-[13.5px] leading-tight text-white/95 font-normal mt-3">
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
            className="!px-7 !py-2 !font-medium !text-[15px] !rounded-[5px] hover:brightness-95 border-none shadow-xs active:scale-95"
          >
            {buttonText}
          </LandingButton>
        </div>
      </div>
    </section>
  );
}
