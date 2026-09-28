"use client";

import React from "react";
import Image from "next/image";
import LandingContainer from "./LandingContainer";

export default function LandingDegree({
  degreeInfo = {},
  brand = {},
  onOpenApply,
}) {
  if (!degreeInfo || Object.keys(degreeInfo).length === 0) return null;

  const {
    title = "Globally Accepted\nOnline Vivekananda Global University\nDegree",
    features = [],
    buttonText = "Get Your Degree",
    image = "/assets/vgu/sample-degree-vgu.webp",
  } = degreeInfo;

  return (
    <section id="degree" className="py-12 sm:py-16 bg-[#f4f7fb]">
      <LandingContainer>
        <div className="bg-white rounded-[20px] sm:rounded-[24px] shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-slate-100 p-6 sm:p-10 lg:p-12 max-w-[1140px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, 4 Features with Green Ticks, and Button */}
            <div className="lg:col-span-7 text-left">
              <h2 className="text-[22px] sm:text-[26px] lg:text-[29px] font-bold text-[#811811] leading-tight tracking-tight whitespace-pre-line m-0 mb-6">
                {title}
              </h2>

              <div className="space-y-4 sm:space-y-5">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 sm:gap-3.5">
                    <div className="relative w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5">
                      <Image
                        src={feat.icon || "/assets/vgu/green-tick-icon.webp"}
                        alt="Tick"
                        fill
                        className="object-contain"
                        sizes="24px"
                      />
                    </div>
                    <div>
                      <h4 className="text-[14.5px] sm:text-[15.5px] font-bold text-slate-900 leading-tight m-0 mb-1">
                        {feat.title}
                      </h4>
                      <p className="text-[12px] sm:text-[12.5px] text-slate-600 leading-relaxed font-normal m-0">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className="inline-flex items-center justify-center bg-[#ffc107] hover:bg-[#e0a800] text-slate-950 font-bold text-[14px] px-7 py-2.5 rounded-[6px] shadow-xs active:scale-95 transition-all cursor-pointer border-none"
                >
                  <span>{buttonText}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Sample Degree Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[1/1.25] rounded-[10px] overflow-hidden shadow-md border border-slate-200 bg-white">
                <Image
                  src={image}
                  alt="Sample Degree"
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 1024px) 280px, 320px"
                />
              </div>
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
