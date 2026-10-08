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

  const buttonText = about.buttonText || "Request Call Back";

  return (
    <section
      id="about"
      className="w-full relative select-none py-14 sm:py-20 text-white scroll-mt-20 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 p-4 sm:p-8 text-left">
            <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-white mb-6 uppercase tracking-wide m-0">
              {title}
            </h2>
            {paragraphs.length > 0 && (
              <div className="space-y-4 text-[13.5px] sm:text-[14.5px] leading-relaxed text-white/95 font-normal mb-8">
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="m-0">
                    {p}
                  </p>
                ))}
              </div>
            )}
            <LandingButton
              onClick={onOpenApply}
              bg="#c11f28"
              textColor="#ffffff"
              className="!px-7 !py-3 hover:!bg-[#a81a22] !font-bold !text-[15px] !rounded-[5px] border-none shadow-md transition-all active:scale-95"
            >
              {buttonText}
            </LandingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
