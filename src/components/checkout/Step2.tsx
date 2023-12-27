"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { InitialState } from "@/redux/features/productsSlice";
import { ErrorMessage, Field, Form } from "formik";
import { VisaPaymentFormValues, VisaPaymentFormTouched } from "@/types/types";
import { loadStripe } from "@stripe/stripe-js";
import Terms from "./Terms";
import getStripe from "@/utils/get-stripejs";
import PayComponent from "../PayComponent";

const Step2 = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const productsSlice: InitialState = useSelector(
    (state: RootState) => state.productsReducer
  );

  return (
    <div className="h-full w-full flex justify-center  items-center ">
      <div className="w-[90%] justify-center items-center h-fit flex flex-col ">
        <div className="flex flex-col mb-5 w-full h-full gap-10 justify-center items-center">
          <div className="flex justify-between md:text-lg text-sm w-[75%] p-7 border-b-2 border-gray-200 font-bold">
            <h1>Product</h1>
            <h1>Total</h1>
          </div>

          <div className="w-full h-full flex justify-center flex-col items-center ">
            {/* products */}
            <div className="w-full md:h-fit max-h-[30vh] mb-10 overflow-scroll flex justify-start items-center md:gap-8 gap-6 flex-col">
              {productsSlice.cart.map((item) => {
                return (
                  <div
                    className="flex justify-start p-2 gitems-center md:w-[70%] w-full border-b-2 "
                    key={item.id}
                  >
                    <div className="flex justify-between md:gap-10 gap-3 w-full ">
                      <div className="flex justify-between items-center gap-5 md:gap-15 md:text-base text-sm">
                        <div className="relative md:h-16 md:w-16 h-12 w-12">
                          <Image
                            src={item.thumbnail}
                            fill
                            className="rounded-full"
                            alt=""
                          />
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
            <div className="flex flex-col gap-7 w-full justify-center items-center">
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
              <div className="flex gap-3">
                <label>
                  {/* {props.values.termsAndConditions} */}
                  <Field
                    onClick={() => setTermsChecked(!termsChecked)}
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
                    <h1 className="text-3xl font-semibold">Invoice</h1>
                    <PayComponent />
                    {/* <div className="flex flex-row justify-between">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={() => prevStep()}
                        className="uppercase md:p-3 text-xs md:text-base p-2 md:w-[40%] w-1/3 text-white bg-fuchsia-400"
                      >
                        Previous
                      </button>

                     
                    </div> */}
                    <button
                      type="submit"
                      className="uppercase md:p-3 p-2 text-xs md:text-base text-white bg-red-400 md:w-[40%] w-1/3"
                    >
                      pay order
                    </button>
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

export default Step2;
