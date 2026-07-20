"use client";

import React, { useEffect } from "react";
import { Form, Input, Select, Switch, InputNumber, Row, Col } from "antd";

export default function CourseForm({ isUpdateForm = false }) {
  const [form] = Form.useForm();

  // Auto-generate slug from title if title changes on create form
  const handleTitleChange = (e) => {
    if (!isUpdateForm) {
      const titleValue = e.target.value;
      const generatedSlug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      form.setFieldsValue({ slug: generatedSlug });
    }
  };

  return (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="title"
            label="Course Title"
            rules={[{ required: true, message: "Please enter course title" }]}
          >
            <Input
              placeholder="e.g. Doctor of Business Administration"
              onChange={handleTitleChange}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. doctor-of-business-administration-ggu" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select category">
              <Select.Option value="doctorate">Doctorate</Select.Option>
              <Select.Option value="certification">Certifications</Select.Option>
              <Select.Option value="executive">Executive Programs</Select.Option>
              <Select.Option value="master">Master</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="university"
            label="University Name"
            rules={[{ required: true, message: "Please enter university name" }]}
          >
            <Input placeholder="e.g. Golden Gate University" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="image"
            label="Course Image Path / URL"
            rules={[{ required: true, message: "Please enter image path" }]}
          >
            <Input placeholder="e.g. /assets/images/docrorate-1.png" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="logo"
            label="University Logo Path / URL"
            rules={[{ required: true, message: "Please enter logo path" }]}
          >
            <Input placeholder="e.g. /assets/images/ggu-logo.jpg" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please enter description" }]}
      >
        <Input.TextArea
          rows={3}
          placeholder="Brief description of the course..."
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: "Please enter duration" }]}
          >
            <Input placeholder="e.g. 27 Months" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="eligibility"
            label="Eligibility Criteria"
            rules={[{ required: true, message: "Please enter eligibility" }]}
          >
            <Input placeholder="e.g. Masters Degree or Bachelors Degree..." />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="brochureUrl" label="Brochure PDF Path / URL">
            <Input placeholder="e.g. /assets/pdf/ggu_dba.pdf" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="metaTitle" label="SEO Meta Title">
            <Input placeholder="e.g. Online DBA Degree | Golden Gate University" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="metaDescription" label="SEO Meta Description">
            <Input.TextArea rows={2} placeholder="Meta description for search engines..." />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="metaKeywords" label="SEO Keywords">
            <Input placeholder="e.g. DBA, Online Doctorate, Golden Gate University" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="ogImage" label="Social Preview Image (OG Image)">
            <Input placeholder="e.g. /assets/images/docrorate-1.png" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item name="order" label="Sort Order" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>

        <Col span={3}>
          <Form.Item
            name="featured"
            label="Featured"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
        </Col>

        <Col span={3}>
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
    </Form>
  );
}
