"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import ContentForm from "./form";
import { Tag } from "antd";

export default function ContentCmsIndex() {
  const entity = "content";

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
      title: "Content Type",
      dataIndex: "contentType",
      key: "contentType",
      width: 140,
      render: (type) => {
        let color = "blue";
        if (type === "blog") color = "orange";
        if (type === "policy") color = "purple";
        if (type === "news") color = "magenta";
        return (
          <Tag color={color} className="capitalize font-semibold">
            {type || "page"}
          </Tag>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (category) =>
        category ? (
          <Tag color="cyan">{category.name || "Category"}</Tag>
        ) : (
          <span className="text-slate-400 text-xs">Uncategorized</span>
        ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: 140,
      render: (author) =>
        author ? (
          <span className="text-xs text-slate-700 font-medium">
            {author.fullname || author.username}
          </span>
        ) : (
          <span className="text-slate-400 text-xs">-</span>
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
    PANEL_TITLE: "Content Management",
    DATATABLE_TITLE: "Global Pages & Blogs",
    ADD_NEW_ENTITY: "Add New Content",
    ENTITY_NAME: "Content",
    CREATE_ENTITY: "Save Content",
    UPDATE_ENTITY: "Update Content",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<ContentForm />}
      updateForm={<ContentForm isUpdateForm={true} />}
      config={config}
    />
  );
}
