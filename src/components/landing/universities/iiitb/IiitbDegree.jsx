"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { IIITB_DEGREE, iiitbImg } from "./constants";

export default function IiitbDegree({ onOpenBrochure }) {
  return (
    <section id="sample-certificate" className="w-full bg-white py-12 sm:py-16 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Certificate Graphic */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[520px] aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-gray-200">
              <Image
                src={iiitbImg(IIITB_DEGREE.image)}
                alt={IIITB_DEGREE.title}
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-contain p-2 bg-neutral-900"
              />
            </div>
          </div>

          {/* Right: Info & Button */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="text-[26px] sm:text-[32px] md:text-[38px] font-black text-[#01519a] leading-tight m-0">
              Sample Post
              <br />
              Graduate Certificate
            </h2>

            <p className="text-neutral-600 text-[13.5px] sm:text-[14.5px] leading-relaxed m-0 mt-4 mb-6 font-normal">
              {IIITB_DEGREE.desc}
            </p>

            <button
              type="button"
              onClick={() => onOpenBrochure?.("Degree Sample CTA", "Get Degree")}
              className="py-3 px-8 rounded-lg bg-[#01519a] hover:bg-[#003f7a] text-white font-bold text-[14px] flex items-center justify-center gap-2 border-none shadow-md cursor-pointer active:scale-98 transition-all"
            >
              <span>{IIITB_DEGREE.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

