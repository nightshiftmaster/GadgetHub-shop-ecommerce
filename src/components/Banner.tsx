"use client";

import React, { useEffect, useState } from "react";
import { ProductsType } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const data = [
  "https://www.gadstyle.com/wp-content/uploads/2023/06/Ugreen-Banner-Design-Gadstyle-.webp",
  "https://www.gadstyle.com/wp-content/uploads/2023/11/Brand-day-20-off-web-banner-at-gadstyle-3.webp",
  "https://www.gadstyle.com/wp-content/uploads/2023/12/Premium-gadget-hub-web-banner_1000_500.webp",
  "https://www.gadstyle.com/wp-content/uploads/2023/12/End-of-year-sale-banner_1000_500.webp",
];

const Banner = () => {
  return (
    <div className="h-2/3 w-full flex gap-16 justify-center items-center md:bg-gray-100">
      <div className="h-1/2  w-[1350px] gap-2 flex md:justify-between justify-center items-center  ">
        <Link href="/products">
          <div className="md:h-[400px] md:w-[800px] sm:w-[600px]  h-[200px] w-[350px] flex relative  ">
            <Swiper
              pagination={true}
              modules={[Autoplay, Pagination]}
              className="h-full w-full  "
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              {data.map((img, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Image
                      fill
                      src={img}
                      alt="home picture"
                      className="md:object-cover object-fit rounded-lg"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </Link>
        <div className="md:flex hidden h-[400px] w-[800px] justify-start items-start flex-col shrink gap-2">
          <div className="h-1/2 w-full flex relative rounded-md ">
            <Link href="/products">
              <Image
                src="https://www.gadstyle.com/wp-content/uploads/2023/11/Brand-day-20-off-web-banner-at-gadstyle-2-768x384.webp"
                alt=""
                fill
                className="object-cover rounded-lg"
              />
            </Link>
          </div>
          <div className="h-1/2 w-full  flex justify-center items-center relative  ">
            <Link href="/products">
              <Image
                src="https://www.gadstyle.com/wp-content/uploads/2023/11/Brand-day-20-off-web-banner-at-gadstyle-1-768x384.webp"
                alt=""
                fill
                className="object-cover rounded-lg"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
