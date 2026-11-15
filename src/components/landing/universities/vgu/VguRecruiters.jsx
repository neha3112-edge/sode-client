"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { vguImg } from "./constants";

export default function VguRecruiters() {
  return (
    <section className="w-full bg-white py-10 sm:py-14 select-none text-center border-t border-b border-gray-100">
      <Container>
        {/* Banner Pill Title */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-[#811811] text-white font-bold text-base sm:text-lg md:text-xl py-2 px-6 sm:px-8 rounded-lg shadow-xs inline-block">
            Top Recruiters at VGU Online
          </div>
        </div>

        {/* Desktop Image */}
        <div className="hidden sm:flex justify-center w-full max-w-5xl mx-auto">
          <Image
            src={vguImg("placement-partner-vgu.webp")}
            alt="Top Recruiters at Vivekananda Global University Online"
            width={1200}
            height={400}
            className="w-full h-auto object-contain"
            sizes="(max-width: 1024px) 100vw, 1000px"
          />
        </div>

        {/* Mobile Image */}
        <div className="flex sm:hidden justify-center w-full max-w-md mx-auto">
          <Image
            src={vguImg("hairing-partner-vgu-mobile.webp")}
            alt="Top Recruiters at Vivekananda Global University Online"
            width={600}
            height={800}
            className="w-full h-auto object-contain"
            sizes="100vw"
          />
        </div>
      </Container>
    </section>
  );
}

