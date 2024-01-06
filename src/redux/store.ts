import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";
import userReducer from "./features/userSlice";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  timeout: 500,
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({ productsReducer, userReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
