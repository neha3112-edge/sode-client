"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { MANIPAL_OFFERS } from "./constants";

export default function ManipalOffers() {
  return (
    <section
      id="offers"
      className="w-full py-7 sm:py-9 select-none"
      style={{
        background: "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)",
      }}
    >
      <Container>
        {/* Section Heading */}
        <h2 className="text-white font-bold text-[22px] sm:text-[25px] md:text-[28px] leading-tight text-center m-0 mb-5 sm:mb-6 max-w-[850px] mx-auto">
          {MANIPAL_OFFERS.heading}
        </h2>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-[1100px] mx-auto text-left">
          {/* Card 1 */}
          <div className="flex flex-col">
            <h3 className="text-[#ffd200] font-bold text-[15.5px] sm:text-[16.5px] leading-snug m-0 mb-1.5">
              {MANIPAL_OFFERS.card1.title}
            </h3>
            <p className="text-white text-[13px] sm:text-[13.5px] leading-[1.38] m-0 font-normal opacity-95">
              {MANIPAL_OFFERS.card1.description}
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col">
            <h3 className="text-[#ffd200] font-bold text-[15.5px] sm:text-[16.5px] leading-snug m-0 mb-1.5">
              {MANIPAL_OFFERS.card2.title}
            </h3>
            <p className="text-white text-[13px] sm:text-[13.5px] leading-[1.38] m-0 font-normal opacity-95">
              {MANIPAL_OFFERS.card2.description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

