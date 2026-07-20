import { Header } from "@/components/website/Header";
import { Hero } from "@/components/website/Hero";
import { Stats } from "@/components/website/Stats";
import { Courses } from "@/components/website/Courses";
import { Universities } from "@/components/website/Universities";
import { About } from "@/components/website/About";
import { Testimonials } from "@/components/website/Testimonials";
import { FAQ } from "@/components/website/FAQ";
import { Footer } from "@/components/website/Footer";
import FaqJsonLd from "@/components/common/FaqJsonLd";

import { getCoursesData } from "@/constants/coursesData";
import { getUniversitiesData } from "@/constants/universitiesData";
import { getAboutData } from "@/constants/aboutData";
import { getFaqData } from "@/constants/faqData";
import { getTestimonialsData } from "@/constants/testimonialsData";
import { getFooterData } from "@/constants/footerData";
import { getPageMetaData } from "@/constants/pageMetaData";

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
  const { tabs, programs } = await getCoursesData();
  const universities = await getUniversitiesData();
  const { leftCards, rightCards } = await getAboutData();
  const faqs = await getFaqData();
  const testimonials = await getTestimonialsData();
  const { universities: footerUniversities, programs: footerPrograms } =
    await getFooterData();

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <FaqJsonLd />
      <Header />

      <main className="flex w-full flex-1 flex-col md:mt-10">
        <Hero />
        <Stats />
        <Courses initialTabs={tabs} initialPrograms={programs} />
        <Universities initialUniversities={universities} />
        <About initialLeftCards={leftCards} initialRightCards={rightCards} />
        <Testimonials initialTestimonials={testimonials} />
        <FAQ initialFaqs={faqs} />
      </main>

      <Footer
        initialUniversities={footerUniversities}
        initialPrograms={footerPrograms}
      />
    </div>
  );
}
