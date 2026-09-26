import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/about-us");
  return constructMetadata(pageMeta, {
    title: "About Us - Distance Education School",
    description:
      "Learn about Distance Education School, India's leading online education counseling and guidance portal, helping students explore and compare accredited programs.",
    canonicalUrl: "https://distanceeducationschool.com/about-us",
  });
}

export default function AboutUsLayout({ children }) {
  return children;
}
