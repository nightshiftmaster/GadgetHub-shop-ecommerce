import React from "react";
import SuspenseProvider from "@/providers/SuspenseProvider";

const Loading = () => {
  return (
    <div className="absolute h-screen  w-screen top-[50%] left-0">
      <SuspenseProvider>Please wait...</SuspenseProvider>
    </div>
  );
};
export default Loading;
