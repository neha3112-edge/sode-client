"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import CategoryForm from "./form";
import { Tag } from "antd";

export default function CategoryCmsIndex() {
  const entity = "category";

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
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type) => (
        <Tag color="blue" className="capitalize font-semibold">
          {type || "course"}
        </Tag>
      ),
    },
    {
      title: "Parent Category",
      dataIndex: "parentId",
      key: "parentId",
      width: 160,
      render: (parent) =>
        parent ? (
          <Tag color="cyan">{parent.name || parent.label || "Parent"}</Tag>
        ) : (
          <span className="text-slate-400 text-xs">Root</span>
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
    PANEL_TITLE: "Category Management",
    DATATABLE_TITLE: "Global Categories",
    ADD_NEW_ENTITY: "Add New Category",
    ENTITY_NAME: "Category",
    CREATE_ENTITY: "Save Category",
    UPDATE_ENTITY: "Update Category",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<CategoryForm />}
      updateForm={<CategoryForm isUpdateForm={true} />}
      config={config}
    />
  );
}
