import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AUTH_TOKEN } from "config/constants";
import {
  authenticate,
  deleteAuthToken,
  getAuthenticatedUser,
} from "shared/api/user.api";
import { User } from "shared/types/user.type";

export type AuthenticationState = {
  token: null | string;
  user: null | User;
  error: null | string;
};

const initialState: AuthenticationState = {
  token: localStorage.getItem(AUTH_TOKEN),
  user: null,
  error: null,
};

const login = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }) => {
    const { data: token } = await authenticate(data);
    localStorage.setItem(AUTH_TOKEN, token);
    return token;
  }
);

const getUser = createAsyncThunk("user/getUser", async () => {
  const { data } = await getAuthenticatedUser();
  return data;
});

const logout = createAsyncThunk("user/logout", async () => {
  await deleteAuthToken();
  localStorage.removeItem(AUTH_TOKEN);
});

export const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state) => {
      state.error = "AUTH_ERROR";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.error = "GET_USER_ERROR";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
    });
  },
});

export { login, getUser, logout };

export default authentication.reducer;
