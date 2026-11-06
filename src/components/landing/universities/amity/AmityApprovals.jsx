"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { amityImg } from "./constants";

const APPROVALS_DATA = [
  {
    image: amityImg("Ugc-approval.png"),
    text: "Approved by the University Grants Commission of India",
  },
  {
    image: amityImg("NaacA+-approval.png"),
    text: "NAAC Accredited with A+ Grade",
  },
  {
    image: amityImg("NIRF-Approval.png"),
    text: "Ranked 32nd in NIRF (National Institutional Ranking Framework)",
  },
  {
    image: amityImg("AICTE-Approval.png"),
    text: "Approved by All India Council for Technical Education",
  },
  {
    image: amityImg("THE-approval.png"),
    text: "Recognised by The World University Rankings (THE)",
  },
  {
    image: amityImg("QS-approval.png"),
    text: "Ranked by QS (Quacquarelli Symonds)",
  },
  {
    image: amityImg("WES-Approval.png"),
    text: "Recognised by World Education Services (WES)",
  },
  {
    image: amityImg("WASc-approval.png"),
    text: "Accredited by Western Association of Schools and Colleges (WASC)",
  },
];

export default function AmityApprovals() {
  return (
    <section id="approvals" className="w-full scroll-mt-16 sm:scroll-mt-20">
      {/* 1. Yellow Header Bar */}
      <div className="w-full bg-[#ffd605] py-2.5 sm:py-3.5 text-center">
        <Container>
          <h2 className="text-[#212529] font-bold text-[18px] sm:text-[22px] md:text-[24px] leading-tight m-0 select-none">
            Amity University Online
            <br />
            Recognition and Approvals
          </h2>
        </Container>
      </div>

      {/* 2. Light Cream Approvals Content Area */}
      <div className="w-full bg-[#fff5c4] py-6 sm:py-7 lg:py-8 border-b border-[#ffe885]/40">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-7 gap-y-5 sm:gap-y-6 items-center">
            {APPROVALS_DATA.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 sm:gap-3.5 min-w-0"
              >
                {/* Approval Logo (Already has circular golden border in the image) */}
                <div className="relative w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] shrink-0 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.text}
                    width={68}
                    height={68}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Description Text */}
                <p className="text-[#111111] text-[11px] sm:text-[12.5px] lg:text-[13px] font-normal sm:font-medium leading-[1.25] m-0">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}

