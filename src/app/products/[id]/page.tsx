"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import styles from "./page.module.css";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/features/productsSlice";
import { toast } from "react-toastify";
import { BASE_API_URL } from "@/utils/constants";
import { SingleProductType } from "@/types/types";
var _ = require("lodash");

const getProductData = async (id: string) => {
  const res = await fetch(`${BASE_API_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  return res.json();
};

const Product = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<SingleProductType>();
  const dispatch = useDispatch();

  useEffect(() => {
    getProductData(params.id).then((res) => setProduct(res));
  }, []);

  return (
    <div className="bg-pink-100 flex md:flex-row justify-center items-center h-screen w-screen">
      <div
        className={`flex md:w-[90vh] p-3 md:h-[80%] w-[60vh] h-[80vh] flex-col gap-2 md:flex-row ${styles.enter} justify-around items-center bg-slate-100 shadow-lg rounded-3xl`}
      >
        <div className="md:w-1/2 md:h-1/2 w-2/3 h-1/3 relative rounded-2xl bg-red-400">
          {product?.thumbnail && (
            <Image
              src={product?.thumbnail}
              alt=""
              fill
              className="object-cover rounded-xl"
            />
          )}
        </div>
        <div className="flex w-1/3 flex-col md:gap-8 gap-5 text-center md:text-lg text-sm">
          <h1 className="md:text-4xl text-base font-bold">{product?.title}</h1>
          <p className="md:text-base text-xs">{product?.description}</p>
          <h2 className="md:text-2xl text-blue-500 text-base">
            ${product?.price}
          </h2>
          <div
            onClick={() => {
              const id = { _id: _.uniqueId() };
              const newProduct = { ...product, ...id };
              dispatch(addProduct(newProduct));
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
