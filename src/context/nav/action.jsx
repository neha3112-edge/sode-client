// navActions.js

import * as actionTypes from './types';

const navActions = (dispatch) => {
    return {
        modal: {
            open: () => dispatch({ type: actionTypes.OPEN_MODAL }),
            close: () => dispatch({ type: actionTypes.CLOSE_MODAL }),
        },
        drawer: {
            open: () => dispatch({ type: actionTypes.OPEN_DRAWER }),
            close: () => dispatch({ type: actionTypes.CLOSE_DRAWER }),
        },
        advancedBox: {
            open: () => dispatch({ type: actionTypes.OPEN_ADVANCED_BOX }),
            close: () => dispatch({ type: actionTypes.CLOSE_ADVANCED_BOX }),
        },
        editBox: {
            open: () => dispatch({ type: actionTypes.OPEN_EDIT_BOX }),
            close: () => dispatch({ type: actionTypes.CLOSE_EDIT_BOX }),
        },
        panel: {
            open: () => dispatch({ type: actionTypes.OPEN_PANEL }),
            close: () => dispatch({ type: actionTypes.CLOSE_PANEL }),
            collapse: () => dispatch({ type: actionTypes.COLLAPSE_PANEL }),
        },
        collapsedBox: {
            open: () => dispatch({ type: actionTypes.OPEN_BOX }),
            close: () => dispatch({ type: actionTypes.CLOSE_BOX }),
            collapse: () => dispatch({ type: actionTypes.COLLAPSE_BOX }),
        },
        readBox: {
            open: () => dispatch({ type: actionTypes.OPEN_READ_BOX }),
            close: () => dispatch({ type: actionTypes.CLOSE_READ_BOX }),
            collapse: () => dispatch({ type: actionTypes.COLLAPSE_READ_BOX }),
        }
    };
};

export default navActions;
