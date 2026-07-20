"use client";

import React from "react";
import { Form, Input, Select, Switch, InputNumber, Row, Col } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function CourseForm({ isUpdateForm = false }) {
  // 🔄 Fetch categories dynamically from Category collection
  const { data: categoryOptions = [], isLoading: isCategoryLoading } =
    useGetDynamicOptionsQuery({
      entity: "category",
      endPoint: "options",
    });

  // 🔄 Fetch duration options dynamically from Duration collection
  const { data: durationOptions = [], isLoading: isDurationLoading } =
    useGetDynamicOptionsQuery({
      entity: "duration",
      endPoint: "options",
    });

  // 🔄 Fetch eligibility options dynamically from Eligibility collection
  const { data: eligibilityOptions = [], isLoading: isEligibilityLoading } =
    useGetDynamicOptionsQuery({
      entity: "eligibility",
      endPoint: "options",
    });

  // 🔄 Fetch university options dynamically from University collection
  const { data: universityOptions = [], isLoading: isUniversityLoading } =
    useGetDynamicOptionsQuery({
      entity: "university",
      endPoint: "options",
    });

  // 🔄 Fetch fee options dynamically from Fee collection
  const { data: feeOptions = [], isLoading: isFeeLoading } =
    useGetDynamicOptionsQuery({
      entity: "fee",
      endPoint: "options",
    });

  // 🔄 Fetch media options dynamically from Media collection
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
            name="title"
            label="Course Title"
            rules={[{ required: true, message: "Please enter course title" }]}
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
            <Input placeholder="e.g. doctor-of-business-administration-ggu" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
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

        <Col span={12}>
          <Form.Item
            name="university"
            label="University"
            rules={[{ required: true, message: "Please select university" }]}
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select University"
              loading={isUniversityLoading}
              allowClear
              showSearch
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
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="image"
            label="Course Banner Image (Media)"
            rules={[{ required: true, message: "Please select course image" }]}
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select Media Asset for Banner"
              loading={isMediaLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(mediaOptions) &&
                mediaOptions.map((m) => (
                  <Select.Option key={m._id} value={m._id}>
                    {m.name || m.title || m.fileName || m.url}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="logo"
            label="University Logo Image (Media)"
            rules={[{ required: true, message: "Please select university logo" }]}
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select Media Asset for Logo"
              loading={isMediaLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(mediaOptions) &&
                mediaOptions.map((m) => (
                  <Select.Option key={m._id} value={m._id}>
                    {m.name || m.title || m.fileName || m.url}
                  </Select.Option>
                ))}
            </Select>
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
            rules={[{ required: true, message: "Please select duration" }]}
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
            rules={[{ required: true, message: "Please select eligibility criteria" }]}
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select Eligibility Criteria"
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

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="brochureUrl" label="Brochure PDF Path / URL">
            <Input placeholder="e.g. /assets/pdf/ggu_dba.pdf" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="fee"
            label="Course Fee"
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select Course Fee Tier"
              loading={isFeeLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(feeOptions) &&
                feeOptions.map((f) => (
                  <Select.Option key={f._id} value={f._id}>
                    {f.title || f.label || `₹${f.amount}`}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} align="middle">
        <Col span={6}>
          <Form.Item name="order" label="Sort Order" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="featured"
            label="Featured"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
        </Col>

        <Col span={6}>
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
