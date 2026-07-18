import * as actionTypes from './types';

const contextActions = (dispatch) => {
    return {
        modal: {
            open: () => {
                dispatch({ type: actionTypes.OPEN_MODAL });
            },
            close: () => {
                dispatch({ type: actionTypes.CLOSE_MODAL });
            },
        },
        drawer: {
            open: () => {
                dispatch({ type: actionTypes.OPEN_DRAWER });
            },
            close: () => {
                dispatch({ type: actionTypes.CLOSE_DRAWER });
            },
        },
        advancedBox: {
            open: () => {
                dispatch({ type: actionTypes.OPEN_ADVANCED_BOX });
            },
            close: () => {
                dispatch({ type: actionTypes.CLOSE_ADVANCED_BOX });
            },
        },
        editBox: {
            open: () => {
                dispatch({ type: actionTypes.OPEN_EDIT_BOX });
            },
            close: () => {
                dispatch({ type: actionTypes.CLOSE_EDIT_BOX });
            },
        },
        panel: {
            open: () => {
                dispatch({ type: actionTypes.OPEN_PANEL });
            },
            close: () => {
                dispatch({ type: actionTypes.CLOSE_PANEL });
            },
            collapse: () => {
                dispatch({ type: actionTypes.COLLAPSE_PANEL });
            },
        },
        collapsedBox: {
            open: () => {
                dispatch({ type: actionTypes.OPEN_BOX });
            },
            close: () => {
                dispatch({ type: actionTypes.CLOSE_BOX });
            },
            collapse: () => {
                dispatch({ type: actionTypes.COLLAPSE_BOX });
            },
        },
        readBox: {
            open: () => {
                dispatch({ type: actionTypes.OPEN_READ_BOX });
            },
            close: () => {
                dispatch({ type: actionTypes.CLOSE_READ_BOX });
            },
            collapse: () => {
                dispatch({ type: actionTypes.COLLAPSE_READ_BOX });
            },
        },
        referBox: {
            open: () => {
                dispatch({ type: actionTypes.OPEN_REFER_BOX });
            },
            close: () => {
                dispatch({ type: actionTypes.CLOSE_REFER_BOX });
            },
            collapse: () => {
                dispatch({ type: actionTypes.COLLAPSE_REFER_BOX });
            },
        },
        followUpBox: {
            open: () => {
                dispatch({ type: actionTypes.OPEN_FOLLOWUP_BOX });
            },
            close: () => {
                dispatch({ type: actionTypes.CLOSE_FOLLOWUP_BOX });
            },
            collapse: () => {
                dispatch({ type: actionTypes.COLLAPSE_FOLLOWUP_BOX });
            },
        },
        bulkRefer: {
            open: () => {
                dispatch({ type: actionTypes.OPEN_BULK_REFER });
            },
            close: () => {
                dispatch({ type: actionTypes.CLOSE_BULK_REFER });
            },
        },
        whatsapp: {
            open: () => {
                dispatch({ type: actionTypes.OPEN_WHATSAPP });
            },
            close: () => {
                dispatch({ type: actionTypes.CLOSE_WHATSAPP });
            },
        }
    };
};

export default contextActions;
