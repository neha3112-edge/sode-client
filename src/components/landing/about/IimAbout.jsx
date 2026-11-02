"use client";

import React from "react";
import Image from "next/image";
import LandingButton from "../LandingButton";

export default function IimAbout({ about = {}, brand = {} }) {
  const campusImg =
    about.campusImage ||
    about.image ||
    brand.campusImage ||
    "/assets/all_universities_images/iim/iim-university-image.webp";

  const accreditations = about.accreditations || [
    { name: "AMBA", image: "/assets/all_universities_images/iim/amba-iim.webp" },
    { name: "EQUIS", image: "/assets/all_universities_images/iim/equis-iim.webp" },
    { name: "AACSB", image: "/assets/all_universities_images/iim/aacsb-iim.webp" },
    { name: "Ministry of Education", image: "/assets/all_universities_images/iim/ministry-of-education.webp" },
  ];

  const title = about.title || `ABOUT ${brand.shortName || brand.name || "IIM - KOZHIKODE"}`;

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const defaultDescription =
    "IIM Kozhikode is recognized as one of India's leading business schools, known for its innovative teaching, global outlook, and strong industry partnerships. The institute offers a broad portfolio of programs, including executive and online learning opportunities tailored for professionals. With prestigious accreditations such as the Ministry of Education, EQUIS, and AACSB, IIM Kozhikode stands among globally benchmarked institutions. Through its specialized programs, such as IIM Kozhikode's HRM, and advanced certification options, the institute ensures that learners gain both academic depth and practical business insights. These certification courses in IIM Kozhikode are designed to prepare graduates, working executives, and managers to succeed in leadership and analytics-driven roles worldwide.";

  return (
    <div id="about" className="select-none">
      <div className="container">
        <div className="about-cnt">
          <div className="ab1">
            <h2>{title}</h2>
            {paragraphs.length > 0 ? (
              paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
            ) : (
              <p>{about.description || defaultDescription}</p>
            )}
            <br />
            <div className="accreited" id="accreditations">
              <h2>
                Accreditations and Recognitions of IIM <br />Kozhikode
              </h2>
              {accreditations.map((acc, idx) => (
                <div key={idx} className="acc-card">
                  <Image
                    src={acc.image}
                    alt={acc.name || "Accredited Logo"}
                    width={130}
                    height={42}
                    className="img-responsive object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="ab2">
            <Image
              src={campusImg}
              alt="University Image"
              width={560}
              height={420}
              className="img-responsive object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
