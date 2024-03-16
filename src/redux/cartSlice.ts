import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
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
      const productInCart = state.cart.some((item) => item._id === product._id);

      if (productInCart) {
        state.cart.map((item) => {
          return item._id === product._id
            ? {
                ...product,
                ...(item.quantity += product.quantity),
                ...{ price: item.price },
              }
            : product;
        });

        state.total += product.price * product.quantity;
        state.quantity += product.quantity;
      } else {
        state.cart.push(product);
        state.total += product.price * product.quantity;
        state.quantity += product?.quantity;
      }
    },
    changeProductCount: (state, action) => {
      const { _id, count } = action.payload;

      state.cart.map((item) => {
        if (item._id === _id) {
          switch (count) {
            case 1:
              state.total += item.price;
              state.quantity += 1;
              break;
            case -1:
              state.total -= item.price;
              state.quantity -= 1;
              break;
            default:
              state.total += 0;
              state.quantity += 0;
              break;
          }
          return {
            ...item,
            ...(item.quantity += count),
            ...{ price: item.price * count },
          };
        }
      });
    },

    addDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
    },
    removeProduct: (state, action) => {
      const product = state.cart.find(
        (product) => product._id === action.payload
      );
      state.total -= product?.price ? product?.price * product?.quantity : 0;
      state.cart = state.cart.filter(
        (product) => product._id !== action.payload
      );
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
  changeProductCount,
  addDeliveryAddress,
  removeProduct,
  removeAllProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
