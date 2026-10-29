"use client";

import Link from "next/link";
import Image from "next/image";

export default function LandingCompareBanner({ brand = {}, onOpenCompare }) {
  const isSmu =
    brand.slug === "smu" ||
    brand.name?.toLowerCase().includes("sikkim") ||
    brand.name?.toLowerCase().includes("smu");

  const isCu =
    brand.slug === "cu" ||
    brand.compareLayout === "cu";

  const universityName =
    brand.compareUniversityName ||
    (isSmu
      ? "Sikkim Manipal University"
      : brand.shortName ||
      (brand.name ? brand.name.replace(/\s*Online\s*$/i, "") : "Amity University"));




  const isIim =
    brand.slug === "iim" ||
    brand.compareLayout === "iim";

  if (isIim) {
    return (
      <div className="compare_Section" id="compare-universities">
        <div className="compare_box">
          <h2>Still Confused?</h2>
          <h4>
            {brand.compareSubtitle ||
              `Compare ${universityName} with Top UGC-DEB Approved Universities`}
          </h4>
          <Link
            href="#compare-universities"
            className="compare_btn"
            onClick={(e) => {
              e.preventDefault();
              onOpenCompare?.();
            }}
          >
            <Image
              src={brand.arrowGif || "/assets/iim/arrow.gif"}
              alt="Compare universities"
              width={70}
              height={70}
              unoptimized
            />
          </Link>
        </div>
      </div>
    );
  }

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
      className={`compare_Section ${sectionBg} pt-8 sm:pt-9 md:pt-10 pb-8 sm:pb-9 md:pb-10 select-none`}
      style={{ backgroundColor: sectionBgColor }}
    >
      <div className={`${brand.compareBoxMaxWidth || (brand.slug === "lpu" ? "w-full max-w-full px-4 sm:px-6 lg:px-8 xl:px-12" : (brand.compareFullWidth ? "max-w-full" : "max-w-[1760px] 2xl:max-w-[1640px]"))} w-full mx-auto ${brand.compareBoxPadding || (brand.slug === "lpu" || brand.compareFullWidth ? "" : "px-3 sm:px-5 md:px-6")}`}>
        <div
          className={`compare_box relative ${brand.compareFullWidth ? "rounded-none" : "rounded-[20px]"} px-6 sm:px-12 pt-7 pb-8 sm:pt-8 sm:pb-9 md:pt-9 md:pb-11 text-center text-white transition-colors flex flex-col items-center justify-center shadow-md min-h-[150px] sm:min-h-[173px] md:min-h-[191px]`}
          style={{ background: bannerBg }}
        >
          {/* Heading */}
          <h2 className="text-[22px] sm:text-2xl md:text-[30px] lg:text-[32px] font-bold text-white tracking-normal leading-tight m-0">
            Still Confused?
          </h2>

          {/* Subtitle */}
          <h3 className="text-[13px] sm:text-[14.5px] md:text-[17px] text-white font-medium tracking-normal mt-1 sm:mt-1.5 max-w-xl sm:max-w-3xl mx-auto m-0 leading-snug px-1">
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
