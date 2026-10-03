"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import LandingContainer from "../LandingContainer";

export default function ClassicWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const universityName = brand.name || "University Online";
  const studentImg = brand.whyChooseStudentImage || "/assets/amitylp/Why-choose-amity.png";

  return (
    <section id="whychoose" className="py-8 sm:py-12 bg-white">
      <LandingContainer>
        <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-slate-900 tracking-tight m-0 text-center sm:text-left mb-6 sm:mb-8">
          {brand.whyChooseTitle || `Why Choose ${universityName} for Degree Courses`}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6">
              {whyChoose.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3 text-left">
                  {pt.image && (
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-lg p-1 bg-amber-50/50">
                      <Image src={pt.image} alt={pt.title} fill className="object-contain" sizes="48px" />
                    </div>
                  )}
                  <div className="space-y-1">
                    <h3
                      className="text-[14.5px] sm:text-[15.5px] font-bold tracking-tight m-0"
                      style={{ color: brand.primaryColor || "#084183" }}
                    >
                      {pt.title}
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-gray-600 leading-relaxed font-normal m-0 max-w-sm">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 text-center sm:text-left">
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="inline-flex items-center justify-center gap-1.5 font-bold text-[14px] px-6 py-2.5 rounded-md shadow-2xs transition-colors cursor-pointer border-none w-full sm:w-fit active:scale-95 hover:opacity-95"
                style={{
                  background: brand.accentColor || "#ffc107",
                  color: brand.primaryColor || "#08417b",
                }}
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[240px] sm:max-w-[300px] h-[240px] sm:h-[300px]">
              <Image
                src={studentImg}
                alt={`Why choose ${universityName}`}
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 260px, 340px"
                priority
              />
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
