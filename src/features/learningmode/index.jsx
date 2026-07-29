"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import LearningModeForm from "./form";
import { Tag } from "antd";

export default function LearningModeCmsIndex() {
  const entity = "learningmode";

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
    PANEL_TITLE: "Learning Mode Management",
    DATATABLE_TITLE: "Learning Modes",
    ADD_NEW_ENTITY: "Add New Learning Mode",
    ENTITY_NAME: "Learning Mode",
    CREATE_ENTITY: "Save Learning Mode",
    UPDATE_ENTITY: "Update Learning Mode",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<LearningModeForm />}
      updateForm={<LearningModeForm isUpdateForm={true} />}
      config={config}
    />
  );
}
