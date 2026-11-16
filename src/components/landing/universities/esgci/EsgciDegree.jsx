"use client";

import React from "react";
import Image from "next/image";
import { esgciImg } from "./constants";

export default function EsgciDegree({ onOpenBrochure }) {
  return (
    <section id="sample-degree" className="w-full bg-white pt-5 sm:pt-7 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: Certificate Image - Direct Free Natural Size without wrapper border or background */}
          <div className="lg:col-span-6 flex justify-center">
            <Image
              src={esgciImg("degree-ESGCI.webp")}
              alt="ESGCI Online DBA Degree Certificate"
              width={750}
              height={530}
              priority
              className="w-full max-w-[540px] h-auto object-contain"
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          {/* Right Column: Title & Description */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-black text-[#04903c] leading-tight m-0 mb-4">
              ESGCI Online DBA Degree
            </h2>

            <p className="text-neutral-700 text-[14px] sm:text-[15px] leading-relaxed m-0 mb-6 font-normal">
              The ESGCI Online DBA offers the same prestigious doctorate as on-campus programs, providing global recognition and world-class education without relocation. It is a nationally accredited European degree with QUALIOPI certification and RNCP qualifications recognized by the French State.
            </p>

            <button
              type="button"
              onClick={() => onOpenBrochure?.("Degree Sample CTA", "Get Degree")}
              className="px-6 sm:px-7 py-2.5 sm:py-3 bg-[#ffd200] hover:bg-[#e6bd00] text-black rounded-[5px] text-[14.5px] sm:text-[15px] font-bold shadow-xs active:scale-98 transition-all border-none cursor-pointer"
            >
              Get Degree
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

