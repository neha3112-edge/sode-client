"use client";

import React from "react";
import { ShieldCheck, Clock, Award, Users } from "lucide-react";
import LandingLeadForm from "./LandingLeadForm";

export default function LandingFooterForm({ brand = {}, courses = [], onOpenDisclaimer }) {
  const universityName = brand.name || "University Online";

  const trustBadges = [
    { icon: ShieldCheck, text: "100% Verified UGC Entitled Degrees" },
    { icon: Clock, text: "Dedicated Support 7 Days a Week" },
    { icon: Award, text: "Top Accreditations & Approvals" },
    { icon: Users, text: "Free Career Mentorship by Experts" },
  ];

  return (
    <section id="footer-enquiry" className="py-12 sm:py-16 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text & Trust Badges */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              Get In Touch With Counselors
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white m-0">
              Ready to Accelerate Your Career at {universityName}?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl m-0">
              Talk directly with certified academic advisors. Get personalized advice on course selection, flexible fee EMIs, syllabus breakdown, and career opportunities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {trustBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Lead Form */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <LandingLeadForm
                universityName={universityName}
                courseList={courses}
                formName="Footer Lead Form"
                title="Get Free Counseling"
                subtitle="Fill details below to get instant guidance"
                buttonText="Connect With Expert"
                onOpenDisclaimer={onOpenDisclaimer}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
