"use client";

import { Container } from "@/components/ui/container";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

export function Stats() {
  const stats = [
    {
      value: "50%",
      label: "Avg. Salary Hike",
      icon: "/assets/images/salary-hike-logo.jpg",
    },
    {
      value: "15K+",
      label: "Professionals Enrolled",
      icon: "/assets/images/professional-enrolled-logo.jpg",
    },
    {
      value: "50+",
      label: "Certification Courses",
      icon: "/assets/images/certification-logo.jpg",
    },
    {
      value: "20+",
      label: "IIT, IIM, Global University",
      icon: "/assets/images/global-university-logo.jpg",
    },
  ];

  return (
    <section id="stats" className="w-full bg-linear-to-r from-[#EEC471] via-[#F3CD73] to-[#FADA9A] py-5 md:py-10 shadow-md relative z-10">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center max-w-6xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 md:gap-4 justify-start pl-4 md:pl-2"
            >
              {/* Icon Circle */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 overflow-hidden relative">
                <Image
                  src={getAssetPath(stat.icon)}
                  alt={stat.label}
                  fill
                  sizes="(max-width: 768px) 48px, 56px"
                  className="object-contain p-2 rounded-full"
                />
              </div>

              {/* Text Block */}
              <div className="flex flex-col leading-tight text-[#1d3557]">
                <span className="text-2xl md:text-5xl font-extrabold">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm font-semibold italic">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Stats;
