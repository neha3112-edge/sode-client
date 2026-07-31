"use client";

import React, { useMemo } from "react";
import { Form, Input, Select, Switch, InputNumber, Row, Col, Card } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function CategoryForm({ isUpdateForm = false }) {
  const { data: parentData = [], isLoading: isParentsLoading } =
    useGetDynamicOptionsQuery({
      entity: "category",
      endPoint: "options",
    });

  const { data: mediaData = [], isLoading: isMediaLoading } =
    useGetDynamicOptionsQuery({
      entity: "media",
      endPoint: "options",
    });

  const parentOptions = useMemo(() => {
    const list = Array.isArray(parentData)
      ? parentData
      : Array.isArray(parentData?.result)
      ? parentData.result
      : [];
    return list.map((item) => ({
      label: item.name || item.title || item.label || item._id,
      value: String(item._id || item.value || item.id),
    }));
  }, [parentData]);

  const mediaOptions = useMemo(() => {
    const list = Array.isArray(mediaData)
      ? mediaData
      : Array.isArray(mediaData?.result)
      ? mediaData.result
      : [];
    return list.map((item) => ({
      label: item.title || item.name || item.fileName || item.label || item._id,
      value: String(item._id || item.value || item.id),
    }));
  }, [mediaData]);

  const singleObjProp = (val) => {
    if (val === undefined || val === null || val === "") return { value: undefined };
    if (typeof val === "object" && val !== null) {
      const resolved = val._id || val.id || val.value || val;
      return { value: resolved ? String(resolved) : undefined };
    }
    return { value: String(val) };
  };

  const singleObjEvent = (val) => {
    if (val === undefined || val === null || val === "") return undefined;
    if (typeof val === "object" && val !== null) {
      const resolved = val._id || val.id || val.value || val;
      return resolved ? String(resolved) : undefined;
    }
    return String(val);
  };

  const multiObjProp = (val) => ({
    value: Array.isArray(val)
      ? val.map((v) =>
          typeof v === "object" && v !== null
            ? String(v._id || v.id || v.value || v)
            : String(v)
        )
      : val
      ? [typeof val === "object" ? String(val._id || val.id || val) : String(val)]
      : [],
  });

  const multiObjEvent = (val) =>
    Array.isArray(val)
      ? val.map((v) =>
          typeof v === "object" && v !== null
            ? String(v._id || v.id || v.value || v)
            : String(v)
        )
      : val;

  return (
    <div className="space-y-4 pt-1">
      {/* Basic Identification Card */}
      <Card size="small" className="rounded-xl border border-slate-200">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Category Name"
              rules={[{ required: true, message: "Please enter category name" }]}
            >
              <Input placeholder="e.g. Science, Doctorate, Executive" className="rounded-lg" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="slug"
              label="URL Slug"
              rules={[{ required: true, message: "Please enter URL slug" }]}
            >
              <Input placeholder="e.g. science, doctorate, executive" className="rounded-lg" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="type"
              label="Category Type / Scope"
              initialValue="course"
              rules={[{ required: true, message: "Please select category type" }]}
            >
              <Select
                placeholder="Select type"
                className="rounded-lg"
                options={[
                  { label: "Course", value: "course" },
                  { label: "Subcourse", value: "subcourse" },
                  { label: "University", value: "university" },
                  { label: "General", value: "general" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="parentId"
              label="Parent Categories (Hierarchy)"
              getValueFromEvent={multiObjEvent}
              getValueProps={multiObjProp}
            >
              <Select
                mode="multiple"
                placeholder="Select Parent Categories..."
                loading={isParentsLoading}
                allowClear
                showSearch
                optionFilterProp="label"
                options={parentOptions}
                className="rounded-lg"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="title" label="Custom Display Title (SEO)">
          <Input placeholder="e.g. Master of Science Programs & Degrees" className="rounded-lg" />
        </Form.Item>

        <Form.Item name="description" label="Description / Summary" className="mb-0">
          <Input.TextArea rows={3} placeholder="Category description..." className="rounded-lg" />
        </Form.Item>
      </Card>

      {/* Media & Icons Card */}
      <Card size="small" title="Media & Styling Assets" className="rounded-xl border border-slate-200">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="icon" label="Icon Identifier / Class">
              <Input placeholder="e.g. GraduationCap, BookOpen, FaUserGraduate" className="rounded-lg" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="image" label="Image / Banner Path (URL)">
              <Input placeholder="e.g. /assets/images/categories/science.png" className="rounded-lg" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="logo"
              label="Logo Media Asset"
              getValueFromEvent={singleObjEvent}
              getValueProps={singleObjProp}
            >
              <Select
                placeholder="Select Logo..."
                loading={isMediaLoading}
                allowClear
                showSearch
                optionFilterProp="label"
                options={mediaOptions}
                className="rounded-lg"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="logoSrc"
              label="LogoSrc Media Asset"
              getValueFromEvent={singleObjEvent}
              getValueProps={singleObjProp}
            >
              <Select
                placeholder="Select LogoSrc..."
                loading={isMediaLoading}
                allowClear
                showSearch
                optionFilterProp="label"
                options={mediaOptions}
                className="rounded-lg"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="imageSrc"
              label="ImageSrc Media Asset"
              getValueFromEvent={singleObjEvent}
              getValueProps={singleObjProp}
            >
              <Select
                placeholder="Select ImageSrc..."
                loading={isMediaLoading}
                allowClear
                showSearch
                optionFilterProp="label"
                options={mediaOptions}
                className="rounded-lg"
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Status & Display Preferences Card */}
      <Card size="small" title="Visibility & Status Flags" className="rounded-xl border border-slate-200">
        <Row gutter={16} align="middle">
          <Col span={6}>
            <Form.Item name="order" label="Sort Order" initialValue={0} className="mb-0">
              <InputNumber min={0} className="w-full rounded-lg" placeholder="0" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="featured"
              label="Featured"
              valuePropName="checked"
              initialValue={false}
              className="mb-0"
            >
              <Switch />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="showInStats"
              label="Show in Stats"
              valuePropName="checked"
              initialValue={true}
              className="mb-0"
            >
              <Switch />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="enabled"
              label="Active Status"
              valuePropName="checked"
              initialValue={true}
              className="mb-0"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
