"use client";

import React from "react";
import LandingButton from "../LandingButton";

export default function MuAbout({ about = {}, brand = {}, onOpenApply }) {
  const title = about.title || `About ${brand.name || "Mangalayatan University"}`;

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const buttonText = about.buttonText || "Apply Now";
  const bgImage = about.backgroundImage || brand.aboutBackgroundImage || "/assets/mu/about-bg.webp";

  return (
    <section
      id="about"
      className={`landing-about-section landing-about-mu w-full relative select-none ${
        brand.aboutSectionClassName || "pt-8 sm:pt-12 pb-[190px] sm:pb-[260px] md:pb-[380px] lg:pb-[480px]"
      }`}
      style={{
        backgroundColor: brand.aboutBg || "#ffffff",
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "bottom center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        ...brand.aboutSectionStyle,
      }}
    >
      <div className={brand.aboutContainerClassName || "max-w-4xl mx-auto px-4 sm:px-6 text-center"}>
        <h2
          className={
            brand.aboutTitleClassName ||
            "text-[24px] sm:text-[28px] lg:text-[32px] font-extrabold text-[#F97316] uppercase tracking-wide mb-4 m-0"
          }
          style={brand.aboutTitleStyle}
        >
          {title}
        </h2>
        {paragraphs.length > 0 && (
          <div
            className={
              brand.aboutTextClassName ||
              "space-y-4 text-[13.5px] sm:text-[14.5px] text-slate-700 leading-relaxed font-medium mb-8 mt-4"
            }
          >
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={brand.aboutParagraphClassName || "m-0 text-justify font-medium sm:text-center"}
              >
                {p}
              </p>
            ))}
          </div>
        )}
        <LandingButton
          onClick={onOpenApply}
          bg="#F97316"
          textColor="#ffffff"
          className="!inline-flex !items-center !justify-center !gap-2 hover:!bg-[#ea580c] !font-bold !text-[14px] !px-8 !py-3 !rounded-full shadow-xs active:scale-95 border-none"
        >
          <span>{buttonText}</span>
          <span className="text-base">→</span>
        </LandingButton>
      </div>
    </section>
  );
}
