import React from "react";
import LiverpoolLandingView from "@/components/landing/universities/liverpool/LiverpoolLandingView";

export const metadata = {
  title: "Liverpool Business School Online MBA | LJMU Online MBA Program | Distance Education School",
  description:
    "Liverpool Business School Online MBA via LJMU. Explore LJMU Online MBA with specialisations in Finance, Marketing, HR, Business Analytics, and Leadership. Check eligibility, fees & admission details for LBS MBA Pathway.",
  keywords: [
    "Liverpool Business School Online MBA",
    "LJMU Online MBA",
    "IIM Udaipur MBA pathway",
    "upGrad Liverpool MBA",
    "Liverpool MBA specialisations",
    "Liverpool John Moores University online MBA",
    "online MBA distance education",
  ],
  alternates: {
    canonical: "https://distanceeducationschool.com/liverpool/",
  },
  openGraph: {
    title: "Liverpool Business School Online MBA | LJMU Online MBA Program",
    description:
      "Liverpool Business School Online MBA via LJMU with dual certification from IIM Udaipur. 18-month research-focused international MBA.",
    url: "https://distanceeducationschool.com/liverpool/",
    siteName: "Distance Education School",
    images: [
      {
        url: "https://distanceeducationschool.com/liverpool/assets/img/logo_for_liverpool_upgrade.png",
        width: 800,
        height: 600,
        alt: "Liverpool Business School Online MBA",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liverpool Business School Online MBA | LJMU Online MBA Program",
    description:
      "Liverpool Business School Online MBA via LJMU with dual certification from IIM Udaipur. 18-month research-focused international MBA.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LiverpoolPage() {
  return <LiverpoolLandingView />;
}

