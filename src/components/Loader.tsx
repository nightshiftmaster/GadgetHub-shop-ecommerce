import React from "react";
import SuspenseProvider from "@/providers/SuspenseProvider";

const Loading = () => {
  return (
    <div className="fixed h-screen w-full top-[50%]">
      <SuspenseProvider>Please wait...</SuspenseProvider>
    </div>
  );
};
export default Loading;
