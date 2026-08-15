"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Input, Button, Row, Col, Tag, Breadcrumb, Empty, Pagination, Skeleton } from "antd";
import {
  SearchOutlined,
  CheckCircleFilled,
  StarFilled,
  SwapOutlined,
  BookOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useCompare } from "@/context";
import { getUniversities } from "@/services/api";
import { getAssetPath } from "@/lib/utils";
import WebsiteLayout from "@/components/layout/WebsiteLayout";

const AVATAR_COLORS = [
  "#1C3569", "#4F46E5", "#0369A1", "#047857", "#B45309",
  "#7C3AED", "#BE185D", "#0E7490", "#9A3412", "#374151",
];

function getAvatarColor(name = "") {
  const idx = (name || "U").charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

function resolveMediaUrl(media) {
  if (!media) return null;
  return getAssetPath(media, null);
}

function UniversityCard({ uni }) {
  const { toggleCompare, isInCompare } = useCompare();
  const [logoErr, setLogoErr] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  if (!uni) return null;

  const name = uni?.name || "University";
  const slug = uni?.slug || uni?._id || "";
  const type = uni?.type || uni?.category?.name || (uni?.isTop ? "Top" : (uni?.isFeatured ? "Featured" : ""));
  const location = uni?.location || [uni?.city?.name, uni?.state?.name, uni?.country?.name].filter(Boolean).join(", ") || "";

  // Real approvals from DB
  const rawApprovals = Array.isArray(uni?.approvals)
    ? uni.approvals.map((a) => (typeof a === "object" ? a.name || a.code || a.title || a.description || "" : a)).filter(Boolean)
    : [];

  const approvals = [...rawApprovals];
  if (uni?.naac_rating?.grade || uni?.naac_rating?.name) {
    approvals.push(`NAAC ${uni.naac_rating.grade || uni.naac_rating.name}`);
  }

  const rating = Number(uni?.rating || uni?.avg_rating || 4.8).toFixed(1);
  const reviewsCount = typeof uni?.reviewsCount === "number" ? uni.reviewsCount : 250;

  const coursesList = Array.isArray(uni?.courses) ? uni.courses : [];
  const featuredCourse = uni?.featuredCourse || coursesList[0]?.name || coursesList[0]?.title || "";
  const extraCount = Math.max(0, (coursesList.length || uni?.coursesCount || 0) - 1);

  const logoUrl = !logoErr ? resolveMediaUrl(uni?.logoSrc || uni?.logo) : null;
  const imageSrc = !imgErr ? resolveMediaUrl(uni?.imageSrc || uni?.bannerImg || uni?.image) : null;
  const logoAlt = uni?.logoSrc?.name || uni?.logo?.name || name;
  const imgAlt = uni?.imageSrc?.name || uni?.bannerImg?.name || name;

  const avatarBg = getAvatarColor(name);
  const inCompare = isInCompare(slug);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl flex flex-col h-full overflow-hidden group">

      {/* Campus Banner + Logo overlay */}
      <div className="relative h-28 shrink-0">
        {/* Banner image wrapper */}
        <div className="absolute inset-0 overflow-hidden">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imgAlt}
              fill
              unoptimized
              loading="eager"
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgErr(true)}
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ background: `linear-gradient(135deg, ${avatarBg}22 0%, ${avatarBg}44 100%)` }}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-white/90 via-white/20 to-transparent" />
        </div>

        {type && (
          <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider text-white bg-[#1C3569]/80 backdrop-blur-sm rounded-full px-2.5 py-1 z-10">
            {type}
          </span>
        )}

        {/* Floating Logo (outside overflow-hidden) */}
        <div
          className="absolute -bottom-6 left-4 w-14 h-14 rounded-xl border-2 border-white bg-white flex items-center justify-center overflow-hidden z-20 p-1"
          style={{ backgroundColor: logoUrl ? "#fff" : avatarBg }}
        >
          {logoUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={logoUrl}
                alt={logoAlt}
                fill
                unoptimized
                className="object-contain"
                onError={() => setLogoErr(true)}
              />
            </div>
          ) : (
            <span className="text-white text-xl font-extrabold select-none">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Name / Location */}
      <div className="pt-8 px-4 pb-3">
        <Link href={`/courses?university=${encodeURIComponent(slug)}`} className="hover:text-blue-600 transition-colors block">
          <h3 className="text-base font-bold text-slate-800 m-0 leading-snug line-clamp-1">
            {name}
          </h3>
        </Link>
        {location && (
          <span className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
            <EnvironmentOutlined className="text-[10px] text-slate-400 shrink-0" />
            {location}
          </span>
        )}
      </div>

      {/* Approvals */}
      {approvals.length > 0 && (
        <div className="px-4 pb-3 flex gap-1.5 flex-wrap">
          {approvals.slice(0, 3).map((approval, i) => (
            <Tag
              key={i}
              className="text-xs font-semibold border-none rounded-full bg-blue-50 text-blue-700 px-2 py-0.5 m-0"
            >
              <CheckCircleFilled className="mr-1 text-[8px] text-blue-400" />
              {approval}
            </Tag>
          ))}
        </div>
      )}

      <div className="h-px bg-slate-100 mx-4" />

      {/* Featured Program */}
      <div className="px-4 py-3 grow">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-1">
          <BookOutlined className="text-[9px]" />
          Featured Program
        </span>
        {featuredCourse ? (
          <p className="text-sm font-semibold text-slate-700 m-0 line-clamp-2 leading-snug">
            {featuredCourse}
            {extraCount > 0 && (
              <span className="text-slate-400 font-normal ml-1">
                +{extraCount} more
              </span>
            )}
          </p>
        ) : (
          <p className="text-sm text-slate-400 italic m-0">Executive &amp; Online Degrees</p>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 flex justify-between items-center gap-2 mt-auto">
        <div className="flex items-center gap-1">
          <StarFilled className="text-amber-500 text-xs" />
          <span className="text-sm font-bold text-slate-700">{rating}</span>
          <span className="text-xs text-slate-400">({reviewsCount})</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="small"
            type={inCompare ? "default" : "dashed"}
            icon={<SwapOutlined className={inCompare ? "text-amber-600" : ""} />}
            onClick={() => {
              const compareItem = {
                _id: uni._id,
                slug: slug,
                title: featuredCourse || `${name} Online Programs`,
                uniName: name,
                uniSlug: slug,
                logoUrl: logoUrl,
                university: uni,
              };
              toggleCompare(compareItem);
            }}
            className={`font-semibold rounded-lg h-8 px-2.5 text-xs cursor-pointer ${inCompare
              ? "border-amber-500 bg-amber-50 text-amber-700"
              : "border-slate-300 text-slate-600"
              }`}
          >
            {inCompare ? "✓ Comparing" : "+ Compare"}
          </Button>

          <Link href={`/courses?university=${encodeURIComponent(slug)}`}>
            <Button
              size="small"
              type="primary"
              className="bg-[#1C3569] hover:bg-[#122449]! border-none font-semibold rounded-lg h-8 px-3 cursor-pointer text-xs"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function UniversitiesPage() {
  const router = useRouter();
  const ITEMS_PER_PAGE = 12;

  const [allUniversities, setAllUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;
    getUniversities({ limit: 500 })
      .then((res) => {
        if (!isMounted) return;
        const data = Array.isArray(res?.result) ? res.result : (Array.isArray(res) ? res : []);
        setAllUniversities(data);
      })
      .catch((err) => console.error("Failed to load universities:", err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const uniqueTypes = useMemo(() => {
    const types = Array.from(new Set(allUniversities.map((u) => u?.type || u?.category?.name).filter(Boolean)));
    return ["All", ...types];
  }, [allUniversities]);

  const filtered = useMemo(() => {
    return allUniversities.filter((uni) => {
      const name = (uni?.name || "").toLowerCase();
      const loc = (uni?.location || "").toLowerCase();
      const q = searchTerm.toLowerCase();
      const matchSearch = !q || name.includes(q) || loc.includes(q);
      const matchFilter =
        activeFilter === "All" ||
        (uni?.type || uni?.category?.name || "").toLowerCase() === activeFilter.toLowerCase();
      return matchSearch && matchFilter;
    });
  }, [allUniversities, searchTerm, activeFilter]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUniversities = useMemo(() => {
    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filtered, startIndex]);

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleFilterChange = (type) => {
    setActiveFilter(type);
    setCurrentPage(1);
  };

function UniversitySkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col h-full shadow-none">
      {/* Shimmer Banner */}
      <div className="h-32 sm:h-36 bg-slate-200/80 animate-pulse relative" />

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
        {/* Header: Logo + Name */}
        <div className="flex items-center gap-3">
          <Skeleton.Avatar active size="large" shape="square" style={{ borderRadius: 8 }} />
          <div className="flex-1">
            <Skeleton.Input active size="small" style={{ width: "80%", height: 18 }} />
            <Skeleton.Input active size="small" style={{ width: "50%", height: 14, marginTop: 4 }} />
          </div>
        </div>

        {/* Badges / Approvals */}
        <div className="flex gap-1.5 mt-2">
          <Skeleton.Button active size="small" style={{ width: 60, height: 20, borderRadius: 12 }} />
          <Skeleton.Button active size="small" style={{ width: 75, height: 20, borderRadius: 12 }} />
          <Skeleton.Button active size="small" style={{ width: 65, height: 20, borderRadius: 12 }} />
        </div>

        {/* Footer CTA */}
        <div className="pt-3 border-t border-slate-100 flex justify-between items-center mt-auto">
          <Skeleton.Input active size="small" style={{ width: 90, height: 16 }} />
          <Skeleton.Button active size="small" style={{ width: 80, height: 28, borderRadius: 8 }} />
        </div>
      </div>
    </div>
  );
}

  return (
    <WebsiteLayout py="py-4 sm:py-6" bg="#f8fafc">
      {/* Back Button + Breadcrumb */}
      <div className="flex items-center gap-2.5 mb-4 sm:mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center justify-center text-slate-500 hover:text-[#1C3569] transition-colors cursor-pointer p-0 shrink-0 -translate-y-[1.5px] bg-transparent border-none outline-none"
          title="Go Back"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
        </button>
        <Breadcrumb
          className="text-xs font-semibold leading-none"
          items={[
            { title: <Link href="/">Home</Link> },
            { title: "Universities" },
          ]}
        />
      </div>

      {/* Shimmer Skeleton vs Real Cards Grid */}
      {loading ? (
        <Row gutter={[20, 20]}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Col xs={24} sm={12} lg={8} key={`uni-skeleton-${index}`}>
              <UniversitySkeletonCard />
            </Col>
          ))}
        </Row>
      ) : filtered.length > 0 ? (
        <>
          <Row gutter={[20, 20]}>
            {paginatedUniversities.map((uni) => (
              <Col xs={24} sm={12} lg={8} key={uni?.slug || String(uni?._id)}>
                <UniversityCard uni={uni} />
              </Col>
            ))}
          </Row>

          {filtered.length > ITEMS_PER_PAGE && (
            <div className="flex justify-center items-center mt-8 sm:mt-10 pt-6 border-t border-slate-200/80">
              <Pagination
                current={currentPage}
                pageSize={ITEMS_PER_PAGE}
                total={filtered.length}
                onChange={(page) => {
                  setCurrentPage(page);
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                showSizeChanger={false}
                showTotal={(totalCount, range) => (
                  <span className="text-xs font-semibold text-slate-500">
                    Showing {range[0]}–{range[1]} of {totalCount} universities
                  </span>
                )}
              />
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 py-20 text-center">
          <Empty
            description={
              <span className="text-slate-400 text-base font-medium">
                No universities match your search criteria.
              </span>
            }
          />
        </div>
      )}
    </WebsiteLayout>
  );
}
