"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import EligibilityForm from "./form";
import { Tag } from "antd";

export default function EligibilityCmsIndex() {
  const entity = "eligibility";

  const dataTableColumns = [
    {
      title: "Title / Requirement",
      dataIndex: "title",
      key: "title",
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
    PANEL_TITLE: "Eligibility Criteria Management",
    DATATABLE_TITLE: "Eligibility Criteria Options",
    ADD_NEW_ENTITY: "Add New Eligibility Option",
    ENTITY_NAME: "Eligibility",
    CREATE_ENTITY: "Save Eligibility",
    UPDATE_ENTITY: "Update Eligibility",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<EligibilityForm />}
      updateForm={<EligibilityForm isUpdateForm={true} />}
      config={config}
    />
  );
}
