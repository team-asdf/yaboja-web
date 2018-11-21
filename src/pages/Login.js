import React from "react";
import { useProvider } from "../contexts/AuthContext";

const Login = ({ login }) => (
  <div>
    <button onClick={login}>real login</button>
  </div>
);

export default useProvider(Login);
