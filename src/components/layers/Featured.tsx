import React from "react";
import { ProductsType } from "@/types/types";
import Product from "../Product";
import { BASE_API_URL } from "@/utils/constants";

const Featured = ({ data }: { data: ProductsType }) => {
  return (
    <div className="w-full text-center flex justify-center items-center md:text-start">
      <div className="max-w-[1250px] w-full ">
        <div className="flex items-center justify-center md:w-[70vh]">
          <h1 className="md:text-2xl text-lg p-10 whitespace-nowrap font-bold">
            Featured Products
          </h1>
          <hr className="w-full md:inline hidden h-px bg-gray-300 border-0 rounded "></hr>
        </div>

        <div className="flex w-full overflow-scroll justify-center gap-2 items-center">
          {data?.slice(0, 30).map((item) => {
            return <Product key={item._id} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Featured;
