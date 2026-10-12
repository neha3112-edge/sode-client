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
    <section id="courses" className="py-10 sm:py-12 bg-[#ffffff] select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-7">
          <h2 className="text-[28px] sm:text-[32px] font-light text-[#111111] m-0 tracking-normal">
            {heading}
          </h2>
          {subHeading && (
            <p className="text-[14px] sm:text-[14.5px] text-[#333333] font-normal mt-1 m-0">
              {subHeading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {programmes.map((p, idx) => (
            <div
              key={idx}
              className="bg-[#F2F2F2] rounded-[10px] overflow-hidden border border-slate-200/90 shadow-[0_2px_6px_rgba(0,0,0,0.05)] flex flex-col justify-between hover:shadow-md transition-shadow group h-full"
            >
              <div>
                <div className="course-card-img-wrap relative w-full h-[165px] sm:h-[170px] overflow-hidden bg-slate-100">
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
                  className="h-[5px] w-full"
                  style={{
                    background:
                      "linear-gradient(to right, #d77a85 25%, #ff0099 25% 50%, #ff5c57 50% 75%, #c2002f 75%)",
                  }}
                />
                <div className="p-4 sm:p-5 pb-0 bg-[#F2F2F2]">
                  <h3 className="text-[19px] sm:text-[19.5px] font-normal text-[#111111] mb-2 leading-[1.25] min-h-[48px]">
                    {p.title}
                  </h3>
                  <p className="text-[14px] text-[#2b2b2b] leading-[1.4] mb-3 min-h-[58px]">
                    {p.description || p.desc}
                  </p>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-4 sm:pb-5 bg-[#F2F2F2]">
                <hr className="border-t border-slate-300/80 mb-3" />
                <button
                  type="button"
                  onClick={() => onOpenApply?.(p.title)}
                  className="py-2 px-6 bg-[#6C4AB6] hover:bg-[#58399e] text-white font-medium text-[15px] rounded-[6px] transition-all border-none cursor-pointer shadow-none active:scale-95 inline-block"
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
