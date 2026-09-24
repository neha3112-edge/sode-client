"use client";

import React from "react";
import Image from "next/image";

/**
 * Reusable Landing About Section
 * Mobile responsive: stacks image and text cleanly, responsive typography
 */
export default function LandingAbout({ about = {}, brand = {}, onOpenApply }) {
  const universityName = brand.name || "University Online";
  const title = about.title || `About ${universityName}`;

  const paragraphs = about.paragraphs || [
    about.text1,
    about.text2,
    about.text3,
  ].filter(Boolean);

  const buttonText = about.buttonText || "Apply Now";
  const imageSrc =
    about.image ||
    brand.campusImage ||
    brand.buildingAboutImage ||
    "/assets/amitylp/Amity-About.png";

  const primaryColor = brand.primaryColor || "#08417b";

  return (
    <section id="about" className="py-8 sm:py-12 lg:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Image Column */}
          <div className="lg:col-span-5 order-1 lg:order-1">
            <div className="relative w-full h-48 sm:h-64 lg:h-[295px] overflow-hidden rounded-[8px] shadow-xs">
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

          {/* Text Column */}
          <div className="lg:col-span-7 space-y-3.5 order-2 lg:order-2 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-[#111827] tracking-tight m-0">
              {title}
            </h2>

            <div className="space-y-2.5 text-[12.5px] sm:text-[13px] text-[#333333] leading-[1.65]">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="m-0">
                  {p}
                </p>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[4px] font-semibold text-[13px] sm:text-[14px] transition-all cursor-pointer border-2 bg-transparent hover:text-white active:scale-95 w-full sm:w-fit"
                style={{
                  color: primaryColor,
                  borderColor: primaryColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = primaryColor;
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = primaryColor;
                }}
              >
                <span>{buttonText}</span>
                <span className="text-base font-bold leading-none">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
