"use client";

import { Header } from "@/components/website/Header";
import { Hero } from "@/components/website/Hero";
import { Stats } from "@/components/website/Stats";
import { Courses } from "@/components/website/Courses";
import { Universities } from "@/components/website/Universities";
import { About } from "@/components/website/About";
import { Testimonials } from "@/components/website/Testimonials";
import { FAQ } from "@/components/website/FAQ";
import { Footer } from "@/components/website/Footer";
import FaqJsonLd from "@/components/common/FaqJsonLd";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <FaqJsonLd />
      <Header />

      <main className="flex w-full flex-1 flex-col md:mt-10">
        <Hero />
        <Stats />
        <Courses />
        <Universities />
        <About />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
