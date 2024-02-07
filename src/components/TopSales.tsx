import React from "react";
import Product from "@/components/Product";
import { ProductsType, SingleProductType } from "@/types/types";
import { useRouter } from "next/navigation";

const TopSales = ({ data }: { data: ProductsType }) => {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center items-center">
      <div className="text-center flex flex-col w-[1250px] bg-lime-50 md:text-start pb-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-start w-[80%]">
            <h1 className="md:text-2xl text-lg text-slate-900 p-10 whitespace-nowrap font-semibold font-sans relative">
              Top Sales
            </h1>

            <hr className="w-1/3 h-px md:inline hidden  bg-gray-300 border-0 rounded "></hr>
          </div>

          <h1
            className="text-xs font-medium cursor-pointer text-slate-900 p-10 whitespace-nowrap relative"
            onClick={() =>
              router.push(`/products?filter=${"topSales"}&name=${"Top Sales"}`)
            }
          >
            {`View All >>`}
          </h1>
        </div>
        <div className="flex flex-wrap text-sm flex-1 gap-2  justify-center items-center">
          {data?.slice(0, 14).map((item: SingleProductType, i) => {
            return <Product key={i} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TopSales;
