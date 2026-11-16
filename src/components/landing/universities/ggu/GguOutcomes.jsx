"use client";

import React from "react";
import Image from "next/image";
import { gguImg, GGU_LEARNING_OUTCOMES } from "./constants";

export default function GguOutcomes() {
  return (
    <section id="outcomes" className="w-full bg-[#003468] text-white select-none overflow-hidden">
      {/* =========================================================================
          DESKTOP VIEW (lg+) - 100% Full Width Edge-to-Edge Bleed
          ========================================================================= */}
      <div className="hidden lg:grid grid-cols-12 min-h-[480px] xl:min-h-[520px]">
        {/* Left Column: Golden Gate Bridge Image (Free natural top alignment, touches screen edges) */}
        <div className="lg:col-span-4 xl:col-span-4 relative min-h-full bg-neutral-900 overflow-hidden">
          <Image
            src={gguImg("learning-outcome-01.webp")}
            alt="Golden Gate Bridge San Francisco"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 35vw"
            className="object-cover object-top block"
          />
        </div>

        {/* Right Column: Outcomes Content on Navy Blue (Touches right screen edge) */}
        <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-center py-10 lg:py-14 pl-10 lg:pl-14 xl:pl-20 pr-6 lg:pr-12 xl:pr-16">
          <div className="max-w-[800px]">
            <h2 className="text-[26px] xl:text-[32px] font-black uppercase tracking-wide text-white m-0 mb-1 leading-tight">
              LEARNING OUTCOMES
            </h2>
            <h3 className="text-[17px] xl:text-[19px] font-bold text-neutral-200 m-0 mb-8">
              After a DBA at GGU
            </h3>

            {/* 6 Outcomes in 2-column Grid - Direct Original Icon Graphic */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-7">
              {GGU_LEARNING_OUTCOMES.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  {/* Direct Logo Graphic - No artificial background or border */}
                  <div className="relative w-12 h-12 sm:w-[52px] sm:h-[52px] shrink-0">
                    <Image
                      src={gguImg("learning-outcone-icon.webp")}
                      alt={item.title}
                      width={52}
                      height={52}
                      className="w-full h-full object-contain block"
                    />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-white m-0 mb-1 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[12.5px] leading-snug text-neutral-300 m-0 font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE VIEW (visible on mobile / tablet) - Edge-to-Edge
          ========================================================================= */}
      <div className="block lg:hidden w-full">
        <div className="px-5 pt-8 pb-4 text-center">
          <h2 className="text-[22px] sm:text-[26px] font-black uppercase tracking-wide text-white m-0 mb-1">
            LEARNING OUTCOMES
          </h2>
          <h3 className="text-[15px] sm:text-[17px] font-bold text-neutral-200 m-0 mb-6">
            After a DBA at GGU
          </h3>

          {/* 6 Outcomes in 2 columns on mobile */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-6">
            {GGU_LEARNING_OUTCOMES.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="relative w-12 h-12 shrink-0 mb-2">
                  <Image
                    src={gguImg("learning-outcone-icon.webp")}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain block"
                  />
                </div>
                <h4 className="text-[13px] sm:text-[14px] font-bold text-white m-0 mb-1 leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-[12px] leading-snug text-neutral-300 m-0 font-normal max-w-[150px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Golden Gate Bridge touching edges on Mobile */}
        <div className="relative w-full overflow-hidden mt-2">
          <Image
            src={gguImg("learing-outome-mobile.webp")}
            alt="Golden Gate Bridge"
            width={640}
            height={360}
            className="w-full h-auto object-cover block"
          />
        </div>
      </div>
    </section>
  );
}
