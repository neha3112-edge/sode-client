"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "antd";

export default function LandingAdmissionProcess({
  admissionSteps = [],
  universityName = "University Online",
  onOpenApply,
}) {
  if (!admissionSteps || admissionSteps.length === 0) return null;

  return (
    <section id="process" className="py-12 sm:py-16 bg-[#fafbfc] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-center text-[#08417b] tracking-tight mb-2 m-0">
          Admission Process in {universityName}
        </h2>
        <p className="text-xs sm:text-sm text-center text-slate-600 mb-8 sm:mb-12 max-w-xl mx-auto m-0">
          Simple, transparent, and completely digital 6-step online admission pathway
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {admissionSteps.map((step) => (
            <div
              key={step.num}
              className={`${step.cardBg || "bg-white"} p-4 rounded-xl border ${
                step.borderColor || "border-slate-200"
              } ${step.bottomBorder || "border-b-4 border-blue-600"} shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow`}
            >
              <div>
                <div
                  className={`w-8 h-8 rounded-full border-2 ${
                    step.borderColor || "border-blue-600"
                  } flex items-center justify-center font-black text-sm ${
                    step.themeColor || "text-blue-600"
                  } mb-3`}
                >
                  {step.num}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1 leading-snug m-0">
                  {step.title}
                </h3>
                <p className="text-[11.5px] text-slate-600 leading-normal m-0">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            type="primary"
            size="large"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={() => onOpenApply?.()}
            className="!bg-[#08417b] hover:!bg-[#063366] !text-white !font-bold !text-xs sm:!text-sm !h-10 !rounded-md !border-none !shadow-sm"
          >
            Start Your Application
          </Button>
        </div>
      </div>
    </section>
  );
}
