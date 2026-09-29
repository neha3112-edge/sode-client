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

  const isGalgotias =
    brand.slug === "galgotias" ||
    brand.degreeLayout === "galgotias" ||
    brand.heroStyle === "galgotias";

  if (isGalgotias) {
    const title =
      degreeInfo.title || "What's More Than Just A College Degree?";
    const desc =
      degreeInfo.desc ||
      degreeInfo.subtitle ||
      "Galgotias Online degrees are highly esteemed due to their robust academic framework and alignment with industry needs. These programs are designed to meet current industry standards and equip students with practical, job-ready skills.";

    const points = degreeInfo.features || [
      {
        bold: "13+ Years of Excellence:",
        text: "Galgotias Online boasts over 13 years of educational excellence.",
      },
      {
        bold: "500+ Hiring Partners:",
        text: "With over 500 hiring partners, Galgotias Online ensures robust placement opportunities for its students.",
      },
      {
        bold: "50K+ Learners:",
        text: "Galgotias Online has a vast and diverse student community with over 50,000 learners.",
      },
      {
        bold: "50+ Programs and Specialisations:",
        text: "Offering more than 50 programs and specialisations, Galgotias Online caters to a wide range of academic and professional interests.",
      },
    ];

    const certificateImg =
      degreeInfo.image || "/assets/galgotias/galgotias_degree.webp";
    const btnText = degreeInfo.buttonText || "Get Degree";

    const defaultWhyChooseRows = [
      {
        feature: "Reputation of Excellence",
        details:
          "Galgotias University is renowned for its esteemed academic excellence and holds the highest NAAC score (3.37/4) among private universities in Uttar Pradesh.",
      },
      {
        feature: "Affordable Fee Structure",
        details:
          "Galgotias Online provides affordable programs, ensuring accessibility to quality education for all aspiring learners.",
      },
      {
        feature: "Flexible Learning Options",
        details:
          "Galgotias Online offers flexible learning with live and recorded classes, accommodating students' diverse schedules for personalised education.",
      },
      {
        feature: "Updated Industry-Focused Curriculum",
        details:
          "The university ensures its courses are designed and regularly updated by industry experts, guaranteeing you will receive current and pertinent knowledge.",
      },
      {
        feature: "Recognised Degrees",
        details:
          "You will earn a degree accredited by UGC and recognised by government bodies, private organisations, and higher education institutions in India and worldwide.",
      },
      {
        feature: "Placement Assistance",
        details:
          "At Galgotias University, students can access dedicated placement assistance, which features resume-building workshops, career guidance sessions, and placement drives to enhance their career prospects.",
      },
    ];

    const whyChooseTableData =
      degreeInfo.whyChooseTable || brand.whyChooseTable || {};
    const whyChooseTitle =
      whyChooseTableData.title ||
      "Why Should You Choose Galgotias Online in 2026?";
    const whyChooseRows = whyChooseTableData.rows || defaultWhyChooseRows;

    return (
      <section id="Degreeinfo" className="py-10 sm:py-16 bg-white select-none">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Heading, Description, 4 Checklist Points, Button */}
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
                    <svg
                      className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#22c55e] shrink-0 mt-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <p className="text-[13.5px] sm:text-[14px] text-slate-800 leading-relaxed font-normal m-0">
                      <strong className="font-bold text-slate-900">
                        {item.bold || item.title}
                      </strong>{" "}
                      {item.text || item.desc}
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

            {/* Right Column: Sample Degree Certificate */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[1/1.3] rounded-[8px] overflow-hidden shadow-md border border-slate-200 bg-white">
                <Image
                  src={certificateImg}
                  alt="Galgotias Sample Degree Certificate"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 340px, 380px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Table: Why Should You Choose Galgotias Online in 2026? */}
          <div className="mt-14 sm:mt-20 pt-2 border-t border-slate-100/80">
            <h2 className="text-2xl sm:text-3xl lg:text-[28px] font-extrabold text-[#002b49] tracking-tight leading-tight m-0 mb-6 sm:mb-8 text-left">
              {whyChooseTitle}
            </h2>

            <div className="overflow-x-auto border border-[#cfe2f3] rounded-[6px] sm:rounded-[8px] shadow-xs">
              <table className="w-full border-collapse text-left min-w-[620px]">
                <thead>
                  <tr className="bg-[#e1f0fa] border-b border-[#cfe2f3]">
                    <th className="py-3.5 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900 w-[28%] sm:w-[25%] border-r border-[#cfe2f3]">
                      Feature
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cfe2f3] bg-white">
                  {whyChooseRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#f8fbfe] transition-colors"
                    >
                      <td className="py-3.5 px-4 sm:px-6 align-top font-bold text-slate-900 text-[13.5px] sm:text-[14.5px] border-r border-[#cfe2f3]">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 align-top text-slate-800 text-[13px] sm:text-[14px] font-normal leading-relaxed">
                        {row.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
