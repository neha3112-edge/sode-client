"use client";

import React from "react";

export default function IimWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const heading = brand.whyChooseTitle || "Eligibility for IIM Kozhikode HRM Online Courses";
  const buttonText = brand.whyChooseBtnText || "Get 100% Free Counseling";

  const defaultItems = [
    {
      title: "HR Professionals",
      desc: "Working HR professionals can enroll in the IIM Kozhikode HR Analytics Course to enhance decision-making skills and apply analytics in workforce management.",
    },
    {
      title: "Business and Analytics Managers",
      desc: "Managers from different fields can join IIM Kozhikode HRM online courses to integrate data-driven strategies into business and people management.",
    },
    {
      title: "Non-HR Professionals",
      desc: "Graduates or executives from other domains can pursue the HR Analytics programs at IIM Kozhikode to transition into HR-focused or leadership roles.",
    },
    {
      title: "MBA Graduates",
      desc: "Fresh MBA graduates can strengthen their profiles with specialized certification courses in IIM Kozhikode, gaining practical HR analytics expertise for better career opportunities.",
    },
  ];

  const items = whyChoose && whyChoose.length > 0 ? whyChoose : defaultItems;

  return (
    <div id="benefits">
      <div className="container">
        <div className="benefits-cnt">
          <br />
          <h2>{heading}</h2>
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <h3><span className="arrow-sym font-normal mr-1.5">&#10142;</span> {item.title}</h3>
              <p>{item.desc || item.description}</p>
              <br />
            </React.Fragment>
          ))}
          <button
            type="button"
            className="enquireNowBtn"
            onClick={() => onOpenApply?.()}
          >
            {buttonText}
          </button>
          <br /><br />
        </div>
      </div>
    </div>
  );
}
