"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function LandingSpecializations({
  specializations = null,
  brand = {},
  onOpenApply,
}) {
  const [activeTab, setActiveTab] = useState("dba");

  const defaultData = {
    title: "Specializations of Edgewood University Online DBA / MBA + DBA",
    tabs: [
      { id: "dba", label: "DBA" },
      { id: "dba-mba", label: "MBA + DBA" },
    ],
    items: {
      dba: [
        {
          id: "dba-leadership",
          title: "DBA Leadership",
          image: "/assets/all_universities_images/edgewood/leadership-edgewood.webp",
          description:
            "Edgewood University Online DBA leadership builds leadership skills that enable students to learn management and strategic decision-making skills, using applied research to solve real organisational challenges in senior roles, and to gain skilled knowledge.",
        },
        {
          id: "dba-finance",
          title: "DBA Finance",
          image: "/assets/all_universities_images/edgewood/finanance-edgewood.webp",
          description:
            "Finance Specializations in Edgewood University's Online DBA develop advanced expertise in financial strategy, risk management, and corporate decision-making. This curriculum help student use research-led frameworks to manage complex financial problems.",
        },
      ],
      "dba-mba": [
        {
          id: "mba-dba-leadership",
          title: "MBA + DBA Leadership",
          image: "/assets/all_universities_images/edgewood/leadership-edgewood-2.webp",
          description:
            "Edgewood University Online DBA Learning in MBA + DBA Leadership combines MBA leadership skills with doctoral-level applied research, preparing professionals for senior management, consulting, and enterprise growth roles.",
        },
        {
          id: "mba-dba-finance",
          title: "MBA + DBA Finance",
          image: "/assets/all_universities_images/edgewood/Finance.webp",
          description:
            "Edgewood University Online DBA Learning in MBA + DBA Finance blends MBA finance fundamentals with advanced doctoral research, supporting strategic investment, risk control, and high-level corporate finance decisions.",
        },
      ],
    },
  };

  const data = specializations || brand.specializations || defaultData;
  const currentItems = data.items?.[activeTab] || [];
  const primaryColor = brand.primaryColor || "#ba0000";

  return (
    <section id="specializations" className="py-14 sm:py-20 bg-[#e9e9e9] select-none scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2
            className="text-[24px] sm:text-[30px] md:text-[32px] font-extrabold m-0 leading-tight"
            style={{ color: primaryColor }}
          >
            {data.title}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          {data.tabs?.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`py-2.5 px-6 sm:px-8 font-extrabold text-[15px] sm:text-[16px] rounded-[6px] border transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#b30000] text-white border-[#b30000] shadow-sm"
                    : "bg-[#f7f7f7] text-[#333333] border-[#cccccc] hover:bg-white"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 max-w-[1050px] mx-auto">
          {currentItems.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between relative"
            >
              <div>
                {/* Image */}
                <div className="relative w-full h-[200px] sm:h-[220px] rounded-t-[20px] overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 pb-12 text-center">
                  <h3 className="text-[22px] sm:text-[26px] font-black text-[#111111] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[14px] sm:text-[14.5px] text-[#444444] leading-relaxed m-0 font-normal">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Floating Apply Now Button overlapping bottom edge */}
              <div className="absolute -bottom-[20px] left-1/2 -translate-x-1/2">
                <button
                  type="button"
                  onClick={() => onOpenApply?.(item.title)}
                  className="bg-[#b30000] hover:bg-[#8b0000] text-white font-bold text-[16px] py-2.5 px-8 sm:px-10 rounded-[8px] border-none shadow-[0_4px_10px_rgba(0,0,0,0.2)] cursor-pointer whitespace-nowrap transition-all active:scale-95"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

