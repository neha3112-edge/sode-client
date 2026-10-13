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
  const mobileCarouselRef = useRef(null);
  const desktopCarouselRef = useRef(null);
  const isSmu = brand.programmesLayout === "smu-cards" || brand.slug === "smu";
  const isClean = brand.programmesCardStyle === "clean" || brand.programmesCardStyle === "card" || Boolean(brand.programmesPrefix);
  const isMobileStack = Boolean(brand.programmesMobileStack);

  const displayUniversity = (universityName || brand.name || "University Online").replace(/\s+Online$/i, "").trim();

  // Data-driven carousel configuration
  const carouselConfig = brand.programmesCarousel || brand.carousel || {};
  const desktopSlides = carouselConfig.desktopSlides || (isClean || isSmu ? 3 : 4);
  const tabletSlides = carouselConfig.tabletSlides || 2;
  const mobileSlides = carouselConfig.mobileSlides || 1;
  const showDots = carouselConfig.dots ?? false;
  const isAutoplay = carouselConfig.autoplay ?? true;
  const autoplaySpeed = carouselConfig.interval || (isSmu ? 7500 : intervalTime);

  return (
    <section
      id={brand.programmesSectionId || (isSmu || brand.slug === "manipal" ? "programs" : "programmes")}
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
            <h3
              className="text-xl sm:text-2xl lg:text-[28px] font-bold m-0 tracking-tight leading-tight text-white"
              style={{ color: brand.programmesSubtitleColor || "#ffffff" }}
            >
              {brand.programmesSubtitle || displayUniversity}
            </h3>
            <h2
              className="text-2xl sm:text-3xl lg:text-[36px] font-bold mt-1 m-0 tracking-tight leading-tight text-white"
              style={{ color: brand.programmesTitleColor || "#ffffff" }}
            >
              {brand.programmesTitle || title || "Online Degree Courses"}
            </h2>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE VIEW: Stack when isMobileStack is true, else Carousel  */}
      {/* ------------------------------------------------------------- */}
      {isMobileStack ? (
        <div className="block md:hidden w-full px-4">
          <div className="flex flex-col gap-4 sm:gap-5 max-w-[360px] mx-auto">
            {programmes.map((c, idx) => (
              <div
                key={`mobile-stack-${c.id || c.code}-${idx}`}
                className="w-full"
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
          </div>
        </div>
      ) : (
        <div className="block md:hidden relative w-full max-w-[360px] mx-auto px-7">
          <button
            type="button"
            onClick={() => mobileCarouselRef.current?.prev()}
            aria-label="Previous programme"
            className="absolute left-0.5 top-1/2 -translate-y-1/2 z-20 text-[#222222] hover:text-[#ee3024] p-1.5 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => mobileCarouselRef.current?.next()}
            aria-label="Next programme"
            className="absolute right-0.5 top-1/2 -translate-y-1/2 z-20 text-[#222222] hover:text-[#ee3024] p-1.5 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          <div className="w-full [&_.slick-dots]:!relative [&_.slick-dots]:!mt-4 [&_.slick-dots]:!mb-0 [&_.slick-dots_li]:!w-2 [&_.slick-dots_li]:!h-2 [&_.slick-dots_li]:!mx-1 [&_.slick-dots_li_button]:!w-2 [&_.slick-dots_li_button]:!h-2 [&_.slick-dots_li_button]:!rounded-full [&_.slick-dots_li_button]:!bg-slate-300 [&_.slick-dots_li.slick-active_button]:!bg-[#ee3024]">
            <Carousel
              ref={mobileCarouselRef}
              autoplay={isAutoplay}
              autoplaySpeed={autoplaySpeed}
              dots={showDots}
              slidesToShow={1}
              slidesToScroll={1}
              infinite={programmes.length > 1}
              arrows={false}
              draggable
            >
              {programmes.map((c, idx) => (
                <div
                  key={`mobile-${c.id || c.code}-${idx}`}
                  className="box-border py-2 px-1 outline-none"
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
      )}

      {/* ------------------------------------------------------------- */}
      {/* DESKTOP VIEW: Multiple Cards per slide (hidden md:block)      */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`hidden md:block w-full mx-auto px-4 sm:px-6 relative ${
          isClean ? "max-w-[1140px]" : isSmu ? "max-w-[1200px] xl:max-w-[1240px] px-6 sm:px-10 lg:px-12" : "max-w-[1240px] xl:max-w-[1360px] sm:px-8 lg:px-10"
        }`}
      >
        <Button
          type="text"
          onClick={() => desktopCarouselRef.current?.prev()}
          aria-label="Previous programme"
          className="flex absolute left-0 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 text-[#222222] hover:!text-[#ee3024] transition-colors p-1 !bg-transparent !border-none cursor-pointer items-center justify-center active:scale-90 !h-auto !w-auto"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
        </Button>

        <Button
          type="text"
          onClick={() => desktopCarouselRef.current?.next()}
          aria-label="Next programme"
          className="flex absolute right-0 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 text-[#222222] hover:!text-[#ee3024] transition-colors p-1 !bg-transparent !border-none cursor-pointer items-center justify-center active:scale-90 !h-auto !w-auto"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
        </Button>

        <div className="w-full px-5 sm:px-0 [&_.slick-dots]:!relative [&_.slick-dots]:!mt-5 [&_.slick-dots]:!mb-0 [&_.slick-dots_li]:!w-2 [&_.slick-dots_li]:!h-2 [&_.slick-dots_li]:!mx-1 [&_.slick-dots_li_button]:!w-2 [&_.slick-dots_li_button]:!h-2 [&_.slick-dots_li_button]:!rounded-full [&_.slick-dots_li_button]:!bg-slate-300 [&_.slick-dots_li.slick-active_button]:!bg-[#ee3024]">
          <Carousel
            ref={desktopCarouselRef}
            autoplay={isAutoplay}
            autoplaySpeed={autoplaySpeed}
            dots={showDots}
            slidesToShow={desktopSlides}
            slidesToScroll={1}
            infinite={programmes.length > 1}
            responsive={[
              { breakpoint: 1280, settings: { slidesToShow: desktopSlides } },
              { breakpoint: 1024, settings: { slidesToShow: tabletSlides } },
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
// Sub-Card: Clean Style using Ant Design Card
// -------------------------------------------------------------
function CleanCard({ c, brand, onSelectCourseForBrochure }) {
  const cardLogo = brand.programmeLogo || c.logo || brand.logo;

  return (
    <Card
      variant="borderless"
      styles={{ body: { padding: 0 } }}
      className={brand.programmeCardClass || "bg-white rounded-[6px] shadow-[0px_3px_16px_rgba(0,0,0,0.11)] py-5 px-5 sm:px-6 flex flex-col justify-between h-full min-h-[355px] sm:min-h-[365px] max-w-[340px] sm:max-w-none mx-auto text-left"}
    >
      <div>
        <h3 className="text-[25px] sm:text-[28px] font-bold text-[#000000] m-0 tracking-tight leading-none">
          {c.code || c.id?.toUpperCase()}
        </h3>
        <h4 className="text-[16.5px] sm:text-[18px] font-semibold text-[#222222] mt-2 mb-2 leading-[1.25] min-h-[44px] flex items-start">
          {c.title}
        </h4>
        <p className="text-[12.5px] sm:text-[13px] text-[#333333] leading-[1.5] font-normal m-0">
          {c.description}
        </p>
      </div>

      <div className="mt-3.5 pt-0.5">
        {cardLogo && (
          <div className="relative w-28 sm:w-[114px] h-7 sm:h-[28px] mb-2.5">
            <Image
              src={cardLogo}
              alt={brand.name || "University Logo"}
              fill
              className="object-contain object-left"
              sizes="120px"
            />
          </div>
        )}

        <Button
          type="primary"
          onClick={() => onSelectCourseForBrochure?.(c.code || c.title)}
          className="w-full h-auto py-2.5 px-4 rounded-[5px] !text-white font-semibold text-[13px] sm:text-[13.5px] flex items-center justify-center gap-2 !border-none cursor-pointer transition-opacity hover:!opacity-95 shadow-xs"
          style={{ background: brand.programmeBtnBg || "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)" }}
        >
          <span>{brand.programmeBtnLabel || "Download Brochure"}</span>
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
      variant="borderless"
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
function ClassicCard({ c, brand, onSelectCourseForBrochure, isMobile = false }) {
  const isPostGrad = c.level?.toLowerCase().includes("post") || c.title?.toLowerCase().includes("master") || c.code?.toLowerCase().startsWith("m");
  const levelText = c.level || (isPostGrad ? "Post Graduation" : "Graduation");
  const durationText = c.duration || (isPostGrad ? "24 Months" : "36 Months");

  return (
    <Card
      variant="borderless"
      styles={{ body: { padding: 0 } }}
      className="bg-white rounded-[8px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group text-left border border-slate-200/80"
    >
      <div>
        <div className="relative h-44 sm:h-44 xl:h-48 w-full bg-slate-100 overflow-hidden">
          <Image
            src={c.image || "/assets/all_universities_images/amity/MBA-amity.png"}
            alt={c.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute top-0 left-0 bg-[#008a00] text-white text-[11px] sm:text-[11.5px] font-semibold px-2.5 sm:px-3 py-1 rounded-br-[4px] tracking-wide select-none shadow-xs">
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
          <p className={`text-[11.5px] sm:text-[12px] text-[#444444] leading-[1.5] ${isMobile ? "min-h-0" : "line-clamp-3 sm:line-clamp-4 min-h-[54px] sm:min-h-[72px]"} m-0`}>
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
          <span>{c.buttonText || brand.programmeCardBtnText || "Get Brochure"}</span>
          <FaDownload className="w-3 h-3 text-black shrink-0" />
        </Button>

        <div className="flex items-center gap-1 text-[11.5px] sm:text-[12px] font-medium text-[#333333] select-none shrink-0">
          <Hourglass className="w-3.5 h-3.5 text-[#555555]" />
          <span>{durationText}</span>
        </div>
      </div>
    </Card>
  );
}
