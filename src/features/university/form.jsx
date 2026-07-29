"use client";

import React from "react";
import {
  Form,
  Input,
  Select,
  Switch,
  InputNumber,
  Row,
  Col,
  Divider,
} from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function UniversityForm({ isUpdateForm = false }) {
  // ── Dynamic Options Queries for Model References (ObjectIds) ───────────────
  const { data: workspacesData, isLoading: loadingWorkspaces } =
    useGetDynamicOptionsQuery({ entity: "workspace" });

  const { data: categoriesData, isLoading: loadingCategories } =
    useGetDynamicOptionsQuery({ entity: "category" });

  const { data: mediaData, isLoading: loadingMedia } =
    useGetDynamicOptionsQuery({ entity: "media" });

  const { data: locationData, isLoading: loadingLocations } =
    useGetDynamicOptionsQuery({ entity: "location" });

  const { data: cityData, isLoading: loadingCities } =
    useGetDynamicOptionsQuery({ entity: "city" });

  const { data: stateData, isLoading: loadingStates } =
    useGetDynamicOptionsQuery({ entity: "state" });

  const { data: countryData, isLoading: loadingCountries } =
    useGetDynamicOptionsQuery({ entity: "country" });

  const { data: approvalsData, isLoading: loadingApprovals } =
    useGetDynamicOptionsQuery({ entity: "approval" });

  const { data: naacData, isLoading: loadingNaac } =
    useGetDynamicOptionsQuery({ entity: "naacrating" });

  const { data: nirfData, isLoading: loadingNirf } =
    useGetDynamicOptionsQuery({ entity: "nirfrank" });

  const { data: examModeData, isLoading: loadingExamMode } =
    useGetDynamicOptionsQuery({ entity: "exammode" });

  const { data: learningModeData, isLoading: loadingLearningMode } =
    useGetDynamicOptionsQuery({ entity: "learningmode" });

  const { data: establishedYearData, isLoading: loadingEstablishedYear } =
    useGetDynamicOptionsQuery({ entity: "establishedyear" });

  const { data: feeData, isLoading: loadingFee } =
    useGetDynamicOptionsQuery({ entity: "fee" });

  const { data: ratingData, isLoading: loadingRating } =
    useGetDynamicOptionsQuery({ entity: "rating" });

  const { data: contentData, isLoading: loadingContent } =
    useGetDynamicOptionsQuery({ entity: "content" });

  // ── Helper to format options arrays ───────────────────────────────────────
  const formatOptions = (data) => {
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.result)
      ? data.result
      : [];
    return list.map((item) => ({
      label:
        item.title ||
        (item.rating ? `${item.rating} Stars` : null) ||
        item.year ||
        item.name ||
        item.grade ||
        item.fileName ||
        item.label ||
        item._id,
      value: String(item._id || item.value || item.id),
    }));
  };

  const workspaceOptions = formatOptions(workspacesData);
  const categoryOptions = formatOptions(categoriesData);
  const mediaOptions = formatOptions(mediaData);
  const locationOptions = formatOptions(locationData);
  const cityOptions = formatOptions(cityData);
  const stateOptions = formatOptions(stateData);
  const countryOptions = formatOptions(countryData);
  const approvalOptions = formatOptions(approvalsData);
  const naacOptions = formatOptions(naacData);
  const nirfOptions = formatOptions(nirfData);
  const examModeOptions = formatOptions(examModeData);
  const learningModeOptions = formatOptions(learningModeData);
  const establishedYearOptions = formatOptions(establishedYearData);
  const feeOptions = formatOptions(feeData);
  const ratingOptions = formatOptions(ratingData);
  const contentOptions = formatOptions(contentData);

  // ── Handlers for ObjectId value props/events ──────────────────────────────
  const singleObjProp = (val) => ({
    value: typeof val === "object" && val !== null ? val._id || val.id || val : val,
  });
  const singleObjEvent = (val) =>
    typeof val === "object" && val !== null ? val._id || val.id || val : val;

  const multiObjProp = (val) => ({
    value: Array.isArray(val)
      ? val.map((v) => (typeof v === "object" && v !== null ? v._id || v.id || v : String(v)))
      : val || [],
  });
  const multiObjEvent = (val) =>
    Array.isArray(val)
      ? val.map((v) => (typeof v === "object" && v !== null ? v._id || v.id || v : String(v)))
      : val;

  return (
    <>
      {/* Basic Identification */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="University Name"
            rules={[{ required: true, message: "Please enter university name" }]}
          >
            <Input placeholder="e.g. Jain University Online" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="shortName" label="Short Name / Code">
            <Input placeholder="e.g. JU / LPU / AMU" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. jain-university-online" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="tagline" label="Tagline / Badge">
            <Input placeholder="e.g. Deemed-to-be University" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="workspaceId"
            label="Assigned Workspace"
            getValueFromEvent={multiObjEvent}
            getValueProps={multiObjProp}
          >
            <Select
              mode="multiple"
              placeholder="Select Workspace(s)"
              loading={loadingWorkspaces}
              allowClear
              showSearch
              optionFilterProp="label"
              options={workspaceOptions}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="categories"
            label="Categories"
            getValueFromEvent={multiObjEvent}
            getValueProps={multiObjProp}
          >
            <Select
              mode="multiple"
              placeholder="Select Categories"
              loading={loadingCategories}
              allowClear
              showSearch
              optionFilterProp="label"
              options={categoryOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider titlePlacement="left" plain style={{ fontSize: 13, color: "#888" }}>
        Media & Assets
      </Divider>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="logoSrc"
            label="Logo Asset"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select Logo Media"
              loading={loadingMedia}
              allowClear
              showSearch
              optionFilterProp="label"
              options={mediaOptions}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="imageSrc"
            label="Campus Image Asset"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select Campus Media"
              loading={loadingMedia}
              allowClear
              showSearch
              optionFilterProp="label"
              options={mediaOptions}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="brochureUrl"
            label="Brochure PDF Asset"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select Brochure Media"
              loading={loadingMedia}
              allowClear
              showSearch
              optionFilterProp="label"
              options={mediaOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="websiteUrl" label="Official Website URL">
            <Input placeholder="e.g. https://onlinejain.com" />
          </Form.Item>
        </Col>
      </Row>

      <Divider titlePlacement="left" plain style={{ fontSize: 13, color: "#888" }}>
        Location & Geography
      </Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="location"
            label="Location"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select Location"
              loading={loadingLocations}
              allowClear
              showSearch
              optionFilterProp="label"
              options={locationOptions}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="city"
            label="City"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select City"
              loading={loadingCities}
              allowClear
              showSearch
              optionFilterProp="label"
              options={cityOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="state"
            label="State"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select State"
              loading={loadingStates}
              allowClear
              showSearch
              optionFilterProp="label"
              options={stateOptions}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="country"
            label="Country"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select Country"
              loading={loadingCountries}
              allowClear
              showSearch
              optionFilterProp="label"
              options={countryOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider titlePlacement="left" plain style={{ fontSize: 13, color: "#888" }}>
        Academic & Accreditations
      </Divider>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="approvals"
            label="Approvals & Accreditations"
            getValueFromEvent={multiObjEvent}
            getValueProps={multiObjProp}
          >
            <Select
              mode="multiple"
              placeholder="Select Approvals"
              loading={loadingApprovals}
              allowClear
              showSearch
              optionFilterProp="label"
              options={approvalOptions}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="naacRating"
            label="NAAC Grade"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select NAAC Grade"
              loading={loadingNaac}
              allowClear
              showSearch
              optionFilterProp="label"
              options={naacOptions}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="nirfRank"
            label="NIRF Ranking"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select NIRF Rank"
              loading={loadingNirf}
              allowClear
              showSearch
              optionFilterProp="label"
              options={nirfOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="established"
            label="Established Year"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select Established Year"
              loading={loadingEstablishedYear}
              allowClear
              showSearch
              optionFilterProp="label"
              options={establishedYearOptions}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="examMode"
            label="Exam Mode"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select Exam Mode"
              loading={loadingExamMode}
              allowClear
              showSearch
              optionFilterProp="label"
              options={examModeOptions}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="learningMode"
            label="Learning Mode"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select Learning Mode"
              loading={loadingLearningMode}
              allowClear
              showSearch
              optionFilterProp="label"
              options={learningModeOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="lmsAccess" label="LMS Portal Access">
            <Input placeholder="e.g. 24/7 Digital Library" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="emiStarts" label="EMI Starts From">
            <Input placeholder="e.g. ₹4,999/month" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="feeRange"
            label="Semester Fee Range"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select Fee Range"
              loading={loadingFee}
              allowClear
              showSearch
              optionFilterProp="label"
              options={feeOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="ratingRef"
            label="Rating & Review Reference"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select Rating / Review Record"
              loading={loadingRating}
              allowClear
              showSearch
              optionFilterProp="label"
              options={ratingOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider titlePlacement="left" plain style={{ fontSize: 13, color: "#888" }}>
        Content References
      </Divider>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="contentRef"
            label="Associated Content Records"
            getValueFromEvent={multiObjEvent}
            getValueProps={multiObjProp}
          >
            <Select
              mode="multiple"
              placeholder="Select Content Record(s)"
              loading={loadingContent}
              allowClear
              showSearch
              optionFilterProp="label"
              options={contentOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider titlePlacement="left" plain style={{ fontSize: 13, color: "#888" }}>
        Settings & Controls
      </Divider>

      <Row gutter={16} align="middle">
        <Col span={8}>
          <Form.Item name="order" label="Sort Order" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="featured"
            label="Featured University"
            valuePropName="checked"
            initialValue={false}
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
