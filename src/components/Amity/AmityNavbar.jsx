"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function AmityNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Courses", href: "#programmes" },
    { label: "Approvals", href: "#approvals" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faqs" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Exact SODE Icon Logo */}
          <Link href="/" className="flex items-center gap-2 group py-1">
            <Image
              src="/assets/images/sode_icon.png"
              alt="SODE"
              width={60}
              height={60}
              className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          {/* Right Navigation Links (Courses, Approvals, About, FAQ) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-11">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-bold text-[#084183] hover:text-blue-600 transition-colors py-1 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#084183] hover:bg-slate-100 transition cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="px-5 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block py-2 text-base font-bold text-[#084183] hover:text-blue-600 transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
