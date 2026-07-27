"use client";

import { Container } from "@/components/common/Container";
import { Card, Carousel } from "antd";
import { testimonials as defaultTestimonials } from "@/constants/testimonialsData";

export function Testimonials({ initialTestimonials = defaultTestimonials }) {
  const testimonialsList = initialTestimonials || defaultTestimonials;

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
          autoplay
          dots
          responsive={[
            {
              breakpoint: 1024,
              settings: { slidesToShow: 3, slidesToScroll: 1 },
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
              breakpoint: 480,
              settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
          ]}
          className="w-full max-w-6xl mx-auto"
        >
          {testimonialsList.map((item, idx) => (
            <div key={idx} className="px-3 pb-4">
              <Card className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between w-full h-full min-h-[260px] transition duration-300 hover:shadow-lg">
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
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}

export default Testimonials;

