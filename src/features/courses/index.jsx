"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import CourseForm from "./form";
import { Tag, Switch } from "antd";

export default function CoursesCmsIndex() {
  const entity = "course";

  const categoryColors = {
    doctorate: "purple",
    certification: "blue",
    executive: "gold",
    master: "green",
  };

  const dataTableColumns = [
    {
      title: "Active",
      dataIndex: "enabled",
      width: 70,
      key: "enabled",
      render: (value) => <Switch checked={value} disabled size="small" />,
    },
    {
      title: "Master Course Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div>
          <div className="font-bold text-slate-800 text-sm">{text}</div>
          <div className="text-xs text-slate-400 font-mono">{record.slug}</div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        const catName = typeof category === "object" ? category?.name : category;
        const catSlug = typeof category === "object" ? category?.slug : category;
        return (
          <Tag color={categoryColors[catSlug] || "blue"} className="capitalize font-semibold">
            {catName || "N/A"}
          </Tag>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (text) => <span className="text-xs text-slate-600 font-medium">{text || "N/A"}</span>,
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      render: (featured) => (
        featured ? (
          <Tag color="volcano" className="font-bold">Featured</Tag>
        ) : (
          <Tag color="default">Standard</Tag>
        )
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (date ? moment(date).format("DD-MM-YYYY") : "-"),
    },
  ];

  const readColumns = [...dataTableColumns];

  const labels = {
    PANEL_TITLE: "Master Courses CMS Management",
    DATATABLE_TITLE: "Master Courses List",
    ADD_NEW_ENTITY: "Add Master Course",
    ENTITY_NAME: "Master Course",
    CREATE_ENTITY: "Save Master Course",
    UPDATE_ENTITY: "Update Master Course",
  };

  const config = {
    entity,
    labels,
    dataTableColumns,
    readColumns,
    searchConfig: {
      displayLabels: ["title", "slug"],
      searchFields: "title,slug",
      outputValue: "_id",
    },
  };

  return (
    <CrudModule
      config={config}
      createForm={<CourseForm />}
      updateForm={<CourseForm isUpdateForm={true} />}
    />
  );
}
