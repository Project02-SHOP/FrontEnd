import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postOrder = createAsyncThunk(
  "cart/postOrder",
  async (order, thunkAPI) => {
    try {
      await axios.post(
        "https://64ec02e5e51e1e82c577bd81.mockapi.io/orders",
        order
      );

      thunkAPI.dispatch(sendOrder());
    } catch (error) {
      return thunkAPI.rejectWithValue("Error sending order");
    }
  }
);

const initialState = {
  products: localStorage.getItem("cartProducts") // 만약 장바구니에 제품이 있다면 가져오는데
    ? JSON.parse(localStorage.getItem("cartProducts") || "") // Json으로 변환 후 가져와라
    : [], // 없으면 빈배열을 가져와라
  totalPrice: 0,
  userId: localStorage.getItem("userId")
    ? JSON.parse(localStorage.getItem("userId") || "")
    : "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 어떤 user의 cart인지
    setUserId: (state, action) => {
      state.userId = action.payload;

      localStorage.setItem("userId", JSON.stringify(state.userId));
    },
    // userId를 없애주는거
    removeUserId: (state) => {
      state.userId = "";

      localStorage.setItem("userId", JSON.stringify(state.userId));
    },
    //상품을 cart에 넣어주기
    addToCart: (state, action) => {
      state.products.push({
        ...action.payload,
        quantity: 1,
        total: action.payload.price,
      });

      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    //상품을 cart에서 지워주기
    deleteFromCart: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    // cart에 상품을 증가시키기
    incrementProduct: (state, action) => {
      state.products = state.products.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: item.price * (item.quantity + 1),
            }
          : item
      );
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    // cart에 상품을 감소시키기
    decrementProduct: (state, action) => {
      state.products = state.products.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity - 1,
              total: item.price * (item.quantity - 1),
            }
          : item
      );
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
    // 총상품의 가격을 구하기
    getTotalPrice: (state) => {
      state.totalPrice = state.products.reduce(
        (acc, item) => (acc += item.total),
        0
      );

      return state;
    },
    sendOrder: (state) => {
      state.products = [];
      localStorage.setItem("cartProducts", JSON.stringify(state.products));
    },
  },
});

export const {
  addToCart,
  sendOrder,
  deleteFromCart,
  incrementProduct,
  decrementProduct,
  getTotalPrice,
  setUserId,
  removeUserId,
} = cartSlice.actions;

export default cartSlice.reducer;
