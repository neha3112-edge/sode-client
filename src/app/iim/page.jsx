import React from "react";
import IimLandingView from "@/components/landing/universities/iim/IimLandingView";

export const metadata = {
  title: "IIM Kozhikode HRM Course | HR Analytics & Online HR Courses",
  description:
    "Earn a 6-month professional certificate from IIM Kozhikode in HR Analytics via upGrad. Real-world case studies and industry projects.",
  keywords: [
    "IIM Kozhikode HR Analytics",
    "IIM Kozhikode HRM course",
    "IIM HR analytics course",
    "upGrad IIM Kozhikode",
    "hr analytics certification",
    "IIM Kozhikode HRM",
    "IIM HR course online",
    "IIM Kozhikode distance education",
  ],
  alternates: {
    canonical: "https://distanceeducationschool.com/iim/",
  },
  openGraph: {
    title: "IIM Kozhikode HRM Course | HR Analytics & Online HR Courses",
    description:
      "Earn a 6-month professional certificate from IIM Kozhikode in HR Analytics via upGrad. Real-world case studies and industry projects.",
    url: "https://distanceeducationschool.com/iim/",
    siteName: "Distance Education School",
    images: [
      {
        url: "https://distanceeducationschool.com/iim/assets/img/upgrade_iim_logo.png",
        width: 800,
        height: 600,
        alt: "IIM Kozhikode HRM Analytics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IIM Kozhikode HRM Course | HR Analytics & Online HR Courses",
    description:
      "Earn a 6-month professional certificate from IIM Kozhikode in HR Analytics via upGrad. Real-world case studies and industry projects.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IimPage() {
  return <IimLandingView />;
}

