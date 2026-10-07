"use client";

import React from "react";

export default function IimWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const heading =
    brand.whyChooseTitle ||
    `Eligibility for ${brand.name || "IIM Kozhikode"} HRM Online Courses`;
  const buttonText = brand.whyChooseBtnText || "Get 100% Free Counseling";

  return (
    <div id="benefits" className="select-none">
      <div className="container">
        <div className="benefits-cnt">
          <br />
          <h2>{heading}</h2>
          {whyChoose.map((item, idx) => (
            <React.Fragment key={idx}>
              <h3>
                <span className="arrow-sym font-normal mr-1.5">&#10142;</span> {item.title}
              </h3>
              <p>{item.desc || item.description}</p>
              <br />
            </React.Fragment>
          ))}
          <button
            type="button"
            className="enquireNowBtn cursor-pointer"
            onClick={() => onOpenApply?.()}
          >
            {buttonText}
          </button>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
