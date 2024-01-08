"use client";

import React, { createContext } from "react";
import { useState } from "react";

type ThemeState = {
  mode: string;
  toggle: any;
};

export const ThemeContext = createContext<ThemeState>({
  mode: "",
  toggle: null,
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("bg-white");
  const toggle = () => {
    return setMode(
      mode === "bg-black text-white"
        ? "bg-white text-black"
        : "bg-black text-white"
    );
  };

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <div className={mode}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
