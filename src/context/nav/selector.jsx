// navSelectors.js

const navSelectors = (state) => {
    return {
        isModalOpen: () => state.isModalOpen,
        isDrawerOpen: () => state.isDrawerOpen,
        isPanelOpen: () => state.isPanelClose === false,
        isBoxOpen: () => state.isBoxCollapsed === false,
        isReadBoxOpen: () => state.isReadBoxOpen,
        isAdvancedBoxOpen: () => state.isAdvancedBoxOpen,
        isEditBoxOpen: () => state.isEditBoxOpen,
    };
};

export default navSelectors;
