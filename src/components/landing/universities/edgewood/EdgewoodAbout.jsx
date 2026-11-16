"use client";

import React from "react";
import Image from "next/image";
import { edgewoodImg } from "./constants";

export default function EdgewoodAbout({ onOpenApply }) {
  const bgUrl = edgewoodImg("about-bg-image-edgewood.webp");

  return (
    <section
      id="about"
      className="relative w-full text-white py-14 sm:py-20 px-4 sm:px-6 select-none scroll-mt-20 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.65), rgba(10, 10, 10, 0.75)), url(${bgUrl})`,
      }}
    >
      <div className="relative z-10 max-w-[1060px] mx-auto text-center">
        {/* Underlined Heading */}
        <h2 className="text-white font-extrabold text-[24px] sm:text-[30px] md:text-[34px] leading-tight m-0 mb-4 sm:mb-5">
          <span className="border-b-2 border-white pb-1 inline-block">
            About Edgewood University Online
          </span>
        </h2>

        {/* Centered Description Text */}
        <p className="text-white/95 text-[12.5px] sm:text-[13.5px] leading-relaxed max-w-[860px] mx-auto m-0 mb-8 sm:mb-12">
          Edgewood University Online is a US-based university that was established in 1927, and the university is located in Madison. With 95+ years of excellence, the university is one that offers career-focused learning. The university has the approval of ACBSP, HLC, which make sure the education provided by Edgewood University Online is globally competitive. The university offers a dual program in Edgewood University Online MBA + DBA, and the university also provides a management degree, which is called Edgewood University Online MBA. Through their flexible programs, students can get an industry-relevant curriculum, faculty support, and a learning model built for working professionals.
        </p>

        {/* Center Aerial Campus Image with overlapping Red Button */}
        <div className="relative max-w-[760px] sm:max-w-[820px] mx-auto pb-4">
          <div className="w-full rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl">
            <Image
              src={edgewoodImg("edegewood-about-image.webp")}
              alt="Edgewood University Campus Aerial"
              width={1415}
              height={565}
              sizes="(max-width: 1024px) 100vw, 820px"
              className="w-full h-auto object-cover block"
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          {/* Overlapping Red Button */}
          <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 z-20 w-max">
            <button
              type="button"
              onClick={() => onOpenApply?.("About Section", "Get FREE Career Counseling")}
              className="inline-flex items-center justify-center bg-[#b2171e] hover:bg-[#991319] text-white font-bold text-[13.5px] sm:text-[14.5px] px-7 sm:px-9 py-2.5 sm:py-3 rounded-full cursor-pointer border-none shadow-xl transition-all active:scale-95"
            >
              Get FREE Career Counseling
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
