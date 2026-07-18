const contextSelectors = (state) => {
    return {
        isModalOpen: () => {
            return state.isModalOpen;
        },
        isDrawerOpen: () => {
            return state.isDrawerOpen;
        },
        isPanelOpen: () => {
            return state.isPanelOpen;
        },
        isBoxOpen: () => {
            return state.isBoxOpen;
        },
        isReferBoxOpen: () => {
            return state.isReferBoxOpen;
        },
        isFollowUpBoxOpen: () => {  // Selector for the follow-up box
            return state.isFollowUpBoxOpen;
        },
        isBulkReferOpen: () => {  // Selector for the bulkRefer drawer
            return state.isBulkReferOpen;
        },
        isAdvancedBoxOpen: () => {  // Selector for the bulkRefer drawer
            return state.isAdvancedBoxOpen;
        },
        isWhatsAppOpen: () => {
            return state.isWhatsAppOpen;
        },
    };
};

export default contextSelectors;