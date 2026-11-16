"use client";

import React from "react";
import Image from "next/image";
import { IIM_DEGREE, iimImg } from "./constants";

export default function IimDegree({ onOpenBrochure }) {
  return (
    <section id="sample-degree" className="w-full bg-white py-10 sm:py-14 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Direct Sample Certificate Image without extra borders/padding/bg */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[540px]">
              <Image
                src={iimImg(IIM_DEGREE.certificateImage)}
                alt="IIM Kozhikode Sample Degree Certificate"
                width={600}
                height={440}
                className="w-full h-auto object-contain block"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>

          {/* Right Column: Details & Action */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-[26px] sm:text-[32px] md:text-[38px] font-black text-[#17479E] leading-tight m-0">
              {IIM_DEGREE.title}
              <br />
              {IIM_DEGREE.titleSecondLine}
            </h2>

            <h3 className="text-[16px] sm:text-[18px] font-bold text-neutral-800 m-0 mt-2 mb-3">
              {IIM_DEGREE.subtitle}
            </h3>

            <p className="text-neutral-600 text-[13px] sm:text-[14px] leading-relaxed m-0 mb-6 font-normal max-w-[520px]">
              {IIM_DEGREE.desc}
            </p>

            <button
              type="button"
              onClick={() => onOpenBrochure?.("Sample Degree", "Get Degree")}
              className="py-2.5 sm:py-3 px-7 rounded-full bg-[#0CB1EF] hover:bg-[#0aa0d8] text-white font-bold text-[13.5px] sm:text-[14px] border-none shadow-md cursor-pointer active:scale-98 transition-all"
            >
              Get Degree
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

