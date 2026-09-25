"use client";

import React from "react";
import LandingContainer from "./LandingContainer";

/**
 * Reusable Early Access Offers & Placements Section (#E1)
 * Matches the reference design with full-width gradient banner and 2 text columns.
 */
export default function LandingOffersAndPlacement({ offersAndPlacements, brand }) {
  if (!offersAndPlacements) return null;

  const { heading, card1, card2 } = offersAndPlacements;
  const isCards = brand?.offersLayout === "cards";
  const bgGradient =
    brand?.offersBg ||
    brand?.themeGradient ||
    "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)";
  const accentColor = brand?.offersAccentColor || brand?.accentColor || "#ffd200";
  const primaryColor = brand?.primaryColor || "#f35a06";

  if (isCards) {
    return (
      <section id="offers-placement" className="py-10 sm:py-14 bg-white border-b border-slate-100">
        <LandingContainer>
          <h2 className="text-xl sm:text-2xl md:text-[28px] font-extrabold text-[#111827] text-center mb-8 sm:mb-10 tracking-tight">
            {heading || "About Manipal early access offers & placements for students"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {card1 && (
              <div className="bg-[#fcf8f5] p-6 sm:p-8 rounded-xl border border-orange-100/80 shadow-xs flex flex-col justify-between">
                <div>
                  <h3
                    className="text-lg sm:text-[20px] font-bold tracking-tight mb-3 leading-snug"
                    style={{ color: primaryColor }}
                  >
                    {card1.title}
                  </h3>
                  <p className="text-[13.5px] sm:text-[14.5px] text-slate-700 leading-relaxed font-normal m-0">
                    {card1.description}
                  </p>
                </div>
              </div>
            )}

            {card2 && (
              <div className="bg-[#fcf8f5] p-6 sm:p-8 rounded-xl border border-orange-100/80 shadow-xs flex flex-col justify-between">
                <div>
                  <h3
                    className="text-lg sm:text-[20px] font-bold tracking-tight mb-3 leading-snug"
                    style={{ color: primaryColor }}
                  >
                    {card2.title}
                  </h3>
                  <p className="text-[13.5px] sm:text-[14.5px] text-slate-700 leading-relaxed font-normal m-0">
                    {card2.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </LandingContainer>
      </section>
    );
  }

  return (
    <section
      id="offers-placement"
      className="py-10 sm:py-12 lg:py-14 w-full select-none text-white transition-colors"
      style={{ background: bgGradient }}
    >
      <LandingContainer>
        {/* Main Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-white text-center mb-6 sm:mb-8 tracking-tight">
          {heading || "About Manipal early access offers & placements for students"}
        </h2>

        {/* 2 Columns Layout (Exact match to reference Image 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto px-2 sm:px-4">
          {/* Column 1 */}
          {card1 && (
            <div className="flex flex-col text-left">
              <h3
                className="text-[16px] sm:text-[17.5px] font-bold tracking-tight mb-2 leading-snug"
                style={{ color: accentColor }}
              >
                {card1.title}
              </h3>
              <p className="text-[12.5px] sm:text-[13.5px] text-white/95 leading-relaxed font-normal m-0">
                {card1.description}
              </p>
            </div>
          )}

          {/* Column 2 */}
          {card2 && (
            <div className="flex flex-col text-left">
              <h3
                className="text-[16px] sm:text-[17.5px] font-bold tracking-tight mb-2 leading-snug"
                style={{ color: accentColor }}
              >
                {card2.title}
              </h3>
              <p className="text-[12.5px] sm:text-[13.5px] text-white/95 leading-relaxed font-normal m-0">
                {card2.description}
              </p>
            </div>
          )}
        </div>
      </LandingContainer>
    </section>
  );
}
