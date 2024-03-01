"use client";
import { Oval } from "react-loader-spinner";

const SuspenseProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-10 flex-col justify-center items-center">
      <Oval
        visible={true}
        height="100"
        width="100"
        color="#f3f6f4"
        strokeWidth="4"
        secondaryColor="#c0c0c0"
        ariaLabel="oval-loading"
      />
      {children}
    </div>
  );
};

export default SuspenseProvider;
