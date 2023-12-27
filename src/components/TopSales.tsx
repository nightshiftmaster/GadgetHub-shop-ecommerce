import React from "react";
import Product from "@/components/Product";
import { ProductsType } from "@/types/types";

const getData = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (response) {
      const data = await response.json();
      return data.products;
    } else {
      throw new Error("Failed to fetch");
    }
  } catch {
    throw new Error("Something goes wrong");
  }
};

const TopSales = async () => {
  const data: ProductsType = await getData();

  return (
    <div className="w-full flex justify-center items-center">
      <div className="text-center flex flex-col w-[1350px] bg-lime-100 md:text-start">
        <div className="flex items-center justify-center md:w-[50vh]">
          <h1 className="md:text-2xl text-lg text-slate-900 p-10 whitespace-nowrap font-bold relative">
            Top Sales
          </h1>
          <hr className="w-full h-px md:inline hidden  bg-gray-300 border-0 rounded "></hr>
        </div>
        <div className="flex flex-wrap text-sm flex-1  justify-center items-center">
          {data?.slice(0, 20).map((item) => {
            return <Product key={item.id} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TopSales;
