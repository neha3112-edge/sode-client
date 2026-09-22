"use client";

import React from "react";
import Image from "next/image";
import { Rate } from "antd";
import { Download } from "lucide-react";

export default function UniversityHero({
  uniName,
  data,
  uni,
  heroBannerUrl,
  mobileHeroBannerUrl,
  logoUrl,
  starRatingValue,
  numericRating,
  openFormModal,
}) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-[#0C2B4E] flex flex-col md:grid md:grid-cols-12 min-h-80 md:min-h-90">
      {/* Mobile Image (Top) / Desktop Image (Right) */}
      <div className="order-1 md:order-2 md:col-span-6 relative w-full h-64 sm:h-72 md:h-full overflow-hidden rounded-b-4xl md:rounded-l-4xl">
        {heroBannerUrl || mobileHeroBannerUrl ? (
          <>
            {heroBannerUrl && (
              <Image
                src={heroBannerUrl}
                alt={uniName}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover object-center ${
                  mobileHeroBannerUrl && mobileHeroBannerUrl !== heroBannerUrl ? "hidden md:block" : "block"
                }`}
                priority
              />
            )}
            {mobileHeroBannerUrl && mobileHeroBannerUrl !== heroBannerUrl && (
              <Image
                src={mobileHeroBannerUrl}
                alt={uniName}
                fill
                sizes="100vw"
                className="object-cover object-center block md:hidden"
                priority
              />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-[#0C2B4E]" />
        )}

        {/* University Logo Badge */}
        {logoUrl && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white rounded-xl shadow-md p-1.5 sm:p-2 flex items-center justify-center">
            <div className="relative w-11 h-11 sm:w-16 sm:h-16">
              <Image
                src={logoUrl}
                alt={uniName}
                fill
                sizes="(max-width: 640px) 44px, 64px"
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="order-2 md:order-1 md:col-span-6 text-white p-5 sm:p-7 md:py-9 md:px-9 flex flex-col justify-center space-y-3.5 md:space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white m-0 leading-tight">
            {uniName}
          </h1>
          {data.tagline && data.tagline !== uniName && (
            <p className="text-xs sm:text-sm text-blue-100/90 font-medium m-0 line-clamp-2">
              {data.tagline}
            </p>
          )}
        </div>

        {/* Rating Stars & Value */}
        <div className="flex items-center gap-2 pt-0.5">
          <Rate
            disabled
            allowHalf
            value={starRatingValue}
            className="text-amber-400 text-sm sm:text-base [&_.ant-rate-star]:mr-1"
          />
          <span className="text-xs sm:text-sm font-bold text-white bg-white/15 px-2 py-0.5 rounded-md">
            {numericRating.toFixed(1)} / 5.0
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 pt-2 w-full">
          <button
            type="button"
            onClick={() =>
              openFormModal({
                title: "Download University Brochure",
                university: uniName,
                action: "Download Brochure",
              })
            }
            className="flex-1 sm:flex-initial bg-[#E5A93C] hover:bg-[#D4982B] text-gray-950 font-bold px-2.5 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 text-center leading-tight whitespace-nowrap border-0"
          >
            <span>Download Brochure</span>
            <Download size={14} className="shrink-0" />
          </button>

          <button
            type="button"
            onClick={() =>
              openFormModal({
                title: "Get Free Expert Counseling",
                university: uniName,
                action: "Free Counseling",
              })
            }
            className="flex-1 sm:flex-initial bg-transparent border border-white/80 hover:bg-white/10 text-white font-semibold px-2.5 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-all cursor-pointer active:scale-95 flex items-center justify-center text-center leading-tight whitespace-nowrap"
          >
            Get 100% FREE Counseling
          </button>
        </div>
      </div>
    </div>
  );
}
