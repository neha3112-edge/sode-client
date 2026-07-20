"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import DurationForm from "./form";
import { Tag } from "antd";

export default function DurationCmsIndex() {
  const entity = "duration";

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
      title: "Months",
      dataIndex: "months",
      key: "months",
      width: 120,
      render: (months) => (
        <Tag color="purple" className="font-semibold">
          {months} Months
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
    PANEL_TITLE: "Duration Management",
    DATATABLE_TITLE: "Month Durations",
    ADD_NEW_ENTITY: "Add New Duration",
    ENTITY_NAME: "Duration",
    CREATE_ENTITY: "Save Duration",
    UPDATE_ENTITY: "Update Duration",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<DurationForm />}
      updateForm={<DurationForm isUpdateForm={true} />}
      config={config}
    />
  );
}
