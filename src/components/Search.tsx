"use client";
import React from "react";
import Modes from "./Modes";
import { useRef, useEffect, useState } from "react";
import { ProductsType } from "@/types/types";
import Link from "next/link";
import { BASE_API_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { fetchProductSearch } from "@/utils/fetchData";

const FormInput = () => {
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
    if (value.length < 1 || searchItems.length === 0) {
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
              href={`${BASE_API_URL}/products/${item.id}`}
              key={item.id}
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
    <div className="flex w-screen h-20 -mt-10 md:mb-20 mb-2  justify-center items-center text-sm md:text-lg md:shadow-lg">
      {/* <Modes /> */}
      <form
        action=""
        className="w-full md:w-1/2 flex justify-center m-16 relative"
      >
        <input
          className="h-6  border-2 rounded-lg md:p-6  p-4 w-full"
          type="text"
          name="name"
          value={value}
          onChange={handleChange}
          placeholder="search product"
        />
        <Link
          onClick={() => setValue("")}
          href={`/searchResultPage?search=${value}`}
        >
          <input
            className="text-white  flex justify-center absolute h-full  text-center right-0 md:text-base text-sm bg-gradient-to-r from-purple-400 to-fuchsia-400  px-4  rounded-r-lg"
            type="button"
            value="search"
          />
        </Link>
        <AutoComplete />
      </form>
    </div>
  );
};

export default FormInput;
