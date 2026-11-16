"use client";

import React from "react";
import Image from "next/image";
import { IIM_ABOUT, iimImg } from "./constants";

export default function IimAbout() {
  return (
    <section id="about" className="w-full bg-[#f2f6fa] py-12 sm:py-16 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Content & Accreditations */}
          <div className="lg:col-span-7 flex flex-col items-center text-center">
            {/* Title */}
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-black text-[#17479E] tracking-tight leading-tight m-0 mb-4 sm:mb-5">
              {IIM_ABOUT.title}
            </h2>

            {/* Paragraph (Centered) */}
            <p className="text-neutral-800 text-[13px] sm:text-[14px] leading-[1.65] m-0 mb-8 font-normal text-center max-w-[660px]">
              {IIM_ABOUT.desc}
            </p>

            {/* Accreditations Box with Top Border Legend Title */}
            <div className="w-full relative border-[1.5px] border-[#17479E] rounded-[16px] pt-6 pb-5 px-3 sm:px-5 mt-2">
              {/* Overlapping Title on Top Border */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#f2f6fa] px-3 whitespace-nowrap">
                <span className="text-[14.5px] sm:text-[16.5px] font-bold text-[#17479E]">
                  Accreditations and Recognitions of IIM Kozhikode
                </span>
              </div>

              {/* 4 White Cards for Logos */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 items-center">
                {IIM_ABOUT.accreditations.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-[10px] p-2.5 sm:p-3 shadow-2xs flex items-center justify-center h-[52px] sm:h-[58px]"
                  >
                    <Image
                      src={iimImg(item.image)}
                      alt={item.name}
                      width={120}
                      height={45}
                      className="max-h-[38px] sm:max-h-[42px] w-auto object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Campus Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-gray-100 bg-white">
              <Image
                src={iimImg(IIM_ABOUT.campusImage)}
                alt="IIM Kozhikode Campus"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

