"use client";

import React from "react";
import AdressForm from "@/app/checkout/checkout-components/AdressForm";
import OrderPayment from "@/app/checkout/checkout-components/OrderPayment";
import { useState } from "react";
import { addUserAdressData } from "@/redux/features/userSlice";
import { useDispatch } from "react-redux";
import Stepper from "./checkout-components/Stepper";

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
        <Stepper step={step} />
        <div className="flex md:w-full w-screen justify-center items-center">
          <Page props={{ nextStep, prevStep }} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
