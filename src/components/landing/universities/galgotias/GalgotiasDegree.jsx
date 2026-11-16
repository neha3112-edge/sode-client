"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { galgotiasImg } from "./constants";

export default function GalgotiasDegree({ onOpenApply }) {
  const points = [
    "NAAC A+ Accredited Degree",
    "Globally Recognised",
    "Flexible Online Learning Mode",
  ];

  return (
    <section id="degree" className="py-12 sm:py-16 bg-white select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text & CTA */}
          <div className="lg:col-span-6 text-left">
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-bold text-[#002266] m-0 mb-4 leading-tight">
              About the Sample Degree of <br />
              Galgotias Online
            </h2>
            <p className="text-[13.5px] sm:text-[14.5px] text-[#444444] leading-[1.65] m-0 mb-6 font-normal">
              After completing their Galgotias University online courses, students receive a UGC recognised degree issued by Galgotias University Online. The degree holds academic credibility and relevance worldwide. It also reflects the specialisation pursued during the program.
            </p>

            {/* 3 Green Checks */}
            <div className="space-y-3 mb-8">
              {points.map((pt, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#22c55e] shrink-0" />
                  <span className="text-[14px] sm:text-[15px] font-semibold text-[#222222]">
                    {pt}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onOpenApply?.("Galgotias Degree Get Degree")}
              className="inline-flex items-center justify-center bg-[#f9bc08] hover:bg-[#e5ac07] text-[#111111] font-bold text-[14px] sm:text-[15px] px-8 py-2.5 rounded-[8px] border-none cursor-pointer shadow-xs transition-all active:scale-95"
            >
              Get Degree
            </button>
          </div>

          {/* Right Degree & Student Graphic */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[540px] rounded-[16px] overflow-hidden shadow-sm">
              <Image
                src={galgotiasImg("sample-galgotia.webp")}
                alt="Galgotias University Online Sample Degree"
                width={560}
                height={380}
                className="w-full h-auto object-contain block"
                sizes="(max-width: 1024px) 100vw, 540px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

