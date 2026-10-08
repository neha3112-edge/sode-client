"use client";

import React from "react";
import Image from "next/image";
import LandingButton from "../LandingButton";

export default function IimAbout({ about = {}, brand = {}, onOpenApply }) {
  const campusImg =
    about.campusImage ||
    about.image ||
    brand.campusImage;

  const accreditations = about.accreditations || [
    { name: "AMBA", image: "/assets/iim/amba-iim.webp" },
    { name: "EQUIS", image: "/assets/iim/equis-iim.webp" },
    { name: "AACSB", image: "/assets/iim/aacsb-iim.webp" },
    { name: "Ministry of Education", image: "/assets/iim/ministry-of-education.webp" },
  ];

  const title = about.title || `ABOUT ${brand.shortName || brand.name || "IIM - KOZHIKODE"}`;
  const accreditationsTitle =
    about.accreditationsTitle ||
    `Accreditations & Recognitions of ${brand.name || "IIM Kozhikode"}`;

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const buttonText = about.buttonText || "Get Counseling";

  return (
    <section id="about" className="py-12 sm:py-16 bg-[#17479E] text-white select-none scroll-mt-20">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Campus Image & Accreditations Badge Box */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {campusImg && (
              <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-[10px] overflow-hidden shadow-lg border-2 border-white/20">
                <Image
                  src={campusImg}
                  alt={brand.name || "IIM Kozhikode"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
            )}

            {/* Accreditations box */}
            {accreditations.length > 0 && (
              <div className="mt-4 bg-white rounded-[10px] p-3 w-full max-w-[420px] shadow-md">
                <p className="text-[12px] font-bold text-center text-[#17479E] mb-2 uppercase tracking-wider">
                  {accreditationsTitle}
                </p>
                <div className="grid grid-cols-4 gap-2 items-center justify-items-center">
                  {accreditations.map((acc, idx) => (
                    <div key={idx} className="relative w-16 h-10 flex items-center justify-center">
                      <Image
                        src={acc.image}
                        alt={acc.name || "Accreditation"}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Content Text */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <h2 className="text-[24px] sm:text-[30px] font-extrabold text-white tracking-wide uppercase m-0">
              {title}
            </h2>
            {paragraphs.length > 0 && (
              <div className="space-y-3.5 text-[13.5px] sm:text-[14.5px] text-white/90 leading-relaxed font-normal">
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
                bg="#0CB1EF"
                textColor="#ffffff"
                className="!px-7 !py-2.5 hover:!bg-[#099cd3] !font-bold !text-[14.5px] !rounded-[20px] border-none shadow-md active:scale-95"
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
