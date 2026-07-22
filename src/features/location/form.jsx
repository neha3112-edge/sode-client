"use client";

import React from "react";
import { Form, Input, Select, Switch, Row, Col } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function LocationForm({ isUpdateForm = false }) {
  const { data: cityOptions = [], isLoading: isCitiesLoading } =
    useGetDynamicOptionsQuery({
      entity: "city",
      endPoint: "options",
    });

  const { data: pincodeOptions = [], isLoading: isPincodesLoading } =
    useGetDynamicOptionsQuery({
      entity: "pincode",
      endPoint: "options",
    });

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Location Name"
            rules={[{ required: true, message: "Please enter location name" }]}
          >
            <Input placeholder="e.g. Bandra West, Manhattan" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. bandra-west, manhattan" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: "Please select city" }]}
          >
            <Select
              placeholder="Select City"
              loading={isCitiesLoading}
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(cityOptions) &&
                cityOptions.map((city) => (
                  <Select.Option key={city._id} value={city._id}>
                    {city.name || city.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="pincode"
            label="Pincode"
            rules={[{ required: true, message: "Please select pincode" }]}
          >
            <Select
              placeholder="Select Pincode"
              loading={isPincodesLoading}
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(pincodeOptions) &&
                pincodeOptions.map((pin) => (
                  <Select.Option key={pin._id} value={pin._id}>
                    {pin.code || pin.pincode || pin.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
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
        <Input.TextArea rows={3} placeholder="Location summary or notes..." />
      </Form.Item>
    </>
  );
}
