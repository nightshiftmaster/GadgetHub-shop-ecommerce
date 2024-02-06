import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { MyFormValues } from "@/types/types";

const initialState = {
  firstName: "",
  lastName: "",
  mobileNumber: "",
  email: "",
  address: "",
  city: "",
  country: "",
  additionalInfo: "",
} as MyFormValues;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addShippingAdressData: (state, action) => {
      (Object.keys(action.payload) as Array<keyof typeof initialState>).map(
        (key) => (state[key] = action.payload[key])
      );
    },

    removeUserData: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.mobileNumber = "";
      state.email = "";
      state.address = "";
      state.city = "";
      state.country = "";
      state.additionalInfo = "";
    },
  },
});

export const { addShippingAdressData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
