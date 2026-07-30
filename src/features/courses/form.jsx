"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Switch,
  InputNumber,
  Row,
  Col,
  Divider,
  Button,
  Collapse,
  Card,
  Tag,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  BookOutlined,
  BankOutlined,
  SolutionOutlined,
  FileImageOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
  StarFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

/**
 * Live University Offering Accordion Header with Dynamic Title & Badge Summary
 */
function OfferingHeader({ fieldName, universityOptions, onRemove }) {
  const offeringVal = Form.useWatch(["universityOfferings", fieldName]);

  const uId =
    typeof offeringVal?.university === "object"
      ? offeringVal?.university?._id || offeringVal?.university?.id
      : offeringVal?.university;

  const uObj = universityOptions.find((opt) => opt.value === String(uId));
  const uName = uObj?.label || `University Offering #${fieldName + 1}`;

  const subCount = Array.isArray(offeringVal?.subcourses)
    ? offeringVal.subcourses.length
    : 0;

  return (
    <div className="flex items-center justify-between w-full select-none pr-2">
      <div className="flex items-center gap-2">
        <span className="font-bold text-slate-800 text-sm">
          🏫 {uName}
        </span>
        {subCount > 0 && (
          <Tag color="cyan" className="font-semibold text-[10px] rounded-full border-none px-2 py-0.5">
            {subCount} Specialization{subCount > 1 ? "s" : ""}
          </Tag>
        )}
      </div>
      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(fieldName);
        }}
        size="small"
        className="hover:bg-red-50 text-xs"
      >
        Remove Offering
      </Button>
    </div>
  );
}

/**
 * Advanced Sections for Subcourse
 */
function AdvancedSubcourseSections({ uniFieldIndex, namePrefix, restField, mediaOptions, loadingMedia, singleObjEvent, singleObjProp }) {
  const getPath = (field) => [namePrefix, ...field];
  const { TextArea } = Input;

  const advancedItems = [
    {
      key: "overview",
      label: "1. Overview & Why Choose",
      children: (
        <div className="space-y-4">
          <Form.Item {...restField} name={getPath(["overviewTitle"])} label="Overview Title">
            <Input placeholder="e.g. Build Future-Ready HR Skills" />
          </Form.Item>
          <Form.Item {...restField} name={getPath(["overviewDescription"])} label="Overview Description">
            <TextArea rows={3} placeholder="Course overview text..." />
          </Form.Item>
          <Form.Item {...restField} name={getPath(["whyChooseTitle"])} label="Why Choose Title">
            <Input placeholder="e.g. Why Choose IIM Kozhikode?" />
          </Form.Item>
          <Form.Item {...restField} name={getPath(["whyChooseDescription"])} label="Why Choose Description">
            <TextArea rows={3} placeholder="Why choose description..." />
          </Form.Item>

          <Divider plain className="my-2">Course Snapshot</Divider>
          <Form.List name={getPath(["courseSnapshotBottom"])}>
            {(fields, { add, remove }) => (
              <div className="space-y-2">
                {fields.map((field) => (
                  <div key={field.key} className="flex gap-2">
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} name={[field.name, "iconType"]} initialValue="lucide" noStyle>
                      <Select placeholder="Type" className="w-[15%]" options={[{label:"Lucide",value:"lucide"},{label:"Media",value:"media"}]} />
                    </Form.Item>
                    
                    <Form.Item noStyle shouldUpdate>
                      {({ getFieldValue }) => {
                        const path = ["universityOfferings", uniFieldIndex, "subcourses", namePrefix, "courseSnapshotBottom", field.name, "iconType"];
                        const iconType = getFieldValue(path) || "lucide";
                        
                        if (iconType === "media") {
                          return (
                            <Form.Item
                              {...(({ key, ...rest }) => rest)(field)}
                              name={[field.name, "iconMedia"]}
                              noStyle
                              getValueFromEvent={singleObjEvent}
                              getValueProps={singleObjProp}
                            >
                              <Select
                                placeholder="Media SVG..."
                                loading={loadingMedia}
                                allowClear
                                showSearch
                                optionFilterProp="label"
                                options={mediaOptions}
                                className="w-[15%]"
                              />
                            </Form.Item>
                          );
                        }
                        
                        return (
                          <Form.Item {...(({ key, ...rest }) => rest)(field)} name={[field.name, "iconLucide"]} noStyle>
                            <Input placeholder="Lucide (e.g. Clock)" className="w-[15%]" />
                          </Form.Item>
                        );
                      }}
                    </Form.Item>
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} name={[field.name, "label"]} noStyle>
                      <Input placeholder="Label (e.g. Duration)" className="w-[30%]" />
                    </Form.Item>
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} name={[field.name, "value"]} noStyle>
                      <Input placeholder="Value (e.g. 6 Months)" className="w-[30%]" />
                    </Form.Item>
                    <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block size="small">+ Add Snapshot Item</Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      key: "skills",
      label: "2. Skills & Curriculum",
      children: (
        <div className="space-y-4">
          <Form.Item {...restField} name={getPath(["skillsSection", "title"])} label="Section Title">
            <Input placeholder="e.g. Skills You'll Learn & Curriculum" />
          </Form.Item>
          <Form.Item {...restField} name={getPath(["skillsSection", "description"])} label="Section Description">
            <TextArea rows={2} placeholder="Description for skills section..." />
          </Form.Item>
          
          <Divider plain className="my-2">Skills You'll Gain</Divider>
          <Form.List name={getPath(["skillsSection", "skillsGain"])}>
            {(fields, { add, remove }) => (
              <div className="space-y-2">
                {fields.map((field) => (
                  <div key={field.key} className="flex gap-2">
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} noStyle>
                      <Input placeholder="e.g. HR Analytics" />
                    </Form.Item>
                    <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block size="small">+ Add Skill</Button>
              </div>
            )}
          </Form.List>

          <Divider plain className="my-2">Curriculum Overview</Divider>
          <Form.List name={getPath(["skillsSection", "curriculumOverview"])}>
            {(fields, { add, remove }) => (
              <div className="space-y-2">
                {fields.map((field) => (
                  <div key={field.key} className="flex gap-2">
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} noStyle>
                      <Input placeholder="e.g. Module 1: Introduction" />
                    </Form.Item>
                    <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block size="small">+ Add Module</Button>
              </div>
            )}
          </Form.List>

          <Divider plain className="my-2">Detailed Modules</Divider>
          <Form.List name={getPath(["modules"])}>
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map((field) => (
                  <div key={field.key} className="border border-slate-200 p-3 rounded-md space-y-2 relative bg-slate-50">
                    <Button danger icon={<DeleteOutlined />} size="small" className="absolute top-2 right-2" onClick={() => remove(field.name)} />
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} name={[field.name, "title"]} label="Module Title" className="mb-0 pr-8">
                      <Input placeholder="e.g. Module 1: Introduction" />
                    </Form.Item>
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} name={[field.name, "description"]} label="Description" className="mb-0">
                      <TextArea rows={2} placeholder="Module content..." />
                    </Form.Item>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block size="small">+ Add Detailed Module</Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      key: "learning",
      label: "3. Learning Experience",
      children: (
        <div className="space-y-4">
          <Form.Item {...restField} name={getPath(["learningExperience", "title"])} label="Section Title">
            <Input placeholder="e.g. Interactive & Flexible Learning" />
          </Form.Item>
          <Form.Item {...restField} name={getPath(["learningExperience", "description"])} label="Section Description">
            <TextArea rows={2} placeholder="Description..." />
          </Form.Item>
          
          <Divider plain className="my-2">Learning Features</Divider>
          <Form.List name={getPath(["learningExperience", "learningFeatures"])}>
            {(fields, { add, remove }) => (
              <div className="space-y-2">
                {fields.map((field) => (
                  <div key={field.key} className="flex gap-2">
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} noStyle>
                      <Input placeholder="e.g. Live Online Interactive Classes" />
                    </Form.Item>
                    <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block size="small">+ Add Feature</Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      key: "institute",
      label: "4. Institute & Certificate",
      children: (
        <div className="space-y-4">
          <Form.Item {...restField} name={getPath(["instituteSection", "title"])} label="Section Title">
            <Input placeholder="e.g. Learn from Premier Institute" />
          </Form.Item>
          <Form.Item {...restField} name={getPath(["instituteSection", "description"])} label="Section Description">
            <TextArea rows={2} placeholder="Description..." />
          </Form.Item>
          <Form.Item {...restField} name={getPath(["instituteSection", "certificateTitle"])} label="Certificate Title">
            <Input placeholder="e.g. Earn a Prestigious Certificate" />
          </Form.Item>
          <Form.Item {...restField} name={getPath(["instituteSection", "certificateDescription"])} label="Certificate Description">
            <TextArea rows={2} placeholder="Description..." />
          </Form.Item>
          <Form.Item
            {...restField}
            name={getPath(["instituteSection", "certificateImage"])}
            label="Certificate Image"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select Certificate Image..."
              loading={loadingMedia}
              allowClear
              showSearch
              optionFilterProp="label"
              options={mediaOptions}
            />
          </Form.Item>
          
          <Divider plain className="my-2">Why It Matters</Divider>
          <Form.List name={getPath(["instituteSection", "whyItMatters"])}>
            {(fields, { add, remove }) => (
              <div className="space-y-2">
                {fields.map((field) => (
                  <div key={field.key} className="flex gap-2">
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} noStyle>
                      <Input placeholder="e.g. Recognized by Employers" />
                    </Form.Item>
                    <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block size="small">+ Add Reason</Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      key: "career",
      label: "5. Career Opportunities",
      children: (
        <div className="space-y-4">
          <Form.Item {...restField} name={getPath(["careerSection", "title"])} label="Section Title">
            <Input placeholder="e.g. Advance Your Career" />
          </Form.Item>
          <Form.Item {...restField} name={getPath(["careerSection", "description"])} label="Section Description">
            <TextArea rows={2} placeholder="Description..." />
          </Form.Item>
          
          <Divider plain className="my-2">Job Roles</Divider>
          <Form.List name={getPath(["careerSection", "careerOpportunities"])}>
            {(fields, { add, remove }) => (
              <div className="space-y-2">
                {fields.map((field) => (
                  <div key={field.key} className="flex gap-2">
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} noStyle>
                      <Input placeholder="e.g. HR Analyst" />
                    </Form.Item>
                    <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block size="small">+ Add Role</Button>
              </div>
            )}
          </Form.List>
          
          <Divider plain className="my-2">Industries Hiring</Divider>
          <Form.List name={getPath(["careerSection", "industriesHiring"])}>
            {(fields, { add, remove }) => (
              <div className="space-y-2">
                {fields.map((field) => (
                  <div key={field.key} className="flex gap-2">
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} noStyle>
                      <Input placeholder="e.g. Information Technology" />
                    </Form.Item>
                    <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block size="small">+ Add Industry</Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      key: "fee",
      label: "6. Fee & Finance Options",
      children: (
        <div className="space-y-4">
          <Form.Item {...restField} name={getPath(["feeSection", "title"])} label="Section Title">
            <Input placeholder="e.g. Flexible Fee Options" />
          </Form.Item>
          <Form.Item {...restField} name={getPath(["feeSection", "description"])} label="Section Description">
            <TextArea rows={2} placeholder="Description..." />
          </Form.Item>
          <Form.Item {...restField} name={getPath(["feeSection", "footerNote"])} label="Footer Note">
            <Input placeholder="e.g. Need help with fees? Speak with counsellors..." />
          </Form.Item>
          
          <Divider plain className="my-2">Financial Support Options</Divider>
          <Form.List name={getPath(["feeSection", "financialSupport"])}>
            {(fields, { add, remove }) => (
              <div className="space-y-2">
                {fields.map((field) => (
                  <div key={field.key} className="flex gap-2">
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} noStyle>
                      <Input placeholder="e.g. Affordable EMI Options" />
                    </Form.Item>
                    <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block size="small">+ Add Option</Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      key: "faq",
      label: "7. FAQs",
      children: (
        <div className="space-y-4">
          <Form.Item {...restField} name={getPath(["faqSection", "title"])} label="Section Title">
            <Input placeholder="e.g. Frequently Asked Questions" />
          </Form.Item>
          <Form.List name={getPath(["faqSection", "faqs"])}>
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map((field) => (
                  <div key={field.key} className="border border-slate-200 p-3 rounded-md space-y-2 relative">
                    <Button danger icon={<DeleteOutlined />} size="small" className="absolute top-2 right-2" onClick={() => remove(field.name)} />
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} name={[field.name, "question"]} label="Question" className="mb-0 pr-8">
                      <Input placeholder="e.g. Who is eligible?" />
                    </Form.Item>
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} name={[field.name, "answer"]} label="Answer" className="mb-0">
                      <TextArea rows={2} placeholder="Answer text..." />
                    </Form.Item>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block size="small">+ Add FAQ</Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
    {
      key: "admission",
      label: "8. Target Audience & Admission",
      children: (
        <div className="space-y-4">
          <Divider plain className="my-2">Who Can Apply?</Divider>
          <Form.List name={getPath(["whoCanApply"])}>
            {(fields, { add, remove }) => (
              <div className="space-y-2">
                {fields.map((field) => (
                  <div key={field.key} className="flex gap-2">
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} noStyle>
                      <Input placeholder="e.g. Working Professionals with 2+ years of experience" />
                    </Form.Item>
                    <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block size="small">+ Add Criteria</Button>
              </div>
            )}
          </Form.List>

          <Divider plain className="my-2">Admission Process</Divider>
          <Form.List name={getPath(["admissionProcess"])}>
            {(fields, { add, remove }) => (
              <div className="space-y-2">
                {fields.map((field) => (
                  <div key={field.key} className="flex gap-2">
                    <Form.Item {...(({ key, ...rest }) => rest)(field)} noStyle>
                      <Input placeholder="e.g. Step 1: Submit Application Form" />
                    </Form.Item>
                    <Button danger icon={<DeleteOutlined />} onClick={() => remove(field.name)} />
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block size="small">+ Add Step</Button>
              </div>
            )}
          </Form.List>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4 border-t border-slate-100 pt-3">
      <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Dynamic Page Sections</h4>
      <Collapse
        accordion
        items={advancedItems}
        size="small"
        className="bg-white"
      />
    </div>
  );
}

/**
 * Live Specialization Accordion Header
 */
function SpecializationHeader({ fieldName, subcourseOptions, parentFieldName, onRemove }) {
  const subVal = Form.useWatch([
    "universityOfferings",
    parentFieldName,
    "subcourses",
    fieldName,
  ]);

  const customTitle = subVal?.title;
  const subId =
    typeof subVal?.subcourse === "object"
      ? subVal?.subcourse?._id || subVal?.subcourse?.id
      : subVal?.subcourse;

  const subObj = subcourseOptions.find((opt) => opt.value === String(subId));
  const titleText = customTitle || subObj?.label || `Specialization #${fieldName + 1}`;

  return (
    <div className="flex items-center justify-between w-full select-none pr-2">
      <span className="font-semibold text-teal-800 text-xs truncate max-w-md">
        💡 {titleText}
      </span>
      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(fieldName);
        }}
        size="small"
        className="hover:bg-red-50 text-[11px]"
      >
        Remove
      </Button>
    </div>
  );
}

/**
 * CourseForm — WordPress / Strapi Style 2-Column Content Manager Form
 */
export default function CourseForm({ isUpdateForm = false, form: propForm }) {
  const [filterQuery, setFilterQuery] = useState("");

  let contextForm = null;
  try {
    contextForm = Form.useFormInstance();
  } catch (e) {}
  const form = propForm || contextForm;

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
  const singleObjProp = (val) => {
    if (val === undefined || val === null || val === "") return { value: undefined };
    if (typeof val === "object" && val !== null) {
      const resolved = val._id || val.id || val.value || val;
      return { value: resolved ? String(resolved) : undefined };
    }
    return { value: String(val) };
  };

  const singleObjEvent = (val) => {
    if (val === undefined || val === null || val === "") return undefined;
    if (typeof val === "object" && val !== null) {
      const resolved = val._id || val.id || val.value || val;
      return resolved ? String(resolved) : undefined;
    }
    return String(val);
  };

  const multiObjProp = (val) => ({
    value: Array.isArray(val)
      ? val.map((v) =>
          typeof v === "object" && v !== null
            ? String(v._id || v.id || v.value || v)
            : String(v)
        )
      : val
        ? [typeof val === "object" ? String(val._id || val.id || val) : String(val)]
        : [],
  });

  const multiObjEvent = (val) =>
    Array.isArray(val)
      ? val.map((v) =>
          typeof v === "object" && v !== null
            ? String(v._id || v.id || v.value || v)
            : String(v)
        )
      : val;

  return (
    <div className="space-y-6 pt-1">
      {/* ── WordPress / Strapi Style 2-Column Grid Layout ─────────────────── */}
      <Row gutter={[20, 20]}>
        {/* 👈 LEFT MAIN CONTENT COLUMN (70% Width) */}
        <Col xs={24} lg={16} xl={17} className="space-y-5">
          {/* Card 1: Title & Slug */}
          <Card
            title={
              <span className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <BookOutlined className="text-indigo-600" /> Course Identification
              </span>
            }
            className="rounded-2xl border border-slate-200/90 shadow-2xs"
          >
            <Row gutter={16}>
              <Col span={14}>
                <Form.Item
                  name="title"
                  label="Course Title"
                  rules={[{ required: true, message: "Please enter course title" }]}
                >
                  <Input placeholder="e.g. Master of Science in Data Science" size="large" className="rounded-xl font-semibold" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="slug"
                  label="URL Slug"
                  rules={[{ required: true, message: "Please enter URL slug" }]}
                >
                  <Input prefix={<span className="text-slate-400 font-mono text-xs">/</span>} placeholder="master-of-science-in-data-science" size="large" className="rounded-xl font-mono text-xs" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="description" label="Course Overview & Description" className="mb-0">
              <Input.TextArea rows={3} placeholder="Write a comprehensive overview of this academic course program..." className="rounded-xl" />
            </Form.Item>
          </Card>

          {/* Card 2: University Offerings & Specializations (Accordion Mode) */}
          <Card
            title={
              <div className="flex items-center justify-between w-full flex-wrap gap-2">
                <span className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                  <BankOutlined className="text-blue-600" /> University Offerings & Fees
                </span>
                <span className="text-xs text-slate-400 font-medium">Accordion Mode (1 University expanded at a time)</span>
              </div>
            }
            className="rounded-2xl border border-slate-200/90 shadow-2xs"
          >
            <Form.List name="universityOfferings">
              {(fields, { add, remove }) => {
                const offeringItems = fields.map((field) => {
                  const { key, ...restField } = field;

                  return {
                    key: String(field.name),
                    label: (
                      <OfferingHeader
                        fieldName={field.name}
                        universityOptions={universityOptions}
                        onRemove={remove}
                      />
                    ),
                    children: (
                      <div className="space-y-4 p-1">
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
                                placeholder="Select University (e.g. IIIT Bangalore)"
                                loading={loadingUniversities}
                                allowClear
                                showSearch
                                optionFilterProp="label"
                                options={universityOptions}
                                className="rounded-xl"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[field.name, "workspace"]}
                              label="Partner / Provider Workspace"
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
                                className="rounded-xl"
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
                                placeholder="Select Fee"
                                loading={loadingFee}
                                allowClear
                                showSearch
                                optionFilterProp="label"
                                options={feeOptions}
                                className="rounded-xl"
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
                                placeholder="Select Duration"
                                loading={loadingDurations}
                                allowClear
                                showSearch
                                optionFilterProp="label"
                                options={durationOptions}
                                className="rounded-xl"
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
                                className="rounded-xl"
                              />
                            </Form.Item>
                          </Col>
                        </Row>

                        {/* Specializations Accordion list under this University */}
                        <Divider titlePlacement="left" plain className="!text-teal-700 !font-bold !text-xs">
                          🎓 Specializations under this University
                        </Divider>

                        <Form.List name={[field.name, "subcourses"]}>
                          {(subFields, { add: addSub, remove: removeSub }) => {
                            const subCollapseItems = subFields.map((subField) => {
                              const { key: subKey, ...restSubField } = subField;

                              return {
                                key: String(subField.name),
                                label: (
                                  <SpecializationHeader
                                    fieldName={subField.name}
                                    subcourseOptions={subcourseOptions}
                                    parentFieldName={field.name}
                                    onRemove={removeSub}
                                  />
                                ),
                                children: (
                                  <div className="space-y-3 pt-2">
                                    <Row gutter={12}>
                                      <Col span={12}>
                                        <Form.Item
                                          {...restSubField}
                                          name={[subField.name, "subcourse"]}
                                          label="Subcourse Ref"
                                          getValueFromEvent={singleObjEvent}
                                          getValueProps={singleObjProp}
                                        >
                                          <Select
                                            placeholder="Select Subcourse"
                                            loading={loadingSubcourses}
                                            allowClear
                                            showSearch
                                            optionFilterProp="label"
                                            options={subcourseOptions}
                                            onChange={(selectedVal) => {
                                              if (selectedVal) {
                                                const opt = subcourseOptions.find(
                                                  (o) => o.value === String(selectedVal)
                                                );
                                                if (opt?.label && form) {
                                                  const currentTitle = form.getFieldValue([
                                                    "universityOfferings",
                                                    field.name,
                                                    "subcourses",
                                                    subField.name,
                                                    "title",
                                                  ]);
                                                  if (!currentTitle) {
                                                    form.setFieldValue(
                                                      [
                                                        "universityOfferings",
                                                        field.name,
                                                        "subcourses",
                                                        subField.name,
                                                        "title",
                                                      ],
                                                      opt.label
                                                    );
                                                  }
                                                }
                                              }
                                            }}
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col span={12}>
                                        <Form.Item
                                          {...restSubField}
                                          name={[subField.name, "title"]}
                                          label="Display Title"
                                        >
                                          <Input placeholder="e.g. Data Analytics Specialization" />
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

                                    <Form.Item
                                      {...restSubField}
                                      name={[subField.name, "shortDescription"]}
                                      label="Short Tagline"
                                    >
                                      <Input placeholder="Short tagline for specialization..." />
                                    </Form.Item>
                                    
                                    {/* Advanced Sections */}
                                    <AdvancedSubcourseSections 
                                      uniFieldIndex={field.name}
                                      namePrefix={subField.name} 
                                      restField={restSubField} 
                                      mediaOptions={mediaOptions}
                                      loadingMedia={loadingMedia}
                                      singleObjEvent={singleObjEvent}
                                      singleObjProp={singleObjProp}
                                    />
                                  </div>
                                ),
                              };
                            });

                            return (
                              <div className="space-y-2">
                                {subFields.length > 0 ? (
                                  <Collapse
                                    accordion={true}
                                    defaultActiveKey={['0']}
                                    bordered={true}
                                    className="bg-white border border-slate-200 rounded-lg overflow-hidden"
                                    items={subCollapseItems}
                                  />
                                ) : (
                                  <div className="text-center py-3 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-xs text-slate-400 font-medium">
                                    No specializations added yet.
                                  </div>
                                )}
                                <Button
                                  type="dashed"
                                  onClick={() => addSub()}
                                  block
                                  icon={<PlusOutlined />}
                                  size="small"
                                  className="text-xs"
                                >
                                  + Add Specialization
                                </Button>
                              </div>
                            );
                          }}
                        </Form.List>
                      </div>
                    ),
                  };
                });

                return (
                  <div className="space-y-4">
                    {fields.length > 0 ? (
                      <Collapse
                        accordion={true}
                        defaultActiveKey={['0']}
                        bordered={true}
                        className="bg-slate-50/70 border border-slate-200 rounded-xl overflow-hidden"
                        items={offeringItems}
                      />
                    ) : (
                      <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-xs text-slate-400 font-semibold">
                        No university offerings added. Click button below to add.
                      </div>
                    )}
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      className="py-2 font-semibold text-indigo-600 border-indigo-200 hover:border-indigo-400 rounded-xl"
                    >
                      + Add University Offering
                    </Button>
                  </div>
                );
              }}
            </Form.List>
          </Card>

          {/* Card 3: Key Highlights & Admission Process */}
          <Card
            title={
              <span className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <SolutionOutlined className="text-teal-600" /> Program Highlights & Admission Steps
              </span>
            }
            className="rounded-2xl border border-slate-200/90 shadow-2xs"
          >
            <div className="space-y-6">
              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider m-0">
                  🌟 Key Program Highlights
                </h4>
                <Form.List name="keyHighlights">
                  {(fields, { add, remove }) => (
                    <div className="space-y-2">
                      <Row gutter={[12, 8]}>
                        {fields.map((field) => {
                          const { key, ...restField } = field;
                          return (
                            <Col key={key} span={12}>
                              <div className="flex items-center gap-1.5">
                                <Form.Item {...restField} name={field.name} noStyle>
                                  <Input placeholder={`Highlight Point #${field.name + 1}`} className="flex-1 rounded-lg" />
                                </Form.Item>
                                <Button
                                  type="text"
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={() => remove(field.name)}
                                  size="small"
                                />
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        size="small"
                        className="text-xs rounded-lg"
                      >
                        + Add Highlight Point
                      </Button>
                    </div>
                  )}
                </Form.List>
              </div>

              {/* Admission Steps */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider m-0">
                  📝 Admission Process Steps
                </h4>
                <Form.List name="admissionProcess">
                  {(fields, { add, remove }) => (
                    <div className="space-y-2">
                      <Row gutter={[12, 8]}>
                        {fields.map((field) => {
                          const { key, ...restField } = field;
                          return (
                            <Col key={key} span={12}>
                              <div className="flex items-center gap-1.5">
                                <Form.Item {...restField} name={field.name} noStyle>
                                  <Input placeholder={`Step #${field.name + 1}`} className="flex-1 rounded-lg" />
                                </Form.Item>
                                <Button
                                  type="text"
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={() => remove(field.name)}
                                  size="small"
                                />
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        size="small"
                        className="text-xs rounded-lg"
                      >
                        + Add Admission Step
                      </Button>
                    </div>
                  )}
                </Form.List>
              </div>
            </div>
          </Card>
        </Col>

        {/* 👉 RIGHT SIDEBAR COLUMN (30% Width) — WordPress / Strapi Meta Box Style */}
        <Col xs={24} lg={8} xl={7} className="space-y-5">
          {/* Status & Publish Box */}
          <Card
            title={
              <span className="flex items-center gap-2 font-bold text-slate-800 text-xs uppercase tracking-wider">
                <CheckCircleOutlined className="text-emerald-500" /> Status & Visibility
              </span>
            }
            className="rounded-2xl border border-slate-200/90 shadow-2xs"
          >
            <div className="space-y-4">
              <Form.Item
                name="enabled"
                label="Active Status"
                valuePropName="checked"
                initialValue={true}
                className="mb-0"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs text-slate-500 font-medium">Enable on Website</span>
                  <Switch />
                </div>
              </Form.Item>

              <Form.Item
                name="featured"
                label="Featured Badge"
                valuePropName="checked"
                initialValue={false}
                className="mb-0"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <StarFilled className="text-amber-500" /> Show in Featured
                  </span>
                  <Switch />
                </div>
              </Form.Item>

              <Form.Item name="order" label="Sort Order" initialValue={0} className="mb-0">
                <InputNumber min={0} className="w-full rounded-xl" placeholder="0" />
              </Form.Item>
            </div>
          </Card>

          {/* Categories Taxonomy Box */}
          <Card
            title={
              <span className="flex items-center gap-2 font-bold text-slate-800 text-xs uppercase tracking-wider">
                <GlobalOutlined className="text-blue-500" /> Categories & Taxonomy
              </span>
            }
            className="rounded-2xl border border-slate-200/90 shadow-2xs"
          >
            <Form.Item
              name="categories"
              label="Main Program Categories"
              getValueFromEvent={multiObjEvent}
              getValueProps={multiObjProp}
              className="mb-0"
            >
              <Select
                mode="multiple"
                placeholder="Select Categories..."
                loading={loadingCategories}
                allowClear
                showSearch
                optionFilterProp="label"
                options={categoryOptions}
                className="w-full rounded-xl"
              />
            </Form.Item>
          </Card>

          {/* Media & Assets Box */}
          <Card
            title={
              <span className="flex items-center gap-2 font-bold text-slate-800 text-xs uppercase tracking-wider">
                <FileImageOutlined className="text-purple-500" /> Media & Attachments
              </span>
            }
            className="rounded-2xl border border-slate-200/90 shadow-2xs"
          >
            <div className="space-y-3">
              <Form.Item
                name="logo"
                label="Logo Asset"
                getValueFromEvent={singleObjEvent}
                getValueProps={singleObjProp}
                className="mb-0"
              >
                <Select
                  placeholder="Select Logo..."
                  loading={loadingMedia}
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  options={mediaOptions}
                  className="rounded-xl"
                />
              </Form.Item>

              <Form.Item
                name="image"
                label="Banner Image"
                getValueFromEvent={singleObjEvent}
                getValueProps={singleObjProp}
                className="mb-0"
              >
                <Select
                  placeholder="Select Banner Image..."
                  loading={loadingMedia}
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  options={mediaOptions}
                  className="rounded-xl"
                />
              </Form.Item>

              <Form.Item
                name="brochureUrl"
                label="Brochure PDF"
                getValueFromEvent={singleObjEvent}
                getValueProps={singleObjProp}
                className="mb-0"
              >
                <Select
                  placeholder="Select Brochure PDF..."
                  loading={loadingMedia}
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  options={mediaOptions}
                  className="rounded-xl"
                />
              </Form.Item>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
