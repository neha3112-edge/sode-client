"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import RatingForm from "./form";
import { Tag, Rate } from "antd";

export default function RatingCmsIndex() {
  const entity = "rating";

  const dataTableColumns = [
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 150,
      render: (stars) => <Rate disabled allowHalf defaultValue={stars} style={{ fontSize: 13 }} />,
    },
    {
      title: "Review Details",
      dataIndex: "review",
      key: "review",
      render: (text, record) => (
        <div>
          {record.title && <div className="font-bold text-slate-800 text-xs">{record.title}</div>}
          <div className="text-xs text-slate-500 line-clamp-2 mt-0.5">{text}</div>
          {record.rejectionReason && (
            <div className="text-[10px] text-red-500 mt-1 italic">
              Rejection: {record.rejectionReason}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Reviewer",
      dataIndex: "createdBy",
      key: "createdBy",
      width: 140,
      render: (user) =>
        user ? (
          <span className="text-xs text-slate-700 font-medium">
            {user.fullname || user.username}
          </span>
        ) : (
          <span className="text-slate-400 text-xs">Anonymous</span>
        ),
    },
    {
      title: "Verified",
      dataIndex: "isVerifiedPurchase",
      key: "isVerifiedPurchase",
      width: 100,
      render: (verified) => (
        <Tag color={verified ? "gold" : "default"}>
          {verified ? "Verified" : "Normal"}
        </Tag>
      ),
    },
    {
      title: "Moderation",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => {
        let color = "orange";
        if (status === "approved") color = "green";
        if (status === "rejected") color = "red";
        return (
          <Tag color={color} className="capitalize font-semibold">
            {status || "pending"}
          </Tag>
        );
      },
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
    PANEL_TITLE: "Rating & Review Management",
    DATATABLE_TITLE: "Student Reviews & Ratings",
    ADD_NEW_ENTITY: "Add New Rating",
    ENTITY_NAME: "Rating",
    CREATE_ENTITY: "Save Rating",
    UPDATE_ENTITY: "Update Rating",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<RatingForm />}
      updateForm={<RatingForm isUpdateForm={true} />}
      config={config}
    />
  );
}
