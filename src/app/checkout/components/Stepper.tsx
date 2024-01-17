import React from "react";

const Stepper = ({ step }: { step: number }) => {
  return (
    <div className="bg-gray-50 md:w-[80vh] w-[90%] font-light uppercase flex justify-around items-center basis-[70px] rounded-b-md shadow-md  border-b-2 border md:text-base text-xs">
      <div className="h-full relative w-1/2 flex justify-center items-center border-t-neutral-900 border-t-2">
        {/* rounnd with number */}
        <div
          className={`flex bg-cyan-500 absolute bottom-[53px] justify-center items-center text-white h-[30px] w-[30px] rounded-full`}
        >
          {step === 0 ? 1 : "✓"}
        </div>
        {/* title */}
        <h1>Your Address</h1>
      </div>
      <div
        className={`h-full relative w-1/2 flex justify-center items-center border-t-neutral-900 ${
          step === 1 && "border-t-2"
        }`}
      >
        {/* rounnd with number */}
        <div
          className={`flex ${
            step === 1 ? "bg-cyan-500" : "bg-zinc-300"
          } absolute bottom-[53px] justify-center items-center text-white h-[30px] w-[30px] rounded-full`}
        >
          2
        </div>
        <h1>Order & Payment</h1>
      </div>
    </div>
  );
};

export default Stepper;
