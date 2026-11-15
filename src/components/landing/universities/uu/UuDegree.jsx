"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { uuImg } from "./constants";

export default function UuDegree({ onOpenApply }) {
  return (
    <section id="certificate" className="w-full py-12 sm:py-16 bg-white select-none">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <span className="text-[#62B239] font-bold text-sm sm:text-base tracking-wider uppercase block mb-1">
              UGC Approved
            </span>
            <h2 className="text-[#003399] font-bold text-2xl sm:text-3xl md:text-[34px] leading-tight m-0 mb-4">
              Uttaranchal University Online Degree
            </h2>

            <p className="text-gray-600 text-xs sm:text-[13.5px] md:text-sm leading-relaxed mb-6 max-w-[500px] mx-auto lg:mx-0">
              Online degrees from Online UU are recognized by UGC &amp; AICTE and are accepted by the government, education
              institutions, and corporates.
            </p>

            <button
              type="button"
              onClick={() => onOpenApply?.("Get Degree Enquire")}
              className="inline-flex items-center justify-center font-semibold text-xs sm:text-sm py-2 px-6 rounded-md border border-gray-800 text-gray-800 hover:bg-[#62B239] hover:border-[#62B239] hover:text-white transition-all cursor-pointer bg-white"
            >
              Get Degree
            </button>
          </div>

          {/* Right Column: Sample Degree Image - Free natural height & width */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <Image
              src={uuImg("sample-degree-uttarancha1.webp")}
              alt="Uttaranchal University Sample Online Degree"
              width={1085}
              height={1477}
              className="w-full h-auto max-w-[380px] sm:max-w-[420px] object-contain"
              style={{ width: "100%", height: "auto" }}
              sizes="(max-width: 640px) 100vw, 420px"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

