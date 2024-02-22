"use client";
import React from "react";
import { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeAllProducts } from "@/redux/features/productsSlice";
import { RootState } from "@/redux/store";
import Confetti from "react-confetti";
import useSWR from "swr";
import { BASE_API_URL } from "@/utils/constants";
import { fetcher } from "@/utils/fetcherSwr";
import Loading from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Success = () => {
  const dispatch = useDispatch();
  const session = useSession();
  const router = useRouter();
  const orderData = useSelector((state: RootState) => state.productsReducer);

  const productsSlice = useSelector(
    (state: RootState) => state.productsReducer
  );

  const { data, isLoading } = useSWR(
    `${BASE_API_URL}/api/user?email=${session?.data?.user?.email}`,
    fetcher
  );

  useEffect(() => {
    const sendMail = async () => {
      await fetch("api/email", {
        method: "POST",
        body: JSON.stringify({
          delivery: productsSlice.deliveryAddress,
          order: orderData,
        }),
      });
    };
    sendMail();
    dispatch(removeAllProducts());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (session.status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-pink-50"
      data-testid="success-page"
    >
      <Confetti />
      <div className="md:w-[60%] md:h-full  w-[90%] h-[80%] p-20 text-lg font-semibold flex justify-center flex-col md:gap-20  gap-10 shadow-lg items-center bg-slate-100 rounded-2xl">
        <p>
          <BsBagCheckFill
            size={120}
            style={{
              color: "#87CEFA",
            }}
          />
        </p>
        <h2 className="md:text-3xl text-lg  font-bold text-center text-green-500">
          Thank you for your order !
        </h2>
        <p className=" text-gray-700 font-medium text-base whitespace-nowrap">
          Check your email inbox for the receipt.
        </p>
        <p className=" text-gray-700 text-base  font-medium  text-center">
          If you have any questions, please email {"     "}
          <a
            className="text-red-500 font-normal underline decoration-solid "
            href="mailto:nightshiftmaster@gmail.com"
          >
            nightshiftmaster@gmail.com
          </a>
        </p>
        <Link href="/">
          <button
            className="uppercase w-fit md:p-6 p-3  text-white md:text-xl text-xs whitespace-nowrap bg-fuchsia-400 rounded-3xl"
            type="button"
          >
            Continue shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
