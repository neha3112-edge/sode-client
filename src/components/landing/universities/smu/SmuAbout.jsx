"use client";

import React from "react";
import Image from "next/image";
import { smuImg } from "./constants";

export default function SmuAbout() {
  return (
    <section className="w-full bg-[#006372] text-white relative mt-12 lg:mt-16 select-none">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative">
        {/* Left Student Cutout - Locked strictly to bottom: 0 of teal banner, head pops up at top */}
        <div className="hidden lg:block absolute bottom-0 left-4 sm:left-6 w-[215px] xl:w-[235px] z-10 pointer-events-none">
          <Image
            src={smuImg("finance-smu.png")}
            alt="Sikkim Manipal University Online Student"
            width={350}
            height={536}
            sizes="(max-width: 1024px) 100vw, 235px"
            className="w-full h-auto object-contain object-bottom block"
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>

        {/* Content - text centered with left offset on desktop so student never overlaps */}
        <div className="lg:pl-[220px] xl:pl-[245px] py-8 lg:py-10 text-center flex flex-col items-center justify-center">
          <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold text-white tracking-tight leading-tight mb-3 text-center">
            About Sikkim Manipal University Online
          </h2>

          <div className="space-y-3 text-center text-white text-[13px] sm:text-[13.5px] leading-[1.5] sm:leading-[1.55] font-normal w-full max-w-4xl">
            <p className="m-0">
              Sikkim Manipal University (SMU)is one of the most prestigious private institutions which is known for its credible education for over 27 years. The university offers a wide range of programs across multiple domains.SMU Online offers flexible, UGC-entitled and NAAC A+ accredited online degree programs for learners across India.
            </p>
            <p className="m-0">
              Students get access to choose from Sikkim Manipal University courses which include BA, BCom, MCA, MA etc. Online MBA Sikkim Manipal University is crafted for working professionals and students. Learners get to interact with experienced faculty, a curriculum fulfilling present-day industry requirements, and advanced digital learning platforms. It enables them to gain recognised qualifications for career growth while studying anytime and anywhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
