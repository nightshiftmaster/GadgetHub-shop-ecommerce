"use client";
import React, { useEffect, useState } from "react";
import Product from "@/components/Product";
import { ProductsType, SingleProductType } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { BASE_API_URL } from "@/utils/constants";
import Link from "next/link";
import Pagination from "@/app/products/components/Pagination";
import FilterByPrice from "./components/FilterByPrice";
import SortProducts from "./components/SortProducts";
import FilterByCategory from "./components/FilterByCategory";

const getDataByCategory = async (category: any) => {
  const res = await fetch(`/api/products/category/${category}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  return res.json();
};

const getDataByGeneralCategory = async (generalCategory: any) => {
  const res = await fetch(`/api/products/generalCategory/${generalCategory}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  return res.json();
};

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [data, setData] = useState<ProductsType>();
  const [filter, setFilter] = useState("");
  const [currProducts, setCurrProducts] = useState<ProductsType>();
  const [filteredPrice, setFilteredPrice] = useState([]);
  const [category, setCategory] = useState<string | null>(null);
  const postsPerPage = 20;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const pagesCount: number | undefined =
    currProducts && Math.ceil(currProducts?.length / postsPerPage);

  const searchParams = useSearchParams();
  const cat: string | null = searchParams.get("cat");
  const generalCategory: string | null = searchParams.get("generalCategory");
  const banner = searchParams.get("banner");

  const currPageHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    setCurrentPage(e.currentTarget.value);
  };

  const getData = async () => {
    const res = await fetch(`/api/products`, {
      cache: "no-store",
    });

    if (!res || !res.ok) {
      setError("Something went wrong !");
    }
    return res.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (category) {
        setCategory(category);
        return category ? await getDataByCategory(category) : await getData();
      }
      if (!category && !generalCategory) {
        return await getData();
      }
      return getDataByGeneralCategory(generalCategory);
    };

    fetchData()
      .then((res) => {
        setData(res);
        setCurrProducts(res);
      })
      .catch((e) => setError("Something went wrong !"));
  }, [category]);

  useEffect(() => {
    getProductsByFilter(filter);
  }, [filter, filteredPrice, cat, category]);

  const getPriceRangeOfCategory = (products: ProductsType) => {
    if (products) {
      const prices = products
        ?.map((product: SingleProductType) => product?.price)
        .sort((a, b) => a - b);
      return [prices[0], prices[prices.length - 1]];
    }

    return [0, 100];
  };

  const getProductsByFilter = (type: string) => {
    let filtered = data && [...data];
    const filters: any = {
      byPrice: () =>
        filtered?.filter(
          (item: SingleProductType) =>
            item.price >= filteredPrice[0] && item.price <= filteredPrice[1]
        ),
      byRating: () => filtered?.sort((a, b) => b.rating - a.rating),
      byPriceLowToHigh: () => filtered?.sort((a, b) => a.price - b.price),
      byPriceHightToLow: () => filtered?.sort((a, b) => b.price - a.price),
    };
    const filteredData = filters[type];
    setCurrProducts(filteredData);
  };

  try {
    return (
      <div
        className="w-full h-full flex justify-center items-center"
        data-testid="products"
      >
        <div className="flex flex-col md:gap-5  gap-3 p-2 justify-center items-center max-w-[1250px] w-full ">
          <div className="md:hidden flex w-1/2">
            <FilterByCategory setCategory={setCategory} setFilter={setFilter} />
          </div>
          <div className="flex gap-10  w-full ">
            {/* filters */}
            <div
              className="md:flex hidden flex-col gap-10 justify-start items-start"
              data-testid="products-filter"
            >
              <FilterByCategory
                setCategory={setCategory}
                setFilter={setFilter}
              />
              <hr className="w-full h-px md:inline hidden  bg-gray-300 border-0 rounded "></hr>
              <FilterByPrice
                category={data}
                priceRange={getPriceRangeOfCategory(data!)}
                setFilteredPrice={setFilteredPrice}
                setFilter={setFilter}
              />
              <hr className="w-full h-px md:inline hidden  bg-gray-300 border-0 rounded "></hr>
              <SortProducts setFilter={setFilter} />
            </div>

            <div
              className="flex flex-col w-full justify-center items-center  gap-6 "
              data-testid="products-banner"
            >
              <div className=" w-full h-[30vh]  flex justify-center relative">
                {
                  <img
                    src={
                      banner
                        ? banner
                        : "https://www.gadstyle.com/wp-content/uploads/2024/01/new-year-sale-banner-2024-1.webp"
                    }
                    alt="banner"
                    className="object-cover w-full h-full "
                  />
                }
              </div>

              {error ? (
                <div>
                  <h1 className="text-red-500 text-2xl p-10">{error}</h1>
                </div>
              ) : (
                <div
                  className="flex flex-wrap text-sm flex-1 gap-2 justify-center items-center"
                  data-testid="products-container"
                >
                  {currProducts
                    ?.slice(indexOfFirstPost, indexOfLastPost)
                    .map((item, i) => {
                      return <Product key={i} {...item} />;
                    })}
                </div>
              )}

              <Link
                href={`${BASE_API_URL}/`}
                className="text-gray-500  md:text-sm lg:text-sm text-xs"
              >{`<< Back Home`}</Link>
              {data && (
                <Pagination
                  currPageHandler={currPageHandler}
                  pagesCount={pagesCount!}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (e: any) {
    // console.log(e);
    setError(e.message);
  }
};

export default Products;
