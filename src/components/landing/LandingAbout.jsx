"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "antd";

export default function LandingAbout({ about = {}, brand = {}, onOpenApply }) {
  const {
    title = "About University",
    text1,
    text2,
    text3,
  } = about;

  const imageSrc = brand.buildingAboutImage || "/assets/images/amity_building_about.png";

  return (
    <section id="about" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#08417b] tracking-tight m-0">
              {title}
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {text1 && <p className="m-0">{text1}</p>}
              {text2 && <p className="m-0">{text2}</p>}
              {text3 && <p className="m-0 font-medium text-slate-900">{text3}</p>}
            </div>

            <div className="pt-2">
              <Button
                type="primary"
                size="large"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => onOpenApply?.()}
                className="bg-[#ffd200] hover:bg-[#ffc107] text-[#08417b] font-bold text-xs sm:text-sm h-10 rounded-md border-none shadow-xs"
              >
                Know More & Apply
              </Button>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5">
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-md border border-slate-200">
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
