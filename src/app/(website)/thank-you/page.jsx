import ThankYouClient from "@/components/website/ThankYouClient";

/* =========================================================
   NEXT.JS METADATA
========================================================= */

export const metadata = {
  title: "Thank You | SODE",
  description:
    "Thank you for enquiring with SODE. Our counselor will contact you shortly to guide you through the next steps.",
  robots: {
    index: false,
    follow: false,
  },
};

/* =========================================================
   THANK YOU PAGE
========================================================= */

export default function ThankYouPage() {
  return <ThankYouClient conversionSource="lp" homeHref="/" />;
}
