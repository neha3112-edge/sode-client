"use client";

import React from "react";
import LandingContainer from "./LandingContainer";

/**
 * Reusable About SODE Section (#sode_about)
 * Highlights the educational counselling platform with action buttons.
 */
export default function LandingSodeAbout({
  sodeAbout,
  brand = {},
  onOpenApply,
  onOpenCompare,
}) {
  if (!sodeAbout) return null;

  const { title, subtitle, paragraphs, primaryButtonText, secondaryButtonText } = sodeAbout;
  const primaryColor = brand?.primaryColor || "#f35a06";
  const themeGradient = brand?.themeGradient || "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)";

  return (
    <section id="sode_about" className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <LandingContainer>
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-[#111827] tracking-tight leading-snug mb-2">
            {title || "About SODE"} <br />
            {subtitle && (
              <span className="text-base sm:text-lg md:text-xl font-medium text-slate-600 block mt-1">
                {subtitle}
              </span>
            )}
          </h2>

          {/* Paragraphs */}
          <div className="space-y-4 my-6 text-[14px] sm:text-[15.5px] text-slate-700 leading-relaxed text-justify sm:text-center">
            {paragraphs &&
              paragraphs.map((p, idx) => (
                <p key={idx} className="m-0">
                  {p}
                </p>
              ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mt-8">
            <button
              type="button"
              onClick={() => onOpenApply?.()}
              className="w-full sm:w-auto px-8 py-3 rounded-lg text-white font-bold text-[15px] shadow-sm hover:shadow-md transition-all cursor-pointer border-none active:scale-95"
              style={{ background: themeGradient }}
            >
              {primaryButtonText || "Get Help"}
            </button>
            <button
              type="button"
              onClick={() => onOpenCompare?.()}
              className="w-full sm:w-auto px-8 py-3 rounded-lg text-slate-800 font-bold text-[15px] border-2 border-slate-300 hover:border-slate-800 transition-all cursor-pointer bg-white active:scale-95"
            >
              {secondaryButtonText || "Compare University"}
            </button>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
