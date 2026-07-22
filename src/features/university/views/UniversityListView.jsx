"use client";

import React, { useState } from "react";
import { Input, Button, Row, Col, Tag, Breadcrumb, Empty } from "antd";
import {
  SearchOutlined,
  CheckCircleFilled,
  StarFilled,
  SwapOutlined,
  BookOutlined,
  EnvironmentOutlined,
  BankOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "#1C3569", "#4F46E5", "#0369A1", "#047857", "#B45309",
  "#7C3AED", "#BE185D", "#0E7490", "#9A3412", "#374151",
];

function getAvatarColor(name = "") {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

/**
 * Resolve logo/image URL from a populated Media object { _id, name, alt, url }
 * URL is already cleaned and absolute (handled in api.js service).
 */
function resolveMediaUrl(media) {
  if (!media) return null;
  if (typeof media === "object" && media !== null) return media.url || null;
  return null;
}

// ─── UniversityCard ────────────────────────────────────────────────────────────

function UniversityCard({ uni }) {
  const { isInCompare, toggleCompare } = useCompare();
  const [logoErr, setLogoErr] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const name = uni?.name || "University";
  const slug = uni?.slug || "";
  const location = uni?.location || "";
  const type = uni?.type || "";
  const rating = typeof uni?.rating === "number" ? uni.rating : 4.8;
  const reviewsCount = typeof uni?.reviewsCount === "number" ? uni.reviewsCount : 250;

  const approvals = Array.isArray(uni?.approvals) ? uni.approvals : [];
  const courses = Array.isArray(uni?.courses) ? uni.courses : [];

  // Featured program text (populated or fallback)
  const featuredCourse = uni?.featuredCourse || (courses[0]?.title ?? null);
  const extraCount = courses.length > 1 ? courses.length - 1 : 0;

  // logoSrc → Media { url, alt, name }
  const logoUrl = !logoErr ? resolveMediaUrl(uni?.logoSrc) : null;
  const imageSrc = !imgErr ? resolveMediaUrl(uni?.imageSrc) : null;
  const logoAlt = uni?.logoSrc?.alt || uni?.logoSrc?.name || name;
  const imgAlt = uni?.imageSrc?.alt || uni?.imageSrc?.name || name;

  const avatarBg = getAvatarColor(name);
  const inCompare = isInCompare(slug);

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden group">

      {/* ── Campus Banner + Logo overlay ── */}
      <div className="relative h-28 shrink-0">
        {/* Banner / campus image */}
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={imgAlt}
            className="w-full h-full object-cover"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: `linear-gradient(135deg, ${avatarBg}22 0%, ${avatarBg}44 100%)` }}
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-white/90 via-white/20 to-transparent" />

        {/* Type badge — top right */}
        {type && (
          <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider text-white bg-[#1C3569]/80 backdrop-blur-sm rounded-full px-2.5 py-1">
            {type}
          </span>
        )}

        {/* Logo — bottom left overlapping */}
        <div
          className="absolute -bottom-5 left-4 w-14 h-14 rounded-xl border-2 border-white shadow-md flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: logoUrl ? "#fff" : avatarBg }}
        >
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={logoAlt}
              className="w-full h-full object-contain p-1"
              onError={() => setLogoErr(true)}
            />
          ) : (
            <span className="text-white text-xl font-extrabold select-none">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* ── Name / Location ── */}
      <div className="pt-8 px-4 pb-3">
        <h3 className="text-base font-bold text-slate-800 m-0 leading-snug line-clamp-1">
          {name}
        </h3>
        {location && (
          <span className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
            <EnvironmentOutlined className="text-[10px] text-slate-400" />
            {location}
          </span>
        )}
      </div>

      {/* ── Approvals ── */}
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

      {/* ── Featured Program ── */}
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

      {/* ── Footer ── */}
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
            onClick={() => toggleCompare(uni)}
            className={`font-semibold rounded-lg h-8 px-2.5 text-xs cursor-pointer ${inCompare
                ? "border-amber-500 bg-amber-50 text-amber-700"
                : "border-slate-300 text-slate-600"
              }`}
          >
            {inCompare ? "✓ Comparing" : "+ Compare"}
          </Button>

          <Link href={`/universities/${slug}`}>
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

// ─── UniversityListView (Page) ─────────────────────────────────────────────────

export default function UniversityListView({ initialUniversities }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Pure backend data — no static fallback
  const universities = Array.isArray(initialUniversities) ? initialUniversities : [];

  // Dynamic filter types from backend PartnerUniversity.type field
  const uniqueTypes = [
    "All",
    ...Array.from(new Set(universities.map((u) => u?.type).filter(Boolean))),
  ];

  const filtered = universities.filter((uni) => {
    const name = (uni?.name || "").toLowerCase();
    const loc = (uni?.location || "").toLowerCase();
    const q = searchTerm.toLowerCase();
    const matchSearch = !q || name.includes(q) || loc.includes(q);
    const matchFilter =
      activeFilter === "All" ||
      (uni?.type || "").toLowerCase() === activeFilter.toLowerCase();
    return matchSearch && matchFilter;
  });

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <Breadcrumb
          className="mb-6"
          items={[
            { title: <Link href="/">Home</Link> },
            { title: "Universities" },
          ]}
        />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1C3569] m-0 flex items-center gap-3">
            <BankOutlined />
            Partner Universities
          </h1>
          <p className="text-slate-500 mt-2 m-0 text-base max-w-xl">
            Compare and choose from UGC-DEB approved and top international accredited universities.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Input
            placeholder="Search universities by name or location..."
            prefix={<SearchOutlined className="text-slate-400" />}
            className="h-11 max-w-sm rounded-xl border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />

          <div className="flex gap-2 flex-wrap">
            {uniqueTypes.map((filter) => (
              <Button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 h-9 font-semibold text-sm cursor-pointer transition-all ${activeFilter === filter
                    ? "bg-[#1C3569] text-white border-none shadow-sm hover:bg-[#1C3569]! hover:text-white!"
                    : "border-slate-200 text-slate-600 hover:border-[#1C3569]! hover:text-[#1C3569]!"
                  }`}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        {universities.length > 0 && (
          <p className="text-sm text-slate-500 mb-6 font-medium">
            Showing{" "}
            <span className="font-bold text-slate-700">{filtered.length}</span>{" "}
            of{" "}
            <span className="font-bold text-slate-700">{universities.length}</span>{" "}
            universities
          </p>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <Row gutter={[24, 24]}>
            {filtered.map((uni) => (
              <Col xs={24} sm={12} key={uni?.slug || String(uni?._id)}>
                <UniversityCard uni={uni} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm py-20 text-center">
            <Empty
              description={
                <span className="text-slate-400 text-base font-medium">
                  {universities.length === 0
                    ? "No universities available at the moment."
                    : "No universities match your search criteria."}
                </span>
              }
            />
          </div>
        )}

      </div>
    </div>
  );
}
