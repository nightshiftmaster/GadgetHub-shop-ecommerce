import React from "react";
import Select from "react-select";

const options = [
  { value: "byRating", label: "Sort by rating" },
  { value: "byPriceLowToHigh", label: "Sort by price: low to high" },
  { value: "byPriceHightToLow", label: "Sort by price: high to low" },
];

const SortProducts = ({ setFilter }: { setFilter: any }) => {
  return (
    <div className="flex flex-col justify-center md:items-start items-center whitespace-nowrap gap-5  w-full">
      <Select
        options={options}
        className="capitalize md:text-base text-sm  w-[20vh]"
        defaultValue={{ value: "Sort by rating", label: "Sort by rating" }}
        onChange={(e) => {
          e && setFilter(e.value);
        }}
      />
    </div>
  );
};

export default SortProducts;
