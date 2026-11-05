"use client";

import React from "react";
import Image from "next/image";

export default function UuAbout({ about = {}, brand = {}, onOpenApply }) {
  const subtitleText = about.badge || about.subtitle || "About";
  const mainTitle = about.title || `${brand.name || "Uttaranchal University"} Online`;
  const whyChooseHeading = about.whyChooseTitle || "Why Choose";
  const whyChooseHighlight = about.whyChooseHighlight || `${brand.name || "Uttaranchal University"} Online?`;
  const imageSrc = about.image || brand.campusImage;

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const whyChooseCards = about.features || about.whyChooseCards || brand.aboutCards || [];
  const buttonText = about.buttonText || "Apply Now";

  return (
    <section id="about" className="w-full relative select-none py-8 sm:py-10 bg-white scroll-mt-20 font-poppins">
      <div className="uu-container w-full mx-auto">
        {/* Top: About Text + Campus Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start mb-8 sm:mb-10">
          <div className="lg:col-span-7 text-left">
            <span className="about-subtitle text-[#62B239] font-medium text-[24px] sm:text-[26px] lg:text-[28px] block mb-1 font-poppins leading-tight">
              {subtitleText}
            </span>
            <h2 className="about-title text-[26px] sm:text-[29px] lg:text-[32px] font-medium text-[#222222] leading-tight m-0 mb-3.5 sm:mb-4 font-poppins">
              {mainTitle}
            </h2>
            {paragraphs.length > 0 && (
              <div className="about-para-wrap text-[13.5px] sm:text-[14px] leading-[1.55] text-[#444444] font-normal mb-6 sm:mb-7 font-poppins space-y-3">
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="about-para m-0 leading-[1.55] tracking-normal">
                    {p}
                  </p>
                ))}
              </div>
            )}
            <div>
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="btn-apply px-10 py-2 border-2 border-[#0A3C7D] text-[#111111] hover:bg-[#0A3C7D] hover:text-white font-normal text-[14.5px] rounded-none bg-white transition-all cursor-pointer font-poppins"
              >
                {buttonText}
              </button>
            </div>
          </div>

          {imageSrc && (
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-start pt-1">
              <div className="relative w-full max-w-[360px] h-[235px] sm:h-[245px] rounded-[8px] overflow-hidden shadow-none">
                <Image
                  src={imageSrc}
                  alt={mainTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom: Why Choose Cards */}
        {whyChooseCards.length > 0 && (
          <div>
            <h3 className="about-whychoose-title text-center text-[22px] sm:text-[25px] lg:text-[28px] font-medium text-[#222222] tracking-normal leading-[1.25] m-0 mb-7 sm:mb-9 font-poppins">
              {whyChooseHeading} <span className="text-[#62B239] font-medium">{whyChooseHighlight}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full mx-auto">
              {whyChooseCards.map((card, idx) => (
                <div
                  key={idx}
                  className="about-whychoose-card bg-[#F7F7F7] rounded-[8px] p-5 sm:p-6 flex items-start gap-4 sm:gap-5 border-0 shadow-none text-left transition-colors"
                >
                  {(card.icon || card.image) && (
                    <div className="about-card-icon relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                      <Image
                        src={card.icon || card.image}
                        alt={card.title}
                        fill
                        className="object-contain"
                        sizes="56px"
                      />
                    </div>
                  )}
                  <div className="about-card-content flex-1 min-w-0">
                    <h4 className="about-card-title text-[15.5px] sm:text-[16.5px] font-semibold text-[#222222] tracking-normal m-0 mb-1.5 leading-snug font-poppins">
                      {card.title}
                    </h4>
                    <p className="about-card-desc text-[13px] sm:text-[13.5px] text-[#444444] font-normal leading-[1.55] tracking-normal m-0 font-poppins">
                      {card.desc || card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
