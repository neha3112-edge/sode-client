import React from "react";

const SITE_URL = "https://sode.co.in";

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "Are the degrees and certificates from these programs globally recognised?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All programs of Top International Global Universities that are offered through SODE are from accredited institutions such as WES-recognised, AACSB-accredited, or approved by British/Swiss/US agencies, ensuring global validity.",
      },
    },
    {
      "@type": "Question",
      name: "What documents are typically required during the application process?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Professionals are required to have a structured document set of 10th and 12th marksheets, Bachelors degree certificate/marksheets, and Master's degree certificate/marksheets. Also, they need to have valid identity proofs, such as an Aadhaar Card and a PAN Card, for verification purposes. Candidates applying for programmes with work experience criteria must also provide an experience letter. A recent passport-size photograph is required to complete the application and enrollment process.",
      },
    },
    {
      "@type": "Question",
      name: "Is there an entrance exam required to enrol in any executive educational programs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, there is no entrance exam required for executive educational programs. Applicants can enrol easily having bachelors and masters degree, and some programs require prior work experience.",
      },
    },
    {
      "@type": "Question",
      name: "Are there any scholarships available for programs listed on SODE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, SODE offers flexible financing options where aspirants can enrol with NO cost EMI. As per the course duration, they can easily balance and divide it per month.",
      },
    },
    {
      "@type": "Question",
      name: "Are these degrees valid in India and internationally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All university partners listed on SODE include international universities like Golden Gate University, which is WES & AACSB accredited, Rushford Business School is QS 5-star rated, and Edgewood, which holds ACBSP accreditation, making them globally excellent. Indian institutions like IIMs and IITs are government-recognised under UGC norms.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum work experience required to enrol in Executive Management Programs & Certification Courses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SODE offers a diverse portfolio of executive management programmes and certifications designed to equip professionals with technological skills powered by Data science, AI, and ML needed for upskilling. Most Executive Management Programs and Certification Courses require candidates to have a minimum of 3 years of professional work experience, although eligibility criteria may vary depending on the programme and partnering university.",
      },
    },
  ],
};

export default function FaqJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
