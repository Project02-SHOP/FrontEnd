import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../shared/Cookie";
import { apiToken } from "../../shared/apis/Apis";

export const postOrder = createAsyncThunk(
  "cart/postOrder",
  async (order, thunkAPI) => {
    try {
      await apiToken.post("/api/shop/cart/order", order);

      thunkAPI.dispatch(sendOrder());
    } catch (error) {
      return thunkAPI.rejectWithValue("Error sending order");
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/getCart", 
  async (_, thunkAPI) => {
  try {
    const response = await apiToken.get("/api/mypage/car");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      "카트 정보를 불러오는 도중 오류가 발생하였습니다.",
      error
    );
  }
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product_id, thunkAPI) => {
    try {
      // 서버에 POST 요청을 보내 카트에 상품 추가
      await apiToken.post(`/api/shop/cart/${product_id}`);

      // 성공적으로 추가되었으면 로컬 스토어 업데이트는 서버에서 가져오는 데이터로 처리
      const response = await apiToken.get("/api/mypage/cart");
      return response.data;
    } catch (error) {
      // 오류 발생 시 처리
      return thunkAPI.rejectWithValue(
        "카트에 상품 추가 도중 오류가 발생하였습니다.",
        error
      );
    }
  }
);
//카트 에서 프로덕트 삭제
export const deleteFromCartDB = createAsyncThunk(
  "cart/deleteFromCart",
  async (product_Id, thunkAPI) => {
    try {
      // 카트에서 항목을 삭제하기 위해 서버에 DELETE 요청을 보냅니다
      await apiToken.delete(`/api/shop/cart/${product_Id}`);

      // 성공하면 로컬 상태를 업데이트하기 위한 액션을 디스패치합니다
      thunkAPI.dispatch(cartSlice.actions.deleteFromCart(product_Id));
    } catch (error) {
      // If an error occurs, reject with an error message
      return thunkAPI.rejectWithValue(
        "카트에서 삭제 도중 오류가 발생하였습니다."
      );
    }
  }
);

// 카트 프로덕트 수량 정보 수정
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const response = await apiToken.put(`/api/shop/cart/${productId}`, {
        quantity,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error updating cart item quantity");
    }
  }
);

const initialState = {
  products: [], // 없으면 빈배열을 가져와라
  totalPrice: 0,
  userId: getCookie("nickname") || "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //상품을 cart에서 지워주기
    deleteFromCart: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
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
    extraReducers: (builder) => {
      builder.addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        // 업데이트된 장바구니 정보를 반영
        state.products = action.payload;
        localStorage.setItem("cartProducts", JSON.stringify(state.products));
      });
      builder.addCase(getCart.fulfilled, (state, action) => {
        state.products = action.payload;
        localStorage.setItem("cartProducts", JSON.stringify(state.products));
      });
    },
  },
});

export const { deleteFromCart, sendOrder, getTotalPrice } = cartSlice.actions;

export default cartSlice.reducer;
