"use client";

import React from "react";
import Link from "next/link";
import { Button } from "antd";
import { CloseOutlined, RightOutlined } from "@ant-design/icons";
import { useCompare } from "@/context/CompareContext";
import { getAssetPath } from "@/lib/utils";

export default function CompareDrawerWidget() {
  const { compareList, removeFromCompare, clearCompare, triggerExecuteCompare } = useCompare();

  if (!compareList || compareList.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-4xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xl rounded-2xl p-3 transition-all animate-in fade-in slide-in-from-bottom-5 duration-300">
      
      {/* 🖥️ DESKTOP LAYOUT: Single Clean Flex Row */}
      <div className="hidden sm:flex items-center justify-between gap-3 w-full">
        {/* Left: Heading & Count */}
        <div className="flex items-center gap-2 shrink-0 border-r border-slate-100 pr-3">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-extrabold text-xs text-[#1C3569] uppercase tracking-wider">
            Comparing ({compareList.length}/4)
          </span>
        </div>

        {/* Center: Selected Universities Badges */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 flex-1">
          {compareList.map((uni) => (
            <div
              key={uni.slug}
              className="flex items-center gap-2 bg-slate-100/90 border border-slate-200 px-2.5 py-1 rounded-xl shrink-0 group hover:border-slate-300 transition-colors"
            >
              <img
                src={getAssetPath(uni.logoSrc)}
                alt={uni.name}
                className="w-4 h-4 object-contain rounded-xs shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-[11px] font-bold text-slate-700 truncate max-w-[120px]">
                {uni.name}
              </span>
              <button
                type="button"
                onClick={() => removeFromCompare(uni.slug)}
                className="text-slate-400 hover:text-red-600 cursor-pointer ml-0.5 p-0.5 rounded-full transition-colors"
                title="Remove university"
              >
                <CloseOutlined className="text-[9px]" />
              </button>
            </div>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={clearCompare}
            className="text-xs font-bold text-slate-400 hover:text-red-600 cursor-pointer px-2 transition-colors flex items-center gap-1"
          >
            Clear
          </button>

          <Link href="/compare">
            <Button
              type="primary"
              onClick={triggerExecuteCompare}
              className="bg-[#1C3569] hover:!bg-[#0d1d3d] font-extrabold text-xs h-9 px-4 rounded-xl border-none flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              Compare Now ({compareList.length}) <RightOutlined className="text-[9px]" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 📱 MOBILE LAYOUT: Compact Stack with Overlapping Avatars */}
      <div className="flex sm:hidden flex-col gap-2.5 w-full">
        {/* Top Info Bar */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
          {/* Overlapping Logo Avatars */}
          <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-2 overflow-hidden py-0.5">
              {compareList.map((uni) => (
                <div
                  key={uni.slug}
                  className="inline-block w-6 h-6 rounded-full ring-2 ring-white bg-white p-0.5 shadow-2xs overflow-hidden shrink-0"
                >
                  <img
                    src={getAssetPath(uni.logoSrc)}
                    alt={uni.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              ))}
            </div>
            <span className="text-xs font-extrabold text-[#1C3569]">
              {compareList.length} / 4 Selected
            </span>
          </div>

          {/* Reset / Clear */}
          <button
            type="button"
            onClick={clearCompare}
            className="text-[11px] font-bold text-slate-400 hover:text-red-600 transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Bottom Full-Width Action Button */}
        <Link href="/compare" className="w-full">
          <Button
            type="primary"
            onClick={triggerExecuteCompare}
            className="w-full bg-[#1C3569] hover:!bg-[#0d1d3d] font-extrabold text-xs h-10 rounded-xl border-none flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            Compare Selected Universities ({compareList.length}) <RightOutlined className="text-[10px]" />
          </Button>
        </Link>
      </div>

    </div>
  );
}
