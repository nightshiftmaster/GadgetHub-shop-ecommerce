import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "./Slider";

function valuetext(value: number) {
  return `$${value}`;
}

const FilterByPrice = ({
  category,
  priceRange,
  setFilteredPrice,
  setFilter,
}: {
  category: any;
  priceRange: any;
  setFilteredPrice: any;
  setFilter: any;
}) => {
  const [value, setValue] = useState<number[]>([]);

  useEffect(() => {
    setValue(priceRange);
  }, [category]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    const numbers = newValue as number[];
    setValue(numbers);
  };

  return (
    <div className="flex flex-col gap-4 ">
      Sort by Price
      <Box sx={{ width: 200 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valuelabeldisplay="auto"
          getAriaValueText={valuetext}
          min={priceRange[0]}
          step={10}
          max={priceRange[1]}
        />
      </Box>
      <div className="flex justify-between items-center">
        <div className="flex justify-start gap-2">
          <span className="text-sm">price</span>
          <div className="text-sm font-light text-blue-600">
            ${value[0]}- ${value[1]}
          </div>
        </div>
        <button
          className="bg-gray-200 rounded-md uppercase text-gray-600 text-xs font-semibold px-3 py-1"
          onClick={() => {
            setFilteredPrice(value);
            setFilter("byPrice");
          }}
        >
          filter
        </button>
      </div>
    </div>
  );
};

export default FilterByPrice;
