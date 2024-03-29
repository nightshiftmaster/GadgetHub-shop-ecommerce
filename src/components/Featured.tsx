import React from "react";
import { ProductsType } from "@/types/types";
import Product from "./Product";
import styles from "./components.module.scss";

const Featured = ({ data }: { data: ProductsType }) => {
  return (
    <div
      className="w-full text-center flex justify-center items-center md:text-start"
      data-testid="featured"
    >
      <div className="max-w-[1250px] w-full ">
        <div className=" h-[10%]  flex justify-center items-center">
          <hr className="w-full md:inline hidden h-px bg-gray-300 border-0 rounded "></hr>
          <h1 className="md:text-2xl text-lg text-slate-900 p-10 whitespace-nowrap font-semibold font-sans relative">
            Featured Products
          </h1>
          <hr className="w-full md:inline hidden h-px bg-gray-300 border-0 rounded "></hr>
        </div>

        <div
          className={`flex w-full overflow-auto justify-center gap-2 items-center ${styles.withVerticalCustomScroll}`}
        >
          {data?.slice(0, 30).map((item) => {
            return <Product key={item._id} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Featured;
