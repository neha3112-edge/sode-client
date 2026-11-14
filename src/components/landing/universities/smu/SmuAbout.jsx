"use client";

import React from "react";
import Image from "next/image";
import { smuImg } from "./constants";

export default function SmuAbout() {
  return (
    <section className="bg-[#005a69] text-white py-12 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Student Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 flex items-center justify-center bg-[#004e5b]">
              <Image
                src={smuImg("university.webp")}
                alt="About Sikkim Manipal University Online"
                width={500}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full text-[#ffc107]">
              Academic Legacy
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              About Sikkim Manipal University Online
            </h2>
            <div className="w-16 h-1 bg-[#ffb100] rounded-full" />
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              Sikkim Manipal University (SMU) is one of the most prestigious private institutions which is known for its credible education for over 27 years. The university offers a wide range of programs across multiple domains. SMU Online offers flexible, UGC-entitled and NAAC A+ accredited online degree programs for learners across India.
            </p>
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              Students get access to choose from Sikkim Manipal University courses which include BA, BCom, MCA, MA etc. Online MBA Sikkim Manipal University is crafted for working professionals and students. Learners get to interact with experienced faculty, a curriculum fulfilling present-day industry requirements, and advanced digital learning platforms. It enables them to gain recognised qualifications for career growth while studying anytime and anywhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
