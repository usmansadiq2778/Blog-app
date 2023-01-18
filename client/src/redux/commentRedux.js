import { createSlice } from "@reduxjs/toolkit";
const commentSlice = createSlice({
  name: "comment",
  initialState: {
    currentComment: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    commentStart: (state) => {
      state.isFetching = true;
    },
    commentSuccess: (state, action) => {
      state.isFetching = false;
      state.currentComment = action.payload;
      state.error=false;
    },
    commentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.currentComment=null;
    },
  },
});

export const { commentStart, commentSuccess, commentFailure} = commentSlice.actions;
export default commentSlice.reducer;