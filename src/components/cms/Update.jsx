"use client";

import { useEffect } from "react";
import dayjs from "dayjs";
import { Form } from "antd";
import { useSelector } from "react-redux";
import { useCrudContext } from "@/context/crud";
import { useUpdateDynamicMutation } from "@/store/redux/dynamic/action";

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

    // 🎯 Iterate over form values so items can be added/removed, but merge with existing data to prevent data loss
    if (entity === "course" || entity === "courses") {
      const currentOfferings = Array.isArray(current?.universityOfferings)
        ? current.universityOfferings
        : [];
      const formOfferings = Array.isArray(fieldsValue?.universityOfferings)
        ? fieldsValue.universityOfferings
        : [];

      transformedValues = {
        ...current,
        ...fieldsValue,
        categories: (fieldsValue?.categories || current?.categories || []).map(
          (c) => (typeof c === "object" ? c?._id || String(c) : String(c))
        ),
        universityOfferings: formOfferings.map((formOff, oIdx) => {
          const existingOff = formOff?._id 
            ? currentOfferings.find(o => o._id === formOff._id) 
            : currentOfferings[oIdx] || {};
            
          const { _id: offId, ...cleanExistingOff } = existingOff || {};

          const existingSubcourses = Array.isArray(existingOff?.subcourses)
            ? existingOff.subcourses
            : [];
          const formSubcourses = Array.isArray(formOff?.subcourses)
            ? formOff.subcourses
            : [];

          return {
            ...cleanExistingOff,
            ...formOff,
            university:
              formOff?.university?._id ||
              formOff?.university ||
              existingOff?.university?._id ||
              existingOff?.university ||
              null,
            workspace:
              formOff?.workspace?._id ||
              formOff?.workspace ||
              existingOff?.workspace?._id ||
              existingOff?.workspace ||
              null,
            fee:
              formOff?.fee?._id ||
              formOff?.fee ||
              existingOff?.fee?._id ||
              existingOff?.fee ||
              null,
            duration:
              formOff?.duration?._id ||
              formOff?.duration ||
              existingOff?.duration?._id ||
              existingOff?.duration ||
              null,
            eligibility:
              formOff?.eligibility?._id ||
              formOff?.eligibility ||
              existingOff?.eligibility?._id ||
              existingOff?.eligibility ||
              null,
            category: Array.isArray(formOff?.category)
              ? formOff.category.map((c) => (typeof c === "object" ? c?._id || String(c) : String(c)))
              : Array.isArray(existingOff?.category)
                ? existingOff.category.map((c) => (typeof c === "object" ? c?._id || String(c) : String(c)))
                : [],
            subcourses: formSubcourses.map((formSub, sIdx) => {
              const existingSub = formSub?._id 
                ? existingSubcourses.find(s => s._id === formSub._id) 
                : existingSubcourses[sIdx] || {};
              const { _id: subId, ...cleanExistingSub } = existingSub || {};

              return {
                ...cleanExistingSub,
                ...formSub,
                subcourse:
                  formSub?.subcourse?._id ||
                  formSub?.subcourse ||
                  existingSub?.subcourse?._id ||
                  existingSub?.subcourse ||
                  null,
                fee:
                  formSub?.fee?._id ||
                  formSub?.fee ||
                  existingSub?.fee?._id ||
                  existingSub?.fee ||
                  null,
                duration:
                  formSub?.duration?._id ||
                  formSub?.duration ||
                  existingSub?.duration?._id ||
                  existingSub?.duration ||
                  null,
                category:
                  formSub?.category?._id ||
                  formSub?.category ||
                  existingSub?.category?._id ||
                  existingSub?.category ||
                  null,
              };
            }),
          };
        }),
      };
    }

    const id = current?._id || current?.id;
    if (!id) {
      console.error("No ID found for update operation");
      return;
    }

    // Clean payload by removing immutable database fields (_id, createdAt, updatedAt, __v)
    const { _id, id: fieldId, createdAt, updatedAt, __v, ...cleanFields } =
      transformedValues || {};

    try {
      const response = await updateDynamic({
        entity,
        endPoint,
        id,
        jsonData: cleanFields,
        withUpload,
      }).unwrap();

      if (response && response.success !== false) {
        if (editBox && typeof editBox.close === "function") editBox.close();
        if (panel && typeof panel.close === "function") panel.close();
        form.resetFields();
      }
    } catch (error) {
      console.error("Update operation failed:", error);
    }
  };

  useEffect(() => {
    if (current) {
      const newValues = {
        ...current,
      };

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
    }
  }, [current, form]);

  return (
    <Form id="cms-drawer-form" form={form} layout="vertical" onFinish={onSubmit}>
      {formElements}
    </Form>
  );
}
