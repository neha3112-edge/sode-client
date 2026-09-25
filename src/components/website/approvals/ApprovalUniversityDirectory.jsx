"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";
import { useFormModal } from "@/hooks/useFormModal";
import { useCompare } from "@/hooks/useCompare";
import { getAssetPath } from "@/lib/utils";
import { Container } from "@/components/common/Container";

const { Option } = Select;

// Default/Reference mock universities matching user screenshot
const DEFAULT_UNIVERSITIES = [
  {
    id: "shoolini-1",
    name: "Shoolini University",
    slug: "shoolini-university",
    state: "Uttarakhand",
    location: "Dehradun, Uttarakhand",
    heiType: "State University",
    established: "2011",
    logo: "https://new.crm.api.mysode.com/minio/crm-media/2026/09/19/276d4e8a51d30c92486a93eaa5f6161c.webp",
    courses: ["MBA", "MCA", "MCOM", "MSC", "BCOM", "BBA", "BCA"],
  },
  {
    id: "manipal-1",
    name: "Manipal University",
    slug: "manipal-university",
    state: "Rajasthan",
    location: "Jaipur, Rajasthan",
    heiType: "Private University",
    established: "2011",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/08/11/7a5535b36dcbbe99e3abab5a02d280fd.webp",
    courses: ["MBA", "MCA", "MCOM", "MSC", "BCOM", "BBA"],
  },
  {
    id: "vgu-1",
    name: "Vivekananda Global Universities",
    slug: "vivekananda-global-university",
    state: "Haryana",
    location: "Faridabad, Haryana",
    heiType: "Central University",
    established: "2012",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/08/11/e1e8b8e8f49eadafbe83edbcfd591644.webp",
    courses: ["MBA", "MCA", "MCOM", "MSC", "BCOM", "BBA", "BCA"],
  },
  {
    id: "amity-1",
    name: "Amity University",
    slug: "amity-university",
    state: "Uttar Pradesh",
    location: "Noida, Uttar Pradesh",
    heiType: "State University",
    established: "2005",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/08/11/fbcd0028ef3d00be9fc5650eaef40268.webp",
    courses: ["MBA", "MCA", "MCOM", "MSC", "BCOM", "BBA", "BCA", "BA", "MA"],
  },
  {
    id: "cu-1",
    name: "Chandigarh University",
    slug: "chandigarh-university",
    state: "Punjab",
    location: "Mohali, Punjab",
    heiType: "Private University",
    established: "2012",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/07/20/eecc1735c03c7725504d4cb75cbafe52.png",
    courses: ["MBA", "MCA", "MCOM", "MSC", "BBA", "BCA", "BA"],
  },
  {
    id: "lpu-1",
    name: "Lovely Professional University",
    slug: "lovely-professional-university",
    state: "Punjab",
    location: "Phagwara, Punjab",
    heiType: "Private University",
    established: "2005",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/07/20/c3c413b94196e71853bff1312bc96253.png",
    courses: ["MBA", "MCA", "MCOM", "BBA", "BCA", "BA", "MA"],
  },
  {
    id: "uttaranchal-1",
    name: "Uttaranchal University",
    slug: "uttaranchal-university",
    state: "Uttarakhand",
    location: "Dehradun, Uttarakhand",
    heiType: "State University",
    established: "2013",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/07/20/0d972d5c77d043f96d42c023d0c186f9.png",
    courses: ["MBA", "MCA", "BBA", "BCA", "BA"],
  },
  {
    id: "jain-1",
    name: "Jain University",
    slug: "jain-university",
    state: "Karnataka",
    location: "Bangalore, Karnataka",
    heiType: "Deemed University",
    established: "1990",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/07/20/3179441b81cb827cc9160e3545552f48.png",
    courses: ["MBA", "MCA", "MCOM", "BCOM", "BBA", "BCA"],
  },
  {
    id: "galgotias-1",
    name: "Galgotias University",
    slug: "galgotias-university",
    state: "Uttar Pradesh",
    location: "Greater Noida, Uttar Pradesh",
    heiType: "Private University",
    established: "2011",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/07/20/596209327b7456d829182b41dfaa61e1.png",
    courses: ["MBA", "MCA", "BBA", "BCA", "BCOM"],
  },
  {
    id: "mangal-1",
    name: "Mangalayatan University",
    slug: "mangalayatan-university",
    state: "Uttar Pradesh",
    location: "Aligarh, Uttar Pradesh",
    heiType: "Private University",
    established: "2006",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/07/20/596209327b7456d829182b41dfaa61e1.png",
    courses: ["MBA", "MCA", "MCOM", "MSC", "BA", "MA"],
  },
  {
    id: "smu-1",
    name: "Sikkim Manipal University",
    slug: "sikkim-manipal-university",
    state: "Sikkim",
    location: "Gangtok, Sikkim",
    heiType: "State University",
    established: "1995",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/07/20/84d371678b2d757a0cd5235ddab27570.png",
    courses: ["MBA", "MCA", "BBA", "BCA", "MCOM"],
  },
  {
    id: "dypatil-1",
    name: "D.Y. Patil University",
    slug: "dy-patil-university",
    state: "Maharashtra",
    location: "Navi Mumbai, Maharashtra",
    heiType: "Deemed University",
    established: "2002",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/07/20/dc7cd981dfa436f31f28d9ee8eb730d6.png",
    courses: ["MBA", "BBA", "BCA", "MCA"],
  },
  {
    id: "graphicera-1",
    name: "Graphic Era University",
    slug: "graphic-era-university",
    state: "Uttarakhand",
    location: "Dehradun, Uttarakhand",
    heiType: "Deemed University",
    established: "1993",
    logo: "https://new.crm.api.mysode.com/minio/crm-media/2026/09/19/276d4e8a51d30c92486a93eaa5f6161c.webp",
    courses: ["MBA", "MCA", "BBA", "BCA", "BCOM"],
  },
  {
    id: "nmims-1",
    name: "NMIMS University",
    slug: "nmims-university",
    state: "Maharashtra",
    location: "Mumbai, Maharashtra",
    heiType: "Deemed University",
    established: "1981",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/08/11/7a5535b36dcbbe99e3abab5a02d280fd.webp",
    courses: ["MBA", "BBA", "BCOM"],
  },
  {
    id: "upes-1",
    name: "UPES University",
    slug: "upes-university",
    state: "Uttarakhand",
    location: "Dehradun, Uttarakhand",
    heiType: "State University",
    established: "2003",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/08/11/e1e8b8e8f49eadafbe83edbcfd591644.webp",
    courses: ["MBA", "MCA", "BBA", "BCA"],
  },
  {
    id: "gla-1",
    name: "GLA University",
    slug: "gla-university",
    state: "Uttar Pradesh",
    location: "Mathura, Uttar Pradesh",
    heiType: "Private University",
    established: "2010",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/08/11/fbcd0028ef3d00be9fc5650eaef40268.webp",
    courses: ["MBA", "MCA", "BCOM", "BBA", "BCA"],
  },
  {
    id: "srm-1",
    name: "SRM University",
    slug: "srm-university",
    state: "Tamil Nadu",
    location: "Chennai, Tamil Nadu",
    heiType: "Deemed University",
    established: "1985",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/07/20/c3c413b94196e71853bff1312bc96253.png",
    courses: ["MBA", "MCA", "MCOM", "BBA", "BCA"],
  },
  {
    id: "jindal-1",
    name: "OP Jindal Global University",
    slug: "op-jindal-global-university",
    state: "Haryana",
    location: "Sonipat, Haryana",
    heiType: "Private University",
    established: "2009",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/07/20/eecc1735c03c7725504d4cb75cbafe52.png",
    courses: ["MBA", "MA", "BA", "BBA"],
  },
  {
    id: "kalinga-1",
    name: "Kalinga University",
    slug: "kalinga-university",
    state: "Chhattisgarh",
    location: "Raipur, Chhattisgarh",
    heiType: "Private University",
    established: "2013",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/08/11/7a5535b36dcbbe99e3abab5a02d280fd.webp",
    courses: ["MBA", "MCA", "BCOM", "BBA", "BCA", "BA", "MA"],
  },
  {
    id: "gyanvihar-1",
    name: "Suresh Gyan Vihar University",
    slug: "suresh-gyan-vihar-university",
    state: "Rajasthan",
    location: "Jaipur, Rajasthan",
    heiType: "Private University",
    established: "2008",
    logo: "https://new.crm.api.mysode.com/minio/images/2026/08/11/e1e8b8e8f49eadafbe83edbcfd591644.webp",
    courses: ["MBA", "MCA", "BBA", "BCA", "BCOM"],
  },
];

const SESSIONS = ["January 2026", "July 2025", "January 2025", "July 2024"];

// Smooth Accordion Card Component for Expanded Details
function SmoothExpandedCard({
  record,
  isClosing,
  onCollapse,
  isInCompare,
  handleGetBrochure,
  handleCompareClick,
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
                      src={record.logo}
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
                <span className="font-semibold text-gray-900 text-sm sm:text-[15px] tracking-tight leading-tight truncate">
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
                  <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wider block leading-none">
                    Location
                  </span>
                  <span className="text-xs sm:text-[13px] font-normal text-gray-700 block mt-0.5 leading-tight">
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
                  <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wider block leading-none">
                    Established
                  </span>
                  <span className="text-xs sm:text-[13px] font-normal text-gray-700 block mt-0.5 leading-tight">
                    {record.established}
                  </span>
                </div>
              </div>
            </div>

            {/* Courses Offered */}
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
                href={record.slug ? `/universities/${record.slug}` : "#"}
                className="w-full h-8 px-1 sm:px-2 rounded-lg bg-[#122A46] hover:bg-[#0c1f34] text-white font-normal text-[11px] sm:text-xs shadow-2xs flex items-center justify-center border border-transparent transition-all active:scale-95 text-center whitespace-nowrap min-w-0 leading-none"
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
                    <span className="truncate">Added</span>
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

export default function ApprovalUniversityDirectory({
  universities = DEFAULT_UNIVERSITIES,
  title = "UGC-DEB Approved Online Universities List– January Session -2026",
  sessions = SESSIONS,
  initialSession = "January 2026",
  className = "",
}) {
  const { openFormModal } = useFormModal();
  const { toggleCompare, isInCompare } = useCompare();

  // State management
  const [selectedSession, setSelectedSession] = useState(initialSession);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedHeiType, setSelectedHeiType] = useState("all");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  // Normalize universities data
  const normalizedList = useMemo(() => {
    const rawList = Array.isArray(universities) && universities.length > 0 ? universities : DEFAULT_UNIVERSITIES;
    return rawList.map((item, idx) => {
      const uni = item.university || item;
      const uniName = uni.name || item.name || "University";
      const uniSlug = uni.slug || item.slug || "";
      const stateName =
        item.state ||
        item.stateName ||
        uni.state?.name ||
        uni.city?.name ||
        "India";
      const heiType =
        item.heiType ||
        (Array.isArray(uni.ownership_type) ? uni.ownership_type[0] : uni.ownership_type) ||
        "Private University";
      const location =
        item.location ||
        (uni.city?.name && uni.state?.name ? `${uni.city.name}, ${uni.state.name}` : stateName);
      const established = item.established || uni.established || "2011";
      const logoUrl = getAssetPath(item.logo || uni.logo || uni.image);
      const courses =
        Array.isArray(item.courses) && item.courses.length > 0
          ? item.courses
          : ["MBA", "MCA", "MCOM", "MSC", "BCOM", "BBA", "BCA"];

      return {
        _id: String(uni._id || item.id || `uni-${idx}`),
        name: uniName,
        slug: uniSlug,
        state: stateName,
        location,
        heiType,
        established,
        logo: logoUrl,
        courses,
        rawUni: uni,
      };
    });
  }, [universities]);

  // Extract unique filter options
  const filterOptions = useMemo(() => {
    const coursesSet = new Set();
    const statesSet = new Set();
    const heiTypesSet = new Set();

    normalizedList.forEach((u) => {
      if (u.state) statesSet.add(u.state);
      if (u.heiType) heiTypesSet.add(u.heiType);
      u.courses.forEach((c) => coursesSet.add(c));
    });

    return {
      courses: Array.from(coursesSet).sort(),
      states: Array.from(statesSet).sort(),
      heiTypes: Array.from(heiTypesSet).sort(),
    };
  }, [normalizedList]);

  // Filter universities based on search & selects
  const filteredUniversities = useMemo(() => {
    return normalizedList.filter((u) => {
      // 1. Search Query
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchName = u.name.toLowerCase().includes(q);
        const matchState = u.state.toLowerCase().includes(q);
        const matchType = u.heiType.toLowerCase().includes(q);
        const matchCourse = u.courses.some((c) => c.toLowerCase().includes(q));
        if (!matchName && !matchState && !matchType && !matchCourse) {
          return false;
        }
      }

      // 2. Course Filter
      if (selectedCourse !== "all") {
        const hasCourse = u.courses.some(
          (c) => c.toLowerCase() === selectedCourse.toLowerCase()
        );
        if (!hasCourse) return false;
      }

      // 3. State Filter
      if (selectedState !== "all") {
        if (u.state.toLowerCase() !== selectedState.toLowerCase()) return false;
      }

      // 4. HEI Type Filter
      if (selectedHeiType !== "all") {
        if (u.heiType.toLowerCase() !== selectedHeiType.toLowerCase()) return false;
      }

      return true;
    });
  }, [normalizedList, searchTerm, selectedCourse, selectedState, selectedHeiType]);

  const hasActiveFilters =
    searchTerm || selectedCourse !== "all" || selectedState !== "all" || selectedHeiType !== "all";

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCourse("all");
    setSelectedState("all");
    setSelectedHeiType("all");
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
    openFormModal({
      title: `Download Brochure - ${u.name}`,
      subtitle: "Get free syllabus & enrollment guidance",
      defaultCourse: u.name,
      submitButtonText: "Download Brochure",
    });
  };

  const handleCompareClick = (u, e) => {
    e?.stopPropagation();
    toggleCompare(u.rawUni || u);
  };

  // Format University Name: Breaks onto two lines on mobile, single line on desktop
  const formatUniversityName = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 2) {
      return (
        <span className="font-semibold text-gray-900 text-xs sm:text-[13px] leading-tight block">
          <span className="block sm:inline">{parts[0]}</span>{" "}
          <span className="block sm:inline text-gray-800">{parts[1]}</span>
        </span>
      );
    }
    if (parts.length > 2) {
      const last = parts[parts.length - 1];
      const rest = parts.slice(0, parts.length - 1).join(" ");
      return (
        <span className="font-semibold text-gray-900 text-xs sm:text-[13px] leading-tight block">
          <span className="block sm:inline">{rest}</span>{" "}
          <span className="block sm:inline text-gray-800">{last}</span>
        </span>
      );
    }
    return (
      <span className="font-semibold text-gray-900 text-xs sm:text-[13px] leading-tight block">
        {name}
      </span>
    );
  };

  // Ant Design Table Columns: 3 columns fitting 100% width with wrapping text (no horizontal scroll)
  const columns = [
    {
      title: "UNIVERSITY NAME",
      dataIndex: "name",
      key: "name",
      width: "42%",
      render: (name, record) => (
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-lg shrink-0 flex items-center justify-center overflow-hidden">
            {record.logo ? (
              <Image
                src={record.logo}
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
      width: "28%",
      render: (state) => (
        <span className="text-gray-600 text-xs sm:text-[13px] font-normal break-words whitespace-normal leading-tight block">
          {state}
        </span>
      ),
    },
    {
      title: "TYPE OF HEI",
      dataIndex: "heiType",
      key: "heiType",
      width: "30%",
      render: (heiType, record) => {
        const isExpanded =
          expandedRowKeys.includes(record._id) && !closingRowKeys.includes(record._id);
        return (
          <div className="flex items-center justify-between gap-1 sm:gap-2 w-full">
            <span className="text-gray-600 text-[11px] sm:text-[13px] font-normal leading-tight break-words whitespace-normal min-w-0">
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
    },
  ];

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
      />
    );
  };

  return (
    <Container>
      {/* 1. Search Bar */}
      <div className="relative w-full mb-2.5">
        <Input.Search
          size="large"
          placeholder="Search by University...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="approval-search w-full"
        />
      </div>

      {/* 2. Filters Bar: 2 columns on mobile, 4 columns on desktop */}
      <div className="mb-3 sm:mb-3.5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 w-full">
          {/* Select Session */}
          <Select
            size="large"
            value={selectedSession}
            onChange={setSelectedSession}
            className="approval-filter-select w-full"
            suffixIcon={<ChevronDown size={14} className="text-gray-500" />}
          >
            {sessions.map((sess) => (
              <Option key={sess} value={sess}>
                List {sess}
              </Option>
            ))}
          </Select>

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

      {/* 3. Ant Design Table (Fits 100% width on mobile without scrolling, wrapping university names) */}
      <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs overflow-hidden approvals-table-wrapper">
        <Table
          columns={columns}
          dataSource={filteredUniversities}
          rowKey="_id"
          pagination={false}
          className="approvals-antd-table"
          rowClassName={(record, index) => {
            const isExpanded = expandedRowKeys.includes(record._id);
            if (isExpanded) {
              return "approval-row-expanded-hidden";
            }
            return index % 2 === 1 ? "approval-row-odd" : "approval-row-even";
          }}
          onRow={(record) => ({
            onClick: () => toggleRow(record._id),
            className: "cursor-pointer group transition-colors",
          })}
          expandable={{
            showExpandColumn: false,
            expandedRowRender: renderExpandedCard,
            expandedRowKeys,
          }}
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
              overflow-x: hidden !important;
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
    </Container>
  );
}



