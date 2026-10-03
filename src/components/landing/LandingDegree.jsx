"use client";

import React from "react";
import Image from "next/image";
import { Carousel } from "antd";
import LandingContainer from "./LandingContainer";

export default function LandingDegree({
  degreeInfo = {},
  brand = {},
  onOpenApply,
}) {
  if (!degreeInfo || Object.keys(degreeInfo).length === 0) return null;

  const {
    title = "Globally Accepted\nOnline Vivekananda Global University\nDegree",
    description = "",
    features = [],
    buttonText = "Get Your Degree",
    image = "/assets/vgu/sample-degree-vgu.webp",
    images = null,
  } = degreeInfo;

  const isLiverpool =
    brand.degreeLayout === "liverpool" || brand.slug === "liverpool";

  if (isLiverpool) {
    const certImages = images && images.length > 0 ? images : [image];
    return (
      <section
        id="view-sample-degree"
        className="mba-journey-cert-wrapper select-none py-14 sm:py-18 bg-[#0b2154] text-white scroll-mt-20"
      >
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Side - Slider Container */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[460px]">
                <Carousel autoplay autoplaySpeed={3000} dots={true}>
                  {certImages.map((imgSrc, idx) => (
                    <div key={idx} className="relative w-full h-[280px] sm:h-[350px] rounded-[6px] overflow-hidden flex items-center justify-center p-2">
                      <Image
                        src={imgSrc}
                        alt={`Certificate ${idx + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>

            {/* Right Side - Info */}
            <div className="lg:col-span-6">
              <h2 className="text-[26px] sm:text-[32px] font-bold text-[#00e5d1] mb-2 leading-snug m-0">
                {degreeInfo.headingTeal || "LBS MBA Pathway + IIM Udaipur"}
              </h2>
              <h3 className="text-[20px] sm:text-[24px] font-semibold text-white mb-4 m-0">
                {degreeInfo.subHeading || "Double Certification Edge"}
              </h3>
              <div className="text-[14px] sm:text-[15px] text-white/90 leading-relaxed space-y-3 mb-6">
                <p className="m-0">{description}</p>
              </div>
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="px-7 py-3 bg-[#ff8c32] hover:bg-[#e07520] active:scale-95 text-white font-bold text-[15px] rounded-[6px] transition-all border-none cursor-pointer inline-flex items-center gap-2 shadow-lg"
              >
                <span>{buttonText || "Get Degree"}</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isGgu =
    brand.degreeLayout === "ggu" ||
    brand.slug === "ggu";

  const isImageLeft =
    brand.degreeLayout === "imageLeft" ||
    isGgu;

  const titleColor = brand.degreeTitleColor || (isGgu ? "#003468" : "#811811");
  const btnBg = brand.degreeBtnBg || (isGgu ? "#DC520A" : "#ffc107");
  const btnTextColor = brand.degreeBtnTextColor || (isGgu ? "#ffffff" : "#020617");

  return (
    <section
      id="degree"
      className={`select-none ${
        isGgu ? "bg-[#F6F6F6] pt-2 pb-14 sm:pb-16" : "py-12 sm:py-16 bg-[#f4f7fb]"
      }`}
    >
      <LandingContainer>
        <div className="bg-white rounded-[20px] sm:rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100/80 p-6 sm:p-10 lg:p-12 max-w-[1140px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image Column */}
            <div
              className={`lg:col-span-5 flex justify-center ${
                isImageLeft ? "order-1 lg:order-1" : "order-2 lg:order-2"
              }`}
            >
              {images && images.length > 1 ? (
                <div className="w-full max-w-[340px] sm:max-w-[420px]">
                  <Carousel autoplay autoplaySpeed={3000} dots={true}>
                    {images.map((imgSrc, idx) => (
                      <div key={idx} className="relative w-full h-[250px] sm:h-[300px] rounded-[10px] overflow-hidden shadow-lg border border-slate-200 bg-white">
                        <Image
                          src={imgSrc}
                          alt={`Sample Degree ${idx + 1}`}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 1024px) 340px, 420px"
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              ) : (
                <div className="relative w-full max-w-[340px] sm:max-w-[420px] h-[250px] sm:h-[300px] rounded-[10px] overflow-hidden shadow-lg border border-slate-200 bg-white">
                  <Image
                    src={image}
                    alt="Sample Degree"
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 1024px) 340px, 420px"
                  />
                </div>
              )}
            </div>

            {/* Text / Features Column */}
            <div
              className={`lg:col-span-7 text-left ${
                isImageLeft ? "order-2 lg:order-2" : "order-1 lg:order-1"
              }`}
            >
              <h2
                className="text-[22px] sm:text-[26px] lg:text-[29px] font-bold leading-tight tracking-tight whitespace-pre-line m-0 mb-3"
                style={{ color: titleColor }}
              >
                {title}
              </h2>

              {description && (
                <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed font-normal mb-5">
                  {description}
                </p>
              )}

              <div className="space-y-3 sm:space-y-3.5">
                {features.map((feat, idx) => {
                  if (isGgu || !feat.title) {
                    return (
                      <div key={idx} className="flex items-start gap-2.5 sm:gap-3">
                        <span className="w-[18px] h-[18px] rounded-[3px] bg-[#DC520A] text-white flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-black select-none">
                          ✓
                        </span>
                        <p className="text-[12.5px] sm:text-[13.5px] text-[#222222] font-semibold leading-relaxed m-0">
                          {feat.desc || feat.title}
                        </p>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="flex items-start gap-3 sm:gap-3.5">
                      <div className="relative w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5">
                        <Image
                          src={feat.icon || "/assets/all_universities_images/ggu/learning-outcone-icon.webp"}
                          alt="Icon"
                          fill
                          className="object-contain"
                          sizes="24px"
                        />
                      </div>
                      <div>
                        {feat.title && (
                          <h4 className="text-[14.5px] sm:text-[15.5px] font-bold text-slate-900 leading-tight m-0 mb-1">
                            {feat.title}
                          </h4>
                        )}
                        <p className="text-[12px] sm:text-[13px] text-slate-600 leading-relaxed font-normal m-0">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onOpenApply?.()}
                  className="inline-flex items-center justify-center font-bold text-[14px] px-7 py-2.5 rounded-[6px] shadow-xs active:scale-95 transition-all cursor-pointer border-none"
                  style={{ backgroundColor: btnBg, color: btnTextColor }}
                >
                  <span>{buttonText}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
