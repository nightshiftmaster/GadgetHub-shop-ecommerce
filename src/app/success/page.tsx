"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeAllProducts } from "@/redux/features/productsSlice";
// import { runFireWorks } from "../../utils/confetti";
import { RootState } from "@/redux/store";
import { InitialState } from "@/redux/features/productsSlice";

const Success = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userReducer);
  const orderData = useSelector((state: RootState) => state.productsReducer);

  console.log(userData);
  console.log(orderData);

  useEffect(() => {
    const sendMail = async () => {
      await fetch("api/email", {
        method: "POST",
        body: JSON.stringify({
          delivery: userData,
          order: orderData,
        }),
      });
    };
    sendMail();
    dispatch(removeAllProducts());
    // runFireWorks();
  }, [dispatch, orderData, userData]);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-pink-50">
      <div className="w-[70%] h-[70%] p-20 text-lg font-semibold flex justify-center flex-col md:gap-20  gap-10 shadow-lg items-center bg-slate-100 rounded-2xl">
        <p>
          <BsBagCheckFill size={120} color="green" />
        </p>
        <h2 className="md:text-3xl text-sm font-bold text-center text-blue-500">
          Thank you for your order !
        </h2>
        <p className="md:text-base text-xs whitespace-nowrap">
          Check your email inbox for the receipt.
        </p>
        <p className="md:text-base text-xs text-center">
          If you have any questions, please email {"     "}
          <a className="text-red-500" href="mailto:nightshiftmaster@gmail.com">
            nightshiftmaster@gmail.com
          </a>
        </p>
        <Link href="/">
          <button
            className="uppercase w-fit md:p-6 p-3  text-white md:text-xl text-xs whitespace-nowrap bg-fuchsia-400 rounded-3xl"
            type="button"
          >
            Continue shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
