"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { InitialState } from "@/redux/features/productsSlice";
import Terms from "./Terms";
import PayComponent from "./PayComponent";

const OrderPayment = ({ props }: { props: any }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const productsSlice: InitialState = useSelector(
    (state: RootState) => state.productsReducer
  );

  return (
    <div className="w-[90%]  flex justify-center md:shadow-lg  items-center  rounded-xl md:p-10 p-4">
      <div className="md:w-[90%] w-full md:text-lg text-xs justify-center items-center h-fit flex flex-col ">
        <div className="flex flex-col  mb-5 w-full h-full gap-10 justify-center items-center">
          <div className="flex justify-between  w-full md:w-[73%] p-7 border-b-2 border-gray-200 font-bold">
            <h1>Product</h1>
            <h1>Total</h1>
          </div>

          <div className="w-full h-full flex justify-center flex-col items-center ">
            {/* products */}
            <div className="w-full md:h-fit max-h-[30vh] mb-10 overflow-scroll flex justify-start items-center md:gap-8 gap-6 flex-col">
              {productsSlice.cart.map((item) => {
                return (
                  <div
                    className="flex justify-start p-2 items-center md:w-[70%] w-full border-b-2 "
                    key={item._id}
                  >
                    <div className="flex justify-between md:gap-10 gap-3 w-full ">
                      <div className="flex justify-between items-center gap-5 md:gap-15 md:text-base text-xs">
                        <div className="relative md:h-16 md:w-16 h-10 w-10">
                          {item.thumbnail && (
                            <Image
                              src={item.thumbnail}
                              fill
                              className="rounded-full"
                              alt="item image"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          )}
                        </div>
                        <h1 className="">{item.title}</h1>
                      </div>
                      <div className="flex text-red-500 justify-center items-center"></div>
                    </div>

                    <div className="flex justify-center items-center">
                      <h1 className="md:text-base  text-stone-500 text-sm">
                        ${item.price}
                      </h1>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* totals */}
            <div className="flex flex-col gap-7 w-full h-full md:text-base text-sm justify-center items-center">
              <div className="flex justify-between md:w-[70%] w-full border-b-2 py-5">
                <h1 className="font-semibold">Subtotal</h1>
                <h1 className="text-blue-500">${productsSlice.total}</h1>
              </div>
              <div className="flex justify-between md:w-[70%] w-full border-b-2  py-5">
                <h1 className="font-semibold">Shipping</h1>
                <h1 className="text-green-500">Free</h1>
              </div>
              <div className="flex justify-between md:w-[70%] w-full border-b-2 py-5 ">
                <h1 className="font-bold text-lg">Total(incl.vat)</h1>
                <h1 className="text-blue-500">${productsSlice.total}</h1>
              </div>
            </div>
            {/* payment */}
            <div className="flex flex-col gap-10 md:w-[70%] w-full mt-10 justify-start items-start">
              <div
                className={`${
                  isOpen
                    ? "h-[20vh] overflow-auto"
                    : "h-0 overflow-hidden ease-out"
                } transition-all duration-500`}
              >
                <Terms />
              </div>
              <div className="flex gap-3 md:text-base text-sm">
                <label>
                  {/* {props.values.termsAndConditions} */}
                  <input
                    onChange={() => setTermsChecked(!termsChecked)}
                    type="checkbox"
                    checked={termsChecked}
                    name="termsAndConditions"
                  />
                </label>
                <span className="cursor-pointer">
                  Yes I have read and agree to the website
                  {"     "}
                  <div className="font-bold" onClick={() => setOpen(!isOpen)}>
                    terms and conditions, privacy policy, returns & refunds.
                  </div>
                </span>
              </div>

              {termsChecked && (
                <div className="flex flex-col w-full">
                  <div className="flex gap-8 flex-col w-full">
                    <PayComponent props={{ ...props }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPayment;
