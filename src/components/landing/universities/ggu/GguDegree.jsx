"use client";

import React from "react";
import Image from "next/image";
import { CheckSquare } from "lucide-react";
import { gguImg, GGU_DEGREE_INFO } from "./constants";

export default function GguDegree({ onOpenBrochure }) {
  return (
    <section id="sample-degree" className="w-full bg-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Certificate Image */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[500px]">
              <Image
                src={gguImg(GGU_DEGREE_INFO.image)}
                alt="GGU Sample Degree Certificate"
                width={500}
                height={350}
                className="w-full h-auto object-contain shadow-md rounded-lg border border-gray-100"
              />
            </div>
          </div>

          {/* Right Column: Degree Content */}
          <div className="lg:col-span-6">
            <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-black text-[#003468] leading-tight m-0 mb-4">
              Advance Your Career with GGU
              <br />
              Online Courses
            </h2>

            <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-neutral-600 m-0 mb-6 font-normal">
              {GGU_DEGREE_INFO.description}
            </p>

            {/* Checklist items with orange checkmark */}
            <div className="space-y-3 mb-7">
              {GGU_DEGREE_INFO.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-[4px] bg-[#DC520A] flex items-center justify-center shrink-0 mt-0.5 text-white">
                    <CheckSquare className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-[13px] sm:text-[13.5px] font-medium text-neutral-800 leading-snug m-0">
                    {feat}
                  </p>
                </div>
              ))}
            </div>

            {/* Get Degree Button */}
            <div>
              <button
                type="button"
                onClick={() => onOpenBrochure?.("DBA", "Get Degree")}
                className="w-auto px-7 py-3 bg-[#DC520A] hover:bg-[#b84307] text-white rounded-[6px] text-[14px] font-bold shadow-md transition-all cursor-pointer border-none active:scale-98"
              >
                Get Degree
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

