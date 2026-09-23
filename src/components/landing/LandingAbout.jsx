"use client";

import React from "react";
import Image from "next/image";

/**
 * Reusable Landing About Section
 * Matches reference UI:
 * - Left: Campus/Building photo (clean rectangular, high quality)
 * - Right: Heading, descriptive paragraphs, and sleek bordered 'Apply Now →' button
 * Fully data-driven via `about` object and `brand` from JSON.
 */
export default function LandingAbout({ about = {}, brand = {}, onOpenApply }) {
  const universityName = brand.name || "University Online";
  const title = about.title || `About ${universityName}`;

  // Supports both array of paragraphs or individual text fields from JSON
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
    "/assets/images/amity_campus.png";

  const primaryColor = brand.primaryColor || "#08417b";

  return (
    <section id="about" className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Campus Aerial Photo */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative w-full h-56 sm:h-72 lg:h-[295px] overflow-hidden rounded-[4px] shadow-xs">
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

          {/* Right Column: Title, Paragraphs, Outlined Button */}
          <div className="lg:col-span-7 space-y-3.5 order-1 lg:order-2">
            <h2 className="text-2xl sm:text-[26px] lg:text-[28px] font-bold text-[#111827] tracking-tight m-0">
              {title}
            </h2>

            <div className="space-y-3 text-[12px] sm:text-[13px] text-[#333333] leading-[1.65]">
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
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-[4px] border border-[#08417b] bg-white text-[#08417b] font-medium text-xs sm:text-sm hover:bg-[#08417b] hover:text-white transition-all shadow-2xs cursor-pointer active:scale-95"
                style={{ borderColor: primaryColor, color: primaryColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = primaryColor;
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.color = primaryColor;
                }}
              >
                <span>{buttonText}</span>
                <span className="text-base leading-none">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Clean bottom separator line matching reference UI */}
        <div className="w-full border-b border-slate-200 mt-10 sm:mt-12" />
      </div>
    </section>
  );
}
