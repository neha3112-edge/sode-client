"use client";

import React from "react";
import Image from "next/image";
import { PhoneOutlined } from "@ant-design/icons";
import { smuImg } from "./constants";

export default function SmuFooter({ onOpenScholarship, onOpenBrochure, onOpenLegal }) {
  return (
    <>
      <footer className="bg-[#05324f] text-white">
        {/* Top Counseling Banner */}
        <div className="bg-[#074a76] py-8 sm:py-10 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Get 100% Free Distance & Online Education Counselling
                </h3>
                <p className="text-sm text-gray-200 mt-1">
                  Connect with experienced career advisors to choose the right online program.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="tel:+917065777755"
                  className="inline-flex items-center gap-2 bg-[#f58220] hover:bg-[#e07113] text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all text-sm"
                >
                  <PhoneOutlined />
                  <span>+91 7065 7777 55</span>
                </a>
                <button
                  type="button"
                  onClick={() => onOpenBrochure?.("Footer Counseling")}
                  className="bg-white hover:bg-gray-100 text-[#074a76] font-bold py-3 px-6 rounded-full shadow-lg transition-all text-sm cursor-pointer"
                >
                  Book Free Session
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Still Confused / Compare Section */}
        <div className="py-10 bg-[#063b5c] border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Still Confused?
            </h2>
            <p className="text-sm sm:text-base text-gray-200 mt-2 font-medium">
              Compare Sikkim Manipal University with Top UGC-DEB Approved Universities
            </p>
            <div className="mt-5 flex justify-center items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenBrochure?.("Still Confused Compare")}
                className="inline-flex items-center gap-2 bg-[#28a745] hover:bg-[#218838] text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer text-sm"
              >
                <span>Compare University</span>
                <Image
                  src={smuImg("arrow.gif")}
                  alt="Explore"
                  width={30}
                  height={18}
                  className="w-7 h-4 object-contain inline-block ml-1"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Compare / Brand Strip */}
        <div className="py-8 border-b border-white/10 bg-[#05324f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl">
                <Image
                  src={smuImg("new-des-logo.webp")}
                  alt="Distance Education School"
                  width={140}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div className="text-xs text-gray-300 max-w-md">
                India&apos;s leading platform providing authentic counseling, fee comparisons, and admission assistance for top online universities.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-300">Compare 100+ Online Universities:</span>
              <button
                type="button"
                onClick={() => onOpenBrochure?.("Footer Compare")}
                className="bg-[#28a745] hover:bg-[#218838] text-white text-xs font-bold py-2 px-4 rounded-full transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Compare Now</span>
                <Image
                  src={smuImg("arrow.gif")}
                  alt="Explore"
                  width={28}
                  height={16}
                  className="w-6 h-3.5 object-contain"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="py-6 bg-[#04283f] text-gray-400 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <p className="leading-relaxed">
              <strong className="text-gray-300">Disclaimer:</strong> SODE Counselling Services LLP act as a marketing agency. All university names, logos, and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of the University before making decisions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-white/5 text-[11px]">
              <div>
                © 2026 SODE Counseling Services LLP
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenLegal?.("Disclaimer")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Disclaimer
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegal?.("Terms & Conditions")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegal?.("Privacy Policy")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons for Desktop / Tablet (Hidden on Mobile) */}
      <div className="hidden md:flex fixed right-5 bottom-6 z-40 flex-col items-center gap-3">
        {/* Scholarship Coupon Gift */}
        <button
          type="button"
          onClick={onOpenScholarship}
          aria-label="Scholarship Coupon"
          className="group relative flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-2xl border-2 border-[#28a745] hover:scale-110 transition-transform cursor-pointer"
        >
          <Image
            src={smuImg("gift.gif")}
            alt="Scholarship Gift"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Claim Scholarship Coupon
          </span>
        </button>

        {/* Call / WhatsApp Floating Button */}
        <a
          href="https://wa.me/917065777755?text=Hi%2C%20I%20am%20interested%20in%20Sikkim%20Manipal%20University%20Online"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex items-center justify-center w-14 h-14 bg-[#25d366] rounded-full shadow-2xl hover:scale-110 transition-transform cursor-pointer"
        >
          <Image
            src={smuImg("call_icon.gif")}
            alt="Contact"
            width={34}
            height={34}
            className="w-8 h-8 object-contain"
          />
          <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-3 py-2.5 flex items-center gap-2 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <button
          type="button"
          onClick={() => onOpenBrochure?.("Mobile Bottom Bar Brochure")}
          className="flex-1 bg-[#f58220] hover:bg-[#e07113] text-white font-bold py-2.5 px-3 rounded-lg text-center text-xs shadow transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>💬</span>
          <span>Get Brochure</span>
        </button>
        <button
          type="button"
          onClick={() => onOpenBrochure?.("Mobile Bottom Bar Apply")}
          className="flex-1 bg-[#074a76] hover:bg-[#063a5d] text-white font-bold py-2.5 px-3 rounded-lg text-center text-xs shadow transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>Apply Now »</span>
        </button>
      </div>
    </>
  );
}

