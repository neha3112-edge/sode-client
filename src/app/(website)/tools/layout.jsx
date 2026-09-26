import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/tools");
  return constructMetadata(pageMeta, {
    title: "AI Powered Education Tools - Suggest University, Course & Eligibility",
    description:
      "Explore AI-powered education guidance tools. Find the right university, compare programs, check course eligibility, and get personalized counseling.",
    canonicalUrl: "https://distanceeducationschool.com/tools",
  });
}

export default function ToolsLayout({ children }) {
  return children;
}
