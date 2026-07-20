import React from "react";
import { Form, Input, Switch, Row, Col } from "antd";

const { TextArea } = Input;

export default function TenantForm({ isUpdateForm = false }) {
    return (
        <>
            <Row gutter={16}>
                {/* Company Name */}
                <Col span={12}>
                    <Form.Item
                        label="Company Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter company name" }]}
                    >
                        <Input placeholder="Acme Corp" />
                    </Form.Item>
                </Col>

                {/* Slug */}
                <Col span={12}>
                    <Form.Item
                        label="Slug (URL Key)"
                        name="slug"
                        rules={[
                            { required: true, message: "Please enter slug" },
                            { pattern: /^[a-z0-9-]+$/, message: "Slug can only contain lowercase letters, numbers, and dashes" }
                        ]}
                    >
                        <Input placeholder="acme-corp" disabled={isUpdateForm} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                {/* Logo URL */}
                <Col span={12}>
                    <Form.Item label="Logo URL" name="logo">
                        <Input placeholder="https://example.com/logo.png" />
                    </Form.Item>
                </Col>

                {/* Website */}
                <Col span={12}>
                    <Form.Item label="Website" name="website">
                        <Input placeholder="https://www.acme.com" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                {/* Contact Email */}
                <Col span={12}>
                    <Form.Item
                        label="Contact Email"
                        name="email"
                        rules={[{ type: "email", message: "Please enter a valid email" }]}
                    >
                        <Input placeholder="info@acme.com" />
                    </Form.Item>
                </Col>

                {/* Contact Phone */}
                <Col span={12}>
                    <Form.Item label="Contact Phone" name="phone">
                        <Input placeholder="+91 XXXXX XXXXX" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                {/* City */}
                <Col span={8}>
                    <Form.Item label="City" name="city">
                        <Input placeholder="Mumbai" />
                    </Form.Item>
                </Col>

                {/* State */}
                <Col span={8}>
                    <Form.Item label="State" name="state">
                        <Input placeholder="Maharashtra" />
                    </Form.Item>
                </Col>

                {/* Pincode */}
                <Col span={8}>
                    <Form.Item label="Pincode" name="pincode">
                        <Input placeholder="400001" />
                    </Form.Item>
                </Col>
            </Row>

            {/* Country - Default Value 'India' */}
            <Form.Item label="Country" name="country" initialValue="India">
                <Input placeholder="India" />
            </Form.Item>

            {/* Full Address */}
            <Form.Item label="Full Address" name="address">
                <TextArea rows={2} placeholder="Enter dynamic street address details..." />
            </Form.Item>

            {/* Description */}
            <Form.Item label="Description" name="description">
                <TextArea rows={3} placeholder="Brief details about the tenant/company..." />
            </Form.Item>

            {/* Account Enabled Switch */}
            <Form.Item
                label="Account Enabled"
                name="enabled"
                valuePropName="checked"
                initialValue={true}
            >
                <Switch />
            </Form.Item>
        </>
    );
}