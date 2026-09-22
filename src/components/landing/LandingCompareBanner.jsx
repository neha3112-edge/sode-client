"use client";

import Image from "next/image";

export default function LandingCompareBanner({ brand = {}, onOpenCompare }) {
  const universityName = brand.shortName || (brand.name ? brand.name.replace(/\s*Online\s*$/i, "") : "Amity University");

  return (
    <section className="compare_Section bg-[#f6f8fa] pt-8 sm:pt-14 pb-8 sm:pb-10">
      <div className="max-w-full mx-auto px-4 sm:px-11">
        <div
          className="compare_box relative rounded-2xl sm:rounded-3xl px-6 sm:px-12 pt-9 pb-18 sm:pt-12 sm:pb-16 text-center text-white transition-colors flex flex-col items-center justify-center shadow-sm"
          style={{ backgroundColor: brand.primaryColor || "#08417b" }}
        >
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight m-0">
            Still Confused?
          </h2>

          {/* Subtitle with max-w-xs on mobile for clean 2-line break */}
          <h4 className="text-sm sm:text-sm md:text-base text-white/95 font-semibold tracking-normal mt-2.5 max-w-xs sm:max-w-xl mx-auto m-0 leading-snug px-1">
            Compare {universityName} with Top UGC-DEB Approved Universities
          </h4>

          {/* Centered Overlapping Circular Button matching screenshot */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-10">
            <button
              type="button"
              onClick={() => onOpenCompare?.()}
              aria-label="Compare universities"
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-md border border-slate-100"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/assets/images/arrow.gif"
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
