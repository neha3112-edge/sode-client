import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  current: null,

  list: {
    result: {
      items: [],
      extra: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 1,
        showSizeChanger: false,
      },
    },
    isLoading: false,
    isSuccess: false,
  },
};

const dynamicSlice = createSlice({
  name: "dynamic",

  initialState: INITIAL_STATE,

  reducers: {
    resetState: () => INITIAL_STATE,

    requestLoading: (state, action) => {
      const { keyState } = action.payload || {};

      if (keyState && state[keyState]) {
        state[keyState].isLoading = true;
      }
    },

    requestFailed: (state, action) => {
      const { keyState } = action.payload || {};

      if (keyState && state[keyState]) {
        state[keyState].isLoading = false;
        state[keyState].isSuccess = false;
      }
    },

    requestSuccess: (state, action) => {
      const { keyState, payload } = action.payload || {};

      if (keyState && state[keyState]) {
        state[keyState].result = payload;
        state[keyState].isLoading = false;
        state[keyState].isSuccess = true;
        state.current = payload;
      }
    },

    resetAction: (state, action) => {
      const { keyState } = action.payload || {};

      if (keyState && state[keyState]) {
        state[keyState] = {
          ...INITIAL_STATE[keyState],
        };
      }
    },

    currentItem: (state, action) => {
      state.current = action.payload;
    },

    addEntity: (state, action) => {
      state.list.result.items.push(action.payload);
    },

    updateEntity: (state, action) => {
      const index = state.list.result.items.findIndex(
        (item) => item._id === action.payload._id,
      );

      if (index !== -1) {
        state.list.result.items[index] = {
          ...state.list.result.items[index],
          ...action.payload,
        };
      }
    },

    deleteEntity: (state, action) => {
      state.list.result.items = state.list.result.items.filter(
        (item) => item._id !== action.payload,
      );
    },
  },
});

export const {
  resetState,
  requestLoading,
  requestFailed,
  requestSuccess,
  resetAction,
  currentItem,
  addEntity,
  updateEntity,
  deleteEntity,
} = dynamicSlice.actions;

export default dynamicSlice.reducer;
