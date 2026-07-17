"use client";

import Link from "next/link";
import { Button, Card } from "antd";
import {
  ArrowLeftOutlined,
  BookOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

/* =========================================================
   QUICK LINKS
========================================================= */

const quickLinks = [
  {
    title: "Explore Programs",
    description:
      "Discover online MBA, DBA, AI, Data Science and executive programs.",
    href: "/#premium-programs",
    icon: <BookOutlined className="text-lg" />,
  },
  {
    title: "Top Universities",
    description:
      "Explore programs from leading Indian and international institutions.",
    href: "/#prestigious-institutions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M6 18.8V13.5" />
        <path d="M18 13.5v5.3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5.3" />
      </svg>
    ),
  },
  {
    title: "Contact Experts",
    description:
      "Connect with our academic counsellors for personalised guidance.",
    href: "/#contact",
    icon: <QuestionCircleOutlined className="text-lg" />,
  },
];

/* =========================================================
   404 PAGE
========================================================= */

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f8fafc] px-4 py-16 sm:px-6 lg:px-8 font-sans text-black">
      {/* =====================================================
          DECORATIVE BACKGROUND
      ====================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#FFC107]/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#1C3569]/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-[#005382]/5 blur-3xl" />
      </div>

      {/* =====================================================
          MAIN CONTENT CONTAINER
      ====================================================== */}
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <Card
          variant="none"
          className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur ant-card-body-p-0"
          styles={{ body: { padding: 0 } }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* =================================================
                LEFT CONTENT PANEL
            ================================================== */}
            <section className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#FFC107]/40 bg-[#FFC107]/10 px-4 py-2">
                <SearchOutlined className="text-[#8B7500] text-sm" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B7500]">
                  Page not found
                </span>
              </div>

              <p className="text-[70px] font-black leading-none text-[#1C3569] sm:text-[96px] m-0">
                404
              </p>

              <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-[#172554] sm:text-4xl m-0">
                We couldn&apos;t find this page
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base m-0">
                The page you are looking for may have been moved, renamed,
                deleted, or the URL may be incorrect. Return to the homepage or
                explore our online programs.
              </p>

              {/* ACTION BUTTONS */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {/* Fixed: legacyBehavior wrapper completely removed */}
                <Link href="/" className="inline-flex">
                  <Button
                    type="primary"
                    icon={<HomeOutlined />}
                    className="h-12 cursor-pointer rounded-xl bg-[#FFC107] border-none text-black font-bold shadow-md hover:!bg-[#e6af06] hover:!text-black flex items-center justify-center gap-2 text-sm px-6"
                  >
                    Back to Home
                  </Button>
                </Link>

                {/* Fixed: legacyBehavior wrapper completely removed */}
                <Link href="/#premium-programs" className="inline-flex">
                  <Button
                    variant="outlined"
                    icon={<ArrowLeftOutlined />}
                    className="h-12 cursor-pointer rounded-xl border-2 border-[#1C3569]/15 text-[#1C3569] font-bold hover:!border-[#1C3569]/30 hover:!bg-[#1C3569]/5 hover:!text-[#1C3569] flex items-center justify-center gap-2 text-sm px-6"
                  >
                    Explore Programs
                  </Button>
                </Link>
              </div>
            </section>

            {/* =================================================
                RIGHT VISUAL GRADIENT PANEL
            ================================================== */}
            <section className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#1C3569] via-[#17305e] to-[#005382] px-6 py-12">
              <div
                aria-hidden="true"
                className="absolute left-6 top-6 h-24 w-24 rounded-full border border-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-8 right-8 h-40 w-40 rounded-full border border-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute right-16 top-16 h-8 w-8 rotate-12 rounded-md bg-[#FFC107]/80"
              />

              <div className="relative flex flex-col items-center text-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md sm:h-40 sm:w-40">
                  <SearchOutlined className="text-5xl text-[#FFC107]" />
                </div>

                <h2 className="mt-7 text-xl font-bold text-white sm:text-2xl m-0">
                  Lost on your learning journey?
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-6 text-white/75 m-0">
                  Our team can help you find the right university, course and
                  admission path.
                </p>
              </div>
            </section>
          </div>
        </Card>

        {/* =====================================================
            BOTTOM QUICK LINKS SECTIONS
        ====================================================== */}
        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {quickLinks.map((item) => {
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group decoration-none block"
              >
                <Card
                  hoverable
                  variant="none"
                  className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#FFC107]/70 hover:shadow-lg"
                  styles={{ body: { padding: "20px" } }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1C3569]/8 text-[#1C3569] transition group-hover:bg-[#FFC107] group-hover:text-black">
                      {item.icon}
                    </div>

                    <div>
                      <h2 className="font-bold text-[#1C3569] text-base m-0 transition group-hover:text-[#1C3569]">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-xs leading-5 text-slate-600 m-0">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </section>

        {/* =====================================================
            SUPPORT FOOTER CALL TEXT
        ====================================================== */}
        <p className="mt-8 text-center text-sm text-slate-500 m-0">
          Need help? Call our admission support team at{" "}
          <a
            href="tel:+917065777755"
            className="font-bold text-[#1C3569] underline decoration-[#FFC107] decoration-2 underline-offset-4"
          >
            +91 7065 7777 55
          </a>
        </p>
      </div>
    </main>
  );
}
