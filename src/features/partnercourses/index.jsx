"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import PartnerCourseForm from "./form";
import { Tag, Switch } from "antd";

export default function PartnerCoursesCmsIndex() {
  const entity = "partnercourse";

  const dataTableColumns = [
    {
      title: "Active",
      dataIndex: "enabled",
      width: 70,
      key: "enabled",
      render: (value) => <Switch checked={value} disabled size="small" />,
    },
    {
      title: "Partner Course",
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
      title: "Master Course",
      dataIndex: "course",
      key: "course",
      render: (course) => {
        const title = typeof course === "object" ? course?.title : course;
        return <span className="font-semibold text-indigo-600">{title || "N/A"}</span>;
      },
    },
    {
      title: "University",
      dataIndex: "university",
      key: "university",
      render: (university) => {
        const uniName = typeof university === "object" ? university?.name : university;
        return <span className="font-semibold text-slate-700">{uniName || "N/A"}</span>;
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => {
        const durText = typeof duration === "object" ? duration?.title : duration;
        return <span className="font-semibold text-slate-700">{durText || "N/A"}</span>;
      },
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      render: (fee) => {
        const title = typeof fee === "object" ? fee?.title : fee;
        return <span className="font-semibold text-emerald-600">{title || "N/A"}</span>;
      },
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
    PANEL_TITLE: "Partner Courses Management",
    DATATABLE_TITLE: "All Partner Courses List",
    ADD_NEW_ENTITY: "Add Partner Course",
    ENTITY_NAME: "Partner Course",
    CREATE_ENTITY: "Save Partner Course",
    UPDATE_ENTITY: "Update Partner Course",
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
      createForm={<PartnerCourseForm />}
      updateForm={<PartnerCourseForm isUpdateForm={true} />}
    />
  );
}
