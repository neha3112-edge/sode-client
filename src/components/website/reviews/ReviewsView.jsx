"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Pagination } from "antd";
import { request } from "@/services/request";

// Google "G" Logo SVG
function GoogleIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.28-2.1 3.66-5.2 3.66-9.12z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.13z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
      />
    </svg>
  );
}

// Star Rating Display
function StarRating({ rating = 5, size = "w-3.5 h-3.5" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= rating;
        return (
          <svg
            key={star}
            viewBox="0 0 20 20"
            className={`${size} ${
              isFilled ? "text-[#F59E0B] fill-[#F59E0B]" : "text-slate-200 fill-slate-200"
            }`}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
}

// Avatar Helper with Google-style Solid Muted Avatar Colors
function UserAvatar({ name = "User", avatarUrl = "" }) {
  const [imgError, setImgError] = useState(false);
  const initial = (name || "U").trim().charAt(0).toUpperCase();

  // Solid avatar background colors matching Google Reviews
  const solidColors = [
    "bg-[#5D4037]", // brown (like Mrigendra Singh in screenshot)
    "bg-[#4A148C]", // deep purple (like Yuvraj Patil in screenshot)
    "bg-[#1565C0]", // royal blue
    "bg-[#00695C]", // teal
    "bg-[#AD1457]", // magenta
    "bg-[#E65100]", // deep orange
    "bg-[#37474F]", // blue grey
    "bg-[#2E7D32]", // dark green
  ];
  const charCode = initial.charCodeAt(0) || 0;
  const bgColor = solidColors[charCode % solidColors.length];

  if (avatarUrl && !imgError) {
    return (
      <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 ring-1 ring-slate-200/80 bg-slate-100">
        <Image
          src={avatarUrl}
          alt={name}
          width={36}
          height={36}
          unoptimized
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 ${bgColor}`}
    >
      {initial}
    </div>
  );
}

// Single Review Card Matching Reference Image
function ReviewCard({ review, onOpenModal }) {
  const isLong = review.text && review.text.length > 90;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-3.5 sm:p-4 flex flex-col justify-between h-full group">
      {/* Top Section */}
      <div>
        {/* User Info Row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <UserAvatar name={review.name} avatarUrl={review.avatar} />
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#11233E] transition-colors truncate">
                {review.name}
              </h3>
              {review.time && (
                <p className="text-[11px] text-slate-400 font-medium leading-none mt-0.5">
                  {review.time}
                </p>
              )}
            </div>
          </div>

          {/* Clean Google Logo Icon (top-right) */}
          <div className="shrink-0 pt-0.5" title="Google Review">
            <GoogleIcon className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Star Rating Row */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <StarRating rating={review.rating} size="w-3 h-3" />
          <span className="text-xs font-bold text-slate-800">
            {review.rating}.0
          </span>
        </div>

        {/* Review Text */}
        <div className="mt-1.5 flex flex-col justify-start">
          <p className="text-slate-600 text-xs sm:text-[12.5px] leading-snug line-clamp-2 m-0">
            {review.text || "Verified 5-Star rating on Google"}
          </p>
          {isLong && (
            <button
              type="button"
              onClick={() => onOpenModal(review)}
              className="mt-0.5 text-xs font-bold text-[#11233E] hover:underline cursor-pointer inline-block text-left"
            >
              Read full
            </button>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1 font-medium text-emerald-600 text-[11px] sm:text-xs">
          <svg
            className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Google Verified
        </span>

        <span className="text-slate-400 font-mono text-[11px]">
          #{review.id}
        </span>
      </div>
    </div>
  );
}

export default function ReviewsView({ data = null }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalReview, setActiveModalReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchTimerRef = useRef(null);
  const ITEMS_PER_PAGE = 15;

  const initialReviews = Array.isArray(data?.reviews) ? data.reviews : [];
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [totalCount, setTotalCount] = useState(
    data?.pagination?.total ?? data?.totalReviews ?? initialReviews.length
  );
  const [tabCounts, setTabCounts] = useState(
    data?.counts ?? {
      all: data?.totalReviews || 1026,
      fiveStar: 850,
      fourStar: 133,
      critical: 43,
    }
  );

  const title = data?.title || "Distance Education School Reviews";
  const rating = data?.rating || 4.7;
  const totalReviews = data?.totalReviews || 1027;
  const scale = data?.scale || "Excellent";
  const companyName = data?.companyName || "Distance Education School";
  const googleReviewUrl =
    data?.googleReviewUrl ||
    "https://search.google.com/local/writereview?placeid=ChIJH5Teux7kDDkRrAsKZz9s-_U";
  const allReviewsUrl =
    data?.allReviewsUrl ||
    "https://search.google.com/local/reviews?placeid=ChIJH5Teux7kDDkRrAsKZz9s-_U";

  // Exact text matching reference image
  const defaultIntroText =
    "At Distance Education School, we're proud to share that we have supported over 50,000 students enrolling on 100+ online and distance learning courses last year. From personalised counselling to a smooth and transparent admission process, our team has worked one-on-one with each student to make their educational journey easier. Choosing distance and online education is a big decision, so we offer detailed guidance, free expert counselling, and complete clarity on course and college options. Today, many of our students excel in top companies, both in India and abroad, and we're genuinely grateful for the trust they've shown by recommending our services to others.";

  const introText = (data?.introText || data?.introHtml ? data?.introHtml?.replace(/<[^>]*>/g, "") : null) || defaultIntroText;

  // 🌐 Backend Dynamic Fetcher
  const fetchReviewsFromBackend = async (page = 1, filter = activeFilter, query = searchQuery) => {
    setLoading(true);
    try {
      const res = await request.dynamicList({
        entity: "student-review",
        endPoint: "public/list",
        options: {
          page,
          items: ITEMS_PER_PAGE,
          filter,
          q: query,
        },
      });

      const resData = res?.result ?? res;
      if (resData && Array.isArray(resData.reviews)) {
        setReviewsList(resData.reviews);
      }
      if (res?.pagination?.total !== undefined) {
        setTotalCount(res.pagination.total);
      }
      if (resData?.counts) {
        setTabCounts(resData.counts);
      }
    } catch (err) {
      console.error("[ReviewsView] Error fetching reviews from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchReviewsFromBackend(newPage, activeFilter, searchQuery);
    if (typeof window !== "undefined") {
      const el = document.getElementById("reviews-grid-section");
      if (el) {
        const yOffset = -90;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      } else {
        window.scrollTo({ top: 400, behavior: "smooth" });
      }
    }
  };

  const handleFilterClick = (tabId) => {
    setActiveFilter(tabId);
    setCurrentPage(1);
    fetchReviewsFromBackend(1, tabId, searchQuery);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setCurrentPage(1);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      fetchReviewsFromBackend(1, activeFilter, val);
    }, 350);
  };

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800 font-sans min-h-screen">
      {/* ─── 1. HERO BANNER (Deep Midnight Navy #11233E) ─── */}
      <div className="w-full bg-[#11233E] text-white pt-8 sm:pt-12 pb-12 sm:pb-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2.5 sm:mb-3">
            {title}
          </h1>

          <p className="text-xs sm:text-[13.5px] text-slate-200/90 leading-relaxed font-normal">
            {introText}
          </p>
        </div>
      </div>

      {/* ─── 2. FLOATING GOOGLE OVERVIEW CARD (Compact Padding) ─── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-9 relative z-10">
        <div className="bg-white rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          {/* Left: Google G in rounded-full circular badge + Excellent + Name + Stars */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center shrink-0">
              <GoogleIcon className="w-5.5 h-5.5" />
            </div>

            <div>
              <div className="text-[#1a73e8] font-bold text-xs leading-none">
                {scale}
              </div>
              <div className="text-slate-900 font-extrabold text-sm sm:text-base leading-tight mt-0.5">
                {companyName}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-extrabold text-slate-800 text-xs">
                  {rating}
                </span>
                <StarRating rating={5} size="w-3 h-3" />
                <span className="text-[11px] text-slate-500 font-medium ml-0.5">
                  ({totalReviews} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Right: See All & Review Us CTAs */}
          <div className="flex items-center gap-2">
            <a
              href={allReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#11233E] hover:bg-[#1a3660] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              See all
            </a>

            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <span>Review us</span>
              <span className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center shrink-0">
                <GoogleIcon className="w-2 h-2" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── 3. MAIN CONTENT AREA (Filter Tabs, Search, and 3-Col Review Cards) ─── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-12">
        {/* Controls: Filter Pills & Search Bar inside white container box */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-2.5 sm:p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: `All (${tabCounts.all ?? 1026})` },
              { id: "5", label: `★ 5 (${tabCounts.fiveStar ?? 850})` },
              { id: "4", label: `★ 4 (${tabCounts.fourStar ?? 133})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleFilterClick(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === tab.id
                    ? "bg-[#11233E] text-white"
                    : "bg-[#EEF2F6] text-slate-700 hover:bg-slate-200 font-medium"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative shrink-0">
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full sm:w-64 pl-8 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#11233E] transition"
            />
            <svg
              className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Reviews Grid */}
        <div id="reviews-grid-section" className="relative min-h-[300px]">
          {loading && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-2xs z-20 flex items-center justify-center rounded-2xl">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-slate-200 text-xs font-semibold text-[#11233E]">
                <div className="w-4 h-4 border-2 border-[#11233E] border-t-transparent rounded-full animate-spin" />
                <span>Loading reviews...</span>
              </div>
            </div>
          )}

          {reviewsList.length === 0 && !loading ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80 text-slate-500">
              <div className="text-2xl mb-1">🔍</div>
              <p className="text-xs font-medium">No reviews found matching your search filter.</p>
              <button
                onClick={() => {
                  handleFilterClick("all");
                  setSearchQuery("");
                }}
                className="mt-2 text-xs text-[#11233E] font-bold hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              {/* 3 Columns Review Card Grid with compact gap */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 mb-6 auto-rows-fr">
                {reviewsList.map((rev) => (
                  <ReviewCard
                    key={rev.id || rev._id}
                    review={rev}
                    onOpenModal={setActiveModalReview}
                  />
                ))}
              </div>

              {/* Ant Design Pagination */}
              {totalCount > ITEMS_PER_PAGE && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 pb-8 px-1">
                  <span className="text-xs font-semibold text-slate-500 text-center sm:text-left">
                    Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalCount)}–{Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} reviews
                  </span>
                  <Pagination
                    current={currentPage}
                    total={totalCount}
                    pageSize={ITEMS_PER_PAGE}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    responsive
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* ─── 3. BOTTOM CTA BANNER ─── */}
        <div className="bg-[#11233E] rounded-2xl p-6 sm:p-8 text-white text-center shadow-md mb-12 relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
              Are you a Distance Education School Student?
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-200/90 mb-4 leading-relaxed">
              Your genuine feedback helps thousands of aspiring students make informed decisions about their higher education and career paths.
            </p>
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#11233E] hover:bg-slate-100 font-bold px-5 py-2.5 rounded-lg text-xs shadow-sm transition-all cursor-pointer"
            >
              <span>Write a Review on Google</span>
              <GoogleIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ─── 4. FULL REVIEW MODAL POPUP ─── */}
      {activeModalReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          onClick={() => setActiveModalReview(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative border border-slate-100 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalReview(null)}
              className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 pr-6">
              <UserAvatar name={activeModalReview.name} avatarUrl={activeModalReview.avatar} />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {activeModalReview.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <StarRating rating={activeModalReview.rating} size="w-3 h-3" />
                  <span className="text-[11px] text-slate-400 font-medium">
                    {activeModalReview.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Full Review Text */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-slate-700 text-xs sm:text-[13px] leading-relaxed">
              <p className="whitespace-pre-line m-0">{activeModalReview.text}</p>
            </div>

            {/* Modal Footer */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                <GoogleIcon className="w-3.5 h-3.5" />
                Verified Google Review
              </span>
              <button
                type="button"
                onClick={() => setActiveModalReview(null)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
