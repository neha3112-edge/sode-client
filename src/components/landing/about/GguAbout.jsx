"use client";

import React from "react";
import Image from "next/image";
import LandingButton from "../LandingButton";

export default function GguAbout({ about = {}, brand = {}, onOpenApply }) {
  const title = about.title || `About ${brand.name || "Golden Gate University"}`;
  const imageSrc = about.image || brand.campusImage;

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const buttonText = about.buttonText || "Apply Now";

  return (
    <section id="about" className="w-full relative select-none overflow-hidden bg-[#003468] scroll-mt-20">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[460px] lg:min-h-[500px]">
        <div className="flex flex-col justify-center px-6 sm:px-12 md:px-14 lg:px-14 xl:px-20 py-12 sm:py-16 text-white text-left">
          <h2 className="text-[24px] sm:text-[28px] lg:text-[30px] font-bold uppercase tracking-tight text-white m-0 leading-tight">
            {title}
          </h2>
          {about.subtitle && (
            <h3 className="text-[15px] sm:text-[16.5px] font-semibold text-white/95 mt-1.5 mb-5 m-0 leading-snug">
              {about.subtitle}
            </h3>
          )}
          {paragraphs.length > 0 && (
            <div className="space-y-4 text-[12px] sm:text-[12.5px] lg:text-[13px] leading-[1.65] text-white/95 font-normal max-w-xl">
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
              bg="#DC520A"
              textColor="#ffffff"
              className="!px-6 !py-2.5 !font-bold !text-[14px] !rounded-[4px] shadow-xs hover:!bg-[#c24608] border-none inline-flex items-center justify-center w-fit active:scale-95"
            >
              {buttonText}
            </LandingButton>
          </div>
        </div>

        {imageSrc && (
          <div className="relative w-full h-[320px] sm:h-[400px] lg:h-full min-h-[350px] lg:min-h-[480px] bg-slate-900">
            <Image
              src={imageSrc}
              alt={title}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
    </section>
  );
}
