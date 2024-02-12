"use client";
import "swiper/css";
import "swiper/css/pagination";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const data = [
  "https://www.gadstyle.com/wp-content/uploads/2023/06/Ugreen-Banner-Design-Gadstyle-.webp",
  "https://www.gadstyle.com/wp-content/uploads/2023/11/Brand-day-20-off-web-banner-at-gadstyle-3.webp",
  "https://www.gadstyle.com/wp-content/uploads/2023/12/Premium-gadget-hub-web-banner_1000_500.webp",
  "https://www.gadstyle.com/wp-content/uploads/2023/12/End-of-year-sale-banner_1000_500.webp",
];

const Banner = () => {
  const modules =
    process.env.NODE_ENV !== "production"
      ? [Pagination]
      : [Autoplay, Pagination];
  return (
    <div
      className="h-2/3 w-full  overflow-hidden flex gap-16 justify-center items-center md:bg-gray-100"
      data-testid="banner"
    >
      <div className="h-1/2  max-w-[1250px]  gap-2 flex lg:justify-between justify-center items-center  ">
        <Link href="/products">
          <div className="md:h-[400px] md:w-[800px] sm:w-[600px]  h-[200px] w-[350px] flex relative  ">
            <Swiper
              pagination={true}
              modules={modules}
              className="h-full w-full  "
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              {data.map((img, index) => {
                return (
                  <SwiperSlide key={index} className="relative">
                    <Image
                      fill
                      priority
                      src={img}
                      alt="home picture"
                      className="md:object-cover object-fit rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </Link>
        <div className="lg:flex hidden h-[400px]  w-[600px] flex-col  relative gap-2">
          <Link href="/products" className="relative">
            <Image
              src="https://www.gadstyle.com/wp-content/uploads/2023/11/Brand-day-20-off-web-banner-at-gadstyle-2-768x384.webp"
              alt=""
              width={400}
              height={400}
              className="object-cover rounded-lg h-auto w-auto"
            />
          </Link>

          <Link href="/products" className="relative">
            <Image
              src="https://www.gadstyle.com/wp-content/uploads/2023/11/Brand-day-20-off-web-banner-at-gadstyle-1-768x384.webp"
              alt=""
              width={400}
              height={400}
              className="object-cover rounded-lg h-auto w-auto"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
