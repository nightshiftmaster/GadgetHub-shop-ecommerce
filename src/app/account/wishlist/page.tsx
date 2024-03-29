"use client";
import { BASE_API_URL } from "@/utils/constants";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import Image from "next/image";
import { SingleProductType } from "@/types/types";
import Loading from "@/components/Loader";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/cartSlice";
import { useRouter } from "next/navigation";
import { LuHeartOff } from "react-icons/lu";
import { fetcher } from "@/utils/fetcherSwr";
import { useSession } from "next-auth/react";
import _ from "lodash";

const Wishlist = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const session = useSession();

  const { data, isLoading, mutate } = useSWR(`/api/wishlist`, fetcher);

  const { isLoading: loading, error } = useSWR(
    `${BASE_API_URL}/api/user?email=${session?.data?.user?.email}`,
    fetcher
  );

  if (isLoading || loading) {
    return <Loading />;
  }

  if (error) {
    return;
  }

  if (data[0]?.wishlist.length === 0) {
    return (
      <div className="flex justify-center items-center gap-4 mt-36 flex-col">
        <LuHeartOff size={100} />
        <h1 className="md:text-2xl text-xl">Wishlist is empty</h1>
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${BASE_API_URL}/api/wishlist/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      void mutate();
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col mt-5  ">
      {/* products */}
      <div className="w-full h-full lg:text-base text-xs  mt-10 mb-20 flex justify-start items-center  md:gap-10 gap-6 flex-col">
        {data[0]?.wishlist?.map((item: SingleProductType) => {
          return (
            <div
              className="flex justify-start p-2 md:gap-10 gap-4 items-center md:w-[70%] w-[90%] border-b-2 "
              key={item._id}
            >
              <div className="flex justify-between md:gap-10 gap-2 w-full ">
                <div className="flex w-[100%] justify-start items-center gap-4 md:gap-15 ">
                  {item.thumbnail && (
                    <Link
                      href={`${BASE_API_URL}/products/${item._id}`}
                      className="relative md:h-12 md:w-12 h-9 w-9 min-w-9"
                    >
                      <Image
                        src={item.thumbnail}
                        fill
                        className="rounded-full"
                        alt=""
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Link>
                  )}
                  <Link href={`${BASE_API_URL}/products/${item._id}`}>
                    <h1 className="whitespace-nowrap">{item.title}</h1>
                  </Link>
                  <span
                    className="md:hidden cursor-pointer  text-red-500"
                    onClick={() => handleDelete(item._id)}
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
                  className="bg-fuchsia-400 text-white px-3 md:py-2 py-1 whitespace-nowrap rounded-md"
                  onClick={() => {
                    const id = { _id: _.uniqueId() };
                    const quantity = { quantity: 1 };
                    const newProduct = { ...item, ...quantity, ...id };
                    dispatch(addProduct(newProduct));
                    router.push("/cart");
                  }}
                >
                  Buy Now
                </button>
                <button
                  className="bg-sky-500 hidden md:flex text-white px-3 py-2 rounded-md"
                  onClick={() => handleDelete(item._id)}
                >
                  Remove
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
