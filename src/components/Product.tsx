"use client";
import React, { useEffect } from "react";
import { SingleProductType } from "../types/types";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, InitialState } from "@/redux/features/productsSlice";
import { AppDispatch } from "@/redux/store";
import styles from "./page.module.css";
import { toast } from "react-toastify";
import { BASE_API_URL } from "@/utils/constants";

//handle delete
var _ = require("lodash");

const Product = (props: SingleProductType) => {
  const dispatch = useDispatch<AppDispatch>();
  const { title, thumbnail, price } = props;
  return (
    <div
      className={`relative ${styles.enter} bg-white flex flex-col  justify-start  items-center p-1 border  group`}
    >
      <div className="flex flex-col h-[235px] w-[160px] gap-3 justify-start items-center   md:gap-1  p-2 ">
        {/* <div className="flex h-1/2"> */}
        <div className="h-full w-full hover:opacity-70 flex relative bg-red-300 rounded-md">
          <Link
            href={`${BASE_API_URL}/products/${props.id}`}
            className="flex w-[100%] h-1/2"
          >
            <Image
              src={props.thumbnail}
              alt=""
              fill
              className="object-cover hover:scale-105 transition-all duration-700 rounded-md"
            />
          </Link>
        </div>

        {/* price + name */}
        <div className="flex flex-col justify-center  items-center md:gap-3 gap-3 p-1 text-center md:h-1/2 h-1/3 group w-full flex-1 ">
          <hr className="w-[10vh]  h-px bg-gray-300 border-0 mt-1  "></hr>
          <h1 className="flex justify-center text-ellipsis group-hover:invisible overflow-hidden w-2/3 items-start lg:text-lg text-xs font-medium basis-8 shrink-0 ">
            {props.title}
          </h1>
          <h2 className="md:text-base flex  justify-center group-hover:invisible text-blue-500 items-center font-semibold text-xs basis-5 shrink ">
            ${props.price}
          </h2>
        </div>
      </div>
      <div
        className={`hidden absolute ${styles.entrance} md:bottom-8 bottom-4  group-hover:block`}
        onClick={() => {
          const id = _.uniqueId();
          dispatch(addProduct({ id, title, thumbnail, price }));
          toast.success("The product added to the cart !");
        }}
      >
        <Button text="Add To Cart" />
      </div>
    </div>
  );
};

export default Product;
