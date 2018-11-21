import React from "react";
import { useProvider } from "../contexts/AuthContext";

const Login = ({ login }) => (
  <div>
    <h1>1</h1>
    <button onClick={login}>real login</button>
  </div>
);

export default useProvider(Login);
