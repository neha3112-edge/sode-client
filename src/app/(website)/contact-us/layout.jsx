import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/contact-us");
  return constructMetadata(pageMeta, {
    title: "Contact Us - Distance Education School",
    description:
      "Get in touch with Distance Education School for free career and admission guidance. Our experts help you choose the right online or distance education program.",
    canonicalUrl: "https://distanceeducationschool.com/contact-us",
  });
}

export default function ContactUsLayout({ children }) {
  return children;
}
