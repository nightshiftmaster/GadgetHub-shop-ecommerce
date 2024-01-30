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
import { Formik, Form, Field } from "formik";

const LoginPage = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const productsSlice: InitialState = useSelector(
    (state: RootState) => state.productsReducer
  );

  if (status === "loading") {
    return;
  }

  if (status === "authenticated" && productsSlice.cart.length !== 0) {
    router.push("/checkout");
  }
  if (status === "authenticated" && productsSlice.cart.length === 0) {
    router.push("/");
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async ({ email, password }) => {
        try {
          signIn("credentials", { email, password });
        } catch (e) {
          console.log(e);
        }
      }}
    >
      {({ values, isSubmitting }) => {
        return (
          <div className="p-5 w-full flex items-center justify-center h-screen bg-gray-50">
            <div className="md:h-[90vh] h-full shadow-xl bg-white rounded-lg text-center flex items-center justify-center flex-col xl:w-[60vh] w-full ">
              {/* form */}
              <Form className="md:text-base text-xs flex flex-col items-center justify-center md:gap-10 gap-6 ">
                <h1 className="font-bold text-lg md:text-2xl ">
                  Please login to purchase products
                </h1>

                {Object.keys(values).map((inputName, i) => {
                  return (
                    <Field
                      name={`${inputName}`}
                      disabled={isSubmitting}
                      key={i}
                      placeholder={`${inputName}`}
                      className="flex md:gap-4 gap-3 text-sm md:text-base p-4 items-center justify-center ring-1 w-full ring-blue-100 rounded-md"
                    />
                  );
                })}
                <button
                  className="flex w-full items-center text-sm md:text-base justify-center md:gap-4 gap-3 p-4 ring-1 ring-blue-100 rounded-lg hover:scale-110 transition-all duration-500"
                  type="submit"
                >
                  <span className="whitespace-nowrap">Login</span>
                </button>

                <button
                  className="flex md:gap-4 gap-3 text-sm md:text-base p-4 items-center justify-center ring-1 w-full ring-blue-100 rounded-md hover:scale-110 transition-all duration-500"
                  onClick={() => signIn("google")}
                  type="button"
                >
                  <Image
                    src="/google.png"
                    alt="google icon"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span className="whitespace-nowrap text-center ">
                    Sign in with Google
                  </span>
                </button>

                <span className="">- OR -</span>
                <Link
                  className="text-white uppercase w-full whitespace-nowrap p-3 text-xs lg:p-3 lg:px-10 text-center lg:text-base rounded-md bg-fuchsia-400 hover:scale-110 transition-all duration-500"
                  href="/register"
                >
                  Create new account
                </Link>
                <Link
                  href={`${BASE_API_URL}/products`}
                  className="text-gray-500  md:text-sm text-xs"
                >{`<< Back to Shopping`}</Link>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginPage;
