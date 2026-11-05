"use client";

import React from "react";
import Image from "next/image";

export default function EdgewoodAbout({ about = {}, brand = {}, onOpenApply }) {
  const title = about.title || "About Edgewood University Online";
  const bgImage =
    brand.aboutBgImage || "/assets/all_universities_images/edgewood/about-bg-image-edgewood.webp";
  const campusImage =
    about.image || "/assets/all_universities_images/edgewood/edegewood-about-image.webp";

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [
          about.p1 ||
            "Edgewood University Online is a US-based university that was established in 1927, and the university is located in Madison. With 95+ years of excellence, the university is one that offers career-focused learning. The university has the approval of ACBSP, HLC, which make sure the education provided by Edgewood University Online is globally competitive. The university offers a dual program in Edgewood University Online MBA + DBA, and the university also provides a management degree, which is called Edgewood University Online MBA. Through their flexible programs, students can get an industry-relevant curriculum, faculty support, and a learning model built for working professionals.",
        ];

  const buttonText = about.buttonText || "Get FREE Career Counseling";

  return (
    <section
      id="about"
      className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 flex items-center justify-center select-none scroll-mt-20 overflow-visible"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65 z-[1]" />

      <div className="relative z-[2] text-center max-w-[1000px] w-full mx-auto">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-white text-[24px] sm:text-[28px] md:text-[32px] font-bold mb-3 inline-block border-b border-white pb-2 leading-tight">
            {title}
          </h2>
          <div className="text-[#cccccc] text-[14.5px] sm:text-[16px] leading-[1.6] max-w-[850px] mx-auto mt-3 space-y-3 font-normal">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="m-0">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Campus Image container with floating CTA */}
        <div className="relative max-w-[900px] mx-auto pb-6">
          <div className="relative w-full h-[220px] sm:h-[300px] md:h-[340px] rounded-[24px] sm:rounded-[36px] md:rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <Image
              src={campusImage}
              alt="Edgewood Campus"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority={false}
            />
          </div>

          {/* Floating CTA Button */}
          <button
            type="button"
            onClick={onOpenApply}
            className="absolute -bottom-1 sm:-bottom-3 left-1/2 -translate-x-1/2 bg-[#c00000] hover:bg-[#a00000] text-white py-3 sm:py-4 px-6 sm:px-10 text-[14px] sm:text-[17px] md:text-[18px] font-bold rounded-[12px] whitespace-nowrap shadow-[0_8px_20px_rgba(0,0,0,0.4)] border-none cursor-pointer transition-all active:scale-95 z-[3]"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}

