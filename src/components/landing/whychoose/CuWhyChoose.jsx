"use client";

import React from "react";
import Image from "next/image";
import LandingContainer from "../LandingContainer";

const CU_CHOOSE_ITEMS = [
  {
    title: "Affordable Fee Structure",
    desc: "The Chandigarh University fee structure provides each of its online programs remains affordable.",
    icon: "/assets/cu/afforadable.png",
    borderSide: "right",
  },
  {
    title: "Globally Recognized Courses",
    desc: "The curriculum of Chandigarh Online University is up to the market standard, setting global benchmarks.",
    icon: "/assets/cu/global.png",
    borderSide: "right",
  },
  {
    title: "24/7 Support",
    desc: "Chandigarh University has situated a 24/7 support team, and their only work is to take care of the students' queries.",
    icon: "/assets/cu/support.png",
    borderSide: "right",
  },
  {
    title: "Career Placement Assistance",
    desc: "The Chandigarh Online University has its duties related to placement through its career placement assistance.",
    icon: "/assets/cu/placement.png",
    borderSide: "left",
  },
  {
    title: "Flexible Study Options",
    desc: "Chandigarh Online University understands every student's learning pace and offers its live and recorded classes.",
    icon: "/assets/cu/lms.png",
    borderSide: "right",
  },
  {
    title: "Innovative Learning Platform",
    desc: "Chandigarh University offers its learners cutting-edge knowledge with LMS, delivering a better digital learning experience.",
    icon: "/assets/cu/self.png",
    borderSide: "left",
  },
];

export default function CuWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const items = whyChoose && whyChoose.length > 0 ? whyChoose : CU_CHOOSE_ITEMS;

  return (
    <section id="whychoose" className="py-12 sm:py-16 bg-[#e6e6e6] select-none scroll-mt-20">
      <LandingContainer className="px-3 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-[1240px] mx-auto mb-10">
          <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-black tracking-tight leading-tight m-0">
            Why Choose CU Online University?
          </h2>
          <p className="text-[13px] sm:text-[13.5px] lg:text-[14px] text-slate-600 mt-2.5 leading-relaxed m-0 font-semibold">
            <span className="md:block">
              Chandigarh University is a UGC- DEB approved university ranked 19th. It offers flexibility, industry-oriented courses crafted for students across India. Students can earn a
            </span>
            <span className="md:block">
              recognized degree while earning or balancing their personal lives.
            </span>
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {items.map((item, idx) => {
            const isRight = item.borderSide === "right";

            return (
              <div
                key={idx}
                className={`bg-white p-5 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)] rounded-none flex items-start gap-4 sm:gap-5 transition-transform hover:-translate-y-0.5 ${isRight
                    ? "border-r-[5px] border-[#4b5563]"
                    : "border-l-[5px] border-[#4b5563]"
                  }`}
              >
                <div className="relative w-14 h-14 shrink-0">
                  <Image
                    src={item.icon || item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-[18px] font-bold text-[#d11c1f] m-0 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 mt-2 m-0 leading-relaxed font-normal">
                    {item.desc || item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </LandingContainer>
    </section>
  );
}
