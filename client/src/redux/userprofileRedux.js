import { createSlice } from "@reduxjs/toolkit";
const userprofileSlice = createSlice({
  name: "userprofile",
  initialState: {
    currentUserprofile: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    userprofileStart: (state) => {
      state.isFetching = true;
    },
    userprofileSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUserprofile = action.payload;
      state.error=false;
    },
    userprofileFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.currentUserprofile=null;
    },
  },
});

export const { userprofileStart, userprofileSuccess, userprofileFailure } = userprofileSlice.actions;
export default userprofileSlice.reducer;