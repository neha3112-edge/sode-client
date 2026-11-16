"use client";

import React from "react";
import Image from "next/image";
import { PhoneCall } from "lucide-react";
import { IIITB_ABOUT, iiitbImg } from "./constants";

export default function IiitbAbout({ onOpenBrochure, onOpenApply }) {
  return (
    <section id="about-section" className="w-full bg-[#005a8d] text-white select-none overflow-hidden p-0 m-0">
      {/* 
        Container has ml-0 and max-w-[1240px] with 1fr 1.5fr grid matching live site:
        .about-container { max-width: 1200px; display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; margin-left: 0px; }
      */}
      <div className="w-full max-w-[1240px] ml-0 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] items-center gap-8 lg:gap-10">
        {/* Left Column: Campus Image (Touching left screen edge, height 500px) */}
        <div className="w-full relative h-[360px] sm:h-[420px] md:h-[500px] shrink-0 bg-neutral-900">
          <Image
            src={iiitbImg(IIITB_ABOUT.image)}
            alt="IIIT Bangalore Campus"
            fill
            sizes="(max-width: 768px) 100vw, 496px"
            className="object-cover"
          />
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col justify-center py-8 sm:py-10 md:py-12 px-6 sm:px-8 md:px-0 md:pr-8">
          <div className="max-w-[680px]">
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-black text-white leading-tight m-0">
              About IIIT Bangalore
              <br />
              Online Courses
            </h2>

            {/* Horizontal underline */}
            <div className="w-[80%] max-w-[380px] h-[1px] bg-white/70 mt-2.5 mb-5" />

            <p className="text-white/95 text-[13px] sm:text-[14px] leading-relaxed m-0 mb-6 font-normal">
              {IIITB_ABOUT.desc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 w-auto">
              {/* Request Call Back (Red Button) */}
              <button
                type="button"
                onClick={() => onOpenApply?.("Request Call Back", "Request Call Back")}
                className="py-2 sm:py-2.5 px-4 sm:px-5 rounded-[6px] bg-[#be1818] hover:bg-[#a01313] text-white font-bold text-[13px] sm:text-[13.5px] flex items-center justify-center gap-2 border-none shadow-sm cursor-pointer active:scale-98 transition-all shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Request Call Back</span>
              </button>

              {/* Get 1:1 FREE Counseling (Outline Button) */}
              <button
                type="button"
                onClick={() => onOpenBrochure?.("Free Counseling", "Get 1:1 FREE Counseling")}
                className="py-2 sm:py-2.5 px-4 sm:px-5 rounded-[6px] bg-transparent hover:bg-white/10 text-white font-bold text-[13px] sm:text-[13.5px] border-[1.5px] border-white flex items-center justify-center cursor-pointer active:scale-98 transition-all shrink-0"
              >
                <span>Get 1:1 FREE Counseling</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
