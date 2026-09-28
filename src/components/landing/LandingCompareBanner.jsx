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

  const bannerBg =
    brand.compareBannerBg ||
    brand.compareBannerColor ||
    (isSmu ? "#f05525" : brand.primaryColor || "#08417b");

  return (
    <section className="compare_Section bg-[#f6f8fa] pt-8 sm:pt-10 pb-10 sm:pb-12 select-none w-full">
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-10">
        <div
          className="compare_box relative rounded-[16px] sm:rounded-[20px] px-6 sm:px-12 pt-8 pb-14 sm:pt-10 sm:pb-14 text-center text-white transition-colors flex flex-col items-center justify-center shadow-xs w-full"
          style={{ background: bannerBg }}
        >
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight m-0">
            Still Confused?
          </h2>

          {/* Subtitle */}
          <h4 className="text-xs sm:text-sm lg:text-[15px] text-white/95 font-semibold tracking-normal mt-2 max-w-xs sm:max-w-xl mx-auto m-0 leading-snug px-1">
            Compare {universityName} with Top UGC-DEB Approved Universities
          </h4>

          {/* Centered Overlapping Circular Button */}
          <div className="absolute -bottom-8 sm:-bottom-9 left-1/2 -translate-x-1/2 z-10">
            <button
              type="button"
              onClick={() => onOpenCompare?.()}
              aria-label="Compare universities"
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-md border-2"
              style={{ borderColor: bannerBg }}
            >
              <div className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden p-1">
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
