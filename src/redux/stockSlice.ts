import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../models/Product";

interface StockState {
  products: Product[];
}

const initialState: StockState = {
  products: [],
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    confirmProduct(state, action: PayloadAction<string>) {
      const item = state.products.find((p) => p.id === action.payload);
      if (item) {
        item.confirmed = true;
      }
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
});

export const { setProducts, addProduct, removeProduct, confirmProduct, updateProduct } = stockSlice.actions;
export default stockSlice.reducer;
