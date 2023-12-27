"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Step1 from "@/components/checkout/Step1";
import Step2 from "@/components/checkout/Step2";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const PersonalDataSchema = Yup.object().shape({
  firstName: Yup.string().required("Please fill out this field"),
  lastName: Yup.string().required("Please fill out this field"),
  mobileNumber: Yup.number()
    .typeError("invalid mobile number")
    .required("Please fill out this field"),
  emailAdress: Yup.string()
    .email("Invalid email")
    .required("Please fill out this field"),
  deliveryAdress: Yup.string().required("Please fill out this field"),
  cityName: Yup.string().required("Please fill out this field"),
  country: Yup.string().required("Please fill out this field"),
  additionalInfo: Yup.string(),
});

const CheckOut = () => {
  const { status } = useSession();
  const router = useRouter();
  const userSlice = useSelector((state: RootState) => state.userReducer);

  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <div className="flex w-full h-fit justify-center">
      <Formik
        initialValues={{
          firstName: userSlice?.firstName,
          lastName: userSlice?.lastName,
          mobileNumber: userSlice?.mobileNumber,
          emailAdress: userSlice?.emailAdress,
          deliveryAdress: userSlice?.deliveryAdress,
          cityName: userSlice?.cityName,
          country: userSlice?.country,
          additionalInfo: userSlice?.additionalInfo,
        }}
        validationSchema={PersonalDataSchema}
        onSubmit={() => {
          console.log("submitted from formik");
        }}
      >
        {(formikProps) => {
          return (
            <div className="flex flex-col gap-7 w-1/2 items-center ">
              <div className="bg-gray-50 md:w-[80vh] w-[40vh] font-light uppercase flex justify-around items-center basis-[70px] rounded-b-md shadow-md b border-b-2 border md:text-base text-sm">
                <div className="h-full relative w-1/2 flex justify-center items-center border-t-neutral-900 border-t-2">
                  {/* rounnd with number */}
                  <div
                    className={`flex bg-cyan-500 absolute bottom-[53px] justify-center items-center text-white h-[30px] w-[30px] rounded-full`}
                  >
                    {step === 1 ? 1 : "✓"}
                  </div>
                  {/* title */}
                  <h1>Your Address</h1>
                </div>
                <div
                  className={`h-full relative w-1/2 flex justify-center items-center border-t-neutral-900 ${
                    step === 2 && "border-t-2"
                  }`}
                >
                  {/* rounnd with number */}
                  <div
                    className={`flex ${
                      step === 2 ? "bg-cyan-500" : "bg-zinc-300"
                    } absolute bottom-[53px] justify-center items-center text-white h-[30px] w-[30px] rounded-full`}
                  >
                    2
                  </div>
                  <h1>Order & Payment</h1>
                </div>
              </div>
              <Form className="flex flex-col md:gap-20 gap-5 justify-center items-center md:w-[85vh] w-[40vh] md:text-base text-sm">
                {step === 1 && <Step1 props={{ ...formikProps, nextStep }} />}
                {step === 2 && <Step2 />}
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default CheckOut;
