import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authToken: localStorage.getItem("auth-token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
            state.authToken = action.payload;
            localStorage.setItem("auth-token", action.payload);

          },
    logout: (state) => {
      state.authToken = null;
      localStorage.removeItem("auth-token");
    },
  },
});

export const { logout,setAuthToken } = authSlice.actions;
export default authSlice.reducer;
