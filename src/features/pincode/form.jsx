"use client";

import React from "react";
import { Form, Input, Select, Switch, Row, Col } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function PincodeForm({ isUpdateForm = false }) {
  const { data: cityOptions = [], isLoading: isCitiesLoading } =
    useGetDynamicOptionsQuery({
      entity: "city",
      endPoint: "options",
    });

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Pincode / Postal Code"
            rules={[{ required: true, message: "Please enter pincode code" }]}
          >
            <Input placeholder="e.g. 400050, 10001" />
          </Form.Item>
        </Col>

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
    </>
  );
}
