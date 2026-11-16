"use client";

import React from "react";
import { IIM_OVERVIEW } from "./constants";

export default function IimOverview() {
  return (
    <section className="w-full bg-white pt-10 sm:pt-14 pb-4 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[22px] sm:text-[28px] md:text-[32px] font-black text-neutral-900 leading-tight m-0 mb-3 sm:mb-4">
          {IIM_OVERVIEW.title}
        </h2>
        <p className="text-neutral-600 text-[13.5px] sm:text-[15px] leading-relaxed m-0 font-normal">
          {IIM_OVERVIEW.desc}
        </p>
      </div>
    </section>
  );
}

