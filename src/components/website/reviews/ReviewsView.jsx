"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

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

// Avatar Helper using next/image with fallback
function UserAvatar({ name = "User", avatarUrl = "" }) {
  const [imgError, setImgError] = useState(false);
  const initial = (name || "U").trim().charAt(0).toUpperCase();

  const colors = [
    "from-blue-600 to-indigo-600",
    "from-emerald-600 to-teal-700",
    "from-purple-600 to-indigo-700",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-cyan-600 to-blue-700",
  ];
  const charCode = initial.charCodeAt(0) || 0;
  const gradientClass = colors[charCode % colors.length];

  if (avatarUrl && !imgError) {
    return (
      <div className="relative w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 ring-1 ring-slate-200/80 shadow-2xs bg-slate-100">
        <Image
          src={avatarUrl}
          alt={name}
          width={40}
          height={40}
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
      className={`w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-2xs bg-gradient-to-tr ${gradientClass}`}
    >
      {initial}
    </div>
  );
}

// Single Review Card with Balanced Typography, Equal Height & Aligned Footers
function ReviewCard({ review, onOpenModal }) {
  const isLong = review.text && review.text.length > 90;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 hover:border-[#072C50]/30 hover:shadow-xs transition-all duration-150 p-4 sm:p-4.5 flex flex-col justify-between h-full group">
      {/* Top Section */}
      <div>
        {/* User Info Row */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <UserAvatar name={review.name} avatarUrl={review.avatar} />
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 text-sm sm:text-[14.5px] leading-snug group-hover:text-[#072C50] transition-colors truncate">
                {review.name}
              </h3>
              {review.time && (
                <p className="text-xs text-slate-400 font-medium leading-none mt-0.5">
                  {review.time}
                </p>
              )}
            </div>
          </div>

          {/* Google Logo Badge */}
          <div
            className="shrink-0 p-1 bg-slate-50 border border-slate-100 rounded-full"
            title="Google Verified Review"
          >
            <GoogleIcon className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Star Rating Row */}
        <div className="flex items-center gap-1.5 mt-2.5">
          <StarRating rating={review.rating} size="w-3.5 h-3.5" />
          <span className="text-xs font-bold text-slate-700">
            {review.rating}.0
          </span>
        </div>

        {/* Review Text Box (Equalized Height with Clear Readable Font) */}
        <div className="mt-2 min-h-[42px] flex flex-col justify-start">
          {review.text ? (
            <div>
              <p className="text-[#334155] text-xs sm:text-[13px] leading-relaxed line-clamp-2 m-0">
                {review.text}
              </p>
              {isLong && (
                <button
                  type="button"
                  onClick={() => onOpenModal(review)}
                  className="mt-0.5 text-xs font-semibold text-[#072C50] hover:underline cursor-pointer inline-block"
                >
                  Read full
                </button>
              )}
            </div>
          ) : (
            <p className="text-slate-400 text-xs italic m-0 pt-0.5">
              Verified 5-Star rating on Google
            </p>
          )}
        </div>
      </div>

      {/* Card Footer: Always sits on the exact same bottom line */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
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

  const reviews = Array.isArray(data?.reviews) ? data.reviews : [];
  const title = data?.title || "Distance Education School Reviews";
  const rating = data?.rating || 4.7;
  const totalReviews = data?.totalReviews || 1027;
  const studentsGuided = data?.studentsGuided || "50,000+";
  const universitiesCount = data?.universitiesCount || "100+";
  const badge = data?.badge || "Google Overall";
  const scale = data?.scale || "Excellent";
  const companyName = data?.companyName || "Distance Education School";
  const googleReviewUrl =
    data?.googleReviewUrl ||
    "https://search.google.com/local/writereview?placeid=ChIJH5Teux7kDDkRrAsKZz9s-_U";
  const allReviewsUrl =
    data?.allReviewsUrl ||
    "https://search.google.com/local/reviews?placeid=ChIJH5Teux7kDDkRrAsKZz9s-_U";
  const introHtml =
    data?.introHtml ||
    `<p class="mb-2">Find genuine reviews of <strong>Distance Education School</strong> (a unit of SODE Education Foundation). The platform helps students compare courses, verify university accreditations, and get personalized counseling for their career paths.</p><p>We partner with UGC-DEB recognized universities to ensure reliable and trustworthy guidance for all online learners across India.</p>`;

  // Filter reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((rev) => {
      if (activeFilter === "5" && rev.rating !== 5) return false;
      if (activeFilter === "4" && rev.rating !== 4) return false;
      if (activeFilter === "critical" && rev.rating >= 4) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = rev.name.toLowerCase().includes(query);
        const matchesText = rev.text && rev.text.toLowerCase().includes(query);
        return matchesName || matchesText;
      }
      return true;
    });
  }, [reviews, activeFilter, searchQuery]);

  // Counts for tabs
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const fourStarCount = reviews.filter((r) => r.rating === 4).length;
  const criticalCount = reviews.filter((r) => r.rating < 4).length;

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      {/* ─── 1. WEBSITE HEADER BANNER (#072C50) ─── */}
      <div className="w-full bg-[#072C50] text-white pt-8 pb-12 sm:pb-14 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-[11px] text-blue-200/80 mb-2 font-medium">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Student Reviews</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
            {title}
          </h1>

          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto font-normal">
            Real experiences and verified testimonials from over 50,000+ students guided for UGC-DEB approved university programs.
          </p>
        </div>
      </div>

      {/* ─── 2. FLOATING OVERALL SUMMARY & STATS BAR ─── */}
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 -mt-8 sm:-mt-9">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-5">
          {/* Stat 1: Overall Rating */}
          <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-base">
              ⭐
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-lg sm:text-xl font-extrabold text-[#072C50]">
                  {rating}
                </span>
                <span className="text-[11px] text-slate-400 font-bold">/ 5.0</span>
              </div>
              <div className="text-xs font-semibold text-slate-600 leading-tight">
                Google Overall
              </div>
            </div>
          </div>

          {/* Stat 2: Total Reviews */}
          <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <GoogleIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-[#072C50]">
                {totalReviews}+
              </div>
              <div className="text-xs font-semibold text-slate-600 leading-tight">
                Verified Reviews
              </div>
            </div>
          </div>

          {/* Stat 3: Guided Students */}
          <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-base">
              🎓
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-[#072C50]">
                50,000+
              </div>
              <div className="text-xs font-semibold text-slate-600 leading-tight">
                Students Guided
              </div>
            </div>
          </div>

          {/* Stat 4: Approved Programs */}
          <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 text-base">
              🏛️
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-[#072C50]">
                100+
              </div>
              <div className="text-xs font-semibold text-slate-600 leading-tight">
                Universities
              </div>
            </div>
          </div>
        </div>

        {/* ─── 3. INTRO STATEMENT & GOOGLE OVERALL BOX ─── */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 mb-5">
          {/* Paragraph Text */}
          <div
            className="text-[#2D3748] text-xs sm:text-[13.5px] leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: introHtml }}
          />

          {/* Divider */}
          <div className="w-full h-px bg-slate-200/70 mb-4" />

          {/* Google Summary Horizontal Box */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8F9FA] rounded-xl p-3.5 sm:p-4 border border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-200/90 flex items-center justify-center bg-white shrink-0 shadow-2xs">
                <GoogleIcon className="w-6 h-6 sm:w-6.5 sm:h-6.5" />
              </div>

              <div>
                <div className="text-[#154fc1] font-bold text-xs sm:text-sm leading-none">
                  {scale}
                </div>
                <div className="text-[#072C50] font-extrabold text-sm sm:text-base leading-tight mt-0.5">
                  {companyName}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="font-extrabold text-slate-800 text-xs">
                    {rating}
                  </span>
                  <StarRating rating={5} size="w-3 h-3" />
                  <span className="text-[11px] text-slate-400 font-medium ml-1">
                    ({totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-2">
              <a
                href={allReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#072C50] hover:bg-[#0c3d6c] text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-2xs transition-colors"
              >
                See all
              </a>

              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-2xs transition-colors"
              >
                <span>Review us</span>
                <span className="bg-white rounded-full p-0.5 inline-flex items-center justify-center">
                  <GoogleIcon className="w-2.5 h-2.5" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ─── 4. CONTROLS BAR: FILTER TABS & SEARCH ─── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-4 bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: `All (${reviews.length})` },
              { id: "5", label: `★ 5 (${fiveStarCount})` },
              { id: "4", label: `★ 4 (${fourStarCount})` },
              { id: "critical", label: `Critical (${criticalCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${activeFilter === tab.id
                    ? "bg-[#072C50] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-60 pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#072C50] focus:bg-white transition"
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

        {/* ─── 5. REVIEWS GRID (COMPACT EQUAL HEIGHT & ALIGNED FOOTERS) ─── */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200/80 text-slate-500">
            <div className="text-2xl mb-1">🔍</div>
            <p className="text-xs font-medium">No reviews found matching your search filter.</p>
            <button
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
              className="mt-2 text-xs text-[#072C50] font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 mb-10 auto-rows-fr">
            {filteredReviews.map((rev) => (
              <ReviewCard
                key={rev.id}
                review={rev}
                onOpenModal={setActiveModalReview}
              />
            ))}
          </div>
        )}

        {/* ─── 6. BOTTOM CALL-TO-ACTION CARD ─── */}
        <div className="bg-gradient-to-r from-[#072C50] to-[#0c3d6c] rounded-2xl p-6 sm:p-7 text-white text-center shadow-md mb-12 relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-2">
              Are you a Distance Education School Student?
            </h2>
            <p className="text-xs text-blue-100 mb-4 leading-relaxed">
              Your genuine feedback helps thousands of aspiring students make informed decisions about their higher education and career paths.
            </p>
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white text-[#072C50] hover:bg-blue-50 font-bold px-5 py-2.5 rounded-full text-xs shadow-sm transition-all cursor-pointer"
            >
              <span>Write a Review on Google</span>
              <GoogleIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ─── 7. FULL REVIEW MODAL POPUP ─── */}
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
            <div className="flex items-center gap-2.5 pr-6">
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
              <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
                <GoogleIcon className="w-3.5 h-3.5" />
                Verified Google Review
              </span>
              <button
                type="button"
                onClick={() => setActiveModalReview(null)}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-md text-[11px] transition cursor-pointer"
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
