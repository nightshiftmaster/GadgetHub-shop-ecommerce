"use client";
import React from "react";
import Modes from "./Modes";
import { useRef, useEffect, useState } from "react";
import { ProductsType } from "@/types/types";
import Link from "next/link";
import { BASE_API_URL } from "@/utils/constants";

type ItemType = {
  item: string;
  id: number;
};

const getData = async (query: string) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${query}`
    );
    if (response) {
      const data = await response.json();
      return data.products;
    } else {
      throw new Error("Failed to fetch");
    }
  } catch {
    throw new Error("Something goes wrong");
  }
};

const FormInput = () => {
  const [value, setValue] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [searchItems, setSearchItems] = useState<ProductsType>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getData(value);
      return data;
    };
    fetch().then((res) => setSearchItems(res));
  }, [value]);

  //event with type - React.MouseEvent and generic - HTMLInputElement
  const handleSubmit = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const data = await getData(value);
    return data;
    // setSearchItem({ item: value, id: 3 });
    // setValue("");
    // console.log("submitted");
  };

  //event with type - React.ChangeEvent and generic - HTMLInputElement
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
        <input
          className="text-white  flex justify-center absolute h-full  text-center right-0 md:text-base text-sm bg-gradient-to-r from-purple-400 to-fuchsia-400  px-4  rounded-r-lg"
          type="button"
          onClick={handleSubmit}
          value="search"
        />
        <AutoComplete />
      </form>
    </div>
  );
};

export default FormInput;
