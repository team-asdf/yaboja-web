import React from "react";
import { useProvider } from "../contexts/AuthContext";

const Profile = ({ profile }) => (
  <div>
    <div>
      <img src={profile["avatar_url"]} alt="" />
    </div>
  </div>
);

export default useProvider(Profile);
