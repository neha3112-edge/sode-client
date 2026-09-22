"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

export default function UniversityWhyChoose({
  whyChooseSection = { title: "", items: [] },
  uniName,
}) {
  const items = whyChooseSection?.items || [];
  if (!items || items.length === 0) return null;

  return (
    <div
      id="why-choose-us"
      className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 sm:p-8 space-y-6"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-7 text-center">
        {whyChooseSection.title || `Why Choose ${uniName}`}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-blue-100/80 bg-blue-50/20 p-5 text-center hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-3 shadow-2xs"
          >
            <div className="w-14 h-14 rounded-2xl bg-white text-[#0D5CAD] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs relative overflow-hidden">
              {item.iconUrl ? (
                <Image
                  src={getAssetPath(item.iconUrl)}
                  alt={item.title}
                  fill
                  sizes="56px"
                  className="object-contain p-2.5"
                />
              ) : (
                <CheckCircle2 size={26} className="text-[#0077B6]" />
              )}
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-gray-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
