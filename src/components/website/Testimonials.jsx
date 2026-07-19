"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Arunachala Raam S",
    role: "Chief Business Officer at Adhvx Industries",
    program: "Online DBA from ESGCI Paris",
    content:
      "I have enrolled in DBA from ESGCI Paris. It has provided me with a strategic perspective on leadership and business transformation. The research-driven approach of the program has strengthened my ability to make data-backed decisions while I continue to balance my executive responsibilities and organisational growth.",
  },
  {
    name: "Sanketh Kommera",
    role: "Training Coordinator – SAP at GSY Technologies",
    program:
      "Professional Certificate Programme in HR Management & Analytics | IIM Kozhikode",
    content:
      "The IIM Kozhikode HR Analytics programme helped me bridge the gap between technology and people management. This course offered me practical insights into workforce analytics and modern HR practices.Also it has enhanced my effectiveness in training and talent development initiatives.",
  },
  {
    name: "Shreshta Kuryalkar",
    role: "Associate, Buying Operations at Saks Global",
    program:
      "Professional Certificate Programme in HR Management & Analytics | IIM Kozhikode",
    content:
      "This HR Analytics programme broadened my understanding of people strategy and analytics. It gave me valuable perspectives going beyond operational responsibilities.I got an opportunity to learn from experienced faculty and peers, which all made the journey enriching and immediately applicable in my professional role.",
  },
  {
    name: "Ashwini Madhusudhan",
    role: "Digital Operations Executive at Business Standard Newspaper",
    program:
      "Professional Certificate Programme in HR Management & Analytics | IIM Kozhikode",
    content:
      "IIM Kozhikode's HR Analytics programme was a game-changer for me.It offered a perfect blend of business understanding and analytical thinking. I worked for so many years, and had Professional experience, yet the curriculum helped me develop a stronger theoretical knowledge for data-driven decision-making in modern organisations needed for upskilling.",
  },
];

export function Testimonials() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const count = testimonials.length; // 4 dots corresponding to unique testimonials

  useEffect(() => {
    if (!api) return;

    const snap = api.selectedScrollSnap() % count;
    setTimeout(() => {
      setCurrent(snap);
    }, 0);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() % count);
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, count]);

  // Autoplay (Auto Scroll) Effect: slides every 3 seconds
  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 3000); // 3 seconds delay

    return () => clearInterval(intervalId);
  }, [api]);

  // We repeat the testimonials list 3 times (12 items total) to ensure there are
  // enough items for a seamless infinite loop even on large desktop viewports.
  const doubledTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section id="reviews" className="scroll-mt-10 py-16 md:py-24 bg-[#F8FAFC]">
      <Container>
        {/* Header */}
        <div className="text-center mb-10 md:mb-6">
          <h2 className="text-3xl md:text-[40px] font-extrabold text-[#1d3557] tracking-tight">
            Voices of Success
          </h2>
          <p className="text-slate-500 font-semibold text-sm md:text-base mt-2 md:mt-3">
            Leaders who didn&apos;t wait for permission.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {doubledTestimonials.map((item, idx) => (
              <CarouselItem
                key={idx}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Card className="bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full min-h-80 shadow-xs border border-slate-100 relative group hover:shadow-md transition-all duration-300">
                  {/* Card Header: Avatar & Info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                      <svg
                        className="w-7 h-7 text-slate-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    {/* Name & Title */}
                    <div className="text-left">
                      <h4 className="font-bold text-[#1d3557] text-[16px] leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-medium mt-1 leading-normal max-w-50">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Program Badge */}
                  <div className="bg-[#fdf6e2] px-4 py-2.5 rounded-lg text-[11px] font-bold text-[#b45309] mt-5 leading-snug tracking-wide border border-[#b45309]/10 text-left">
                    {item.program}
                  </div>

                  {/* Quote Body */}
                  <div className="relative mt-5 text-left flex-1 flex flex-col justify-between">
                    {/* Opening Quote */}
                    <span className="text-[#f5c451] text-[40px] font-serif leading-none absolute -left-1 -top-2 select-none">
                      “
                    </span>

                    <p className="text-slate-600 font-medium text-[12px] leading-relaxed pl-5 pr-2 pt-1.5 flex-1">
                      {item.content}
                    </p>

                    {/* Closing Quote */}
                    <span className="text-[#f5c451] text-[40px] font-serif leading-none self-end mt-2 mr-2 select-none">
                      ”
                    </span>
                  </div>

                  {/* Stars Footer */}
                  <div className="flex gap-1.5 mt-auto pt-1 border-t border-slate-50 text-left">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="#f5c451"
                        stroke="#f5c451"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Indicators / Pagination dots */}
        <div className="flex justify-center gap-2.5 mt-10">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === current ? "bg-[#1d3557] scale-110" : "bg-slate-300"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Testimonials;
