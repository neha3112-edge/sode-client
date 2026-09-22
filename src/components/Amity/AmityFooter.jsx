"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function AmityFooter({
  onOpenTerms,
  onOpenPrivacy,
  onOpenDisclaimer,
  onOpenCompare,
}) {
  return (
    <footer className="bg-white text-slate-600 text-xs border-t border-slate-100 relative">
      {/* 1. Still Confused? Compare Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 pt-8 sm:pt-10">
        <div
          onClick={() => onOpenCompare?.()}
          className="bg-[#08417b] rounded-md py-5 sm:py-6 px-4 text-center shadow-lg relative cursor-pointer hover:bg-[#063366] transition-colors group"
        >
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Still Confused?
          </h3>
          <p className="text-xs sm:text-[13px] text-blue-100 mt-1 font-normal">
            Compare Amity University with Top UGC-DEB Approved Universities
          </p>

          {/* Overlapping Yellow Circle with Down Arrow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#ffc107] border-2 border-white flex items-center justify-center shadow-md group-hover:translate-y-0.5 transition-transform">
            <ArrowDown className="w-4 h-4 text-slate-900 stroke-[3]" />
          </div>
        </div>
      </div>

      {/* 2. Official Logo & Disclaimer Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-8 text-center space-y-4">
        {/* Full SODE Logo */}
        <div className="flex justify-center">
          <Image
            src="/assets/images/sode_logo_official.webp"
            alt="Distance Education School - School Of Online & Distance Education"
            width={320}
            height={90}
            className="h-14 sm:h-18 w-auto object-contain"
            priority
          />
        </div>

        {/* Disclaimer Paragraph */}
        <p className="text-[10px] sm:text-[11px] text-slate-500 max-w-4xl mx-auto leading-relaxed">
          SODE Counselling Services LLP act as a marketing agency. All university names, logos,
          and trademarks mentioned are used for informational purposes only. We are not a
          university or an admission authority. Users are encouraged to verify information on
          the official website of the University before making decisions.
        </p>

        {/* Legal Policy Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-600 pt-1">
          <button
            onClick={() => onOpenDisclaimer?.()}
            className="hover:text-[#08417b] transition underline cursor-pointer"
          >
            Disclaimer
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={() => onOpenTerms?.()}
            className="hover:text-[#08417b] transition underline cursor-pointer"
          >
            Terms & Conditions
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={() => onOpenPrivacy?.()}
            className="hover:text-[#08417b] transition underline cursor-pointer"
          >
            Privacy Policy
          </button>
        </div>

        {/* Copyright */}
        <div className="text-[10px] text-slate-400 pt-1">
          © {new Date().getFullYear()} SODE Counselling Services LLP
        </div>
      </div>
    </footer>
  );
}
