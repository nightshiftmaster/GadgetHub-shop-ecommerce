"use client";
import React from "react";
import { useRef, useEffect, useState } from "react";
import { ProductsType } from "@/types/types";
import Link from "next/link";
import { BASE_API_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";

const fetchProductSearch = async (query: string) => {
  const res = await fetch(`${BASE_API_URL}/api/products/search?q=${query}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  return res.json();
};

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
    setOpen(!!e.target.value); // Open autocomplete if there's input value
  };

  return (
    <div className="flex xl:w-1/2 w-full text-black justify-center items-center font-light text-sm md:text-base ">
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
            setOpen(false); // Close autocomplete after search
          }}
          className="flex items-center text-slate-400 justify-center absolute h-full  text-center right-0 md:text-base text-sm border-l-2  px-4 rounded-r-lg"
          type="button"
        >
          <span className="text-3xl/7 self-center ">&#x2315;</span>
        </button>
        <AutoComplete
          isOpen={isOpen}
          setOpen={setOpen}
          setValue={setValue}
          searchItems={searchItems}
        />
      </form>
    </div>
  );
};

const AutoComplete = ({
  isOpen,
  setOpen,
  setValue,
  searchItems,
}: {
  isOpen: boolean;
  setOpen: any;
  setValue: any;
  searchItems: ProductsType;
}) => {
  if (!isOpen || searchItems.length === 0) {
    return null;
  }

  return (
    <ul
      className={`absolute flex top-14 left-1 gap-10 p-10 flex-col z-20 max-w-sm  overflow-hidden shadow-lg backdrop-blur-xl cursor-pointer rounded-lg`}
    >
      {searchItems.map((item, i) => (
        <Link
          key={i}
          href={`${BASE_API_URL}/products/${item._id}`}
          onClick={() => {
            setValue("");
            setOpen(false);
          }} // Clear input value
        >
          <li>{item.title}</li>
        </Link>
      ))}
    </ul>
  );
};

export default SearchBar;
