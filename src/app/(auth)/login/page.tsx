"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";
import { InitialState } from "@/redux/cartSlice";
import { BASE_API_URL } from "@/utils/constants";
import { Formik, Form, Field } from "formik";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Oval } from "react-loader-spinner";

const LoginPage = () => {
  const { status } = useSession();
  const [passwordShown, setPasswordShown] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const productsSlice: InitialState = useSelector(
    (state: RootState) => state.productsReducer
  );

  useLayoutEffect(() => {
    if (status === "authenticated") {
      if (productsSlice.cart.length !== 0) {
        router.push("/checkout");
      } else {
        router.push("/");
      }
    }
  }, [status, productsSlice.cart.length, router]);

  if (status === "unauthenticated") {
    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async ({ email, password }) => {
          try {
            void signIn("credentials", { email, password });
          } catch (e: any) {
            console.log(e);
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <div
              className="p-5 w-full flex items-center justify-center h-screen bg-gray-50"
              data-testid="login"
            >
              <div className="md:h-[90vh] h-full shadow-xl bg-white rounded-lg text-center flex items-center justify-center flex-col xl:w-[60vh] w-full ">
                {/* form */}
                {error && (
                  <div className="mb-20 text-red-500  text-xl">
                    Email or Password is incorrect !
                  </div>
                )}

                <Form className="xl:text-base flex flex-col items-center justify-center md:gap-10 gap-6 ">
                  <h1 className="text-center">
                    <p className="font-bold text-2xl text-gray-700">
                      Please login
                    </p>
                    <p className="font-bold text-gray-500 text-md">
                      to purchase products
                    </p>
                  </h1>

                  <Field
                    name="email"
                    disabled={isSubmitting}
                    type="email"
                    key="email"
                    placeholder="email"
                    className="flex md:gap-4 gap-3  p-4 items-center justify-center ring-1 w-full ring-blue-100 rounded-md"
                  />

                  <div className="w-full relative ">
                    <Field
                      name="password"
                      disabled={isSubmitting}
                      type={passwordShown ? "text" : "password"}
                      key="password"
                      placeholder="password"
                      className="flex md:gap-4 gap-3  p-4 items-center justify-center ring-1 w-full ring-blue-100 rounded-md"
                    />
                    <div
                      className=" flex  items-center justify-center absolute top-4 right-3"
                      onClick={() => setPasswordShown(!passwordShown)}
                    >
                      {passwordShown ? (
                        <FaRegEye size={20} color="#85929E" />
                      ) : (
                        <FaRegEyeSlash size={20} color="#85929E" />
                      )}
                    </div>
                  </div>

                  <button
                    className="flex w-full items-center  justify-center md:gap-4 gap-3 p-4 ring-1 ring-blue-100 rounded-lg hover:scale-110 transition-all duration-500"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex gap-2 justify-center items-center">
                        <Oval
                          visible={true}
                          height="20"
                          width="20"
                          color="#f3f6f4"
                          strokeWidth="8"
                          secondaryColor="#c0c0c0"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                        Please wait...
                      </div>
                    ) : (
                      "Login"
                    )}
                  </button>

                  <button
                    className="flex md:gap-4 gap-3 p-4 items-center justify-center ring-1 w-full ring-blue-100 rounded-md hover:scale-110 transition-all duration-500"
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
                    className="text-gray-500 md:text-sm text-xs"
                  >{`<< Back to Shopping`}</Link>
                </Form>
              </div>
            </div>
          );
        }}
      </Formik>
    );
  }
};

export default LoginPage;
