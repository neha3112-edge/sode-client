"use client";

import React from "react";
import Image from "next/image";
import LandingButton from "../LandingButton";

export default function RushfordAbout({ about = {}, brand = {}, onOpenApply }) {
  const title = about.title || `About ${brand.name || "Rushford Business School"}`;
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
    <section id="about" className="w-full relative select-none py-12 sm:py-16 bg-white scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 text-left">
            <h2 className="text-[26px] sm:text-[32px] font-bold text-[#111111] mb-4 uppercase tracking-wide m-0">
              {title}
            </h2>
            {paragraphs.length > 0 && (
              <div className="space-y-4 text-[14px] sm:text-[15px] leading-relaxed text-[#333333] mt-4">
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
                bg="#0cb1ef"
                textColor="#ffffff"
                className="!px-6 !py-2.5 !font-bold !text-[14px] !rounded-[5px] hover:brightness-95 border-none shadow-xs active:scale-95"
              >
                {buttonText}
              </LandingButton>
            </div>
          </div>
          {imageSrc && (
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full aspect-[4/3] rounded-[8px] overflow-hidden shadow-xs">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
