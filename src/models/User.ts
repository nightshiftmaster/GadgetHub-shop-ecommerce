import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    img: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    mobileNumber: {
      type: String,
    },

    country: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    orders: {
      type: [Object],
    },
    wishlist: {
      type: [Object],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
