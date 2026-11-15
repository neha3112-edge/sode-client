"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { shooliniImg } from "./constants";

export default function ShooliniRecruiters() {
  return (
    <section id="recruiters" className="w-full py-12 sm:py-16 bg-white select-none">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold tracking-tight m-0 text-gray-900">
            <span className="text-[#fd202a]">Top Recruiters of</span>{" "}
            Shoolini University Online
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
            Our graduates are hired by leading Fortune 500 corporations and fast-growing global brands.
          </p>
        </div>

        {/* Desktop Partners Banner */}
        <div className="hidden md:flex justify-center max-w-5xl mx-auto">
          <div className="w-full">
            <Image
              src={shooliniImg("partiner-desktop.webp")}
              alt="Top Recruiters of Shoolini University Online"
              width={1200}
              height={180}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Mobile Partners Banner */}
        <div className="flex md:hidden justify-center max-w-xs sm:max-w-sm mx-auto">
          <div className="w-full">
            <Image
              src={shooliniImg("partner-mobile.webp")}
              alt="Top Recruiters of Shoolini University Online"
              width={500}
              height={400}
              sizes="100vw"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

