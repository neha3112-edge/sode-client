import { Hero } from "@/components/website/Hero";
import { Category } from "@/components/website/Category";
import { getUniversitiesData } from "@/constants/universitiesData";
import { getAboutData } from "@/constants/aboutData";
import { getFaqData } from "@/constants/faqData";
import { getTestimonialsData } from "@/constants/testimonialsData";
import { getFooterData } from "@/constants/footerData";
import { getPageMetaData } from "@/constants/pageMetaData";
import { request } from "@/services/request";

export const revalidate = 300;

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/");

  return {
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords,
    alternates: {
      canonical: pageMeta.canonicalUrl,
    },
    openGraph: {
      title: pageMeta.ogTitle,
      description: pageMeta.ogDescription,
      images: [{ url: pageMeta.ogImage }],
    },
    twitter: {
      card: pageMeta.twitterCard,
      title: pageMeta.ogTitle,
      description: pageMeta.ogDescription,
      images: [pageMeta.ogImage],
    },
  };
}

export default async function Home() {
  // Parallel High-Speed Data Fetching with ISR Caching
  const [
    heroRes,
    universities,
    coursesData,
    categoryApiData,
  ] = await Promise.all([
    request.dynamicRead({ entity: "hero", endPoint: "public/by-slug", slug: "home", revalidate: 300 }),
    getUniversitiesData(),
    request.dynamicList({ entity: "courses", endPoint: "v1/list", options: { items: 30 }, revalidate: 300 }),
    request.dynamicList({ entity: "category", endPoint: "v1/list", revalidate: 900 }),
  ]);

  const heroData = heroRes?.result || heroRes;
  const programs = coursesData?.result || coursesData?.programs || [];

  const categories = Array.isArray(categoryApiData?.result)
    ? categoryApiData.result
    : Array.isArray(categoryApiData?.categories)
      ? categoryApiData.categories
      : Array.isArray(categoryApiData)
        ? categoryApiData
        : [];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <main className="flex w-full flex-1 flex-col pb-16 lg:pb-0">
        <Hero initialHeroData={heroData} />
        <Category universities={universities} categories={categoryApiData} programs={programs} />
      </main>
    </div>
  );
}




