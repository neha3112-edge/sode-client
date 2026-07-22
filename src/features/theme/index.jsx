"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import ThemeForm from "./form";
import { Tag } from "antd";

export default function ThemeCmsIndex() {
  const entity = "theme";

  const dataTableColumns = [
    {
      title: "Theme Profile Name",
      dataIndex: "themeName",
      key: "themeName",
      render: (text) => <span className="font-bold text-slate-800 text-sm">{text}</span>,
    },
    {
      title: "Default Mode",
      dataIndex: "themeMode",
      key: "themeMode",
      width: 120,
      render: (mode) => (
        <Tag color={mode === "dark" ? "purple" : "blue"} className="capitalize">
          {mode || "dark"}
        </Tag>
      ),
    },
    {
      title: "Theme Colors",
      dataIndex: "primaryColor",
      key: "colors",
      width: 180,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {/* Primary Swatch */}
          <div className="flex items-center gap-1 border border-slate-100 p-0.5 rounded-sm bg-slate-50">
            <span
              className="w-3.5 h-3.5 rounded-full inline-block shadow-2xs"
              style={{ backgroundColor: record.primaryColor || "#102441" }}
            />
            <span className="text-[10px] text-slate-500 font-mono">P</span>
          </div>

          {/* Secondary Swatch */}
          <div className="flex items-center gap-1 border border-slate-100 p-0.5 rounded-sm bg-slate-50">
            <span
              className="w-3.5 h-3.5 rounded-full inline-block shadow-2xs"
              style={{ backgroundColor: record.secondaryColor || "#EEC471" }}
            />
            <span className="text-[10px] text-slate-500 font-mono">S</span>
          </div>

          {/* Accent Swatch */}
          <div className="flex items-center gap-1 border border-slate-100 p-0.5 rounded-sm bg-slate-50">
            <span
              className="w-3.5 h-3.5 rounded-full inline-block shadow-2xs"
              style={{ backgroundColor: record.accentColor || "#3b82f6" }}
            />
            <span className="text-[10px] text-slate-500 font-mono">A</span>
          </div>
        </div>
      ),
    },
    {
      title: "Typography",
      dataIndex: "headingFont",
      key: "typography",
      render: (_, record) => (
        <div className="text-xs text-slate-600">
          <div>H: <span className="font-bold text-slate-800 font-serif">{record.headingFont || "Outfit"}</span></div>
          <div>B: <span className="text-slate-500 font-sans">{record.bodyFont || "Inter"}</span></div>
        </div>
      ),
    },
    {
      title: "Active Default",
      dataIndex: "isDefault",
      key: "isDefault",
      width: 120,
      render: (isDefault) => (
        <Tag color={isDefault ? "gold" : "default"} className="font-semibold">
          {isDefault ? "★ Active Theme" : "Inactive"}
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
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date) => (date ? moment(date).format("DD-MM-YYYY") : "-"),
    },
  ];

  const readColumns = [...dataTableColumns];

  const labels = {
    PANEL_TITLE: "Appearance Theme Management",
    DATATABLE_TITLE: "Site Appearance Themes",
    ADD_NEW_ENTITY: "Create New Theme Profile",
    ENTITY_NAME: "Theme",
    CREATE_ENTITY: "Save Theme Profile",
    UPDATE_ENTITY: "Update Theme Profile",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<ThemeForm />}
      updateForm={<ThemeForm isUpdateForm={true} />}
      config={config}
    />
  );
}
