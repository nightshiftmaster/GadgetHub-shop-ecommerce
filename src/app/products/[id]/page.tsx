"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import styles from "./page.module.css";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/features/productsSlice";
import { toast } from "react-toastify";
import { BASE_API_URL } from "@/utils/constants";

const getData = async (id: number) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (response) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch");
    }
  } catch {
    throw new Error("Something goes wrong");
  }
};

const Product = async ({ params }: { params: { id: number } }) => {
  const dispatch = useDispatch();
  const product = await getData(params.id);

  return (
    <div className="bg-pink-100 flex md:flex-row justify-center items-center h-screen w-screen">
      <div
        className={`flex md:w-[80vh] md:h-[80%] w-[50vh] h-[70vh] flex-col md:flex-row ${styles.enter} justify-around items-center bg-slate-100 shadow-lg rounded-3xl`}
      >
        <div className="md:w-1/2 md:h-1/3 w-1/3 h-1/4 relative rounded-2xl bg-red-400">
          <Image
            src={product?.thumbnail}
            alt=""
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex w-1/3 flex-col md:gap-8 gap-5 text-center md:text-lg text-sm">
          <h1 className="md:text-4xl text-base font-bold">{product.title}</h1>
          <p className="md:text-lg text-xs">{product.description}</p>
          <h2 className="md:text-2xl text-blue-500 text-base">
            ${product.price}
          </h2>
          <div
            onClick={() => {
              dispatch(addProduct(product));
              toast.success("The product added to the cart !");
            }}
          >
            <Button text="Add To Cart" />
          </div>
          <Link
            href={`${BASE_API_URL}/products`}
            className="text-xs"
          >{`<< Back to Shopping`}</Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
