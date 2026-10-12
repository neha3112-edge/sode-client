"use client";

import React from "react";
import Image from "next/image";
import LandingButton from "../LandingButton";

export default function RushfordAbout({ about = {}, brand = {}, onOpenApply }) {
  const title = about.title || "ABOUT US";
  const imageSrc =
    about.image ||
    brand.campusImage ||
    "/assets/all_universities_images/rushford/rushford-campus-buiding.webp";

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const buttonText = about.buttonText || "Request Call Back";

  return (
    <section id="about" className="w-full relative select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="about-cnt py-10 sm:py-14 lg:py-16">
          <div className="ab1 max-w-[660px]">
            <h2 className="text-[26px] sm:text-[32px] font-semibold text-white mb-4 sm:mb-5 tracking-wide m-0 uppercase font-sans">
              {title}
            </h2>
            {paragraphs.length > 0 && (
              <div className="space-y-4 text-[14px] sm:text-[14.5px] leading-relaxed text-white/95 font-normal">
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="m-0">
                    {p}
                  </p>
                ))}
              </div>
            )}
            <div className="pt-6 sm:pt-7">
              <button
                type="button"
                onClick={onOpenApply}
                className="py-2.5 px-6 bg-[#FF0066] hover:bg-[#e0005a] text-white font-semibold text-[14px] rounded-[5px] transition-all border-none cursor-pointer shadow-none active:scale-95 inline-block"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Campus Building Image displayed below text on mobile only */}
      <div className="mb-view block md:hidden w-full overflow-hidden mt-3">
        <Image
          src={imageSrc}
          alt={title}
          width={700}
          height={450}
          className="w-full h-auto object-cover block"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
