import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/contact");
  return constructMetadata(pageMeta, {
    canonicalUrl: "https://sode.co.in/contact",
  });
}

export default function ContactLayout({ children }) {
  return children;
}
