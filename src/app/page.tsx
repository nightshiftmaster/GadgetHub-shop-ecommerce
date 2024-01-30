"use client";
import Featured from "@/components/layers/Featured";
import TopSales from "@/components/layers/TopSales";
import Banner from "@/components/layers/Banner";
import NewArrivals from "@/components/layers/NewArivals";
import ShopByCategory from "@/components/layers/ShopByCategory";
import { BASE_API_URL } from "@/utils/constants";
import { ProductsType } from "@/types/types";
import dataBase from "@/utils/dataBase";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const getData = async () => {
  const res = await fetch(`${BASE_API_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  return res.json();
};

const Home = async () => {
  const session = useSession();
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data: user, isLoading } = useSWR(
    `${BASE_API_URL}/api/user?email=${session?.data?.user?.email}`,
    fetcher
  );

  if (isLoading) {
    return;
  }

  let isGuest = user.length === 0;

  const data: ProductsType = await getData();
  return (
    <div className="h-full w-full overflow-auto flex flex-col justify-center items-center">
      <div className="z-0 h-full w-full flex flex-col gap-3 border-l-2 border-r-2 border-gray-100 ">
        {isGuest || (
          <h1 className="text-center font-semibold md:text-3xl text-lg capitalize p-4 ">
            Welcome {user[0].firstName} !
          </h1>
        )}
        <Banner />
        <ShopByCategory />
        <Featured data={data} />
        <TopSales data={data} />
        <NewArrivals data={data} />
        {/* <button
          className="bg-red-300 text-2xl text-white p-10"
          onClick={async () => {
            try {
              await fetch(`${BASE_API_URL}/api/products`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(dataBase),
              });
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Insert data to db
        </button> */}
      </div>
    </div>
  );
};

export default Home;
