"use client";
import React from "react";
import PersonalInfoForm from "./components/PersonalInfoForm";
import ProfileAvatar from "./components/ProfileAvatar";
import Link from "next/link";
import { TbChecklist } from "react-icons/tb";
import { LuHeart } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { BASE_API_URL } from "@/utils/constants";
import useSWR from "swr";
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { removeAllProducts } from "@/redux/features/productsSlice";
import { removeUserData } from "@/redux/features/userSlice";
import WishIcon from "./wishlist/components/WishIcon";

const navs = [
  {
    name: "Personal information",
    id: 1,
    path: `/account`,
    icon: <VscAccount size={30} />,
  },
  {
    name: "Orders",
    id: 2,
    path: `/account/orders`,
    icon: <TbChecklist size={30} />,
  },
  {
    name: "Wishlist",
    id: 3,
    path: `/account/wishlist`,
    icon: <WishIcon />,
  },

  { name: "Logout", id: 5, path: "", icon: <CiLogout size={30} /> },
];

const Account = () => {
  const session = useSession();
  const dispatch = useDispatch();

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    `${BASE_API_URL}/api/user?email=${session?.data?.user?.email}`,
    fetcher
  );

  async function logOut() {
    await signOut({ callbackUrl: `${BASE_API_URL}/login` });
    dispatch(removeAllProducts());
    dispatch(removeUserData());
  }

  if (isLoading) {
    return;
  }
  return (
    <div className="">
      <div className="hidden md:flex">
        <PersonalInfoForm />
      </div>

      {/* mobile account */}
      <div className="md:hidden flex h-full w-full justify-center p-5 border ">
        <div className="bg-gray-50 w-screen h-screen border rounded-lg">
          {/* head */}
          <h1 className="text-center text-2xl p-6">My Account</h1>
          <div className="flex flex-col p-5 bg-sky-100 justify-center items-center gap-7">
            <ProfileAvatar tumbnail="" setTumbnail="" />
            <h1 className="capitalize font-serif">
              {data[0]?.firstName} {data[0]?.lastName}
            </h1>
          </div>
          {/* body */}

          <ul className="flex uppercase font-sans bg-gray-50 justify-center items-center text-xs lg:text-base flex-col w-full gap-5 py-7">
            {navs.slice(1, 3).map((nav) => {
              return (
                <Link href={nav.path} key={nav.id}>
                  <div className="flex w-full  h-[10vh] px-9 gap-3 justify-start items-center hover:bg-slate-200 duration-300 rounded-lg">
                    {nav.icon}
                    <div>
                      <li>{nav.name}</li>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* logout */}
            <div
              className="flex gap-3  px-9 justify-start h-[10vh]  hover:bg-slate-200 items-center cursor-pointer duration-500 rounded-lg"
              onClick={() => {
                logOut();
              }}
            >
              {navs[3]?.icon}
              <div>
                <li>{navs[3]?.name}</li>
              </div>
            </div>
            <Link
              href={`${BASE_API_URL}/`}
              className="md:text-sm  text-xs text-center ml-2  p-10"
            >{`<< Back Home`}</Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Account;
