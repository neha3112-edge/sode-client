"use client";

import React from "react";
import Image from "next/image";
import LandingButton from "../LandingButton";

export default function VguAbout({ about = {}, brand = {}, onOpenApply }) {
  const cfg = brand.aboutConfig || {};
  const sectionBg = cfg.backgroundColor || "#2b6496";
  const bgImage = cfg.backgroundImage || brand.campusImage || "/assets/vgu/university.webp";
  const imageSrc = about.image || brand.campusImage || "/assets/vgu/about-image-vgu.webp";
  const btnBg = cfg.buttonBg || "#ffc107";
  const btnTextColor = cfg.buttonTextColor || "#000000";
  const title = about.title || `About ${brand.name || "Vivekananda Global University Online"}`;

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const buttonText = about.buttonText || cfg.buttonText || "Apply Now";
  const containerClass =
    cfg.containerClassName ||
    brand.aboutContainerClassName ||
    "max-w-[1340px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32";

  return (
    <section
      id="about"
      className="relative w-full py-12 sm:py-16 md:py-20 text-white overflow-hidden select-none"
      style={{ backgroundColor: sectionBg, ...cfg.sectionStyle }}
    >
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-bottom opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url(${bgImage})`,
            ...cfg.bgImageStyle,
          }}
        />
      )}

      <div className={`relative z-10 ${containerClass}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {imageSrc && (
            <div className="lg:col-span-5">
              <div className="relative w-full h-[250px] sm:h-[310px] lg:h-[340px] rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-2xl">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>
          )}
          <div className="lg:col-span-7 space-y-4 text-left">
            <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-white tracking-tight leading-[1.2] m-0">
              {title}
            </h2>
            {paragraphs.length > 0 && (
              <div className="space-y-3.5 text-[13.5px] sm:text-[14.5px] text-white/95 leading-[1.65] font-normal">
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="m-0">
                    {p}
                  </p>
                ))}
              </div>
            )}
            <div className="pt-2">
              <LandingButton
                onClick={onOpenApply}
                bg={btnBg}
                textColor={btnTextColor}
                className="!inline-flex !items-center !justify-center !font-bold !text-[14px] sm:!text-[14.5px] !px-8 !py-2.5 !rounded-[6px] shadow-xs hover:!opacity-95 active:scale-95 border-none"
              >
                {buttonText}
              </LandingButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
