"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import styles from "./page.module.css";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/features/productsSlice";
import { toast } from "react-toastify";

import useSWR from "swr";
import { fetcher } from "@/utils/fetcherSwr";
import Loading from "@/components/Loader";
import { useRouter } from "next/navigation";
var _ = require("lodash");

const Product = ({ params }: { params: { id: string } }) => {
  const [mainImg, setMainImg] = useState("");
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();

  const { data, isLoading } = useSWR(`/api/products/${params.id}`, fetcher);

  useEffect(() => {
    if (data) {
      setMainImg(data?.thumbnail);
    }
    return;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-pink-100 flex md:flex-row justify-center items-center h-screen w-screen">
      <div
        className={`flex md:w-[90%] max-w-[1250px] p-3 xl:h-[80%] md:h-fill w-[60vh] h-[90vh] flex-col md:gap-2  md:flex-row ${styles.enter} justify-around items-center bg-slate-100 shadow-lg rounded-xl`}
      >
        <div className="md:w-[40%] md:shadow-md md:h-[60%] w-[80%] h-1/3 flex flex-col gap-3 relative rounded-md ">
          <div className="md:w-full md:h-full w-full h-full relative ">
            {/* main image */}

            <Image
              src={mainImg}
              alt="tumbnail"
              fill
              className="transition-opacity duration-1000 opacity-100 rounded-t-md"
            />
          </div>
          {data?.images.length < 2 || (
            <div className="h-1/2 md:flex hidden transition-opacity gap-2 justify-start items-start w-full duration-500 opacity-100 overflow-scroll rounded-b-md">
              {data?.images.map((item: string, i: number) => {
                return (
                  <img
                    key={i}
                    src={item}
                    alt=""
                    className="object-cover grow h-full w-32  hover:opacity-50  hover:scale-110 transition-all duration-700"
                    onClick={() => {
                      setMainImg(item);
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* desc */}
        <div className="flex md:w-1/2 w-[80%] h-[70%] md:shadow-sm bg-gray-50  md:h-[60%] md:border-2 justify-center  rounded-md  p-12  flex-col md:gap-10 gap-5 text-center md:text-base text-xs">
          <h1 className="lg:text-2xl md:text-xl text-xs font-bold">
            {data?.title}
          </h1>
          <p className="lg:text-base md:text-sm text-xs">{data?.description}</p>
          <div className="flex justify-center items-center  gap-14 ">
            {/* quantity counter */}
            {/* <div className="flex h-full w-full justify-center items-center"> */}
            <div className="w-[15vh] md:h-10 h-8 flex  justify-between text-gray-500 text-sm rounded-md border cursor-pointer ">
              <span
                className="border-r p-1 px-3 flex justify-center items-center hover:bg-sky-400 hover:text-white hover:rounded-l-md transition-all duration-500"
                onClick={() =>
                  setCount((prev: number) => (prev > 1 ? prev - 1 : prev))
                }
              >
                -
              </span>
              <span className="p-2 flex justify-center items-center">
                {count}
              </span>
              <span
                className="border-l p-1 px-3 flex justify-center items-center  hover:bg-sky-400 hover:text-white hover:rounded-r-md transition-all duration-500"
                onClick={() =>
                  setCount((prev: number) => (prev < 9 ? prev + 1 : prev))
                }
              >
                +
              </span>
            </div>
            <div className="w-1/5 ">
              <h2 className="md:text-xl text-blue-500 text-base font-medium">
                ${data?.price * count}
              </h2>
            </div>
            {/* </div> */}
          </div>

          <div className="text-xs whitespace-nowrap md:sm flex md:flex-row flex-col md:gap-10 gap-4 justify-center items-center ">
            <button
              onClick={() => {
                const id = { _id: _.uniqueId() };
                const quantity = { quantity: count };
                const newProduct = { ...data, ...id, ...quantity };

                dispatch(addProduct(newProduct));
                toast.success("The product added to the cart !");
              }}
              className="uppercase  md:w-[45%] w-[50%] py-3  rounded-lg bg-fuchsia-400 text-white hover:scale-110 transition-all duration-500"
            >
              Add To Cart
            </button>
            {/* <Button text="Add To Cart" /> */}
            <button
              className="uppercase  md:w-[45%] w-[50%] py-3  rounded-lg bg-sky-400 text-white hover:scale-110 transition-all duration-500"
              onClick={() => {
                const id = { _id: _.uniqueId() };
                const quantity = { quantity: count };
                const newProduct = { ...data, ...id, ...quantity };
                dispatch(addProduct(newProduct));
                router.push("/cart");
              }}
            >
              Buy now
            </button>
          </div>

          <button
            onClick={() => router.back()}
            className="text-xs"
          >{`<< Back`}</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
