"use client";
import React, { useEffect, useState } from "react";
import Product from "@/components/Product";
import { fetchSearchedProduct } from "@/utils/fetchData";
import { SingleProductType } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { ProductsType } from "@/types/types";

const SearchResult = () => {
  const [data, setData] = useState<ProductsType>();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  useEffect(() => {
    search && fetchSearchedProduct(search).then((res) => setData(res.products));
  }, [search]);

  return (
    <div className="w-full h-full flex justify-center items-center  ">
      {data ? (
        <div className="flex flex-col gap-16 justify-center items-center w-[1500px] ">
          <div className="flex flex-col justify-center items-center gap-6">
            <h2 className="">{`Showing results for ${search}`}</h2>
          </div>
          <div className="flex flex-wrap text-sm flex-1 justify-center items-center">
            {data?.map((item: SingleProductType) => {
              return <Product key={item.id} {...item} />;
            })}
          </div>
        </div>
      ) : (
        <h2 className="">No results for this search</h2>
      )}
    </div>
  );
};
export default SearchResult;
