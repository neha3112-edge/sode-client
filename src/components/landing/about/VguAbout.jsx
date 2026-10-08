"use client";

import React from "react";
import Image from "next/image";
import LandingButton from "../LandingButton";

export default function VguAbout({ about = {}, brand = {}, onOpenApply }) {
  const cfg = brand.aboutConfig || {};
  const sectionBg = cfg.backgroundColor || "#2e6396";
  const bgImage = cfg.backgroundImage || "/assets/all_universities_images/vgu/about-bg-vgu.webp";
  const imageSrc = about.image || brand.campusImage || "/assets/all_universities_images/vgu/about-image-vgu.webp";
  const btnBg = cfg.buttonBg || "#fec810";
  const btnTextColor = cfg.buttonTextColor || "#000000";
  const title = about.title || `About ${brand.name || "Vivekananda Global University Online"}`;

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const fullDescription =
    about.text1 && about.text2
      ? `${about.text1} ${about.text2}`
      : paragraphs.join(" ") || about.description || "";

  const buttonText = about.buttonText || cfg.buttonText || "Apply Now";
  const containerClass =
    cfg.containerClassName ||
    brand.aboutContainerClassName ||
    "max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12";

  return (
    <section
      id="about"
      className="relative w-full py-12 sm:py-16 lg:py-20 text-white overflow-hidden select-none"
      style={{ backgroundColor: sectionBg, ...cfg.sectionStyle }}
    >
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url(${bgImage})`,
            ...cfg.bgImageStyle,
          }}
        />
      )}

      <div className={`relative z-10 ${containerClass}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {imageSrc && (
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[480px] h-[260px] sm:h-[300px] lg:h-[330px] rounded-[22px] overflow-hidden shadow-2xl">
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
            <h2 className="text-[26px] sm:text-[30px] lg:text-[35px] font-semibold text-white tracking-tight leading-[1.2] m-0">
              About Vivekananda Global
              <br />
              University Online
            </h2>

            {fullDescription && (
              <p className="text-[13px] sm:text-[13.5px] lg:text-[14px] text-white/95 leading-[1.58] font-normal m-0 max-w-[650px]">
                {fullDescription}
              </p>
            )}

            <div className="pt-2 sm:pt-3">
              <LandingButton
                onClick={onOpenApply}
                bg={btnBg}
                textColor={btnTextColor}
                className="!inline-flex !items-center !justify-center !font-bold !text-[14px] !px-8 !py-2.5 !rounded-[6px] shadow-xs hover:brightness-105 active:scale-95 border-none transition-all cursor-pointer"
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
