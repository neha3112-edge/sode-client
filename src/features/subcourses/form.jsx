"use client";

import React from "react";
import { Form, Input, Select, Switch, InputNumber, Row, Col } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function SubcourseForm({ isUpdateForm = false }) {
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

  const { data: universityOptions = [], isLoading: isUniversityLoading } =
    useGetDynamicOptionsQuery({
      entity: "university",
      endPoint: "options",
    });

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="course"
            label="Parent Course"
            rules={[{ required: true, message: "Please select parent course" }]}
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select Parent Course"
              loading={isCourseLoading}
              showSearch
              allowClear
              optionFilterProp="children"
            >
              {Array.isArray(courseOptions) &&
                courseOptions.map((c) => (
                  <Select.Option key={c._id} value={c._id}>
                    {c.title || c.label || c.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="title"
            label="Subcourse Title"
            rules={[{ required: true, message: "Please enter subcourse title" }]}
          >
            <Input placeholder="e.g. Specialisation Module / Specialization in AI" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. specialisation-ai" />
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
              placeholder="Select category"
              loading={isCategoryLoading}
              showSearch
              allowClear
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
              showSearch
              allowClear
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
              showSearch
              allowClear
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

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="university"
            label="University"
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select University"
              loading={isUniversityLoading}
              showSearch
              allowClear
              optionFilterProp="children"
            >
              {Array.isArray(universityOptions) &&
                universityOptions.map((uni) => (
                  <Select.Option key={uni._id} value={uni._id}>
                    {uni.name || uni.title || uni.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="fee" label="Fee (INR / USD)" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="description" label="Subcourse Description">
        <Input.TextArea rows={3} placeholder="Subcourse description details..." />
      </Form.Item>

      <Row gutter={16} align="middle">
        <Col span={12}>
          <Form.Item name="order" label="Sort Order" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>

        <Col span={12}>
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
