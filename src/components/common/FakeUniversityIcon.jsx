"use client";

import React from "react";

export function FakeUniversityIcon({ className = "w-full h-full", size = 48, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* 🏛️ Classical University Building Structure */}
      {/* Pediment (Triangle Roof) */}
      <path
        d="M6 26L28 10L50 26H6Z"
        fill="#F8FAFC"
        stroke="#64748B"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Roof Cornice / Architrave Bar */}
      <rect
        x="8"
        y="26"
        width="40"
        height="4"
        rx="1"
        fill="#E2E8F0"
        stroke="#64748B"
        strokeWidth="2"
      />

      {/* 4 Classical Pillars */}
      {/* Pillar 1 */}
      <rect x="11" y="30" width="5" height="18" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
      <line x1="11" y1="33" x2="16" y2="33" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="11" y1="45" x2="16" y2="45" stroke="#94A3B8" strokeWidth="1.5" />

      {/* Pillar 2 */}
      <rect x="20.5" y="30" width="5" height="18" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
      <line x1="20.5" y1="33" x2="25.5" y2="33" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="20.5" y1="45" x2="25.5" y2="45" stroke="#94A3B8" strokeWidth="1.5" />

      {/* Pillar 3 */}
      <rect x="30" y="30" width="5" height="18" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
      <line x1="30" y1="33" x2="35" y2="33" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="30" y1="45" x2="35" y2="45" stroke="#94A3B8" strokeWidth="1.5" />

      {/* Pillar 4 */}
      <rect x="39.5" y="30" width="5" height="18" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
      <line x1="39.5" y1="33" x2="44.5" y2="33" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="39.5" y1="45" x2="44.5" y2="45" stroke="#94A3B8" strokeWidth="1.5" />

      {/* Base Plinth Steps */}
      <rect x="8" y="48" width="40" height="4" rx="0.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
      <rect x="5" y="52" width="46" height="4" rx="1" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />

      {/* 🔴 Red 'FAKE' Badge on Top Right */}
      <g filter="url(#fakeShadow)">
        <rect
          x="31"
          y="9"
          width="30"
          height="16"
          rx="3.5"
          fill="#DC2626"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
        <text
          x="46"
          y="21"
          fill="#FFFFFF"
          fontSize="9.5"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          textAnchor="middle"
          letterSpacing="0.5px"
        >
          FAKE
        </text>
      </g>
      <defs>
        <filter id="fakeShadow" x="29" y="8" width="34" height="20" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>
    </svg>
  );
}

export default FakeUniversityIcon;

