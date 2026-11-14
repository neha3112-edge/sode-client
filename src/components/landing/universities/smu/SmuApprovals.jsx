"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { SMU_APPROVALS } from "./constants";

export default function SmuApprovals() {
  const carouselRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesToShow(2);
      } else if (width < 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderBadge = (item, index) => (
    <div key={index} className="px-2 sm:px-3 py-2 select-none outline-none">
      <div className="flex flex-col items-center text-center">
        {/* Direct image without extra background */}
        <div className="relative w-[130px] h-[120px] sm:w-[150px] sm:h-[135px] mx-auto flex items-center justify-center">
          <Image
            src={item.image}
            alt={item.title}
            width={150}
            height={135}
            className="w-full h-full object-contain"
          />
        </div>

        <p className="text-[#333333] text-[12.5px] sm:text-[13.5px] leading-snug font-normal text-center mt-3 px-1 min-h-[38px] sm:min-h-[42px] flex items-center justify-center">
          {item.title}
        </p>
      </div>
    </div>
  );

  return (
    <section
      id="rankings"
      className="w-full bg-white py-10 sm:py-14 scroll-mt-16 sm:scroll-mt-20 select-none text-center"
    >
      <Container>
        {/* Section Heading */}
        <div className="max-w-[920px] mx-auto mb-8 sm:mb-10 text-center">
          <h2 className="font-bold text-[22px] sm:text-[28px] md:text-[32px] leading-tight text-[#111827] m-0 mb-3">
            Sikkim Manipal University Online Rankings &amp; Accreditations
          </h2>
          <p className="text-[#555555] text-[12.5px] sm:text-[13.5px] leading-[1.4] m-0">
            Sikkim Manipal University is one of the top ranked university in India. The university is UGC-DEB recognised and is accredited by leading national accreditation bodies. It is an advanced online learning platform. SMU Online delivers industry-aligned programs which hold academic excellence. Sikkim Manipal University online courses are the most preferred choice for learners. They offer flexibility, credibility and high-quality higher education.
          </p>
        </div>

        {/* Carousel with Navigation Arrows */}
        <div className="relative px-6 sm:px-10 max-w-[1140px] mx-auto">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            className="absolute -left-1 sm:-left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 hover:text-black cursor-pointer z-10 transition-colors"
            aria-label="Previous"
          >
            <LeftOutlined className="text-[12px]" />
          </button>

          <Carousel
            key={`smu-approvals-${slidesToShow}`}
            ref={carouselRef}
            dots={false}
            arrows={false}
            autoplay={true}
            autoplaySpeed={2500}
            slidesToShow={slidesToShow}
            slidesToScroll={1}
            infinite={true}
          >
            {SMU_APPROVALS.map(renderBadge)}
          </Carousel>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            className="absolute -right-1 sm:-right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 hover:text-black cursor-pointer z-10 transition-colors"
            aria-label="Next"
          >
            <RightOutlined className="text-[12px]" />
          </button>
        </div>
      </Container>
    </section>
  );
}
