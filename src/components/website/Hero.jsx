"use client";

import Image from "next/image";
import { Carousel } from "antd";

import { useFormModal } from "@/hooks/useFormModal";
import { getAssetPath } from "@/lib/utils";

export function Hero({ initialHeroData = null }) {
  const { openFormModal } = useFormModal();

  const heroData = initialHeroData;

  // Carousel settings & flags strictly mapped from SSR initialHeroData
  const carouselSettings = heroData?.carouselSettings || {};
  const isAutoplay = Boolean(carouselSettings.autoplay);
  const autoplaySpeed = Number(carouselSettings.autoplaySpeed) || 5000;
  const showArrows = Boolean(carouselSettings.showArrows);
  const showDots = Boolean(carouselSettings.showDots);

  const openCounsellingForm = () => {
    openFormModal({
      title: "Book 1:1 Personalised Counselling",
      subtitle: "Select your course and our academic experts will assist you",
      submitButtonText: "Book Counselling",
    });
  };

  // Carousel check
  const isCarousel =
    heroData?.isCarousel &&
    Array.isArray(heroData?.slides) &&
    heroData.slides.length > 0;

  const resolveImage = (mediaObj, fallbackPath) => {
    const rawUrl = typeof mediaObj === "object" ? mediaObj?.url : mediaObj;
    if (!rawUrl) return getAssetPath(fallbackPath);
    return getAssetPath(rawUrl, fallbackPath);
  };

  const bgImageUrl = resolveImage(
    heroData?.bgImage || heroData?.mobileBgImage || heroData?.mobileImage,
    "/assets/images/desktop_banner.jpg"
  );

  // Single Banner Helper
  const renderSingleBanner = () => {
    return (
      <div
        onClick={openCounsellingForm}
        className="w-full cursor-pointer relative overflow-hidden bg-[#0C2340] h-36 min-[400px]:h-44 sm:h-56 md:h-72 lg:h-80"
      >
        <Image
          src={bgImageUrl}
          alt="Hero banner"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    );
  };

  // Carousel Slide Helper
  const renderSlideItem = (slide, idx) => {
    const slideBg = resolveImage(
      slide?.bgImage || slide?.mobileBgImage || slide?.mobileImage,
      "/assets/images/desktop_banner.jpg"
    );

    return (
      <div
        key={slide._id || idx}
        onClick={openCounsellingForm}
        className="w-full cursor-pointer relative overflow-hidden bg-[#0C2340] h-36 min-[400px]:h-44 sm:h-56 md:h-72 lg:h-80"
      >
        <Image
          src={slideBg}
          alt="Hero slide"
          fill
          priority={idx === 0}
          fetchPriority={idx === 0 ? "high" : "auto"}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    );
  };

  return (
    <section id="hero-section" className="relative w-full overflow-hidden">
      {isCarousel ? (
        <div className="relative w-full">
          <Carousel
            autoplay={isAutoplay}
            autoplaySpeed={autoplaySpeed}
            arrows={showArrows}
            dots={showDots}
            className="w-full"
          >
            {heroData.slides.map((slide, idx) =>
              renderSlideItem(slide, idx)
            )}
          </Carousel>
        </div>
      ) : (
        renderSingleBanner()
      )}
    </section>
  );
}

export default Hero;
