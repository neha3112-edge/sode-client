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
      className="landing-about-section landing-about-mu w-full relative select-none pt-8 sm:pt-12 !pb-0 md:!pb-[420px]"
      style={{
        backgroundColor: brand.aboutBg || "#ffffff",
        ...brand.aboutSectionStyle,
      }}
    >
      <div className={brand.aboutContainerClassName || "max-w-4xl mx-auto px-4 sm:px-6 text-center"}>
        <h2
          className={
            brand.aboutTitleClassName ||
            "text-[22px] sm:text-[28px] lg:text-[32px] font-bold sm:font-extrabold text-[#F97316] uppercase tracking-wide mb-4 m-0"
          }
          style={brand.aboutTitleStyle}
        >
          {title}
        </h2>
        {paragraphs.length > 0 && (
          <div
            className={
              brand.aboutTextClassName ||
              "space-y-4 text-[13px] sm:text-[14.5px] text-[#2c3e50] leading-relaxed font-normal sm:font-medium mb-6 sm:mb-8 mt-4"
            }
          >
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={brand.aboutParagraphClassName || "m-0 text-center"}
              >
                {p}
              </p>
            ))}
          </div>
        )}
        <div className="mt-7 mb-1 sm:mt-8 sm:mb-0 flex justify-center">
          <LandingButton
            onClick={onOpenApply}
            bg="#F97316"
            textColor="#ffffff"
            className="!inline-flex !items-center !justify-center !gap-2 hover:!bg-[#ea580c] !font-bold !text-[13px] sm:!text-[14px] !px-7 !py-2.5 sm:!px-8 sm:!py-3 !rounded-full shadow-sm active:scale-95 border-none"
          >
            <span>{buttonText}</span>
            <span className="text-base leading-none">➔</span>
          </LandingButton>
        </div>
      </div>

      {/* Mobile edge-to-edge campus image positioned below the button (Images 1, 2, 3) */}
      <div className="block md:hidden w-full mt-3 mb-0 p-0 leading-none select-none pointer-events-none">
        <img
          src="/assets/mu/about-bg-mobile.webp"
          alt="Mangalayatan University Campus"
          className="w-full h-auto block select-none pointer-events-none m-0 p-0"
          loading="lazy"
        />
      </div>
    </section>
  );
}
