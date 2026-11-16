"use client";

import React from "react";
import Image from "next/image";
import { IIM_PARTNERS, iimImg } from "./constants";

export default function IimPlacements() {
  return (
    <section className="w-full bg-white py-6 sm:py-10 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f4f5f7] rounded-[18px] p-6 sm:p-8 text-center">
          <h2 className="text-[20px] sm:text-[24px] font-black text-[#2B2146] uppercase m-0 mb-6 tracking-wide">
            PLACEMENTS PARTNERS
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 items-center">
            {IIM_PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-2.5 sm:p-3 shadow-2xs flex items-center justify-center h-[54px] sm:h-[60px] hover:shadow-xs transition-shadow"
              >
                <Image
                  src={iimImg(partner.image)}
                  alt={partner.name}
                  width={110}
                  height={40}
                  className="max-h-[36px] w-auto object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

