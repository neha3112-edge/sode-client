"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/common/Container";
import { Carousel } from "antd";
import { StarFilled } from "@ant-design/icons";
import { getAssetPath } from "@/lib/utils";
import { testimonials as defaultTestimonials } from "@/constants/testimonialsData";

function UserAvatar({ name, imageSrc }) {
  const [imgError, setImgError] = useState(false);
  const DEFAULT_AVATAR = "/media/images/2026/07/30/15126164a42947040644b380a66f9994.png";
  const rawUrl = imageSrc?.url || imageSrc || DEFAULT_AVATAR;
  const avatarUrl = getAssetPath(rawUrl, null) || DEFAULT_AVATAR;

  const getInitials = (n) => {
    if (!n) return "U";
    const parts = n.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  if (avatarUrl && !imgError) {
    return (
      <img
        src={avatarUrl}
        alt={name || "User"}
        className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-blue-100 shadow-2xs"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <img
      src={DEFAULT_AVATAR}
      alt={name || "User"}
      className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-blue-100 shadow-2xs"
    />
  );
}

export function Testimonials({ initialTestimonials = defaultTestimonials }) {
  const testimonialsList = initialTestimonials || defaultTestimonials;
  const [slidesToShowCount, setSlidesToShowCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      if (w < 640) {
        setSlidesToShowCount(1);
      } else if (w < 1024) {
        setSlidesToShowCount(2);
      } else {
        setSlidesToShowCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="testimonials"
      className="py-14 sm:py-20 scroll-mt-10 bg-[#f8fafc] overflow-hidden"
    >
      <Container className="max-w-6xl">
        {/* Title */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0C3058] leading-tight mb-2.5 tracking-tight">
            What Our Learners Say
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl mx-auto">
            Real experiences from professionals who transformed their careers with SODE
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          key={slidesToShowCount}
          autoplay
          dots
          draggable={true}
          touchMove={true}
          swipeToSlide={true}
          slidesToShow={slidesToShowCount}
          slidesToScroll={1}
          className="w-full max-w-6xl mx-auto testimonial-carousel cursor-grab active:cursor-grabbing"
        >
          {testimonialsList.map((item, idx) => {
            const ratingCount = item.rating || 5;
            const avatarPath = item.avatar || item.image || item.photo || item.imageSrc || item.avatarUrl || "/media/images/2026/07/30/15126164a42947040644b380a66f9994.png";

            return (
              <div key={idx} className="px-2.5 pb-10 pt-1">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full min-h-[340px]">
                  {/* Top: Stars & Quote */}
                  <div>
                    {/* 5-Star Rating */}
                    <div className="flex items-center gap-1 mb-3 text-[#FFB800]">
                      {Array.from({ length: ratingCount }).map((_, sIdx) => (
                        <StarFilled key={sIdx} className="text-sm" />
                      ))}
                    </div>

                    {/* Quote Content */}
                    <p className="text-slate-700 text-xs sm:text-sm font-normal leading-relaxed m-0">
                      &ldquo;{item.content}&rdquo;
                    </p>
                  </div>

                  {/* Bottom: User Image + Author Info */}
                  <div className="border-t border-slate-100 pt-4 mt-5 flex items-start gap-3">
                    <UserAvatar name={item.name} imageSrc={avatarPath} />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-[#0C3058] text-sm leading-snug m-0">
                        {item.name}
                      </h3>
                      {item.role && (
                        <p className="text-slate-500 font-medium text-[11px] mt-0.5 leading-snug m-0">
                          {item.role}
                        </p>
                      )}
                      {item.program && (
                        <p className="text-[#00B4D8] font-semibold text-[10px] sm:text-[11px] mt-1 leading-snug m-0">
                          {item.program}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </Container>
    </section>
  );
}

export default Testimonials;

