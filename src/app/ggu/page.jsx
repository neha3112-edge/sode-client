import React from "react";
import GguLandingView from "@/components/landing/universities/ggu/GguLandingView";

export const metadata = {
  title: "Golden Gate University Online DBA | Golden Gate University Online MBA & Programs",
  description:
    "Golden Gate University Online DBA and Golden Gate University Online MBA programs. Golden Gate University online degrees with DBA specializations in Finance, Marketing, Leadership, Business Analytics, and Generative AI. Golden Gate University online DBA fees, MBA fees, eligibility, and admission details.",
  keywords: [
    "Golden Gate University Online",
    "GGU Online DBA",
    "GGU Online MBA",
    "Golden Gate University San Francisco",
    "GGU Online Admissions 2026",
    "GGU Doctorate of Business Administration",
    "GGU Pay After Placement",
    "U.S. Accredited University Online",
  ],
  alternates: {
    canonical: "https://distanceeducationschool.com/ggu/",
  },
  openGraph: {
    title: "Golden Gate University Online DBA | Golden Gate University Online MBA & Programs",
    description:
      "Golden Gate University Online DBA and Golden Gate University Online MBA programs. Golden Gate University online degrees with DBA specializations in Finance, Marketing, Leadership, Business Analytics, and Generative AI.",
    url: "https://distanceeducationschool.com/ggu/",
    siteName: "Distance Education School",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Gate University Online DBA | Golden Gate University Online MBA",
    description:
      "Golden Gate University Online DBA and Online MBA programs. 100% online US-accredited degrees with flexible study options.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GguPage() {
  return <GguLandingView />;
}

