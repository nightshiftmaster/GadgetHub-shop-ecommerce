"use client";

import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";

const Modes = () => {
  const { mode, toggle } = useContext(ThemeContext);

  return (
    <div>
      <button
        className="flex bg-fuchsia-500 text-white p-3 rounded-lg mx-[70vh]"
        onClick={() => toggle()}
      >
        Change Theme
      </button>
    </div>
  );
};

export default Modes;
