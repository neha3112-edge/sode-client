import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/compare-university");
  return constructMetadata(pageMeta, {
    canonicalUrl: "https://sode.co.in/compare-university",
  });
}

export default function CompareLayout({ children }) {
  return children;
}
