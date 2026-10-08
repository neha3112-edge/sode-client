"use client";

import React from "react";
import Image from "next/image";

export default function RushfordProgrammes({
  programmes = [],
  brand = {},
  onOpenApply,
}) {
  const heading = brand.programmesTitle || "Specialisations At";
  const subHeading = brand.programmesSubtitle || brand.name || "";

  return (
    <section id="courses" className="py-12 sm:py-16 bg-[#ffffff] select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-medium text-[#111111] m-0">
            {heading}
          </h2>
          {subHeading && (
            <p className="text-[22px] sm:text-[28px] text-[#e0007a] font-bold mt-1 m-0">
              {subHeading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programmes.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[8px] overflow-hidden border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                {/* Multicolor Border strip */}
                <div
                  className="h-[8px] w-full"
                  style={{
                    background:
                      "linear-gradient(to right, #d77a85 25%, #ff0099 25% 50%, #ff5c57 50% 75%, #c2002f 75%)",
                  }}
                />
                <div className="p-5 sm:p-6">
                  <h3 className="text-[18px] sm:text-[19px] font-bold text-[#111111] mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-[13px] sm:text-[13.5px] text-[#555555] leading-relaxed mb-4">
                    {p.description || p.desc}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <hr className="border-t border-slate-200 mb-4" />
                <button
                  type="button"
                  onClick={() => onOpenApply?.(p.title)}
                  className="w-full py-2.5 px-4 bg-[#0cb1ef] text-white font-bold text-[14px] rounded-[20px] hover:brightness-95 transition-all border-none cursor-pointer shadow-xs active:scale-95"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
