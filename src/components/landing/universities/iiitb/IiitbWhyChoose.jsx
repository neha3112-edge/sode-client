"use client";

import React from "react";
import Image from "next/image";
import { IIITB_WHY_CHOOSE, iiitbImg } from "./constants";

export default function IiitbWhyChoose() {
  return (
    <section id="why_choose" className="w-full bg-white select-none">
      {/* Section Header */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
        <h2 className="text-[26px] sm:text-[32px] md:text-[38px] font-black text-neutral-900 m-0 leading-tight">
          WHY CHOOSE?
        </h2>
        <p className="text-[14.5px] sm:text-[16px] text-neutral-600 font-semibold m-0 mt-1.5">
          IIIT Bangalore Online Courses
        </p>
      </div>

      {/* 6 Grid Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {IIITB_WHY_CHOOSE.map((item) => {
          const bgClass = item.isBlue ? "bg-[#1f9acb]" : "bg-[#1b355e]";

          return (
            <div
              key={item.id}
              className={`${bgClass} text-white px-6 sm:px-8 py-10 sm:py-12 flex flex-col items-center text-center`}
            >
              {/* Icon */}
              <div className="mb-4 w-16 h-16 flex items-center justify-center">
                <Image
                  src={iiitbImg(item.image)}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="w-12 sm:w-14 h-auto object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>

              {/* Title */}
              <h3 className="text-[17px] sm:text-[18px] font-bold text-white m-0 mb-3 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-white/95 text-[13px] sm:text-[13.5px] leading-relaxed m-0 font-normal max-w-[360px]">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

