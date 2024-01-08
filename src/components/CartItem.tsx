"use client";
import { CiShoppingCart } from "react-icons/ci";
import React from "react";
import { InitialState } from "@/redux/features/productsSlice";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const CartItem = () => {
  const productsSlice: InitialState = useSelector(
    (state: RootState) => state.productsReducer
  );

  return (
    <div className="flex justify-center items-center">
      <CiShoppingCart size={25} />

      {productsSlice.quantity === 0 || (
        <div className="bg-yellow-600 w-5 h-5 flex rounded-full justify-center items-center text-xs">
          {productsSlice.quantity}
        </div>
      )}
    </div>
  );
};

export default CartItem;
