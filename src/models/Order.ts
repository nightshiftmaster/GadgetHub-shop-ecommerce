import mongoose from "mongoose";

import { Schema } from "mongoose";
import { productSchema } from "./Product";

export const orderSchema = new Schema(
  {
    _id: {
      type: String,
    },
    total: {
      type: Number,
    },
    createdAt: {
      type: String,
    },
    order: {
      type: [productSchema],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
