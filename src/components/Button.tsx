import React from "react";

const Button = ({ text }: { text: string }) => {
  return (
    <button className="text-white  lg:py-2 md:py-2 md:px-4 md:p-3 p-2 px-4 text-xs md:text-sm bg-fuchsia-400  rounded-2xl hover:scale-110 transition-all duration-500">
      {text}
    </button>
  );
};

export default Button;
