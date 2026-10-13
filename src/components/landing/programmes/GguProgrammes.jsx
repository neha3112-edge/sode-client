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
  const mobileSpecCarouselRef = useRef(null);

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
      image: mbaProgram?.image || "/assets/all_universities_images/ggu/master-mba-ggu.webp",
      description:
        mbaProgram?.description ||
        "A US-approved or practice-driven program that offers both from Golden Gate University MBA online. The course builds strong leadership skills, strategic thinking, and data-informed decision-making skills. The University faculty is from a San Francisco-based scholar-practitioner with years of experience.",
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
      image: dbaProgram?.image || "/assets/all_universities_images/ggu/doctorate-dba-ggu.webp",
      description:
        dbaProgram?.description ||
        "A degree that is flexible and recognised, the online DBA at Golden Gate University is an advanced doctoral program that is for senior-level leaders, consultants, and academics. The course focuses on research, problem-solving, and an original dissertation that talks about real-life business challenges.",
      details: dbaProgram?.details || [
        { label: "Duration & Credits", value: "36 months | 56 credits" },
        { label: "Eligibility", value: "Recognised degree in Bachelor’s University" },
      ],
    },
  ];

  // 2. Specializations for Tabs Section
  const preferredDbaOrder = [
    "dba-ai",
    "dba-finance",
    "dba-leadership",
    "dba-analytics",
    "dba-marketing",
    "dba-general",
  ];
  const dbaSpecializations = programmes
    .filter(
      (p) =>
        p.id !== "mba" &&
        p.id !== "dba" &&
        (p.category === "Doctorate" ||
          p.level?.toLowerCase().includes("doc") ||
          p.id?.startsWith("dba-") ||
          p.code?.toUpperCase().includes("DBA") ||
          p.title?.toLowerCase().includes("dba"))
    )
    .sort((a, b) => {
      const idxA = preferredDbaOrder.indexOf(a.id);
      const idxB = preferredDbaOrder.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });

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
        className="courses-section w-full pt-4 sm:pt-5 md:pt-6 pb-6 sm:pb-8 select-none scroll-mt-24"
        style={{ backgroundColor: brand.programmesBg || "#e8e8e8" }}
      >
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-3 sm:mb-4 md:mb-5">
            <h2 className="text-[#DC520A] text-[22px] sm:text-[26px] md:text-[28px] font-bold uppercase tracking-wide m-0 leading-tight">
              {brand.programmesTitle || "COURSES OFFERED"}
            </h2>
            <p className="text-[#222222] text-[13.5px] sm:text-[15px] font-semibold mt-0.5 m-0">
              {brand.programmesSubtitle || "By Golden Gate University"}
            </p>
          </div>

          <div className="course-container grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 justify-center items-stretch max-w-[960px] mx-auto">
            {mainCards.map((card) => (
              <div
                key={card.id}
                className="course-card bg-white rounded-[16px] sm:rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_26px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="card-image relative w-full h-[160px] sm:h-[175px] md:h-[185px] overflow-hidden bg-slate-100">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover object-bottom"
                      sizes="(max-width: 768px) 100vw, 480px"
                    />
                    {card.badge && !card.image?.includes("-ggu.webp") && (
                      <div className="absolute bottom-0 right-0 bg-[#DC520A] text-white text-[10.5px] sm:text-[11.5px] font-bold px-3 sm:px-3.5 py-1 rounded-tl-[10px] tracking-wider uppercase shadow-xs z-10 select-none">
                        {card.badge}
                      </div>
                    )}
                  </div>

                  <div className="card-content p-4 sm:p-5 pb-2 sm:pb-2.5">
                    <h3 className="text-[16.5px] sm:text-[17.5px] md:text-[18.5px] font-bold text-[#111111] leading-snug m-0 mb-1.5 sm:mb-2 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="description text-[11.5px] sm:text-[12px] md:text-[12.5px] text-[#333333] font-normal leading-[1.5] m-0 mb-2.5 sm:mb-3 sm:min-h-[68px] md:min-h-[74px]">
                      {card.description}
                    </p>

                    <div className="details space-y-0.5 sm:space-y-1 mb-2 text-[11.5px] sm:text-[12px] md:text-[12.5px]">
                      {card.details?.map((item, idx) => (
                        <p key={idx} className="m-0 leading-relaxed text-[#333333]">
                          <strong className="font-bold text-[#111111]">{item.label}:</strong>{" "}
                          <span className="font-normal text-[#333333]">{item.value}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card-actions p-4 sm:p-5 pt-0 pb-4 sm:pb-5 grid grid-cols-2 gap-2.5 sm:gap-3 mt-auto">
                  <button
                    type="button"
                    onClick={() => onSelectCourseForBrochure?.(card.code || card.title)}
                    className="btn outline border border-[#DC520A] hover:bg-[#DC520A]/5 active:scale-95 text-[#111111] font-bold text-[11.5px] sm:text-[12.5px] py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-white shadow-xs"
                  >
                    <span>Get Brochure</span>
                    <Download className="w-3.5 h-3.5 stroke-[2] text-[#111111]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(card.code || card.title)}
                    className="btn solid bg-[#DC520A] hover:bg-[#c24608] active:scale-95 text-white font-bold text-[11.5px] sm:text-[12.5px] py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs border-none"
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
        <section id="courses" className="w-full pt-4 sm:pt-6 pb-12 sm:pb-16 bg-white border-b border-slate-200/80 scroll-mt-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-3 sm:mb-4">
              <h2 className="text-[#111111] text-[22px] sm:text-[26px] md:text-[30px] font-bold m-0 leading-tight tracking-tight font-['Montserrat']">
                {activeTab === "dba"
                  ? "Online DBA Specialization at GGU"
                  : "Online MBA Specialization at GGU"}
              </h2>
              <p className="text-[#222222] text-[14px] sm:text-[15px] mt-1.5 m-0 font-medium font-['Montserrat']">
                {activeTab === "dba"
                  ? "(Doctorate of business administration)"
                  : "(Master of business administration)"}
              </p>
            </div>

            <div className="course-tabs flex items-center justify-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 max-w-[340px] sm:max-w-[420px] mx-auto w-full px-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("dba");
                  specCarouselRef.current?.goTo(0);
                  mobileSpecCarouselRef.current?.goTo(0);
                }}
                className={`flex-1 py-2.5 px-3 rounded-[8px] font-bold text-[13.5px] sm:text-[14px] leading-tight transition-all cursor-pointer border-none shadow-xs text-center ${
                  activeTab === "dba"
                    ? "bg-[#DC520A] text-white"
                    : "bg-[#eef0f2] text-[#111111] hover:bg-[#e4e6e8]"
                }`}
              >
                <span className="block sm:inline">DBA </span>
                <span className="block sm:inline">Specialization</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("mba");
                  specCarouselRef.current?.goTo(0);
                  mobileSpecCarouselRef.current?.goTo(0);
                }}
                className={`flex-1 py-2.5 px-3 rounded-[8px] font-bold text-[13.5px] sm:text-[14px] leading-tight transition-all cursor-pointer border-none shadow-xs text-center ${
                  activeTab === "mba"
                    ? "bg-[#DC520A] text-white"
                    : "bg-[#eef0f2] text-[#111111] hover:bg-[#e4e6e8]"
                }`}
              >
                <span className="block sm:inline">MBA </span>
                <span className="block sm:inline">Specialization</span>
              </button>
            </div>

            {/* ── Mobile View: Single Card Carousel ── */}
            <div className="block md:hidden relative w-full max-w-[330px] sm:max-w-[350px] mx-auto px-1">
              <Carousel
                ref={mobileSpecCarouselRef}
                slidesToShow={1}
                slidesToScroll={1}
                autoplay
                autoplaySpeed={3000}
                infinite={activeSpecs.length > 1}
                dots={false}
                arrows={false}
                pauseOnHover
                draggable
              >
                {activeSpecs.map((spec, sIdx) => (
                  <div
                    key={`mobile-spec-${spec.id}-${sIdx}`}
                    className="px-1 outline-none pb-1"
                  >
                    <div className="bg-[#F2F2F2] rounded-[14px] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/80 h-full w-full">
                      <div>
                        <div className="relative w-full h-[200px] bg-slate-100 overflow-hidden">
                          <Image
                            src={spec.image || "/assets/all_universities_images/ggu/marketing-ggu.webp"}
                            alt={spec.title}
                            fill
                            className="object-cover"
                            sizes="330px"
                          />
                        </div>
                        <div
                          className="h-[4px] w-full"
                          style={{
                            background:
                              "linear-gradient(to right, #d77a85 25%, #ff0099 25% 50%, #ff5c57 50% 75%, #c2002f 75%)",
                          }}
                        />
                        <div className="p-4 bg-[#F2F2F2] flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-[17.5px] font-bold text-[#111111] leading-snug m-0 mb-2 font-['Montserrat']">
                              {spec.title}
                            </h4>
                            <p className="text-[13px] text-[#333333] leading-[1.55] m-0 min-h-[64px]">
                              {spec.description}
                            </p>
                          </div>
                          <div className="mt-4 pt-3.5 border-t border-slate-300/80 flex items-center justify-start">
                            <button
                              type="button"
                              onClick={() => onOpenApply?.(spec.code || spec.title)}
                              className="w-fit bg-[#003468] hover:bg-[#002447] active:scale-95 text-white font-bold text-[13.5px] py-2 px-6 rounded-[5px] transition-all cursor-pointer border-none shadow-xs text-left"
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

            {/* ── Desktop View: Multi-Card Carousel ── */}
            <div className="hidden md:block relative group/spec px-2">
              <button
                type="button"
                onClick={handlePrevSpec}
                className="absolute -left-3 sm:-left-5 lg:-left-6 top-[40%] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-800 hover:text-[#DC520A] hover:bg-slate-50 transition-all cursor-pointer active:scale-95 opacity-0 group-hover/spec:opacity-100"
                aria-label="Previous specialization"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleNextSpec}
                className="absolute -right-3 sm:-right-5 lg:-right-6 top-[40%] -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-800 hover:text-[#DC520A] hover:bg-slate-50 transition-all cursor-pointer active:scale-95 opacity-0 group-hover/spec:opacity-100"
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
                  autoplaySpeed={3000}
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
                  ]}
                >
                  {activeSpecs.map((spec, sIdx) => (
                    <div
                      key={`desktop-spec-${spec.id}-${sIdx}`}
                      className="px-2.5 sm:px-3 outline-none"
                    >
                      <div className="bg-[#F2F2F2] rounded-[12px] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/80 h-full">
                        <div>
                          <div className="relative w-full h-[215px] sm:h-[230px] md:h-[240px] bg-slate-100 overflow-hidden">
                            <Image
                              src={spec.image || "/assets/all_universities_images/ggu/marketing-ggu.webp"}
                              alt={spec.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 50vw, 400px"
                            />
                          </div>
                          <div
                            className="h-[4px] w-full"
                            style={{
                              background:
                                "linear-gradient(to right, #d77a85 25%, #ff0099 25% 50%, #ff5c57 50% 75%, #c2002f 75%)",
                            }}
                          />
                          <div className="p-4 sm:p-5 bg-[#F2F2F2] flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="text-[17px] sm:text-[18px] md:text-[19px] font-bold text-[#111111] leading-snug m-0 mb-2 font-['Montserrat']">
                                {spec.title}
                              </h4>
                              <p className="text-[13px] sm:text-[13.5px] text-[#333333] leading-[1.55] m-0 min-h-[68px] sm:min-h-[75px]">
                                {spec.description}
                              </p>
                            </div>
                            <div className="mt-4 pt-3.5 border-t border-slate-300/80 flex items-center justify-start">
                              <button
                                type="button"
                                onClick={() => onOpenApply?.(spec.code || spec.title)}
                                className="w-fit bg-[#003468] hover:bg-[#002447] active:scale-95 text-white font-bold text-[13.5px] sm:text-[14px] py-2 px-6 rounded-[5px] transition-all cursor-pointer border-none shadow-xs text-left"
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
