"use client";

import React from "react";
import { ArrowDown, Scale } from "lucide-react";

export default function LandingCompareBanner({ brand = {}, onOpenCompare }) {
  const universityName = brand.name || "University Online";

  return (
    <section className="bg-slate-50 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative rounded-2xl p-6 sm:p-8 text-center text-white shadow-md transition-colors ${
            brand.themeBg || "bg-[#08417b]"
          }`}
          style={{ backgroundColor: brand.primaryColor }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight m-0">
            Still Confused?
          </h2>
          <p className="text-xs sm:text-sm text-white/95 font-semibold mt-1 sm:mt-1.5 max-w-2xl mx-auto m-0">
            Compare {universityName} with Top UGC-DEB Approved Universities
          </p>

          {/* Centered Overlapping Circular Button */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
            <button
              type="button"
              onClick={() => onOpenCompare?.()}
              aria-label="Compare universities"
              className="w-12 h-12 rounded-full bg-white text-slate-800 border-[3px] border-amber-400 shadow-md flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all group"
            >
              <ArrowDown className="w-5 h-5 text-amber-500 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
