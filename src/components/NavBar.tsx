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
import SearchBar from "./Search";

import FormInput from "./Search";

const navs = [
  { name: "home", id: 1, path: "/", icon: <IoHomeOutline size={20} /> },
  { name: "products", id: 2, path: "/products", icon: <CiShop size={20} /> },
  { name: "cart", id: 3, path: "/cart", icon: <CiShoppingCart size={20} /> },

  { name: "contact", id: 4, path: "/contact", icon: <CiMail size={20} /> },
  { name: "login", id: 5, path: "/login", icon: <VscAccount size={20} /> },
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
        <div className="flex md:hidden " onClick={() => setOpen(!isOpen)}>
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
        <div className="flex flex-col gap-8">
          <div className="flex flex-col  gap-8 p-4 justify-center items-center mt-6">
            <Link href="/">
              <h1 className="text-4xl font-bold">GadgetHub</h1>
            </Link>
            <hr className="w-full  h-px bg-gray-300 border-0 rounded "></hr>
          </div>
          <div className="flex  gap-8 flex-col  h-full justify-center items-center">
            {navs.slice(0, 4).map((item, i) => {
              return (
                <Link
                  href={item.path}
                  className="flex  p-3 gap-3 w-[70%] justify-start items-center uppercase text-base "
                  key={i}
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
            <div
              className="flex  p-3 gap-3 w-[70%] justify-start items-center "
              key={navs[4].id}
            >
              {navs[4].icon}
              <input
                type="button"
                className="uppercase text-base"
                onClick={() => {
                  setOpen(false);
                  session.status === "authenticated"
                    ? logOut()
                    : router.push("/login");
                }}
                value={session.status === "authenticated" ? "Logout" : "Login"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="sticky top-0 z-20">
      <div className="text-white py-6 sm:px-[5vh] md:gap-7 gap-5 bg-gradient-to-r from-purple-400 to-fuchsia-300 flex flex-col xl:flex-row items-center justify-between mb-10  ">
        <div className="flex md:gap-6   md:w-fit w-full md:justify-center items-center justify-around">
          <Link href="/">
            <h1 className="lg:text-5xl md:text-4xl  text-2xl font-bold">
              GadgetHub
            </h1>
          </Link>
          <div className="flex md:hidden justify-center items-center gap-4">
            <Link href="/cart">
              <CartItem />
            </Link>
            <Link href="/products">
              <CiShop size={25} />
            </Link>
          </div>

          <MobileMenuIcon />
        </div>
        <div className="flex flex-col-reverse xl:flex-row justify-around items-center  w-full xl:gap-10 gap-5">
          <SearchBar />
          <div className="md:gap-10 gap-5 justify-center hidden md:flex items-center md:text-sm text-xs">
            {navs.slice(0, 2).map((item, i) => {
              return (
                <Link href={item.path} key={i} className="uppercase ">
                  {item.name}
                </Link>
              );
            })}
            <div className="justify-center items-center hidden md:flex ">
              <Link href={navs[3].path} key={3} className="uppercase">
                contact
              </Link>
            </div>

            <div className="flex justify-center items-center">
              <Link href="/cart" key={3} className="uppercase">
                CART
              </Link>
              <Link href="/cart" key={4} className="uppercase">
                <CartItem />
              </Link>
            </div>
            <div className="flex justify-center items-center"></div>
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
