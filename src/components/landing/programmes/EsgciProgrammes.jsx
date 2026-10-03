"use client";

import React from "react";
import Image from "next/image";

export default function EsgciProgrammes({
  programmes = [],
  brand = {},
  onOpenApply,
}) {
  const heading = brand.programmesTitle || "Who Can Apply for the ESGCI Online DBA";

  return (
    <section id="whocanapply" className="py-12 sm:py-16 bg-[#ffffff] select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <h2 className="text-center text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-[#111111] mb-8 sm:mb-12">
          Who Can Apply for the <span className="text-[#04903c]">ESGCI Online DBA</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {programmes.map((p, idx) => (
            <div key={idx} className="bg-white rounded-[8px] overflow-hidden border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h2 className="text-[18px] sm:text-[20px] font-bold text-[#111111] mb-2 leading-snug">
                    {p.title}
                  </h2>
                  <p className="text-[13px] sm:text-[13.5px] text-[#555555] leading-relaxed mb-4">
                    {p.description}
                  </p>
                </div>
                <div>
                  <hr className="border-t border-slate-200 mb-4" />
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(p.title)}
                    className="w-full py-2.5 px-4 bg-[#fff000] text-black font-bold text-[14px] rounded-[5px] hover:brightness-95 transition-all border-none cursor-pointer"
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
