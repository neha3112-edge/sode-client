"use client";

import Image from "next/image";

export default function LandingCompareBanner({ brand = {}, onOpenCompare }) {
  const universityName = brand.name || "University Online";

  return (
    <section className="compare_Section bg-[#f6f8fa] pt-12 sm:pt-14 pb-8 sm:pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className="compare_box relative rounded-2xl sm:rounded-[22px] px-6 sm:px-12 py-8 sm:py-10 text-center text-white transition-colors flex flex-col items-center justify-center shadow-sm"
          style={{ backgroundColor: brand.primaryColor || "#08417b" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight m-0">
            Still Confused?
          </h2>
          <h4 className="text-xs sm:text-sm md:text-base text-white/95 font-medium mt-2 max-w-2xl mx-auto m-0">
            Compare {universityName} with Top UGC-DEB Approved Universities
          </h4>

          {/* Centered Overlapping Circular Button matching exact live site arrow.gif */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-10">
            <button
              type="button"
              onClick={() => onOpenCompare?.()}
              aria-label="Compare universities"
              className="w-16 h-16 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] p-1 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all border border-slate-100"
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
