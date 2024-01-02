"use client";
import React, { useState } from "react";
import Link from "next/link";
import { VscAccount } from "react-icons/vsc";
import CartItem from "./CartItem";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeAllProducts } from "@/redux/features/productsSlice";
import { removeUserData } from "@/redux/features/userSlice";
import { BASE_API_URL } from "@/utils/constants";
import { FiMenu } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { CiShop } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiMail } from "react-icons/ci";

import FormInput from "./Search";

const navs = [
  { name: "home", path: "/", icon: <IoHomeOutline size={20} /> },
  { name: "products", path: "/products", icon: <CiShop size={20} /> },
  { name: "cart", path: "/cart", icon: <CiShoppingCart size={25} /> },
  { name: "contact", path: "/contact", icon: <CiMail size={20} /> },
];

const NavBar = () => {
  const [isOpen, setOpen] = useState<Boolean>(false);
  const dispatch = useDispatch();
  const session = useSession();
  const router = useRouter();

  async function logOut() {
    await signOut({ callbackUrl: `${BASE_API_URL}/login` });
    dispatch(removeAllProducts());
    dispatch(removeUserData());
  }

  const MobileMenuIcon = () => {
    return (
      <div>
        <div className="flex sm:hidden " onClick={() => setOpen(!isOpen)}>
          {isOpen ? <IoIosClose size={30} /> : <FiMenu size={30} />}
        </div>
        <div></div>
      </div>
    );
  };

  const MobileMenu = () => {
    return (
      <div
        className={`sm:hidden py-6 px-11 flex-col text-white h-screen flex  bg-gradient-to-r from-purple-400 to-fuchsia-300 w-full rounded-md`}
      >
        <div className="flex justify-center items-center mt-6">
          <Link href="/">
            <h1 className=" text-4xl font-bold">GadgetHub</h1>
          </Link>
        </div>
        <div className="flex  gap-14 flex-col  h-full justify-center items-center">
          {navs.slice(0, 4).map((item, i) => {
            return (
              <div
                className="flex shadow-lg p-3 gap-3 w-[70%] justify-start items-center rounded-lg bg-blue-300"
                key={i}
              >
                {item.icon}
                <Link
                  href={item.path}
                  key={i}
                  className="uppercase text-base"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="text-white sticky  top-0 py-6 lg:px-[5vh] gap-7 bg-gradient-to-r from-purple-400 to-fuchsia-300 flex flex-col sm:flex-row items-center justify-around mb-10 z-20 rounded-b-md">
        <div className="flex md:gap-6 gap-32 md:w-fit w-full md:justify-center items-center justify-around">
          <Link href="/">
            <h1 className="lg:text-4xl text-2xl font-bold">GadgetHub</h1>
          </Link>
          <MobileMenuIcon />
        </div>
        <div className="flex md:gap-20 gap-5  justify-center items-center md:text-sm text-xs">
          {navs.slice(0, 2).map((item, i) => {
            return (
              <Link
                href={item.path}
                key={i}
                className="uppercase hidden sm:block"
              >
                {item.name}
              </Link>
            );
          })}

          <div className="flex justify-center items-center">
            <Link href="/cart" key={3} className="uppercase">
              CART
            </Link>
            <Link href="/cart" key={4} className="uppercase">
              <CartItem />
            </Link>
          </div>
          <div
            className="flex gap-3 justify-center items-center"
            onClick={() => {
              session.status === "authenticated"
                ? logOut()
                : router.push("/login");
            }}
          >
            <Link href="/login" key={3} className="uppercase">
              {session.status === "authenticated" ? "Logout" : "Login"}
            </Link>
            <Link href="/login" key={4} className="uppercase">
              {session.status === "authenticated" ? (
                <div className="h-7 w-7">
                  {session?.data?.user?.image && (
                    <img
                      src={session.data.user.image}
                      alt="avatar"
                      className="rounded-full"
                    />
                  )}
                </div>
              ) : (
                <VscAccount size={25} />
              )}
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`fixed  z-50 shadow-2xl w-[85%] top-0 backdrop-blur-lg transition-all ease-in-out delay-300 duration-300 ${
          isOpen ? "left-0" : "-left-full"
        }`}
      >
        <MobileMenu />
      </div>
    </div>
  );
};

export default NavBar;
