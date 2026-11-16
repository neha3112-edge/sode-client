"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { edgewoodImg, EDGEWOOD_CERTIFICATION_DATA } from "./constants";

export default function EdgewoodCertification({ onOpenApply }) {
  return (
    <section
      id="certification"
      className="w-full bg-[#fbfbfb] py-12 sm:py-16 px-4 sm:px-6 select-none scroll-mt-20"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-[#111111] font-black text-[26px] sm:text-[32px] md:text-[36px] leading-tight m-0">
            {EDGEWOOD_CERTIFICATION_DATA.title} <br />
            <span className="text-[#b2171e] text-[20px] sm:text-[24px] md:text-[28px] font-bold">
              {EDGEWOOD_CERTIFICATION_DATA.subtitle}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Certificate Image - Direct image, NO artificial background or border */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[560px] rounded-[14px] overflow-hidden shadow-xl">
              <Image
                src={edgewoodImg(EDGEWOOD_CERTIFICATION_DATA.image)}
                alt="Edgewood University Sample Certificate"
                width={EDGEWOOD_CERTIFICATION_DATA.imageWidth}
                height={EDGEWOOD_CERTIFICATION_DATA.imageHeight}
                sizes="(max-width: 1024px) 100vw, 560px"
                className="w-full h-auto block"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>

          {/* Right: Text & Points */}
          <div className="lg:col-span-6 text-left">
            <p className="text-neutral-700 text-[13.5px] sm:text-[14.5px] leading-relaxed m-0 mb-5">
              {EDGEWOOD_CERTIFICATION_DATA.description}
            </p>

            {/* Feature Points */}
            <div className="space-y-2.5 mb-6 text-[13.5px] sm:text-[14.5px] text-neutral-800 font-medium">
              {EDGEWOOD_CERTIFICATION_DATA.points.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#b2171e] font-bold text-[16px] shrink-0">✓</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div>
              <button
                type="button"
                onClick={() => onOpenApply?.("Certification Section", "Get Degree")}
                className="inline-flex items-center gap-2 bg-[#b2171e] hover:bg-[#991319] text-white font-bold text-[14px] sm:text-[15px] px-7 py-3 rounded-full cursor-pointer border-none shadow-md transition-all active:scale-95"
              >
                <span>{EDGEWOOD_CERTIFICATION_DATA.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

