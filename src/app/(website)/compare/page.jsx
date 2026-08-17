"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Select, Tag, Empty, Skeleton, Table } from "antd";
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  DeleteOutlined,
  CloseOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  DollarOutlined,
  BookOutlined,
  GlobalOutlined,
  TrophyOutlined,
  TeamOutlined,
  LaptopOutlined,
  VideoCameraOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

import { useCompare, useAppDrawer } from "@/context";
import { getUniversityOptions, getCourseOptions, getWebsiteUniversitiesCompare } from "@/services/api";
import { getAssetPath } from "@/lib/utils";

export default function ComparePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { compareList, removeFromCompare, clearCompare, addToCompare } = useCompare();
  const { openFormModal } = useAppDrawer();

  const [allUniversities, setAllUniversities] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [comparedData, setComparedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState("all");

  // 1. Fetch all universities and courses for dropdown selectors
  useEffect(() => {
    let isMounted = true;
    getUniversityOptions()
      .then((res) => {
        if (!isMounted) return;
        const uList = Array.isArray(res) ? res : res?.result || [];
        setAllUniversities(uList);
      })
      .catch((err) => console.error("Error fetching university options:", err));

    getCourseOptions()
      .then((res) => {
        if (!isMounted) return;
        const cList = Array.isArray(res) ? res : res?.result || [];
        setAllCourses(cList);
      })
      .catch((err) => console.error("Error fetching course options:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Determine which identifiers to compare
  const currentIdentifiers = useMemo(() => {
    const urlIds = searchParams.get("universityid") || searchParams.get("ids") || searchParams.get("universities");
    if (urlIds) {
      return urlIds.split(",").map((s) => s.trim()).filter(Boolean);
    }
    if (compareList && compareList.length > 0) {
      return compareList.map((item) => item._id || item.id || item.slug).filter(Boolean);
    }
    return [];
  }, [searchParams, compareList]);

  // Extract all available courses from compared universities
  const availableCourses = useMemo(() => {
    if (!comparedData || comparedData.length === 0) return [];
    const courseSet = new Set();
    comparedData.forEach((uni) => {
      (uni.coursesOffered || []).forEach((c) => {
        if (typeof c === "string" && c.trim()) courseSet.add(c.trim());
      });
      (uni.courseOfferings || []).forEach((o) => {
        if (o.course_name && typeof o.course_name === "string" && o.course_name.trim()) {
          courseSet.add(o.course_name.trim());
        }
      });
    });
    return Array.from(courseSet);
  }, [comparedData]);

  // Reset selected course if no longer available
  useEffect(() => {
    if (selectedCourse !== "all" && !availableCourses.includes(selectedCourse)) {
      setSelectedCourse("all");
    }
  }, [availableCourses, selectedCourse]);

  // 3. Fetch live comparison data from backend API
  useEffect(() => {
    if (currentIdentifiers.length === 0) {
      setComparedData([]);
      return;
    }

    let isMounted = true;
    setLoading(true);

    getWebsiteUniversitiesCompare(currentIdentifiers)
      .then((data) => {
        if (!isMounted) return;
        setComparedData(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching comparison matrix:", err);
        if (isMounted) setComparedData([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentIdentifiers]);

  // Dropdown selector options for universities
  const selectOptions = useMemo(() => {
    if (!Array.isArray(allUniversities)) return [];
    return allUniversities
      .filter((u) => u && u.name)
      .map((u) => ({
        value: String(u._id || u.slug),
        label: u.name,
        itemObj: u,
      }));
  }, [allUniversities]);

  // Dropdown selector options for all master courses
  const courseSelectOptions = useMemo(() => {
    const list = (allCourses || [])
      .filter((c) => c && c.name)
      .map((c) => ({
        value: c.name,
        label: c.name,
      }));

    // Also include any extra course names present in compared universities
    const existing = new Set(list.map((item) => item.value.toLowerCase()));
    (availableCourses || []).forEach((c) => {
      if (c && !existing.has(c.toLowerCase())) {
        list.push({ value: c, label: c });
        existing.add(c.toLowerCase());
      }
    });

    return [
      { value: "all", label: "All Courses" },
      ...list,
    ];
  }, [allCourses, availableCourses]);

  const handleSelectAdd = (selectedId) => {
    const targetUni = allUniversities.find((u) => String(u._id) === selectedId || u.slug === selectedId);
    if (targetUni) {
      addToCompare(targetUni);
    }
  };

  // Ant Design Table Columns Definition
  const tableColumns = useMemo(() => {
    if (!comparedData || comparedData.length === 0) return [];

    const count = comparedData.length;
    const featureWidth = count <= 2 ? "20%" : count === 3 ? "17%" : "15%";
    const uniWidth = count <= 2 ? `${80 / count}%` : count === 3 ? `${83 / count}%` : `${85 / count}%`;

    const featureCol = {
      title: <span className="font-extrabold text-xs uppercase tracking-wider text-slate-700">Feature / Criteria</span>,
      dataIndex: "featureTitle",
      key: "featureTitle",
      width: featureWidth,
      className: "bg-slate-50/80 font-bold text-slate-700 text-xs px-2.5",
      render: (text, record) => (
        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs py-0.5">
          <span className="shrink-0">{record.icon}</span>
          <span className="leading-snug">{record.featureTitle}</span>
        </div>
      ),
    };

    const universityCols = comparedData.map((uni, idx) => {
      const itemKey = uni._id || uni.slug || `col-${idx}`;
      return {
        title: (
          <div className="relative group flex flex-col items-center text-center space-y-1.5 py-1 px-1">
            <button
              onClick={() => removeFromCompare(uni.slug || uni._id)}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-200 hover:bg-red-500 text-slate-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none z-10"
              title="Remove from Compare"
            >
              <CloseOutlined className="text-[9px]" />
            </button>

            <div className="w-12 h-12 rounded-xl border border-slate-200 bg-white p-1.5 flex items-center justify-center relative">
              {uni.logo ? (
                <Image
                  src={getAssetPath(uni.logo)}
                  alt={uni.name || "Logo"}
                  fill
                  unoptimized
                  className="object-contain p-0.5"
                />
              ) : (
                <span className="text-base font-black text-[#1C3569]">
                  {uni.name ? uni.name.charAt(0) : "U"}
                </span>
              )}
            </div>
            <h3 className="text-xs font-bold text-[#1C3569] m-0 line-clamp-2 leading-tight">
              {uni.name}
            </h3>
            {uni.location && (
              <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full line-clamp-1">
                {uni.location}
              </span>
            )}
          </div>
        ),
        dataIndex: itemKey,
        key: itemKey,
        align: "center",
        width: uniWidth,
        className: "text-center text-xs font-medium align-middle py-2.5 px-1.5",
        render: (val, record) => record.renderCell(uni, idx),
      };
    });

    return [featureCol, ...universityCols];
  }, [comparedData, removeFromCompare]);

  // Helper to find course offering for a given university and course name
  const findCourseOffering = (uni, courseName) => {
    if (!uni || !courseName || courseName === "all") return null;
    const directOffering = (uni.courseOfferings || []).find(
      (o) =>
        o.course_name?.toLowerCase() === courseName.toLowerCase() ||
        o.course_slug?.toLowerCase() === courseName.toLowerCase()
    );
    if (directOffering) return directOffering;

    const isOfferedInList = (uni.coursesOffered || []).some(
      (c) => c?.toLowerCase() === courseName.toLowerCase()
    );
    if (isOfferedInList) {
      return {
        course_name: courseName,
        fee_per_semester: uni.avg_placement_package || null,
        fee_discount: "Upto 20%",
        rating: uni.rating || 4.5,
        duration: "2–3 Years",
        eligibility: "Graduation / 10+2 from recognized board",
        specializations: [],
      };
    }
    return null;
  };

  // Ant Design Table Data Source (Dynamic Course Points + 22 Matrix Points + Action Row)
  const tableDataSource = useMemo(() => {
    if (!comparedData || comparedData.length === 0) return [];

    const isCourseSelected = selectedCourse && selectedCourse !== "all";

    // Dynamic Course Level Comparison Rows (When a specific course is selected)
    const courseSpecificRows = isCourseSelected
      ? [
          {
            key: "course_status",
            icon: <BookOutlined className="text-[#009F93]" />,
            featureTitle: "Course Availability",
            renderCell: (uni) => {
              const off = findCourseOffering(uni, selectedCourse);
              return off ? (
                <Tag color="success" className="font-bold text-xs px-2.5 py-0.5 rounded-full m-0">
                  Offered
                </Tag>
              ) : (
                <Tag color="default" className="text-slate-400 font-semibold text-xs px-2.5 py-0.5 rounded-full m-0">
                  Not Offered
                </Tag>
              );
            },
          },
          {
            key: "course_fees",
            icon: <DollarOutlined className="text-emerald-600" />,
            featureTitle: "Fees per Semester",
            renderCell: (uni) => {
              const off = findCourseOffering(uni, selectedCourse);
              if (!off) return <span className="text-slate-400">-</span>;
              return off.fee_per_semester ? (
                <Tag color="success" className="font-extrabold text-xs px-2.5 py-0.5 rounded-full m-0">
                  {off.fee_per_semester}
                </Tag>
              ) : (
                <span className="text-slate-400">Contact for Fees</span>
              );
            },
          },
          {
            key: "course_discount",
            icon: <DollarOutlined className="text-orange-500" />,
            featureTitle: "Fees Discount",
            renderCell: (uni) => {
              const off = findCourseOffering(uni, selectedCourse);
              if (!off) return <span className="text-slate-400">-</span>;
              return (
                <Tag color="orange" className="font-bold text-[11px] px-2.5 py-0.5 rounded-full m-0">
                  {off.fee_discount || "Upto 20%"}
                </Tag>
              );
            },
          },
          {
            key: "course_rating",
            icon: <TrophyOutlined className="text-amber-500" />,
            featureTitle: "Course Rating",
            renderCell: (uni) => {
              const off = findCourseOffering(uni, selectedCourse);
              if (!off) return <span className="text-slate-400">-</span>;
              return (
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold text-xs">
                  ★ {off.rating || "4.5"} / 5
                </span>
              );
            },
          },
          {
            key: "course_duration",
            icon: <ClockCircleOutlined className="text-blue-600" />,
            featureTitle: "Course Duration",
            renderCell: (uni) => {
              const off = findCourseOffering(uni, selectedCourse);
              if (!off) return <span className="text-slate-400">-</span>;
              return <span className="font-bold text-slate-700">{off.duration || "2 Years"}</span>;
            },
          },
          {
            key: "course_eligibility",
            icon: <SafetyCertificateOutlined className="text-blue-600" />,
            featureTitle: "Course Eligibility",
            renderCell: (uni) => {
              const off = findCourseOffering(uni, selectedCourse);
              if (!off) return <span className="text-slate-400">-</span>;
              return <span className="text-slate-600 font-semibold text-[11px]">{off.eligibility || "Graduation / 10+2"}</span>;
            },
          },
          {
            key: "course_specializations",
            icon: <BookOutlined className="text-purple-600" />,
            featureTitle: "Course Specializations",
            renderCell: (uni) => {
              const off = findCourseOffering(uni, selectedCourse);
              if (!off) return <span className="text-slate-400">-</span>;
              const specs = off.specializations || [];
              if (specs.length === 0) return <span className="text-slate-500 font-medium">Standard / General</span>;
              return (
                <div className="flex flex-wrap items-center justify-center gap-1 max-w-[260px] mx-auto">
                  {specs.map((s, sIdx) => (
                    <Tag key={sIdx} color="purple" className="font-bold text-[10px] m-0">
                      {s}
                    </Tag>
                  ))}
                </div>
              );
            },
          },
        ]
      : [];

    const universityRows = [
      // 2) University Ownership Type
      {
        key: "ownership_type",
        icon: <BankOutlined className="text-blue-600" />,
        featureTitle: "Ownership Type",
        renderCell: (uni) =>
          uni.institution_type ? (
            <Tag className="bg-blue-50 border-blue-200 text-blue-800 font-bold px-2.5 py-0.5 rounded-full m-0">
              {uni.institution_type}
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 3) University Location
      {
        key: "location",
        icon: <GlobalOutlined className="text-blue-600" />,
        featureTitle: "University Location",
        renderCell: (uni) => <span className="text-slate-600 font-semibold">{uni.location || "-"}</span>,
      },

      // 4) Year of Establishment
      {
        key: "established_year",
        icon: <ClockCircleOutlined className="text-blue-600" />,
        featureTitle: "Year of Establishment",
        renderCell: (uni) => <span className="font-bold text-slate-700">{uni.established_year || "-"}</span>,
      },

      // 5) Overall University Rating
      {
        key: "rating",
        icon: <TrophyOutlined className="text-amber-500" />,
        featureTitle: "Overall University Rating",
        renderCell: (uni) =>
          typeof uni.rating === "number" && uni.rating > 0 ? (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold text-xs">
              ★ {uni.rating} / 5
            </span>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 6) NIRF Ranking
      {
        key: "nirf_rank",
        icon: <TrophyOutlined className="text-purple-600" />,
        featureTitle: "NIRF Ranking",
        renderCell: (uni) =>
          uni.nirf_rank ? (
            <Tag color="purple" className="font-bold text-[11px] px-2.5 py-0.5 rounded-full m-0">
              {uni.nirf_rank}
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 7) Average Placement Package
      {
        key: "avg_placement_package",
        icon: <DollarOutlined className="text-emerald-600" />,
        featureTitle: "Average Placement Package",
        renderCell: (uni) =>
          uni.avg_placement_package ? (
            <Tag color="success" className="font-extrabold text-[11px] px-2.5 py-0.5 rounded-full m-0">
              {uni.avg_placement_package}
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 8) Placement Assistance
      {
        key: "placement_assistance",
        icon: <TrophyOutlined className="text-blue-600" />,
        featureTitle: "Placement Assistance",
        renderCell: (uni) =>
          uni.placement_assistance === true ? (
            <Tag color="success" className="font-bold text-[10px] m-0">
              Yes
            </Tag>
          ) : uni.placement_assistance === false ? (
            <Tag color="error" className="font-bold text-[10px] m-0">
              No
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 9) EMI Facility
      {
        key: "emi_available",
        icon: <CreditCardOutlined className="text-blue-600" />,
        featureTitle: "EMI Facility",
        renderCell: (uni) =>
          uni.emi_available === true ? (
            <Tag color="success" className="font-bold text-[10px] m-0">
              Yes
            </Tag>
          ) : uni.emi_available === false ? (
            <Tag color="error" className="font-bold text-[10px] m-0">
              No
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 10) Scholarship Opportunities
      {
        key: "scholarship_available",
        icon: <DollarOutlined className="text-blue-600" />,
        featureTitle: "Scholarship Opportunities",
        renderCell: (uni) =>
          uni.scholarship_available === true ? (
            <Tag color="success" className="font-bold text-[10px] m-0">
              Yes
            </Tag>
          ) : uni.scholarship_available === false ? (
            <Tag color="error" className="font-bold text-[10px] m-0">
              No
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 11) Mode of Education
      {
        key: "mode",
        icon: <BookOutlined className="text-blue-600" />,
        featureTitle: "Mode of Education",
        renderCell: (uni) => {
          const modeList = Array.isArray(uni.mode) ? uni.mode.join(", ") : uni.mode;
          return <span className="text-slate-700 font-semibold">{modeList || "-"}</span>;
        },
      },

      // 12) Examination Mode
      {
        key: "exam_mode",
        icon: <LaptopOutlined className="text-blue-600" />,
        featureTitle: "Examination Mode",
        renderCell: (uni) => <span className="text-slate-700 font-semibold">{uni.exam_mode || "-"}</span>,
      },

      // 13) Accreditations & Approvals
      {
        key: "approvals",
        icon: <SafetyCertificateOutlined className="text-blue-600" />,
        featureTitle: "Accreditations & Approvals",
        renderCell: (uni) => {
          const approvals = Array.isArray(uni.approvals) ? uni.approvals : [];
          if (approvals.length === 0) return <span className="text-slate-400">-</span>;

          return (
            <div className="grid grid-cols-3 gap-1.5 max-w-[280px] mx-auto">
              {approvals.map((a, i) => {
                const aName = typeof a === "object" ? a.name || a.code || a.title : a;
                const rawLogo = typeof a === "object" ? a.logo : null;
                const logoUrl = rawLogo ? getAssetPath(rawLogo) : null;

                if (logoUrl) {
                  return (
                    <div
                      key={i}
                      title={aName}
                      className="w-full h-10 px-1.5 py-1 bg-white rounded-lg border border-slate-200 flex items-center justify-center hover:border-blue-400 transition-all duration-200 hover:scale-105"
                    >
                      <img
                        src={logoUrl}
                        alt={aName}
                        className="max-h-7 max-w-full w-auto h-auto object-contain"
                      />
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    title={aName}
                    className="w-full h-10 px-1.5 bg-blue-50/90 rounded-lg border border-blue-200 text-blue-800 font-bold text-[10px] flex items-center justify-center hover:bg-blue-100 transition-all text-center"
                  >
                    {aName}
                  </div>
                );
              })}
            </div>
          );
        },
      },

      // 14) Key University Highlights
      {
        key: "highlights",
        icon: <CheckCircleFilled className="text-emerald-600" />,
        featureTitle: "Key University Highlights",
        renderCell: (uni) => {
          const highlights = Array.isArray(uni.highlights) ? uni.highlights : [];
          if (highlights.length === 0) return <span className="text-slate-400">-</span>;

          return (
            <ul className="space-y-1.5 m-0 p-0 list-none text-[11px] text-slate-600 inline-block text-left max-w-[280px]">
              {highlights.map((item, hIdx) => (
                <li key={hIdx} className="flex items-start gap-1.5">
                  <CheckOutlined className="text-emerald-500 text-[10px] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        },
      },

      // 15) Courses offered
      {
        key: "coursesOffered",
        icon: <BookOutlined className="text-blue-600" />,
        featureTitle: "Courses offered",
        renderCell: (uni) => {
          const courses = Array.isArray(uni.coursesOffered) ? uni.coursesOffered : [];
          if (courses.length === 0) return <span className="text-slate-400">-</span>;

          return (
            <div className="flex flex-wrap items-center justify-center gap-1 max-w-[260px] mx-auto">
              {courses.map((cName, cIdx) => (
                <Tag key={cIdx} color="purple" className="font-bold text-[10px] m-0">
                  {cName}
                </Tag>
              ))}
            </div>
          );
        },
      },

      // 16) Learning Platform - LMS
      {
        key: "lms_available",
        icon: <LaptopOutlined className="text-blue-600" />,
        featureTitle: "Learning Platform - LMS",
        renderCell: (uni) =>
          uni.lms_available === true ? (
            <Tag color="success" className="font-bold text-[10px] m-0">
              Yes
            </Tag>
          ) : uni.lms_available === false ? (
            <Tag color="error" className="font-bold text-[10px] m-0">
              No
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 17) Live Classes Available
      {
        key: "live_classes",
        icon: <VideoCameraOutlined className="text-blue-600" />,
        featureTitle: "Live Classes Available",
        renderCell: (uni) =>
          uni.live_classes === true ? (
            <Tag color="success" className="font-bold text-[10px] m-0">
              Yes
            </Tag>
          ) : uni.live_classes === false ? (
            <Tag color="error" className="font-bold text-[10px] m-0">
              No
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 18) Study Material
      {
        key: "study_material",
        icon: <BookOutlined className="text-blue-600" />,
        featureTitle: "Study Material",
        renderCell: (uni) => {
          let matStr = uni.study_material || "-";
          if (matStr === "Both") matStr = "Both Digital and Printed";
          return <span className="text-slate-700 font-semibold">{matStr}</span>;
        },
      },

      // 19) Recorded Lectures
      {
        key: "recorded_lectures",
        icon: <VideoCameraOutlined className="text-purple-600" />,
        featureTitle: "Recorded Lectures",
        renderCell: (uni) =>
          uni.recorded_lectures === true ? (
            <Tag color="success" className="font-bold text-[10px] m-0">
              Yes
            </Tag>
          ) : uni.recorded_lectures === false ? (
            <Tag color="error" className="font-bold text-[10px] m-0">
              No
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 20) Alumni Network
      {
        key: "alumni_network",
        icon: <TeamOutlined className="text-blue-600" />,
        featureTitle: "Alumni Network",
        renderCell: (uni) => <span className="font-bold text-slate-700">{uni.alumni_network || "-"}</span>,
      },

      // 21) Student Ratings & Reviews
      {
        key: "student_reviews",
        icon: <TeamOutlined className="text-blue-600" />,
        featureTitle: "Student Ratings & Reviews",
        renderCell: (uni) =>
          uni.student_reviews ? (
            <Tag color="cyan" className="font-bold text-[11px] px-2.5 py-0.5 rounded-full m-0">
              {uni.student_reviews}
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 22) Placement Partners
      {
        key: "placement_partners",
        icon: <TeamOutlined className="text-emerald-600" />,
        featureTitle: "Placement Partners",
        renderCell: (uni) => {
          const partners = Array.isArray(uni.placement_partners) ? uni.placement_partners : [];
          if (partners.length === 0) return <span className="text-slate-400">-</span>;

          return (
            <div className="flex flex-wrap items-center justify-center gap-1 max-w-[280px] mx-auto">
              {partners.map((p, pIdx) => (
                <Tag key={pIdx} color="geekblue" className="font-bold text-[10px] m-0">
                  {p}
                </Tag>
              ))}
            </div>
          );
        },
      },

      // Actions Row
      {
        key: "actions",
        icon: <CheckCircleFilled className="text-blue-600" />,
        featureTitle: "Actions & Next Steps",
        renderCell: (uni) => (
          <div className="flex items-center justify-center space-x-2">
            <Button
              type="primary"
              onClick={() => {
                openFormModal({
                  title: `Apply Now - ${uni.name}`,
                  subtitle: "Fill your details to get free expert 1:1 counseling",
                  defaultCourse: selectedCourse !== "all" ? selectedCourse : uni.name,
                });
              }}
              className="bg-[#009F93] hover:bg-[#008278] border-none font-medium text-xs rounded-2xl cursor-pointer"
            >
              Apply Now
            </Button>

            {uni.slug && (
              <Link href={`/universities/${uni.slug}`}>
                <Button className="bg-[#1C3569] text-white hover:bg-[#122449] border-none font-medium text-xs rounded-2xl cursor-pointer">
                  View Details
                </Button>
              </Link>
            )}
          </div>
        ),
      },
    ];

    return [...courseSpecificRows, ...universityRows];
  }, [comparedData, selectedCourse, openFormModal]);

  return (
    <div className="bg-[#f8fafc] min-h-screen py-6 px-3 sm:px-5 md:px-6 font-sans text-slate-800">
      <div className="max-w-[1440px] mx-auto space-y-4">
        {/* Controls & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {comparedData.length < 4 ? (
              <Select
                showSearch
                placeholder="Search university to compare..."
                className="w-full sm:w-72"
                options={selectOptions.filter(
                  (opt) => !comparedData.some((u) => String(u._id) === opt.value || u.slug === opt.value)
                )}
                onChange={handleSelectAdd}
                value={null}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
              />
            ) : (
              <span className="text-xs font-bold text-slate-500">
                Maximum 4 universities selected
              </span>
            )}

            <Select
              showSearch
              value={selectedCourse}
              onChange={setSelectedCourse}
              placeholder="Select Course..."
              className="w-full sm:w-52 font-semibold"
              options={courseSelectOptions}
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
            />
          </div>

          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
            {comparedData.length > 0 && (
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={clearCompare}
                className="font-bold rounded-xl h-9 text-xs cursor-pointer"
              >
                Clear All ({comparedData.length})
              </Button>
            )}
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push("/universities")}
              className="font-bold rounded-xl h-9 text-xs border-slate-300 text-slate-700 cursor-pointer"
            >
              Browse Universities
            </Button>
          </div>
        </div>

        {/* Comparison Table / Skeleton */}
        {loading ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-100 flex flex-col gap-4 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <Skeleton.Avatar active size="large" shape="square" style={{ borderRadius: 12 }} />
                    <div className="flex-1">
                      <Skeleton.Input active size="small" style={{ width: "80%", height: 18 }} />
                      <Skeleton.Input active size="small" style={{ width: "50%", height: 14, marginTop: 4 }} />
                    </div>
                  </div>
                  <Skeleton active paragraph={{ rows: 6, width: ["100%", "85%", "90%", "75%", "60%", "70%"] }} />
                  <Skeleton.Button active size="small" style={{ width: "100%", height: 36, borderRadius: 12, marginTop: "auto" }} />
                </div>
              ))}
            </div>
          </div>
        ) : comparedData.length > 0 ? (
          <div>
            <Table
              columns={tableColumns}
              dataSource={tableDataSource}
              pagination={false}
              bordered
              size="small"
              scroll={{ x: "max-content" }}
              rowKey="key"
              className="comparison-matrix-table w-full"
            />
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-200/80 flex flex-col items-center justify-center space-y-4">
            <Empty
              description={
                <div className="space-y-1">
                  <p className="text-base font-bold text-slate-700 m-0">No Universities Selected</p>
                  <p className="text-xs text-slate-500 m-0">
                    Add universities from the search bar above or browse all universities to start comparing.
                  </p>
                </div>
              }
            />
            <Button
              type="primary"
              onClick={() => router.push("/universities")}
              className="bg-[#1C3569] hover:bg-[#122449] border-none font-bold text-xs rounded-xl h-10 px-6 cursor-pointer"
            >
              Browse All Universities
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
