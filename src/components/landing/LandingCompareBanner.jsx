"use client";

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

  const isIim =
    brand.slug === "iim" ||
    brand.compareLayout === "iim";

  if (isIim) {
    return (
      <div className="compare_Section" id="compare-universities">
        <div className="compare_box">
          <h2>Still Confused?</h2>
          <h4>{brand.compareSubtitle || "Compare IIM Kozhikode University with Top World Renowned Universities"}</h4>
          <a
            href="javascript:void(0);"
            className="compare_btn"
            onClick={() => onOpenCompare?.()}
          >
            <img src={brand.arrowGif || "/assets/iim/arrow.gif"} alt="Compare universities" />
          </a>
        </div>
      </div>
    );
  }

  const sectionBg = brand.compareSectionBg || "bg-white";
  const bannerBg =
    brand.compareBannerBg ||
    (isSmu
      ? "linear-gradient(90deg, #02203c 0%, #004b87 100%)"
      : brand.primaryColor || "#002b49");

  return (
    <section
      className={`compare_Section ${sectionBg} pt-8 sm:pt-14 pb-14 sm:pb-16 select-none`}
      style={{ backgroundColor: brand.compareSectionBgColor || "#ffffff" }}
    >
      <div className={`${brand.compareBoxMaxWidth || "max-w-[1440px] 2xl:max-w-[1540px]"} mx-auto px-4 sm:px-8 lg:px-12`}>
        <div
          className="compare_box relative rounded-xl sm:rounded-2xl px-4 sm:px-16 pt-7 pb-14 sm:pt-12 sm:pb-16 text-center text-white transition-colors flex flex-col items-center justify-center shadow-md"
          style={{ background: bannerBg }}
        >
          {/* Heading */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight m-0">
            Still Confused?
          </h2>

          {/* Subtitle */}
          <h3 className="text-[12px] sm:text-sm md:text-sm text-white/95 font-semibold tracking-normal mt-1.5 sm:mt-2 max-w-xs sm:max-w-xl mx-auto m-0 leading-snug px-1">
            {brand.compareSubtitle ||
              brand.compareBannerSubtitle ||
              `Compare ${universityName} with Top UGC-DEB Approved Universities`}
          </h3>

          {/* Centered Overlapping Circular Button */}
          <div className="absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 z-10">
            <button
              type="button"
              onClick={() => onOpenCompare?.()}
              aria-label="Compare universities"
              className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-md border border-slate-100"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={brand.arrowGif || "/assets/images/arrow.gif"}
                  alt="Compare down arrow"
                  fill
                  className="object-cover rounded-full"
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
