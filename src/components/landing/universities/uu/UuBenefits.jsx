"use client";

import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { Container } from "@/components/common/Container";
import { uuImg, UU_BENEFITS } from "./constants";

export default function UuBenefits({ onOpenApply }) {
  return (
    <section id="advantage" className="w-full py-12 sm:py-16 bg-[#003399] text-white select-none">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Student Image - Free natural height & width */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <Image
              src={uuImg("image-2nd.webp")}
              alt="Uttaranchal University Benefits"
              width={503}
              height={600}
              priority
              className="w-full h-auto max-w-[503px] object-contain"
              sizes="(max-width: 1024px) 100vw, 503px"
            />
          </div>

          {/* Right Column: Title, Paragraph & 6 Benefits */}
          <div className="lg:col-span-7">
            <h2 className="text-white font-bold text-2xl sm:text-3xl md:text-[34px] leading-tight m-0 mb-3">
              Uttaranchal University Benefits in the{" "}
              <span className="text-[#62B239]">Online Degree Programs</span>
            </h2>

            <p className="text-white/90 text-xs sm:text-[13.5px] md:text-sm leading-relaxed mb-6">
              Uttaranchal University Online courses are UGC-Entitled offers the convenience &amp; flexibility of online
              education with the equivalency of a conventional, on-campus degree. Through Uttaranchal University Online,
              leading international faculty, it offer world-class education in a true sense.
            </p>

            {/* 6 Benefits Grid (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-7">
              {UU_BENEFITS.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/15 px-3.5 py-2.5 rounded-lg transition-colors border border-white/10"
                >
                  <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
                    <Image
                      src={benefit.icon}
                      alt={benefit.title}
                      width={22}
                      height={22}
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-white">
                    {benefit.title}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => onOpenApply?.("Benefits Apply Now")}
              className="inline-flex items-center gap-2 bg-[#62B239] hover:bg-[#529e2f] text-white font-bold text-sm sm:text-base py-2.5 px-6 rounded-md shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border-none"
            >
              <span>Apply Now</span>
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

