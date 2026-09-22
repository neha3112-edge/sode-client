"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Download, ArrowRight } from "lucide-react";
import { Tabs, Button, Tag } from "antd";

export default function LandingProgrammes({
  programmes = [],
  universityName = "University Online",
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCourses = programmes.filter((c) => {
    if (activeTab === "all") return true;
    if (activeTab === "pg") return c.level?.toLowerCase().includes("post");
    if (activeTab === "ug") return !c.level?.toLowerCase().includes("post");
    return true;
  });

  const tabItems = [
    { key: "all", label: "All Programmes" },
    { key: "pg", label: "Postgraduate (PG)" },
    { key: "ug", label: "Undergraduate (UG)" },
  ];

  return (
    <section id="programmes" className="py-12 sm:py-16 bg-[#fafbfc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#08417b] tracking-tight m-0">
              {universityName} Degree Programmes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 m-0">
              UGC-entitled degrees with live classes, interactive LMS, and global recognition
            </p>
          </div>
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} className="programme-tabs" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => (
            <div key={c.id || c.code} className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <Image src={c.image} alt={c.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute top-2.5 right-2.5">
                    <Tag color="gold" className="font-bold text-[11px] px-2 py-0.5 rounded-md m-0 shadow-2xs">
                      {c.level}
                    </Tag>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-[#08417b] m-0 line-clamp-1">{c.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed m-0">{c.description}</p>
                </div>
              </div>
              <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2 mt-2">
                <Button
                  size="middle"
                  icon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
                  className="text-xs font-semibold rounded-md"
                >
                  Brochure
                </Button>
                <Button
                  type="primary"
                  size="middle"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  onClick={() => onOpenApply?.(c.code || c.title)}
                  className="bg-[#ffd200] hover:bg-[#ffc107] text-[#08417b] font-bold text-xs rounded-md border-none"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
