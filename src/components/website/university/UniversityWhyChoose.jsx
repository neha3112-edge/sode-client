"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function UniversityWhyChoose({
  whyChooseList,
  uniName,
}) {
  if (!whyChooseList || whyChooseList.length === 0) return null;

  return (
    <div
      id="why-choose-us"
      className="scroll-mt-16 bg-white rounded-2xl shadow-xs border border-gray-200 p-6 sm:p-10 space-y-6"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-5 text-center">
        Why Choose {uniName}?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {whyChooseList.map((item, idx) => (
          <div
            key={item._id || idx}
            className="p-4 rounded-xl border border-gray-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all flex items-start gap-3 shadow-2xs group"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 m-0">
                {item.title || item.heading || `Advantage ${idx + 1}`}
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-600 m-0 leading-relaxed font-normal">
                {item.description || item.text || item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
