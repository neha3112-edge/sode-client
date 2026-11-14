"use client";

import React from "react";
import Image from "next/image";
import { smuImg } from "./constants";

export default function SmuLeader() {
  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a202c] tracking-tight">
            The Visionary Leader Behind Sikkim Manipal University Online
          </h2>
          <div className="w-20 h-1 bg-[#f58220] mx-auto mt-3 rounded-full" />
        </div>

        <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Bio & Text */}
            <div className="md:col-span-7 space-y-4">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Sikkim Manipal University is led by <strong className="text-[#074a76]">Dr. G. K. Prabhu</strong>, Vice Chancellor of SMU. He believes that there is the potential of changing lives through access to quality education. He points out that e-learning is no longer a matter of convenience in modern times. It is also a strategic, empowering power.
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Sikkim Manipal University ensures to provide academically rich education, student-centred degree programs which hold relevance in today&apos;s industries. These programs are aimed at providing students with the skills, knowledge and confidence to be able to fit in a fast-changing global world.
              </p>
              <div className="pt-3 border-t border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-[#074a76]">
                  Dr. GK Prabhu
                </h3>
                <p className="text-xs sm:text-sm text-[#f58220] font-semibold">
                  Vice Chancellor, Sikkim Manipal University
                </p>
              </div>
            </div>

            {/* Right Leader Photo */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white">
                <Image
                  src={smuImg("smu_leader.png")}
                  alt="Dr. GK Prabhu, Vice Chancellor, Sikkim Manipal University"
                  width={400}
                  height={450}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
