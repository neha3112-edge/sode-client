"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { liverpoolImg } from "./constants";

export default function LiverpoolJourney({ onOpenCounseling }) {
  const steps = [
    {
      step: "Step 01",
      stepColor: "#001f5c",
      logo: "IIMU icon.webp",
      heading: "Executive Programme in Business Management & AI Leadership",
      duration: "(11 Months)",
      desc: "In the IIM-Udaipur phase of 11 months, learners build expertise in leadership, business strategy, finance, marketing, operations, and AI-driven decision-making through an industry-focused curriculum, real-world applications, and expert-led learning.",
    },
    {
      step: "Step 02",
      stepColor: "#f26522",
      logo: "lbs-logo-696b29d4429b8.webp",
      heading: "MBA Specialisations",
      duration: "(2 Months)",
      desc: "During the 2-month LBS Online MBA phase, learners choose one specialisation and gain advanced, hands-on expertise through focused courses and practical tools. The MBA Liverpool Online specialisation phase helps learners develop domain skills, analytics capabilities, and real-world industry applications through the MBA in Liverpool learning experience.",
    },
    {
      step: "Step 03",
      stepColor: "#0284c7",
      logo: "lbs-logo-696b29d4429b8.webp",
      heading: "Applied Business Research",
      duration: "(1 Month)",
      desc: "In the 1-month LBS MBA learning phase in Applied Research, students master research methodologies, explore diverse approaches, manage projects, and enhance thesis report writing through the Liverpool online MBA learning experience.",
    },
    {
      step: "Step 04",
      stepColor: "#f1ba00",
      logo: "lbs-logo-696b29d4429b8.webp",
      heading: "Strategic Business Consultancy Project",
      duration: "(3 Months)",
      desc: "In the 3-month MBA in Liverpool University phase, the Strategic Business Consultancy Project, Professionals apply research insights to consultancy projects, solving industry-specific challenges in BFSI, FMCG, IT, automotive, and e-commerce.",
    },
  ];

  return (
    <section id="journey" className="w-full bg-white pt-6 sm:pt-8 pb-10 sm:pb-12 select-none">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-[28px] sm:text-[34px] md:text-[38px] font-black text-[#002060] leading-tight m-0">
          MBA Program Journey
        </h2>
        <h3 className="text-[14.5px] sm:text-[16px] font-medium text-[#222222] m-0 mt-1 sm:mt-1.5 mb-5 sm:mb-7">
          LBS MBA Pathway + IIM-U
        </h3>

        {/* 4 Steps Container */}
        <div className="relative mb-6 sm:mb-8">
          {/* Continuous Dotted Connector Line behind the cards (Desktop only) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[50%] left-[6%] right-[6%] border-t-[1.5px] border-dotted border-gray-400 z-0 pointer-events-none"
          />

          {/* Cards List: Single Column Stack on Mobile (< lg), 4-column Grid on Desktop (lg+) */}
          <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-5 items-center text-left relative z-10 w-full">
            {steps.map((item, idx) => (
              <React.Fragment key={idx}>
                <div
                  className="relative bg-white rounded-[16px] border border-[#333333] pt-8 pb-7 px-5 sm:px-6 flex flex-col justify-start shadow-xs transition-transform duration-200 w-full max-w-[440px] sm:max-w-[480px] lg:max-w-none mx-auto"
                >
                  {/* Step Header Badge breaking through the top border with ticks */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2.5 flex items-center gap-1.5 whitespace-nowrap z-20">
                    <span className="w-5 h-[1.5px] bg-[#666666] inline-block" />
                    <span
                      className="font-black text-[16px] sm:text-[17px] tracking-tight"
                      style={{ color: item.stepColor }}
                    >
                      {item.step}
                    </span>
                    <span className="w-5 h-[1.5px] bg-[#666666] inline-block" />
                  </div>

                  {/* Logo Area */}
                  <div className="h-16 flex items-center justify-start mb-4">
                    <Image
                      src={liverpoolImg(item.logo)}
                      alt={item.heading}
                      width={180}
                      height={54}
                      className="max-h-14 w-auto object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-col justify-start">
                    <h4 className="text-[15.5px] sm:text-[16.5px] font-bold text-[#111111] leading-snug m-0 mb-1.5">
                      {item.heading}
                    </h4>
                    <p className="text-[13px] font-normal text-[#555555] m-0 mb-3">
                      {item.duration}
                    </p>
                    <p className="text-[12.5px] sm:text-[13px] text-[#555555] leading-[1.48] m-0 font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Vertical Dotted Connector between cards on mobile (< lg) */}
                {idx < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="lg:hidden flex justify-center items-center h-8 sm:h-9 my-2 z-10"
                  >
                    <div className="h-full border-l-[2px] border-dotted border-[#666666]" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => onOpenCounseling?.("Journey Section", "Get 1:1 Counseling")}
            className="py-3 px-8 rounded-lg bg-[#00bcd4] hover:bg-[#00acc1] text-white font-bold text-[14px] sm:text-[14.5px] flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 transition-all border-none"
          >
            <span>Get 1:1 Counseling</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
