"use client";

import React from "react";
import Image from "next/image";
import { liverpoolImg } from "./constants";

export default function LiverpoolStandOut() {
  const leftCards = [
    {
      icon: "👤",
      title: (
        <>
          Integrated Credentials <br className="hidden sm:inline" />
          Advantage(LBS- IIM U)
        </>
      ),
    },
    {
      icon: "🎓",
      title: (
        <>
          Global Alumni <br className="hidden sm:inline" />
          Connect
        </>
      ),
    },
    {
      icon: "📝",
      title: (
        <>
          Career-Focused <br className="hidden sm:inline" />
          Customised Curriculum
        </>
      ),
    },
  ];

  const rightCards = [
    {
      icon: "💼",
      title: (
        <>
          Industry-Relevant Learning <br className="hidden sm:inline" />
          through Case Studies
        </>
      ),
    },
    {
      icon: "💰",
      title: "Pursue Global Business Education With Cost-Effective Learning Benefits",
    },
    {
      icon: "🌍",
      title: (
        <>
          Worldwide Learning <br className="hidden sm:inline" />
          Network
        </>
      ),
    },
  ];

  return (
    <section
      id="why-choose"
      className="mba-offer-section w-full py-12 sm:py-16 select-none scroll-mt-20 text-white relative overflow-hidden"
      style={{
        background: "radial-gradient(circle at 50% 50%, #2854a8 0%, #1d3a7a 100%)",
        backgroundColor: "#203a7a",
      }}
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <h2 className="text-center text-[26px] sm:text-[34px] font-bold mb-8 sm:mb-12 leading-tight m-0 text-white">
          What Makes <br />
          <span className="text-[#2de1c2]">Liverpool Business School MBA Stand Out?</span>
        </h2>

        {/* Content Wrapper: 3 Columns on Desktop, 1 Column on Mobile */}
        <div className="content-wrapper grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] items-center gap-6 lg:gap-8">
          {/* Left Column: 3 Cards */}
          <div className="info-column flex flex-col gap-4 sm:gap-5 w-full">
            {leftCards.map((card, idx) => (
              <div
                key={idx}
                className="info-card bg-white text-black rounded-[12px] p-5 sm:p-6 flex items-center gap-4 shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="icon text-[26px] sm:text-[28px] text-[#1bc9a4] shrink-0 leading-none select-none">
                  {card.icon}
                </span>
                <p className="text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug m-0">
                  {card.title}
                </p>
              </div>
            ))}
          </div>

          {/* Center Column: Woman Model (Hidden on Mobile < lg as per original site) */}
          <div className="center-image hidden lg:flex items-center justify-center w-full h-[360px] sm:h-[420px] select-none pointer-events-none">
            <Image
              src={liverpoolImg("standout-woman.png")}
              alt="Liverpool Business School MBA Model"
              width={340}
              height={420}
              className="h-full w-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Right Column: 3 Cards */}
          <div className="info-column flex flex-col gap-4 sm:gap-5 w-full">
            {rightCards.map((card, idx) => (
              <div
                key={idx}
                className="info-card bg-white text-black rounded-[12px] p-5 sm:p-6 flex items-center gap-4 shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="icon text-[26px] sm:text-[28px] text-[#1bc9a4] shrink-0 leading-none select-none">
                  {card.icon}
                </span>
                <p className="text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug m-0">
                  {card.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
