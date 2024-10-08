"use client";
import { CiShoppingCart } from "react-icons/ci";
import React from "react";
import { InitialState } from "@/redux/cartSlice";
import { RootState } from "@/redux";
import { useSelector } from "react-redux";

const CartItem = () => {
  const productsSlice: InitialState = useSelector(
    (state: RootState) => state.productsReducer
  );

  return (
    <div className="flex justify-center items-center relative  ">
      <div className="md:hover:text-sky-500 duration-500 flex justify-center items-center">
        <h2 className="hidden md:block uppercase">Cart</h2>
        <CiShoppingCart size={25} />
      </div>

      {productsSlice.quantity === 0 || (
        <div className="bg-yellow-600 absolute w-4 h-4 left-3 md:left-12 bottom-3 flex rounded-full justify-center items-center text-xs">
          {productsSlice.quantity}
        </div>
      )}
    </div>
  );
};

export default CartItem;
