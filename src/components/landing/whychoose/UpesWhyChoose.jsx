"use client";

import React from "react";
import Image from "next/image";

export default function UpesWhyChoose({ whyChoose = [], brand = {} }) {
  const items = whyChoose && whyChoose.length > 0 ? whyChoose : [];
  const title = brand.whyChooseTitle || "Why Choose UPES University Online (UPES CCE)";

  return (
    <section id="working-p" className="scroll-mt-16">
      <div id="working-cc">
        <h2>{title}</h2>

        <div className="working-p-grid">
          {items.map((item, idx) => {
            const isLeftBorder = idx === 2 || idx === 3;
            const borderClass = isLeftBorder
              ? "working-p-box-left-border"
              : "working-p-box-right-border";

            return (
              <div key={idx} className={borderClass}>
                <div className="working-p-icon">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc || item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
