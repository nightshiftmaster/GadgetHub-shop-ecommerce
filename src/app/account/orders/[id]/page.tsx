"use client";
import React from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { BASE_API_URL } from "@/utils/constants";
import Loading from "@/components/Loader";

const Order = ({ params }: { params: { id: string } }) => {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, isLoading } = useSWR(`/api/orders/${params.id}`, fetcher);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex flex-col mt-5  ">
      <div className="flex p-5 justify-center  bg-slate-50">
        <h1 className="font-semibold uppercase">
          Order Reference: {data[0]._id}{" "}
        </h1>
      </div>

      {/* products */}
      <div className="w-full h-full lg:text-base text-xs  mt-10 mb-20 flex justify-start items-center  gap-3 flex-col">
        {data[0].order?.map((item) => {
          return (
            <div
              className="flex justify-start p-2 items-center md:w-[70%] w-full border-b-2 "
              key={item._id}
            >
              <div className="flex justify-between md:gap-10 gap-3 w-full ">
                <div className="flex justify-between items-center gap-5 md:gap-15 ">
                  <div className="relative md:h-12 md:w-12 h-10 w-10">
                    {item.thumbnail && (
                      <Image
                        src={item.thumbnail}
                        fill
                        className="rounded-full"
                        alt=""
                      />
                    )}
                  </div>
                  <h1 className="">{item.title}</h1>
                </div>
                <div className="flex text-red-500 justify-center items-center"></div>
              </div>

              <div className="flex justify-center items-center">
                <h1 className="md:text-base  text-stone-500 text-sm">
                  ${item.price}
                </h1>
              </div>
            </div>
          );
        })}
        <div className="flex justify-between md:w-[70%] w-full border-b-2 py-5">
          <h1 className="font-semibold">Subtotal</h1>
          <h1 className="text-blue-500">${data[0].total}</h1>
        </div>
        <div className="flex justify-between md:w-[70%] w-full border-b-2  py-5">
          <h1 className="font-semibold">Shipping</h1>
          <h1 className="text-green-500">Free</h1>
        </div>
        <div className="flex justify-between md:w-[70%] w-full border-b-2 py-5 ">
          <h1 className="font-bold lg:text-lg text-base">Total(incl.vat)</h1>
          <h1 className="text-blue-500">${data[0].total}</h1>
        </div>
        <Link
          href={`${BASE_API_URL}/account/orders`}
          className="md:text-sm text-xs text-center  p-10"
        >{`<< Back to Orders`}</Link>
      </div>
    </div>
  );
};

export default Order;
