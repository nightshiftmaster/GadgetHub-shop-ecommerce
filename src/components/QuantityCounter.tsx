import { SingleProductType } from "@/types/types";
import React from "react";
import { useDispatch } from "react-redux";
import { changeProductCount } from "@/redux/cartSlice";

type CunterProps = {
  setCount: (newValue: number | ((prev: number) => number)) => void;
  count: number;
  data: SingleProductType;
};

const QuantityCounter = ({ data, count, setCount }: CunterProps) => {
  const dispatch = useDispatch();
  const _id = data._id;
  return (
    <div
      className="flex justify-around items-center md:gap-6 gap-5 "
      data-testid="quantity-counter"
    >
      <div className="w-[15vh]  lg:w-[13vh] md:h-10 h-8 flex  justify-between text-gray-500 text-sm rounded-md border cursor-pointer ">
        <span
          className="border-r p-1 px-3 flex justify-center items-center hover:bg-sky-400 hover:text-white hover:rounded-l-md transition-all duration-500"
          onClick={() => {
            dispatch(changeProductCount({ _id, count: count > 1 ? -1 : 0 }));
            return setCount((prev: number) => (prev > 1 ? prev - 1 : prev));
          }}
        >
          -
        </span>
        <span className="p-2 flex justify-center items-center">{count}</span>
        <span
          className="border-l p-1 px-3 flex justify-center items-center  hover:bg-sky-400 hover:text-white hover:rounded-r-md transition-all duration-500"
          onClick={() => {
            dispatch(changeProductCount({ _id, count: count < 9 ? +1 : 0 }));
            return setCount((prev: number) => (prev < 9 ? prev + 1 : prev));
          }}
        >
          +
        </span>
      </div>
      <div className="w-[50px] flex justify-start ">
        <h2
          className="md:text-base text-blue-500 text-sm font-medium"
          data-testid="price"
        >
          ${data?.price * count}
        </h2>
      </div>
    </div>
  );
};

export default QuantityCounter;
