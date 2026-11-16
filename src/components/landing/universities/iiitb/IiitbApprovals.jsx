"use client";

import React from "react";
import Image from "next/image";
import { IIITB_APPROVALS, iiitbImg } from "./constants";

export default function IiitbApprovals() {
  return (
    <section id="approvals" className="w-full bg-[#212121] py-12 sm:py-16 text-white select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Column: Trophy & Title */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left shrink-0 min-w-[260px]">
            <div className="mb-2">
              <Image
                src={iiitbImg("award-icon.webp")}
                alt="Approvals & Accreditation Trophy"
                width={150}
                height={150}
                className="w-28 sm:w-36 lg:w-[150px] h-auto object-contain"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-black text-white leading-tight m-0">
              Approvals &amp;
              <br className="hidden sm:inline" /> Accreditation
            </h2>
          </div>

          {/* Vertical Divider (Desktop) */}
          <div className="hidden lg:block w-[1px] self-stretch bg-neutral-700 mx-2" />

          {/* Right Column: 4 Approval Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-9 flex-1">
            {IIITB_APPROVALS.map((item) => (
              <div key={item.id} className="flex items-center gap-4.5">
                {/* Logo without circular background & larger size */}
                <div className="w-18 h-18 sm:w-22 sm:h-22 shrink-0 flex items-center justify-center">
                  <Image
                    src={iiitbImg(item.image)}
                    alt={item.title}
                    width={90}
                    height={90}
                    className="w-full h-auto max-h-[85px] object-contain"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-white m-0 mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-neutral-300 text-[12px] sm:text-[12.5px] leading-relaxed m-0 font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

