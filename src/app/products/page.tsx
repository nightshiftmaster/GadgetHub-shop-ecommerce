"use client";
import React, { useEffect, useState } from "react";
import Product from "@/components/Product";
import { ProductsType } from "@/types/types";
import { fetchData } from "@/utils/fetchData";
import Select from "react-select";
import { array, object } from "yup";

const options = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting",
].reduce((acc: Array<{ value: string; label: string }>, item: string) => {
  const option = { value: item, label: item };
  acc.push(option);
  return acc;
}, []);

const Products = () => {
  const [category, setCategory] = useState("");
  const [data, setData] = useState<ProductsType>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData(category)
      .then((res) => setData(res))
      .catch((e) => setError(e.message));
  }, [category]);

  return (
    <div className="w-full h-full flex justify-center items-center  ">
      <div className="flex flex-col md:gap-14 gap-8 justify-center items-center w-[1500px] ">
        <div className="flex md:flex-row flex-col w-[90%] justify-between items-center ">
          <div className="flex items-center justify-between md:w-[40vh]">
            <h1 className="md:text-2xl text-lg text-slate-900 p-10 whitespace-nowrap font-bold relative">
              New Arrivals
            </h1>
            <hr className="w-full h-px lg:inline hidden  bg-gray-300 border-0 rounded "></hr>
          </div>
          <div className="flex md:flex-row flex-col justify-center items-center whitespace-nowrap gap-5 md:w-1/3 w-full">
            <h2 className="md:text-base text-sm">Browse By Category</h2>
            <Select
              options={options}
              className="capitalize md:text-base text-sm  w-1/2"
              onChange={(e) => {
                e && setCategory(e.value);
              }}
            />
          </div>
        </div>
        {error ? (
          <div className="text-red-500 text-center text-xl mt-20">
            Please check your network and try again !
          </div>
        ) : (
          <div className="flex flex-wrap text-sm flex-1 gap-2 justify-center items-center">
            {data?.map((item, i) => {
              return <Product key={item.id} {...item} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
