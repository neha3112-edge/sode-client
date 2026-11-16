"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "antd";
import { Menu, X } from "lucide-react";
import confetti from "canvas-confetti";
import { galgotiasImg } from "./constants";

export default function GalgotiasHeader({ onOpenScholarship }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCouponClick = (e) => {
    try {
      if (typeof window !== "undefined") {
        const rect = e?.currentTarget?.getBoundingClientRect();
        const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
        const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;
        confetti({
          particleCount: 55,
          spread: 60,
          origin: { x, y },
          zIndex: 99999,
          colors: ["#2ecc71", "#27ae60", "#f1c40f", "#e67e22", "#e74c3c"],
        });
      }
    } catch {}
    onOpenScholarship?.();
  };

  const navLinks = [
    { label: "Programs", href: "#program" },
    { label: "Approvals", href: "#approvals" },
    { label: "About", href: "#about" },
    { label: "Why Galgotias", href: "#advantage" },
    { label: "Degree", href: "#degree" },
    { label: "Recruiters", href: "#recruiters" },
    { label: "Admission Process", href: "#admission" },
    { label: "FAQs", href: "#faqs" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-xs select-none">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[64px] sm:h-[72px]">
            {/* Left: Galgotias University Logo */}
            <Link href="/galgotias" className="flex items-center">
              <Image
                src={galgotiasImg("logo-GU-online.png")}
                alt="Galgotias University Online"
                width={260}
                height={55}
                priority
                className="h-[38px] sm:h-[44px] md:h-[48px] w-auto object-contain"
              />
            </Link>

            {/* Right Desktop: Scholarship Coupon Code Button */}
            <div className="hidden md:flex items-center">
              <button
                type="button"
                onClick={handleCouponClick}
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-md text-white font-bold text-[13.5px] border-none cursor-pointer shadow-md transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg, #2ecc71, #27ae60)" }}
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
                  <Image
                    src={galgotiasImg("gift.gif")}
                    alt="Gift"
                    width={18}
                    height={18}
                    unoptimized
                    className="w-4 h-4 object-contain"
                  />
                </div>
                <span>Scholarship Coupon Code</span>
              </button>
            </div>

            {/* Right Mobile: Hamburger Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="p-1.5 rounded-md text-gray-800 hover:bg-gray-100 transition-colors border-none bg-transparent cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (opens from top) */}
      <Drawer
        placement="top"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        closeIcon={null}
        size={340}
        styles={{
          body: { padding: 0 },
        }}
      >
        <div className="flex flex-col h-full bg-white">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <Image
              src={galgotiasImg("logo-GU-online.png")}
              alt="Galgotias University Online"
              width={200}
              height={44}
              className="h-[34px] w-auto object-contain"
            />
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 border-none bg-transparent cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="px-5 py-4 flex flex-col gap-3">
            {/* Mobile Scholarship Button */}
            <button
              type="button"
              onClick={(e) => {
                setIsDrawerOpen(false);
                handleCouponClick(e);
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-md text-white font-bold text-[13px] border-none cursor-pointer shadow-sm active:scale-95 mb-2"
              style={{ background: "linear-gradient(135deg, #2ecc71, #27ae60)" }}
            >
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0">
                <Image
                  src={galgotiasImg("gift.gif")}
                  alt="Gift"
                  width={14}
                  height={14}
                  unoptimized
                  className="w-3.5 h-3.5 object-contain"
                />
              </div>
              <span>Scholarship Coupon Code</span>
            </button>

            {/* Nav Links */}
            <div className="flex flex-col space-y-1">
              {navLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-3 py-2.5 rounded-md text-[#222222] font-semibold text-[15px] hover:bg-gray-50 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

