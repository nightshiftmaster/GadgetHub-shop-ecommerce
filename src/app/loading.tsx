import React from "react";
import SuspenseProvider from "@/providers/SuspenseProvider";

const Loading = () => {
  return (
    <div className="flex gap-10 mt-40 flex-col justify-center items-center">
      <SuspenseProvider>Please wait...</SuspenseProvider>
    </div>
  );
};
export default Loading;
