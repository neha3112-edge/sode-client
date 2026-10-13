"use client";

import React from "react";
import Image from "next/image";

/**
 * UPES University Online About Section
 * Synchronized with https://distanceeducationschool.com/upes/
 */
export default function UpesAbout({
  about = {},
  brand = {},
  onOpenApply,
}) {
  const title = about.title || "About UPES University";
  const subHeading =
    about.subHeading ||
    "UPES University Online helps students and working professionals to achieve and enhance their intelligence.";

  const text1 =
    about.text1 ||
    "UPES was founded in 2003 with the goal of offering high-quality education. Offering a variety of undergraduate, postgraduate, and certificate programs in business, engineering, technology, law, and other fields, UPES University Online is one of India's leading universities of online education.";

  const text2 =
    about.text2 ||
    "UPES University is positioned 36th in the NIRF Ranking and 5th in the World University Ranking 2026. UPES University Online is an ideal option for professionals and students who want to continue their education while maintaining both their private and professional lives.";

  const mobileImage =
    about.mobileImage ||
    about.image ||
    "/assets/upes/upes-university-mobile-img.webp";

  const desktopImage =
    about.desktopImage ||
    brand.buildingAboutImage ||
    "/assets/upes/upes-university-image-3.webp";

  return (
    <section id="about" className="w-full bg-white py-8 sm:py-12 select-none border-b border-slate-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-bold text-[#212529] tracking-tight leading-tight m-0 mb-3">
          {title}
        </h2>

        {/* Sub-heading (Desktop only as on DES) */}
        <div className="hidden lg:block">
          <h5 className="text-[17px] font-semibold text-[#111111] mb-3 m-0">
            {subHeading}
          </h5>
        </div>

        {/* Description Paragraphs */}
        <div className="max-w-4xl mx-auto space-y-3 my-4">
          <p className="text-[13px] sm:text-[14px] text-[#444444] leading-[1.8] m-0 text-center">
            {text1}
          </p>
          {text2 && (
            <p className="text-[13px] sm:text-[14px] text-[#444444] leading-[1.8] m-0 text-center">
              {text2}
            </p>
          )}
        </div>

        {/* Apply Now Button */}
        <div className="flex justify-center mt-5 mb-6 sm:mb-8">
          <button
            type="button"
            onClick={() => onOpenApply?.()}
            className="bg-[#009933] hover:bg-[#00802b] active:scale-95 text-white font-bold text-[14px] py-2.5 px-8 rounded-[5px] shadow-sm transition-all cursor-pointer border-none inline-flex items-center gap-1.5"
          >
            <span>{about.buttonText || "Apply Now →"}</span>
          </button>
        </div>

        {/* About Campus Image */}
        <div className="max-w-4xl mx-auto px-1 sm:px-0">
          {/* Mobile Image */}
          <div className="block lg:hidden relative w-full aspect-[768/410] rounded-[10px] overflow-hidden shadow-sm">
            <Image
              src={mobileImage}
              alt="UPES University Campus"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>

          {/* Desktop Image */}
          <div className="hidden lg:block relative w-full aspect-[1100/440] rounded-[10px] overflow-hidden shadow-sm">
            <Image
              src={desktopImage}
              alt="UPES University Campus"
              fill
              className="object-cover"
              sizes="896px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
