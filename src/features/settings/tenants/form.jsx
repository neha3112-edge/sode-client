import React, { useEffect } from "react";
import { Form, Input, Switch, Row, Col, Select } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";
import { getAssetPath } from "@/lib/utils";

const { TextArea } = Input;

export default function TenantForm({ isUpdateForm = false }) {
    const form = Form.useFormInstance();

    // Fetch dynamic options
    const { data: mediaOptions = [] } = useGetDynamicOptionsQuery({ entity: "media", endPoint: "options" });
    const { data: cityOptions = [] } = useGetDynamicOptionsQuery({ entity: "city", endPoint: "options" });
    const { data: stateOptions = [] } = useGetDynamicOptionsQuery({ entity: "state", endPoint: "options" });
    const { data: countryOptions = [] } = useGetDynamicOptionsQuery({ entity: "country", endPoint: "options" });

    const mediaList = Array.isArray(mediaOptions) ? mediaOptions : [];
    const cityList = Array.isArray(cityOptions) ? cityOptions : [];
    const stateList = Array.isArray(stateOptions) ? stateOptions : [];
    const countryList = Array.isArray(countryOptions) ? countryOptions : [];

    // Normalize initial form values on update form (convert populated objects to _id strings)
    useEffect(() => {
        if (!form || !isUpdateForm) return;

        const values = form.getFieldsValue();
        if (!values) return;

        const extractId = (val) => (typeof val === "object" && val !== null ? val._id : val);

        let needsUpdate = false;
        const patch = {};

        if (values.logo && typeof values.logo === "object") {
            patch.logo = values.logo._id;
            needsUpdate = true;
        }
        if (values.city && typeof values.city === "object") {
            patch.city = values.city._id;
            needsUpdate = true;
        }
        if (values.state && typeof values.state === "object") {
            patch.state = values.state._id;
            needsUpdate = true;
        }
        if (values.country && typeof values.country === "object") {
            patch.country = values.country._id;
            needsUpdate = true;
        }

        if (needsUpdate) {
            form.setFieldsValue(patch);
        }
    }, [form, isUpdateForm]);

    // Helper to render image preview thumbnail
    const renderImagePreview = (selectedMediaId) => {
        if (!selectedMediaId) return null;
        const mediaObj = mediaList.find((m) => m._id === selectedMediaId);
        const rawUrl = mediaObj?.url || (typeof selectedMediaId === "string" ? selectedMediaId : null);
        if (!rawUrl) return null;

        const displayUrl = getAssetPath(rawUrl);

        return (
            <div className="mt-2 flex items-center gap-2 p-1.5 bg-slate-100 rounded-md border border-slate-200 w-fit">
                <div className="w-12 h-12 rounded overflow-hidden relative bg-slate-800">
                    <img src={displayUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="text-[11px] font-semibold text-slate-600 max-w-37.5 truncate">
                    {mediaObj?.name || mediaObj?.fileName || "Media Selected"}
                </div>
            </div>
        );
    };

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
                    <Form.Item label="Logo (Media Asset)" name="logo">
                        <Select
                            showSearch
                            virtual={false}
                            optionFilterProp="label"
                            filterOption={(input, option) =>
                                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                            }
                            placeholder="Select Logo from Media Collection"
                            allowClear
                            options={mediaList.map((m) => ({
                                label: `🖼️ ${m.name || m.fileName || m.url}`,
                                value: m._id,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item noStyle shouldUpdate={(prev, curr) => prev.logo !== curr.logo}>
                        {({ getFieldValue }) => renderImagePreview(getFieldValue("logo"))}
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
                        <Select
                            showSearch
                            allowClear
                            placeholder="Select City"
                            optionFilterProp="label"
                            options={cityList.map((c) => ({ label: c.name, value: c._id }))}
                        />
                    </Form.Item>
                </Col>

                {/* State */}
                <Col span={8}>
                    <Form.Item label="State" name="state">
                        <Select
                            showSearch
                            allowClear
                            placeholder="Select State"
                            optionFilterProp="label"
                            options={stateList.map((s) => ({ label: s.name, value: s._id }))}
                        />
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
            <Form.Item label="Country" name="country">
                <Select
                    showSearch
                    allowClear
                    placeholder="Select Country"
                    optionFilterProp="label"
                    options={countryList.map((c) => ({ label: c.name, value: c._id }))}
                />
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