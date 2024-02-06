"use client";
import React from "react";
import { TbChecklist } from "react-icons/tb";
import { LuHeart } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { BASE_API_URL } from "@/utils/constants";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { removeAllProducts } from "@/redux/features/productsSlice";

const navs = [
  {
    name: "Orders",
    id: 1,
    path: `/account/orders`,
    icon: <TbChecklist size={15} />,
  },
  {
    name: "Wishlist",
    id: 2,
    path: `/account/wishlist`,
    icon: <LuHeart />,
  },
  { name: "Logout", id: 3, path: "", icon: <CiLogout size={15} /> },
];

const DropdownMenu = ({ setDropdownVisible }: { setDropdownVisible: any }) => {
  const dispatch = useDispatch();
  async function logOut() {
    await signOut({ callbackUrl: `${BASE_API_URL}/login` });
    dispatch(removeAllProducts());
  }
  return (
    <div className="w-fit h-fit">
      <ul
        className="md:flex flex-col text-sm text-black bg-slate-50 cursor-pointer rounded-xl hidden "
        onClick={() => setDropdownVisible(false)}
      >
        {navs.slice(0, 2).map((nav) => {
          return (
            <Link href={nav.path} key={nav.id}>
              <div
                className={`flex gap-2 hover:bg-slate-200  ${
                  nav.id === 1 ? "hover:rounded-t-xl" : ""
                }  hover:text-red-500   px-8 py-6 duration-500`}
              >
                <div className="flex justify-center items-center ">
                  {nav.icon}
                </div>
                <li>{nav.name}</li>
              </div>
            </Link>
          );
        })}
        <div
          className="flex gap-2 hover:bg-slate-200  hover:text-red-500  hover:rounded-b-xl px-8 py-6 duration-500"
          key={3}
          onClick={() => logOut()}
        >
          <div className="flex justify-center items-center  hover:rounded-b-xl">
            <CiLogout size={15} />
          </div>
          <li>Logout</li>
        </div>
      </ul>
    </div>
  );
};

export default DropdownMenu;
