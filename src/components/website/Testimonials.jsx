"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { testimonials as defaultTestimonials } from "@/constants/testimonialsData";

export function Testimonials({ initialTestimonials = defaultTestimonials }) {
  const testimonialsList = initialTestimonials || defaultTestimonials;
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const count = testimonialsList.length;

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

  return (
    <section
      id="testimonials"
      className="py-16 scroll-mt-10 md:py-24 bg-[#f8fafc] overflow-hidden"
    >
      <Container className="max-w-7xl">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1d3557] leading-tight mb-3">
            What Our Learners Say
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-semibold">
            Real experiences from professionals who transformed their careers
            with SODE
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto relative"
        >
          <CarouselContent className="-ml-4">
            {testimonialsList.map((item, idx) => (
              <CarouselItem
                key={idx}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3 flex"
              >
                <Card className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between w-full h-full transition duration-300 hover:shadow-lg">
                  {/* Quote & Content */}
                  <div>
                    <div className="text-[#A66E38] text-4xl leading-none font-serif mb-4 select-none">
                      &ldquo;
                    </div>
                    <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed mb-6">
                      {item.content}
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="border-t border-slate-100 pt-4 mt-auto">
                    <h3 className="font-bold text-[#1d3557] text-sm md:text-base">
                      {item.name}
                    </h3>
                    <p className="text-[#A66E38] font-semibold text-xs mt-0.5">
                      {item.role}
                    </p>
                    <p className="text-slate-400 font-medium text-[11px] mt-1">
                      {item.program}
                    </p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots Pagination */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => api?.scrollTo(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === current ? "bg-[#1d3557] w-6" : "bg-slate-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Testimonials;
