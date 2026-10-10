"use client";

import React from "react";
import Image from "next/image";

const DEFAULT_PEDAGOGY_CARDS = [
  {
    title: "Live Lectures",
    desc: "The university provides Interactive live sessions that create a real-time virtual classroom. It benefits the students pursuing LPU MBA online and LPU MCA online to interact with faculty, clear their doubts instantly, and collaborate with peers.",
    image: "/assets/all_universities_images/lpu/online-lecture.webp",
  },
  {
    title: "Recorded Videos",
    desc: "Learners get access to recorded lectures for flexible learning. This facility is ideal for working professionals pursuing LPU MBA Online or LPU BCA Online, as it enables them to revise anytime and anywhere.",
    image: "/assets/all_universities_images/lpu/exam-1.webp",
  },
  {
    title: "Assignments & Projects",
    desc: "The LMS of LPU online includes digital assignment submission and project work. Students from LPU online MCA and LPU MBA online tracks monitor progress and gain practical exposure throughout the course.",
    image: "/assets/all_universities_images/lpu/exam-1.webp",
  },
];

const DEFAULT_PLACEMENT_SERVICES = [
  {
    title: "Professional Enhancement Programme",
    desc: "The Placement Enhancement Programme (PEP) trains students in aptitude, soft skills, and interview preparation. It is beneficial for LPU MBA online and LPU online MCA learners.",
    image: "/assets/all_universities_images/lpu/p1.png",
  },
  {
    title: "Mock Interviews & Workshops",
    desc: "Mock interviews and industry-oriented online workshops are used to provide students of Lovely Professional University Online courses with communication skills, confidence, and real-life insights.",
    image: "/assets/all_universities_images/lpu/p1.png",
  },
];

export default function LpuWhyChoose({ whyChoose = [], brand = {} }) {
  const cards = whyChoose?.length ? whyChoose : DEFAULT_PEDAGOGY_CARDS;
  const primaryColor = brand?.primaryColor || "#f58220";
  const title = brand?.whyChooseTitle || `Learning Pedagogy at ${brand?.name || "LPU Online"}`;
  const description =
    brand?.whyChooseDescription ||
    "The learning model at Lovely Professional University Online (LPU Online) is tailored to offer flexibility and an engaging experience to all the students who are enrolled in programs such as LPU MBA Online, LPU MCA Online, and LPU Online BCA.";

  const placementTitle =
    brand?.placementTitle || `Placement Support Services at ${brand?.name || "LPU Online"}`;
  const placementDescription =
    brand?.placementDescription ||
    "Lovely Professional University online admission also offers structured placement support to prepare students and professionals for real-world careers and job sectors.";
  const placementServices =
    brand?.placementServices?.length ? brand.placementServices : DEFAULT_PLACEMENT_SERVICES;

  return (
    <>
      {/* 1. Learning Pedagogy Section (White Background) */}
      <section id="pedagogy" className="py-12 sm:py-16 md:py-20 bg-white select-none">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header (Left Aligned matching reference screenshot) */}
          <div className="text-left max-w-5xl">
            <h2 className="text-[26px] sm:text-3xl lg:text-[34px] font-bold text-slate-600 tracking-wide leading-tight m-0">
              {brand?.whyChooseTitle ? (
                brand.whyChooseTitle
              ) : (
                <>
                  Learning Pedagogy at <br className="sm:hidden" />
                  {brand?.name || "LPU Online"}
                </>
              )}
            </h2>
            <p className="text-[13px] sm:text-[14px] text-slate-700 mt-2.5 sm:mt-3 leading-relaxed font-normal m-0">
              {description}
            </p>
          </div>

          {/* 3 Pedagogy Cards with Floated Icon, Wrapped Text, and Bottom Orange Border */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 mt-8 sm:mt-10">
            {cards.map((card, idx) => {
              const imgSrc = card.image || DEFAULT_PEDAGOGY_CARDS[idx]?.image;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-none p-5 sm:p-6 border border-slate-200 border-b-2 border-b-[#f58220] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.13)] transition-all duration-300 text-left relative h-full overflow-hidden"
                  style={{
                    borderBottomColor: primaryColor || "#f58220",
                    borderBottomWidth: "2px",
                    borderBottomStyle: "solid",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <div className="flow-root">
                    <div className="float-left mr-3.5 mb-1.5 w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] relative">
                      <Image
                        src={imgSrc}
                        alt={card.title}
                        fill
                        className="object-contain"
                        sizes="56px"
                      />
                    </div>
                    <h3
                      className="text-base sm:text-[17px] font-bold m-0 pt-0.5 leading-snug text-[#f58220]"
                      style={{ color: primaryColor || "#f58220" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-slate-600 leading-relaxed font-normal mt-1.5 m-0">
                      {card.desc || card.description}
                    </p>
                  </div>
                  {/* Solid Orange Bottom Line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
                    style={{ backgroundColor: primaryColor || "#f58220" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Placement Support Services Section (Light Gray Background) */}
      <section id="placement-support" className="py-12 sm:py-16 md:py-20 bg-[#f8f9fa] select-none text-center">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto px-2">
            <h2 className="text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-slate-700 tracking-tight leading-tight m-0">
              {placementTitle}
            </h2>
            <p className="text-[13px] sm:text-[14px] text-slate-600 mt-2.5 sm:mt-3.5 leading-relaxed font-normal m-0 max-w-2xl mx-auto">
              {placementDescription}
            </p>
          </div>

          <div
            className={`grid grid-cols-1 ${
              placementServices.length <= 2
                ? "md:grid-cols-2 max-w-3xl sm:max-w-4xl"
                : "md:grid-cols-3 max-w-5xl"
            } gap-8 sm:gap-10 lg:gap-12 mt-10 sm:mt-12 mx-auto`}
          >
            {placementServices.map((item, idx) => {
              const iconSrc =
                item.image || item.icon || "/assets/all_universities_images/lpu/p1.png";
              return (
                <div key={idx} className="flex flex-col items-center text-center group px-3">
                  <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] mb-3.5 sm:mb-4 flex items-center justify-center shrink-0">
                    <Image
                      src={iconSrc}
                      alt={item.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                      sizes="80px"
                    />
                  </div>
                  <h3 className="text-[16px] sm:text-[17.5px] font-bold text-slate-900 m-0 tracking-tight leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[12.5px] sm:text-[13px] text-slate-600 leading-relaxed font-normal m-0 max-w-[340px]">
                    {item.desc || item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
