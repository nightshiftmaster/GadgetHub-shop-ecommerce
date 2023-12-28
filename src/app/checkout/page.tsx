"use client";

import React from "react";
import AdressForm from "@/app/checkout/checkout-components/AdressForm";
import OrderPayment from "@/app/checkout/checkout-components/OrderPayment";
import { useState } from "react";
import { addUserAdressData } from "@/redux/features/userSlice";
import { useDispatch } from "react-redux";

const Checkout = () => {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();

  const nextStep = (): void => setStep(step + 1);
  const prevStep = (): void => setStep(step - 1);

  const steps = [AdressForm, OrderPayment];

  const Page = steps[step];

  console.log(step);

  return (
    <div className="flex w-full h-fit justify-center">
      <div className="flex flex-col gap-10 w-1/2 items-center ">
        <div className="bg-gray-50 md:w-[80vh] w-[40vh] font-light uppercase flex justify-around items-center basis-[70px] rounded-b-md shadow-md b border-b-2 border md:text-base text-sm">
          <div className="h-full relative w-1/2 flex justify-center items-center border-t-neutral-900 border-t-2">
            {/* rounnd with number */}
            <div
              className={`flex bg-cyan-500 absolute bottom-[53px] justify-center items-center text-white h-[30px] w-[30px] rounded-full`}
            >
              {step === 0 ? 1 : "✓"}
            </div>
            {/* title */}
            <h1>Your Address</h1>
          </div>
          <div
            className={`h-full relative w-1/2 flex justify-center items-center border-t-neutral-900 ${
              step === 1 && "border-t-2"
            }`}
          >
            {/* rounnd with number */}
            <div
              className={`flex ${
                step === 1 ? "bg-cyan-500" : "bg-zinc-300"
              } absolute bottom-[53px] justify-center items-center text-white h-[30px] w-[30px] rounded-full`}
            >
              2
            </div>
            <h1>Order & Payment</h1>
          </div>
        </div>
        <div>
          <Page props={{ nextStep, prevStep }} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
