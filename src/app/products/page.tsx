"use client";
import React, { useEffect, useState } from "react";
import Product from "@/components/Product";
import { ProductsType } from "@/types/types";
import { fetchData } from "@/utils/fetchData";

const categories = [
  "all",
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
];

const Products = () => {
  const [category, setCategory] = useState("all");
  const [data, setData] = useState<ProductsType>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData(category)
      .then((res) => setData(res))
      .catch((e) => setError(e.message));
  }, [category]);

  return (
    <div className="w-full h-full flex justify-center items-center  ">
      <div className="flex flex-col gap-16 justify-center items-center w-[1500px] ">
        <div className="flex flex-col justify-center items-center gap-6">
          <h2 className="">Browse By Category</h2>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
            className=" text-gray-600 p-2 text-base rounded-lg outline-1 outline w-[40vh] "
            id="genres"
          >
            {categories.map((category: string, i: number) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {error ? (
          <div className="text-red-500 text-center text-xl mt-20">
            Please check your network and try again !
          </div>
        ) : (
          <div className="flex flex-wrap text-sm flex-1 justify-center items-center">
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
