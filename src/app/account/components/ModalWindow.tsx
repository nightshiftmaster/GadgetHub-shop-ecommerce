import React from "react";
import { useRouter } from "next/navigation";
import { PiWarningCircleFill } from "react-icons/pi";

const ModalWindow = () => {
  const router = useRouter();
  return (
    <div className="h-screen  w-screen flex justify-center inset-0  items-center  backdrop-blur-sm fixed z-20">
      <div className="w-[80%] h-fit flex  md:gap-10 gap-5 justify-center flex-col items-center  shadow-2xl bg-white  rounded-xl border-slate-300 border">
        <span
          className="flex w-full h-[7vh] bg-blue-400 text-white items-center rounded-t-lg text-xl justify-between p-6 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <PiWarningCircleFill size={30} />X
        </span>

        <h1 className="md:text-xl text-sm p-10 border-b text-center border-t">
          For access to your Personal Data please create an Account !
        </h1>
        <div className="flex md:gap-20 gap-10 mb-8 text-sm md:text-base ">
          <button
            className="bg-blue-400 md:px-5 md:py-3 px-2 py-2 md:text-base text-xs text-white rounded-md"
            onClick={() => {
              router.push("/register");
            }}
          >
            Create account
          </button>
          <button
            className="bg-gray-400  md:px-5 md:py-3 px-2 py-2 md:text-base text-xs text-white rounded-md"
            onClick={() => {
              router.back();
            }}
          >
            Continue as guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
