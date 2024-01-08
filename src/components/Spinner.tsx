import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <Spinner animation="border" style={{ width: "4rem", height: "4rem" }}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loader;
