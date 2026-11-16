"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "antd";
import { Menu, X } from "lucide-react";
import { IIM_NAV_LINKS, iimImg } from "./constants";

export default function IimHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs border-b border-gray-100 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] sm:h-[74px] flex items-center justify-between">
        {/* SODE Logo */}
        <Link href="/iim" className="flex items-center gap-2">
          <Image
            src={iimImg("new_sode_tm_logo.png")}
            alt="SODE - School Of Online & Distance Education"
            width={708}
            height={655}
            priority
            className="h-[48px] sm:h-[56px] w-auto object-contain block"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {IIM_NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#222222] hover:text-[#17479E] font-medium text-[14.5px] lg:text-[15px] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden w-10 h-10 rounded-md bg-[#17479E] text-white flex items-center justify-center cursor-pointer border-none shadow-xs"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        placement="top"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        closeIcon={null}
        styles={{
          header: { display: "none" },
          body: { padding: 0 },
          wrapper: { height: "auto", maxHeight: "80vh" },
        }}
      >
        <div className="w-full bg-white px-5 py-4 flex flex-col">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <Image
              src={iimImg("new_sode_tm_logo.png")}
              alt="SODE Logo"
              width={708}
              height={655}
              className="h-[44px] w-auto object-contain block"
              style={{ width: "auto", height: "auto" }}
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-9 h-9 rounded-[6px] bg-[#17479E] text-white flex items-center justify-center border-none cursor-pointer"
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex flex-col py-4 gap-3.5">
            {IIM_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#111111] hover:text-[#17479E] text-[16px] font-bold py-1.5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Drawer>
    </header>
  );
}

