import { create } from "zustand";

export const useCrudStore = create((set) => ({
  // 1️⃣ INITIAL STATE
  isModalOpen: false,
  isDrawerOpen: false,
  drawerContent: null,
  drawerTitle: "Quick View",
  drawerButtonText: "Save", // 🆕 डिफ़ॉल्ट बटन टेक्स्ट
  drawerOnSave: null, // 🆕 क्लिक होने वाला डायनामिक एक्शन
  isDrawerLoading: false, // 🆕 लोडिंग स्टेट
  isPanelClose: true,
  isBoxCollapsed: false,
  isReadBoxOpen: false,
  isAdvancedBoxOpen: false,
  isEditBoxOpen: false,
  isReferBoxOpen: false,
  isFollowUpBoxOpen: false,
  isBulkReferOpen: false,
  isWhatsAppOpen: false,

  // 2️⃣ ACTIONS / METHODS
  modal: {
    open: () => set({ isModalOpen: true }),
    close: () => set({ isModalOpen: false }),
  },

  drawer: {
    // 🚀 अब यह open फ़ंक्शन कंटेंट, टाइटल, सेव एक्शन, और बटन टेक्स्ट सब कुछ डायनामिक स्वीकार करता है
    open: (
      content = null,
      title = "Quick View",
      onSave = null,
      buttonText = "Save",
    ) =>
      set({
        isDrawerOpen: true,
        drawerContent: content,
        drawerTitle: title,
        drawerOnSave: onSave,
        drawerButtonText: buttonText,
        isDrawerLoading: false, // जब भी नया ड्रॉर खुले, लोडिंग बंद रहे
      }),
    close: () =>
      set({
        isDrawerOpen: false,
        drawerContent: null,
        drawerTitle: "Quick View",
        drawerOnSave: null,
        drawerButtonText: "Save",
        isDrawerLoading: false,
      }),
    // 🚀 लोडिंग स्टेट को ऑन/ऑफ करने के लिए एक्शन्स
    setLoading: (loading) => set({ isDrawerLoading: loading }),
  },

  advancedBox: {
    open: () =>
      set({
        isReadBoxOpen: false,
        isEditBoxOpen: false,
        isReferBoxOpen: false,
        isFollowUpBoxOpen: false,
        isAdvancedBoxOpen: true,
      }),
    close: () => set({ isAdvancedBoxOpen: false }),
  },

  editBox: {
    open: () =>
      set({
        isReadBoxOpen: false,
        isAdvancedBoxOpen: false,
        isReferBoxOpen: false,
        isFollowUpBoxOpen: false,
        isEditBoxOpen: true,
      }),
    close: () => set({ isEditBoxOpen: false }),
  },

  panel: {
    open: () => set({ isPanelClose: false }),
    close: () => set({ isPanelClose: true }),
    collapse: () => set((state) => ({ isPanelClose: !state.isPanelClose })),
  },

  collapsedBox: {
    open: () => set({ isBoxCollapsed: true }),
    close: () => set({ isBoxCollapsed: false }),
    collapse: () => set((state) => ({ isBoxCollapsed: !state.isBoxCollapsed })),
  },

  readBox: {
    open: () =>
      set({
        isAdvancedBoxOpen: false,
        isEditBoxOpen: false,
        isReferBoxOpen: false,
        isFollowUpBoxOpen: false,
        isReadBoxOpen: true,
      }),
    close: () => set({ isReadBoxOpen: false }),
  },

  referBox: {
    open: () =>
      set({
        isReadBoxOpen: false,
        isAdvancedBoxOpen: false,
        isEditBoxOpen: false,
        isFollowUpBoxOpen: false,
        isReferBoxOpen: true,
      }),
    close: () => set({ isReferBoxOpen: false }),
    collapse: () => set((state) => ({ isReferBoxOpen: !state.isReferBoxOpen })),
  },

  followUpBox: {
    open: () =>
      set({
        isReadBoxOpen: false,
        isAdvancedBoxOpen: false,
        isEditBoxOpen: false,
        isReferBoxOpen: false,
        isFollowUpBoxOpen: true,
      }),
    close: () => set({ isFollowUpBoxOpen: false }),
    collapse: () =>
      set((state) => ({ isFollowUpBoxOpen: !state.isFollowUpBoxOpen })),
  },

  bulkRefer: {
    open: () =>
      set({
        isReadBoxOpen: false,
        isAdvancedBoxOpen: false,
        isEditBoxOpen: false,
        isReferBoxOpen: false,
        isFollowUpBoxOpen: false,
        isBulkReferOpen: true,
      }),
    close: () => set({ isBulkReferOpen: false }),
  },

  whatsapp: {
    open: () => set({ isWhatsAppOpen: true }),
    close: () => set({ isWhatsAppOpen: false }),
  },
}));
