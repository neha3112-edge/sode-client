"use client";

import { useEffect } from "react";
import dayjs from "dayjs";
import { Form } from "antd";
import { useSelector } from "react-redux";
import { useCrudContext } from "@/context/crud";
import { useUpdateDynamicMutation } from "@/store/redux/dynamic/action";
import {
  normalizeCourseForForm,
  serializeCourseForApi,
} from "@/lib/course.mapper";

export default function UpdateForm({
  config,
  formElements,
  withUpload = false,
}) {
  const { entity } = config;
  const endPoint = config?.updateEndPoint || config?.endPoint || "update";
  const { crudContextAction } = useCrudContext();
  const current = useSelector((state) => state.crud.current);
  const { panel, editBox } = crudContextAction;
  const [form] = Form.useForm();

  const [updateDynamic] = useUpdateDynamicMutation();
  const onSubmit = async (fieldsValue) => {
    let transformedValues = {
      ...current,
      ...fieldsValue,
    };

    if (fieldsValue?.file && withUpload) {
      if (Array.isArray(fieldsValue.file) && fieldsValue.file.length > 0) {
        transformedValues.file =
          fieldsValue.file[0]?.originFileObj || fieldsValue.file[0];
      } else {
        transformedValues.file = fieldsValue.file;
      }
    }

    // ✅ Course Mapping with deep-merge to protect unexpanded accordion panel fields and handle string IDs
    if (entity === "course" || entity === "courses") {
      const currentOfferings = Array.isArray(current?.universityOfferings)
        ? current.universityOfferings
        : [];
      const formOfferings = Array.isArray(fieldsValue?.universityOfferings)
        ? fieldsValue.universityOfferings
        : [];

      const mergedOfferings = formOfferings.map((formOff, oIdx) => {
        const formOffObj = typeof formOff === "object" && formOff !== null ? formOff : {};
        const targetOffId = typeof formOff === "string" ? formOff : formOffObj?._id;

        const existingOff = targetOffId
          ? currentOfferings.find((o) => String(o._id || o.id) === String(targetOffId))
          : currentOfferings[oIdx] || {};

        const existingSubcourses = Array.isArray(existingOff?.subcourses)
          ? existingOff.subcourses
          : [];
        const formSubcourses = Array.isArray(formOffObj?.subcourses)
          ? formOffObj.subcourses
          : [];

        const mergedSubcourses = formSubcourses.map((formSub, sIdx) => {
          const formSubObj = typeof formSub === "object" && formSub !== null ? formSub : {};
          const targetSubId = typeof formSub === "string" ? formSub : formSubObj?._id;

          const existingSub = targetSubId
            ? existingSubcourses.find((s) => String(s._id || s.id) === String(targetSubId))
            : existingSubcourses[sIdx] || {};

          return {
            ...existingSub,
            ...formSubObj,
          };
        });

        return {
          ...existingOff,
          ...formOffObj,
          subcourses: mergedSubcourses.length > 0 ? mergedSubcourses : (existingOff?.subcourses || []),
        };
      });

      transformedValues = {
        ...current,
        ...fieldsValue,
        universityOfferings: mergedOfferings.length > 0 ? mergedOfferings : currentOfferings,
      };

      transformedValues = serializeCourseForApi(transformedValues);
    }

    const id = current?._id || current?.id;

    if (!id) {
      console.error("No ID found for update operation");
      return;
    }

    const {
      _id,
      id: fieldId,
      createdAt,
      updatedAt,
      __v,
      ...cleanFields
    } = transformedValues || {};

    try {
      const response = await updateDynamic({
        entity,
        endPoint,
        id,
        jsonData: cleanFields,
        withUpload,
      }).unwrap();

      if (response && response.success !== false) {
        form.resetFields();
        if (editBox?.close) editBox.close();
        if (panel?.close) panel.close();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!current) return;

    let newValues = { ...current };

    // ✅ Convert Mongo Object -> Form Values
    if (entity === "course" || entity === "courses") {
      newValues = normalizeCourseForForm(current);
    }

    const formatDateFields = [
      "birthday",
      "date",
      "expiredDate",
      "created",
      "updated",
    ];

    formatDateFields.forEach((field) => {
      if (newValues[field]) {
        newValues[field] = dayjs(newValues[field]).format(
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        );
      }
    });

    form.resetFields();
    form.setFieldsValue(newValues);
  }, [current, entity, form]);

  return (
    <Form id="cms-drawer-form" form={form} layout="vertical" onFinish={onSubmit}>
      {formElements}
    </Form>
  );
}
