"use client";

import React from "react";
import Image from "next/image";
import { edgewoodImg, EDGEWOOD_ACCREDITATIONS_DATA } from "./constants";

export default function EdgewoodAccreditations() {
  return (
    <section
      id="accreditations"
      className="w-full bg-[#fbfbfb] py-12 sm:py-16 px-4 sm:px-6 select-none scroll-mt-20"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[#b2171e] font-bold text-[13px] sm:text-[14px] uppercase tracking-wider block mb-1">
            ACCREDITATION OF
          </span>
          <h2 className="text-[#111111] font-extrabold text-[24px] sm:text-[30px] md:text-[34px] leading-tight m-0">
            Edgewood University Online
          </h2>
        </div>

        {/* 3 Accreditation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {EDGEWOOD_ACCREDITATIONS_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[20px] p-6 sm:p-7 shadow-xs border border-neutral-100 flex flex-col items-center text-center transition-transform duration-200 hover:-translate-y-1"
            >
              {/* Direct Logo Image - Free natural size, NO artificial border or wrapper */}
              <div className="w-full flex items-center justify-center mb-5 min-h-[70px]">
                <Image
                  src={edgewoodImg(item.image)}
                  alt={item.title}
                  width={item.imageWidth}
                  height={item.imageHeight}
                  className="max-h-[68px] sm:max-h-[76px] w-auto object-contain block"
                  style={{ maxHeight: "76px", width: "auto" }}
                />
              </div>

              {/* Title */}
              <h3 className="text-[#111111] font-bold text-[18px] sm:text-[19px] m-0 mb-2.5">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-600 text-[12.5px] sm:text-[13.5px] leading-relaxed m-0">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
