import React from "react";
import Select from "react-select";

const options = [
  "all products",
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting",
].reduce((acc: Array<{ value: string; label: string }>, item: string) => {
  const option = { value: item, label: item };
  acc.push(option);
  return acc;
}, []);

const FilterByCategory = ({
  setCategory,
  setFilter,
}: {
  setCategory: any;
  setFilter: any;
}) => {
  return (
    <div className="flex flex-col justify-center md:items-start items-center whitespace-nowrap gap-5  w-full">
      <h2 className="md:text-base text-sm">Browse By Category</h2>
      <Select
        options={options}
        className="capitalize md:text-base text-sm  w-full"
        onChange={(e) => {
          e && setCategory(e.value);
          setFilter("byCategory");
        }}
      />
    </div>
  );
};

export default FilterByCategory;
