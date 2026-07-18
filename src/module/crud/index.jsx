"use client"; // Next.js Client Component के लिए जरूरी है

import React from "react";
import CreateForm from "@/components/shared/Create";
import UpdateForm from "@/components/shared/Update";
import DataTable from "@/components/shared/Crud";
import { CrudLayout } from "@/layout";

function SidePanelTopContent({ config, formElements, withUpload }) {
  return (
    <>
      <UpdateForm
        config={config}
        formElements={formElements}
        withUpload={withUpload}
      />
    </>
  );
}

export default function CrudModule({
  config,
  createForm,
  updateForm,
  withUpload = false,
  updatePasswordForm,
  // ⚡ नोट: जिन फ़ॉर्म्स की अभी ज़रूरत नहीं थी उन्हें साफ़ रखा गया है
}) {
  // ⚡ FIXED: Redux का useDispatch और resetAction पूरी तरह हटा दिया गया है।

  return (
    <CrudLayout
      config={config}
      sidePanelBottomContent={
        <>
          <CreateForm
            config={config}
            formElements={createForm}
            withUpload={withUpload}
          />
        </>
      }
      sidePanelTopContent={
        <SidePanelTopContent
          config={config}
          formElements={updateForm}
          withUpload={withUpload}
          updatePasswordForm={updatePasswordForm}
        />
      }
    >
      <DataTable config={config} />
    </CrudLayout>
  );
}
