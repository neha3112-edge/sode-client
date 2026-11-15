"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { VGU_WHY_CHOOSE } from "./constants";

export default function VguWhyChoose() {
  return (
    <section
      id="whychoose"
      className="w-full bg-white py-12 sm:py-16 scroll-mt-16 sm:scroll-mt-20 select-none text-center"
    >
      <Container>
        {/* Banner Pill Title */}
        <div className="flex justify-center mb-3">
          <div className="bg-[#811811] text-white font-bold text-base sm:text-lg md:text-xl py-2 px-6 sm:px-8 rounded-lg shadow-xs inline-block">
            Why Vivekananda Global University Online is a Smart Choice for learners?
          </div>
        </div>

        {/* Subtitle */}
        <p className="max-w-4xl mx-auto text-gray-600 text-xs sm:text-[13.5px] leading-snug m-0 mb-10 font-normal">
          Vivekananda Global University Online is the most trusted university by students because of
          its recognised approvals and job-ready curriculum. VGU University courses are offered
          online with expert faculty, helpful resources like LMS that help students get strong
          knowledge and necessary skills, and a smooth Vivekananda Global University course
          admissions process.
        </p>

        {/* 6 Features Grid: 3 columns on lg, 2 on sm, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {VGU_WHY_CHOOSE.map((item, index) => (
            <div
              key={index}
              className="p-4 flex flex-col items-center text-center transition-all hover:-translate-y-1"
            >
              {/* Pure Icon Image - No artificial background or border */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3 shrink-0">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-gray-900 font-bold text-sm sm:text-base leading-snug m-0 mb-1.5">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-xs sm:text-[12.5px] leading-snug m-0 font-normal max-w-[280px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

