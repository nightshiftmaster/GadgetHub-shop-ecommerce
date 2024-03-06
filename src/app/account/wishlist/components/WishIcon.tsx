"use client";
import { LuHeart } from "react-icons/lu";
import React from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcherSwr";

const WishIcon = () => {
  const { data, isLoading } = useSWR(`/api/wishlist`, fetcher);

  if (isLoading) {
    return <div className="md:text-sm text-xs">Loading...</div>;
  }

  const wishlist = data[0]?.wishlist;

  return (
    <div className="flex justify-center items-center gap-1 relative">
      <LuHeart size={25} />

      {wishlist?.length === 0 || (
        <div className="bg-yellow-600 w-4 h-4 absolute flex rounded-full left-3 bottom-3 text-white justify-center items-center text-xs">
          {wishlist?.length}
        </div>
      )}
    </div>
  );
};

export default WishIcon;
