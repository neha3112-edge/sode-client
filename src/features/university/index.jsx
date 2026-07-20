"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import UniversityForm from "./form";
import { Tag } from "antd";

export default function UniversityCmsIndex() {
  const entity = "university";

  const dataTableColumns = [
    {
      title: "University Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="font-bold text-slate-800 text-sm">{text}</div>
          <div className="text-xs text-slate-400 font-mono">/{record.slug}</div>
        </div>
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
      width: 100,
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
    PANEL_TITLE: "University Master Reference Management",
    DATATABLE_TITLE: "University Options List",
    ADD_NEW_ENTITY: "Add New University Option",
    ENTITY_NAME: "University",
    CREATE_ENTITY: "Save University",
    UPDATE_ENTITY: "Update University",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<UniversityForm />}
      updateForm={<UniversityForm isUpdateForm={true} />}
      config={config}
    />
  );
}
