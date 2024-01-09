"use client";
import Featured from "@/components/Featured";
import TopSales from "@/components/TopSales";
import Banner from "@/components/Banner";

const Home = () => {
  return (
    <div className="h-full w-full overflow-auto flex flex-col justify-center items-center">
      <div className="z-0 h-full w-full flex flex-col gap-3 border-l-2 border-r-2 border-gray-100 ">
        <Banner />
        <Featured />
        <TopSales />
      </div>
    </div>
  );
};

export default Home;
