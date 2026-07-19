import React, { useEffect, useRef } from "react";
import { Form, Input, Select, Switch, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { fetchOptions } from "@/redux/options/actions";
// import {
//     selectSpecificEntityLoading,
//     selectSpecificEntityData,
// } from "@/redux/options/selectors"; // अपने प्रोजेक्ट के Redux पाथ के अनुसार एडजस्ट करें

const { TextArea } = Input;

export default function WorkspaceForm({ isUpdateForm = false }) {
    // const dispatch = useDispatch();
    // const hasFetchedOptions = useRef(false);

    // Dropdown ऑप्शंस फ़ेच करना (Tenant)
    // useEffect(() => {
    //     if (!hasFetchedOptions.current) {
    //         hasFetchedOptions.current = true;
    //         dispatch(fetchOptions("tenant")); // टेनेंट ऑप्शंस लोड करने के लिए
    //     }
    // }, [dispatch]);

    // Redux Selectors से टेनेंट्स का डेटा निकालना
    // const tenants = useSelector((state) => selectSpecificEntityData(state, "tenant")) || [];
    // const loadingTenants = useSelector((state) => selectSpecificEntityLoading(state, "tenant"));

    return (
        <>
            <Row gutter={16}>
                {/* Tenant Selection */}
                {/* <Col span={12}>
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
                            filterOption={(input, option) =>
                                option.children.toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {tenants.map((tenant) => (
                                <Select.Option key={tenant._id} value={tenant._id}>
                                    {tenant.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col> */}

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