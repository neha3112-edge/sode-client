"use strict";

import React, { useState } from "react";
import { Form, Input, Switch, InputNumber, Row, Col, Select, Card } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function HeaderForm({ isUpdateForm = false }) {
  const form = Form.useFormInstance();
  const [logoPreview, setLogoPreview] = useState(null);

  // 1. Fetch Dynamic Dropdown Options via Redux RTK Query (endPoint: "options")
  const { data: headerOptions = [] } = useGetDynamicOptionsQuery({
    entity: "header",
    endPoint: "options",
  });

  const { data: courseOptions = [] } = useGetDynamicOptionsQuery({
    entity: "course",
    endPoint: "options",
  });

  const { data: universityOptions = [] } = useGetDynamicOptionsQuery({
    entity: "partneruniversity",
    endPoint: "options",
  });

  const { data: mediaOptions = [] } = useGetDynamicOptionsQuery({
    entity: "media",
    endPoint: "options",
  });

  const parentHeaders = (Array.isArray(headerOptions) ? headerOptions : []).filter(
    (item) => !item.parentId
  );
  const courses = Array.isArray(courseOptions) ? courseOptions : [];
  const universities = Array.isArray(universityOptions) ? universityOptions : [];
  const mediaList = Array.isArray(mediaOptions) ? mediaOptions : [];

  // Auto-generate slug and link when label changes
  const handleLabelChange = (e) => {
    const val = e.target.value;
    if (!isUpdateForm && val) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      form.setFieldsValue({
        slug: generatedSlug,
        href: form.getFieldValue("href") || `/${generatedSlug}`,
      });
    }
  };

  // Auto-fill details when linking to a Course
  const handleCourseSelect = (courseId) => {
    const found = courses.find((c) => c._id === courseId);
    if (found) {
      const logoUrl = typeof found.logoSrc === "object" ? found.logoSrc?.url : (found.logoSrc || found.image);
      const mediaId = typeof found.logoSrc === "object" ? found.logoSrc?._id : (found.logo || found.image);
      form.setFieldsValue({
        label: form.getFieldValue("label") || found.title || found.name,
        href: `/courses/${found.slug}`,
        slug: found.slug,
        mediaId: mediaId,
        logoSrc: mediaId,
      });
      if (logoUrl) setLogoPreview(logoUrl);
    }
  };

  // Auto-fill details when linking to a University
  const handleUniversitySelect = (uniId) => {
    const found = universities.find((u) => u._id === uniId);
    if (found) {
      const logoUrl = typeof found.logoSrc === "object" ? found.logoSrc?.url : found.logoSrc;
      const mediaId = typeof found.logoSrc === "object" ? found.logoSrc?._id : found.logo;
      form.setFieldsValue({
        label: form.getFieldValue("label") || found.name || found.title,
        href: `/universities/${found.slug}`,
        slug: found.slug,
        mediaId: mediaId,
        logoSrc: mediaId,
      });
      if (logoUrl) setLogoPreview(logoUrl);
    }
  };

  return (
    <div className="space-y-4 font-sans">

      {/* SECTION 1: PARENT / CHILD MENU HIERARCHY */}
      <Card title="1. Navigation Hierarchy & Parent Linkage" size="small" variant="borderless" className="bg-slate-50/50">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="parentId"
              label="Parent Menu"
              getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
              getValueProps={(val) => ({
                value: typeof val === "object" ? val?._id || val : val,
              })}
              tooltip="Select parent item to make this a dropdown child link"
            >
              <Select
                placeholder="None (Root Main Navigation Item)"
                allowClear
                showSearch
                virtual={false}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                options={parentHeaders.map((p) => ({
                  label: `📂 ${p.label || p.name || p.title}`,
                  value: p._id,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="label"
              label="Navigation Label"
              rules={[{ required: true, message: "Please enter navigation label" }]}
            >
              <Input placeholder="e.g. Executive MBA, Universities, Contact" onChange={handleLabelChange} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="href"
              label="Target URL / Link (href)"
              rules={[{ required: true, message: "Please enter target link" }]}
            >
              <Input placeholder="e.g. /courses/online-mba or /universities" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="slug"
              label="URL Slug"
              rules={[{ required: true, message: "Please enter slug" }]}
            >
              <Input placeholder="e.g. online-mba, universities" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* SECTION 2: COURSE / UNIVERSITY BACKEND LINKAGE */}
      <Card title="2. Backend Model Linkage (Course / University)" size="small" variant="borderless" className="bg-slate-50/50">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="relatedCourse"
              label="Link to Database Course"
              getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
              getValueProps={(val) => ({
                value: typeof val === "object" ? val?._id || val : val,
              })}
            >
              <Select
                placeholder="Select Course (Auto-fills Logo & Link)"
                allowClear
                showSearch
                virtual={false}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                onChange={handleCourseSelect}
                options={courses.map((c) => ({
                  label: `🎓 ${c.title || c.name}`,
                  value: c._id,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="relatedUniversity"
              label="Link to Database University"
              getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
              getValueProps={(val) => ({
                value: typeof val === "object" ? val?._id || val : val,
              })}
            >
              <Select
                placeholder="Select University (Auto-fills Logo & Link)"
                allowClear
                showSearch
                virtual={false}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                onChange={handleUniversitySelect}
                options={universities.map((u) => ({
                  label: `🏛️ ${u.name || u.title}`,
                  value: u._id,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* SECTION 3: MEDIA OBJECTID & LOGO CONFIGURATION */}
      <Card title="3. Media Database Asset (ObjectId) & Logo Mode" size="small" variant="borderless" className="bg-slate-50/50">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="mediaId"
              label="Link to Media Asset (ObjectId Ref)"
              getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
              getValueProps={(val) => ({
                value: typeof val === "object" ? val?._id || val : val,
              })}
            >
              <Select
                placeholder="Pick image from Media Collection"
                allowClear
                showSearch
                virtual={false}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                onChange={(mId) => {
                  const found = mediaList.find((m) => m._id === mId);
                  if (found) {
                    form.setFieldsValue({ mediaId: mId, logoSrc: mId });
                    if (found.url) setLogoPreview(found.url);
                  }
                }}
                options={mediaList.map((m) => ({
                  label: `🖼️ ${m.name || m.fileName || m.title || m.url}`,
                  value: m._id,
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="logoSrc"
              label="Logo Asset (ObjectId Ref)"
              getValueFromEvent={(val) => (typeof val === "object" ? val?._id || val : val)}
              getValueProps={(val) => ({
                value: typeof val === "object" ? val?._id || val : val,
              })}
            >
              <Select
                placeholder="Select Media ObjectId for Logo"
                allowClear
                showSearch
                virtual={false}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                onChange={(mId) => {
                  const found = mediaList.find((m) => m._id === mId);
                  if (found) {
                    form.setFieldsValue({ mediaId: mId });
                    if (found.url) setLogoPreview(found.url);
                  }
                }}
                options={mediaList.map((m) => ({
                  label: `🖼️ ${m.name || m.fileName || m.title || m.url}`,
                  value: m._id,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} align="middle">
          <Col span={12}>
            <Form.Item
              name="showLogo"
              label="Show Logo / Icon"
              valuePropName="checked"
              initialValue={true}
              tooltip="Toggle 'With Logo' vs 'Without Logo' in header dropdowns"
            >
              <Switch checkedChildren="With Logo" unCheckedChildren="Without Logo" />
            </Form.Item>
          </Col>

          <Col span={12}>
            {logoPreview && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Preview:</span>
                <div className="w-8 h-8 rounded-lg bg-white p-1 border border-slate-200 shadow-2xs">
                  <img src={logoPreview} alt="Preview" className="w-full h-full object-contain" />
                </div>
              </div>
            )}
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="badge" label="Highlight Badge (Optional)">
              <Input placeholder="e.g. HOT, NEW, POPULAR, 20% OFF" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="badgeColor" label="Badge Color" initialValue="gold">
              <Select
                options={[
                  { label: "Gold / Amber", value: "gold" },
                  { label: "Red / Hot", value: "red" },
                  { label: "Green / Free", value: "green" },
                  { label: "Blue / Info", value: "blue" },
                  { label: "Purple / Premium", value: "purple" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="premium"
              label="Executive / Premium Styling"
              valuePropName="checked"
              initialValue={false}
              tooltip="Golden gradient button styling in top header"
            >
              <Switch checkedChildren="Premium Gold" unCheckedChildren="Standard Link" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* SECTION 4: DISPLAY STATUS & SORT ORDER */}
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item name="order" label="Sort Order" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="enabled"
            label="Active Status"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch checkedChildren="Active" unCheckedChildren="Disabled" />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="showOnDesktop"
            label="Desktop"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch checkedChildren="Show" unCheckedChildren="Hide" />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="showOnMobile"
            label="Mobile"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch checkedChildren="Show" unCheckedChildren="Hide" />
          </Form.Item>
        </Col>
      </Row>

    </div>
  );
}
