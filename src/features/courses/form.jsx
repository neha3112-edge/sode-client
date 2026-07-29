"use client";

import React from "react";
import { Form, Input, Select, Switch, InputNumber, Row, Col, Divider, Button, Card, Collapse } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function CourseForm({ isUpdateForm = false }) {
  // ── Dynamic Options Queries ─────────────────────────────────────────────────
  const { data: categoryData, isLoading: loadingCategories } =
    useGetDynamicOptionsQuery({ entity: "category" });

  const { data: subcourseData, isLoading: loadingSubcourses } =
    useGetDynamicOptionsQuery({ entity: "subcourse" });

  const { data: universityData, isLoading: loadingUniversities } =
    useGetDynamicOptionsQuery({ entity: "university" });

  const { data: durationData, isLoading: loadingDurations } =
    useGetDynamicOptionsQuery({ entity: "duration" });

  const { data: eligibilityData, isLoading: loadingEligibility } =
    useGetDynamicOptionsQuery({ entity: "eligibility" });

  const { data: feeData, isLoading: loadingFee } =
    useGetDynamicOptionsQuery({ entity: "fee" });

  const { data: mediaData, isLoading: loadingMedia } =
    useGetDynamicOptionsQuery({ entity: "media" });

  const { data: workspaceData, isLoading: loadingWorkspaces } =
    useGetDynamicOptionsQuery({ entity: "workspace" });

  // ── Helper to format options arrays ───────────────────────────────────────
  const formatOptions = (data) => {
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.result)
        ? data.result
        : [];
    return list.map((item) => ({
      label: item.title || item.name || item.fileName || item.label || item._id,
      value: String(item._id || item.value || item.id),
    }));
  };

  const categoryOptions = formatOptions(categoryData);
  const subcourseOptions = formatOptions(subcourseData);
  const universityOptions = formatOptions(universityData);
  const durationOptions = formatOptions(durationData);
  const eligibilityOptions = formatOptions(eligibilityData);
  const feeOptions = formatOptions(feeData);
  const mediaOptions = formatOptions(mediaData);
  const workspaceOptions = formatOptions(workspaceData);

  // ── Handlers for ObjectId value props/events ──────────────────────────────
  const singleObjProp = (val) => ({
    value: typeof val === "object" && val !== null ? val._id || val.id || val : val,
  });
  const singleObjEvent = (val) =>
    typeof val === "object" && val !== null ? val._id || val.id || val : val;

  const multiObjProp = (val) => ({
    value: Array.isArray(val)
      ? val.map((v) => (typeof v === "object" && v !== null ? v._id || v.id || v : String(v)))
      : val
        ? [typeof val === "object" ? val._id || val.id || val : String(val)]
        : [],
  });
  const multiObjEvent = (val) =>
    Array.isArray(val)
      ? val.map((v) => (typeof v === "object" && v !== null ? v._id || v.id || v : String(v)))
      : val;

  return (
    <>
      {/* Basic Course Identification */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="title"
            label="Course Title (e.g. DBA, MBA)"
            rules={[{ required: true, message: "Please enter course title" }]}
          >
            <Input placeholder="e.g. Doctor of Business Administration (DBA)" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. dba" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="categories"
            label="Main Program Categories"
            getValueFromEvent={multiObjEvent}
            getValueProps={multiObjProp}
          >
            <Select
              mode="multiple"
              placeholder="Select Categories (e.g. Doctorate, Management)"
              loading={loadingCategories}
              allowClear
              showSearch
              optionFilterProp="label"
              options={categoryOptions}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* 🎓 University-Wise Specific Offerings Section */}
      <Divider titlePlacement="left" plain style={{ fontSize: 14, fontWeight: 700, color: "#1d3557" }}>
        🏫 University-Wise Fees, Duration & Specializations (Multiple Universities Support)
      </Divider>

      <Form.List name="universityOfferings">
        {(fields, { add, remove }) => {
          const offeringItems = fields.map((field) => {
            const { key, ...restField } = field;
            
            // Try to resolve selected university name for the header dynamically
            const label = `🏫 University Offering #${field.name + 1}`;

            return {
              key: String(field.name),
              label: (
                <span className="font-bold text-[#1d3557] text-sm">
                  {label}
                </span>
              ),
              extra: (
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(field.name);
                  }}
                  size="small"
                  className="hover:bg-red-50"
                >
                  Remove Offering
                </Button>
              ),
              children: (
                <div className="space-y-4">
                  <Row gutter={12}>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[field.name, "university"]}
                        label="University"
                        rules={[{ required: true, message: "Select university" }]}
                        getValueFromEvent={singleObjEvent}
                        getValueProps={singleObjProp}
                      >
                        <Select
                          placeholder="Select University (e.g. Edgewood, SSBM, GGU)"
                          loading={loadingUniversities}
                          allowClear
                          showSearch
                          optionFilterProp="label"
                          options={universityOptions}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[field.name, "workspace"]}
                        label="Partner / Provider Workspace (Via Badge)"
                        getValueFromEvent={singleObjEvent}
                        getValueProps={singleObjProp}
                      >
                        <Select
                          placeholder="Select Partner Workspace (e.g. upGrad)"
                          loading={loadingWorkspaces}
                          allowClear
                          showSearch
                          optionFilterProp="label"
                          options={workspaceOptions}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={12}>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[field.name, "fee"]}
                        label="Fee Structure"
                        getValueFromEvent={singleObjEvent}
                        getValueProps={singleObjProp}
                      >
                        <Select
                          placeholder="Select Fee Amount for this University"
                          loading={loadingFee}
                          allowClear
                          showSearch
                          optionFilterProp="label"
                          options={feeOptions}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[field.name, "duration"]}
                        label="Duration"
                        getValueFromEvent={singleObjEvent}
                        getValueProps={singleObjProp}
                      >
                        <Select
                          placeholder="Select Duration (e.g. 24 Months)"
                          loading={loadingDurations}
                          allowClear
                          showSearch
                          optionFilterProp="label"
                          options={durationOptions}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[field.name, "eligibility"]}
                        label="Eligibility Criteria"
                        getValueFromEvent={singleObjEvent}
                        getValueProps={singleObjProp}
                      >
                        <Select
                          placeholder="Select Eligibility"
                          loading={loadingEligibility}
                          allowClear
                          showSearch
                          optionFilterProp="label"
                          options={eligibilityOptions}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* 🎓 Subcourses & Specializations Content under this University */}
                  <Divider titlePlacement="left" plain style={{ fontSize: 13, color: "#0d9488", margin: "18px 0 10px 0", fontWeight: 700 }}>
                    🎓 Specializations / Subcourses under this University Offering
                  </Divider>

                  <Form.List name={[field.name, "subcourses"]}>
                    {(subFields, { add: addSub, remove: removeSub }) => {
                      const subCollapseItems = subFields.map((subField) => {
                        const { key: subKey, ...restSubField } = subField;
                        const subLabel = `💡 Specialization / Subcourse Detail #${subField.name + 1}`;
                        
                        return {
                          key: String(subField.name),
                          label: (
                            <span className="font-semibold text-teal-800 text-xs">
                              {subLabel}
                            </span>
                          ),
                          extra: (
                            <Button
                              type="text"
                              danger
                              icon={<DeleteOutlined />}
                              onClick={(e) => {
                                e.stopPropagation();
                                removeSub(subField.name);
                              }}
                              size="small"
                              className="hover:bg-red-50 text-[11px]"
                            >
                              Remove Specialization
                            </Button>
                          ),
                          children: (
                            <div className="space-y-4 pt-2">
                              <Row gutter={12}>
                                <Col span={12}>
                                  <Form.Item
                                    {...restSubField}
                                    name={[subField.name, "subcourse"]}
                                    label="Subcourse Reference"
                                    getValueFromEvent={singleObjEvent}
                                    getValueProps={singleObjProp}
                                  >
                                    <Select
                                      placeholder="Select Subcourse (e.g. Finance)"
                                      loading={loadingSubcourses}
                                      allowClear
                                      showSearch
                                      optionFilterProp="label"
                                      options={subcourseOptions}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    {...restSubField}
                                    name={[subField.name, "title"]}
                                    label="Display Title"
                                  >
                                    <Input placeholder="e.g. Finance & Valuation" />
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Row gutter={12}>
                                <Col span={12}>
                                  <Form.Item
                                    {...restSubField}
                                    name={[subField.name, "fee"]}
                                    label="Subcourse Fee"
                                    getValueFromEvent={singleObjEvent}
                                    getValueProps={singleObjProp}
                                  >
                                    <Select
                                      placeholder="Select Fee"
                                      loading={loadingFee}
                                      allowClear
                                      showSearch
                                      optionFilterProp="label"
                                      options={feeOptions}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    {...restSubField}
                                    name={[subField.name, "duration"]}
                                    label="Subcourse Duration"
                                    getValueFromEvent={singleObjEvent}
                                    getValueProps={singleObjProp}
                                  >
                                    <Select
                                      placeholder="Select Duration"
                                      loading={loadingDurations}
                                      allowClear
                                      showSearch
                                      optionFilterProp="label"
                                      options={durationOptions}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Row gutter={12}>
                                <Col span={12}>
                                  <Form.Item
                                    {...restSubField}
                                    name={[subField.name, "category"]}
                                    label="Topic/Subcategory (e.g. Finance, AI Courses)"
                                    getValueFromEvent={singleObjEvent}
                                    getValueProps={singleObjProp}
                                  >
                                    <Select
                                      placeholder="Select Topic Category"
                                      loading={loadingCategories}
                                      allowClear
                                      showSearch
                                      optionFilterProp="label"
                                      options={categoryOptions}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    {...restSubField}
                                    name={[subField.name, "shortDescription"]}
                                    label="Short Tagline"
                                  >
                                    <Input placeholder="Short summary of this subcourse..." />
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Form.Item
                                {...restSubField}
                                name={[subField.name, "content"]}
                                label="Subcourse Content Paragraph"
                              >
                                <Input.TextArea rows={2} placeholder="Detailed content paragraph for this subcourse..." />
                              </Form.Item>

                              {/* Key Highlights Array */}
                              <Divider titlePlacement="left" plain style={{ fontSize: 11, color: "#666", margin: "10px 0 6px 0" }}>
                                🌟 Key Highlights Points
                              </Divider>
                              <Form.List name={[subField.name, "keyHighlights"]}>
                                {(hlFields, { add: addHl, remove: removeHl }) => (
                                  <div className="mb-3">
                                    <Row gutter={[12, 8]}>
                                      {hlFields.map((hField, hIdx) => {
                                        const { key: hKey, ...hRest } = hField;
                                        return (
                                          <Col key={hKey} span={12}>
                                            <div className="flex items-center gap-1">
                                              <Form.Item {...hRest} noStyle>
                                                <Input placeholder={`Highlight Point #${hIdx + 1}`} className="flex-1" />
                                              </Form.Item>
                                              <Button
                                                type="text"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => removeHl(hField.name)}
                                                size="small"
                                              />
                                            </div>
                                          </Col>
                                        );
                                      })}
                                    </Row>
                                    <Button
                                      type="dashed"
                                      onClick={() => addHl()}
                                      block
                                      icon={<PlusOutlined />}
                                      size="small"
                                      className="text-xs mt-2"
                                    >
                                      + Add Highlight Point
                                    </Button>
                                  </div>
                                )}
                              </Form.List>

                              {/* Who Can Apply Array */}
                              <Divider titlePlacement="left" plain style={{ fontSize: 11, color: "#666", margin: "10px 0 6px 0" }}>
                                👥 Who Can Apply?
                              </Divider>
                              <Form.List name={[subField.name, "whoCanApply"]}>
                                {(wcaFields, { add: addWca, remove: removeWca }) => (
                                  <div className="mb-3">
                                    <Row gutter={[12, 8]}>
                                      {wcaFields.map((wField, wIdx) => {
                                        const { key: wKey, ...wRest } = wField;
                                        return (
                                          <Col key={wKey} span={12}>
                                            <div className="flex items-center gap-1">
                                              <Form.Item {...wRest} noStyle>
                                                <Input placeholder={`Eligibility Requirement #${wIdx + 1}`} className="flex-1" />
                                              </Form.Item>
                                              <Button
                                                type="text"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => removeWca(wField.name)}
                                                size="small"
                                              />
                                            </div>
                                          </Col>
                                        );
                                      })}
                                    </Row>
                                    <Button
                                      type="dashed"
                                      onClick={() => addWca()}
                                      block
                                      icon={<PlusOutlined />}
                                      size="small"
                                      className="text-xs mt-2"
                                    >
                                      + Add Eligibility Rule
                                    </Button>
                                  </div>
                                )}
                              </Form.List>

                              {/* Admission Process Steps Array */}
                              <Divider titlePlacement="left" plain style={{ fontSize: 11, color: "#666", margin: "10px 0 6px 0" }}>
                                📝 Admission Process Steps
                              </Divider>
                              <Form.List name={[subField.name, "admissionProcess"]}>
                                {(admFields, { add: addAdm, remove: removeAdm }) => (
                                  <div className="mb-3">
                                    <Row gutter={[12, 8]}>
                                      {admFields.map((aField, aIdx) => {
                                        const { key: aKey, ...aRest } = aField;
                                        return (
                                          <Col key={aKey} span={12}>
                                            <div className="flex items-center gap-1">
                                              <Form.Item {...aRest} noStyle>
                                                <Input placeholder={`Step #${aIdx + 1}`} className="flex-1" />
                                              </Form.Item>
                                              <Button
                                                type="text"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => removeAdm(aField.name)}
                                                size="small"
                                              />
                                            </div>
                                          </Col>
                                        );
                                      })}
                                    </Row>
                                    <Button
                                      type="dashed"
                                      onClick={() => addAdm()}
                                      block
                                      icon={<PlusOutlined />}
                                      size="small"
                                      className="text-xs mt-2"
                                    >
                                      + Add Admission Step
                                    </Button>
                                  </div>
                                )}
                              </Form.List>
                            </div>
                          )
                        };
                      });

                      return (
                        <div className="space-y-3 mb-2">
                          {subFields.length > 0 ? (
                            <Collapse
                              defaultActiveKey={['0']}
                              bordered={true}
                              className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden"
                              items={subCollapseItems}
                            />
                          ) : (
                            <div className="text-center py-4 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-xs text-slate-400 font-semibold mb-2">
                              No specializations added. Click button below to add.
                            </div>
                          )}
                          <Button
                            type="dashed"
                            onClick={() => addSub()}
                            block
                            icon={<PlusOutlined />}
                            size="small"
                            className="font-semibold text-xs py-1"
                          >
                            + Add Specialization / Subcourse under this University
                          </Button>
                        </div>
                      );
                    }}
                  </Form.List>
                </div>
              )
            };
          });

          return (
            <div className="space-y-4 mb-6">
              {fields.length > 0 ? (
                <Collapse
                  defaultActiveKey={['0']}
                  bordered={true}
                  className="bg-slate-50/60 border border-slate-200 rounded-xl shadow-xs overflow-hidden"
                  items={offeringItems}
                />
              ) : (
                <div className="text-center py-8 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl text-sm text-slate-400 font-semibold">
                  No university offerings added yet. Click button below to add your first offering.
                </div>
              )}
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                className="py-2 font-bold text-[#1d3557] hover:border-[#457b9d] hover:text-[#457b9d]"
              >
                + Add University Offering (Fee, Duration & Specialization)
              </Button>
            </div>
          );
        }}
      </Form.List>

      <Divider titlePlacement="left" plain style={{ fontSize: 13, color: "#888" }}>
        Media & Assets
      </Divider>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="logo"
            label="Logo Asset"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select Logo"
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
            name="image"
            label="Banner / Image Asset"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select Banner Image"
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
            label="Brochure Asset"
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

      <Divider titlePlacement="left" plain style={{ fontSize: 13, color: "#888" }}>
        Course Details
      </Divider>

      <Form.Item name="description" label="Course Overview / Description">
        <Input.TextArea rows={3} placeholder="Detailed description of the course..." />
      </Form.Item>

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
            label="Featured Program"
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
