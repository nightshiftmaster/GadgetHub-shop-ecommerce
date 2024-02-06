import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SingleProductType } from "@/types/types";

export type InitialState = {
  cart: SingleProductType[];
  quantity: number;
  total: number;
  deliveryAddress: any;
};

const initialState = {
  cart: [],
  quantity: 0,
  total: 0,
  deliveryAddress: {},
} as InitialState;

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      state.cart.push(product);

      state.total += product.price * product.quantity;
      state.quantity += product?.quantity;
    },

    addDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
    },
    removeProduct: (state, action) => {
      const product = state.cart.find(
        (product) => product._id === action.payload
      );
      state.total -= product?.price ? product?.price * product?.quantity : 0;
      const newProducts = state.cart.filter(
        (product) => product._id !== action.payload
      );
      state.cart = newProducts;
      state.quantity -= product?.quantity || 0;
    },
    removeAllProducts: (state) => {
      state.cart = [];
      state.quantity = 0;
      state.total = 0;
      state.deliveryAddress = {};
    },
  },
});

export const {
  addProduct,
  addDeliveryAddress,
  removeProduct,
  removeAllProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
