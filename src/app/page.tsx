"use client";
import Featured from "@/components/Featured";
import TopSales from "@/components/TopSales";
import Banner from "@/components/Banner";
import NewArrivals from "@/components/NewArivals";
import ShopByCategory from "@/components/ShopByCategory";
import { BASE_API_URL } from "@/utils/constants";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { fetcher } from "@/utils/fetcherSwr";
import Loading from "@/components/Loader";

const Home = () => {
  const session = useSession();

  const { data, isLoading, mutate } = useSWR("/api/products", fetcher);

  const { data: user, isLoading: loadingUser } = useSWR(
    `${BASE_API_URL}/api/user?email=${session?.data?.user?.email}`,
    fetcher
  );

  if (isLoading || loadingUser) {
    return <Loading />;
  }

  let isGuest = user?.length === 0;

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
        <TopSales data={data} />
        <NewArrivals data={data} />
      </div>
    </div>
  );
};

export default Home;
