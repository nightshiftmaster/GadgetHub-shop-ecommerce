import React from "react";
import Product from "@/components/Product";
import { ProductsType } from "@/types/types";
import { useRouter } from "next/navigation";

const NewArrivals = ({ data }: { data: ProductsType }) => {
  const router = useRouter();

  return (
    <div
      className="w-full flex justify-center items-center"
      data-testid="new-arivals"
    >
      <div className="text-center flex flex-col w-[1250px] bg-pink-50 md:text-start pb-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-start w-[80%]">
            <h1 className="md:text-2xl text-lg text-slate-900 font-semibold font-sans p-10 whitespace-nowrap relative">
              New Arrivals
            </h1>

            <hr className="w-1/3 h-px md:inline hidden  bg-gray-300 border-0 rounded "></hr>
          </div>
          <h1
            className="text-xs font-medium cursor-pointer text-slate-900 p-10 whitespace-nowrap relative"
            data-testid="view-all-top-arrivals"
            onClick={() => router.push(`/products?filter=${"newArrivals"}`)}
          >
            {`View All >>`}
          </h1>
        </div>
        <div className="flex flex-wrap text-sm flex-1 gap-2  justify-center items-center">
          {data?.slice(30, 44).map((item, i) => {
            return <Product key={i} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
