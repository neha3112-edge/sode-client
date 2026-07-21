"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import HeaderForm from "./form";
import { Tag, Avatar } from "antd";
import { getAssetPath } from "@/lib/utils";

export default function HeaderCmsIndex() {
  const entity = "header";

  const dataTableColumns = [
    {
      title: "Logo / Icon",
      dataIndex: "logoSrc",
      key: "logoSrc",
      width: 90,
      render: (logoSrc, record) => {
        const logo =
          logoSrc ||
          record.relatedCourse?.logoSrc ||
          record.relatedCourse?.image ||
          record.relatedUniversity?.logoSrc;

        if (!logo || record.showLogo === false) {
          return <Tag color="default">No Logo</Tag>;
        }

        return (
          <div className="w-8 h-8 rounded-lg bg-slate-100 p-1 border border-slate-200 flex items-center justify-center overflow-hidden">
            <img
              src={getAssetPath(logo)}
              alt={record.label}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Navigation Label & Href",
      dataIndex: "label",
      key: "label",
      render: (text, record) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 text-sm">{text}</span>
            {record.badge && (
              <Tag color={record.badgeColor || "gold"} className="font-bold text-[10px] m-0">
                {record.badge}
              </Tag>
            )}
          </div>
          <div className="text-xs text-slate-400 font-mono">{record.href}</div>
        </div>
      ),
    },
    {
      title: "Parent Menu",
      dataIndex: "parentId",
      key: "parentId",
      width: 140,
      render: (parentId) => {
        if (!parentId) {
          return <Tag color="blue" className="font-bold">Main Root</Tag>;
        }
        const parentLabel = typeof parentId === "object" ? parentId.label : "Sub Menu";
        return <Tag color="purple" className="font-bold">📂 {parentLabel}</Tag>;
      },
    },
    {
      title: "Logo Mode",
      dataIndex: "showLogo",
      key: "showLogo",
      width: 120,
      render: (showLogo) => (
        <Tag color={showLogo !== false ? "cyan" : "volcano"}>
          {showLogo !== false ? "With Logo" : "Without Logo"}
        </Tag>
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
      title: "Sort Order",
      dataIndex: "order",
      key: "order",
      width: 90,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 110,
      render: (date) => (date ? moment(date).format("DD-MM-YYYY") : "-"),
    },
  ];

  const readColumns = [...dataTableColumns];

  const labels = {
    PANEL_TITLE: "Dynamic Header Navigation CMS",
    DATATABLE_TITLE: "Header Menu Items & Hierarchy",
    ADD_NEW_ENTITY: "Add New Header Link",
    ENTITY_NAME: "Header Navigation",
    CREATE_ENTITY: "Save Header Link",
    UPDATE_ENTITY: "Update Header Link",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<HeaderForm />}
      updateForm={<HeaderForm isUpdateForm={true} />}
      config={config}
    />
  );
}
