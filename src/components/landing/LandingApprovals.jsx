"use client";

import React from "react";
import Image from "next/image";
import { Tag } from "antd";

export default function LandingApprovals({ approvals = [] }) {
  if (!approvals || approvals.length === 0) return null;

  return (
    <section id="approvals" className="py-7 sm:py-9 bg-[#fffef5] border-b border-amber-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 sm:gap-y-7 gap-x-5 lg:gap-x-7 items-center">
          {approvals.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5 group">
              {/* Circular Logo Card */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 shadow-2xs rounded-full overflow-hidden bg-white p-1 border border-amber-200/50 group-hover:scale-105 transition-transform duration-200">
                <Image
                  src={item.image}
                  alt={item.text}
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                />
              </div>

              {/* Description and Pill Tag */}
              <div className="space-y-1">
                {item.tag && (
                  <Tag color="blue" className="!text-[10px] !font-bold !px-1.5 !py-0 !m-0 !rounded-xs">
                    {item.tag}
                  </Tag>
                )}
                <p className="text-xs sm:text-[13px] font-medium text-slate-800 leading-snug m-0">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
