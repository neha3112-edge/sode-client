"use client";

import React from "react";
import Image from "next/image";
import { GALGOTIAS_PROGRAMS, galgotiasImg } from "./constants";

export default function GalgotiasProgrammes({ onOpenBrochure, onOpenApply }) {
  return (
    <section id="program" className="py-12 sm:py-16 bg-white select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-[26px] sm:text-[32px] md:text-[34px] font-bold text-[#002266] m-0 mb-2">
            Galgotias University online courses
          </h2>
          <p className="text-[13px] sm:text-[14px] text-[#444444] max-w-2xl mx-auto leading-relaxed m-0 font-normal">
            Galgotias University offers a variety of online degree programs for students from different backgrounds. Given below are the course details.
          </p>
        </div>

        {/* 6 Course Cards Grid - 3 columns for balanced 3x2 layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {GALGOTIAS_PROGRAMS.map((c, idx) => (
            <div
              key={c.code || idx}
              className="card-box bg-[#333333] rounded-[10px] shadow-[0_0_8px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 transition-transform duration-300 flex flex-col justify-between overflow-hidden text-left"
            >
              <div>
                {/* Free natural size image rendered directly without letterbox constraint */}
                <div className="w-full overflow-hidden rounded-t-[10px]">
                  <Image
                    src={c.image}
                    alt={c.title}
                    width={461}
                    height={261}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-auto block rounded-t-[10px]"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="p-3.5 sm:p-4 text-white">
                  <h3 className="text-[23px] sm:text-[25px] font-bold text-[#f9bc08] m-0 leading-tight">
                    {c.code}
                  </h3>
                  <p className="text-[12px] sm:text-[12.5px] font-medium text-white mt-0.5 m-0">
                    {c.title}
                  </p>
                  <p className="text-[11.5px] font-medium text-white/90 mt-1.5 m-0">
                    {c.duration}
                  </p>
                  <p className="text-[11.5px] font-medium text-white/90 mt-0.5 m-0">
                    {c.eligibility}
                  </p>
                  <p className="card_desc text-[11px] text-white/80 leading-[1.38] mt-2 m-0">
                    {c.desc}
                  </p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 pt-0">
                <hr className="border-t border-neutral-600 mb-2.5 m-0" />
                <div className="card-footer flex items-center justify-between gap-2 p-0">
                  <button
                    type="button"
                    onClick={() => onOpenBrochure?.(c.code, "Download Brochure")}
                    className="b1 inline-flex items-center gap-1.5 bg-white text-[#bc1820] font-bold text-[11.5px] sm:text-[12px] px-3 py-1.5 rounded-full border border-white hover:bg-slate-100 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Get Brochure</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3.5 h-3.5 fill-current inline-block"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a1 1 0 011 1v8.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 11.586V3a1 1 0 011-1z" />
                      <path d="M3 14a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(c.code, "Apply Now")}
                    className="b2 inline-flex items-center bg-[#bc1820] text-white font-bold text-[11.5px] sm:text-[12px] px-3.5 py-1.5 rounded-full border-none hover:bg-[#a0131a] transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

