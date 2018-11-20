import React from "react";
import { useAnother } from "../contexts/another";

const Counter = ({ number, increment, decrease }) => {
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={increment}>더하기</button>
      <button onClick={decrease}>빼기</button>
    </div>
  );
};

export default useAnother(Counter);
