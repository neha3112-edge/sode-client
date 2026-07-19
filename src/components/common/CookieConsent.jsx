"use client";

import React, { useState, useEffect } from "react";
import { Cookie, ShieldCheck, X } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("sode_cookie_consent");
    if (!consent) {
      // Delay showing consent banner slightly for smoother UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("sode_cookie_consent", "accepted");
    // Set cookie for server-side/client caching preference (1 year expiration)
    document.cookie = "sode_cookie_consent=accepted; max-age=31536000; path=/; SameSite=Lax";
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem("sode_cookie_consent", "essential");
    document.cookie = "sode_cookie_consent=essential; max-age=31536000; path=/; SameSite=Lax";
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl border border-slate-700/60 flex flex-col gap-4 relative">
        <button
          onClick={handleEssentialOnly}
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition cursor-pointer p-1 rounded-lg hover:bg-slate-800"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl shrink-0 mt-0.5">
            <Cookie className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white m-0 flex items-center gap-1.5">
              We Value Your Experience
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mt-1 m-0">
              We use cookies to store your preferences, speed up page loading on return visits, and deliver a smooth browsing experience.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1 border-t border-slate-800">
          <button
            onClick={handleAcceptAll}
            className="w-full sm:w-auto flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" /> Accept All & Speed Up
          </button>
          <button
            onClick={handleEssentialOnly}
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs py-2.5 px-3 rounded-xl transition-all border border-slate-700 cursor-pointer"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}
