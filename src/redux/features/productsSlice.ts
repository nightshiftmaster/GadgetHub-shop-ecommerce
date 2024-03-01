import {createSlice} from "@reduxjs/toolkit";
import {SingleProductType} from "@/types/types";

//@Todo: vlad medvede - что такое features папка?, почитай про структуру редакс и подход redux ducks, если один редюсер, назови файл reducers и храни всё там, если много релюсеров и экшэнов
//@Todo: делай папку для каждой сущности скажем для продуктов, в каждой такой папке index.ts и оттуда експортируй всё
//@Todo: филотный експорт тут лучше не делать, експортируемый редюсер должен быть с постоянным именем, а значит експорт лучше сделать именованным
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
  addDeliveryAddress,
  removeProduct,
  removeAllProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
