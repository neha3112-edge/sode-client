"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { request } from "@/services/request";
import Image from "next/image";
import Link from "next/link";
import { useRouter, notFound } from "next/navigation";
import { Table, Select, Input } from "antd";
import {
  Search,
  ChevronDown,
  ChevronUp,
  MapPin,
  Building2,
  Download,
  Plus,
  Check,
  X,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useFormModal } from "@/hooks/useFormModal";
import { useCompare } from "@/hooks/useCompare";
import { Container } from "@/components/common/Container";
import { openWhatsAppBrochure } from "@/lib/whatsappBrochure";
import { getAccreditationHeroContent } from "@/constants/accreditationStaticContent";
import { isFakeUniversitiesSlug } from "@/constants/fakeUniversitiesData";
import { FakeUniversityIcon } from "@/components/common/FakeUniversityIcon";

const getMediaUrl = (obj) => (typeof obj === "string" ? obj : obj?.url || obj?.path || obj?.src || null);

const { Option } = Select;

function SmoothExpandedCard({
  record,
  isClosing,
  onCollapse,
  isInCompare,
  handleGetBrochure,
  handleCompareClick,
  isNaacApproval = false,
  isNirfApproval = false,
  isFakeApproval = false,
  openFormModal,
}) {
  const [isMounted, setIsMounted] = useState(false);
  const compared = isInCompare(record.slug || record._id);

  useEffect(() => {
    let raf2;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setIsMounted(true);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, []);

  const isCardVisible = isMounted && !isClosing;

  return (
    <div
      className={`approval-card-accordion ${isCardVisible ? "is-expanded" : "is-collapsed"
        }`}
    >
      <div className="approval-card-inner">
        <div className="p-2 sm:p-2.5">
          <div className="bg-white rounded-xl border border-blue-200/90 shadow-2xs p-3 sm:p-3.5 space-y-2">
            {/* Card Header: Logo, Name & Collapse Button */}
            <div className="flex items-center justify-between gap-3">
              <div
                className="flex items-center gap-2.5 sm:gap-3 min-w-0 cursor-pointer select-none"
                onClick={() => onCollapse(record._id)}
                title="Click to collapse"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg shrink-0 flex items-center justify-center overflow-hidden">
                  {record.logo ? (
                    <Image
                      src={getMediaUrl(record.logo)}
                      alt={record.name}
                      width={46}
                      height={46}
                      unoptimized
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <span className="font-semibold text-base sm:text-lg text-[#122A46]">
                      {record.name.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="font-semibold text-gray-900 text-sm sm:text-[15px] tracking-tight truncate">
                  {record.name}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCollapse(record._id);
                }}
                className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded bg-[#1B3654] hover:bg-[#122A46] text-white flex items-center justify-center shrink-0 shadow-2xs transition-transform active:scale-95 cursor-pointer ml-2"
                aria-label={`Collapse details for ${record.name}`}
              >
                <ChevronUp size={13} strokeWidth={2} />
              </button>
            </div>

            {/* Location & Established Grid */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-8 pt-1.5 border-t border-gray-100">
              {/* Location */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin size={13} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wider block">
                    Location
                  </span>
                  <span className="text-xs sm:text-[13px] font-normal text-gray-700 block mt-0.5">
                    {record.location}
                  </span>
                </div>
              </div>

              {/* Established */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Building2 size={13} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wider block">
                    Established
                  </span>
                  <span className="text-xs sm:text-[13px] font-normal text-gray-700 block mt-0.5">
                    {record.established}
                  </span>
                </div>
              </div>

              {/* NAAC Grade - Only on NAAC approval page */}
              {isNaacApproval && record.naac && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 text-xs">
                    ⭐
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wider block">
                      NAAC Grade
                    </span>
                    <span className="text-xs sm:text-[13px] font-semibold text-amber-800 block mt-0.5">
                      {record.naac}
                    </span>
                  </div>
                </div>
              )}

              {/* NIRF Rank - Only on NIRF approval page */}
              {isNirfApproval && record.nirf && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-xs">
                    🏆
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wider block">
                      NIRF Rank
                    </span>
                    <span className="text-xs sm:text-[13px] font-semibold text-blue-800 block mt-0.5">
                      {record.nirf}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Courses Offered */}
            {Array.isArray(record.courses) && record.courses.length > 0 && (
              <div className="pt-1">
                <span className="text-xs font-normal text-gray-500 block mb-1">
                  Courses Offered:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {record.courses.map((course, cIdx) => (
                    <span
                      key={cIdx}
                      className="bg-[#BAE6FD]/60 hover:bg-[#BAE6FD] text-[#0369A1] font-normal text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider transition-colors select-none"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons Row: 1 Row with 3 Equal Columns Full Width */}
            <div className="grid grid-cols-3 items-center gap-1.5 sm:gap-2 pt-2 border-t border-gray-100 w-full">
              {/* Get Brochure */}
              <button
                type="button"
                onClick={(e) => handleGetBrochure(record, e)}
                className="w-full h-8 px-1 sm:px-2 rounded-lg bg-[#F1D69E] hover:bg-[#E8CA8A] text-gray-800 font-normal text-[11px] sm:text-xs shadow-2xs flex items-center justify-center gap-1 border border-transparent cursor-pointer transition-all active:scale-95 whitespace-nowrap min-w-0"
              >
                <span className="truncate">Get Broucher</span>
                <Download size={11} className="shrink-0" />
              </button>

              {/* Know More */}
              <Link
                href={record.targetUrl || (record.slug ? `/universities/${record.slug}` : "#")}
                {...(record.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="w-full h-8 px-1 sm:px-2 rounded-lg bg-[#122A46] hover:bg-[#0c1f34] text-white font-normal text-[11px] sm:text-xs shadow-2xs flex items-center justify-center border border-transparent transition-all active:scale-95 text-center whitespace-nowrap min-w-0"
              >
                <span className="truncate">Know More</span>
              </Link>

              {/* Compare Button */}
              <button
                type="button"
                onClick={(e) => handleCompareClick(record, e)}
                className={`w-full h-8 px-1 sm:px-2 rounded-lg text-[11px] sm:text-xs font-normal shadow-2xs flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 whitespace-nowrap min-w-0 ${compared
                  ? "bg-emerald-50 border border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                  : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                  }`}
              >
                {compared ? (
                  <>
                    <Check size={11} className="text-emerald-600 shrink-0" />
                    <span className="truncate">Compare Now</span>
                  </>
                ) : (
                  <>
                    <Plus size={11} className="text-gray-400 shrink-0" />
                    <span className="truncate">Compare</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ApprovalUniversityDirectory({ initialData = null, className = "" }) {
  if (!initialData || (!initialData.approval && !initialData._id)) {
    notFound();
  }

  const router = useRouter();
  const { openFormModal } = useFormModal();
  const { toggleCompare, isInCompare, compareList, setIsCompareDrawerOpen } = useCompare();

  // ─── State ────────────────────────────────────────────────────
  const [apiData, setApiData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [selectedSession, setSelectedSession] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedHeiType, setSelectedHeiType] = useState("all");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  // Session change → refetch via request.dynamicList
  const handleSessionChange = async (val) => {
    const pageSlug =
      apiData?.approval?.pageSlug ||
      initialData?.approval?.pageSlug ||
      (Array.isArray(initialData?.approval?.slug)
        ? initialData.approval.slug[0]
        : initialData?.approval?.slug) ||
      "";
    if (isFakeUniversitiesSlug(pageSlug)) return;

    const sess = val === "all" ? "" : val;
    setSelectedSession(sess);
    setLoading(true);
    try {
      const targetSlug = pageSlug || "ugc-deb-approved-online-universities";
      const options = {};
      if (sess) options.session = sess;
      const res = await request.dynamicList({
        entity: "accreditations",
        endPoint: `v1/approval-directory/${targetSlug}`,
        options,
        revalidate: 0,
      });
      if (res) setApiData(res);
    } catch (err) {
      console.error("Session filter error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Normalize API response into standard shape
  const normalizedList = useMemo(() => {
    const rawList = apiData?.result || [];
    return rawList.map((item) => {
      const customUrl = String(item.targetUrl || item.official_website || item.rawUni?.official_website || "").trim();
      const isExternal = Boolean(
        item.isExternal ||
        (customUrl && (customUrl.startsWith("http://") || customUrl.startsWith("https://") || customUrl.includes(".")))
      );
      const targetUrl = isExternal
        ? (customUrl.startsWith("http") ? customUrl : `https://${customUrl}`)
        : (item.slug ? `/universities/${item.slug}` : "#");

      return {
        _id: String(item._id),
        name: item.name || "University",
        slug: item.slug || "",
        official_website: customUrl,
        targetUrl,
        isExternal,
        state: item.state || "India",
        location: item.location || item.state || "India",
        heiType: item.heiType || "Private University",
        mode: (typeof item.mode === "object" ? item.mode?.name : item.mode) || null,
        established: item.established || "",
        naac: item.naac || null,
        nirf: item.nirf || item.nirf_rank || null,
        logo: item.logo || null,
        courses: Array.isArray(item.courses) ? item.courses : [],
        ugcSessions: item.ugcSessions || [],
        ugc_accreditations: item.ugc_accreditations || [],
        rawUni: item,
      };
    });
  }, [apiData]);

  const [selectedNaac, setSelectedNaac] = useState("all");
  const [selectedNirf, setSelectedNirf] = useState("all");

  // Filter options from API response
  const filterOptions = useMemo(() => ({
    courses: apiData?.filters?.courses || [],
    states: apiData?.filters?.states || [],
    heiTypes: apiData?.filters?.heiTypes || [],
    sessions: apiData?.filters?.sessions || [],
    naac: apiData?.filters?.naac || [...new Set(normalizedList.map((u) => u.naac).filter(Boolean))].sort(),
    nirf: apiData?.filters?.nirf || [...new Set(normalizedList.map((u) => u.nirf).filter(Boolean))].sort((a, b) => Number(a) - Number(b)),
  }), [apiData, normalizedList]);

  // Client-side filter
  const filteredUniversities = useMemo(() => {
    return normalizedList.filter((u) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const match = u.name.toLowerCase().includes(q) ||
          u.state.toLowerCase().includes(q) ||
          u.heiType.toLowerCase().includes(q) ||
          (u.naac && u.naac.toLowerCase().includes(q)) ||
          (u.nirf && String(u.nirf).toLowerCase().includes(q)) ||
          u.courses.some((c) => c.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (selectedCourse !== "all") {
        if (!u.courses.some((c) => c.toLowerCase() === selectedCourse.toLowerCase())) return false;
      }
      if (selectedState !== "all") {
        if (u.state.toLowerCase() !== selectedState.toLowerCase()) return false;
      }
      if (selectedHeiType !== "all") {
        if (u.heiType.toLowerCase() !== selectedHeiType.toLowerCase()) return false;
      }
      if (selectedNaac !== "all") {
        if ((u.naac || "").toLowerCase() !== selectedNaac.toLowerCase()) return false;
      }
      if (selectedNirf !== "all") {
        if (String(u.nirf || "").toLowerCase() !== selectedNirf.toLowerCase()) return false;
      }
      return true;
    });
  }, [normalizedList, searchTerm, selectedCourse, selectedState, selectedHeiType, selectedNaac, selectedNirf]);

  const hasActiveFilters = Boolean(
    searchTerm.trim() ||
    (selectedSession && selectedSession !== "all") ||
    selectedCourse !== "all" ||
    selectedState !== "all" ||
    selectedHeiType !== "all" ||
    selectedNaac !== "all" ||
    selectedNirf !== "all"
  );

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCourse("all");
    setSelectedState("all");
    setSelectedHeiType("all");
    setSelectedNaac("all");
    setSelectedNirf("all");
    if (selectedSession && selectedSession !== "all") {
      handleSessionChange("all");
    }
  };

  const [closingRowKeys, setClosingRowKeys] = useState([]);

  const handleCollapse = (id) => {
    if (closingRowKeys.includes(id)) return;
    setClosingRowKeys((prev) => [...prev, id]);
    setTimeout(() => {
      setExpandedRowKeys((prev) => prev.filter((k) => k !== id));
      setClosingRowKeys((prev) => prev.filter((k) => k !== id));
    }, 300);
  };

  const handleExpand = (id) => {
    // Smoothly collapse any other expanded card for clean accordion behavior
    expandedRowKeys.forEach((key) => {
      if (key !== id && !closingRowKeys.includes(key)) {
        handleCollapse(key);
      }
    });
    setClosingRowKeys((prev) => prev.filter((k) => k !== id));
    setExpandedRowKeys((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const toggleRow = (id) => {
    if (expandedRowKeys.includes(id) && !closingRowKeys.includes(id)) {
      handleCollapse(id);
    } else {
      handleExpand(id);
    }
  };

  const handleGetBrochure = (u, e) => {
    e?.stopPropagation();
    const uniRecord = u.rawUni || u;
    const targetSlug = uniRecord.slug || u.slug || uniRecord._id || u.name?.toLowerCase()?.replace(/\s+/g, "-");
    openWhatsAppBrochure({
      title: u.name,
      slug: targetSlug,
    });
  };

  const handleCompareClick = (u, e) => {
    e?.stopPropagation();
    const uniRecord = u.rawUni || u;
    const targetSlug = uniRecord.slug || uniRecord._id || u.slug || u._id;
    const isAlreadyIn = isInCompare(targetSlug);
    if (isAlreadyIn) {
      const slugs = (compareList || [])
        .map((item) => item.slug || item.uniSlug || item._id || item.id)
        .filter(Boolean);
      const combinedSlugs = Array.from(new Set([...slugs, targetSlug])).filter(Boolean).slice(0, 3);
      const crsParam = selectedCourse && selectedCourse !== "all" ? selectedCourse : "";
      router.push(`/tools/compare-universities?university=${encodeURIComponent(combinedSlugs.join(","))}${crsParam ? `&course=${encodeURIComponent(crsParam)}` : ""}`);
    } else {
      toggleCompare({
        _id: uniRecord._id || targetSlug,
        slug: targetSlug,
        uniSlug: targetSlug,
        name: uniRecord.name || u.name,
        uniName: uniRecord.name || u.name,
        logo: uniRecord.logo || u.logo,
        logoUrl: getMediaUrl(uniRecord.logo || u.logo),
        location: uniRecord.location || u.location || "",
      });
      setIsCompareDrawerOpen?.(true);
    }
  };

  // Format University Name: Breaks onto two lines on mobile, single line on desktop
  const formatUniversityName = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 2) {
      return (
        <span className="font-semibold text-gray-900 text-xs sm:text-[13px] block">
          <span className="block sm:inline">{parts[0]}</span>{" "}
          <span className="block sm:inline text-gray-800">{parts[1]}</span>
        </span>
      );
    }
    if (parts.length > 2) {
      const last = parts[parts.length - 1];
      const rest = parts.slice(0, parts.length - 1).join(" ");
      return (
        <span className="font-semibold text-gray-900 text-xs sm:text-[13px] block">
          <span className="block sm:inline">{rest}</span>{" "}
          <span className="block sm:inline text-gray-800">{last}</span>
        </span>
      );
    }
    return (
      <span className="font-semibold text-gray-900 text-xs sm:text-[13px] block">
        {name}
      </span>
    );
  };

  // Approval Identifier for dynamic columns (NAAC Grade, NIRF Rank)
  const approvalIdentifier = useMemo(() => {
    return [
      apiData?.approval?.code,
      apiData?.approval?.name,
      apiData?.approval?.slug,
      apiData?.approval?.pageSlug,
      apiData?.approval?.title,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }, [apiData]);

  const currentSlug = useMemo(() => {
    return (
      apiData?.approval?.pageSlug ||
      (Array.isArray(apiData?.approval?.slug)
        ? apiData.approval.slug[0]
        : apiData?.approval?.slug) ||
      ""
    );
  }, [apiData]);

  const isFakeApproval = isFakeUniversitiesSlug(currentSlug) || approvalIdentifier.includes("fake");
  const isNaacApproval = !isFakeApproval && approvalIdentifier.includes("naac");
  const isNirfApproval = !isFakeApproval && approvalIdentifier.includes("nirf");

  const approvalLogoUrl = useMemo(() => {
    if (isFakeApproval) return null;
    const rawLogo = apiData?.approval?.logo || apiData?.approval?.image;
    return getMediaUrl(rawLogo);
  }, [apiData, isFakeApproval]);

  const approvalBadge = useMemo(() => {
    if (isFakeApproval) return "UGC LISTED FAKE UNIVERSITIES";
    if (isNirfApproval) return "NIRF RANKED UNIVERSITIES 2026";
    if (isNaacApproval) return "NAAC ACCREDITED UNIVERSITIES 2026";
    const code = apiData?.approval?.code || apiData?.approval?.shortName;
    if (code) return `${code.toUpperCase()} APPROVED DIRECTORY 2026`;
    return "OFFICIAL ACCREDITATION DIRECTORY 2026";
  }, [isFakeApproval, isNirfApproval, isNaacApproval, apiData]);

  const staticHero = useMemo(() => {
    return getAccreditationHeroContent(currentSlug, apiData?.approval);
  }, [currentSlug, apiData]);

  const heroTitle = useMemo(() => {
    if (staticHero?.title) return staticHero.title;
    if (apiData?.approval?.bannerTitle) return apiData.approval.bannerTitle;
    if (apiData?.approval?.title) return apiData.approval.title;
    if (isFakeApproval) return "UGC-Listed Fake Universities";
    if (isNirfApproval) return "NIRF Ranked Universities List";
    if (isNaacApproval) return "NAAC Accredited Universities List";
    if (apiData?.approval?.name) return `${apiData.approval.name} Approved Universities`;
    return "Approved Universities Directory";
  }, [staticHero, apiData, isFakeApproval, isNirfApproval, isNaacApproval]);

  const heroDescription = useMemo(() => {
    if (staticHero?.description) return staticHero.description;
    if (apiData?.approval?.shortDescription) return apiData.approval.shortDescription;
    if (apiData?.approval?.description && typeof apiData.approval.description === "string") {
      const plain = apiData.approval.description.replace(/<[^>]*>/g, "").trim();
      if (plain) return plain.length > 220 ? `${plain.slice(0, 220)}...` : plain;
    }
    return "Explore verified top-ranked and accredited online & distance universities recognized by NIRF, UGC-DEB, and statutory government bodies across India.";
  }, [staticHero, apiData]);

  // Ant Design Table Columns: dynamically includes NAAC Grade, NIRF Rank, or UGC Fake Status
  const columns = useMemo(() => {
    if (isFakeApproval) {
      return [
        {
          title: "UNIVERSITY NAME",
          dataIndex: "name",
          key: "name",
          width: "44%",
          render: (name) => (
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center p-0.5">
                <FakeUniversityIcon size={30} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-gray-900 text-xs sm:text-[13px] block">
                  {name}
                </span>
              </div>
            </div>
          ),
        },
        {
          title: "STATE",
          dataIndex: "state",
          key: "state",
          width: "26%",
          render: (state) => (
            <span className="text-gray-600 text-xs sm:text-[13px] font-normal break-words whitespace-normal block">
              {state}
            </span>
          ),
        },
        {
          title: "UGC STATUS",
          dataIndex: "status",
          key: "status",
          width: "30%",
          render: () => (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
              Fake / Unrecognized
            </span>
          ),
        },
      ];
    }

    const hasNaacCol = isNaacApproval;
    const hasNirfCol = isNirfApproval;

    const cols = [
      {
        title: "UNIVERSITY NAME",
        dataIndex: "name",
        key: "name",
        width: hasNaacCol || hasNirfCol ? "38%" : "42%",
        render: (name, record) => (
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-lg shrink-0 flex items-center justify-center overflow-hidden">
              {record.logo ? (
                <Image
                  src={getMediaUrl(record.logo)}
                  alt={name}
                  width={40}
                  height={40}
                  unoptimized
                  className="object-contain w-full h-full"
                />
              ) : (
                <span className="font-semibold text-xs sm:text-sm text-[#122A46]">
                  {name.charAt(0)}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              {formatUniversityName(name)}
            </div>
          </div>
        ),
      },
      {
        title: "STATE",
        dataIndex: "state",
        key: "state",
        width: hasNaacCol || hasNirfCol ? "24%" : "28%",
        render: (state) => (
          <span className="text-gray-600 text-xs sm:text-[13px] font-normal break-words whitespace-normal block">
            {state}
          </span>
        ),
      },
    ];

    if (hasNaacCol) {
      cols.push({
        title: "NAAC GRADE",
        dataIndex: "naac",
        key: "naac",
        width: "16%",
        render: (naac) => {
          if (!naac) return <span className="text-gray-400 text-xs font-normal">-</span>;
          return (
            <span className="inline-flex items-center px-2 py-0.5 rounded-2xl text-[11px] sm:text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
              {naac}
            </span>
          );
        },
      });
    } else if (hasNirfCol) {
      cols.push({
        title: "NIRF RANK",
        dataIndex: "nirf",
        key: "nirf",
        width: "16%",
        render: (nirf) => {
          if (!nirf) return <span className="text-gray-400 text-xs font-normal">-</span>;
          return (
            <span className="inline-flex rounded-2xl items-center px-2 py-0.5 text-[11px] sm:text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs">
              {nirf}
            </span>
          );
        },
      });
    }

    cols.push({
      title: "TYPE OF HEI",
      dataIndex: "heiType",
      key: "heiType",
      width: hasNaacCol || hasNirfCol ? "22%" : "30%",
      render: (heiType, record) => {
        const isExpanded =
          expandedRowKeys.includes(record._id) && !closingRowKeys.includes(record._id);
        return (
          <div className="flex items-center justify-between gap-1 sm:gap-2 w-full">
            <span className="text-gray-600 text-[11px] sm:text-[13px] font-normal break-words whitespace-normal min-w-0">
              {heiType}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleRow(record._id);
              }}
              className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded bg-[#1B3654] hover:bg-[#122A46] text-white flex items-center justify-center shrink-0 shadow-2xs transition-transform active:scale-95 cursor-pointer ml-auto"
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
            >
              {isExpanded ? (
                <ChevronUp size={12} strokeWidth={2} />
              ) : (
                <ChevronDown size={12} strokeWidth={2} />
              )}
            </button>
          </div>
        );
      },
    });

    return cols;
  }, [isFakeApproval, isNaacApproval, isNirfApproval, expandedRowKeys, closingRowKeys]);

  // Smooth Accordion Card Component for Expanded Details
  const renderExpandedCard = (record) => {
    return (
      <SmoothExpandedCard
        record={record}
        isClosing={closingRowKeys.includes(record._id)}
        onCollapse={handleCollapse}
        isInCompare={isInCompare}
        handleGetBrochure={handleGetBrochure}
        handleCompareClick={handleCompareClick}
        isNaacApproval={isNaacApproval}
        isNirfApproval={isNirfApproval}
        isFakeApproval={isFakeApproval}
        openFormModal={openFormModal}
      />
    );
  };


  return (
    <div className={`w-full bg-[#f8fafc] text-slate-800 font-sans min-h-screen ${className || ""}`}>
      {/* ── 1. TOP HERO HEADER (DARK BLUE BRANDING) ── */}
      <div className="w-full bg-[#072C50] text-white pt-6 pb-20 sm:pt-8 sm:pb-24 md:pt-10 md:pb-28 px-4 relative">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Top Accreditation Logo */}
          {isFakeApproval ? (
            <div className="mb-2 sm:mb-2.5 flex justify-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 p-2 flex items-center justify-center shadow-lg">
                <FakeUniversityIcon size={52} />
              </div>
            </div>
          ) : approvalLogoUrl ? (
            <div className="mb-2 sm:mb-2.5 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={approvalLogoUrl}
                alt={apiData?.approval?.name || "Accreditation Logo"}
                className="max-h-14 sm:max-h-16 md:max-h-18 max-w-full w-auto h-auto object-contain"
              />
            </div>
          ) : null}

          {/* Centered Page Title & Subtitle in White */}
          <div className="flex flex-col items-center justify-center text-center">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
              style={{ margin: 0, padding: 0, lineHeight: 1.1 }}
            >
              {heroTitle}
            </h1>

            <p
              className="text-blue-100/90 text-xs sm:text-sm md:text-base max-w-3xl mx-auto font-normal leading-tight"
              style={{ margin: 0, padding: 0, lineHeight: 1.18, marginTop: "6px" }}
            >
              {heroDescription}
            </p>
          </div>
        </div>
      </div>

      {/* ── 2. FLOATING WHITE CONTAINER CARD (TABLE & FILTERS OVERLAPPING HERO) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-2.5 sm:px-6 md:px-8 -mt-12 sm:-mt-16 md:-mt-20 pb-16 md:pb-24">
        <div className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/90 p-3 sm:p-5 md:p-6 text-[#2D3748]">
          {/* 🔍 Search & Filters Bar */}
          <div className="mb-3.5 sm:mb-4.5">
            {/* 1. Search Bar */}
            <div className="relative w-full mb-2 sm:mb-2.5">
              <Input.Search
                size="large"
                placeholder="Search by University...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="approval-search w-full"
              />
            </div>

            {/* 2. Filters Bar: 2 columns on mobile, 4 columns on desktop */}
            <div className="w-full">
              {isFakeApproval ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 w-full">
                  {/* Filter By State */}
                  <Select
                    size="large"
                    value={selectedState}
                    onChange={setSelectedState}
                    className="approval-filter-select w-full"
                    suffixIcon={<ChevronDown size={14} className="text-gray-500" />}
                  >
                    <Option value="all">Filter by State (All States)</Option>
                    {filterOptions.states.map((st) => (
                      <Option key={st} value={st}>
                        {st}
                      </Option>
                    ))}
                  </Select>

                  <div className="flex items-center text-xs text-red-900 font-semibold px-3 py-2 bg-red-50/90 border border-red-200/80 rounded-lg">
                    <span>Showing {filteredUniversities.length} UGC Unrecognized / Fake Institutions</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 w-full">
                  {/* Filter by NAAC Grade if NAAC approval */}
                  {isNaacApproval && (
                    <Select
                      size="large"
                      value={selectedNaac}
                      onChange={setSelectedNaac}
                      className="approval-filter-select w-full"
                      suffixIcon={<ChevronDown size={14} className="text-gray-500" />}
                    >
                      <Option value="all">All NAAC Grades</Option>
                      {filterOptions.naac.map((grade) => (
                        <Option key={grade} value={grade}>
                          Grade {grade}
                        </Option>
                      ))}
                    </Select>
                  )}

                  {/* Filter by NIRF Rank if NIRF approval */}
                  {isNirfApproval && (
                    <Select
                      size="large"
                      value={selectedNirf}
                      onChange={setSelectedNirf}
                      className="approval-filter-select w-full"
                      suffixIcon={<ChevronDown size={14} className="text-gray-500" />}
                    >
                      <Option value="all">All NIRF Ranks</Option>
                      {filterOptions.nirf.map((rank) => (
                        <Option key={rank} value={rank}>
                          Rank {rank}
                        </Option>
                      ))}
                    </Select>
                  )}

                  {/* Select Session if not NAAC and not NIRF */}
                  {!isNaacApproval && !isNirfApproval && (
                    <Select
                      size="large"
                      value={selectedSession || "all"}
                      onChange={handleSessionChange}
                      className="approval-filter-select w-full"
                      suffixIcon={<ChevronDown size={14} className="text-gray-500" />}
                    >
                      <Option value="all">All Sessions</Option>
                      {filterOptions.sessions.map((sess) => (
                        <Option key={sess} value={sess}>
                          List {sess}
                        </Option>
                      ))}
                    </Select>
                  )}

                  {/* Filter By Course */}
                  <Select
                    size="large"
                    value={selectedCourse}
                    onChange={setSelectedCourse}
                    className="approval-filter-select w-full"
                    suffixIcon={<ChevronDown size={14} className="text-gray-500" />}
                  >
                    <Option value="all">Filter By Course</Option>
                    {filterOptions.courses.map((course) => (
                      <Option key={course} value={course}>
                        {course}
                      </Option>
                    ))}
                  </Select>

                  {/* Filter By State */}
                  <Select
                    size="large"
                    value={selectedState}
                    onChange={setSelectedState}
                    className="approval-filter-select w-full"
                    suffixIcon={<ChevronDown size={14} className="text-gray-500" />}
                  >
                    <Option value="all">Filter by State</Option>
                    {filterOptions.states.map((st) => (
                      <Option key={st} value={st}>
                        {st}
                      </Option>
                    ))}
                  </Select>

                  {/* Filter HEI Type */}
                  <Select
                    size="large"
                    value={selectedHeiType}
                    onChange={setSelectedHeiType}
                    className="approval-filter-select w-full"
                    suffixIcon={<ChevronDown size={14} className="text-gray-500" />}
                  >
                    <Option value="all">Filter HEI Type</Option>
                    {filterOptions.heiTypes.map((ht) => (
                      <Option key={ht} value={ht}>
                        {ht}
                      </Option>
                    ))}
                  </Select>
                </div>
              )}

              {/* Reset Filter Button */}
              {hasActiveFilters && (
                <div className="mt-2 pt-1.5 border-t border-gray-200/80 flex items-center justify-between text-xs text-gray-600 px-0.5">
                  <span className="font-normal text-gray-500">Active filters applied</span>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-[#122A46] hover:text-[#0c1f34] font-normal flex items-center gap-1 cursor-pointer transition-colors"
                    title="Reset All Filters"
                  >
                    <RotateCcw size={11} />
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 3. Ant Design Table */}
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs overflow-hidden approvals-table-wrapper">
            <Table
              columns={columns}
              dataSource={filteredUniversities}
              rowKey="_id"
              pagination={false}
              loading={loading}
              className="approvals-antd-table"
              rowClassName={(record, index) => {
                const isExpanded = expandedRowKeys.includes(record._id);
                if (isExpanded) {
                  return "approval-row-expanded-hidden";
                }
                return index % 2 === 1 ? "approval-row-odd" : "approval-row-even";
              }}
              onRow={(record) => ({
                onClick: () => {
                  if (!isFakeApproval) toggleRow(record._id);
                },
                className: isFakeApproval ? "transition-colors" : "cursor-pointer group transition-colors",
              })}
              expandable={
                isFakeApproval
                  ? undefined
                  : {
                      showExpandColumn: false,
                      expandedRowRender: renderExpandedCard,
                      expandedRowKeys,
                    }
              }
              locale={{
                emptyText: (
                  <div className="py-10 px-4 text-center">
                    <Building2 size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="font-normal text-gray-700 text-sm m-0">No Universities Found</p>
                    <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto font-normal">
                      No universities match your filter criteria in {selectedSession} session.
                    </p>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="mt-3 bg-[#122A46] hover:bg-[#0c1f34] text-white text-xs font-normal px-3.5 py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ),
              }}
            />
          </div>
        </div>
      </div>

      {/* Scoped CSS directly in component */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Table layout fixed ensures strict widths, natural text wrapping, and no horizontal scroll */
            .approvals-antd-table table {
              table-layout: fixed !important;
              width: 100% !important;
            }
            .approvals-antd-table .ant-table {
              overflow-x: visible !important;
            }
            .approvals-antd-table .ant-table-body {
              max-height: none !important;
              height: auto !important;
            }

            /* Ant Design Table Header: Dark Navy Color #122A46 */
            .approvals-antd-table .ant-table-thead > tr > th {
              background-color: #122A46 !important;
              color: #ffffff !important;
              font-weight: 400 !important;
              font-size: 11px !important;
              letter-spacing: 0.03em !important;
              text-transform: uppercase !important;
              border-bottom: none !important;
              border-right: 1px solid #203D61 !important;
              padding: 7px 8px !important;
              white-space: normal !important;
              word-break: break-word !important;
            }
            @media (min-width: 640px) {
              .approvals-antd-table .ant-table-thead > tr > th {
                font-size: 12px !important;
                padding: 8px 12px !important;
              }
            }
            .approvals-antd-table .ant-table-thead > tr > th:last-child {
              border-right: none !important;
            }
            .approvals-antd-table .ant-table-thead > tr > th::before {
              display: none !important;
            }

            /* Ant Design Table Body Cells */
            .approvals-antd-table .ant-table-tbody > tr > td {
              padding: 7px 8px !important;
              border-bottom: 1px solid #f1f5f9 !important;
              border-right: 1px solid #f8fafc !important;
              vertical-align: middle !important;
              font-weight: 400 !important;
              white-space: normal !important;
              word-break: break-word !important;
            }
            @media (min-width: 640px) {
              .approvals-antd-table .ant-table-tbody > tr > td {
                padding: 8px 12px !important;
              }
            }
            .approvals-antd-table .ant-table-tbody > tr > td:last-child {
              border-right: none !important;
            }
            .approvals-antd-table .ant-table-tbody > tr.approval-row-even > td {
              background-color: #ffffff !important;
            }
            .approvals-antd-table .ant-table-tbody > tr.approval-row-odd > td {
              background-color: #f8fafc !important;
            }
            .approvals-antd-table .ant-table-tbody > tr:hover > td {
              background-color: #f1f5f9 !important;
            }

            /* Smooth accordion animation for Expanded Card */
            .approval-card-accordion {
              display: grid;
              grid-template-rows: 0fr;
              opacity: 0;
              transform: translateY(-8px);
              transition: grid-template-rows 300ms cubic-bezier(0.25, 1, 0.5, 1),
                          opacity 250ms ease,
                          transform 300ms cubic-bezier(0.25, 1, 0.5, 1);
              overflow: hidden;
              will-change: grid-template-rows, opacity, transform;
            }

            .approval-card-accordion.is-expanded {
              grid-template-rows: 1fr;
              opacity: 1;
              transform: translateY(0);
            }

            .approval-card-accordion.is-collapsed {
              grid-template-rows: 0fr;
              opacity: 0;
              transform: translateY(-8px);
              transition: grid-template-rows 280ms cubic-bezier(0.4, 0, 0.2, 1),
                          opacity 220ms ease,
                          transform 280ms cubic-bezier(0.4, 0, 0.2, 1);
            }

            .approval-card-inner {
              min-height: 0;
              overflow: hidden;
            }

            /* Hide parent collapsed row when expanded so only the Card is visible */
            .approvals-antd-table .ant-table-tbody > tr.approval-row-expanded-hidden {
              display: none !important;
            }

            /* Expanded Row Container */
            .approvals-antd-table .ant-table-tbody > tr.ant-table-expanded-row > td {
              padding: 0 !important;
              background-color: transparent !important;
              border-bottom: none !important;
            }

            /* Search input */
            .approval-search .ant-input-affix-wrapper,
            .approval-search.ant-input-affix-wrapper {
              background-color: #f1f5f9 !important;
              border: 1px solid #e2e8f0 !important;
              border-radius: 8px !important;
              padding: 6px 12px !important;
              font-size: 13.5px !important;
              font-weight: 400 !important;
              box-shadow: none !important;
            }
            .approval-search .ant-input-affix-wrapper:hover,
            .approval-search.ant-input-affix-wrapper:hover,
            .approval-search .ant-input-affix-wrapper:focus,
            .approval-search.ant-input-affix-wrapper-focused {
              border-color: #cbd5e1 !important;
              background-color: #ffffff !important;
            }
            .approval-search input {
              font-size: 13.5px !important;
              font-weight: 400 !important;
              color: #334155 !important;
            }
            .approval-search input::placeholder {
              color: #94a3b8 !important;
              font-weight: 400 !important;
            }

            /* Filter Selects */
            .approval-filter-select {
              width: 100% !important;
            }
            .approval-filter-select .ant-select-selector {
              background-color: #ffffff !important;
              border: 1px solid #d1d5db !important;
              border-radius: 8px !important;
              box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04) !important;
              height: 38px !important;
              display: flex !important;
              align-items: center !important;
              padding: 0 10px !important;
              width: 100% !important;
            }
            .approval-filter-select .ant-select-selection-item {
              font-size: 13px !important;
              font-weight: 400 !important;
              color: #374151 !important;
            }
            .approval-filter-select:hover .ant-select-selector {
              border-color: #9ca3af !important;
            }
            @media (max-width: 639px) {
              .approval-filter-select .ant-select-selector {
                height: 36px !important;
                padding: 0 8px !important;
                border-radius: 6px !important;
              }
              .approval-filter-select .ant-select-selection-item {
                font-size: 12px !important;
              }
            }
          `,
        }}
      />
    </div>
  );
}



