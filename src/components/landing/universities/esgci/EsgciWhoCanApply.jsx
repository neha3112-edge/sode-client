"use client";

import React from "react";
import Image from "next/image";
import { esgciImg, ESGCI_WHO_CAN_APPLY } from "./constants";

export default function EsgciWhoCanApply({ onOpenApply }) {
  return (
    <section id="whocanapply" className="w-full bg-white pt-4 sm:pt-6 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-[24px] sm:text-[28px] md:text-[34px] font-black text-black leading-tight m-0">
            Who Can Apply for the <span className="text-[#04903c]">ESGCI Online DBA</span>
          </h2>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {ESGCI_WHO_CAN_APPLY.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col"
            >
              {/* Card Image */}
              <div className="relative w-full aspect-[16/10] bg-gray-100">
                <Image
                  src={esgciImg(card.image)}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-neutral-900 m-0 mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-neutral-600 text-[13px] sm:text-[13.5px] leading-relaxed m-0 mb-6 font-normal">
                    {card.desc}
                  </p>
                </div>

                {/* Apply Now Button */}
                <div>
                  <button
                    type="button"
                    onClick={() => onOpenApply?.(card.title, "Apply Now")}
                    className="w-auto px-5 py-2 bg-[#04903c] hover:bg-[#037a33] text-white rounded-[4px] text-[13.5px] font-semibold transition-colors border-none cursor-pointer active:scale-98"
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

