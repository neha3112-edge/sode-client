"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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

  // If list of partner logos is provided (e.g. MU Top-Tier Hiring Partners)
  if (activeRecruiters.logos && activeRecruiters.logos.length > 0) {
    return (
      <MuRecruitersCarousel
        activeRecruiters={activeRecruiters}
        brand={brand}
      />
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

/**
 * Mangalayatan University (MU) / Generic Partner Logo Carousel
 * Displays 5 cards per row on desktop, auto-rotates in an infinite loop, and features interactive dot indicators
 */
function MuRecruitersCarousel({ activeRecruiters, brand }) {
  const logos = activeRecruiters.logos || [];
  const title = activeRecruiters.title || `${brand.name || "University"} Top-Tier Hiring Partners`;
  const subtitle = activeRecruiters.subtitle || activeRecruiters.description || null;

  const [visibleCount, setVisibleCount] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(logos.length || 0);
  const [withTransition, setWithTransition] = useState(true);

  // Responsive items count (5 on desktop, 3 on tablet, 2 on mobile)
  useEffect(() => {
    function updateVisible() {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(3);
      } else {
        setVisibleCount(brand.recruitersVisibleCount || 5);
      }
    }
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, [brand.recruitersVisibleCount]);

  // Triple the logos list for smooth infinite wrapping
  const extendedLogos = [...logos, ...logos, ...logos];

  // Autoplay timer - right to left infinite rotation
  useEffect(() => {
    if (logos.length === 0) return;
    const interval = brand.recruitersInterval || 2200;
    const timer = setInterval(() => {
      setWithTransition(true);
      setCurrentIndex((prev) => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [logos.length, brand.recruitersInterval]);

  // Seamless infinite reset when exceeding boundaries
  useEffect(() => {
    if (logos.length === 0) return;
    if (currentIndex >= logos.length * 2) {
      const resetTimer = setTimeout(() => {
        setWithTransition(false);
        setCurrentIndex((prev) => prev - logos.length);
      }, 650); // wait for 600ms transition to finish
      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex, logos.length]);

  // Restore transition after silent reset
  useEffect(() => {
    if (!withTransition) {
      const restoreTimer = setTimeout(() => {
        setWithTransition(true);
      }, 50);
      return () => clearTimeout(restoreTimer);
    }
  }, [withTransition]);

  // Calculate 2 dots matching reference
  const totalDots = 2;
  const normalizedIndex = (currentIndex % logos.length + logos.length) % logos.length;
  const activeDot = normalizedIndex < 3 ? 0 : 1;

  const handleDotClick = (dotIdx) => {
    setWithTransition(true);
    if (dotIdx === 0) {
      setCurrentIndex(logos.length);
    } else {
      setCurrentIndex(logos.length + 3);
    }
  };

  return (
    <section
      id="placement"
      className={`select-none ${brand.recruitersSectionClassName || "py-10 sm:py-14 bg-[#f8f9fa] text-center"}`}
      style={{
        backgroundColor: brand.recruitersBg || "#f8f9fa",
        ...brand.recruitersSectionStyle,
      }}
    >
      <div className={brand.recruitersContainerClassName || "max-w-[1240px] mx-auto px-4 sm:px-6"}>
        {/* Title and Subtitle */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8 text-center">
          <h2
            className={
              brand.recruitersTitleClassName ||
              "text-[22px] sm:text-[26px] lg:text-[30px] font-bold text-[#193579] uppercase tracking-wide m-0 mb-3"
            }
            style={brand.recruitersTitleStyle}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={
                brand.recruitersSubtitleClassName ||
                "text-[12.5px] sm:text-[13.5px] text-[#333333] leading-[1.55] max-w-4xl mx-auto font-normal m-0"
              }
              style={brand.recruitersSubtitleStyle}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel Window */}
        <div className="overflow-hidden w-full max-w-[1180px] mx-auto px-1 py-1">
          <div
            className="flex items-center"
            style={{
              transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`,
              transition: withTransition ? "transform 600ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
            }}
          >
            {extendedLogos.map((logo, idx) => (
              <div
                key={idx}
                className="shrink-0 px-2 sm:px-2.5"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div
                  className={
                    brand.recruitersCardClassName ||
                    "bg-white rounded-[8px] h-[72px] sm:h-[82px] w-full px-3 py-2 flex items-center justify-center shadow-xs border border-slate-100 hover:shadow-md transition-all group overflow-hidden"
                  }
                  style={brand.recruitersCardStyle}
                >
                  <img
                    src={logo}
                    alt={`Partner ${(idx % logos.length) + 1}`}
                    className="max-h-[48px] sm:max-h-[56px] max-w-[85%] w-auto h-auto object-contain mx-auto transition-transform duration-200 group-hover:scale-105"
                    loading="eager"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-5 sm:mt-6">
          {Array.from({ length: totalDots }).map((_, dIdx) => (
            <button
              key={dIdx}
              type="button"
              onClick={() => handleDotClick(dIdx)}
              aria-label={`Go to slide ${dIdx + 1}`}
              className={`transition-all cursor-pointer border-none p-0 ${
                activeDot === dIdx
                  ? brand.recruitersDotActiveClass || "w-2.5 h-2.5 rounded-full bg-black scale-110"
                  : brand.recruitersDotInactiveClass || "w-2.5 h-2.5 rounded-full bg-[#b8b8b8] hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
