import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiToken } from "../../shared/apis/Apis";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({ product, status }, thunkAPI) => {
    try {
      const response = await apiToken.post("/api/product/create", product, {
        headers: {
          status,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("creating product error");
    }
  }
);

export const updateItemQuantity = createAsyncThunk(
  "product/updateItemQuantity",
  async ({ productId, productQuantity }, thunkAPI) => {
    try {
      const response = await apiToken.put(
        `/api/product/${productId}/quantity`,
        {
          productQuantity,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("updating item quantity error");
    }
  }
);

export const bringMyItem = createAsyncThunk(
  "product/bringMyItem",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await apiToken.get(`/api/product/${userId}/active`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("bring my item error");
    }
  }
);

const initialState = {
  product: {},
  isLoading: false,
  error: "",
};

export const additionalSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Create Product 상태값에 따른 로직
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //Update Item Quantity 상태값에 따른 로직
      .addCase(updateItemQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product.quantity = action.payload;
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //Bring My Item 상태값에 따른 로직
      .addCase(bringMyItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bringMyItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(bringMyItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default additionalSlice.reducer;
