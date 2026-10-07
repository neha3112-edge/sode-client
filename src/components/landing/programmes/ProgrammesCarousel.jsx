"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Carousel, Card, Button } from "antd";
import { Download, ChevronLeft, ChevronRight, Hourglass } from "lucide-react";
import { FaDownload } from "react-icons/fa";

export default function ProgrammesCarousel({
  programmes = [],
  universityName = "University Online",
  brand = {},
  title = "Online Degree Courses",
  intervalTime = 3500,
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  const carouselRef = useRef(null);
  const isSmu = brand.programmesLayout === "smu-cards" || brand.slug === "smu";
  const isClean = brand.programmesCardStyle === "clean" || brand.programmesCardStyle === "card" || Boolean(brand.programmesPrefix);

  const displayUniversity = (universityName || brand.name || "University Online").replace(/\s+Online$/i, "").trim();

  const slidesToShow = isClean || isSmu ? 3 : 4;

  return (
    <section
      id={isSmu ? "programs" : "programmes"}
      className={`w-full overflow-hidden relative select-none transition-colors ${
        isSmu ? "pt-10 pb-12 sm:pt-12 sm:pb-14 text-slate-900" : "py-6 sm:py-8 lg:py-10"
      }`}
      style={
        isSmu
          ? { background: "linear-gradient(to bottom, #ffffff 0%, #ffffff 56%, #efefef 56%, #efefef 100%)" }
          : { backgroundColor: brand.programmesBg || (isClean ? "#f5ede7" : brand.primaryColor || "#08417b") }
      }
    >
      {/* Heading */}
      <div className="text-center mb-5 sm:mb-6 px-4 max-w-4xl mx-auto">
        {isClean ? (
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold m-0 tracking-tight leading-tight">
            <span className="text-[#ee3024]">{brand.programmesPrefix || "Programs Offered by "}</span>
            <span className="text-[#192f59]">{brand.programmesHighlight || displayUniversity}</span>
          </h2>
        ) : isSmu ? (
          <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#212529] m-0 tracking-tight leading-tight">
            {brand.programmesTitle || `Programs offered by ${brand.name || "Sikkim Manipal University Online"}`}
          </h2>
        ) : (
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-[28px] font-bold m-0 tracking-tight leading-tight" style={{ color: brand.primaryColor || "#f35a06" }}>
              {displayUniversity}
            </h3>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold mt-1 m-0 tracking-tight leading-tight text-white">
              {title}
            </h2>
          </div>
        )}
      </div>

      {/* Ant Design Carousel */}
      <div
        className={`w-full mx-auto px-4 relative ${
          isClean ? "max-w-[1140px] px-3 sm:px-6" : isSmu ? "max-w-[1200px] xl:max-w-[1240px] px-6 sm:px-10 lg:px-12" : "max-w-[1240px] xl:max-w-[1360px] sm:px-8 lg:px-10"
        }`}
      >
        <Button
          type="text"
          onClick={() => carouselRef.current?.prev()}
          aria-label="Previous programme"
          className="absolute -left-2 sm:-left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-20 text-[#222222] hover:!text-[#ee3024] transition-colors p-1 !bg-transparent !border-none cursor-pointer flex items-center justify-center active:scale-90 !h-auto !w-auto"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
        </Button>

        <Button
          type="text"
          onClick={() => carouselRef.current?.next()}
          aria-label="Next programme"
          className="absolute -right-2 sm:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-20 text-[#222222] hover:!text-[#ee3024] transition-colors p-1 !bg-transparent !border-none cursor-pointer flex items-center justify-center active:scale-90 !h-auto !w-auto"
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
        </Button>

        <div className="w-full">
          <Carousel
            ref={carouselRef}
            autoplay
            autoplaySpeed={isSmu ? 7500 : intervalTime}
            dots={false}
            slidesToShow={slidesToShow}
            slidesToScroll={1}
            infinite={programmes.length > 1}
            responsive={[
              { breakpoint: 1280, settings: { slidesToShow: isClean || isSmu ? 3 : 4 } },
              { breakpoint: 1024, settings: { slidesToShow: 2 } },
              { breakpoint: 640, settings: { slidesToShow: 1 } },
            ]}
          >
            {programmes.map((c, idx) => (
              <div
                key={`${c.id || c.code}-${idx}`}
                className={`box-border py-2 ${isClean ? "px-2 sm:px-2.5 lg:px-3" : isSmu ? "px-2.5 sm:px-3" : "px-1.5 sm:px-2 xl:px-2.5"}`}
              >
                {isClean ? (
                  <CleanCard c={c} brand={brand} onSelectCourseForBrochure={onSelectCourseForBrochure} />
                ) : isSmu ? (
                  <SmuCard c={c} brand={brand} onSelectCourseForBrochure={onSelectCourseForBrochure} onOpenApply={onOpenApply} />
                ) : (
                  <ClassicCard c={c} brand={brand} onSelectCourseForBrochure={onSelectCourseForBrochure} />
                )}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Sub-Card: Clean Style (Manipal) using Ant Design Card
// -------------------------------------------------------------
function CleanCard({ c, brand, onSelectCourseForBrochure }) {
  return (
    <Card
      bordered={false}
      styles={{ body: { padding: 0 } }}
      className={brand.programmeCardClass || "bg-white rounded-[5px] shadow-[0px_3px_15px_rgba(0,0,0,0.13)] py-4 sm:py-5 px-5 sm:px-[22px] flex flex-col justify-between h-full min-h-[350px] sm:min-h-[360px] text-left"}
    >
      <div>
        <h3 className="text-[26px] sm:text-[28px] font-bold text-[#000000] m-0 tracking-tight leading-none">
          {c.code || c.id?.toUpperCase()}
        </h3>
        <h4 className="text-[17.5px] sm:text-[18.5px] font-semibold text-[#222222] mt-1.5 mb-1.5 leading-[1.2] min-h-[42px] flex items-start">
          {c.title}
        </h4>
        <p className="text-[12.5px] sm:text-[13px] text-[#333333] leading-[1.5] font-normal m-0">
          {c.description}
        </p>
      </div>

      <div className="mt-3 pt-0.5">
        <div className="relative w-28 sm:w-[114px] h-7 sm:h-[28px] mb-2">
          <Image
            src={brand.manipalLogo || c.logo || "/assets/manipal_v1_images/manipal-logo.webp"}
            alt="Online Manipal"
            fill
            className="object-contain object-left"
            sizes="120px"
          />
        </div>

        <Button
          type="primary"
          onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
          className="w-full h-auto py-2 sm:py-2.5 px-4 rounded-[5px] !text-white font-medium text-[13px] sm:text-[13.5px] flex items-center justify-center gap-2 !border-none cursor-pointer transition-opacity hover:!opacity-95 shadow-xs"
          style={{ background: brand.programmeBtnBg || "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)" }}
        >
          <span>Download Brochure</span>
          <Download className="w-4 h-4 stroke-[2.5]" />
        </Button>
      </div>
    </Card>
  );
}

// -------------------------------------------------------------
// Sub-Card: SMU Style using Ant Design Card
// -------------------------------------------------------------
function SmuCard({ c, brand, onSelectCourseForBrochure, onOpenApply }) {
  return (
    <Card
      bordered={false}
      styles={{ body: { padding: 0 } }}
      className="bg-white rounded-[8px] sm:rounded-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0px_8px_28px_rgba(0,0,0,0.12)] transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between h-full group text-left"
    >
      <div>
        <div className="relative h-44 sm:h-48 md:h-[185px] w-full rounded-[6px] overflow-hidden mb-3.5 bg-slate-100">
          <Image
            src={c.image || "/assets/images/smu_mba.jpg"}
            alt={c.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <h3 className="text-[17px] sm:text-[18px] font-bold m-0 tracking-tight leading-snug" style={{ color: brand.primaryColor || "#074a76" }}>
          {c.title}
        </h3>

        <p className="text-[12px] sm:text-[12.5px] text-[#4b5563] leading-[1.55] mt-2 sm:mt-2.5 mb-2 line-clamp-4 min-h-[58px] sm:min-h-[60px] m-0">
          {c.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-4 sm:mt-5">
        <Button
          type="primary"
          onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
          className="active:scale-95 !text-white font-semibold text-[13px] sm:text-[13.5px] h-auto py-2.5 px-2 rounded-[5px] flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer !border-none"
          style={{ backgroundColor: brand.slug === "vgu" ? "#008000" : brand.hero?.buttonBackground || "#f78d2d" }}
        >
          <span>Get Brochure</span>
          <FaDownload className="w-3 h-3 text-white shrink-0" />
        </Button>

        <Button
          type="primary"
          onClick={() => onOpenApply?.(c.code || c.title)}
          className="active:scale-95 !text-white font-semibold text-[13px] sm:text-[13.5px] h-auto py-2.5 px-2 rounded-[5px] flex items-center justify-center transition-all shadow-xs cursor-pointer !border-none"
          style={{ backgroundColor: brand.primaryColor || "#074a76" }}
        >
          <span>Apply Now</span>
        </Button>
      </div>
    </Card>
  );
}

// -------------------------------------------------------------
// Sub-Card: Classic Style (Amity) using Ant Design Card
// -------------------------------------------------------------
function ClassicCard({ c, brand, onSelectCourseForBrochure }) {
  const isPostGrad = c.level?.toLowerCase().includes("post") || c.title?.toLowerCase().includes("master") || c.code?.toLowerCase().startsWith("m");
  const levelText = c.level || (isPostGrad ? "Post Graduation" : "Graduation");
  const durationText = c.duration || (isPostGrad ? "24 Months" : "36 Months");

  return (
    <Card
      bordered={false}
      styles={{ body: { padding: 0 } }}
      className="bg-white rounded-[8px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group text-left border border-slate-200/80"
    >
      <div>
        <div className="relative h-44 sm:h-44 xl:h-48 w-full bg-slate-100 overflow-hidden">
          <Image
            src={c.image || "/assets/amitylp/MBA-amity.png"}
            alt={c.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute top-0 left-0 bg-[#009900] text-white text-[11px] sm:text-[11.5px] font-semibold px-2.5 sm:px-3 py-1 rounded-br-[4px] tracking-wide select-none shadow-xs">
            {levelText}
          </div>
        </div>

        <div className="p-3.5 sm:p-4 pb-2">
          <h3 className="text-[20px] sm:text-[22px] xl:text-[24px] font-bold m-0 leading-tight tracking-tight" style={{ color: brand.primaryColor || "#08417b" }}>
            {c.code || c.id?.toUpperCase() || c.title}
          </h3>
          <p className="text-[12.5px] sm:text-[13px] font-semibold mt-1 mb-1.5 line-clamp-1" style={{ color: brand.primaryColor || "#08417b" }}>
            {c.title}
          </p>
          <p className="text-[11.5px] sm:text-[12px] text-[#444444] leading-[1.5] line-clamp-3 sm:line-clamp-4 min-h-[54px] sm:min-h-[72px] m-0">
            {c.description}
          </p>
        </div>
      </div>

      <div className="px-3.5 sm:px-4 pt-2 pb-3.5 flex items-center justify-between border-t border-slate-100 mt-1">
        <Button
          type="primary"
          onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
          className="active:scale-95 font-bold text-[11.5px] sm:text-[12px] h-auto px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-[4px] inline-flex items-center gap-1.5 !border-none cursor-pointer transition-all shadow-xs shrink-0"
          style={{
            background: brand.programmeBtnBg || "#ffd200",
            color: brand.programmeBtnText || "#000000",
          }}
        >
          <span>Download Brochure</span>
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        </Button>

        <div className="flex items-center gap-1 text-[11.5px] sm:text-[12px] font-medium text-[#333333] select-none shrink-0">
          <Hourglass className="w-3.5 h-3.5 text-[#555555]" />
          <span>{durationText}</span>
        </div>
      </div>
    </Card>
  );
}
