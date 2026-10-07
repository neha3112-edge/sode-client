"use client";

import React from "react";
import LandingButton from "../LandingButton";

export default function LiverpoolAbout({ about = {}, brand = {}, onOpenApply }) {
  const bgImg =
    brand.aboutBgImage ||
    about.backgroundImage ||
    "/assets/all_universities_images/liverpool/ljmu-rev.png";

  const title = about.title || `About ${brand.name || "Liverpool Business School"}`;

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const buttonText = about.buttonText || "Request Call Back";

  return (
    <section
      id="about"
      className="w-full relative select-none py-14 sm:py-20 bg-cover bg-center scroll-mt-20 text-white"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="max-w-2xl bg-black/45 backdrop-blur-xs p-6 sm:p-10 rounded-[12px] border border-white/10 shadow-xl text-left">
          <h2 className="text-[26px] sm:text-[32px] font-bold mb-4 text-white m-0">
            {title}
          </h2>
          {paragraphs.length > 0 && (
            <div className="space-y-4 text-[14px] sm:text-[15px] leading-relaxed text-white/95 mt-4">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="m-0 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          )}
          <div className="pt-6">
            <LandingButton
              onClick={onOpenApply}
              bg="#00408d"
              textColor="#ffffff"
              className="!px-6 !py-2.5 !font-bold !text-[14px] !rounded-[5px] hover:brightness-110 active:scale-95 border-none shadow-md inline-flex items-center gap-2"
            >
              {buttonText}
            </LandingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
