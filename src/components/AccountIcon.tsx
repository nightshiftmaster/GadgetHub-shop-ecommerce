"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { VscAccount } from "react-icons/vsc";
import { BASE_API_URL } from "@/utils/constants";
import useSWR from "swr";
import DropdownMenu from "./DropdownMenu";

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

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, isLoading } = useSWR(
    `${BASE_API_URL}/api/user?email=${session?.data?.user?.email}`,
    fetcher
  );

  if (isLoading) {
    return <div className="md:text-sm text-xs">Loading...</div>;
  }

  return (
    <div
      className="relative md:hover:text-sky-500 duration-500 "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex gap-2 justify-center items-center relative"
        onClick={() => {
          session.status === "authenticated"
            ? router.push("/account")
            : router.push("/login");
          setDropdownVisible(false);
        }}
      >
        <Link
          href={session.status === "authenticated" ? "/account" : "login"}
          key={3}
          className="md:flex hidden"
        >
          {session.status === "authenticated" ? (
            <div className="flex flex-col ">
              <span className="capitalize">
                Hi,{" "}
                {data && data.length !== 0
                  ? data[0]?.firstName
                  : session.data.user?.name}
              </span>
              <span className="font-bold">Account</span>
            </div>
          ) : (
            <span className="uppercase">Login</span>
          )}
        </Link>
        <Link href="/login" key={4} className="uppercase">
          {session.status === "authenticated" ? (
            <div className="flex justify-center items-center">
              {session?.data?.user?.image || data[0]?.img ? (
                <img
                  src={
                    session?.data?.user?.image
                      ? session?.data?.user?.image
                      : data[0].img
                  }
                  alt="avatar"
                  className="rounded-full md:h-9 md:w-9 h-7 w-7 object-cover"
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
