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

  const isLpu = brand.slug === "lpu";

  if (isLpu) {
    return (
      <section id="Degreeinfo" className="bg-[#fff8f2] py-12 sm:py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Sample Certificate */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[360px] aspect-[1/1.3] rounded-[8px] overflow-hidden shadow-md border border-slate-200 bg-white p-2.5">
                <Image
                  src={degreeInfo.image || "/assets/lpu/sample-certificate-lpu.webp"}
                  alt="LPU Sample Degree Certificate"
                  fill
                  className="object-contain p-1.5"
                  sizes="380px"
                />
              </div>
            </div>

            {/* Right Column: Title & 2x2 Feature Cards */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#f58220] tracking-tight leading-tight m-0">
                  {degreeInfo.title || "Get UGC Entitled Online Degree"}
                </h2>
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-slate-950 mt-1 m-0 tracking-tight leading-tight">
                  {degreeInfo.subtitle || "Which Enhance Your Career"}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 mt-2.5 leading-relaxed m-0 font-normal">
                  {degreeInfo.desc || "Lovely Professional University Online (LPU Online) is one of the most trusted and credible institutions in India that offers flexible and affordable education in digital mode."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {(degreeInfo.features || features).map((item, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-[#f58220] bg-white p-4 sm:p-4.5 rounded-[6px] space-y-1.5"
                  >
                    <h4 className="text-sm sm:text-[15px] font-extrabold text-slate-900 m-0">
                      {item.title}
                    </h4>
                    <p className="text-[11.5px] sm:text-[12px] text-slate-600 leading-relaxed m-0 font-normal">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className="bg-black hover:bg-slate-900 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-[4px] shadow-sm transition-colors cursor-pointer border-none"
                >
                  Get FREE Career Assistance
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="Degreeinfo" className="py-12 sm:py-16">
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
                  className="inline-flex items-center justify-center bg-[#811811] hover:bg-[#6b130e] text-white font-bold text-[14px] px-7 py-2.5 rounded-[6px] shadow-xs active:scale-95 transition-all cursor-pointer border-none"
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
