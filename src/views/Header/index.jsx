"use client";

import PageHeader from "@/components/layout/PageHeader";
import { LayoutTemplate } from "lucide-react";
import { useCrudStore } from "@/store/zustand/crud/store";

export default function HeaderSettingsPage() {
  // 🚀 Zustand से drawer एक्शन निकाला
  const drawer = useCrudStore((state) => state.drawer);

  // 🛠️ ड्रॉर के अंदर जो फॉर्म दिखाना है और उसका सबमिशन लॉजिक यहाँ है
  const handleOpenNewHeaderForm = () => {
    // 1️⃣ फॉर्म सबमिट करने का लॉजिक (जो फ़ुटर के बटन पर क्लिक करने से ट्रिगर होगा)
    const handleFormSubmit = async () => {
      drawer.setLoading(true); // फ़ुटर बटन पर लोडिंग स्पिनर चालू करें
      try {
        console.log("Saving Header Configuration Data...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        drawer.close(); // सफलता पूर्वक सेव होने के बाद ड्रॉर बंद करें
      } catch (err) {
        console.error("Error saving header info:", err);
      } finally {
        drawer.setLoading(false); // लोडिंग स्पिनर बंद करें
      }
    };
    // 2️⃣ ग्लोबल ड्रॉर को डेटा और एक्शन्स के साथ ओपन करें
    drawer.open(
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Header Name
          </label>
          <input
            type="text"
            placeholder="e.g., Main Navigation"
            className="border border-gray-300 p-2 w-full rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Header Details
          </label>
          <textarea
            rows={4}
            placeholder="Enter configuration parameters..."
            className="border border-gray-300 p-2 w-full rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>,
      "Create New Header Config",
      handleFormSubmit,
      "Submit",
    );
  };

  return (
    <div>
      <PageHeader
        title="Header Settings"
        icon={<LayoutTemplate size={16} className="text-gray-500" />}
        buttonText="New"
        onButtonClick={handleOpenNewHeaderForm}
      />

      <div className="text-gray-600 mt-4 px-4 text-sm">
        Header settings form inputs and configuration dashboard layout goes
        here...
      </div>
    </div>
  );
}
