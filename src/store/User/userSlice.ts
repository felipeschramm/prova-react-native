import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  email: string;
  password: string;
  name: string;
  token: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  email: "",
  password: "",
  name: "",
  token: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string }>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    register(
      state,
      action: PayloadAction<{ email: string; password: string; name: string }>
    ) {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.name = action.payload.name;
    },
  },
});

export const { login, logout, register } = user.actions;
export default user.reducer;
