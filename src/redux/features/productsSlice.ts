import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SingleProductType } from "@/types/types";

export type InitialState = {
  cart: SingleProductType[];
  quantity: number;
  total: number;
};

const initialState = {
  cart: [],
  quantity: 0,
  total: 0,
} as InitialState;

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      state.cart.push(product);
      state.total += product.price;
      state.quantity += 1;
    },
    removeProduct: (state, action) => {
      const product = state.cart.find(
        (product) => product.id === action.payload
      );
      state.total -= product?.price || 0;
      const newProducts = state.cart.filter(
        (product) => product.id !== action.payload
      );
      state.cart = newProducts;
      state.quantity -= 1;
    },
    removeAllProducts: (state) => {
      state.cart = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct, removeAllProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
