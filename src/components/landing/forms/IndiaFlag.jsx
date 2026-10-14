import React from "react";

/**
 * Reusable India Flag SVG icon
 */
export default function IndiaFlag({ className = "w-[18px] h-[12px] rounded-[1px] shadow-xs shrink-0 select-none mr-1" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 480"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path fill="#FF9933" d="M0 0h640v160H0z" />
      <path fill="#FFFFFF" d="M0 160h640v160H0z" />
      <path fill="#128807" d="M0 320h640v160H0z" />
      <g transform="matrix(3.2 0 0 3.2 320 240)">
        <circle r="20" fill="none" stroke="#000080" strokeWidth="2.5" />
        <circle r="4" fill="#000080" />
        <path
          fill="none"
          stroke="#000080"
          strokeWidth="1"
          d="M0-20V20M-20 0H20M-14.1-14.1l28.2 28.2M-14.1 14.1L14.1-14.1M-18.5-7.7l37 15.4M-18.5 7.7l37-15.4M-7.7-18.5l15.4 37M7.7-18.5l-15.4 37"
        />
      </g>
    </svg>
  );
}
