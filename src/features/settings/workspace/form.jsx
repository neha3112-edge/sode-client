import React from "react";
import { Form, Input, Select, Switch, Row, Col } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

const { TextArea } = Input;

export default function WorkspaceForm({ isUpdateForm = false }) {
    // Dropdown ऑप्शंस फ़ेच करना (Tenant) via RTK Query using 'options' endPoint
    const { data: tenantsData = [], isLoading: loadingTenants } =
        useGetDynamicOptionsQuery({ entity: "tenant", endPoint: "options" });

    const tenants = Array.isArray(tenantsData)
        ? tenantsData
        : Array.isArray(tenantsData?.result)
        ? tenantsData.result
        : Array.isArray(tenantsData?.items)
        ? tenantsData.items
        : [];

    return (
        <>
            <Row gutter={16}>
                {/* Tenant Selection */}
                <Col span={12}>
                    <Form.Item
                        label="Select Tenant (Company)"
                        name="tenantId"
                        rules={[{ required: true, message: "Please select a tenant" }]}
                    >
                        <Select
                            placeholder="Select Tenant"
                            loading={loadingTenants}
                            showSearch
                            allowClear
                            optionFilterProp="label"
                            options={tenants.map((tenant) => ({
                                label: tenant.name || tenant.title,
                                value: String(tenant._id || tenant.id),
                            }))}
                        />
                    </Form.Item>
                </Col>

                {/* Workspace Name */}
                <Col span={12}>
                    <Form.Item
                        label="Workspace Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter workspace name" }]}
                    >
                        <Input placeholder="e.g., Sales Team, Tech Department" />
                    </Form.Item>
                </Col>
            </Row>

            {/* Description */}
            <Form.Item label="Description" name="description">
                <TextArea rows={4} placeholder="Briefly describe the purpose of this workspace..." />
            </Form.Item>

            {/* Enabled Switch */}
            <Form.Item
                label="Enabled"
                name="enabled"
                valuePropName="checked"
                initialValue={true}
            >
                <Switch />
            </Form.Item>
        </>
    );
}