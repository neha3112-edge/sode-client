"use client";

import React from "react";
import Image from "next/image";
import LandingContainer from "./LandingContainer";

/**
 * Clean, Modular & Reusable Degree Section
 * Supports:
 * - Galgotias Degree & "Why Should You Choose..." Table (galgotias)
 * - LPU Degree & 2x2 Feature Cards (lpu)
 * - VGU & Default Degree Box with Green Ticks
 */
export default function LandingDegree({
  degreeInfo = {},
  brand = {},
  onOpenApply,
}) {
  if (!degreeInfo || Object.keys(degreeInfo).length === 0) return null;

  const isGalgotias =
    brand.slug === "galgotias" ||
    brand.degreeLayout === "galgotias" ||
    brand.heroStyle === "galgotias";

  if (isGalgotias) return <GalgotiasDegree degreeInfo={degreeInfo} brand={brand} onOpenApply={onOpenApply} />;
  if (brand.slug === "lpu") return <LpuDegree degreeInfo={degreeInfo} onOpenApply={onOpenApply} />;
  return <DefaultDegree degreeInfo={degreeInfo} brand={brand} onOpenApply={onOpenApply} />;
}

// -------------------------------------------------------------
// Layout: Galgotias Degree & Table
// -------------------------------------------------------------
function GalgotiasDegree({ degreeInfo, brand, onOpenApply }) {
  const title = degreeInfo.title || "What's More Than Just A College Degree?";
  const desc =
    degreeInfo.desc ||
    degreeInfo.subtitle ||
    "Galgotias Online degrees are highly esteemed due to their robust academic framework and alignment with industry needs.";

  const points = degreeInfo.features || [];
  const certificateImg = degreeInfo.image || "/assets/galgotias/galgotias_degree.webp";
  const btnText = degreeInfo.buttonText || "Get Degree";

  const whyChooseTableData = degreeInfo.whyChooseTable || brand.whyChooseTable || {};
  const whyChooseTitle = whyChooseTableData.title || "Why Should You Choose Galgotias Online in 2026?";
  const whyChooseRows = whyChooseTableData.rows || [];

  return (
    <section id="Degreeinfo" className="py-10 sm:py-16 bg-white select-none">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-7 text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#002b49] tracking-tight leading-tight m-0">
              {title}
            </h2>
            <p className="text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-normal mt-3 mb-6 max-w-xl">
              {desc}
            </p>

            <div className="space-y-3.5 sm:space-y-4 mb-7 sm:mb-8">
              {points.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#22c55e] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p className="text-[13.5px] sm:text-[14px] text-slate-800 leading-relaxed font-normal m-0">
                    <strong className="font-bold text-slate-900">{item.bold || item.title}</strong> {item.text || item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="bg-[#005bb8] hover:bg-[#004a96] active:scale-95 text-white font-bold text-[14px] sm:text-[15px] px-7 py-3 rounded-full inline-flex items-center gap-2 shadow-xs cursor-pointer border-none transition-all"
              >
                <span>{btnText}</span>
                <span className="text-lg leading-none">&rarr;</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[1/1.3] rounded-[8px] overflow-hidden shadow-md border border-slate-200 bg-white">
              <Image src={certificateImg} alt="Galgotias Sample Degree Certificate" fill className="object-contain" sizes="(max-width: 1024px) 340px, 380px" priority />
            </div>
          </div>
        </div>

        {whyChooseRows.length > 0 && (
          <div className="mt-14 sm:mt-20 pt-2 border-t border-slate-100/80">
            <h2 className="text-2xl sm:text-3xl lg:text-[28px] font-extrabold text-[#002b49] tracking-tight leading-tight m-0 mb-6 sm:mb-8 text-left">
              {whyChooseTitle}
            </h2>

            <div className="overflow-x-auto border border-[#cfe2f3] rounded-[6px] sm:rounded-[8px] shadow-xs">
              <table className="w-full border-collapse text-left min-w-[620px]">
                <thead>
                  <tr className="bg-[#e1f0fa] border-b border-[#cfe2f3]">
                    <th className="py-3.5 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900 w-[28%] sm:w-[25%] border-r border-[#cfe2f3]">Feature</th>
                    <th className="py-3.5 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cfe2f3] bg-white">
                  {whyChooseRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#f8fbfe] transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 align-top font-bold text-slate-900 text-[13.5px] sm:text-[14.5px] border-r border-[#cfe2f3]">{row.feature}</td>
                      <td className="py-3.5 px-4 sm:px-6 align-top text-slate-800 text-[13px] sm:text-[14px] font-normal leading-relaxed">{row.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Layout: LPU Degree & Feature Cards
// -------------------------------------------------------------
function LpuDegree({ degreeInfo, onOpenApply }) {
  return (
    <section id="Degreeinfo" className="bg-[#fff8f2] py-12 sm:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
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
              {(degreeInfo.features || []).map((item, idx) => (
                <div key={idx} className="border-2 border-[#f58220] bg-white p-4 sm:p-4.5 rounded-[6px] space-y-1.5">
                  <h4 className="text-sm sm:text-[15px] font-extrabold text-slate-900 m-0">{item.title}</h4>
                  <p className="text-[11.5px] sm:text-[12px] text-slate-600 leading-relaxed m-0 font-normal">{item.desc}</p>
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

// -------------------------------------------------------------
// Layout: Default VGU Box Degree
// -------------------------------------------------------------
function DefaultDegree({ degreeInfo = {}, brand = {}, onOpenApply }) {
  const {
    title = "Globally Accepted\nOnline Vivekananda Global University\nDegree",
    features = [],
    buttonText = "Get Your Degree",
    image = "/assets/vgu/sample-degree-vgu.webp",
  } = degreeInfo;

  const cardBg = degreeInfo.cardBackground || degreeInfo.cardBg || "#f2f5fa";
  const buttonBg = degreeInfo.buttonBg || degreeInfo.buttonBackground || "#fec810";
  const buttonTextColor = degreeInfo.buttonTextColor || "#000000";
  const sectionPadding = degreeInfo.sectionPadding || "py-6 sm:py-8";
  const cardPadding = degreeInfo.cardPadding || "p-5 sm:p-7 lg:p-8";

  return (
    <section id="Degreeinfo" className={`${sectionPadding} select-none bg-white`}>
      <LandingContainer>
        <div
          className={`relative rounded-[18px] sm:rounded-[22px] overflow-hidden ${cardPadding} max-w-[1180px] mx-auto shadow-xs border border-slate-100`}
          style={{ backgroundColor: cardBg }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-left z-10">
              <h2 className="text-[22px] sm:text-[25px] lg:text-[28px] font-bold text-[#811811] leading-tight tracking-tight whitespace-pre-line m-0 mb-4">
                {title}
              </h2>

              <div className="space-y-3 sm:space-y-3.5">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 sm:gap-3.5">
                    <div className="relative w-6 h-6 sm:w-6.5 sm:h-6.5 shrink-0 mt-0.5">
                      <Image
                        src={feat.icon || "/assets/vgu/green-tick-icon.webp"}
                        alt="Tick"
                        fill
                        className="object-contain"
                        sizes="26px"
                      />
                    </div>
                    <div>
                      <h4 className="text-[14px] sm:text-[15px] font-bold text-slate-900 leading-tight m-0 mb-0.5">
                        {feat.title}
                      </h4>
                      <p className="text-[11.5px] sm:text-[12px] text-slate-600 leading-relaxed font-normal m-0">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 sm:pt-5">
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  style={{
                    backgroundColor: buttonBg,
                    color: buttonTextColor,
                  }}
                  className="inline-flex items-center justify-center font-bold text-[13.5px] sm:text-[14px] px-7 py-2 rounded-[6px] shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer border-none"
                >
                  <span>{buttonText}</span>
                </button>
              </div>
            </div>

            {/* Right Certificate Graphic with soft circular aura */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <div className="absolute w-[260px] h-[260px] sm:w-[310px] sm:h-[310px] rounded-full bg-white/70 pointer-events-none" />

              <div className="relative z-10 w-full max-w-[270px] sm:max-w-[310px] aspect-[1/1.28] drop-shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
                <Image
                  src={image}
                  alt="Sample Degree"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 270px, 310px"
                />
              </div>
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}

