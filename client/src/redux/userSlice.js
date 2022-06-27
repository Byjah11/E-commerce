import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    pending: false,
    error: false,
  },
  reducers: {
    start: (state) => {
      state.pending = true;
      state.error = false;
    },
    error: (state) => {
      state.error = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.pending = false;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const { start, error, loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
