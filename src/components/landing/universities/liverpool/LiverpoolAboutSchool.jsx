"use client";

import React from "react";
import { PhoneCall } from "lucide-react";
import { liverpoolImg } from "./constants";

export default function LiverpoolAboutSchool({ onOpenCallback }) {
  return (
    <section
      id="about-school"
      className="w-full relative select-none text-white overflow-hidden scroll-mt-20 bg-black"
    >
      {/* Background Image: Desktop & Mobile */}
      <div
        className="absolute inset-0 bg-cover bg-right md:bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${liverpoolImg("ljmu-front-desktop-69720422cb65b.webp")})`,
        }}
      />

      {/* Dark Gradient Overlay to ensure text readability on the left */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black via-black/90 md:via-black/80 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Foreground Content Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-20">
        <div className="max-w-[620px] lg:max-w-[660px] flex flex-col items-start text-left">
          {/* Heading */}
          <h2 className="text-[24px] sm:text-[30px] md:text-[34px] font-bold text-white leading-tight m-0 mb-4 sm:mb-5">
            About Liverpool Business School
          </h2>

          {/* 3 Paragraphs */}
          <div className="text-[12.5px] sm:text-[13.5px] text-gray-200 leading-[1.4] sm:leading-[1.45] flex flex-col gap-3 font-normal">
            <p className="m-0">
              Liverpool Business School (LBS), a renowned school within Liverpool John Moores University (LJMU),
              brings over three decades of excellence in business education. The institution is recognised
              for its innovative approach, impactful research, and industry-focused learning. LBS provides
              a globally relevant learning experience for aspiring business leaders.
            </p>
            <p className="m-0">
              The Liverpool online MBA programme is designed to help professionals enhance their business
              knowledge through a research-focused curriculum, practical learning, and global exposure.
              This MBA University of Liverpool pathway offers an MBA degree from Liverpool Business School
              along with IIM Udaipur certification, providing learners with double credentials and alumni
              status from both institutions.
            </p>
            <p className="m-0">
              Through the MBA in Liverpool learning journey, professionals can customise their curriculum,
              gain hands-on learning through HBR case studies, simulations, real-world projects, and access
              to a thriving network of 3,000+ alumni.
            </p>
          </div>

          {/* Request Call Back Button */}
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              onClick={() => onOpenCallback?.("About School Section", "Request Call Back")}
              className="py-2.5 sm:py-3 px-6 sm:px-7 rounded-[6px] bg-[#2de1c2] hover:bg-[#25c4a8] text-white font-bold text-[13.5px] sm:text-[14px] flex items-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all border-none"
            >
              <PhoneCall className="w-4 h-4 fill-white stroke-none" />
              <span>Request Call Back</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
