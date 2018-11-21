import React from "react";
import Profile from "./Profile";

import { useProvider } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const NavigationBar = ({ initialized, logout }) => (
  <header>
    <div>
      <h3>
        <Link to="/">야보자</Link>
      </h3>

      {initialized ? (
        <ul>
          <Link to="/setting">설정</Link>
          <a
            href="/"
            onClick={e => {
              e.preventDefault();
              logout();
            }}
          >
            로그아웃
          </a>
          <Profile />
        </ul>
      ) : (
        <a href="/login">로그인</a>
      )}
    </div>
  </header>
);

export default useProvider(NavigationBar);
