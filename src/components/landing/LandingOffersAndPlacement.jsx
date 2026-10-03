"use client";

import React from "react";
import LandingContainer from "./LandingContainer";

/**
 * Reusable Early Access Offers & Placements Section
 */
export default function LandingOffersAndPlacement({ offersAndPlacements, brand }) {
  if (!offersAndPlacements) return null;

  const { heading, card1, card2 } = offersAndPlacements;
  const cards = [card1, card2].filter(Boolean);
  if (!cards.length) return null;

  const isCards = brand?.offersLayout === "cards";
  const title = heading || "About Manipal early access offers & placements for students";

  return (
    <section
      id="offers-placement"
      className={isCards ? "py-10 sm:py-14 bg-white border-b border-slate-100" : "py-10 sm:py-12 lg:py-14 w-full select-none text-white transition-colors"}
      style={!isCards ? { background: brand?.offersBg || brand?.themeGradient || "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)" } : undefined}
    >
      <LandingContainer>
        <h2 className={isCards ? "text-xl sm:text-2xl md:text-[28px] font-extrabold text-[#111827] text-center mb-8 sm:mb-10 tracking-tight" : "text-2xl sm:text-3xl md:text-[32px] font-bold text-white text-center mb-6 sm:mb-8 tracking-tight"}>
          {title}
        </h2>

        <div className={isCards ? "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto" : "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto px-2 sm:px-4"}>
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={isCards ? "bg-[#fcf8f5] p-6 sm:p-8 rounded-xl border border-orange-100/80 shadow-xs flex flex-col" : "flex flex-col text-left"}
            >
              <h3
                className={isCards ? "text-lg sm:text-[20px] font-bold tracking-tight mb-3 leading-snug" : "text-[16px] sm:text-[17.5px] font-bold tracking-tight mb-2 leading-snug"}
                style={{ color: isCards ? (brand?.primaryColor || "#f35a06") : (brand?.offersAccentColor || brand?.accentColor || "#ffd200") }}
              >
                {card.title}
              </h3>
              <p className={isCards ? "text-[13.5px] sm:text-[14.5px] text-slate-700 leading-relaxed font-normal m-0" : "text-[12.5px] sm:text-[13.5px] text-white/95 leading-relaxed font-normal m-0"}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}


