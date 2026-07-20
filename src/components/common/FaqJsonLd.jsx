import React from "react";

const SITE_URL = "https://sode.co.in";

export default function FaqJsonLd({ faqs = [] }) {
  if (!Array.isArray(faqs) || faqs.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q || item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a || item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
