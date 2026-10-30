"use client";

import Link from "next/link";
import Image from "next/image";

export default function LandingCompareBanner({ brand = {}, onOpenCompare }) {
  const isSmu =
    brand.slug === "smu" ||
    brand.name?.toLowerCase().includes("sikkim") ||
    brand.name?.toLowerCase().includes("smu");

  const universityName =
    brand.compareUniversityName ||
    (isSmu
      ? "Sikkim Manipal University"
      : brand.shortName ||
      (brand.name ? brand.name.replace(/\s*Online\s*$/i, "") : "Amity University"));


  const sectionBg = brand.compareSectionBg || "bg-[#f6f8fa]";
  const sectionBgColor =
    brand.compareSectionBgColor && brand.compareSectionBgColor !== "#ffffff"
      ? brand.compareSectionBgColor
      : "#f6f8fa";

  const bannerBg =
    brand.compareBannerBg ||
    (isSmu
      ? "linear-gradient(90deg, #02203c 0%, #004b87 100%)"
      : brand.primaryColor || "#002b49");

  return (
    <section
      className={`compare_Section ${sectionBg} pt-8 sm:pt-9 md:pt-15 pb-8 sm:pb-9 md:pb-14 select-none`}
      style={{ backgroundColor: sectionBgColor }}
    >
      <div className={`${brand.compareBoxMaxWidth || "max-w-[1700px] 2xl:max-w-[1900px]"} w-full mx-auto px-2 sm:px-3 md:px-14 lg:px-0px`}>
        <div
          className="compare_box relative rounded-2xl sm:rounded-2xl px-4 sm:px-12 pt-8 pb-10 sm:pt-8 sm:pb-9 md:pt-9 md:pb-11 lg:pt-10 lg:pb-12 text-center text-white transition-colors flex flex-col items-center justify-center shadow-md min-h-[160px] sm:min-h-[173px] md:min-h-[191px]"
          style={{ background: bannerBg }}
        >
          {/* Heading */}
          <h2 className="text-[26px] sm:text-2xl md:text-[30px] lg:text-[32px] font-bold sm:font-semibold text-white leading-tight tracking-wide sm:tracking-wide m-0 mb-1.5 sm:mb-0 sm:-translate-y-2">
            Still Confused?
          </h2>

          {/* Subtitle */}
          <h3 className="text-[15.5px] sm:text-sm md:text-[17px] text-white font-semibold sm:font-normal tracking-wide sm:tracking-wide mt-1 sm:mt-1.5 max-w-[265px] sm:max-w-xl md:max-w-3xl mx-auto m-0 leading-snug px-1 sm:-translate-y-2">
            {brand.compareSubtitle ||
              brand.compareBannerSubtitle ||
              `Compare ${universityName} with Top UGC-DEB Approved Universities`}
          </h3>

          {/* Centered Overlapping Circular Button */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
            <button
              type="button"
              onClick={() => onOpenCompare?.()}
              aria-label="Compare universities"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-[68px] md:h-[68px] rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-lg p-0.5 sm:p-0.5 border border-slate-100"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src={brand.arrowGif || brand.arrowIcon || "/assets/all_universities_images/ggu/arrow.gif" || "/assets/images/arrow.gif"}
                  alt="Compare down arrow"
                  fill
                  className="object-contain rounded-full scale-[1.13]"
                  unoptimized
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
