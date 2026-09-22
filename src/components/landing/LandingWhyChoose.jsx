"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "antd";

export default function LandingWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const universityName = brand.name || "University Online";
  const studentImg = brand.whyChooseStudentImage || "/assets/images/why_choose_student.png";

  return (
    <section id="whychoose" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight mb-8 sm:mb-10 m-0">
          Why Choose {universityName} for Degree Courses
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Feature Cards */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
              {whyChoose.map((pt, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-[#08417b] tracking-tight m-0">
                    {pt.title}
                  </h3>
                  <p className="text-[11.5px] sm:text-xs text-slate-700 leading-relaxed font-normal m-0">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button
                type="primary"
                size="large"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => onOpenApply?.()}
                className="!bg-[#ffd200] hover:!bg-[#ffc107] !text-[#08417b] !font-bold !text-xs sm:!text-sm !h-10 !rounded-md !border-none !shadow-xs"
              >
                Apply Now
              </Button>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm h-72 sm:h-96">
              <Image
                src={studentImg}
                alt={`Students of ${universityName}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
