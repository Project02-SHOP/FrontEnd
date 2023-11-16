import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../shared/apis/Apis";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (thunkAPI) => {
    try {
      const response = await api.post("/api/sell/create");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error creating product");
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
      });
  },
});

export default additionalSlice.reducer;
