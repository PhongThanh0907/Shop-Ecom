import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../../types/product.type";

interface ProductsState {
  data: Product[];
  isLoading: boolean;
  error: string;
}

const initialState: ProductsState = {
  data: [],
  isLoading: false,
  error: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getListProduct: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { getListProduct } = productSlice.actions;
export default productSlice.reducer;
