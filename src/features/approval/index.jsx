"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import ApprovalForm from "./form";
import { Tag } from "antd";

export default function ApprovalCmsIndex() {
  const entity = "approval";

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
    PANEL_TITLE: "Approvals & Accreditations",
    DATATABLE_TITLE: "Approvals List",
    ADD_NEW_ENTITY: "Add New Approval",
    ENTITY_NAME: "Approval",
    CREATE_ENTITY: "Save Approval",
    UPDATE_ENTITY: "Update Approval",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<ApprovalForm />}
      updateForm={<ApprovalForm isUpdateForm={true} />}
      config={config}
    />
  );
}
