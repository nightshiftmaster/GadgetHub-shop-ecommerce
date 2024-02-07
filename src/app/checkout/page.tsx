"use client";
import React from "react";
import AdressForm from "@/app/checkout/components/AdressForm";
import OrderPayment from "@/app/checkout/components/OrderPayment";
import { useState } from "react";
import Stepper from "./components/Stepper";

const Checkout = () => {
  const [step, setStep] = useState(0);

  const nextStep = (): void => setStep(step + 1);
  const prevStep = (): void => setStep(step - 1);

  const steps = [AdressForm, OrderPayment];

  const Page = steps[step];

  return (
    <div className="flex w-full h-full justify-center">
      <div className="flex flex-col gap-10 w-full justify-center items-center ">
        <Stepper step={step} />
        <div className="flex w-full  justify-center items-center">
          <Page props={{ nextStep, prevStep }} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
