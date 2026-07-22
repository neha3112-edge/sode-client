"use client";

import React from "react";
import { Form, Input, Select, Switch, Row, Col } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function CityForm({ isUpdateForm = false }) {
  const { data: stateOptions = [], isLoading: isStatesLoading } =
    useGetDynamicOptionsQuery({
      entity: "state",
      endPoint: "options",
    });

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="City Name"
            rules={[{ required: true, message: "Please enter city name" }]}
          >
            <Input placeholder="e.g. Mumbai, New York" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. mumbai, new-york" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: "Please select state" }]}
          >
            <Select
              placeholder="Select State"
              loading={isStatesLoading}
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(stateOptions) &&
                stateOptions.map((state) => (
                  <Select.Option key={state._id} value={state._id}>
                    {state.name || state.label}
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
        <Input.TextArea rows={3} placeholder="City summary or notes..." />
      </Form.Item>
    </>
  );
}
