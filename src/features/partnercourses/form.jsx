"use client";

import React from "react";
import { Form, Input, Select, Switch, InputNumber, Row, Col } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function PartnerCourseForm({ isUpdateForm = false }) {
  const { data: courseOptions = [], isLoading: isCourseLoading } =
    useGetDynamicOptionsQuery({
      entity: "course",
      endPoint: "options",
    });

  const { data: categoryOptions = [], isLoading: isCategoryLoading } =
    useGetDynamicOptionsQuery({
      entity: "category",
      endPoint: "options",
    });

  const { data: durationOptions = [], isLoading: isDurationLoading } =
    useGetDynamicOptionsQuery({
      entity: "duration",
      endPoint: "options",
    });

  const { data: eligibilityOptions = [], isLoading: isEligibilityLoading } =
    useGetDynamicOptionsQuery({
      entity: "eligibility",
      endPoint: "options",
    });

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="course"
            label="Base Course Reference"
            rules={[{ required: true, message: "Please select course reference" }]}
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select Course"
              loading={isCourseLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(courseOptions) &&
                courseOptions.map((c) => (
                  <Select.Option key={c._id} value={c._id}>
                    {c.title || c.name || c.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="category"
            label="Category"
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

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="duration"
            label="Duration"
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select Duration"
              loading={isDurationLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(durationOptions) &&
                durationOptions.map((dur) => (
                  <Select.Option key={dur._id} value={dur._id}>
                    {dur.title || dur.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="eligibility"
            label="Eligibility Criteria"
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select Eligibility"
              loading={isEligibilityLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(eligibilityOptions) &&
                eligibilityOptions.map((elg) => (
                  <Select.Option key={elg._id} value={elg._id}>
                    {elg.title || elg.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="description" label="Partner Course Description">
        <Input.TextArea rows={3} placeholder="Enter course overview description..." />
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
