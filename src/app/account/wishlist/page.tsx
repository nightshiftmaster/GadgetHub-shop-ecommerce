"use client";
import { BASE_API_URL } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import Image from "next/image";
import { SingleProductType } from "@/types/types";
import { toast } from "react-toastify";
import Loading from "@/components/Loader";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/features/productsSlice";
import { useRouter } from "next/navigation";
import { LuHeartOff } from "react-icons/lu";

const Wishlist = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, isLoading, mutate } = useSWR(`/api/wishlist`, fetcher);

  if (isLoading) {
    return <Loading />;
  }

  if (data[0].wishlist.length === 0) {
    return (
      <div className="flex justify-center items-center gap-4 mt-36 flex-col">
        <LuHeartOff size={100} />
        <h1 className="md:text-2xl texl-xl">Wishlist is empty</h1>
      </div>
    );
  }

  const handlDelete = async (id: number) => {
    try {
      await fetch(`${BASE_API_URL}/api/wishlist/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      mutate();
    } catch (e: any) {
      console.log(e.message);
    } finally {
      toast.error("Product deleted from wishlist", {
        theme: "light",
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col mt-5  ">
      {/* products */}
      <div className="w-full h-full lg:text-base text-xs  mt-10 mb-20 flex justify-start items-center  md:gap-10 gap-6 flex-col">
        {data[0].wishlist?.map((item: SingleProductType) => {
          return (
            <div
              className="flex justify-start p-2 md:gap-10 gap-4 items-center md:w-[70%] w-[90%] border-b-2 "
              key={item._id}
            >
              <div className="flex justify-between md:gap-10 gap-2 w-full ">
                <div className="flex w-[100%] justify-start items-center gap-4 md:gap-15 ">
                  <div className="relative md:h-12 md:w-12 h-9 w-9 min-w-9">
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
                  <span
                    className="md:hidden text-red-500"
                    onClick={() => handlDelete(item._id)}
                  >
                    x
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <h1 className="md:text-base  text-stone-600 font-semibold text-sm ">
                  ${item.price}
                </h1>
              </div>
              <div className="flex gap-5">
                <button
                  className="bg-gray-500 hidden md:flex text-white px-3 py-2 rounded-md"
                  onClick={() => handlDelete(item._id)}
                >
                  Remove
                </button>
                <button
                  className="bg-fuchsia-400 text-white px-3 md:py-2 py-1 whitespace-nowrap rounded-md"
                  onClick={() => {
                    dispatch(addProduct(item));
                    router.push("/cart");
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}

        <Link
          href={`${BASE_API_URL}/account`}
          className="md:text-sm  text-xs text-center  p-10"
        >{`<< Back`}</Link>
      </div>
    </div>
  );
};

export default Wishlist;
