"use client";
import Featured from "@/components/Featured";
import TopSales from "@/components/ProductsDisplay";
import Banner from "@/components/Banner";
import NewArrivals from "@/components/ProductsDisplay";
import ShopByCategory from "@/components/ShopByCategory";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { fetcher } from "@/utils/fetcherSwr";
import Loading from "@/components/Loader";
import { PiSmileyXEyes } from "react-icons/pi";

const Home = () => {
  const session = useSession();

  const { data, isLoading, error: isError } = useSWR("/api/products", fetcher);

  const {
    data: user,
    isLoading: loadingUser,
    error,
  } = useSWR(`/api/user?email=${session?.data?.user?.email}`, fetcher);

  if (isLoading || loadingUser) {
    return <Loading />;
  }

  if (error || isError) {
    return (
      <div className="flex justify-center items-center flex-col mt-20 gap-5">
        <PiSmileyXEyes size={70} />
        <h1 className="text-4xl ">Something went wrong !</h1>{" "}
      </div>
    );
  }

  let isGuest = user ? user?.length === 0 : true;

  return (
    <div
      className="h-full w-full overflow-auto flex flex-col justify-center items-center"
      data-testid="home"
    >
      <div className="z-0 h-full w-full flex flex-col gap-3 border-l-2 border-r-2 border-gray-100 ">
        {isGuest || (
          <h1 className="text-center font-semibold font-sans md:text-3xl text-lg capitalize p-4 ">
            Welcome {user[0]?.firstName} !
          </h1>
        )}
        <Banner />
        <ShopByCategory />
        <Featured data={data} />
        <TopSales
            data={data}
            title="Top Sales"
            filterValue="topSales"
            dataTestId="top-sales"
            bgColor="bg-lime-50"
            startIndex={0}
            endIndex={14}
        />
        <NewArrivals
            data={data}
            title="New Arrivals"
            filterValue="newArrivals"
            dataTestId="new-arivals"
            bgColor="bg-pink-50"
            startIndex={30}
            endIndex={44}
        />
      </div>
    </div>
  );
};

export default Home;
