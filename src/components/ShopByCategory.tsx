"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Image from "next/image";

const categories = [
  {
    name: "Smartphones",
    image:
      "https://motorolain.vtexassets.com/arquivos/ids/156448-800-auto?width=800&height=auto&aspect=true",
    id: 1,
    href: `/products?generalCategory=${"smartphones"}`,
  },
  {
    name: "Laptops",
    image: "https://images.anandtech.com/doci/10113/XPS17.jpg",
    id: 2,
    href: `/products?generalCategory=${"laptops"}`,
  },
  {
    name: "Watches",
    image:
      "https://watch4u.b-cdn.net/wp-content/uploads/2021/11/SKA791P1-scaled.jpg",
    id: 3,
    href: `/products?generalCategory=${"watches"}&banner=${"https://watches.ae/cdn/shop/collections/NEW_COLLECTION.jpg?v=1703251344"}`,
  },

  {
    name: "Sunglasses",
    image:
      "https://contents.mediadecathlon.com/p2579219/k$4c9b279bf885e5216350f43efdd0dec2/adult-hiking-sunglasses-mh100-category-3-quechua-8738921.jpg",
    id: 4,
    href: `/products?generalCategory=${"sunglasses"}&banner=${"https://www.vision-works.co.za/wp-content/uploads/2021/07/24125-PROMO-PAGE-BANNERS-STG-1-JC-06.png"}`,
  },

  {
    name: "Cosmetics",
    image: "https://schrammek.co.il/wp-content/uploads/2022/05/121.png",
    id: 5,
    href: `/products?generalCategory=${"cosmetics"}&banner=${"https://static.vecteezy.com/system/resources/previews/005/741/458/non_2x/cosmetics-or-skin-care-product-ads-with-bottle-banner-ad-for-beauty-products-and-leaf-background-glittering-light-effect-design-vector.jpg"}`,
  },

  {
    name: "All for Home",
    image:
      "https://www.bajajallianz.com/content/dam/bagic/home-insurance/My-Home-Insurance.png",
    id: 6,
    href: `/products?generalCategory=${"all for home"}&banner=${"https://m.media-amazon.com/images/S/stores-image-uploads-eu-prod/2/AmazonStores/A21TJRUUN4KGV/dd33bcdd520e73dbcfa6ac5fe7910cde.w1900.h400.jpg"}`,
  },
  {
    name: "All for Men",
    image:
      "https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-in-white-t-shirt-on-isolated-background-png-image_9197972.png",
    id: 7,
    href: `/products?generalCategory=${"all for man"}&banner=${"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7dcaa960436865.5a4d145b56f17.jpg"}`,
  },
  {
    name: "All for Women",
    image:
      "https://png.pngtree.com/png-vector/20231202/ourmid/pngtree-very-beautiful-girl-doing-modeling-wearing-white-t-shirt-png-image_10808237.png",
    id: 8,
    href: `/products?generalCategory=${"all for women"}&banner=${"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7dcaa960436865.5a4d145b56f17.jpg"}`,
  },
];

const ShopByCategory = () => {
  const router = useRouter();
  return (
    <div
      className="w-full max-w-[1250px] m-auto"
      data-testid="shop-by-category"
    >
      <div className=" h-[10%]  flex justify-center items-center">
        <hr className="w-full md:inline hidden h-px bg-gray-300 border-0 rounded "></hr>
        <h1 className="md:text-2xl text-lg text-slate-900 p-10 whitespace-nowrap font-semibold font-sans relative">
          Shop by Category
        </h1>
        <hr className="w-full md:inline hidden h-px bg-gray-300 border-0 rounded "></hr>
      </div>
      <div className="flex  justify-center items-center gap-10 px-5 ml-2  md:hidden ">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          freeMode
          centeredSlidesBounds
          modules={[FreeMode]}
          className=""
        >
          {categories.map((cat, i) => {
            return (
              <SwiperSlide
                key={i}
                className=" animate-slideright w-fit"
                data-testid={`general-category-${cat.name}-mobile`}
              >
                <div
                  className="flex cursor-pointer text-center h-[15vh] flex-col gap-2 justify-center items-center"
                  key={cat.id}
                  onClick={() => {
                    router.push(cat.href);
                  }}
                >
                  <div className="w-[60px] h-[60px] p-2 hover:scale-125 transition-all duration-700 relative ring-slate-300 ring-1 flex justify-center items-center rounded-full">
                    <Image
                      src={cat.image}
                      className="relative grayscale rounded-[20%]"
                      width={50}
                      height={50}
                      alt="swiper slide image"
                    />
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {cat.name}
                  </span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="justify-center items-center gap-14  md:flex hidden">
        {categories.map((cat) => {
          return (
            <div
              className="cursor-pointer flex-col gap-4 justify-center items-center flex"
              data-testid={`general-category-${cat.name}`}
              key={cat.id}
              onClick={() => {
                router.push(cat.href);
              }}
            >
              <div className="w-[70px] h-[70px] p-1 hover:scale-125 transition-all duration-700 relative ring-slate-200 ring-1 flex justify-center items-center rounded-full">
                <Image
                  alt="category image"
                  src={cat.image}
                  width={60}
                  height={60}
                  className="relative grayscale rounded-full"
                />
              </div>
              <span className="text-xs text-slate-500">{cat.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopByCategory;
