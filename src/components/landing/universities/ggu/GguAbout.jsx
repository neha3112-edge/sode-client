"use client";

import React from "react";
import Image from "next/image";
import { gguImg } from "./constants";

export default function GguAbout({ onOpenScholarship }) {
  return (
    <section id="about" className="w-full bg-[#003468] select-none overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[460px] xl:min-h-[520px]">
        {/* Left Column: Navy Blue Text Content (Edge-to-Edge) */}
        <div className="lg:col-span-7 bg-[#003468] text-white flex flex-col justify-center py-10 sm:py-14 lg:py-16 px-6 sm:px-12 md:px-16 lg:pl-16 lg:pr-10 xl:pl-24 xl:pr-14">
          <div className="max-w-[620px]">
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-black uppercase tracking-wide text-white m-0 mb-1 leading-tight">
              ABOUT US
            </h2>
            <h3 className="text-[15.5px] sm:text-[17px] md:text-[18px] font-semibold text-neutral-200 m-0 mb-5">
              Golden Gate University San Francisco
            </h3>

            <p className="text-[12.5px] sm:text-[13px] md:text-[13.5px] leading-relaxed text-neutral-100 m-0 mb-4 font-normal">
              Founded in 1901, Golden Gate University (GGU) in San Francisco is a pioneer in practice-based education for adults. We focus exclusively on professional programs in business, law, and technology, designed for working students seeking to advance their careers. Flexible, accessible courses are taught by expert faculty who are industry leaders. GGU&apos;s mission is to empower a diverse student body through an education that is immediately applicable in the workplace, fostering success from day one.
            </p>

            <p className="text-[12.5px] sm:text-[13px] md:text-[13.5px] leading-relaxed text-neutral-100 m-0 mb-7 font-normal">
              With a strong emphasis on real-world experience, GGU also offers networking opportunities, career support, and specialized programs to help students achieve leadership roles and professional growth in their chosen fields.
            </p>

            <div>
              <button
                type="button"
                onClick={() => onOpenScholarship?.()}
                className="w-auto px-7 py-3 bg-[#DC520A] hover:bg-[#b84307] text-white rounded-[6px] text-[13.5px] sm:text-[14px] font-bold shadow-md transition-all cursor-pointer border-none active:scale-98"
              >
                Request Call Back
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Campus Image (Edge-to-Edge) */}
        <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[360px] lg:min-h-full bg-neutral-100">
          <Image
            src={gguImg("about-ggu.webp")}
            alt="Golden Gate University San Francisco Campus"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-top"
          />
        </div>
      </div>
    </section>
  );
}
