import { createSelector } from "@reduxjs/toolkit";

const selectDynamic = (state) => state.dynamic || {};

export const selectCurrentItem = createSelector(
  [selectDynamic],
  (dynamic) => dynamic.current,
);

export const selectListItems = createSelector(
  [selectDynamic],
  (dynamic) => dynamic.list,
);

export const selectItemById = (itemId) =>
  createSelector(selectListItems, (list) =>
    list.result.items.find((item) => item._id === itemId),
  );
