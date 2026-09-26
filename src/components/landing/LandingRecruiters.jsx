"use client";

import React from "react";
import Image from "next/image";
import LandingContainer from "./LandingContainer";

/**
 * Reusable Recruiters / Placement Partner Section (#placement)
 * Displays top recruiters banner image (desktop and mobile responsive)
 */
export default function LandingRecruiters({ brand = {}, recruiters = {} }) {
  const activeRecruiters = recruiters || brand.recruiters || {};
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
