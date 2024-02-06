"use client";
import { BASE_API_URL } from "@/utils/constants";
import React from "react";
import useSWR from "swr";
import Link from "next/link";
import Loading from "@/components/Loader";
import { useRouter } from "next/navigation";
import { LuListX } from "react-icons/lu";

const Orders = () => {
  const router = useRouter();
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, isLoading } = useSWR(`/api/orders`, fetcher);

  if (isLoading) {
    return <Loading />;
  }

  const orders = data[0]?.orders;

  if (orders?.length === 0) {
    return (
      <div className="flex justify-center items-center gap-4 mt-36 flex-col">
        <LuListX size={100} />
        <h1 className="md:text-2xl texl-xl">You haven&lsquo;t orders !</h1>
      </div>
    );
  }

  return (
    <div className="mt-10 md:w-full w-full h-full ">
      <div className="flex justify-center flex-col items-center w-full bg-stone-50 ">
        <table className="w-full border-separate border-spacing-1 md:border p-4 rounded-md">
          <thead className="">
            <tr className="text-left text-xs md:text-base">
              <th className="bg-white p-4">Order Id</th>
              <th className="bg-white p-4">Date</th>
              <th className="bg-white p-4">Status</th>
              <th className="bg-white p-4">Total</th>

              <th className="bg-white p-4 hidden md:flex h-20"></th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order: any) => {
              return (
                <tr
                  className="text-xs md:text-base cursor-pointer hover:bg-stone-100"
                  key={order._id}
                  onClick={() => {
                    router.push(`/account/orders/${order._id}`);
                  }}
                >
                  <td className="flex items-center py-5  "># {order._id}</td>
                  <td className="items-center py-5 px-4 ">
                    {order.createdAt.slice(0, 9).split("-").reverse().join("/")}
                  </td>
                  <td className=" text-blue-500 py-5 px-3">Completed</td>
                  <td className=" items-center font-semibold text-stone-700 py-5 px-4 ">
                    ${order?.total}
                  </td>
                  <td className=" text-center text-white items-center">
                    <Link
                      href={`${BASE_API_URL}/account/orders/${order._id}`}
                      className="bg-sky-500  px-6 py-3 hover:bg-slate-400 rounded-md hidden md:inline"
                    >
                      view
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link
          href={`${BASE_API_URL}/account`}
          className="text-xs md:text-sm text-center  p-5"
        >{`<< Back`}</Link>
      </div>
    </div>
  );
};

export default Orders;
