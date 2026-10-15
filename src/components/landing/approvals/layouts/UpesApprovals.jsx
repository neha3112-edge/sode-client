"use client";

import React from "react";
import Image from "next/image";

export default function UpesApprovals({ approvals = [], brand = {} }) {
  const items = approvals && approvals.length > 0 ? approvals : [];

  return (
    <section id="approvals" className="scroll-mt-16 mt-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <h3>
          <span className="blue">{brand.name || "UPES University Online"}</span>{" "}
          <span className="pink">{brand.approvalsHighlight || "APPROVALS AND RECOGNITIONS"}</span>
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-6">
          {items.map((item, idx) => (
            <div key={idx} className="approval-card">
              <div className="relative w-full h-[90px] sm:h-[105px]">
                <Image
                  src={item.image}
                  alt={item.title || item.tag || "Approval"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <p>{item.text || item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
