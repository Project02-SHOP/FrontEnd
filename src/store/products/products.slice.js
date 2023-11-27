import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiToken } from "../../shared/apis/Apis";

// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async (category, thunkAPI) => {
//     // console.log(thunkAPI);

//     try {
//       let response;

//       if (category) {
//         response = await axios.get(
//           `https://fakestoreapi.com/products/category/${category}` //카테고리를 선택했다면
//         );
//       } else {
//         response = await axios.get("https://fakestoreapi.com/products"); //카테고리를 선택하지 안했다면
//       }

//       // console.log('@@@', response)
//       return response.data; //payload
//     } catch (error) {
//       thunkAPI.rejectWithValue("Error loading products");
//     }
//   }
// );

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (thunkAPI) => {
    try {
      const response = await apiToken.get("/api/shop/product"); //전체 상품 불러오기
      return response.data; //payload
    } catch (error) {
      thunkAPI.rejectWithValue("Error loading products");
    }
  }
);

const initialState = {
  products: [],
  isLoading: false,
  error: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  //reducer를 추가하면 프로미스의 진행 상태에 따라서 리듀서를 실행할 수 있습니다.
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        // 다가져옴
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
