"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { amityImg } from "./constants";

const WHY_CHOOSE_ITEMS = [
  {
    title: "International Recognition",
    description:
      "Amity Online is India's only university accredited by WASC (USA). Its degrees are WES-recognized in the USA and Canada, enabling global education.",
  },
  {
    title: "QS Ranked Online MBA",
    description:
      "Amity offers India's only Online MBA ranked in the Asia Pacific Top 10 by QS, ensuring strong global recognition.",
  },
  {
    title: "Industry-Ready Certifications",
    description:
      "Amity University Online includes top in-demand industry certificates and programs. Amity online programs from Amity University enhance students' skills and knowledge.",
  },
  {
    title: "AI-Powered Career Discovery Platform",
    description:
      "Amity University online curriculum helps in building a strong resume for market-standard with AI-Powered Career Discovery Platform access to mock interviews, tools related to resumes, and jobs.",
  },
];

export default function AmityWhyChoose({ onOpenApply }) {
  return (
    <section
      id="advantage"
      className="w-full bg-white pt-8 sm:pt-12 pb-4 sm:pb-6 scroll-mt-16 sm:scroll-mt-20 relative"
    >
      <span id="whychoose" className="sr-only" aria-hidden="true" />
      <Container>
        {/* Section Heading */}
        <h2 className="text-[#1e293b] font-bold text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-[1.2] text-center md:text-left tracking-tight mb-8 md:mb-10">
          Why Choose Amity University Online for Degree Courses
        </h2>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: 4 Feature Blocks + Apply Button */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-10 gap-y-7 sm:gap-y-8 mb-6 sm:mb-8">
              {WHY_CHOOSE_ITEMS.map((item) => (
                <div key={item.title} className="text-left">
                  <h3 className="text-[#084183] font-semibold text-[16px] sm:text-[17px] leading-snug mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[#333333] text-[13px] sm:text-[13.5px] leading-[1.38] m-0">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Desktop Apply Now Button */}
            <div className="hidden lg:block text-left">
              <button
                type="button"
                onClick={onOpenApply}
                className="bg-[#ffca05] hover:bg-[#eab308] text-[#08417b] font-bold text-[13.5px] sm:text-[14px] px-6 py-2 rounded-[5px] transition-colors duration-200 cursor-pointer select-none inline-flex items-center gap-2 border-none shadow-none"
              >
                <span>Apply Now</span>
                <svg
                  className="w-3 h-3 fill-current shrink-0"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                >
                  <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Student Illustration Image */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-full">
              <Image
                src={amityImg("Why-choose-amity.png")}
                alt="Why Choose Amity University Online"
                width={420}
                height={380}
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="w-full h-auto object-contain mx-auto"
              />
            </div>

            {/* Mobile Apply Now Button */}
            <div className="block lg:hidden mt-4 text-center">
              <button
                type="button"
                onClick={onOpenApply}
                className="bg-[#ffca05] hover:bg-[#eab308] text-[#08417b] font-bold text-[13.5px] px-6 py-2.5 rounded-[5px] transition-colors duration-200 cursor-pointer select-none inline-flex items-center gap-2 border-none shadow-none mx-auto"
              >
                <span>Apply Now</span>
                <svg
                  className="w-3.5 h-3.5 fill-current shrink-0"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                >
                  <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

