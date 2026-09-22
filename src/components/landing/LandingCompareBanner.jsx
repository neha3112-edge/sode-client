"use client";

import React from "react";
import { ArrowDown, Scale } from "lucide-react";

export default function LandingCompareBanner({ brand = {}, onOpenCompare }) {
  const universityName = brand.name || "University Online";

  return (
    <section className="compare_Section bg-[#f6f8fa] py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div
          className="compare_box relative rounded-[20px] px-6 sm:px-12 py-10 sm:py-12 text-center text-white transition-colors flex flex-col items-center justify-center"
          style={{ backgroundColor: brand.primaryColor || "#08417b" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight m-0">
            Still Confused?
          </h2>
          <h4 className="text-sm sm:text-base text-white/95 font-medium mt-2 max-w-2xl mx-auto m-0">
            Compare {universityName} with Top UGC-DEB Approved Universities
          </h4>

          {/* Centered Overlapping Circular Button matching .compare_btn img */}
          <div className="absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2">
            <button
              type="button"
              onClick={() => onOpenCompare?.()}
              aria-label="Compare universities"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-slate-800 shadow-[0_4px_15px_rgba(0,0,0,0.18)] flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all group border-2 border-slate-100"
            >
              <ArrowDown className="w-6 h-6 text-[#08417b] group-hover:translate-y-1 transition-transform" style={{ color: brand.primaryColor || "#08417b" }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
