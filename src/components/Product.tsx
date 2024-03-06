"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SingleProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/features/productsSlice";
import { AppDispatch } from "@/redux/store";
import styles from "./page.module.css";
import { toast } from "react-toastify";
import { BASE_API_URL } from "@/utils/constants";
import { LiaCartPlusSolid } from "react-icons/lia";
import { IoHeartCircle } from "react-icons/io5";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { fetcher } from "@/utils/fetcherSwr";
import _ from "lodash";

const Product = (props: SingleProductType) => {
  const [likeStatus, setLikeStatus] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const session = useSession();

  const { data, isLoading, mutate, error } = useSWR(`/api/wishlist`, fetcher);

  useLayoutEffect(() => {
    switch (likeStatus) {
      case "liked":
        void handlePostWishlist(props);
        break;
      case "unliked":
        void handleDeleteWishlist(props._id);
        break;
      default:
        return;
    }
  }, [likeStatus]);

  const handlePostWishlist = async (item: SingleProductType) => {
    if (
      data[0].wishlist.some((item: SingleProductType) => item._id === props._id)
    ) {
      setLikeStatus("unliked");
      return;
    }
    try {
      await fetch(`/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      void mutate();
    } catch (e: any) {
      console.log(e.message);
    } finally {
      toast.success("The product added to the wishlist!", {
        theme: "light",
      });
    }
  };

  const handleDeleteWishlist = async (_id: any) => {
    try {
      await fetch(`/api/wishlist/${_id}`, {
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

  if (isLoading) {
    return;
  }
  if (error) {
    return;
  }

  let isAccountCreated = data?.length === 0;

  return (
    <div
      className={`relative ${styles.enter} bg-white flex flex-col  justify-start  items-center p-1 border  group`}
    >
      <div className="flex flex-col h-[220px] w-[150px] gap-3 bg- justify-start items-center  md:gap-1  p-1  ">
        <div className="flex w-[100%] h-full ">
          <div
            className="h-full w-full  justify-center flex rounded-md"
            data-testid="test-product"
          >
            {session.status === "unauthenticated" || isAccountCreated || (
              <div
                className={`hidden ${styles.puffIn}  h-1/3  mt-20 items-center absolute justify-center md:group-hover:flex z-20 `}
              >
                <div
                  className={`${
                    likeStatus === "liked" ||
                    data[0]?.wishlist?.some(
                      (item: SingleProductType) => item._id === props._id
                    )
                      ? "bg-red-500"
                      : "bg-white"
                  } block w-6 h-6 absolute z-0`}
                ></div>
                <div className="z-20">
                  <IoHeartCircle
                    size={50}
                    style={{
                      textShadow: "10px",
                    }}
                    color="#D7BDE2"
                    onClick={() => {
                      setLikeStatus(
                        likeStatus === "liked" ? "unliked" : "liked"
                      );
                    }}
                  />
                </div>
              </div>
            )}
            <Link
              href={`${BASE_API_URL}/products/${props._id}`}
              className="hover:opacity-70"
            >
              {props.thumbnail && (
                <div className="relative  h-full w-36 ">
                  <Image
                    priority
                    src={props.thumbnail}
                    alt="image"
                    fill
                    className="object-cover hover:scale-105 transition-all duration-500 z-10"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
            </Link>
          </div>
        </div>

        {/* price + name */}
        <div className="flex flex-col justify-center  items-center md:gap-2 gap-3 p-1 text-center md:h-1/3 h-1/3 group w-full flex-1 ">
          <hr className="w-[10vh]  h-px bg-gray-300 border-0 mt-1  "></hr>
          <h1 className="flex justify-center  capitalize text-ellipsis md:group-hover:invisible overflow-hidden w-2/3 items-start lg:text-xs text-xs font-semibold text-gray-800 basis-8 shrink-0 ">
            <Link href={`${BASE_API_URL}/products/${props._id}`}>
              {props.title}
            </Link>
          </h1>
          <div className="flex gap-3 justify-center items-center">
            {/* mobile cart icon */}
            <div
              className="flex md:hidden"
              onClick={() => {
                const id = { _id: _.uniqueId() };
                const quantity = { quantity: 1 };
                const newProduct = { ...props, ...quantity, ...id };
                dispatch(addProduct(newProduct));
                toast.success("The product added to the cart !");
              }}
            >
              <LiaCartPlusSolid color="#DAA06D" size="25px" />
            </div>

            <h2 className="md:text-sm flex  justify-center md:group-hover:invisible text-blue-400 items-center font-semibold text-xs basis-5 shrink ">
              ${props.price}
            </h2>

            {/* mobile like icon */}
            <div
              className={`md:hidden ${
                session.status === "unauthenticated" || isAccountCreated
                  ? "hidden"
                  : "flex"
              }`}
              onClick={() => {
                setLikeStatus(likeStatus === "liked" ? "unliked" : "liked");
              }}
            >
              {likeStatus === "liked" ||
              data[0]?.wishlist?.some(
                (item: SingleProductType) => item._id === props._id
              ) ? (
                <IoIosHeart color="red" size="20px" />
              ) : (
                <IoIosHeartEmpty color="#DAA06D" size="20px" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`hidden absolute ${styles.entrance} md:bottom-7 bottom-4  md:group-hover:block`}
        onClick={() => {
          const id = { _id: _.uniqueId() };
          const quantity = { quantity: 1 };
          const newProduct = { ...props, ...quantity, ...id };
          dispatch(addProduct(newProduct));
          toast.success("The product added to the cart !");
        }}
      >
        <Button text="Add To Cart" />
      </div>
    </div>
  );
};

export default Product;
