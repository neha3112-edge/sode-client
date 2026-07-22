"use client";

import React from "react";
import { Form, Input, Select, Switch, Row, Col } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function StateForm({ isUpdateForm = false }) {
  const { data: countryOptions = [], isLoading: isCountriesLoading } =
    useGetDynamicOptionsQuery({
      entity: "country",
      endPoint: "options",
    });

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="State Name"
            rules={[{ required: true, message: "Please enter state name" }]}
          >
            <Input placeholder="e.g. Maharashtra, California" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. maharashtra, california" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Please select country" }]}
          >
            <Select
              placeholder="Select Country"
              loading={isCountriesLoading}
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(countryOptions) &&
                countryOptions.map((country) => (
                  <Select.Option key={country._id} value={country._id}>
                    {country.name || country.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
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

      <Form.Item name="desc" label="Description">
        <Input.TextArea rows={3} placeholder="State summary or notes..." />
      </Form.Item>
    </>
  );
}
