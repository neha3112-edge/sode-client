"use client";

import React from "react";
import Image from "next/image";
import LandingContainer from "./LandingContainer";

/**
 * Reusable Recruiters / Placement Partner Section (#partners / #placement)
 * Supports both VGU single image badge layout and Shoolini/Desktop-Mobile responsive layout
 */
export default function LandingRecruiters({
  recruiters = {},
  brand = {},
}) {
  const activeRecruiters = recruiters || brand.recruiters || {};
  const isLpu = brand.slug === "lpu" || activeRecruiters.layout === "lpu";

  // LPU 2-Column Placement & Hiring Partners Layout
  if (isLpu) {
    const titlePrefix = activeRecruiters.titlePrefix || "Placement";
    const titleHighlight = activeRecruiters.titleHighlight || "& Hiring Partners at LPU Online";
    const desc = activeRecruiters.desc || "At LPU Online, Students and Professionals get an opportunity to enhance their career truly nurture their ambitions. The Lovely Professional University Online Admission supports students and has a dedicated placement support and a strong network of hiring partners. They create real opportunities for professional growth, whether you're pursuing an LPU MBA Online or an LPU Online MCA program.";
    const desktopImg = activeRecruiters.desktopImage || "/assets/lpu/placement-desktop.webp";
    const mobileImg = activeRecruiters.mobileImage || "/assets/lpu/placement-mobile.webp";

    return (
      <section id="placement" className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Description, Border, Apply Button */}
            <div className="lg:col-span-5 text-left space-y-4">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-[40px] text-[#b3b3b3] font-black tracking-tight leading-none m-0">
                  {titlePrefix}
                </h2>
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#f58220] mt-1.5 m-0 tracking-tight leading-tight">
                  {titleHighlight}
                </h3>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed m-0 font-normal border-b border-slate-200 pb-4">
                {desc}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const heroEl = document.getElementById("hero") || document.getElementById("banner");
                    if (heroEl) heroEl.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-black hover:bg-slate-900 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-[6px] shadow-sm transition-colors cursor-pointer border-none inline-flex items-center gap-1.5"
                >
                  <span>Apply Now &raquo;</span>
                </button>
              </div>
            </div>

            {/* Right Column: Partners Logos Image */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="hidden sm:block relative w-full aspect-[2.4/1]">
                <Image
                  src={desktopImg}
                  alt="Placement & Hiring Partners at LPU Online"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 700px"
                  priority
                />
              </div>
              <div className="block sm:hidden relative w-full aspect-[1.8/1]">
                <Image
                  src={mobileImg}
                  alt="Placement & Hiring Partners at LPU Online"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If VGU or single image is supplied
  if (activeRecruiters.image || brand.slug === "vgu" || brand.recruitersLayout === "vgu") {
    const title = activeRecruiters.title || "Top Recruiters at VGU Online";
    const image = activeRecruiters.image || "/assets/vgu/placement-partner-vgu.webp";

    return (
      <section id="partners" className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <LandingContainer>
          {/* Centered Maroon Badge */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="bg-[#811811] text-white px-8 sm:px-10 py-2.5 sm:py-3 rounded-[8px] text-center shadow-xs">
              <h2 className="text-[17px] sm:text-[20px] font-bold text-white tracking-tight leading-tight m-0">
                {title}
              </h2>
            </div>
          </div>

          {/* Recruiters Logos Image */}
          <div className="max-w-[1020px] mx-auto px-2">
            <div className="relative w-full aspect-[2.6/1] sm:aspect-[2.8/1] flex items-center justify-center">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1020px"
              />
            </div>
          </div>
        </LandingContainer>
      </section>
    );
  }

  // Shoolini and generic desktop/mobile responsive recruiters
  const heading =
    activeRecruiters.title ||
    brand.recruitersTitle ||
    `Top Recruiters of ${brand.name || "Shoolini University Online"}`;

  const desktopImg =
    activeRecruiters.desktopImage ||
    brand.recruitersDesktopImage ||
    "/assets/shoolini/partiner-desktop.webp";

  const mobileImg =
    activeRecruiters.mobileImage ||
    brand.recruitersMobileImage ||
    "/assets/shoolini/partner-mobile.webp";

  return (
    <section id="placement" className="py-10 sm:py-14 bg-white text-center select-none">
      <LandingContainer>
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#fd2954] mb-6 sm:mb-8 tracking-tight">
          Top Recruiters of <span className="font-extrabold text-[#000000]">{brand.name || "Shoolini University Online"}</span>
        </h2>

        <div className="max-w-5xl mx-auto px-2">
          {/* Desktop Partner Image */}
          <div className="hidden sm:block relative w-full">
            <Image
              src={desktopImg}
              alt={heading}
              width={1100}
              height={380}
              className="w-full h-auto object-contain mx-auto"
              priority
            />
          </div>

          {/* Mobile Partner Image */}
          <div className="block sm:hidden relative w-full">
            <Image
              src={mobileImg}
              alt={heading}
              width={500}
              height={450}
              className="w-full h-auto object-contain mx-auto"
              priority
            />
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
