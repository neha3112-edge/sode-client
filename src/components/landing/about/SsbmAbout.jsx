"use client";

import React from "react";
import LandingButton from "../LandingButton";

export default function SsbmAbout({ about = {}, brand = {}, onOpenApply }) {
  const bgImage =
    about.backgroundImage ||
    brand.aboutBackgroundImage ||
    "/assets/all_universities_images/ssbm/About-pic.webp";

  const title = about.title || `ABOUT ONLINE ${brand.shortName || brand.name || "SSBM"}`;

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const fullText = Array.isArray(paragraphs) ? paragraphs.join(" ") : paragraphs;

  const buttonText = about.buttonText || "Request Call Back";

  return (
    <section
      id="about"
      className="w-full relative select-none py-7 sm:py-9 lg:py-10 text-white scroll-mt-20 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14">
        <div className="max-w-[640px] lg:max-w-[680px] text-left">
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-white mb-2.5 sm:mb-3 uppercase tracking-wide m-0">
            {title}
          </h2>

          {fullText && (
            <p className="text-[12px] sm:text-[13px] leading-[1.55] sm:leading-[1.6] text-white/95 font-normal m-0 mb-4 sm:mb-5">
              {fullText}
            </p>
          )}

          <LandingButton
            onClick={() => onOpenApply?.(title)}
            bg="#c11f28"
            textColor="#ffffff"
            className="!px-5 sm:!px-6 !py-2.5 hover:!bg-[#a81a22] !font-bold !text-[13.5px] sm:!text-[14px] !rounded-[4px] border-none shadow-none transition-all active:scale-95 !h-auto !inline-flex !w-fit cursor-pointer"
          >
            {buttonText}
          </LandingButton>
        </div>
      </div>
    </section>
  );
}
