import React from "react";

const Footer = () => {
  return (
    <div
      className="flex justify-center w-full items-center md:p-6 p-3 border-t-2 bg-slate-100  text-slate-500"
      data-testid="footer"
    >
      <span className="md:text-sm text-xs">® All rights reserved 2024</span>
    </div>
  );
};

export default Footer;
