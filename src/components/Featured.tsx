import React from "react";
import { ProductsType } from "@/types/types";
import Product from "./Product";
import { fetchData } from "@/utils/fetchData";

const Featured = async () => {
  try {
    const data: ProductsType = await fetchData();

    return (
      <div className="w-full overflow-scroll  text-center flex justify-center items-center md:text-start">
        <div className="md:w-[1350px] w-[400px]">
          <div className="flex items-center justify-center md:w-[50vh]">
            <h1 className="md:text-2xl text-lg p-10 whitespace-nowrap font-bold">
              Featured Products
            </h1>
            <hr className="w-full md:inline hidden h-px bg-gray-300 border-0 rounded "></hr>
          </div>
          <div className="flex border  overflow-scroll border-gray-200 justify-center gap-3 items-center ">
            {data?.slice(0, 30).map((item) => {
              return <Product key={item.id} {...item} />;
            })}
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.log();
  }
};

export default Featured;
