// contextReducer.js

import * as actionTypes from './types';

export const initialState = {
    isModalOpen: false,
    isDrawerOpen: false,
    isPanelClose: true,
    isBoxCollapsed: false,
    isReadBoxOpen: false,
    isAdvancedBoxOpen: false,
    isEditBoxOpen: false,
    isReferBoxOpen: false,
    isFollowUpBoxOpen: false,  // State for the follow-up box
    isBulkReferOpen: false,  // State for the bulkRefer drawer
    isWhatsAppOpen: false, // State for WhatsApp Open/Close
};

export function contextReducer(state, action) {
    switch (action.type) {
        case actionTypes.OPEN_MODAL:
            return {
                ...state,
                isModalOpen: true,
            };
        case actionTypes.CLOSE_MODAL:
            return {
                ...state,
                isModalOpen: false,
            };

        case actionTypes.OPEN_DRAWER:
            return {
                ...state,
                isDrawerOpen: true,
            };
        case actionTypes.CLOSE_DRAWER:
            return {
                ...state,
                isDrawerOpen: false,
            };

        case actionTypes.OPEN_PANEL:
            return {
                ...state,
                isPanelClose: false,
            };
        case actionTypes.CLOSE_PANEL:
            return {
                ...state,
                isPanelClose: true,
            };
        case actionTypes.COLLAPSE_PANEL:
            return {
                ...state,
                isPanelClose: !state.isPanelClose,
            };
        case actionTypes.OPEN_BOX:
            return {
                ...state,
                isBoxCollapsed: true,
            };
        case actionTypes.CLOSE_BOX:
            return {
                ...state,
                isBoxCollapsed: false,
            };
        case actionTypes.COLLAPSE_BOX:
            return {
                ...state,
                isBoxCollapsed: !state.isBoxCollapsed,
            };
        case actionTypes.OPEN_WHATSAPP:
            return {
                ...state,
                isWhatsAppOpen: true,
            };
        case actionTypes.CLOSE_WHATSAPP:
            return {
                ...state,
                isWhatsAppOpen: false,
            };
        case actionTypes.OPEN_READ_BOX:
            return {
                ...state,
                isAdvancedBoxOpen: false,
                isEditBoxOpen: false,
                isReferBoxOpen: false,
                isFollowUpBoxOpen: false,  // Ensure only one box is open
                isReadBoxOpen: true,
            };
        case actionTypes.CLOSE_READ_BOX:
            return {
                ...state,
                isReadBoxOpen: false,
            };
        case actionTypes.OPEN_ADVANCED_BOX:
            return {
                ...state,
                isReadBoxOpen: false,
                isEditBoxOpen: false,
                isReferBoxOpen: false,
                isFollowUpBoxOpen: false,  // Ensure only one box is open
                isAdvancedBoxOpen: true,
            };
        case actionTypes.CLOSE_ADVANCED_BOX:
            return {
                ...state,
                isAdvancedBoxOpen: false,
            };
        case actionTypes.OPEN_EDIT_BOX:
            return {
                ...state,
                isReadBoxOpen: false,
                isAdvancedBoxOpen: false,
                isReferBoxOpen: false,
                isFollowUpBoxOpen: false,  // Ensure only one box is open
                isEditBoxOpen: true,
            };
        case actionTypes.CLOSE_EDIT_BOX:
            return {
                ...state,
                isEditBoxOpen: false,
            };
        case actionTypes.OPEN_REFER_BOX:
            return {
                ...state,
                isReadBoxOpen: false,
                isAdvancedBoxOpen: false,
                isEditBoxOpen: false,  // Ensure only one box is open
                isFollowUpBoxOpen: false,
                isReferBoxOpen: true,
            };
        case actionTypes.CLOSE_REFER_BOX:
            return {
                ...state,
                isReferBoxOpen: false,
            };
        case actionTypes.COLLAPSE_REFER_BOX:
            return {
                ...state,
                isReferBoxOpen: !state.isReferBoxOpen,
            };

        // New cases for FollowUpBox
        case actionTypes.OPEN_FOLLOWUP_BOX:
            return {
                ...state,
                isReadBoxOpen: false,
                isAdvancedBoxOpen: false,
                isEditBoxOpen: false,
                isReferBoxOpen: false,  // Ensure only one box is open
                isFollowUpBoxOpen: true,
            };
        case actionTypes.CLOSE_FOLLOWUP_BOX:
            return {
                ...state,
                isFollowUpBoxOpen: false,
            };
        case actionTypes.COLLAPSE_FOLLOWUP_BOX:
            return {
                ...state,
                isFollowUpBoxOpen: !state.isFollowUpBoxOpen,
            };
        // Bulk Refer actions
        case actionTypes.OPEN_BULK_REFER:
            return {
                ...state,
                isReadBoxOpen: false,
                isAdvancedBoxOpen: false,
                isEditBoxOpen: false,
                isReferBoxOpen: false,
                isFollowUpBoxOpen: false,
                isBulkReferOpen: true,  // Open only the bulkRefer drawer
            };
        case actionTypes.CLOSE_BULK_REFER:
            return {
                ...state,
                isBulkReferOpen: false,
            };

        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}
