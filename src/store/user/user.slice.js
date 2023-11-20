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

// // 로그인 비동기 액션
// export const loginDB = createAsyncThunk(
//   "user/login",
//   async ({ email, password }, { dispatch }) => {
//     try {
//       const response = await api.post("/api/user/login", {
//         email: email,
//         password: password,
//       });
//       dispatch(login({ is_login: true, token: response.data.token }));
//       setCookie("Authorization", response.data.token);
//       setCookie("nickname", response.data.nickname);
//       setCookie("profileimage", response.data.profileimage);
//       setCookie("email", response.data.email);
//       setCookie("password", response.data.password)
//       return response.data;
//     } catch (error) {
//       window.alert("로그인 에러");
//       console.error("Login Error", error);
//     }
//   }
// );

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       setCookie("is_login", "true");
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//       state.is_login = true;
//     },
//     logOut: (state) => {
//       deleteCookie("is_login");
//       localStorage.removeItem("nickname");
//       localStorage.removeItem("token");
//       state.user = null;
//       state.is_login = false;
//     },
//     loadToken: (state) => {
//       const token = getCookie("Authorization");
//       if (token) {
//         state.is_login = true;
//         state.token = token;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(loginDB.fulfilled, (state, action) => {
//       state.is_login = true;
//       state.token = action.payload.token;
//     });
//     builder.addCase(loadTokenFB.fulfilled, (state, action) => {
//       state.is_login = true;
//       state.token = action.payload.token;
//     });
//   },
// });

// export const { login, logOut, loadToken } = userSlice.actions;

// // Export the reducer
// export default userSlice.reducer;

// 로그인 비동기 액션
export const loginDB = createAsyncThunk(
  "user/login",
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await api.post("/api/user/login", {
        email: email,
        password: password,
      });
      const { token, nickname, profileimage, email, password } = response.data;
      dispatch(
        login({
          is_login: true,
          token,
          user: { nickname, profileimage, email, password },
        })
      );
      setCookie("Authorization", token);
      setCookie("nickname", nickname);
      setCookie("profileimage", profileimage);
      setCookie("email", email);
      setCookie("password", password);
      return response.data;
    } catch (error) {
      window.alert("로그인 에러");
      console.error("Login Error", error);
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
      deleteCookie("Authorization");
      deleteCookie("nickname");
      deleteCookie("profileimage");
      deleteCookie("email");
      deleteCookie("password");
      localStorage.removeItem("nickname");
      localStorage.removeItem("token");
      state.userInfo = null;
      state.is_login = false;
    },
    loadToken: (state) => {
      const token = getCookie("Authorization");
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
      state.userInfo = action.payload.user;
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
