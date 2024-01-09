"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { InitialState } from "@/redux/features/productsSlice";
import SuspenseProvider from "@/providers/SuspenseProvider";
import { BASE_API_URL } from "@/utils/constants";

const LoginPage = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const productsSlice: InitialState = useSelector(
    (state: RootState) => state.productsReducer
  );

  if (status === "loading") {
    return <SuspenseProvider>...Please wait !</SuspenseProvider>;
  }

  if (status === "authenticated" && productsSlice.cart.length !== 0) {
    router.push("/checkout");
  }
  if (status === "authenticated" && productsSlice.cart.length === 0) {
    router.push("/");
  }

  return (
    <div className="p-5 w-full flex items-center justify-center h-[80vh]">
      <div className="md:h-[60vh] h-full shadow-xl rounded-lg text-center flex items-center justify-center flex-col xl:w-[60vh] w-full ">
        {/* form */}
        <div className="p-12  md:text-base text-xs flex flex-col items-center justify-center md:gap-16 gap-11 ">
          <h1 className="font-bold text-lg md:text-2xl ">
            Please login to purchase products
          </h1>

          <button
            className="flex md:gap-4 gap-3 text-sm md:text-base p-4 items-center justify-center ring-1 w-full ring-orange-100 rounded-md"
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
            className="flex w-full items-center text-sm md:text-base justify-center md:gap-4 gap-3 p-4 ring-1 ring-orange-100 rounded-lg"
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
          <p className="md:text-base text-xs text-center">
            Have a problem{" "}
            <Link className="underline" href="/contact">
              Contact us
            </Link>
          </p>
        </div>
        <Link
          href={`${BASE_API_URL}/products`}
          className="text-gray-500  md:text-sm lg:text-base text-xs"
        >{`<< Back to Shopping`}</Link>
      </div>
    </div>
  );
};

export default LoginPage;
