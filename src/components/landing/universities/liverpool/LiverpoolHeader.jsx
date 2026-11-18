"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "antd";
import { Menu, X, Phone } from "lucide-react";
import { LIVERPOOL_NAV_LINKS, liverpoolImg } from "./constants";

export default function LiverpoolHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-2xs select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] sm:h-[74px] flex items-center justify-between">
        {/* SODE Logo */}
        <Link href="/liverpool" className="flex items-center gap-2">
          <Image
            src={liverpoolImg("new_sode_tm_logo.png")}
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
          {LIVERPOOL_NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#222222] hover:text-[#00408d] font-semibold text-[14.5px] lg:text-[15px] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden w-10 h-10 rounded-md bg-[#00408d] text-white flex items-center justify-center cursor-pointer border-none shadow-xs"
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
              src={liverpoolImg("new_sode_tm_logo.png")}
              alt="SODE Logo"
              width={708}
              height={655}
              className="h-[44px] w-auto object-contain block"
              style={{ width: "auto", height: "auto" }}
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-9 h-9 rounded-[6px] bg-[#00408d] text-white flex items-center justify-center border-none cursor-pointer"
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Nav Links */}
          <nav className="flex flex-col py-3 divide-y divide-gray-100">
            {LIVERPOOL_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-[15.5px] font-semibold text-gray-800 hover:text-[#00408d] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Drawer Call CTA */}
          <div className="pt-2 pb-1">
            <a
              href="tel:+917065777755"
              className="w-full py-2.5 rounded-lg bg-[#00408d] text-white font-bold text-[14px] flex items-center justify-center gap-2 no-underline shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 7065 7777 55</span>
            </a>
          </div>
        </div>
      </Drawer>
    </header>
  );
}

