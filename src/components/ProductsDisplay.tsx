import React from "react";
import Product from "@/components/Product";
import { ProductsType, SingleProductType } from "@/types/types";
import { useRouter } from "next/navigation";

interface ProductsDisplayProps {
  title: string;
  filterValue: string;
  dataTestId: string;
  bgColor: string;
  startIndex: number;
  endIndex: number;
  data: ProductsType;
}

const ProductsDisplay: React.FC<ProductsDisplayProps> = ({
  data,
  title,
  filterValue,
  dataTestId,
  bgColor,
  startIndex,
  endIndex,
}) => {
  const router = useRouter();

  return (
    <div
      className={`w-full flex justify-center items-center`}
      data-testid={dataTestId}
    >
      <div
        className={`text-center flex flex-col w-[1250px] bg-lime-50 md:text-start pb-10 ${bgColor}`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-start w-[100%]">
            <h1 className="md:text-2xl text-lg text-slate-900 font-semibold font-sans p-10 whitespace-nowrap relative">
              {title}
            </h1>
            <hr className="w-[100%] h-px md:inline hidden  bg-gray-300 border-0 rounded"></hr>
          </div>
          <h1
            className="text-xs font-medium cursor-pointer text-slate-900 p-10 whitespace-nowrap relative"
            data-testid={`view-all-${dataTestId}`}
            onClick={() => router.push(`/products?filter=${filterValue}`)}
          >
            {`View All >>`}
          </h1>
        </div>
        <div className="flex flex-wrap text-sm flex-1 gap-2 justify-center items-center">
          {data
            ?.slice(startIndex, endIndex)
            .map((item: SingleProductType, i) => (
              <Product key={i} {...item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsDisplay;
