import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { api } from "../../shared/apis/Apis";

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
    if (getCookie("Authorization")) {
      dispatch(loadToken());
    }
  }
);

// 로그인 비동기 액션
export const loginDB = createAsyncThunk(
  "user/login",
  async ({ email, password }, { dispatch }) => {
    try {
<<<<<<< HEAD
      const response = await api.post("/api/user/login", {
        email: email,
        password: password,
      });
      dispatch(login({ is_login: true, token: response.data.token }));
      setCookie("Authorization", response.data.token);
      setCookie("nickname", response.data.nickname);
      setCookie("profileimage", response.data.profileimage);
      setCookie("email", response.data.email);
      setCookie("password", response.data.password);
      return response.data;
=======
      const response = await api.post(
        "/api/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const tokenWithBearer = response.headers.get("Authorization");
      const token = tokenWithBearer.split("Bearer ")[1];
      const { nickname, profileimage, staus, adress } = response.data;
      console.log(response.headers);
      console.log(token);

      dispatch(
        login({
          is_login: true,
          token,
          user: {
            nickname,
            profileimage,
            email,
            password,
            staus,
            adress,
          },
        })
      );
      setCookie("token", token);
      setCookie("nickname", nickname);
      setCookie("profileimage", profileimage);
      setCookie("email", email);
      setCookie("password", password);
      setCookie("status", staus);
      setCookie("address", adress);
      return { token };
>>>>>>> 47c3517d46fc81327f800bafbb97d7f8a41238a2
    } catch (error) {
      window.alert("로그인 에러");
      console.error("Login Error", error);
    }
  }
);

<<<<<<< HEAD
=======
export const logoutDB = createAsyncThunk(
  "user/logout",
  async (token, { dispatch }) => {
    try {    
      await apiToken.post(
        "/api/user/logout",
        {},
        { headers: { "X-AUTH-TOKEN": ` ${token}` } }
      );
      dispatch(logOut());
    } catch (error) {
      console.error("logOut Error", error);
    }
  }
);

>>>>>>> 47c3517d46fc81327f800bafbb97d7f8a41238a2
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      setCookie("is_login", "true");
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.is_login = true;
    },
    logOut: (state) => {
      deleteCookie("is_login");
<<<<<<< HEAD
=======
      deleteCookie("Authorization");
      deleteCookie("nickname");
      deleteCookie("profileimage");
      deleteCookie("email");
      deleteCookie("password");
      deleteCookie("address");
      setCookie("status");
>>>>>>> 47c3517d46fc81327f800bafbb97d7f8a41238a2
      localStorage.removeItem("nickname");
      localStorage.removeItem("token");
      state.user = null;
      state.is_login = false;
    },
    loadToken: (state) => {
      const token = getCookie("token");
      if (token) {
        state.is_login = true;
        state.token = token;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginDB.fulfilled, (state, action) => {
      state.is_login = true;
      state.token = action.payload.token;
    });
    builder.addCase(loadTokenFB.fulfilled, (state, action) => {
      state.is_login = true;
      state.token = action.payload.token;
    });
  },
});

export const { login, logOut, loadToken } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
