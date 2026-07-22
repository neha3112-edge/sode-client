"use client";

import React from "react";
import { Form, Input, Select, Switch, InputNumber, Row, Col } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function CategoryForm({ isUpdateForm = false }) {
  const { data: parentOptions = [], isLoading: isParentsLoading } =
    useGetDynamicOptionsQuery({
      entity: "category",
      endPoint: "options",
    });

  const { data: mediaOptions = [], isLoading: isMediaLoading } =
    useGetDynamicOptionsQuery({
      entity: "media",
      endPoint: "options",
    });

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input placeholder="e.g. Doctorate, Executive, IT & Data" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. doctorate, executive, it-data" />
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
            <Select placeholder="Select type">
              <Select.Option value="course">Course</Select.Option>
              <Select.Option value="subcourse">Subcourse</Select.Option>
              <Select.Option value="university">University</Select.Option>
              <Select.Option value="general">General</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="parentId" label="Parent Category (Optional)">
            <Select
              placeholder="None (Root Category)"
              loading={isParentsLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(parentOptions) &&
                parentOptions.map((cat) => (
                  <Select.Option key={cat._id} value={cat._id}>
                    {cat.name || cat.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="description" label="Description">
        <Input.TextArea rows={3} placeholder="Category summary or notes..." />
      </Form.Item>

      <Form.Item name="title" label="Title (SEO / Custom Display)">
        <Input placeholder="e.g. Online Doctoral Programs (DBA)" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="icon" label="Icon Name or Class">
            <Input placeholder="e.g. GraduationCap, BookOpen, FaUserGraduate" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="image" label="Category Image / Banner Path">
            <Input placeholder="e.g. /assets/images/categories/doctorate.png" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="logo"
            label="Logo Media Asset"
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select from Media Library"
              loading={isMediaLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(mediaOptions) &&
                mediaOptions.map((media) => (
                  <Select.Option key={media._id} value={media._id}>
                    {media.name || media.fileName || media.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="logoSrc"
            label="LogoSrc Media Asset"
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select from Media Library"
              loading={isMediaLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(mediaOptions) &&
                mediaOptions.map((media) => (
                  <Select.Option key={media._id} value={media._id}>
                    {media.name || media.fileName || media.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="imageSrc"
            label="ImageSrc Media Asset"
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select from Media Library"
              loading={isMediaLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(mediaOptions) &&
                mediaOptions.map((media) => (
                  <Select.Option key={media._id} value={media._id}>
                    {media.name || media.fileName || media.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} align="middle">
        <Col span={8}>
          <Form.Item name="order" label="Sort Order" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="featured"
            label="Featured"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="enabled"
            label="Active"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
