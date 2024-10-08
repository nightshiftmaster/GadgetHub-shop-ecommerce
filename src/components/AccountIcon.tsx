"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { VscAccount } from "react-icons/vsc";
import useSWR from "swr";
import DropdownMenu from "./DropdownMenu";
import { fetcher } from "@/utils/fetcherSwr";
import Image from "next/image";

const AccountIcon = () => {
  const session = useSession();
  const router = useRouter();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const {
    data,
    isLoading,
    error: userError,
  } = useSWR(`/api/user?email=${session?.data?.user?.email}`, fetcher);

  const {
    data: user,
    isLoading: loading,
    error,
  } = useSWR(`/api/wishlist`, fetcher);

  if (isLoading || loading) {
    return <div className="md:text-sm text-xs">Loading...</div>;
  }

  if (error || userError) {
    return <div className="md:text-sm text-xs">Error...</div>;
  }

  const wishlist = user ? user[0]?.wishlist : [];

  return (
    <div
      className="relative  "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex gap-2 justify-center items-center relative md:hover:text-sky-500 duration-500 "
        onClick={() => {
          session.status === "authenticated"
            ? router.push("/account")
            : router.push("/login");
          setDropdownVisible(false);
        }}
      >
        <Link
          id="loginLink"
          href={session.status === "authenticated" ? "/account" : "login"}
          key={3}
          className="md:flex hidden "
        >
          {session.status === "authenticated" ? (
            <div className="flex flex-col md:hover:text-sky-500 duration-500 ">
              <span className="capitalize">
                Hi,{" "}
                {data && data.length !== 0
                  ? data[0]?.firstName
                  : session.data.user?.name}
              </span>
              <h2 className="font-bold">Account</h2>
            </div>
          ) : (
            <h2 className="uppercase">Login</h2>
          )}
        </Link>
        <Link href="/login" key={5} className="uppercase ">
          {session.status === "authenticated" ? (
            <div className="flex justify-center relative items-center ">
              {session?.data?.user?.image || data[0]?.img ? (
                <Image
                  src={
                    session?.data?.user?.image
                      ? session?.data?.user?.image
                      : data[0].img
                  }
                  alt="avatar"
                  width={35}
                  height={35}
                  className="rounded-full  object-cover border"
                />
              ) : (
                <VscAccount size={25} />
              )}
            </div>
          ) : (
            <VscAccount size={21} />
          )}
        </Link>
      </div>
      {wishlist?.length === 0 || !wishlist || (
        <div className="w-4 h-4 bg-yellow-600 rounded-full absolute -top-1 -right-[6px] text-xs flex justify-center items-center ">
          <p>{wishlist?.length}</p>
        </div>
      )}
      <div
        className={`absolute top-9 shadow-lg rounded-xl ${
          session.status === "unauthenticated" ? "hidden" : "flex"
        }`}
      >
        {isDropdownVisible && (
          <DropdownMenu setDropdownVisible={setDropdownVisible} />
        )}
      </div>
    </div>
  );
};

export default AccountIcon;
