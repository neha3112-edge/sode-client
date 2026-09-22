import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/about");
  return constructMetadata(pageMeta, {
    canonicalUrl: "https://sode.co.in/about",
  });
}

export default function AboutLayout({ children }) {
  return children;
}
