"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { InitialState } from "@/redux/features/productsSlice";

const LoginPage = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const productsSlice: InitialState = useSelector(
    (state: RootState) => state.productsReducer
  );

  console.log(productsSlice.products.length);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated" && productsSlice.products.length !== 0) {
    router.push("/checkout");
  }
  if (status === "authenticated" && productsSlice.products.length === 0) {
    router.push("/");
  }

  return (
    <div className="p-5 w-full flex items-center justify-center h-screen">
      <div className="h-[60vh] shadow-2xl rounded-lg text-center flex items-center justify-center flex-col xl:w-[30%] w-[70%] ">
        {/* form */}
        <div className="p-12  md:text-base text-xs flex flex-col items-center justify-center gap-16 ">
          <h1 className="font-bold text-base  md:text-2xl ">
            Please login to purchase products
          </h1>

          <button
            className="flex gap-4 p-4 items-center justify-center ring-1 w-full ring-orange-100 rounded-md"
            onClick={() => signIn("google")}
          >
            <Image
              src="/google.png"
              alt="google icon"
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="whitespace-nowrap text-center">
              Sign in with Google
            </span>
          </button>
          <button
            className="flex w-full items-center justify-center gap-4 p-4 ring-1 ring-orange-100 rounded-lg"
            onClick={() => signIn("facebook")}
          >
            <Image
              src="/facebook.png"
              alt="facebook icon"
              width={20}
              height={20}
              className="object-contain"
            />
            <span className="whitespace-nowrap">Sign in with Facebook</span>
          </button>
          <p className="text-sm">
            Have a problem{" "}
            <Link className="underline" href="/">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
