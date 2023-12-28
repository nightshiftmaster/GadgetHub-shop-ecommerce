"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeAllProducts } from "@/redux/features/productsSlice";
import { runFireWorks } from "../../utils/confetti";

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeAllProducts());
    runFireWorks();
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-1/2 h-1/2 text-lg font-semibold flex justify-center flex-col gap-10 items-center bg-slate-200 rounded-2xl">
        <p>
          <BsBagCheckFill size={150} color="green" />
        </p>
        <h2 className="text-3xl font-bold">Thank you for your order !</h2>
        <p className="">Check your email inbox for the receipt.</p>
        <p>
          If you have any questions, please email {"     "}
          <a className="text-red-500" href="mailto:nightshiftmaster@gmail.com">
            nightshiftmaster@gmail.com
          </a>
        </p>
        <Link href="/">
          <button
            className="uppercase w-[500px] p-5 text-white text-xl bg-red-500 rounded-3xl"
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
