import { createSlice } from "@reduxjs/toolkit";
const categorySlice = createSlice({
  name: "category",
  initialState: {
    currentCategory: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    categoryStart: (state) => {
      state.isFetching = true;
    },
    categorySuccess: (state, action) => {
      state.isFetching = false;
      state.currentCategory = action.payload;
      state.error=false;
    },
    categoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.currentCategory=null;
    },
  },
});

export const { categoryStart, categorySuccess, categoryFailure} = categorySlice.actions;
export default categorySlice.reducer;