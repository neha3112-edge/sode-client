"use client";

import React from "react";
import { Form, Input, Select, Switch, InputNumber, Row, Col } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function CourseForm({ isUpdateForm = false }) {
  const { data: categoryOptions = [], isLoading: isCategoryLoading } =
    useGetDynamicOptionsQuery({
      entity: "category",
      endPoint: "options",
    });

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="title"
            label="Master Course Title"
            rules={[{ required: true, message: "Please enter master course title" }]}
          >
            <Input placeholder="e.g. Doctor of Business Administration" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. doctor-of-business-administration" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="category"
            label="Program Category"
            rules={[{ required: true, message: "Please select category" }]}
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select Category"
              loading={isCategoryLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(categoryOptions) &&
                categoryOptions.map((cat) => (
                  <Select.Option key={cat._id} value={cat._id}>
                    {cat.name || cat.label || cat.title}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="description"
        label="Master Course Description"
      >
        <Input.TextArea
          rows={3}
          placeholder="Brief overview description of this master program..."
        />
      </Form.Item>

      <Form.Item
        name="syllabus"
        label="Syllabus & Curriculum Modules (1 per line)"
        getValueFromEvent={(e) =>
          typeof e?.target?.value === "string"
            ? e.target.value.split("\n").filter((line) => line.trim().length > 0)
            : e
        }
        getValueProps={(val) => ({
          value: Array.isArray(val) ? val.join("\n") : val || "",
        })}
      >
        <Input.TextArea
          rows={4}
          placeholder={"Semester 1: Principles of Management, Financial Accounting\nSemester 2: Marketing Strategy, Operations\nSemester 3: Capstone Research & Electives"}
        />
      </Form.Item>

      <Form.Item name="careers" label="Career Opportunities & Prospects">
        <Input.TextArea rows={2} placeholder="e.g. Management Consultant, Product Manager, Business Analyst, Sales Director" />
      </Form.Item>

      <Row gutter={16} align="middle">
        <Col span={8}>
          <Form.Item name="order" label="Sort Order" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="featured"
            label="Featured Program"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="enabled"
            label="Active / Enabled"
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
