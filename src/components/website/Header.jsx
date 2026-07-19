"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Executive Programs", href: "#courses" },
    { label: "Universities", href: "#universities" },
    { label: "About SODE", href: "#about" },
    { label: "Alumni Voices", href: "#reviews" },
    { label: "FAQs", href: "#faqs" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-20">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src={getAssetPath("/assets/images/new_sode_tm_logo.png")}
            alt="Company Logo"
            width={74}
            height={74}
            priority
            className="object-contain cursor-pointer"
          />
        </Link>

        {/* ✅ Desktop Navigation */}
        <nav className="hidden lg:flex items-center text-sm text-gray-900 font-medium tracking-wider gap-1">
          {navItems.map((item, index) => {
            const isExecutive = item.label === "Executive Programs";
            return (
              <div key={item.label} className="flex items-center">
                {isExecutive ? (
                  <a
                    href={item.href}
                    className="mr-3 px-4 py-2 bg-linear-to-r from-[#EEC471] via-[#F3CD73] to-[#FADA9A] text-[#102441] rounded-sm flex items-center gap-2 transition-all duration-200 shadow-xs"
                  >
                    <Image
                      src={getAssetPath("/assets/images/premium-icon.png")}
                      alt="Company Logo"
                      width={16}
                      height={16}
                      priority
                      className="object-contain cursor-pointer"
                    />
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <a href={item.href} className="px-3">
                    {item.label}
                  </a>
                )}

                {index !== navItems.length - 1 && (
                  <span className="text-gray-300">|</span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 bg-primary text-white rounded-md flex items-center justify-center transition-all duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ✅ Mobile Navigation */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-96 border-t border-gray-200" : "max-h-0"
          } bg-white`}
      >
        <div className="flex flex-col px-6 py-4 space-y-4 text-sm font-semibold text-gray-700">
          {navItems.map((item) => {
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-black transition-colors py-1 text-center"
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}