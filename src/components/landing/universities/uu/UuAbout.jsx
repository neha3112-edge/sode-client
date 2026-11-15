"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { uuImg } from "./constants";

export default function UuAbout({ onOpenApply }) {
  return (
    <section id="about" className="w-full py-12 sm:py-16 bg-white select-none">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            <span className="text-[#62B239] font-bold text-sm sm:text-base tracking-wider uppercase block mb-1">
              About
            </span>
            <h2 className="text-[#003399] font-bold text-2xl sm:text-3xl md:text-[34px] leading-tight m-0 mb-4">
              Uttaranchal University Online
            </h2>

            <p className="text-gray-600 text-xs sm:text-[13.5px] md:text-sm leading-relaxed mb-6">
              In line with the Uttaranchal University Act, 2012, Uttaranchal University Online opened its doors in 2013.
              Uttaranchal University Online was the first university in the Dehradun state of Uttarakhand to be awarded an
              A+ by the UGC and NAAC. Online UU offers its courses in online and distance modes. Online UU offers its
              online courses in undergraduate and postgraduate programs like BA, BCA, BBA, MCA, and MBA with high-quality
              education meeting the market demands.
            </p>

            <button
              type="button"
              onClick={() => onOpenApply?.("About Apply Now")}
              className="inline-flex items-center justify-center font-semibold text-xs sm:text-sm py-2 px-6 rounded-md border border-gray-800 text-gray-800 hover:bg-[#62B239] hover:border-[#62B239] hover:text-white transition-all cursor-pointer bg-white"
            >
              Apply Now
            </button>
          </div>

          {/* Right Column: Campus Photo - Free natural height & width */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <Image
              src={uuImg("about-Uttaranchal.webp")}
              alt="Uttaranchal University Campus"
              width={1693}
              height={1100}
              className="w-full h-auto object-contain rounded-lg"
              style={{ width: "100%", height: "auto" }}
              sizes="(max-width: 1024px) 100vw, 520px"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

