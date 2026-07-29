"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import NirfRankForm from "./form";
import { Tag } from "antd";

export default function NirfRankCmsIndex() {
  const entity = "nirfrank";

  const dataTableColumns = [
    {
      title: "Title",
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
      title: "Category & Year",
      dataIndex: "category",
      key: "category",
      width: 180,
      render: (cat, record) => (
        <Tag color="cyan">
          {cat || "General"} ({record.year || "2025"})
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
    PANEL_TITLE: "NIRF Ranking Management",
    DATATABLE_TITLE: "NIRF Ranks",
    ADD_NEW_ENTITY: "Add New NIRF Rank",
    ENTITY_NAME: "NIRF Rank",
    CREATE_ENTITY: "Save NIRF Rank",
    UPDATE_ENTITY: "Update NIRF Rank",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<NirfRankForm />}
      updateForm={<NirfRankForm isUpdateForm={true} />}
      config={config}
    />
  );
}
