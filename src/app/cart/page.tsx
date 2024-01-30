"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { InitialState } from "@/redux/features/productsSlice";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { removeProduct } from "@/redux/features/productsSlice";
import { useDispatch } from "react-redux";
import { BASE_API_URL } from "@/utils/constants";

const Cart = () => {
  const dispatch = useDispatch();
  const productsSlice: InitialState = useSelector(
    (state: RootState) => state.productsReducer
  );
  const products = productsSlice.cart;

  return (
    <div className="h-screen flex justify-center items-center bg-slate-50  ">
      {products?.length === 0 ? (
        <div className="absolute h-full w-screen top-0 left-0">
          <div className="flex h-full flex-col justify-center mt-14 items-center gap-2">
            <MdOutlineRemoveShoppingCart size={90} />
            <h1 className="md:text-3xl text-xl">Cart is empty</h1>
          </div>
        </div>
      ) : (
        <div className="md:w-[120vh] w-[70vh] shadow-lg bg-white h-fit  flex md:flex-row flex-col border-2 border-slate-200 rounded-lg">
          <div className="flex flex-col mb-5  md:w-1/2 w-full h-full p-5 gap-2 md:gap-10 justify-center items-center">
            <div className="flex justify-around w-full  xl:gap-20 md:text-base xl:text-lg text-sm gap-40 md:w-full  p-7 border-b-2 border-gray-200 font-bold">
              <h1>Product</h1>
              <h1>Price</h1>
            </div>

            <div
              className={` md:h-[50vh] w-full h-[30vh] flex justify-center ${
                products.length > 3 ? "items-start" : "items-center"
              }  overflow-scroll`}
            >
              <div className="flex md:gap-16 gap-12 w-full flex-col md:mt-1 mt-10 items-center justify-center">
                {products?.map((item) => {
                  return (
                    <div
                      className="flex  justify-between gap-32 md:gap-40 border-b-2 "
                      key={item._id}
                    >
                      <div className="flex justify-between items-center md:gap-10 w-[17vh] md:w-[20vh] gap-5 ">
                        <div className="flex justify-between items-center gap-5 md:gap-15 md:text-base text-xs">
                          <div className="relative xl:h-16 xl:w-16 md:h-16 md:w-16 h-10 w-10">
                            {item.thumbnail && (
                              <Image
                                src={item.thumbnail}
                                fill
                                className="rounded-full"
                                alt=""
                              />
                            )}
                          </div>
                          <h1 className="overflow-hidden font-semibold md:text-sm text-xs w-20 md:w-32">
                            {item.title}
                          </h1>
                        </div>
                        <div className="flex text-red-500 justify-center items-center">
                          <span
                            onClick={() => dispatch(removeProduct(item._id))}
                            className="cursor-pointer"
                          >
                            x
                          </span>
                        </div>
                      </div>

                      <div className=" flex-1 flex justify-center items-center">
                        <h1 className=" text-blue-500  font-semibold md:text-sm text-xs">
                          ${item.price}
                        </h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* cart */}
          <div className="bg-orange-100  flex md:justify-around justify-center flex-col items-center md:w-1/2 w-full md:rounded-r-lg rounded-b-lg p-5">
            <div className="flex flex-col  md:gap-14 gap-7 md:w-1/2 w-full h-1/2  md:text-base text-sm text-red-500 justify-center items-center">
              <h1 className="text-black text-center font-bold">CART TOTALS</h1>
              <hr className="w-full border-slate-300 border  "></hr>
              <div className="flex justify-between w-full  ">
                <h1 className="font-semibold md:text-base text-sm">Subtotal</h1>
                <h1>${productsSlice?.total}</h1>
              </div>
              <div className="flex justify-between w-full md:text-base text-sm">
                <h1 className="font-semibold ">Service Cost</h1>
                <h1>$0</h1>
              </div>
              <div className="flex justify-between text-base w-full font-bold ">
                <h1 className="font-bold ">Total(incl.vat)</h1>
                <h1>${productsSlice?.total}</h1>
              </div>
              <div className="flex flex-col gap-6 text-center justify-center items-center mt-5">
                <Link href="/checkout">
                  <button className="text-white  whitespace-nowrap p-3 text-xs lg:p-3 lg:px-10 text-center  md:text-sm  rounded-md bg-fuchsia-400   hover:scale-110 transition-all duration-500">
                    PROCEED TO CHECKOUT
                  </button>
                </Link>

                <Link
                  href={`${BASE_API_URL}/products`}
                  className="text-gray-500  md:text-sm lg:text-sm text-xs"
                >{`<< Back to Shopping`}</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
