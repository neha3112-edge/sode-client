"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import FeeForm from "./form";
import { Tag } from "antd";

export default function FeeCmsIndex() {
  const entity = "fee";

  const dataTableColumns = [
    {
      title: "Fee Title",
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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => (
        <span className="font-semibold text-slate-700">
          {record.currency === "INR" ? "₹" : record.currency === "USD" ? "$" : ""}
          {amount?.toLocaleString() || 0}
        </span>
      ),
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      width: 100,
      render: (currency) => <Tag color="blue">{currency || "INR"}</Tag>,
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
    PANEL_TITLE: "Fees Management",
    DATATABLE_TITLE: "Fee Structures List",
    ADD_NEW_ENTITY: "Add New Fee Option",
    ENTITY_NAME: "Fee Option",
    CREATE_ENTITY: "Save Fee Option",
    UPDATE_ENTITY: "Update Fee Option",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<FeeForm />}
      updateForm={<FeeForm isUpdateForm={true} />}
      config={config}
    />
  );
}
