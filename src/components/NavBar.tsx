"use client";
import React from "react";
import Link from "next/link";
import { VscAccount } from "react-icons/vsc";
import CartItem from "./CartItem";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeAllProducts } from "@/redux/features/productsSlice";
import { removeUserData } from "@/redux/features/userSlice";
import { BASE_API_URL } from "@/utils/constants";

const navs = [
  { name: "home", path: "/" },
  { name: "products", path: "/products" },
  { name: "cart", path: "/cart" },
];

const NavBar = () => {
  const dispatch = useDispatch();
  const session = useSession();
  const router = useRouter();

  async function logOut() {
    await signOut({ callbackUrl: `${BASE_API_URL}/login` });
    dispatch(removeAllProducts());
    dispatch(removeUserData());
  }

  return (
    <div className="text-white sticky top-0 py-6 lg:px-[5vh] gap-7 bg-gradient-to-r from-purple-400 to-fuchsia-300 flex flex-col sm:flex-row items-center justify-around mb-10 z-20 rounded-b-md">
      <Link href="/">
        <h1 className="lg:text-4xl text-2xl font-bold">GadgetHub</h1>
      </Link>
      <div className="flex md:gap-20 gap-5  justify-center items-center md:text-sm text-xs">
        {navs.slice(0, 2).map((item, i) => {
          return (
            <Link href={item.path} key={i} className="uppercase">
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
  );
};

export default NavBar;
