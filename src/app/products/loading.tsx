import React from "react";
import SuspenseProvider from "@/providers/SuspenseProvider";

const Loading = () => {
  return (
    <div className="fixed h-full w-full top-[50%] left-0">
      <SuspenseProvider>Please wait...</SuspenseProvider>
    </div>
  );
};
export default Loading;
