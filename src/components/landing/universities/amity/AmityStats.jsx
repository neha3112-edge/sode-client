"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { amityImg } from "./constants";

const AMITY_STATS = [
  {
    id: "excellence",
    number: "30+",
    label: "Year Excellence",
    icon: amityImg("Number-1-amity.png"),
    alt: "Year Excellence",
  },
  {
    id: "partners",
    number: "500+",
    label: "Hiring Partners",
    icon: amityImg("Number-2-amity.png"),
    alt: "Hiring Partners",
  },
  {
    id: "learners",
    number: "82K+",
    label: "Online Learners",
    icon: amityImg("Number-3-amity.png"),
    alt: "Online Learners",
  },
  {
    id: "specializations",
    number: "60+",
    label: "In-Demand Specialization",
    icon: amityImg("Number-4-amity.png"),
    alt: "In-Demand Specialization",
  },
];

export default function AmityStats() {
  return (
    <section id="achievment" className="w-full bg-[#08417b] py-8 sm:py-10 text-white select-none">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center">
          {AMITY_STATS.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 sm:gap-4 justify-start sm:justify-center lg:justify-start"
            >
              {/* Stat Icon Circle */}
              <div className="relative w-[50px] h-[50px] sm:w-[62px] sm:h-[62px] lg:w-[68px] lg:h-[68px] shrink-0">
                <Image
                  src={item.icon}
                  alt={item.alt}
                  fill
                  sizes="68px"
                  className="object-contain"
                />
              </div>

              {/* Stat Text */}
              <div className="flex flex-col text-left">
                <h3 className="text-white font-bold text-[28px] sm:text-[34px] lg:text-[38px] leading-none m-0 tracking-tight">
                  {item.number}
                </h3>
                <p className="text-white text-[11.5px] sm:text-[12.5px] lg:text-[13px] font-normal leading-tight mt-1 m-0">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

