"use client";

import React from "react";

export default function UniversityKeyHighlights({
  highlightsData = { title: "", items: [] },
}) {
  if (!highlightsData || !highlightsData.items || highlightsData.items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 sm:p-10 space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-5 text-center">
        {highlightsData.title}
      </h2>

      <div className="overflow-hidden border border-gray-200 shadow-2xs max-w-5xl mx-auto rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0C2B4E] text-white text-xs sm:text-sm font-bold tracking-wide">
                <th className="py-2.5 sm:py-3 px-4 sm:px-6 w-[32%] sm:w-70 border-r border-white/20">
                  Feature
                </th>
                <th className="py-2.5 sm:py-3 px-4 sm:px-6">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-xs sm:text-[13.5px] bg-white">
              {highlightsData.items.map((row, idx) => (
                <tr
                  key={idx}
                  className="bg-white hover:bg-blue-50/30 transition-colors"
                >
                  <td className="py-2.5 px-4 sm:px-6 font-bold text-gray-900 border-r border-gray-200 whitespace-nowrap">
                    {row.feature}
                  </td>
                  <td className="py-2.5 px-4 sm:px-6 text-gray-800 font-normal">
                    {row.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
