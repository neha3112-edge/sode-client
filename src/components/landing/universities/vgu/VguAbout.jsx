"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { vguImg } from "./constants";

export default function VguAbout({ onOpenApply }) {
  return (
    <section
      id="about"
      className="w-full bg-[#2b578c] py-12 sm:py-16 text-white scroll-mt-16 sm:scroll-mt-20 select-none overflow-hidden"
    >
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Campus Image - Pure image without borders or wrapper backgrounds */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-[500px] h-[220px] sm:h-[280px] lg:h-[320px] rounded-2xl overflow-hidden">
              <Image
                src={vguImg("about-image-vgu.webp")}
                alt="Vivekananda Global University Online Campus"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 500px, 500px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Text Content */}
          <div className="w-full lg:w-1/2 text-left">
            <h2 className="text-[#ffc107] font-bold text-2xl sm:text-3xl lg:text-[34px] leading-tight m-0 mb-3 sm:mb-4">
              About Vivekananda Global University Online
            </h2>

            <p className="text-white/95 text-xs sm:text-[13.5px] leading-snug m-0 mb-5 font-normal">
              Vivekananda Global University Online is one of the most preferred universities for
              online courses. With the NAAC A+ accreditation and UGC entitlement, the VGU online
              degree is valued and recognised worldwide. It provides a wide range of flexible and
              affordable online UG and PG courses for students interested in higher education. The
              Vivekananda Global University course admissions are fully online and accessible to
              all. The university combines expert faculty, academic excellence, modern learning,
              and industry-aligned online courses. Start your journey today with online VGU for a
              pathway that leads to your career goals.
            </p>

            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => onOpenApply?.("About Section Apply Now")}
                className="bg-[#ffc107] hover:bg-[#e0a800] text-black font-bold text-xs sm:text-sm py-2.5 px-7 rounded-md shadow-sm transition-all cursor-pointer border-none active:scale-95"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

