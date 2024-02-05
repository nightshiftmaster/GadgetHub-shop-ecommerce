import React from "react";
import SuspenseProvider from "@/providers/SuspenseProvider";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full ">
      <SuspenseProvider>Please wait...</SuspenseProvider>
    </div>
  );
};
export default Loading;
