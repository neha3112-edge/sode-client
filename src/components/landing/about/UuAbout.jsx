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
    <section id="about" className="w-full relative select-none py-10 sm:py-14 bg-white scroll-mt-20 font-poppins">
      <div className="uu-container w-full mx-auto">
        {/* Top: About Text + Campus Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-12 sm:mb-16">
          <div className="lg:col-span-7 text-left">
            <span className="about-subtitle text-[#62B239] font-medium sm:font-semibold text-[24px] sm:text-[28px] lg:text-[30px] block mb-1 font-poppins leading-tight">
              {subtitleText}
            </span>
            <h2 className="about-title text-[24px] sm:text-[28px] lg:text-[30px] font-medium text-[#222222] leading-tight m-0 mb-4 sm:mb-5 font-poppins">
              {mainTitle}
            </h2>
            {paragraphs.length > 0 && (
              <div className="text-[14px] sm:text-[14.5px] leading-[1.65] text-[#444444] font-normal mb-7 font-poppins space-y-3">
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="m-0 leading-[1.65]">
                    {p}
                  </p>
                ))}
              </div>
            )}
            <div>
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="btn-apply px-11 py-2 border-2 border-[#0A3C7D] text-black hover:bg-[#0A3C7D] hover:text-white font-normal text-[15px] rounded-none bg-white transition-all cursor-pointer font-poppins"
              >
                {buttonText}
              </button>
            </div>
          </div>

          {imageSrc && (
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full aspect-[16/10] rounded-[8px] overflow-hidden shadow-xs">
                <Image
                  src={imageSrc}
                  alt={mainTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom: Why Choose Cards */}
        {whyChooseCards.length > 0 && (
          <div>
            <h3 className="text-center text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-[#111111] m-0 mb-8 sm:mb-10 font-poppins">
              {whyChooseHeading} <span className="text-[#62B239]">{whyChooseHighlight}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full mx-auto">
              {whyChooseCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-[#f8f9fa] rounded-[8px] p-5 sm:p-6 flex items-start gap-4 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow text-left"
                >
                  {(card.icon || card.image) && (
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                      <Image
                        src={card.icon || card.image}
                        alt={card.title}
                        fill
                        className="object-contain"
                        sizes="56px"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="text-[15px] sm:text-[16px] font-bold text-[#111111] m-0 mb-1 leading-snug">
                      {card.title}
                    </h4>
                    <p className="text-[12px] sm:text-[12.5px] text-[#555555] leading-relaxed m-0 font-normal">
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
