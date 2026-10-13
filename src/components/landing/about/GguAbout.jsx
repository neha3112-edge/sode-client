"use client";

import React from "react";
import Image from "next/image";
import LandingButton from "../LandingButton";

export default function GguAbout({ about = {}, brand = {}, onOpenApply }) {
  const title = about.title || `About ${brand.name || "Golden Gate University"}`;
  const desktopImageSrc = about.desktopImage || about.image || brand.campusImage;
  const mobileImageSrc =
    about.mobileImage ||
    "/assets/all_universities_images/ggu/about-mobile.webp";

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const buttonText = about.buttonText || "Apply Now";

  return (
    <section id="about" className="w-full relative select-none overflow-hidden bg-[#003468] scroll-mt-20">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1.42fr_1fr] xl:grid-cols-[1.4fr_1fr] items-stretch min-h-[490px] lg:min-h-[530px]">
        <div className="flex flex-col justify-start px-6 sm:px-10 md:px-12 lg:px-12 xl:px-16 2xl:px-20 pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-10 sm:pb-12 text-white text-left">
          <h2 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] font-bold uppercase tracking-tight text-white m-0 leading-tight">
            {title}
          </h2>
          {about.subtitle && (
            <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-white mt-1 sm:mt-1.5 mb-5 sm:mb-6 m-0 leading-snug">
              {about.subtitle}
            </h3>
          )}
          {paragraphs.length > 0 && (
            <div className="space-y-3.5 sm:space-y-4 text-[12.5px] sm:text-[13px] leading-[1.62] text-white font-normal max-w-[640px]">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="m-0">
                  {p}
                </p>
              ))}
            </div>
          )}
          <div className="pt-6 sm:pt-7">
            <LandingButton
              onClick={onOpenApply}
              bg="#DC520A"
              textColor="#ffffff"
              className="!px-6 sm:!px-7 !py-3.5 !font-bold !text-[14px] sm:!text-[14.5px] !rounded-[4px] shadow-xs hover:!bg-[#c24608] border-none inline-flex items-center justify-center w-fit active:scale-95"
            >
              {buttonText}
            </LandingButton>
          </div>
        </div>

        {/* Desktop Image */}
        {desktopImageSrc && (
          <div className="hidden lg:block relative w-full h-full min-h-[460px] bg-slate-900 overflow-hidden">
            <Image
              src={desktopImageSrc}
              alt={title}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
        )}

        {/* Mobile Image (mb-view matching https://distanceeducationschool.com/ggu/) */}
        {mobileImageSrc && (
          <div className="block lg:hidden w-full relative overflow-hidden -mb-1.5">
            <Image
              src={mobileImageSrc}
              alt={title}
              width={800}
              height={450}
              priority
              className="w-full h-auto block"
              sizes="100vw"
            />
          </div>
        )}
      </div>
    </section>
  );
}
