import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { api, apiToken } from "../../shared/apis/Apis";

const initialState = {
  userInfo: {
    email: "",
    password: "",
  },
  is_login: false,
};

export const loadTokenFB = createAsyncThunk(
  "user/loadToken",
  async (_, { dispatch }) => {
    const token = getCookie("token");
    if (token) {
      dispatch(loadToken({ token }));
    }
  }
);

export const loginDB = createAsyncThunk(
  "user/login",
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await api.post("/api/user/login", {
        email,
        password,
      });
      const tokenWithBearer = response.headers.get("Authorization");
      const token = tokenWithBearer.split("Bearer ")[1];
      const { nick_name, profileimage, staus, address } = response.data;
      console.log(response.data);
      console.log(token);

      dispatch(
        login({
          is_login: true,
          token,
          user: {
            nick_name,
            profileimage,
            email,
            password,
            staus,
            address,           
          },
        })
      );
      setCookie("token", token);
      setCookie("nickname", nick_name);
      setCookie("profileimage", profileimage);
      setCookie("email", email);
      setCookie("password", password);
      setCookie("status", staus);
      setCookie("address", address);
      return { token };
    } catch (error) {      
        window.alert(error.response.data);      
      console.error("Login Error", error);
    }
  }
);

export const logoutDB = createAsyncThunk(
  "user/logout",
  async (token, { dispatch }) => {
    try {
      await apiToken.post("/api/user/logout");
      dispatch(logOut());
    } catch (error) {
      console.error("logOut Error", error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      setCookie("is_login", "true");
      state.token = action.payload.token;
      state.userInfo = action.payload.user;
      state.is_login = true;
    },
    logOut: (state) => {
      deleteCookie("is_login");
      deleteCookie("token");
      deleteCookie("nickname");
      deleteCookie("profileimage");
      deleteCookie("email");
      deleteCookie("password");
      deleteCookie("address");
      deleteCookie("status");
      localStorage.removeItem("nickname");
      localStorage.removeItem("token");
      state.userInfo = null;
      state.is_login = false;
    },
    loadToken: (state) => {
      const token = getCookie("token");
      if (token) {
        state.is_login = true;
        state.token = token;
      }
    },
    removeUser: (state) => {
      state.email = "";
      state.token = "";
      state.id = "";

      localStorage.setItem("user", JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginDB.fulfilled, (state, action) => {
      if (action.payload) {
        state.is_login = true;
        state.token = action.payload.token;
      }
    });
    builder.addCase(loadTokenFB.fulfilled, (state, action) => {
      state.is_login = true;
      state.token = action.payload.token;
    });
  },
});

export const { login, logOut, loadToken, removeUser, nickname } =
  userSlice.actions;

export default userSlice.reducer;
