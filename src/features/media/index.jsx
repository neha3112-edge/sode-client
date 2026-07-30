"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import MediaForm from "./form";
import { Tag, Button, Image, Tooltip, Typography } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  FileUnknownOutlined,
} from "@ant-design/icons";
import { getAssetPath } from "@/lib/utils";

const { Text } = Typography;

/**
 * Strapi-Style Asset Card Component used by DataTable Grid View
 */
function MediaAssetCard({ record, onRead, onEdit, onDelete }) {
  const isImage =
    record.mimeType?.startsWith("image/") ||
    record.url?.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i);
  const isPdf =
    record.mimeType === "application/pdf" || record.url?.endsWith(".pdf");

  const assetUrl = getAssetPath(record.url);
  const ext = record.url ? record.url.split(".").pop().toUpperCase() : "FILE";

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col relative">
      {/* File Extension Badge */}
      <div className="absolute top-2.5 left-2.5 z-10">
        <Tag
          color={isImage ? "blue" : isPdf ? "magenta" : "purple"}
          className="font-semibold text-[10px] uppercase px-2 py-0.5 rounded-full border-none shadow-2xs"
        >
          {ext}
        </Tag>
      </div>

      {/* Asset Preview Box */}
      <div className="h-36 w-full bg-slate-50 flex items-center justify-center relative overflow-hidden border-b border-slate-100 p-2">
        {isImage ? (
          <Image
            src={assetUrl}
            alt={record.alt || record.name}
            className="object-contain max-h-32 max-w-full rounded"
            preview={false}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
        ) : isPdf ? (
          <div className="flex flex-col items-center justify-center text-red-500 gap-1.5">
            <FilePdfOutlined className="text-4xl" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              PDF Document
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-indigo-500 gap-1.5">
            <FileUnknownOutlined className="text-4xl" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              {record.bucket || "Asset"}
            </span>
          </div>
        )}

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-2">
          {/* Ant Design Built-in Copyable Text */}
          <Text
            copyable={{
              text: assetUrl,
              tooltips: ["Copy Public URL", "Copied!"],
            }}
            className="[&_.ant-typography-copy]:text-white [&_.ant-typography-copy]:text-lg [&_.ant-typography-copy]:bg-white/20 [&_.ant-typography-copy]:p-2 [&_.ant-typography-copy]:rounded-full hover:[&_.ant-typography-copy]:bg-white/40"
          />

          <Tooltip title="Edit Metadata">
            <Button
              shape="circle"
              size="middle"
              icon={<EditOutlined className="text-white text-base" />}
              onClick={() => onEdit(record)}
              className="bg-white/20 hover:!bg-white/40 border-none backdrop-blur-md"
            />
          </Tooltip>

          <Tooltip title="Delete Asset">
            <Button
              shape="circle"
              size="middle"
              icon={<DeleteOutlined className="text-red-400 text-base" />}
              onClick={() => onDelete(record)}
              className="bg-white/20 hover:!bg-red-500/80 border-none backdrop-blur-md"
            />
          </Tooltip>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-1.5">
        <div>
          <h4
            className="text-xs font-semibold text-slate-700 truncate m-0 tracking-tight"
            title={record.name}
          >
            {record.name || "Untitled Asset"}
          </h4>
          {record.alt && (
            <p className="text-[11px] text-slate-400 truncate m-0">
              Alt: {record.alt}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 pt-1 border-t border-slate-100">
          <span>
            {record.size
              ? record.size < 1024 * 1024
                ? `${(record.size / 1024).toFixed(1)} KB`
                : `${(record.size / (1024 * 1024)).toFixed(1)} MB`
              : "0 KB"}
          </span>
          <span>{record.createdAt ? moment(record.createdAt).format("DD MMM YYYY") : "-"}</span>
        </div>
      </div>
    </div>
  );
}

export default function MediaCmsIndex() {
  const entity = "media";

  const dataTableColumns = [
    {
      title: "Preview",
      dataIndex: "url",
      width: 90,
      key: "preview",
      render: (url, record) =>
        record.mimeType?.startsWith("image/") ||
        url?.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i) ? (
          <Image
            src={getAssetPath(url)}
            alt={record.alt || record.name}
            width={50}
            height={50}
            className="object-cover rounded border border-slate-200"
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
        ) : (
          <Tag color="purple" className="uppercase font-mono text-xs">
            {record.bucket || "file"}
          </Tag>
        ),
    },
    {
      title: "Name & Alt",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="font-bold text-slate-800 text-sm">{text}</div>
          {record.alt && (
            <div className="text-xs text-slate-400 font-normal">
              Alt: {record.alt}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Bucket & Type",
      dataIndex: "bucket",
      width: 140,
      key: "bucket",
      render: (bucket, record) => (
        <div>
          <Tag color="cyan" className="capitalize font-semibold">
            {bucket || "images"}
          </Tag>
          <div className="text-xs text-slate-400 font-mono mt-1">
            {record.mimeType || "image/png"}
          </div>
        </div>
      ),
    },
    {
      title: "Public URL",
      dataIndex: "url",
      key: "url",
      render: (url) => {
        const proxyUrl = getAssetPath(url);
        return (
          <Text
            copyable={{ text: proxyUrl, tooltips: ["Copy Public URL", "Copied!"] }}
            className="text-xs font-mono text-blue-600 max-w-sm truncate"
          >
            {proxyUrl}
          </Text>
        );
      },
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 90,
      render: (size) => {
        if (!size) return "-";
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
        return `${(size / (1024 * 1024)).toFixed(1)} MB`;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 110,
      render: (date) => (date ? moment(date).format("DD-MM-YYYY") : "-"),
    },
  ];

  const labels = {
    PANEL_TITLE: "MinIO Media Library",
    DATATABLE_TITLE: "Uploaded Assets & Images",
    ADD_NEW_ENTITY: "Upload New Media",
    ENTITY_NAME: "Media",
    CREATE_ENTITY: "Upload",
    UPDATE_ENTITY: "Save Changes",
  };

  const config = {
    entity,
    ...labels,
    openMode: "modal", // ⚡ Global Modal Mode: opens form in centered ModalPanel instead of SidePanel drawer!
    modalWidth: 620,
    createEndPoint: "upload",
    dataTableColumns,
    readColumns: dataTableColumns,
    enableGridView: true,
    defaultViewMode: "grid",
    defaultPageSize: 18,
    gridItemRender: (record, { handleRead, handleEdit, handleDelete }) => (
      <MediaAssetCard
        key={record._id}
        record={record}
        onRead={handleRead}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
  };

  return (
    <CrudModule
      createForm={<MediaForm />}
      updateForm={<MediaForm isUpdateForm={true} />}
      config={config}
      withUpload={true}
    />
  );
}
