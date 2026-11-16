"use client";

import React from "react";
import Image from "next/image";
import { galgotiasImg } from "./constants";

export default function GalgotiasRecruiters() {
  return (
    <section id="recruiters" className="py-12 sm:py-16 bg-white select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-[26px] sm:text-[32px] md:text-[34px] font-bold text-[#111111] m-0 mb-3">
          Galgotias University CODE Top Hiring Partners
        </h2>
        <p className="text-[13px] sm:text-[14px] text-[#555555] max-w-3xl mx-auto leading-relaxed m-0 mb-8 sm:mb-10 font-normal">
          Online Galgotias University Collaborates with highly renowned and reputable companies across several sectors . These partnerships are a gateway to numerous career opportunities. Altogether, the university empowers learners to learn and grow as well as secure a high rank in top industry-leading organisations such as Abbott, Jio etc.
        </p>

        {/* Desktop Partners Grid Image - Free Natural Size */}
        <div className="hidden sm:block w-full max-w-[1100px] mx-auto">
          <Image
            src={galgotiasImg("partner-desktop.webp")}
            alt="Galgotias Top Hiring Partners"
            width={1763}
            height={664}
            sizes="(max-width: 1200px) 100vw, 1100px"
            className="w-full h-auto block mx-auto"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* Mobile Partners Grid Image - Free Natural Size */}
        <div className="block sm:hidden w-full max-w-[440px] mx-auto">
          <Image
            src={galgotiasImg("partner-mobile.webp")}
            alt="Galgotias Top Hiring Partners"
            width={630}
            height={890}
            sizes="100vw"
            className="w-full h-auto block mx-auto"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
