"use client";

import React from "react";
import Image from "next/image";
import { liverpoolImg } from "./constants";

export default function LiverpoolApprovals() {
  const approvals = [
    {
      name: "WES Recognised",
      image: "Layer-36.png",
      width: 200,
      height: 85,
    },
    {
      name: "AACSB Member",
      image: "Layer-37.png",
      width: 200,
      height: 85,
    },
    {
      name: "2023 Gold Award",
      image: "Layer-39-1.png",
      width: 200,
      height: 85,
    },
  ];

  return (
    <section id="approvals" className="w-full bg-white pt-2 sm:pt-4 pb-10 sm:pb-14 select-none scroll-mt-20">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-[24px] sm:text-[30px] font-bold text-[#111111] leading-tight m-0 uppercase tracking-wide">
          Approvals &amp; Recognition <br />
          <span className="text-[#2de1c2]">Of Online Liverpool Business School</span>
        </h2>

        {/* Direct Images - No white boxes, no borders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-center justify-center max-w-[850px] mx-auto mt-8 sm:mt-10">
          {approvals.map((item, idx) => (
            <div key={idx} className="flex items-center justify-center p-3">
              <Image
                src={liverpoolImg(item.image)}
                alt={item.name}
                width={item.width}
                height={item.height}
                className="max-h-[75px] sm:max-h-[85px] w-auto object-contain transition-transform duration-200 hover:scale-105"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
