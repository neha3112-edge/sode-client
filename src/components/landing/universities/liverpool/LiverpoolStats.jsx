"use client";

import React from "react";

export default function LiverpoolStats() {
  const items = [
    {
      title: "Eligibility",
      desc: "Bachelor's degree +2 years of experience",
      icon: (
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#00bcd4] fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
        </svg>
      ),
    },
    {
      title: "Duration:",
      desc: "18 months",
      icon: (
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#00bcd4]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 15" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Faculty:",
      desc: "Leading industry experts",
      icon: (
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#00bcd4] fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
        </svg>
      ),
    },
    {
      title: "Level",
      desc: "Postgraduate Degree",
      icon: (
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#00bcd4] fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M19 2H6c-1.2 0-2 .8-2 2v16c0 1.2.8 2 2 2h13c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6c-.55 0-1-.45-1-1s.45-1 1-1h12v2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#f6f8fa] py-8 sm:py-10 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center"
            >
              {/* Solid Cyan Icon without box/circle */}
              <div className="mb-2 flex items-center justify-center">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-[17px] sm:text-[19px] font-black text-[#333333] tracking-tight leading-snug m-0 mb-1">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[12.5px] sm:text-[13.5px] text-[#666666] font-normal m-0 leading-snug max-w-[220px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
