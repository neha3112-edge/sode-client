"use client";

import React, { useState } from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import PageForm from "./form";
import { Tag, Badge, Button, Modal, Rate } from "antd";
import { EyeOutlined, CheckCircleOutlined, StarOutlined, QuestionCircleOutlined, CodeOutlined } from "@ant-design/icons";

// =========================================================
// PREMIUM SECTION BLOCKS MOCK RENDERING COMPONENT
// =========================================================
function BlockPreview({ section }) {
  const { sectionType, sectionTitle, sectionSubtitle, bodyContent } = section;

  switch (sectionType) {
    case "hero":
      return (
        <div className="bg-[#102441] text-[#f8fafc] border border-slate-700/50 p-8 rounded-xl my-4 shadow-lg relative overflow-hidden select-none">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#EEC471]/10 rounded-full blur-3xl" />
          <Tag color="gold" className="uppercase font-bold text-[10px] tracking-wider mb-2">HERO BLOCK TEMPLATE</Tag>
          <h2 className="text-[#EEC471] text-2xl font-bold tracking-tight mt-1">{sectionTitle || "Your Landing Page Title"}</h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">{sectionSubtitle || "Highly informative sub-header description."}</p>
          <div className="flex gap-3 mt-6">
            <button className="bg-[#EEC471] text-[#102441] text-xs font-bold px-4 py-2 rounded-full shadow-md">Apply Now</button>
            <button className="border border-slate-400 text-slate-200 text-xs font-bold px-4 py-2 rounded-full">Download Brochure</button>
          </div>
        </div>
      );

    case "stats":
      return (
        <div className="bg-[#0f1d32] border border-slate-800 p-6 rounded-xl my-4 shadow-sm select-none">
          <Tag color="cyan" className="uppercase font-bold text-[10px] tracking-wider mb-3">STATS BLOCK TEMPLATE</Tag>
          <div className="font-semibold text-slate-300 text-sm mb-2">{sectionTitle || "Analytics Title"}</div>
          <div className="grid grid-cols-3 gap-4 mt-3">
            <div className="bg-[#162a4d] border border-slate-700/30 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-[#EEC471]">4.8 ★</div>
              <div className="text-[10px] text-slate-400">Student Reviews</div>
            </div>
            <div className="bg-[#162a4d] border border-slate-700/30 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-[#EEC471]">10K+</div>
              <div className="text-[10px] text-slate-400">Global Alumni</div>
            </div>
            <div className="bg-[#162a4d] border border-slate-700/30 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-[#EEC471]">Top 10</div>
              <div className="text-[10px] text-slate-400">NIRF Rankings</div>
            </div>
          </div>
        </div>
      );

    case "features":
      return (
        <div className="border border-slate-200 p-6 rounded-xl my-4 bg-white shadow-xs select-none">
          <Tag color="blue" className="uppercase font-bold text-[10px] tracking-wider mb-2">FEATURES BLOCK TEMPLATE</Tag>
          <h4 className="text-slate-800 text-base font-bold mt-1">{sectionTitle || "Program Key Highlights"}</h4>
          <p className="text-slate-500 text-xs">{sectionSubtitle || "Why choose SODE dynamic learning"}</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex gap-2 items-start bg-slate-50 p-2.5 rounded-lg">
              <CheckCircleOutlined className="text-emerald-500 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-700">Weekend Live Batches</div>
                <div className="text-[10px] text-slate-400">2-way interactive Zoom calls</div>
              </div>
            </div>
            <div className="flex gap-2 items-start bg-slate-50 p-2.5 rounded-lg">
              <CheckCircleOutlined className="text-emerald-500 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-700">1:1 Mentorship</div>
                <div className="text-[10px] text-slate-400">Guide sessions from Industry Experts</div>
              </div>
            </div>
          </div>
        </div>
      );

    case "faqs":
      return (
        <div className="border border-slate-200 p-6 rounded-xl my-4 bg-white shadow-xs select-none">
          <Tag color="purple" className="uppercase font-bold text-[10px] tracking-wider mb-2">FAQS ACCORDION TEMPLATE</Tag>
          <h4 className="text-slate-800 text-base font-bold mt-1">{sectionTitle || "Frequently Asked Questions"}</h4>
          <div className="flex flex-col gap-2 mt-4">
            <div className="border border-slate-100 p-2.5 rounded-lg bg-slate-50/50 flex justify-between items-center cursor-pointer">
              <span className="text-xs font-semibold text-slate-700">What are the eligibility criteria?</span>
              <QuestionCircleOutlined className="text-slate-400" />
            </div>
            <div className="border border-slate-100 p-2.5 rounded-lg bg-slate-50/50 flex justify-between items-center cursor-pointer">
              <span className="text-xs font-semibold text-slate-700">Is there any EMI fee support?</span>
              <QuestionCircleOutlined className="text-slate-400" />
            </div>
          </div>
        </div>
      );

    case "reviews":
      return (
        <div className="bg-amber-50/30 border border-amber-200/50 p-6 rounded-xl my-4 shadow-2xs select-none">
          <Tag color="warning" className="uppercase font-bold text-[10px] tracking-wider mb-2">REVIEWS BLOCK TEMPLATE</Tag>
          <h4 className="text-slate-800 text-base font-bold mt-1">{sectionTitle || "Alumni Success Stories"}</h4>
          <div className="bg-white p-3 rounded-lg border border-slate-100 mt-3 shadow-2xs">
            <Rate disabled allowHalf defaultValue={5} className="text-amber-400 text-xs mb-1" />
            <div className="text-xs font-bold text-slate-800">"Accelerated my marketing career!"</div>
            <p className="text-[10px] text-slate-500 mt-1 italic">"The executive mentorship sessions completely shifted my professional prospects."</p>
          </div>
        </div>
      );

    case "rich_text":
      return (
        <div className="border border-slate-200 p-6 rounded-xl my-4 bg-white shadow-xs">
          <Tag color="default" className="uppercase font-bold text-[10px] tracking-wider mb-2">RICH BODY TEXT BLOCK</Tag>
          {sectionTitle && <h3 className="text-slate-800 text-base font-bold mt-1 mb-2">{sectionTitle}</h3>}
          <div className="whitespace-pre-wrap text-slate-600 text-xs leading-relaxed">
            {bodyContent || "Body text content goes here..."}
          </div>
        </div>
      );

    case "custom_html":
      return (
        <div className="border border-slate-200 rounded-lg my-2 overflow-hidden shadow-2xs bg-white">
          <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-200 flex justify-between items-center text-[9px] text-slate-500 font-bold">
            <span>CUSTOM HTML BLOCK</span>
            <CodeOutlined className="text-pink-500 text-[10px]" />
          </div>
          <div 
            dangerouslySetInnerHTML={{ __html: bodyContent || "<div class='p-4 text-center text-slate-400 text-xs italic'>Empty custom HTML block</div>" }} 
            className="w-full"
          />
        </div>
      );

    default:
      return null;
  }
}

export default function PageCmsIndex() {
  const entity = "page";

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const dataTableColumns = [
    {
      title: "Page Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div>
          <div className="font-bold text-slate-800 text-sm">{text}</div>
          <div className="text-xs text-indigo-500 font-mono">/{record.slug}</div>
        </div>
      ),
    },
    {
      title: "Page Category",
      dataIndex: "pageType",
      key: "pageType",
      width: 140,
      render: (type) => {
        let color = "blue";
        if (type === "course") color = "green";
        if (type === "university") color = "gold";
        if (type === "blog") color = "orange";
        return (
          <Tag color={color} className="capitalize font-semibold text-xs">
            {type || "general"}
          </Tag>
        );
      },
    },
    {
      title: "Associated Entity",
      dataIndex: "associatedCourse",
      key: "association",
      width: 180,
      render: (_, record) => {
        if (record.pageType === "course" && record.associatedCourse) {
          return (
            <div>
              <span className="text-[10px] text-slate-400 block">Course Linked:</span>
              <Tag color="cyan" className="text-xs">{record.associatedCourse.title || "Course Link"}</Tag>
            </div>
          );
        }
        if (record.pageType === "university" && record.associatedUniversity) {
          return (
            <div>
              <span className="text-[10px] text-slate-400 block">University Linked:</span>
              <Tag color="geekblue" className="text-xs">{record.associatedUniversity.name || "University Link"}</Tag>
            </div>
          );
        }
        return <span className="text-slate-400 text-xs">-</span>;
      },
    },
    {
      title: "Blocks Count",
      dataIndex: "sections",
      key: "sections",
      width: 120,
      render: (sections) => (
        <Badge
          count={Array.isArray(sections) ? sections.length : 0}
          showZero
          color="#6366f1"
        />
      ),
    },
    {
      title: "Live Preview",
      key: "preview",
      width: 130,
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<EyeOutlined />}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold flex items-center justify-center cursor-pointer shadow-sm border-none h-7 px-3"
          onClick={() => {
            setPreviewData(record);
            setPreviewVisible(true);
          }}
        >
          Preview
        </Button>
      ),
    },
    {
      title: "Status",
      dataIndex: "enabled",
      key: "enabled",
      width: 100,
      render: (enabled) => (
        <Tag color={enabled !== false ? "green" : "red"}>
          {enabled !== false ? "Active" : "Disabled"}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date) => (date ? moment(date).format("DD-MM-YYYY") : "-"),
    },
  ];

  const readColumns = [...dataTableColumns.filter(c => c.key !== "preview")];

  const labels = {
    PANEL_TITLE: "Page Builder Management",
    DATATABLE_TITLE: "Dynamic Catch-all Pages",
    ADD_NEW_ENTITY: "Create New Landing Page",
    ENTITY_NAME: "Page",
    CREATE_ENTITY: "Save Page",
    UPDATE_ENTITY: "Update Page",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <>
      <CrudModule
        createForm={<PageForm />}
        updateForm={<PageForm isUpdateForm={true} />}
        config={config}
      />

      {/* Dynamic Blocks Preview Modal */}
      <Modal
        title={
          <div className="flex flex-col select-none pt-2">
            <span className="text-slate-800 text-base font-extrabold tracking-tight">
              🔍 SODE Dynamic Landing Page Live Preview
            </span>
            <span className="text-[11px] text-slate-400 font-mono mt-0.5">
              URL Endpoint: https://sode.co.in/{previewData?.slug || "your-slug"}
            </span>
          </div>
        }
        open={previewVisible}
        onCancel={() => {
          setPreviewVisible(false);
          setPreviewData(null);
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              setPreviewVisible(false);
              setPreviewData(null);
            }}
            className="rounded-lg font-semibold"
          >
            Close Preview
          </Button>,
        ]}
        width={850}
        className="custom-preview-modal"
      >
        <div className="max-h-[65vh] overflow-y-auto pr-2 mt-4 border-t border-slate-100 pt-3">
          {previewData?.sections && previewData.sections.length > 0 ? (
            // Sort sections by their Order number before mock render
            [...previewData.sections]
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((section, idx) => (
                <BlockPreview key={idx} section={section} />
              ))
          ) : (
            <div className="text-center py-12 select-none">
              <div className="text-4xl">📭</div>
              <div className="font-bold text-slate-400 mt-2 text-sm">No layout sections built on this page yet.</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Add section blocks inside page details to see visual renders.</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
