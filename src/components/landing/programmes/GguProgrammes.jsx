"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";

export default function GguProgrammes({
  programmes = [],
  brand = {},
  universityName = "Golden Gate University",
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const [activeTab, setActiveTab] = useState("dba");
  const specCarouselRef = useRef(null);

  // 1. Primary Programs (MBA and DBA)
  const mbaProgram =
    programmes.find(
      (p) =>
        p.id === "mba" ||
        p.code?.toUpperCase() === "MBA" ||
        p.title?.toLowerCase().includes("master of business")
    ) || programmes[0];

  const dbaProgram =
    programmes.find(
      (p) =>
        p.id === "dba" ||
        p.code?.toUpperCase() === "DBA" ||
        p.title?.toLowerCase().includes("doctor of business")
    ) || programmes[1];

  const mainCards = [
    {
      id: "mba",
      code: "MBA",
      badge: "MASTER",
      title: mbaProgram?.title || "Master of Business Administration (MBA)",
      image: mbaProgram?.image || "/assets/ggu/master-mba-ggu.webp",
      description:
        mbaProgram?.description ||
        "A US-approved or practice-driven program that offers both from Golden Gate University MBA online. The course builds strong leadership skills, strategic thinking, and data-informed decision-making skills.",
      details: mbaProgram?.details || [
        { label: "Duration", value: "20 months (online + optional on-campus pathway)" },
        { label: "Eligibility", value: "Master's or Bachelor's Degree with 5+ years of experience." },
      ],
    },
    {
      id: "dba",
      code: "DBA",
      badge: "DOCTORATE",
      title: dbaProgram?.title || "Doctor of Business Administration (DBA)",
      image: dbaProgram?.image || "/assets/ggu/doctorate-dba-ggu.webp",
      description:
        dbaProgram?.description ||
        "A degree that is flexible and recognised, the online DBA at Golden Gate University is an advanced doctoral program that is for senior-level leaders, consultants, and academics.",
      details: dbaProgram?.details || [
        { label: "Duration & Credits", value: "36 months | 56 credits" },
        { label: "Eligibility", value: "Recognised degree in Bachelor’s University" },
      ],
    },
  ];

  // 2. Specializations for Tabs Section
  const dbaSpecializations = programmes.filter(
    (p) =>
      p.id !== "mba" &&
      p.id !== "dba" &&
      (p.category === "Doctorate" ||
        p.level?.toLowerCase().includes("doc") ||
        p.id?.startsWith("dba-") ||
        p.code?.toUpperCase().includes("DBA") ||
        p.title?.toLowerCase().includes("dba"))
  );

  const mbaSpecializations = programmes.filter(
    (p) =>
      p.id !== "mba" &&
      p.id !== "dba" &&
      (p.category === "Master" ||
        p.level?.toLowerCase().includes("post") ||
        p.id?.startsWith("mba-") ||
        p.code?.toUpperCase().includes("MBA") ||
        p.title?.toLowerCase().includes("mba"))
  );

  const activeSpecs = activeTab === "dba" ? dbaSpecializations : mbaSpecializations;

  const handlePrevSpec = () => {
    specCarouselRef.current?.prev();
  };

  const handleNextSpec = () => {
    specCarouselRef.current?.next();
  };

  return (
    <div className="w-full">
      {/* ── 1. COURSES OFFERED Section ── */}
      <section
        id="main-courses"
        className="courses-section w-full py-12 sm:py-16 md:py-20 select-none scroll-mt-24"
        style={{ backgroundColor: brand.programmesBg || "#e6e6e6" }}
      >
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-[#DC520A] text-[26px] sm:text-[30px] md:text-[32px] font-bold uppercase tracking-wide m-0 leading-tight">
              {brand.programmesTitle || "COURSES OFFERED"}
            </h2>
            <p className="text-[#222222] text-[15px] sm:text-[17px] font-bold mt-2 m-0">
              {brand.programmesSubtitle || "By Golden Gate University"}
            </p>
          </div>

          <div className="course-container grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 justify-center items-stretch max-w-[1040px] mx-auto">
            {mainCards.map((card) => (
              <div
                key={card.id}
                className="course-card bg-white rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.14)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="card-image relative w-full h-[200px] sm:h-[225px] overflow-hidden bg-slate-100">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 520px"
                    />
                    <div className="absolute bottom-0 right-0 bg-[#DC520A] text-white text-[12px] sm:text-[13px] font-bold px-4 sm:px-5 py-1.5 rounded-tl-[10px] tracking-wider uppercase shadow-xs z-10 select-none">
                      {card.badge}
                    </div>
                  </div>

                  <div className="card-content p-6 sm:p-7 md:p-8 pb-4">
                    <h3 className="text-[19px] sm:text-[21px] font-bold text-[#111111] leading-snug m-0 mb-3 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="description text-[13px] sm:text-[14px] text-[#444444] font-semibold leading-[1.65] m-0 mb-5">
                      {card.description}
                    </p>

                    <div className="details space-y-1.5 mb-2 text-[14px] sm:text-[15px]">
                      {card.details?.map((item, idx) => (
                        <p key={idx} className="m-0 leading-relaxed text-[#333333] font-semibold">
                          <strong className="font-bold text-[#111111]">{item.label}:</strong> {item.value}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card-actions p-6 sm:p-7 md:p-8 pt-0 grid grid-cols-2 gap-3 sm:gap-4 mt-auto">
                  <button
                    type="button"
                    onClick={() => onSelectCourseForBrochure?.(card.code || card.title)}
                    className="btn outline border-2 border-[#DC520A] hover:bg-[#DC520A]/5 active:scale-95 text-[#111111] font-bold text-[13px] sm:text-[14px] py-2.5 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-transparent"
                  >
                    <span>Get Brochure</span>
                    <Download className="w-3.5 h-3.5 stroke-[2.5] text-[#111111]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(card.code || card.title)}
                    className="btn solid bg-[#DC520A] hover:bg-[#c24608] active:scale-95 text-white font-bold text-[13px] sm:text-[14px] py-2.5 px-3 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm border-none"
                  >
                    <span>Apply now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Specializations Tabs Section ── */}
      {activeSpecs.length > 0 && (
        <section id="courses" className="w-full py-12 sm:py-16 bg-white border-b border-slate-200/80 scroll-mt-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-[#111111] text-[24px] sm:text-[28px] md:text-[30px] font-bold m-0 leading-tight">
                {activeTab === "dba"
                  ? "Online DBA Specialization at GGU"
                  : "Online MBA Specialization at GGU"}
              </h2>
              <p className="text-[#666666] text-[15px] sm:text-[16px] mt-1.5 m-0 font-normal">
                {activeTab === "dba"
                  ? "(Doctorate of business administration)"
                  : "(Master of business administration)"}
              </p>
            </div>

            <div className="course-tabs flex items-center justify-center gap-2 mb-8">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("dba");
                  specCarouselRef.current?.goTo(0);
                }}
                className={`py-2 px-6 rounded-md font-semibold text-[14px] transition-all cursor-pointer border-none ${
                  activeTab === "dba"
                    ? "bg-[#DC520A] text-white shadow-sm"
                    : "bg-[#f2f2f2] text-[#333333] hover:bg-[#e8e8e8]"
                }`}
              >
                DBA Specialization
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("mba");
                  specCarouselRef.current?.goTo(0);
                }}
                className={`py-2 px-6 rounded-md font-semibold text-[14px] transition-all cursor-pointer border-none ${
                  activeTab === "mba"
                    ? "bg-[#DC520A] text-white shadow-sm"
                    : "bg-[#f2f2f2] text-[#333333] hover:bg-[#e8e8e8]"
                }`}
              >
                MBA Specialization
              </button>
            </div>

            <div className="relative group/spec px-1 sm:px-4">
              <button
                type="button"
                onClick={handlePrevSpec}
                className="absolute -left-3 sm:-left-4 top-[45%] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-800 hover:text-[#DC520A] hover:bg-slate-50 transition-all cursor-pointer active:scale-95 opacity-80 hover:opacity-100"
                aria-label="Previous specialization"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleNextSpec}
                className="absolute -right-3 sm:-right-4 top-[45%] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-800 hover:text-[#DC520A] hover:bg-slate-50 transition-all cursor-pointer active:scale-95 opacity-80 hover:opacity-100"
                aria-label="Next specialization"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="overflow-hidden">
                <Carousel
                  ref={specCarouselRef}
                  slidesToShow={3}
                  slidesToScroll={1}
                  autoplay
                  autoplaySpeed={3500}
                  infinite={activeSpecs.length > 3}
                  dots={false}
                  arrows={false}
                  pauseOnHover
                  draggable
                  responsive={[
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: activeSpecs.length > 2,
                      },
                    },
                    {
                      breakpoint: 640,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: activeSpecs.length > 1,
                      },
                    },
                  ]}
                >
                  {activeSpecs.map((spec, sIdx) => (
                    <div
                      key={`${spec.id}-${sIdx}`}
                      className="px-2.5 outline-none"
                    >
                      <div className="bg-[#F2F2F2] rounded-[12px] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/80 h-full">
                        <div>
                          <div className="relative w-full h-[185px] sm:h-[195px] bg-slate-100 overflow-hidden">
                            <Image
                              src={spec.image || "/assets/all_universities_images/ggu/marketing-ggu.webp"}
                              alt={spec.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                            />
                          </div>
                          <div
                            className="h-[3px] w-full"
                            style={{
                              background:
                                "linear-gradient(to right, #d8233a 0%, #ff5238 25%, #ff0077 60%, #e81d76 100%)",
                            }}
                          />
                          <div className="p-4 sm:p-5 bg-[#F2F2F2] flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="text-[16px] sm:text-[16.5px] font-bold text-[#111111] leading-snug m-0 mb-2">
                                {spec.title}
                              </h4>
                              <p className="text-[12px] sm:text-[12.5px] text-[#333333] leading-[1.55] line-clamp-4 m-0 min-h-[64px]">
                                {spec.description}
                              </p>
                            </div>
                            <div className="mt-3.5 pt-3 border-t border-slate-300 flex items-center justify-start">
                              <button
                                type="button"
                                onClick={() => onOpenApply?.(spec.code || spec.title)}
                                className="w-fit bg-[#003468] hover:bg-[#002447] active:scale-95 text-white font-bold text-[12.5px] sm:text-[13px] py-1.5 px-5 rounded-[4px] transition-all cursor-pointer border-none shadow-xs text-left"
                              >
                                Apply Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
