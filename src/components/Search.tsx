"use client";
import React from "react";
import { useRef, useEffect, useState } from "react";
import { ProductsType } from "@/types/types";
import Link from "next/link";
import { BASE_API_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { fetchProductSearch } from "@/utils/fetchData";

const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [searchItems, setSearchItems] = useState<ProductsType>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchProductSearch(value);
      return data;
    };
    fetch().then((res) => setSearchItems(res));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const AutoComplete = (): React.ReactNode => {
    if (!value || searchItems.length === 0) {
      setOpen(false);
      return;
    }
    setOpen(true);
    return (
      <ul
        className={`absolute flex top-14 left-1 gap-10 p-10 flex-col z-20 max-w-sm  overflow-hidden shadow-lg backdrop-blur-xl cursor-pointer rounded-lg ${
          isOpen ? "visible" : "hidden"
        }`}
      >
        {searchItems?.map((item) => {
          return (
            <Link
              href={`${BASE_API_URL}/products/${item._id}`}
              key={item._id}
              onClick={() => setValue("")}
            >
              <li>{item.title}</li>
            </Link>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="flex xl:w-1/2 w-full text-black justify-center items-center font-light text-sm md:text-base ">
      {/* <Modes /> */}
      <form
        action=""
        className="md:w-full w-[90%]  flex justify-center  relative "
      >
        <input
          className="h-5 text-sm  border-1 rounded-lg lg:p-6  p-5 w-full focus: outline-none "
          type="text"
          name="name"
          value={value}
          onChange={handleChange}
          placeholder="search product"
        />

        <button
          disabled={!value}
          onClick={() => {
            router.push(`/searchResultPage?search=${value}`);
            setValue("");
          }}
          className="flex items-center text-slate-400 justify-center absolute h-full  text-center right-0 md:text-base text-sm border-l-2  px-4 rounded-r-lg"
          type="button"
        >
          <span className="text-3xl/7 self-center ">&#x2315;</span>
        </button>
        <AutoComplete />
      </form>
    </div>
  );
};

export default SearchBar;
