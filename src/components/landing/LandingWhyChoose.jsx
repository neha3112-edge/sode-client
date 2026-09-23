"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import LandingContainer from "./LandingContainer";

export default function LandingWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const universityName = brand.name || "Amity University Online";
  const studentImg = brand.whyChooseStudentImage || "/assets/images/why_choose_student.png";

  return (
    <section id="whychoose" className="py-6 sm:py-8 bg-white">
      <LandingContainer>
        {/* Section Heading with compact bottom margin */}
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight m-0">
          Why Choose {universityName} for Degree Courses
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          {/* Left: 4 Features (2x2 Grid) + Apply Now Button */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-3.5 sm:gap-y-4">
              {whyChoose.map((pt, idx) => (
                <div key={idx} className="space-y-0.5">
                  <h3 className="text-[14.5px] sm:text-[15.5px] font-medium text-[#084183] tracking-tight m-0">
                    {pt.title}
                  </h3>
                  <p className="text-[12px] sm:text-[12.5px] text-gray-600 leading-snug font-normal m-0 max-w-sm">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Apply Now Button with reduced top margin */}
            <div className="mt-4 sm:mt-5">
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="inline-flex items-center gap-1.5 bg-[#ffc107] hover:bg-[#e0a800] text-[#08417b] font-medium text-[13.5px] px-5 py-2 rounded-md shadow-2xs transition-colors cursor-pointer border-none"
              >
                Apply Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Student sitting on armchair Image */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] h-[280px] sm:h-[320px]">
              <Image
                src={studentImg}
                alt={`Why choose ${universityName}`}
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 100vw, 30vw"
                priority
              />
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
