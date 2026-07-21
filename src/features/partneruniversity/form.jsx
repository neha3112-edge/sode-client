"use client";

import React from "react";
import { Form, Input, Select, Switch, InputNumber, Row, Col } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function PartnerUniversityForm({ isUpdateForm = false }) {
  const { data: universityOptions = [], isLoading: isUniversityLoading } =
    useGetDynamicOptionsQuery({
      entity: "university",
      endPoint: "options",
    });

  const { data: courseOptions = [], isLoading: isCourseLoading } =
    useGetDynamicOptionsQuery({
      entity: "course",
      endPoint: "options",
    });

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="university"
            label="Base Master University"
            rules={[{ required: true, message: "Please select base university" }]}
            getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
            getValueProps={(val) => ({
              value: typeof val === "object" ? val?._id || val : val,
            })}
          >
            <Select
              placeholder="Select Base University"
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
          <Form.Item name="brochureUrl" label="Brochure PDF Path / URL">
            <Input placeholder="e.g. /assets/pdf/ggu_main_brochure.pdf" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="courses"
        label="Associated Master Courses"
        help="Select master courses offered by this partner university"
        getValueFromEvent={(val) =>
          Array.isArray(val)
            ? val.map((item) => (typeof item === "object" ? item?._id || item : item))
            : val
        }
        getValueProps={(val) => ({
          value: Array.isArray(val)
            ? val.map((item) => (typeof item === "object" ? item?._id || item : item))
            : val || [],
        })}
      >
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Select Associated Global Master Courses"
          loading={isCourseLoading}
          showSearch
          allowClear
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

      <Form.Item
        name="paragraphs"
        label="University Description Paragraphs"
        help="Enter paragraphs separated by a new line"
        getValueFromEvent={(e) => {
          const val = e.target.value;
          return Array.isArray(val) ? val : val.split("\n").filter((p) => p.trim());
        }}
        getValueProps={(val) => ({
          value: Array.isArray(val) ? val.join("\n") : val || "",
        })}
      >
        <Input.TextArea
          rows={5}
          placeholder="Enter university description paragraphs (each line becomes a separate paragraph)"
        />
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
            label="Featured on Homepage"
            valuePropName="checked"
            initialValue={true}
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
