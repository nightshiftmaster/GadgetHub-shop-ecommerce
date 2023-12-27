import React from "react";

// adding type React.ReactNode for children

const MainWindow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center  justify-center  w-screen">
      {children}
    </div>
  );
};

export default MainWindow;
