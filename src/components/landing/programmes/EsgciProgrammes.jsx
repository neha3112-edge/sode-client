"use client";

import React from "react";
import Image from "next/image";

export default function EsgciProgrammes({
  programmes = [],
  brand = {},
  onOpenApply,
}) {
  const heading = brand.programmesTitle || "Who Can Apply for the";
  const highlight = brand.programmesHighlight || "ESGCI Online DBA";

  return (
    <section id="whocanapply" className="py-12 sm:py-16 bg-[#ffffff] select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <h2 className="text-center text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-[#111111] mb-8 sm:mb-12">
          {heading}{" "}
          <span className="text-[#04903c] bg-[#e9f8ef] px-2 py-0.5 rounded-[3px]">
            {highlight}
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {programmes.map((p, idx) => (
            <div
              key={idx}
              className="programme-card bg-[#f5f5f5] rounded-[4px] overflow-hidden border-none shadow-none flex flex-col justify-between text-left"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-[#111111] mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-[13px] sm:text-[13.5px] text-[#222222] leading-relaxed mb-4">
                    {p.description}
                  </p>
                </div>
                <div>
                  <hr className="border-t border-[#d8d8d8] mb-4" />
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(p.title)}
                    className="programme-apply-btn py-2 px-5 bg-[#04903c] text-white font-bold text-[14px] rounded-[4px] hover:bg-[#037c34] transition-all border-none cursor-pointer w-auto inline-block"
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
