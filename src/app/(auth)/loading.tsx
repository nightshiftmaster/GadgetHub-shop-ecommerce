import React from "react";
import SuspenseProvider from "@/providers/SuspenseProvider";

const Loading = () => {
  return (
    <div className="fixed h-full w-full top-[50%] left-0">
      {/* <SuspenseProvider>Loading cart...</SuspenseProvider> */}
    </div>
  );
};
export default Loading;
