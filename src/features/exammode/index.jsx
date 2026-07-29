"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import ExamModeForm from "./form";
import { Tag } from "antd";

export default function ExamModeCmsIndex() {
  const entity = "exammode";

  const dataTableColumns = [
    {
      title: "Name",
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
    PANEL_TITLE: "Exam Mode Management",
    DATATABLE_TITLE: "Exam Modes",
    ADD_NEW_ENTITY: "Add New Exam Mode",
    ENTITY_NAME: "Exam Mode",
    CREATE_ENTITY: "Save Exam Mode",
    UPDATE_ENTITY: "Update Exam Mode",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<ExamModeForm />}
      updateForm={<ExamModeForm isUpdateForm={true} />}
      config={config}
    />
  );
}
