import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: null,
  actionType: null,
};

export const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    currentItem: (state, action) => {
      state.current = action.payload?.data || action.payload || null;
    },
    currentAction: (state, action) => {
      state.actionType = action.payload?.actionType || null;
      if (action.payload?.data) {
        state.current = action.payload.data;
      }
    },
    resetCrud: (state) => {
      state.current = null;
      state.actionType = null;
    },
  },
});

export const { currentItem, currentAction, resetCrud } = crudSlice.actions;

// Export 'crud' object matching dispatch(crud.currentItem({ data: record }))
export const crud = crudSlice.actions;

export default crudSlice.reducer;
