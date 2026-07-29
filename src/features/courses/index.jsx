"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import CourseForm from "./form";
import { Tag, Switch } from "antd";

export default function CoursesCmsIndex() {
  const entity = "course";

  const dataTableColumns = [
    {
      title: "Active",
      dataIndex: "enabled",
      width: 70,
      key: "enabled",
      render: (value) => <Switch checked={value} disabled size="small" />,
    },
    {
      title: "Course Title",
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
      title: "Universities & Offerings",
      dataIndex: "universityOfferings",
      key: "universityOfferings",
      render: (offerings) => {
        if (Array.isArray(offerings) && offerings.length > 0) {
          return (
            <div className="flex flex-wrap gap-1.5 max-w-md">
              {offerings.map((off, idx) => {
                const uName =
                  typeof off.university === "object"
                    ? off.university?.name || "University"
                    : "University";
                const feeVal =
                  typeof off.fee === "object"
                    ? off.fee?.amount
                      ? `₹${Number(off.fee.amount).toLocaleString("en-IN")}`
                      : off.fee?.title
                    : off.fee;
                const durVal =
                  typeof off.duration === "object"
                    ? off.duration?.title
                    : off.duration;

                return (
                  <Tag key={idx} color="blue" className="font-semibold text-xs py-0.5">
                    {uName}
                    {feeVal ? ` — ${feeVal}` : ""}
                    {durVal ? ` (${durVal})` : ""}
                  </Tag>
                );
              })}
            </div>
          );
        }

        return <span className="text-slate-400 text-xs">No Universities Added</span>;
      },
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      width: 100,
      render: (featured) =>
        featured ? (
          <Tag color="volcano" className="font-bold">
            Featured
          </Tag>
        ) : (
          <Tag color="default">Standard</Tag>
        ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 110,
      render: (date) => (date ? moment(date).format("DD-MM-YYYY") : "-"),
    },
  ];

  const readColumns = [...dataTableColumns];

  const labels = {
    PANEL_TITLE: "Course Management",
    DATATABLE_TITLE: "Courses List",
    ADD_NEW_ENTITY: "Add Course",
    ENTITY_NAME: "Course",
    CREATE_ENTITY: "Save Course",
    UPDATE_ENTITY: "Update Course",
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
