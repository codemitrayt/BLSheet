import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";

interface AuthSliceType {
  user: User | null;
  authToken: string | null;
  isAuth: boolean;
}

const initialState: AuthSliceType = {
  user: null,
  authToken: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user, authToken } = action.payload;
      state.user = user;
      state.authToken = authToken;
      state.isAuth = true;
    },

    logout: (state) => {
      state.user = null;
      state.authToken = null;
      state.isAuth = false;
    },

    setUser: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
  },
});

export const { setAuth, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
