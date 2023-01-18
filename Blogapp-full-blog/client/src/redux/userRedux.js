import { createSlice } from "@reduxjs/toolkit";
const currentUser=localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")):null;
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: currentUser,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error=false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.currentUser=null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;