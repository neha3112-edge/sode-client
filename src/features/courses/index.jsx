"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import CourseForm from "./form";
import { Tag, Switch, Button, Tooltip } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  BookOutlined,
  BankOutlined,
  StarFilled,
  CheckCircleFilled,
  StopOutlined,
} from "@ant-design/icons";

/**
 * Modern Strapi-Style Course Card Component
 */
function CourseCard({ record, onRead, onEdit, onDelete }) {
  const offerings = Array.isArray(record.universityOfferings)
    ? record.universityOfferings
    : [];

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between relative p-4 space-y-3">
      {/* ── Top Badge Header Bar ────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {record.enabled !== false ? (
            <Tag color="success" className="font-semibold text-[10px] uppercase px-2 py-0.5 rounded-full border-none flex items-center gap-1">
              <CheckCircleFilled className="text-[10px]" /> Active
            </Tag>
          ) : (
            <Tag color="default" className="font-semibold text-[10px] uppercase px-2 py-0.5 rounded-full border-none flex items-center gap-1">
              <StopOutlined className="text-[10px]" /> Disabled
            </Tag>
          )}

          {record.featured && (
            <Tag color="warning" className="font-semibold text-[10px] uppercase px-2 py-0.5 rounded-full border-none flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200">
              <StarFilled className="text-[10px] text-amber-500" /> Featured
            </Tag>
          )}
        </div>

        <span className="text-[11px] font-mono text-slate-400">
          Order #{record.order || 0}
        </span>
      </div>

      {/* ── Title & Slug ──────────────────────────────────────────────── */}
      <div className="space-y-1">
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
            <BookOutlined className="text-base" />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="text-sm font-bold text-slate-800 tracking-tight leading-snug m-0 line-clamp-2 hover:text-[#4945ff] transition-colors"
              title={record.title}
            >
              {record.title || "Untitled Course"}
            </h3>
            <p className="text-[11px] font-mono text-slate-400 truncate m-0 mt-0.5">
              /{record.slug}
            </p>
          </div>
        </div>
      </div>

      {/* ── Universities & Offerings Pills ────────────────────────────── */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          <BankOutlined className="text-indigo-500" />
          <span>University Offerings ({offerings.length})</span>
        </div>

        {offerings.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
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
                <div
                  key={idx}
                  className="text-[11px] font-medium bg-blue-50/80 text-blue-700 border border-blue-100 rounded-lg px-2 py-1 flex items-center gap-1 truncate max-w-full"
                >
                  <span className="font-semibold text-blue-900 truncate">{uName}</span>
                  {feeVal && <span className="text-blue-600 font-bold">• {feeVal}</span>}
                  {durVal && <span className="text-slate-500">({durVal})</span>}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-[11px] text-slate-400 italic bg-slate-50 p-2 rounded-lg text-center border border-slate-100">
            No universities assigned yet
          </div>
        )}
      </div>

      {/* ── Footer Info & Quick Actions ────────────────────────────────── */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 select-none">
        <span className="text-[11px] text-slate-400 font-medium">
          {record.createdAt ? moment(record.createdAt).format("DD MMM YYYY") : "-"}
        </span>

        <div className="flex items-center gap-1">
          <Tooltip title="View Details">
            <Button
              type="text"
              shape="circle"
              size="small"
              icon={<EyeOutlined className="text-slate-500 hover:text-blue-600 text-sm" />}
              onClick={() => onRead(record)}
            />
          </Tooltip>

          <Tooltip title="Edit Course">
            <Button
              type="text"
              shape="circle"
              size="small"
              icon={<EditOutlined className="text-slate-500 hover:text-indigo-600 text-sm" />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>

          <Tooltip title="Delete Course">
            <Button
              type="text"
              shape="circle"
              size="small"
              icon={<DeleteOutlined className="text-slate-400 hover:text-red-500 text-sm" />}
              onClick={() => onDelete(record)}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default function CoursesCmsIndex() {
  const entity = "course";

  const dataTableColumns = [
    {
      title: "Active",
      dataIndex: "enabled",
      width: 75,
      key: "enabled",
      render: (value) => (
        <Switch
          checked={value !== false}
          disabled
          size="small"
          className={value !== false ? "bg-emerald-500" : ""}
        />
      ),
    },
    {
      title: "Course Title & Slug",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div className="space-y-0.5">
          <div className="font-bold text-slate-800 text-sm tracking-tight">{text}</div>
          <div className="text-xs text-indigo-600 font-mono bg-indigo-50 inline-block px-1.5 py-0.5 rounded border border-indigo-100">
            /{record.slug}
          </div>
        </div>
      ),
    },
    {
      title: "Universities & Offerings",
      dataIndex: "universityOfferings",
      key: "universityOfferings",
      render: (offerings) => {
        if (Array.isArray(offerings) && offerings.length > 0) {
          const firstOffering = offerings[0];
          const remainingCount = offerings.length - 1;

          const uName =
            typeof firstOffering.university === "object"
              ? firstOffering.university?.name || "University"
              : "University";
          const feeVal =
            typeof firstOffering.fee === "object"
              ? firstOffering.fee?.amount
                ? `₹${Number(firstOffering.fee.amount).toLocaleString("en-IN")}`
                : firstOffering.fee?.title
              : firstOffering.fee;
          const durVal =
            typeof firstOffering.duration === "object"
              ? firstOffering.duration?.title
              : firstOffering.duration;

          return (
            <div className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
              <Tag
                color="blue"
                className="font-medium text-xs py-0.5 px-2 rounded-md border border-blue-100 bg-blue-50 text-blue-800 m-0 truncate max-w-md"
              >
                <span className="font-bold">{uName}</span>
                {feeVal ? <span className="text-blue-600 font-bold"> — {feeVal}</span> : ""}
                {durVal ? <span className="text-slate-500"> ({durVal})</span> : ""}
              </Tag>

              {remainingCount > 0 && (
                <Tooltip
                  title={
                    <div className="space-y-1 p-1 text-xs">
                      {offerings.slice(1).map((off, idx) => {
                        const u =
                          typeof off.university === "object"
                            ? off.university?.name || "University"
                            : "University";
                        const f =
                          typeof off.fee === "object"
                            ? off.fee?.amount
                              ? `₹${Number(off.fee.amount).toLocaleString("en-IN")}`
                              : off.fee?.title
                            : off.fee;
                        const d =
                          typeof off.duration === "object"
                            ? off.duration?.title
                            : off.duration;
                        return (
                          <div key={idx} className="font-medium">
                            • {u} {f ? `— ${f}` : ""} {d ? `(${d})` : ""}
                          </div>
                        );
                      })}
                    </div>
                  }
                >
                  <Tag
                    color="cyan"
                    className="font-semibold text-xs rounded-full cursor-pointer m-0 px-2 py-0.5 border-none shadow-2xs"
                  >
                    +{remainingCount} more
                  </Tag>
                </Tooltip>
              )}
            </div>
          );
        }

        return <span className="text-slate-400 text-xs italic">No Universities Added</span>;
      },
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      width: 110,
      render: (featured) =>
        featured ? (
          <Tag color="gold" className="font-bold text-xs uppercase px-2 py-0.5 rounded-full border-amber-200 bg-amber-50 text-amber-700">
            ⭐ Featured
          </Tag>
        ) : (
          <Tag color="default" className="text-xs rounded-full">Standard</Tag>
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
    DATATABLE_TITLE: "Academic Courses Directory",
    ADD_NEW_ENTITY: "Add New Course",
    ENTITY_NAME: "Course",
    CREATE_ENTITY: "Save Course",
    UPDATE_ENTITY: "Update Course",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
    enableGridView: true,
    defaultViewMode: "grid",
    defaultPageSize: 18,
    gridItemRender: (record, { handleRead, handleEdit, handleDelete }) => (
      <CourseCard
        key={record._id}
        record={record}
        onRead={handleRead}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
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
