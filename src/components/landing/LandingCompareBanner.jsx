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

  if (isSmu) {
    return (
      <div className="compare_Section pt-3 sm:pt-5 lg:pt-14 pb-8 sm:pb-12 bg-white select-none scroll-mt-20 w-full" id="compare">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 max-w-none">
          <div className="compare_box relative bg-[#f05525] rounded-[20px] sm:rounded-[24px] pt-12 pb-16 sm:pt-16 sm:pb-20 px-6 sm:px-12 text-center text-white flex flex-col items-center justify-center shadow-md w-full">
            <h2 className="text-[28px] sm:text-[34px] md:text-[38px] font-bold text-white m-0 tracking-tight leading-tight">
              Still Confused?
            </h2>
            <h4 className="text-[14px] sm:text-[15.5px] font-normal sm:font-medium text-white/95 mt-2.5 sm:mt-3 m-0 max-w-2xl leading-normal text-center">
              {brand.compareSubtitle || "Compare Sikkim Manipal University with Top UGC-DEB Approved Universities"}
            </h4>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onOpenCompare?.();
              }}
              className="compare_btn absolute -bottom-6 sm:-bottom-7 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full p-[3px] shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 border-none z-10"
              aria-label="Compare Universities"
            >
              <img
                src={brand.arrowGif || "/assets/smu/arrow.gif"}
                alt="Compare universities"
                className="w-full h-full rounded-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isCu) {
    return (
      <div className="compare_Section pt-8 sm:pt-12 pb-6 sm:pb-8 bg-white select-none scroll-mt-20 w-full" id="compare">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 max-w-none">
          <div className="compare_box relative bg-[#d11c1f] rounded-[20px] pt-10 pb-14 sm:pt-12 sm:pb-16 px-6 sm:px-12 text-center text-white flex flex-col items-center justify-center shadow-md w-full">
            <h2 className="text-[28px] sm:text-[34px] md:text-[38px] font-bold text-white m-0 tracking-tight leading-tight">
              Still Confused?
            </h2>
            <h4 className="text-[14px] sm:text-[15.5px] font-normal sm:font-medium text-white/95 mt-2.5 sm:mt-3 m-0 max-w-2xl leading-normal">
              {brand.compareSubtitle || "Compare Chandigarh University with Top UGC-DEB Approved Universities"}
            </h4>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onOpenCompare?.();
              }}
              className="compare_btn absolute -bottom-6 sm:-bottom-7 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full p-[3px] shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 border-none z-10"
              aria-label="Compare Universities"
            >
              <img
                src={brand.arrowGif || "/assets/cu/arrow.gif"}
                alt="Compare universities"
                className="w-full h-full rounded-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isUpes =
    brand.slug === "upes" ||
    brand.compareLayout === "upes";

  if (isUpes) {
    return (
      <div className="pt-8 sm:pt-12 pb-10 sm:pb-14 bg-[#f6f8fa] select-none scroll-mt-20 w-full" id="compare">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#f2167d] rounded-[20px] pt-10 pb-14 sm:pt-12 sm:pb-16 px-4 sm:px-12 text-center text-white flex flex-col items-center justify-center shadow-md w-full">
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-bold text-white m-0 tracking-tight leading-tight">
              Still Confused?
            </h2>
            <h4 className="text-[14px] sm:text-[16px] font-medium text-white/95 mt-2.5 sm:mt-3 m-0 max-w-2xl leading-normal text-center">
              {brand.compareSubtitle || "Compare UPES University Online with Top UGC-DEB Approved Universities"}
            </h4>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onOpenCompare?.();
              }}
              className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full p-[3px] shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 border-none z-10"
              aria-label="Compare Universities"
            >
              <img
                src={brand.arrowGif || brand.arrowIcon || "/assets/upes/arrow.gif"}
                alt="Compare universities"
                className="w-full h-full rounded-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

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
