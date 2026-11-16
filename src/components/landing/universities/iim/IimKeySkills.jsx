"use client";

import React from "react";
import Image from "next/image";
import { IIM_KEY_SKILLS, iimImg } from "./constants";

export default function IimKeySkills() {
  return (
    <section className="w-full bg-white py-8 sm:py-12 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-black text-neutral-900 leading-tight m-0 mb-2.5">
            Key Skills You Will Gain from the{" "}
            <span className="text-[#17479E]">
              IIM Kozhikode HR Analytics Course
            </span>
          </h2>
          <p className="text-neutral-600 text-[13px] sm:text-[14px] leading-relaxed m-0 font-normal">
            The IIM Kozhikode HR Analytics Online Course equips learners with
            industry-relevant skills to manage people and processes through
            data-driven methods. The curriculum focuses on:
          </p>
        </div>

        {/* 6 Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {IIM_KEY_SKILLS.map((item, idx) => (
            <div
              key={idx}
              className="border-[1.5px] border-[#17479E] rounded-[10px] p-4 sm:p-5 bg-white flex items-start gap-4 transition-transform hover:-translate-y-0.5 duration-200"
            >
              {/* Icon */}
              <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                <Image
                  src={iimImg(item.icon)}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="w-11 sm:w-12 h-auto object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>

              {/* Title & Desc */}
              <div className="flex-1">
                <h3 className="text-[15px] sm:text-[16px] font-bold text-[#17479E] m-0 leading-snug">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-[12.5px] sm:text-[13px] leading-relaxed m-0 mt-1 font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

