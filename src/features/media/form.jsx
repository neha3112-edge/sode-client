"use client";

import React, { useState } from "react";
import { Form, Input, Upload, Button, Select, Divider, message, Spin } from "antd";
import { UploadOutlined, FolderAddOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useGetDynamicReadQuery,
  useCreateDynamicMutation,
} from "@/store/redux/dynamic/action";

/**
 * MediaForm — standard CrudModule pattern with 100% Redux RTK Query pipeline.
 */
export default function MediaForm({ isUpdateForm = false }) {
  const [fileList, setFileList] = useState([]);
  const [newBucketName, setNewBucketName] = useState("");

  // Load existing MinIO buckets using Redux RTK Query
  const { data: bucketData, isLoading: bucketsLoading } = useGetDynamicReadQuery({
    entity: "media",
    endPoint: "buckets",
  });

  const [createDynamic, { isLoading: creatingBucket }] = useCreateDynamicMutation();

  const buckets = bucketData?.result || [];

  // Create new bucket inline using Redux Mutation
  const handleCreateBucket = async () => {
    const name = newBucketName.trim().toLowerCase().replace(/\s+/g, "-");
    if (!name || name.length < 3) {
      message.warning("Bucket name must be at least 3 characters");
      return;
    }

    try {
      const res = await createDynamic({
        entity: "media",
        endPoint: "buckets/create",
        jsonData: { name },
      }).unwrap();

      if (res?.success) {
        message.success(res.message || `Bucket "${name}" created!`);
        setNewBucketName("");
      } else {
        message.error(res?.message || "Failed to create bucket");
      }
    } catch (err) {
      message.error(err?.data?.message || err?.message || "Error creating bucket");
    }
  };

  const bucketOptions = [
    // Auto-detect option
    { label: "🔄 Auto-detect by file type (recommended)", value: "" },
    ...buckets.map((b) => ({ label: `🪣 ${b.name}`, value: b.name })),
  ];

  return (
    <>
      {/* ── File Picker (create only) ──────────────────────────────── */}
      {!isUpdateForm && (
        <Form.Item
          label="Select File"
          name="file"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please select a file to upload" }]}
        >
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            fileList={fileList}
            onChange={({ fileList: newList }) => setFileList(newList)}
            accept="image/*,application/pdf,video/*,audio/*,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          >
            <Button icon={<UploadOutlined />}>Select Image / Document</Button>
          </Upload>
        </Form.Item>
      )}

      {/* ── Display Name ──────────────────────────────────────────── */}
      <Form.Item
        label="Display Name"
        name="name"
        rules={[{ required: !isUpdateForm, message: "Please enter a display name" }]}
      >
        <Input placeholder="e.g., Company Logo or Banner" />
      </Form.Item>

      {/* ── Alt Text ──────────────────────────────────────────────── */}
      <Form.Item label="Alt Text (SEO)" name="alt">
        <Input placeholder="e.g., SODE Logo PNG" />
      </Form.Item>

      {/* ── Bucket Selector ───────────────────────────────────────── */}
      <Form.Item
        label={
          <span className="flex items-center gap-1">
            Storage Bucket
            <span className="text-xs text-slate-400 font-normal ml-1">
              (leave blank to auto-detect)
            </span>
          </span>
        }
        name="bucket"
      >
        <Select
          placeholder={bucketsLoading ? "Loading buckets…" : "Auto-detect by file type"}
          loading={bucketsLoading}
          options={bucketOptions}
          allowClear
          showSearch
          filterOption={(input, option) =>
            option?.value?.toLowerCase().includes(input.toLowerCase())
          }
          // Inline create bucket footer
          popupRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: "8px 0" }} />
              <div className="flex items-center gap-2 px-2 pb-2">
                <Input
                  size="small"
                  placeholder="new-bucket-name"
                  value={newBucketName}
                  onChange={(e) => setNewBucketName(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  prefix={<FolderAddOutlined className="text-slate-400" />}
                  className="flex-1"
                />
                <Button
                  size="small"
                  type="primary"
                  icon={creatingBucket ? <Spin size="small" /> : <PlusOutlined />}
                  onClick={handleCreateBucket}
                  disabled={creatingBucket || newBucketName.trim().length < 3}
                >
                  Create
                </Button>
              </div>
            </>
          )}
        />
      </Form.Item>
    </>
  );
}
