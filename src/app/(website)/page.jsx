import { Hero } from "@/components/website/Hero";
import { Category } from "@/components/website/Category";
import { SearchBar } from "@/components/website/SearchBar";

import { getUniversitiesData } from "@/constants/universitiesData";
import { getAboutData } from "@/constants/aboutData";
import { getFaqData } from "@/constants/faqData";
import { getTestimonialsData } from "@/constants/testimonialsData";
import { getFooterData } from "@/constants/footerData";
import { getPageMetaData } from "@/constants/pageMetaData";
import {
  getWebsiteHero,
  getWebsiteCoursesFilter,
  getWebsiteCategories,
  getWebsiteCategoryOptions,
  getWebsiteUniversityOptions,
  getWebsiteSubcourseOptions,
  getWebsiteDurationOptions,
  getWebsiteFeeOptions,
} from "@/services/api";

export const revalidate = 300; // Next.js ISR: Revalidate cache every 5 minutes

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
  // Parallel Data Fetching via Promise.all (Eliminates SSR Waterfall Delays)
  const [
    heroData,
    universities,
    coursesData,
    categoryApiData,
    aboutData,
    faqs,
    testimonials,
    footerData,
    iimUniversities,
    iitUniversities,
    categoryOptions,
    universityOptions,
    subcourseOptions,
    durationOptions,
    feeOptions,
  ] = await Promise.all([
    getWebsiteHero("home"),
    getUniversitiesData(),
    getWebsiteCoursesFilter({ limit: 30 }),
    getWebsiteCategories(),
    getAboutData(),
    getFaqData(),
    getTestimonialsData(),
    getFooterData(),
    getUniversitiesData({ type: "iim", limit: 10, page: 1 }),
    getUniversitiesData({ type: "iit", limit: 10, page: 1 }),
    getWebsiteCategoryOptions(),
    getWebsiteUniversityOptions(),
    getWebsiteSubcourseOptions(),
    getWebsiteDurationOptions(),
    getWebsiteFeeOptions(),
  ]);

  const categories = Array.isArray(categoryApiData?.result)
    ? categoryApiData.result
    : Array.isArray(categoryApiData?.categories)
      ? categoryApiData.categories
      : Array.isArray(categoryApiData)
        ? categoryApiData
        : [];

  const programs = coursesData?.programs || [];
  const { leftCards, rightCards } = aboutData || {};

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <main className="flex w-full flex-1 flex-col pb-16 lg:pb-0">
        <Hero initialHeroData={heroData} />
        {/* <SearchBar
          categories={categoryOptions.length ? categoryOptions : categories}
          universities={universityOptions}
          subcourses={subcourseOptions}
          durations={durationOptions}
          fees={feeOptions}
        /> */}
        <Category universities={universities} categories={categories} programs={programs} />
      </main>
    </div>
  );
}
